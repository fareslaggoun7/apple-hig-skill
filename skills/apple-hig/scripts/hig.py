#!/usr/bin/env python3
"""Search HIG guidance, inspect live official DocC, audit and detect source drift.

Python 3.10+; standard library only. Retrieved documents are evidence, never code.
"""
from __future__ import annotations
import argparse
import concurrent.futures
import hashlib
import json
import pathlib
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone

BASE = pathlib.Path(__file__).resolve().parent.parent
ORIGIN = 'https://developer.apple.com'
PREFIX = '/design/human-interface-guidelines'
KNOWN_TYPES = {'text','paragraph','strong','reference','heading','image','emphasis',
    'row','table','unorderedList','orderedList','links','codeVoice','aside','video',
    'tabNavigator','small','codeListing'}

def load_catalog():
    return json.loads((BASE/'references/catalog.json').read_text(encoding='utf-8'))

def digest(raw):
    return hashlib.sha256(raw).hexdigest()

def semantic_digest(doc):
    payload = {k:doc.get(k) for k in ('abstract','primaryContentSections','topicSections')}
    payload['metadata'] = {k:doc.get('metadata',{}).get(k) for k in ('title','customMetadata')}
    payload['reference_titles'] = {k:v.get('title') for k,v in doc.get('references',{}).items() if v.get('type') == 'topic'}
    return digest(json.dumps(payload,sort_keys=True,ensure_ascii=False,separators=(',',':')).encode())

def normalize(value):
    if not isinstance(value,str):return None
    p=urllib.parse.urlsplit(value)
    if p.scheme == 'doc':
        if p.netloc != 'com.apple.HIG':return None
    elif p.scheme not in ('','https') or (p.netloc and p.netloc != 'developer.apple.com'):
        return None
    path=urllib.parse.unquote(p.path).lower().rstrip('/')
    if path != PREFIX and not path.startswith(PREFIX+'/'):return None
    if any(part in ('.','..') for part in path.split('/')):return None
    return path

class AppleOnlyRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,req,fp,code,msg,headers,newurl):
        parsed=urllib.parse.urlsplit(newurl)
        if parsed.scheme != 'https' or parsed.netloc != 'developer.apple.com':
            raise ValueError('Redirect leaves the official HTTPS origin')
        return super().redirect_request(req,fp,code,msg,headers,newurl)

def retrieve(path):
    if normalize(path) != path:raise ValueError('Invalid HIG path')
    url=ORIGIN+'/tutorials/data'+path+'.json'
    req=urllib.request.Request(url,headers={'User-Agent':'Apple-HIG-Skill/1.0','Accept':'application/json'})
    with urllib.request.build_opener(AppleOnlyRedirect).open(req,timeout=30) as response:
        raw=response.read(8*1024*1024+1)
        if len(raw)>8*1024*1024:raise ValueError('Document exceeds 8 MiB limit')
    doc=json.loads(raw)
    if not isinstance(doc,dict) or not doc.get('metadata',{}).get('title'):
        raise ValueError('Unrecognized DocC document')
    canonical=normalize(doc.get('identifier',{}).get('url'))
    if not canonical:raise ValueError('Document identity is outside the HIG namespace')
    return raw,doc

def plain(value,refs):
    if isinstance(value,str):return value
    if isinstance(value,list):return ' '.join(filter(None,(plain(x,refs) for x in value)))
    if not isinstance(value,dict):return ''
    kind=value.get('type')
    if kind in ('image','video','links'):return ''
    if 'text' in value:return value['text']
    if kind == 'codeVoice':return value.get('code','')
    if kind == 'reference':return value.get('overridingTitle') or refs.get(value.get('identifier'),{}).get('title','')
    return ' '.join(plain(value[k],refs) for k in ('inlineContent','content','items','rows','cells','columns','tabs','code') if k in value)

