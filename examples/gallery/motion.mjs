/** Original web motion examples. Constants are example choices, not Apple specs. */
export const MOTIONS = [
  ['spring-retarget','Spring & retarget'],['sheet-presentation','Sheet presentation'],
  ['popover-origin','Anchored popover'],['button-feedback','Press feedback'],
  ['toggle-state','Toggle state'],['progress-update','Progress update'],
  ['tab-transition','Tab transition'],['expand-collapse','Expand & collapse'],
  ['reorder-list','List reordering'],['reduced-motion','Reduced alternative'],
];
export function springStep(state,elapsed){
  const dt=Math.min(Math.max(elapsed,0),1/60);
  const acceleration=(state.target-state.position)*260-state.velocity*32;
  const velocity=state.velocity+acceleration*dt;
  return {...state,velocity,position:state.position+velocity*dt};
}
export function ease(t){t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);}
export function phase(time){
  if(time<.35)return 0;if(time<.95)return ease((time-.35)/.6);
  if(time<1.7)return 1;if(time<2.35)return 1-ease((time-1.7)/.65);return 0;
}
export function frameState(name,time,reduced=false){
  const p=phase(time);
  const value=reduced?(p>=.5?1:0):p;
  return {name,time,value,position:20+value*260,opacity:reduced?1:value,
    progress:Math.round(20+value*65),scale:1-value*.05,active:value>=.5,reduced};
}
export function motionMarkup(name){
  const desktop='<div class="motion-desktop"></div><div class="motion-window"><div class="motion-title">● ● ● &nbsp; Fieldnotes</div><div class="motion-window-body"><h4>A place for your ideas.</h4><p>Keep context visible while completing a small task.</p><button tabindex="-1">Edit note</button></div></div>';
  if(name==='sheet-presentation')return desktop+'<div class="motion-scrim"></div><div class="motion-sheet"><h4>Edit note</h4><p>A focused task with a clear way back.</p><div class="row"><button tabindex="-1">Cancel</button><button tabindex="-1" class="primary">Save note</button></div></div>';
  if(name==='popover-origin')return desktop+'<div class="motion-floater"><h4>Document details</h4><p>Anchored to the control that opened it.</p></div>';
  if(name==='button-feedback')return '<div class="motion-button">Save note</div><div class="motion-caption">Press feedback is immediate. The label remains clear.</div>';
  if(name==='toggle-state')return '<div class="motion-switch"><div class="motion-thumb"></div></div><div class="motion-caption">Reading reminders: <strong data-motion-value>Off</strong></div>';
  if(name==='progress-update')return '<div class="motion-track"><div class="motion-progress"></div></div><div class="motion-caption">Loading collection: <strong data-motion-value>20%</strong></div>';
  if(name==='tab-transition')return '<div class="motion-tabs"><span>Today</span><span>Week</span></div><div class="motion-content">Today · 3 notes captured</div><div class="motion-caption">Related views retain a stable navigation frame.</div>';
  if(name==='expand-collapse')return '<div class="motion-floater"><h4>Export details <span data-motion-value>+</span></h4><p data-expanded>Format: Markdown<br>Include attachments: Yes<br>Destination: Downloads</p></div>';
  if(name==='reorder-list')return '<div class="motion-list"><div>01 &nbsp; Trail notes</div><div>02 &nbsp; Weekend plans</div><div>03 &nbsp; Reading list</div></div><div class="motion-caption">Stable items move to their new positions.</div>';
  if(name==='reduced-motion')return '<div class="motion-card">Ready</div><div class="motion-caption">Same result. Spatial movement is replaced by a direct state change.</div>';
  return '<div class="motion-card">Field note</div><div class="motion-caption">Retarget while moving. Start from the current position.</div>';
}
export function renderFrame(stage,name,time,reduced=false){
  const state=frameState(name,time,reduced);
  const p=state.value,find=selector=>stage.querySelector(selector);
  if(name==='sheet-presentation'){
    find('.motion-sheet').style.transform=`translateY(${(1-p)*210}px)`;
    find('.motion-sheet').style.opacity=String(p);
    find('.motion-scrim').style.opacity=String(p);
  }else if(name==='popover-origin'){
    const node=find('.motion-floater');node.style.transformOrigin='0 0';
    node.style.transform=`scale(${.93+.07*p})`;node.style.opacity=String(p);
  }else if(name==='button-feedback'){
    find('.motion-button').style.transform=`scale(${state.scale})`;
    find('.motion-button').textContent=state.active?'Saved':'Save note';
  }else if(name==='toggle-state'){
    find('.motion-thumb').style.transform=`translateX(${38*p}px)`;
    find('.motion-switch').style.background=state.active?'#2864d7':'#9caec3';
    find('[data-motion-value]').textContent=state.active?'On':'Off';
  }else if(name==='progress-update'){
    find('.motion-progress').style.width=state.progress+'%';find('[data-motion-value]').textContent=state.progress+'%';
  }else if(name==='tab-transition'){
    const tabs=stage.querySelectorAll('.motion-tabs span');tabs[0].classList.toggle('selected',!state.active);tabs[1].classList.toggle('selected',state.active);
    find('.motion-content').textContent=state.active?'This week · 18 notes captured':'Today · 3 notes captured';
    find('.motion-content').style.opacity=String(reduced?1:.55+Math.abs(p-.5)*.9);
  }else if(name==='expand-collapse'){
    const details=find('[data-expanded]');details.style.height=(reduced?(state.active?54:0):54*p)+'px';details.style.overflow='hidden';details.style.opacity=String(p);
    find('[data-motion-value]').textContent=state.active?'−':'+';
  }else if(name==='reorder-list'){
    const nodes=stage.querySelectorAll('.motion-list div');nodes[0].style.transform=`translateY(${52*p}px)`;nodes[1].style.transform=`translateY(${52*(1-p)}px)`;nodes[2].style.transform='translateY(104px)';
  }else{
    const width=stage.clientWidth||600;
    const x=20+p*Math.max(0,width-180);
    find('.motion-card').style.transform=`translateX(${name==='reduced-motion'||reduced?(state.active?Math.max(0,width-180):0):x-20}px)`;
  }
  return state;
}
export function mountMotion(root,onStatus,getReduced,initial='spring-retarget'){
  let name=initial,raf=0,started=0,paused=false,lastTime=0;
  root.innerHTML='<div class="motion-lab"><div class="motion-choices" role="group" aria-label="Motion examples">'+MOTIONS.map(([id,label])=>`<button data-motion="${id}" aria-pressed="${id===name}">${label}</button>`).join('')+'</div><div class="motion-stage" aria-label="Motion preview"></div><div class="motion-foot"><button class="primary" data-play>Replay animation</button><button data-pause disabled>Pause</button><small>Original timing values · reduced-motion support</small></div></div>';
  const stage=root.querySelector('.motion-stage'),pause=root.querySelector('[data-pause]');
  const choose=next=>{cancelAnimationFrame(raf);name=next;stage.innerHTML=motionMarkup(name);renderFrame(stage,name,0,getReduced());for(const b of root.querySelectorAll('[data-motion]'))b.setAttribute('aria-pressed',String(b.dataset.motion===name));pause.disabled=true;onStatus('Selected '+MOTIONS.find(m=>m[0]===name)[1]+'. Replay when ready.');};
  const tick=now=>{if(paused)return;lastTime=Math.min((now-started)/1000,2.8);renderFrame(stage,name,lastTime,getReduced());if(lastTime<2.8)raf=requestAnimationFrame(tick);else{pause.disabled=true;onStatus('Animation complete. '+(getReduced()?'Reduced motion preserved the same outcome.':'Replay or choose another example.'));}};
  root.querySelector('[data-play]').addEventListener('click',()=>{cancelAnimationFrame(raf);paused=false;started=performance.now();pause.disabled=false;pause.textContent='Pause';raf=requestAnimationFrame(tick);onStatus('Playing '+name+'. You can pause or replay immediately.');});
  pause.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'Resume':'Pause';if(paused){cancelAnimationFrame(raf);onStatus('Animation paused.');}else{started=performance.now()-lastTime*1000;raf=requestAnimationFrame(tick);}});
  for(const button of root.querySelectorAll('[data-motion]'))button.addEventListener('click',()=>choose(button.dataset.motion));
  choose(name);return ()=>cancelAnimationFrame(raf);
}
