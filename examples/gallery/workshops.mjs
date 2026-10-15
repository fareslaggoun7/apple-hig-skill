/** Source-linked platform workshops. Each scenario has its own task and implementation. */
import {IOS} from './workshops/ios.mjs';
import {IPADOS} from './workshops/ipados.mjs';
import {MACOS} from './workshops/macos.mjs';
import {WATCHOS} from './workshops/watchos.mjs';
import {DUO} from './workshops/duo.mjs';
import {PRINCIPLES} from './workshops/principles.mjs';
import {GAMES} from './workshops/games.mjs';
import {TVOS} from './workshops/tvos.mjs';
import {VISIONOS} from './workshops/visionos.mjs';
import {START} from './workshops/start.mjs';
import {e} from './workshops/shared.mjs';
export const WORKSHOPS=[IOS,IPADOS,MACOS,WATCHOS,DUO,PRINCIPLES,GAMES,TVOS,VISIONOS,START];
export const WORKSHOP_ORDER=['designing-for-ios','designing-for-ipados','designing-for-macos','designing-for-watchos','designing-for-iphone-duo','design-principles','designing-for-games','designing-for-tvos','designing-for-visionos','getting-started'];
export const workshopCatalog=()=>({schema_version:1,workshops:WORKSHOPS.map(w=>({id:w.id,label:w.label,short:w.short,order:w.order,scope:w.scope,reference:w.reference,related:w.related,scenarios:w.scenarios.map(s=>({id:s.id,title:s.title,task:s.task,principle:s.principle,source:s.source,skin:s.skin}))}))});
export function mountWorkshop(c){
  const workshop=WORKSHOPS.find(w=>w.id===c.topic.slug);
  if(!workshop)throw Error('Unimplemented workshop: '+c.topic.slug);
  const states=new Map(),params=new URLSearchParams(location.search);
  let example=workshop.scenarios.find(s=>s.id===params.get('example'))||workshop.scenarios[0],cleanups=[],disposed=false;
  const abort=new AbortController(),signal=abort.signal;let sceneAbort=new AbortController();
  c.root.innerHTML=`<div class="workshop" data-workshop="${workshop.id}"><div class="wk-heading"><div><span class="wk-kicker">${e(workshop.short)} / DESIGN WORKSHOP</span><h3>Make the next action feel clear.</h3></div><span class="wk-chip">${workshop.scenarios.length} studies</span></div><div class="wk-toolbar"><label>Choose a study<select data-w-scenario>${workshop.scenarios.map(s=>`<option value="${s.id}">${e(s.title)}</option>`).join('')}</select></label><label>Web text size<select data-w-size><option value="1">100%</option><option value="1.25">125%</option><option value="1.5">150%</option></select></label><label>Layout study<select data-w-width><option value="regular">Regular</option><option value="compact">Compact</option><option value="wide">Wide</option></select></label></div><p class="wk-task" data-w-task></p><div class="wk-workbench" data-layout="regular"><div class="wk-scene"></div></div><div class="wk-foot"><button data-w-reset>Reset this study</button><a data-w-permalink>Link to this study</a><a data-w-source target="_blank" rel="noreferrer">Apple source section ↗</a></div><p class="wk-principle" data-w-principle></p><p class="wk-scope">${e(workshop.scope)} Dimensions and styling are original web choices. Native device, SDK, and assistive-technology checks remain separate.</p></div>`;
  const root=c.root,scene=root.querySelector('.wk-scene'),$=selector=>root.querySelector(selector);
  const ctx={root,signal,workshop,status:c.status,reduced:c.reduced,navigate:c.navigate,topics:c.topics,focus:null,
    get state(){if(!states.has(example.id))states.set(example.id,example.initial());return states.get(example.id);},
    get example(){return example;},get sceneSignal(){return sceneAbort.signal;},
    own(fn){cleanups.push(fn);},
    timer(fn,delay){const id=setTimeout(()=>{if(!disposed)fn();},delay);const cancel=()=>clearTimeout(id);cleanups.push(cancel);return cancel;},
    interval(fn,delay){const id=setInterval(()=>{if(!disposed)fn();},delay);const cancel=()=>clearInterval(id);cleanups.push(cancel);return cancel;},
    render(){
      if(disposed)return;
      const active=document.activeElement,key=ctx.focus||(scene.contains(active)?active.dataset.focusKey:null),selection=active?.selectionStart;
      sceneAbort.abort();sceneAbort=new AbortController();
      scene.className='wk-scene wk-'+(example.skin||'workspace');scene.innerHTML=example.render(ctx);ctx.focus=null;example.afterRender?.(ctx,scene);
      if(key){const target=[...scene.querySelectorAll('[data-focus-key]')].find(n=>n.dataset.focusKey===key);target?.focus({preventScroll:true});if(target&&typeof selection==='number'&&target.matches('input:not([type=range]),textarea')){try{target.setSelectionRange(selection,selection);}catch{}}}
    }};
  const cleanupCase=()=>{if(states.has(example.id))example.leave?.(ctx);for(const fn of cleanups.reverse())fn();cleanups=[];ctx.cancelPending=null;for(const dialog of root.querySelectorAll('dialog'))dialog.remove();};
  const choose=(id,updateURL=true)=>{
    cleanupCase();example=workshop.scenarios.find(s=>s.id===id)||workshop.scenarios[0];$('[data-w-scenario]').value=example.id;
    $('[data-w-task]').textContent=example.task;$('[data-w-principle]').textContent=example.principle;$('[data-w-source]').href=example.source;
    const url=new URL(location.href);url.search='';url.searchParams.set('topic',workshop.id);url.searchParams.set('example',example.id);$('[data-w-permalink]').href=url.href;
    if(updateURL)history.replaceState({},'',url);ctx.render();c.status('Selected '+example.title+'. Changes stay in this workshop.');
  };
  root.addEventListener('click',ev=>{const b=ev.target.closest('[data-w-action]');if(b&&root.contains(b))example.action?.(ctx,b.dataset.wAction,ev);},{signal});
  root.addEventListener('input',ev=>{const key=ev.target.dataset.wField;if(key)example.input?.(ctx,key,ev.target.type==='checkbox'?ev.target.checked:ev.target.value,ev);},{signal});
  root.addEventListener('change',ev=>{const key=ev.target.dataset.wChange;if(key)example.input?.(ctx,key,ev.target.type==='checkbox'?ev.target.checked:ev.target.value,ev);},{signal});
  root.addEventListener('keydown',ev=>{if(scene.contains(ev.target))example.key?.(ctx,ev);},{signal});
  root.addEventListener('submit',ev=>{if(ev.target.dataset.wForm){ev.preventDefault();example.action?.(ctx,ev.target.dataset.wForm,ev);}},{signal});
  $('[data-w-scenario]').addEventListener('change',ev=>choose(ev.target.value),{signal});
  $('[data-w-size]').addEventListener('change',ev=>{$('.wk-workbench').style.setProperty('--wk-scale',ev.target.value);c.status('Web text size changed. Current task and entered content are preserved.');},{signal});
  $('[data-w-width]').addEventListener('change',ev=>{$('.wk-workbench').dataset.layout=ev.target.value;c.status('Layout study changed. Current task and entered content are preserved.');},{signal});
  $('[data-w-reset]').addEventListener('click',()=>{cleanupCase();states.delete(example.id);ctx.render();c.status('Study reset to its initial state.');},{signal});
  root.addEventListener('reducedmotionchange',()=>c.status('Motion preference updated. Study selection and entered content are preserved.'),{signal});
  choose(example.id,false);
  return ()=>{disposed=true;cleanupCase();sceneAbort.abort();abort.abort();};
}
