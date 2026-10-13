import {mountSpecimen, escapeHTML as e} from './specimens.mjs';
import {renderFrame, MOTIONS} from './motion.mjs';

const $=id=>document.getElementById(id),params=new URLSearchParams(location.search);
let cleanup=()=>{},topics=[],current;
const preference=matchMedia('(prefers-reduced-motion: reduce)');
$('reduce-motion').checked=preference.matches||params.get('reduced')==='1';
const reduced=()=>$('reduce-motion').checked;
function applyReduced(){document.body.classList.toggle('reduce-motion',reduced());}
applyReduced();
preference.addEventListener('change',ev=>{$('reduce-motion').checked=ev.matches;applyReduced();if(current)open(current.slug,false);});
$('reduce-motion').addEventListener('change',()=>{applyReduced();if(current)open(current.slug,false);});
$('appearance').addEventListener('click',ev=>{const dark=document.body.classList.toggle('dark');ev.currentTarget.setAttribute('aria-pressed',String(dark));ev.currentTarget.textContent=dark?'Light appearance':'Dark appearance';});
function status(message){$('result').textContent=message;}
function list(){
  const query=$('topic-search').value.trim().toLowerCase(),category=$('category').value;
  const filtered=topics.filter(t=>(category==='all'||t.category===category)&&[t.title,t.slug,t.scenario].join(' ').toLowerCase().includes(query));
  $('topic-count').textContent=filtered.length+' / '+topics.length;
  $('topic-list').innerHTML=filtered.length?filtered.map(t=>`<a class="topic-link" href="?topic=${t.slug}" data-topic="${t.slug}" ${t.slug===current?.slug?'aria-current="page"':''}><span>${e(t.title)}</span><small>${t.mode==='simulation'?'MODEL':'WEB'}</small></a>`).join(''):'<p class="muted">No matching topics. Clear the search or choose another family.</p>';
}
function open(slug,push=true){
  const topic=topics.find(t=>t.slug===slug);
  if(!topic){status('Unknown topic. Choose a topic from the library.');return;}
  cleanup();current=topic;
  if(push){const url=new URL(location);url.searchParams.set('topic',slug);url.searchParams.delete('motion');url.searchParams.delete('frame');url.searchParams.delete('record');history.pushState({},'',url);}
  $('demo-heading').textContent=topic.title;$('scenario').textContent=topic.scenario;
  $('mode').textContent=topic.mode==='simulation'?'Integration / hardware model':'Web adaptation';$('mode').classList.toggle('simulation',topic.mode==='simulation');
  $('guidance').textContent=topic.guidance;$('source-link').href=topic.source;$('platforms').textContent=topic.platforms.length?'Source page metadata: '+topic.platforms.join(', '):'Collection overview';
  $('try-it').textContent=topic.action+'. Try the visible controls and keyboard. Refresh or switch topics to reset local state.';
  $('scope').textContent=topic.mode==='simulation'?'The controls run locally, but the underlying device, payment, account, or SDK behavior is simulated. Nothing is charged or transmitted.':'This runs in the browser. Visual choices and timing are original example values, not native Apple specifications. Assistive-technology and Apple-device behavior require separate testing.';
  status('Try the controls. Changes stay in this example.');
  cleanup=mountSpecimen($('stage'),topic,{status,reduced,topics,navigate:open});
  document.body.dataset.topic=slug;list();
}
$('topic-list').addEventListener('click',ev=>{const a=ev.target.closest('[data-topic]');if(a&&!ev.ctrlKey&&!ev.metaKey){ev.preventDefault();open(a.dataset.topic);}});
$('topic-search').addEventListener('input',list);$('category').addEventListener('change',list);
document.querySelector('.motion-strip a').addEventListener('click',ev=>{ev.preventDefault();open('motion');});
window.addEventListener('popstate',()=>open(new URLSearchParams(location.search).get('topic')||'buttons',false));
window.addEventListener('pagehide',()=>cleanup());
try{
  const response=await fetch('catalog.json');if(!response.ok)throw Error('Catalog HTTP '+response.status);
  const catalog=await response.json();topics=catalog.topics;
  open(params.get('topic')||'buttons',false);
  if(params.get('record')==='1'){
    document.body.classList.add('record-view');
    if(current.kind==='motion'&&params.has('frame')){
      const name=params.get('motion')||'spring-retarget';if(!MOTIONS.some(m=>m[0]===name))throw Error('Unknown motion '+name);
      renderFrame($('stage').querySelector('.motion-stage'),name,Number(params.get('frame')),reduced());
    }
  }
  window.galleryReady=true;
}catch(error){$('demo-heading').textContent='The gallery could not start';$('stage').textContent=error.message+'. Serve this directory with a local HTTP server; ES modules cannot run from file://.';console.error(error);}
