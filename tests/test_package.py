import argparse
import contextlib
import importlib.util
import io
import json
from pathlib import Path
import re
import tempfile
import unittest
from urllib.parse import urlsplit,unquote
import zipfile

ROOT=Path(__file__).resolve().parents[1]

def module(name,path):
    spec=importlib.util.spec_from_file_location(name,path);value=importlib.util.module_from_spec(spec);spec.loader.exec_module(value);return value

hig=module('hig',ROOT/'skills/apple-hig/scripts/hig.py')
installer=module('installer',ROOT/'tools/install.py')
packager=module('packager',ROOT/'tools/package.py')

class PackageTests(unittest.TestCase):
    def test_complete_catalog(self):
        data=hig.load_catalog()
        self.assertEqual(len(data['pages']),173)
        with contextlib.redirect_stdout(io.StringIO()):self.assertEqual(hig.audit(data),0)
        self.assertEqual({p['category'] for p in data['pages']},{'getting-started','foundations','patterns','components','inputs','technologies'})

    def test_real_topic_lookup(self):
        data=hig.load_catalog();page=hig.resolve(data,'sidebars')
        self.assertIn('Sidebars',hig.card(page))
        stream=io.StringIO()
        with contextlib.redirect_stdout(stream):hig.search(argparse.Namespace(query='navigation',platform='ipados',limit=8),data)
        matches=[json.loads(x) for x in stream.getvalue().splitlines()]
        self.assertIn('sidebars',{p['slug'] for p in matches})
        self.assertNotIn('designing-for-watchos',{p['slug'] for p in matches})

    def test_parser_context_and_new_schema(self):
        doc={'references':{},'primaryContentSections':[{'kind':'content','content':[
            {'type':'heading','text':'Platform','anchor':'Platform','level':2},
            {'type':'heading','text':'iOS','anchor':'iOS','level':3},
            {'type':'paragraph','inlineContent':[{'type':'text','text':'Use'},{'type':'codeVoice','code':'testControl'}]},
            {'type':'table','rows':[[[{'type':'paragraph','inlineContent':[{'type':'text','text':'Minimum'}]}],[{'type':'paragraph','inlineContent':[{'type':'text','text':'44 pt'}]}]]]},
            {'type':'tabNavigator','tabs':[{'title':'Mac','content':[{'type':'paragraph','inlineContent':[{'type':'text','text':'A separate tab'}]}]}]},
            {'type':'aside','name':'Important','style':'important','content':[{'type':'paragraph','inlineContent':[{'type':'text','text':'Context matters'}]}]},
            {'type':'futureType','content':[{'type':'paragraph','inlineContent':[{'type':'text','text':'Flag this schema'}]}]}
        ]}]}
        headings,blocks,unknown,media=hig.outline_and_blocks(doc)
        self.assertEqual(blocks[0]['sections'],['Platform','iOS'])
        self.assertEqual(blocks[0]['text'],'Use testControl')
        self.assertEqual(blocks[1]['table'],[['Minimum','44 pt']])
        self.assertEqual(blocks[2]['tab'],'Mac')
        self.assertEqual(blocks[3]['aside']['style'],'important')
        self.assertIn('futureType',unknown)

    def test_source_boundaries(self):
        self.assertIsNone(hig.normalize('https://example.com/design/human-interface-guidelines/buttons'))
        self.assertIsNone(hig.normalize('http://developer.apple.com/design/human-interface-guidelines/buttons'))
        self.assertIsNone(hig.normalize('https://developer.apple.com/design/human-interface-guidelines/../x'))
        self.assertEqual(hig.topic_path('buttons'),'/design/human-interface-guidelines/buttons')

    def test_installer_preserves_existing_content(self):
        with tempfile.TemporaryDirectory() as temp:
            parent=Path(temp)/'skills'
            self.assertIn('Would copy',installer.install(parent,dry_run=True))
            self.assertFalse(parent.exists())
            self.assertIn('Installed',installer.install(parent))
            self.assertEqual(installer.snapshot(installer.SOURCE),installer.snapshot(parent/'apple-hig'))
            self.assertIn('Already up to date',installer.install(parent))
            marker=parent/'apple-hig/personal.txt';marker.write_text('Preserve me')
            with self.assertRaises(FileExistsError):installer.install(parent)
            self.assertEqual(marker.read_text(),'Preserve me')

    def test_zip_is_portable_and_complete(self):
        data=packager.archive_bytes()
        self.assertEqual(data,packager.archive_bytes())
        with zipfile.ZipFile(io.BytesIO(data)) as z:
            self.assertIsNone(z.testzip())
            self.assertIn('apple-hig/SKILL.md',z.namelist())
            self.assertIn('apple-hig/LICENSE',z.namelist())
            for name in z.namelist():
                self.assertTrue(name.startswith('apple-hig/'))
                self.assertNotIn('..',Path(name).parts)
                self.assertNotIn('__pycache__',name)
                source=ROOT/'skills'/name
                self.assertEqual(z.read(name),source.read_bytes())

    def test_documentation_links(self):
        catalog=hig.load_catalog();pages={p['path']:p for p in catalog['pages']}
        for file in ROOT.rglob('*.md'):
            text=file.read_text(encoding='utf-8')
            targets=re.findall(r'\[[^\]]+\]\(([^)]+)\)',text)+re.findall(r'<img[^>]+src="([^"]+)"',text)
            for target in targets:
                url=urlsplit(target)
                if url.scheme in ('http','https'):
                    if url.netloc=='developer.apple.com' and url.path.startswith(hig.PREFIX):
                        page=pages[url.path.lower().rstrip('/')]
                        if url.fragment:self.assertIn(unquote(url.fragment),page['source_anchors'],str(file)+' '+target)
                elif url.path:
                    resolved=(file.parent/unquote(url.path)).resolve()
                    self.assertTrue(resolved.is_relative_to(ROOT),str(file)+' '+target)
                    self.assertTrue(resolved.exists(),str(file)+' '+target)

    def test_package_comparison_ignores_platform_order(self):
        expected=packager.archive_bytes();reordered=io.BytesIO()
        with zipfile.ZipFile(io.BytesIO(expected)) as source,zipfile.ZipFile(reordered,'w') as target:
            for name in reversed(source.namelist()):target.writestr(name,source.read(name))
        self.assertTrue(packager.archives_equivalent(reordered.getvalue(),expected))
        changed=io.BytesIO()
        with zipfile.ZipFile(io.BytesIO(expected)) as source,zipfile.ZipFile(changed,'w') as target:
            for name in source.namelist():target.writestr(name,source.read(name)+(b'changed' if name.endswith('/SKILL.md') else b''))
        self.assertFalse(packager.archives_equivalent(changed.getvalue(),expected))

    def test_no_machine_specific_private_paths(self):
        for folder in [ROOT/'skills',ROOT/'docs',ROOT/'examples']:
            for file in folder.rglob('*'):
                if file.is_file() and file.suffix in ('.md','.json','.html','.yaml','.svg'):
                    self.assertNotIn('fl21056',file.read_text(encoding='utf-8'),str(file))

if __name__=='__main__':unittest.main()