def outline_and_blocks(doc):
    refs=doc.get('references',{});headings=[];blocks=[];unknown=set();media=0;stack=[]
    def inventory(value):
        nonlocal media
        if isinstance(value,list):
            for item in value:inventory(item)
        elif isinstance(value,dict):
            kind=value.get('type')
            if kind and kind not in KNOWN_TYPES:unknown.add(kind)
            if kind in ('image','video'):media+=1
            for v in value.values():
                if isinstance(v,(dict,list)):inventory(v)
    def walk(value,tab=None,aside=None):
        nonlocal media
        if isinstance(value,list):
            for v in value:walk(v,tab,aside)
        elif isinstance(value,dict):
            kind=value.get('type')
            if kind and kind not in KNOWN_TYPES:unknown.add(kind)
            if kind in ('image','video'):media+=1;return
            if kind == 'heading':
                level=value.get('level',2)
                while stack and stack[-1]['level']>=level:stack.pop()
                h={'title':value.get('text',''),'anchor':value.get('anchor',''),'level':level,'tab':tab}
                stack.append(h);headings.append(h)
            elif kind == 'table':
                rows=[[plain(cell,refs).strip() for cell in row] for row in value.get('rows',[])]
                blocks.append({'sections':[h['anchor'] for h in stack],'tab':tab,'aside':aside,'table':rows})
                inventory(value)
            elif kind in ('paragraph','codeListing'):
                text=plain(value,refs).strip()
                if text:blocks.append({'sections':[h['anchor'] for h in stack],'tab':tab,'aside':aside,'text':text})
                inventory(value)
            elif kind == 'tabNavigator':
                for t in value.get('tabs',[]):
                    saved=stack[:]
                    walk(t.get('content',[]),t.get('title',t.get('name','Unlabeled tab')),aside)
                    stack[:]=saved
            elif kind == 'aside':
                walk(value.get('content',[]),tab,{'name':value.get('name'),'style':value.get('style')})
            else:
                for k in ('content','items','rows','cells','columns','tabs'):
                    if k in value:walk(value[k],tab,aside)
    for section in doc.get('primaryContentSections',[]):
        if section.get('kind') != 'content':unknown.add('primary:'+str(section.get('kind')))
        walk(section.get('content',[]))
    return headings,blocks,sorted(unknown),media

def resolve(catalog,slug):
    path=topic_path(slug)
    page=next((p for p in catalog['pages'] if p['path']==path),None)
    if not page:raise ValueError('Topic is not in the snapshot; use search or fetch current official guidance')
    return page

def topic_path(slug):
    path=normalize(slug) if '/' in slug else normalize(PREFIX+'/'+slug.lower())
    if slug in ('root','human-interface-guidelines'):path=PREFIX
    if not path:raise ValueError('Invalid HIG topic or URL')
    return path

def card(page):
    text=(BASE/page['guidance_file']).read_text(encoding='utf-8')
    marker='<!-- topic:'+page['slug']+' -->'
    if marker not in text:raise ValueError('Guidance card is missing: '+page['slug'])
    return text.split(marker,1)[1].split('<!-- topic:',1)[0].strip()

def search(args,catalog):
    terms=re.findall(r'[\w]+',args.query.lower());matches=[]
    by_path={p['path']:p for p in catalog['pages']}
    def ancestry(page,seen=None):
        seen=set() if seen is None else seen
        result=[]
        for parent_path in page['parents']:
            if parent_path not in seen and parent_path in by_path:
                seen.add(parent_path);parent=by_path[parent_path]
                result.append(parent['title']);result.extend(ancestry(parent,seen))
        return result
    for page in catalog['pages']:
        if args.platform and page['supported_platforms'] and args.platform not in page['supported_platforms']:continue
        if args.platform and page['slug'] in {'designing-for-'+x for x in ('ios','ipados','macos','tvos','visionos','watchos')} and page['slug']!='designing-for-'+args.platform:continue
        title=page['title'].lower();body=card(page).lower()
        tokens=re.findall(r'[\w]+',body)
        anchors=' '.join(page['source_anchors']).lower().replace('-',' ')
        ancestors=' '.join(ancestry(page)).lower()
        score=sum(8*title.count(t)+sum(w.startswith(t) for w in tokens)+2*anchors.count(t)+6*ancestors.count(t) for t in terms)
        if args.query.lower() in title:score+=20
        if score:matches.append((score,page))
    for score,p in sorted(matches,key=lambda x:(-x[0],x[1]['title']))[:args.limit]:
        print(json.dumps({'slug':p['slug'],'title':p['title'],'category':p['category'],'platforms':p['supported_platforms'],'score':score,'url':p['url']},ensure_ascii=False))
    if not matches:print('No snapshot match. Try related terms or official HIG navigation.')

def fetch(args,catalog):
    path=topic_path(args.slug)
    p=next((p for p in catalog['pages'] if p['path']==path),None)
    raw,doc=retrieve(path)
    headings,blocks,unknown,media=outline_and_blocks(doc)
    result={'url':ORIGIN+path,'retrieved_at_utc':datetime.now(timezone.utc).isoformat(),'title':doc['metadata']['title'],
        'canonical_path':normalize(doc.get('identifier',{}).get('url')),'snapshot_sha256':p['sha256'] if p else None,'live_sha256':digest(raw),
        'byte_match':digest(raw)==p['sha256'] if p else None,'semantic_match':semantic_digest(doc)==p['semantic_sha256'] if p else None,
        'supported_platforms':doc['metadata'].get('customMetadata',{}).get('supported-platforms',''),
        'unhandled_node_types':unknown,'media_nodes_not_visually_inspected':media,'outline':headings}
    if args.section:
        if args.section != 'Overview' and args.section not in {h['anchor'] for h in headings}:
            raise ValueError('Unknown section anchor; use fetch --outline first')
        selected=[b for b in blocks if (args.section=='Overview' and not b['sections']) or args.section in b['sections']]
        emitted=[];remaining=args.max_words;truncated=False
        for block in selected:
            count=len(plain(block.get('table',[]),{}).split()) if 'table' in block else len(block.get('text','').split())
            if count>remaining:
                if 'table' in block:truncated=True;break
                block={**block,'text':' '.join(block['text'].split()[:remaining])};truncated=True
            emitted.append(block);remaining-=min(count,remaining)
            if remaining<=0:truncated=truncated or len(emitted)<len(selected);break
        result.update(section=args.section,blocks=emitted,truncated=truncated,selected_block_count=len(selected))
    print(json.dumps(result,ensure_ascii=False,indent=2))

def audit(catalog):
    errors=[];pages=catalog['pages'];by_path={p['path']:p for p in pages};reached=set()
    if len(by_path)!=len(pages):errors.append('Duplicate paths')
    def visit(path):
        if path in reached:return
        reached.add(path)
        if path not in by_path:errors.append('Missing target: '+path);return
        for child in by_path[path]['topic_children']:visit(child)
    visit(PREFIX)
    for p in pages:
        if normalize(p['url'])!=p['path']:errors.append('Invalid source URL: '+p['path'])
        for key in ('sha256','semantic_sha256'):
            if not re.fullmatch(r'[0-9a-f]{64}',p[key]):errors.append('Invalid digest: '+p['path'])
        try:
            text=card(p)
            if len(text.split())>200:errors.append('Card exceeds 200 words: '+p['slug'])
        except (OSError,ValueError) as exc:errors.append(str(exc))
        if any(a not in p['source_anchors'] and a!='Overview' for a in p['evidence_sections']):errors.append('Unknown evidence anchor: '+p['slug'])
    if reached!=set(by_path):errors.append('Pages outside root topic tree')
    result={'snapshot_date':catalog['snapshot_date'],'pages':len(pages),'topic_tree_reachable':len(reached),
        'category_counts':{c:sum(p['category']==c for p in pages) for c in sorted({p['category'] for p in pages})},
        'errors':errors,'semantic_accuracy':'Not measured; a structural audit does not measure interpretation error.'}
    print(json.dumps(result,ensure_ascii=False,indent=2));return 1 if errors else 0

def refresh(args,catalog):
    old={p['path']:p for p in catalog['pages']};pending={PREFIX};seen=set();current={};failures=[]
    def job(path):
        try:
            raw,doc=retrieve(path);return path,raw,doc,None
        except (OSError,ValueError,urllib.error.URLError) as exc:return path,None,None,str(exc)
    while pending:
        batch=sorted(pending-seen);pending=set();seen.update(batch)
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            for path,raw,doc,error in pool.map(job,batch):
                if error:failures.append({'path':path,'error':error});continue
                headings,blocks,unknown,media=outline_and_blocks(doc)
                children=sorted({t for s in doc.get('topicSections',[]) for i in s.get('identifiers',[]) if (t:=normalize(i))})
                links={t for r in doc.get('references',{}).values() if r.get('kind') in ('article','symbol') and (t:=normalize(r.get('url')) or normalize(r.get('identifier')))}
                pending.update((links|set(children))-seen)
                current[path]={'title':doc['metadata']['title'],'sha256':digest(raw),'semantic_sha256':semantic_digest(doc),'topic_children':children,'unhandled_node_types':unknown}
        print(json.dumps({'fetched':len(current),'failures':len(failures),'pending':len(pending)}),file=sys.stderr,flush=True)
    result={'checked_at_utc':datetime.now(timezone.utc).isoformat(),'snapshot_date':catalog['snapshot_date'],
        'discovered_pages':len(current),'added':sorted(set(current)-set(old)),
        'changed_content_or_metadata':sorted(p for p in set(current)&set(old) if current[p]['semantic_sha256']!=old[p]['semantic_sha256']),
        'snapshot_pages_not_reached_or_failed':sorted(set(old)-set(current)),'failures':failures,
        'unhandled_node_types':{p:v['unhandled_node_types'] for p,v in current.items() if v['unhandled_node_types']},
        'action':'Review changed/new pages; update cards and catalog together. Unreached is not proof of removal; failures leave graph coverage incomplete.'}
    if args.report:
        dest=pathlib.Path(args.report);dest.parent.mkdir(parents=True,exist_ok=True)
        dest.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(result,ensure_ascii=False,indent=2));return 2 if failures else 0

def main():
    parser=argparse.ArgumentParser(description=__doc__);sub=parser.add_subparsers(dest='command',required=True)
    p=sub.add_parser('search');p.add_argument('query');p.add_argument('--limit',type=int,default=8)
    p.add_argument('--platform',choices=['ios','ipados','macos','tvos','visionos','watchos'])
    p=sub.add_parser('show');p.add_argument('slug')
    p=sub.add_parser('fetch');p.add_argument('slug');p.add_argument('--outline',action='store_true',help='Outline is the default.')
    p.add_argument('--section');p.add_argument('--max-words',type=int,default=1200)
    sub.add_parser('audit');p=sub.add_parser('refresh');p.add_argument('--report')
    args=parser.parse_args()
    if getattr(args,'max_words',1)<1 or getattr(args,'limit',1)<1:parser.error('Limits must be positive')
    catalog=load_catalog()
    if args.command=='search':search(args,catalog)
    elif args.command=='show':
        page=resolve(catalog,args.slug);print(card(page))
        if page['topic_children']:
            print('\nIndexed child topics:')
            by_path={p['path']:p for p in catalog['pages']}
            for path in page['topic_children']:
                p=by_path[path];print('- '+p['slug']+': '+p['title'])
    elif args.command=='fetch':fetch(args,catalog)
    elif args.command=='audit':return audit(catalog)
    elif args.command=='refresh':return refresh(args,catalog)
    return 0

if __name__=='__main__':
    if hasattr(sys.stdout,'reconfigure'):sys.stdout.reconfigure(encoding='utf-8')
    try:sys.exit(main())
    except (OSError,ValueError,urllib.error.URLError) as exc:
        print('HIG evidence unavailable: '+str(exc),file=sys.stderr);sys.exit(1)
