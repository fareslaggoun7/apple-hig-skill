/** Original browser illustrations. Durations and physics are teaching choices, not Apple specifications. */
export const MOTION_DURATION = 2.8;
const guidance = 'https://developer.apple.com/design/human-interface-guidelines/motion';
export const MOTION_EXAMPLES = [
  {id:'spring-retarget',label:'Spring & retarget',group:'Continuity',purpose:'Change destination while a note is moving, preserving its current position and velocity.',outcome:'The note settles at the selected destination.',reduced:'Keep the note stationary and name the selected destination.',topic:'gestures'},
  {id:'sheet-presentation',label:'Sheet presentation',group:'Navigation',purpose:'Introduce a focused editing task while preserving the document behind it.',outcome:'The editing sheet is open above the document.',reduced:'Reveal the sheet and dimmed context directly.',topic:'sheets'},
  {id:'popover-origin',label:'Anchored popover',group:'Navigation',purpose:'Associate document details with the control that opened them.',outcome:'Document details are visible beside their source.',reduced:'Show the details directly at their final location.',topic:'popovers'},
  {id:'button-feedback',label:'Press feedback',group:'Feedback',purpose:'Acknowledge a save promptly, with a readable result that remains visible.',outcome:'The note is saved; the confirmation remains visible.',reduced:'Change the label to Saved without scaling.',topic:'buttons'},
  {id:'toggle-state',label:'Toggle state',group:'Feedback',purpose:'Coordinate the control position, checkmark, and explicit On or Off label.',outcome:'Reading reminders are On.',reduced:'Switch directly to the checked On state.',topic:'toggles'},
  {id:'progress-update',label:'Progress update',group:'Feedback',purpose:'Keep the numeric value and measurable progress track in agreement.',outcome:'Collection loading has reached 85 percent.',reduced:'Update the track and value directly, without interpolating.',topic:'progress-indicators'},
  {id:'tab-transition',label:'Tab transition',group:'Navigation',purpose:'Replace related content while keeping the navigation frame stable.',outcome:'Week is selected and its 18 notes are visible.',reduced:'Replace content directly and keep the selected-tab label.',topic:'tab-bars'},
  {id:'expand-collapse',label:'Expand & collapse',group:'Content',purpose:'Reveal optional export details in the same local context.',outcome:'Export details are expanded.',reduced:'Show the complete details directly.',topic:'disclosure-controls'},
  {id:'reorder-list',label:'List reordering',group:'Content',purpose:'Track the identities of items as their positions change.',outcome:'Weekend plans precedes Trail notes; Reading list stays third.',reduced:'Change the order directly, preserving item labels.',topic:'drag-and-drop'},
  {id:'reduced-motion',label:'Reduced alternative',group:'Continuity',purpose:'Communicate the same completed update using stationary text and a checkmark.',outcome:'The stationary note reads Updated.',reduced:'This example is stationary in both modes.',topic:'accessibility'},
  {id:'navigation-push',label:'Navigate to detail',group:'Navigation',purpose:'Follow a note into its detail view while retaining a clear collection relationship.',outcome:'Trail notes detail is open, with a collection back label.',reduced:'Replace the collection with detail without sliding.',topic:'navigation-and-search'},
  {id:'navigation-back',label:'Return to collection',group:'Navigation',purpose:'Reverse the detail transition to return to the originating collection.',outcome:'The collection is visible with Trail notes identified.',reduced:'Replace detail with the collection directly.',topic:'navigation-and-search'},
  {id:'shared-element',label:'Shared element',group:'Continuity',purpose:'Keep the same original landscape recognizable as its card becomes a detail header.',outcome:'The landscape is shown in a larger detail header.',reduced:'Replace the card with its final detail layout.',topic:'images'},
  {id:'crossfade-media',label:'Image replacement',group:'Content',purpose:'Replace an image within fixed bounds, so surrounding content does not jump.',outcome:'The evening landscape replaces the morning image.',reduced:'Swap the two images directly.',topic:'image-views'},
  {id:'search-filter',label:'Filter a collection',group:'Content',purpose:'Keep matching results recognizable while nonmatching items leave the list.',outcome:'Two matching notes remain, with a readable result count.',reduced:'Show the two matching results directly.',topic:'searching'},
  {id:'list-insert',label:'Insert an item',group:'Content',purpose:'Make room for a new note while keeping existing items identifiable.',outcome:'Morning sketch is first; the previous notes remain below it.',reduced:'Show the new list order directly.',topic:'lists-and-tables'},
  {id:'undo-removal',label:'Remove & undo',group:'Content',purpose:'Illustrate removal followed by an explicit undo that restores the same item.',outcome:'Undo restores Weekend plans to its original position.',reduced:'Use direct removed and restored states with explicit text.',topic:'undo-and-redo'},
  {id:'loading-handoff',label:'Loading to content',group:'Feedback',purpose:'Replace a quiet placeholder with readable content in the same bounds.',outcome:'Trail notes is ready; the loading placeholder is gone.',reduced:'Replace the placeholder with loaded content directly.',topic:'loading'},
  {id:'pull-refresh',label:'Refresh feedback',group:'Feedback',purpose:'Illustrate a refresh that ends with an explicit update time; no network request occurs.',outcome:'The local illustration says Updated just now.',reduced:'Keep the indicator stationary and update its status text.',topic:'loading'},
  {id:'toast-feedback',label:'Save confirmation',group:'Feedback',purpose:'Acknowledge completion near the task without hiding the document.',outcome:'A persistent Note saved confirmation is visible.',reduced:'Show the confirmation directly without sliding.',topic:'feedback'},
  {id:'validation-feedback',label:'Inline validation',group:'Feedback',purpose:'Explain what needs correction beside the field, without shaking the interface.',outcome:'The title field has a readable Enter a title correction.',reduced:'Show the same error directly, without movement.',topic:'entering-data'},
  {id:'number-change',label:'Numeric change',group:'Feedback',purpose:'Associate a changed total with its label and unit, retaining the exact final value.',outcome:'The reading total is 85 minutes.',reduced:'Replace 20 with 85 directly; keep minutes visible.',topic:'gauges'},
  {id:'selection-highlight',label:'Selection highlight',group:'Navigation',purpose:'Move a restrained indicator between related views while preserving their labels.',outcome:'Week is selected; the 18-note total is visible.',reduced:'Change the indicator and selected label directly.',topic:'segmented-controls'},
  {id:'focus-transition',label:'Focus emphasis',group:'Continuity',purpose:'Illustrate a restrained focus change with a border and explicit Focused label.',outcome:'Evening walk is identified as the focused card.',reduced:'Change the focus border and text without enlarging cards.',topic:'focus-and-selection'},
].map(example=>({...example,source:guidance+'#'+(example.group==='Feedback'?'Providing-feedback':'Best-practices')}));
export const MOTIONS = MOTION_EXAMPLES.map(({id,label})=>[id,label]);
const examples = new Map(MOTION_EXAMPLES.map(example=>[example.id,example]));
const clamp = (value,low=0,high=1)=>Math.max(low,Math.min(high,Number.isFinite(value)?value:low));
export const motionExample = name=>examples.get(name)||examples.get('spring-retarget');

export function springStep(state,elapsed){
  const duration=clamp(elapsed,0,.1),steps=Math.max(1,Math.ceil(duration*240)),dt=duration/steps;
  let {position,velocity}=state;
  for(let i=0;i<steps;i++){velocity+=((state.target-position)*260-velocity*32)*dt;position+=velocity*dt;}
  return {...state,velocity,position};
}
export function retarget(state,target){return {...state,target};}
export function springAt(time){
  const end=clamp(time,0,MOTION_DURATION);
  let state={position:0,velocity:0,target:0};
  for(let i=0;i<Math.ceil(end*240);i++){
    const t=i/240,target=t<.2?0:t<.5?1:t<.85?.25:1;
    state=springStep(retarget(state,target),Math.min(1/240,end-t));
  }
  return state;
}
export function ease(t){t=clamp(t);return t*t*(3-2*t);}
export function phase(time){return ease((clamp(time,0,MOTION_DURATION)-.25)/.9);}
export function frameState(name,time,reduced=false){
  name=motionExample(name).id;time=clamp(time,0,MOTION_DURATION);
  const physical=name==='spring-retarget'?springAt(time):null;
  let p=physical?physical.position:phase(time);
  if(name==='undo-removal')p=phase(time)*(1-ease((time-1.65)/.65));
  const direct=reduced||name==='reduced-motion',value=direct?(p>=.5?1:0):p;
  const active=value>=.5,complete=time>=MOTION_DURATION;
  return {name,time,value,position:20+value*260,opacity:direct?1:value,
    progress:Math.round(20+value*65),scale:direct?1:1-.04*Math.sin(clamp(p)*Math.PI),active,reduced:direct,complete,
    summary:name==='undo-removal'?(time>=2.3?'Weekend plans restored. All three notes are present.':active?'Weekend plans removed. Undo is available.':'All three notes are present.'):
      complete?motionExample(name).outcome:active?'After: '+motionExample(name).outcome:'Before: '+motionExample(name).purpose};
}

const caption = text=>`<div class="motion-caption">${text}</div>`;
const art = (extra='')=>`<div class="motion-art ${extra}"><i></i><b></b></div>`;
const list = labels=>'<div class="motion-list">'+labels.map(label=>`<div>${label}</div>`).join('')+'</div>';
const desktop = '<div class="motion-desktop"></div><div class="motion-window"><div class="motion-title">● ● ● &nbsp; Fieldnotes</div><div class="motion-window-body"><h4>A place for your ideas.</h4><p>Keep the document in context.</p><span class="motion-action">Edit note</span></div></div>';
export function motionMarkup(name){
  name=motionExample(name).id;
  if(name==='sheet-presentation')return desktop+'<div class="motion-scrim"></div><div class="motion-sheet"><h4>Edit note</h4><p>A focused task with a clear way back.</p><div class="row"><span class="motion-action secondary">Cancel</span><span class="motion-action">Save note</span></div></div>';
  if(name==='popover-origin')return desktop+'<div class="motion-floater popover-illustration"><h4>Document details</h4><p>Today · 42 words<br>Collection: Field notes</p></div>';
  if(name==='button-feedback')return '<div class="motion-button">Save note</div>'+caption('Acknowledge the action. Keep its result readable.');
  if(name==='toggle-state')return '<div class="motion-switch"><div class="motion-thumb"></div><span data-check>✓</span></div>'+caption('Reading reminders: <strong data-motion-value>Off</strong>');
  if(name==='progress-update')return '<div class="motion-track"><div class="motion-progress"></div></div>'+caption('Loading collection: <strong data-motion-value>20%</strong>');
  if(name==='tab-transition'||name==='selection-highlight')return '<div class="motion-tabs"><i class="motion-tab-indicator"></i><span>Today</span><span>Week</span></div><div class="motion-content">Today · 3 notes captured</div>'+caption('A stable frame for related views.');
  if(name==='expand-collapse')return '<div class="motion-floater disclosure-illustration"><h4>Export details <span data-motion-value>+</span></h4><p data-expanded>Format: Markdown<br>Attachments: Included<br>Destination: Downloads</p></div>'+caption('Optional detail stays with its heading.');
  if(name==='reorder-list')return list(['01 &nbsp; Trail notes','02 &nbsp; Weekend plans','03 &nbsp; Reading list'])+caption('The same items retain their identity.');
  if(name==='reduced-motion')return '<div class="motion-card">Ready</div>'+caption('A stationary update communicates the same result.');
  if(name==='navigation-push'||name==='navigation-back')return '<div class="motion-navigation"><div class="motion-nav-list"><small>FIELDNOTES / COLLECTION</small><h4>Your notes</h4><div>Trail notes <span>›</span></div><div>Weekend plans <span>›</span></div></div><div class="motion-nav-detail"><small>‹ Collection</small><h4>Trail notes</h4><p>A quiet morning on the ridge.<br>Keep the path home easy to find.</p></div></div>'+caption(name==='navigation-back'?'Return along the same relationship.':'The detail belongs to its collection.');
  if(name==='shared-element')return '<div class="motion-shared">'+art()+'<div class="motion-shared-copy"><small>FIELD JOURNAL</small><h4>A morning outside</h4><p>The same landscape, now in detail.</p></div></div>'+caption('Recognize the content through a change of layout.');
  if(name==='crossfade-media')return '<div class="motion-media">'+art() + art('evening')+'</div>'+caption('<strong data-motion-value>Morning landscape</strong> · original illustration');
  if(name==='search-filter')return '<div class="motion-query">Search: <strong data-motion-value>All notes</strong></div>'+list(['Trail notes','Weekend plans','Trail map'])+caption('<strong data-motion-count>3 notes</strong>');
  if(name==='list-insert')return list(['Morning sketch <span>New</span>','Trail notes','Weekend plans'])+caption('Make room while preserving existing items.');
  if(name==='undo-removal')return list(['Trail notes','Weekend plans','Reading list'])+'<div class="motion-undo" data-motion-value>All three notes are present</div>';
  if(name==='loading-handoff')return '<div class="motion-load"><div class="motion-placeholder"><span></span><span></span><span></span><small>Loading notes…</small></div><div class="motion-loaded"><small>COLLECTION / READY</small><h4>Trail notes</h4><p>A quiet morning on the ridge.</p><span>3 notes ready to read</span></div></div>'+caption('Quiet placeholders give way to useful content.');
  if(name==='pull-refresh')return '<div class="motion-refresh"><i>↻</i><strong data-motion-value>Pull to refresh · illustration</strong><div>Trail notes<span>Weekend plans</span></div></div>'+caption('Local illustration · no network request');
  if(name==='toast-feedback')return desktop+'<div class="motion-toast">✓ &nbsp; Note saved<span>Your document remains open.</span></div>';
  if(name==='validation-feedback')return '<div class="motion-validation"><label>Note title</label><div class="motion-input">Add a title…</div><p>Enter a title before saving.</p><small>Your draft is preserved.</small></div>'+caption('A readable correction, without a shake.');
  if(name==='number-change')return '<div class="motion-number"><small>READING TODAY</small><div><strong data-motion-value>20</strong><span>minutes</span></div><p>Daily reading total</p></div>'+caption('The exact value remains visible after the transition.');
  if(name==='focus-transition')return '<div class="motion-focus"><div>'+art()+'<strong>Morning trail</strong><small>Focused</small></div><div>'+art('evening')+'<strong>Evening walk</strong><small>Available</small></div></div>'+caption('A border and label carry focus without relying on scale.');
  return '<div class="motion-rail"><span>Left</span><span>Right</span></div><div class="motion-card">Field note</div>'+caption('Retarget from the current position and velocity.');
}

function drawSpring(stage,spring,reduced){
  const card=stage.querySelector('.motion-card');
  const travel=Math.max(0,stage.clientWidth-card.offsetWidth-48);
  card.style.transform=`translateX(${reduced?0:spring.position*travel}px)`;
  card.textContent=reduced?(spring.target>=.5?'Right selected':'Left selected'):'Field note';
}
export function renderFrame(stage,name,time,reduced=false){
  const state=frameState(name,time,reduced),{value:p,active}=state;
  name=state.name;const direct=state.reduced,find=selector=>stage.querySelector(selector);
  stage.dataset.frame=String(state.time);stage.dataset.motion=name;stage.dataset.reduced=String(direct);
  if(name==='spring-retarget')drawSpring(stage,springAt(state.time),direct);
  else if(name==='sheet-presentation'){
    find('.motion-sheet').style.transform=`translateY(${direct?0:(1-p)*190}px)`;
    find('.motion-sheet').style.opacity=String(p);find('.motion-scrim').style.opacity=String(p);
  }else if(name==='popover-origin'){
    find('.motion-floater').style.transform=`scale(${direct?1:.96+.04*p})`;find('.motion-floater').style.opacity=String(p);
  }else if(name==='button-feedback'){
    find('.motion-button').style.transform=`scale(${state.scale})`;find('.motion-button').textContent=active?'✓ Saved':'Save note';
  }else if(name==='toggle-state'){
    find('.motion-thumb').style.transform=`translateX(${38*p}px)`;find('.motion-switch').classList.toggle('is-on',active);
    find('[data-check]').style.opacity=active?'1':'0';find('[data-motion-value]').textContent=active?'On':'Off';
  }else if(name==='progress-update'){
    find('.motion-progress').style.width=state.progress+'%';find('[data-motion-value]').textContent=state.progress+'%';
  }else if(name==='tab-transition'||name==='selection-highlight'){
    const tabs=stage.querySelectorAll('.motion-tabs span');tabs[0].classList.toggle('selected',!active);tabs[1].classList.toggle('selected',active);
    find('.motion-tab-indicator').style.transform=`translateX(${p*100}%)`;
    find('.motion-content').textContent=active?'This week · 18 notes captured':'Today · 3 notes captured';
    find('.motion-content').style.opacity=String(direct||name==='selection-highlight'?1:.5+Math.abs(p-.5));
  }else if(name==='expand-collapse'){
    const details=find('[data-expanded]');details.style.maxHeight=(80*p)+'px';details.style.opacity=String(p);find('[data-motion-value]').textContent=active?'−':'+';
  }else if(name==='reorder-list'){
    const nodes=stage.querySelectorAll('.motion-list div');nodes[0].style.transform=`translateY(${48*p}px)`;nodes[1].style.transform=`translateY(${48*(1-p)}px)`;nodes[2].style.transform='translateY(96px)';
  }else if(name==='reduced-motion')find('.motion-card').textContent=active?'✓ Updated':'Ready';
  else if(name==='navigation-push'||name==='navigation-back'){
    const q=name==='navigation-back'?1-p:p,a=find('.motion-nav-list'),b=find('.motion-nav-detail');
    a.style.transform=`translateX(${direct?0:-q*22}%)`;b.style.transform=`translateX(${direct?0:(1-q)*100}%)`;
    a.style.opacity=String(1-q);b.style.opacity=String(q);
  }else if(name==='shared-element'){
    const image=find('.motion-art'),width=stage.clientWidth-48;
    image.style.width=(direct?(active?width:Math.min(112,width)):112+p*(width-112))+'px';
    image.style.height=(72+52*p)+'px';image.style.transform=`translateY(${direct?0:34*(1-p)}px)`;
    find('.motion-shared-copy').style.opacity=String(p);
  }else if(name==='crossfade-media'){
    find('.motion-art.evening').style.opacity=String(p);find('[data-motion-value]').textContent=active?'Evening landscape':'Morning landscape';
  }else if(name==='search-filter'){
    const nodes=stage.querySelectorAll('.motion-list div');nodes[0].style.transform='translateY(0px)';nodes[1].style.transform='translateY(48px)';nodes[1].style.opacity=String(1-p);nodes[2].style.transform=`translateY(${96-48*p}px)`;
    find('[data-motion-value]').textContent=active?'Trail':'All notes';find('[data-motion-count]').textContent=active?'2 matching notes':'3 notes';
  }else if(name==='list-insert'){
    const nodes=stage.querySelectorAll('.motion-list div');nodes[0].style.opacity=String(p);nodes[0].style.transform=`translateY(${direct?0:-14*(1-p)}px)`;nodes[1].style.transform=`translateY(${48*p}px)`;nodes[2].style.transform=`translateY(${48+48*p}px)`;
  }else if(name==='undo-removal'){
    const nodes=stage.querySelectorAll('.motion-list div');nodes[0].style.transform='translateY(0px)';nodes[1].style.transform=`translate(${direct?0:30*p}px,48px)`;nodes[1].style.opacity=String(1-p);nodes[2].style.transform=`translateY(${96-48*p}px)`;
    find('[data-motion-value]').textContent=state.time>=2.3?'✓ Undo complete · item restored':active?'Weekend plans removed · Undo':'All three notes are present';
  }else if(name==='loading-handoff'){
    find('.motion-placeholder').style.opacity=String(1-p);find('.motion-loaded').style.opacity=String(p);
  }else if(name==='pull-refresh'){
    const busy=state.time>.2&&state.time<1.65;
    find('.motion-refresh i').style.transform=`rotate(${direct?0:Math.min(state.time,1.65)*300}deg)`;
    find('[data-motion-value]').textContent=state.time>=1.65?'✓ Updated just now':busy?'Refreshing notes…':'Pull to refresh · illustration';
  }else if(name==='toast-feedback'){
    find('.motion-toast').style.transform=`translateY(${direct?0:12*(1-p)}px)`;find('.motion-toast').style.opacity=String(p);
  }else if(name==='validation-feedback'){
    find('.motion-validation').classList.toggle('has-error',active);find('.motion-validation p').style.opacity=String(p);
  }else if(name==='number-change')find('[data-motion-value]').textContent=String(state.progress);
  else if(name==='focus-transition'){
    const nodes=stage.querySelectorAll('.motion-focus>div');
    nodes.forEach((node,i)=>{const selected=i===Number(active);node.classList.toggle('focused',selected);node.style.transform=`scale(${direct?1:1+.025*(i?p:1-p)})`;node.querySelector('small').textContent=selected?'Focused':'Available';});
  }
  return state;
}

export function mountMotion(root,onStatus,getReduced,initial='spring-retarget'){
  const abort=new AbortController(),signal=abort.signal;
  let name=motionExample(initial).id,time=0,rate=1,raf=0,lastFrame=0,playback='idle',manual=false,disposed=false;
  let spring={position:0,velocity:0,target:0};
  const groups=[...new Set(MOTION_EXAMPLES.map(example=>example.group))];
  const ordered=groups.flatMap(group=>MOTION_EXAMPLES.filter(example=>example.group===group));
  root.innerHTML=`<div class="motion-lab">
    <div class="motion-picker"><label>Motion example<select data-motion-select>${groups.map(group=>`<optgroup label="${group}">${MOTION_EXAMPLES.filter(e=>e.group===group).map(e=>`<option value="${e.id}">${e.label}</option>`).join('')}</optgroup>`).join('')}</select></label><div class="motion-step"><button data-previous aria-label="Previous motion example">←</button><span data-example-count></span><button data-next aria-label="Next motion example">→</button></div></div>
    <details class="motion-library"><summary>Browse all ${MOTIONS.length} examples</summary><div class="motion-choices" role="group" aria-label="Motion examples">${ordered.map(e=>`<button data-motion="${e.id}" aria-pressed="false"><span>${e.label}</span><small>${e.group}</small></button>`).join('')}</div></details>
    <div class="motion-description"><p data-motion-purpose></p><span class="motion-badge" data-motion-mode></span></div>
    <div class="motion-stage" aria-hidden="true" inert></div>
    <p class="motion-state" data-motion-state></p>
    <div class="motion-timeline"><label for="motion-seek">Timeline <span data-time aria-hidden="true"></span></label><input id="motion-seek" data-seek type="range" min="0" max="2800" step="10" value="0" aria-label="Animation timeline"></div>
    <div class="motion-foot"><button class="primary" data-play>Replay animation</button><button data-pause disabled>Pause</button><button data-reset>Reset</button><label>Speed<select data-rate aria-label="Playback speed"><option value="0.25">0.25×</option><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label><label class="motion-loop"><input type="checkbox" data-loop> Loop</label></div>
    <div class="row spring-controls" hidden><button data-target="0">Retarget left</button><button data-target="1">Retarget right</button><small>Change destination at any time; velocity continues.</small></div>
    <div class="motion-evidence"><a data-guidance target="_blank" rel="noreferrer">Apple motion guidance ↗</a><a data-full-example>Full interactive topic →</a><a data-permalink>Link to this example</a><small>Original browser illustration · example timing values</small></div>
    <p class="motion-reduced-note" data-reduced-note></p>
  </div>`;
  const $=selector=>root.querySelector(selector),stage=$('.motion-stage'),pause=$('[data-pause]'),seek=$('[data-seek]'),controls=$('.spring-controls');
  const listen=(node,event,handler)=>node.addEventListener(event,handler,{signal});
  const cancel=()=>{cancelAnimationFrame(raf);raf=0;};
  const sync=()=>{
    root.dataset.playback=playback;root.dataset.motion=name;
    pause.disabled=!['playing','paused'].includes(playback);pause.textContent=playback==='paused'?'Resume':'Pause';
    seek.disabled=manual;seek.value=String(Math.round(time*1000));
    seek.setAttribute('aria-valuetext',`${time.toFixed(1)} of ${MOTION_DURATION.toFixed(1)} seconds${manual?'; live spring':''}`);
    $('[data-time]').textContent=`${time.toFixed(1)} / ${MOTION_DURATION.toFixed(1)} s`;
    $('[data-motion-mode]').textContent=getReduced()||name==='reduced-motion'?'Reduced alternative':'Motion preview';
    $('[data-reduced-note]').textContent='Reduced alternative: '+motionExample(name).reduced;
  };
  const paint=()=>{
    const frame=renderFrame(stage,name,time,getReduced());
    if(manual){drawSpring(stage,spring,getReduced());$('[data-motion-state]').textContent=`${spring.target?'Right':'Left'} destination selected. ${playback==='complete'?'The note has settled.':'Retarget, pause, or reset at any time.'}`;}
    else $('[data-motion-state]').textContent=frame.summary;
    sync();
  };
  const finish=()=>{playback='complete';sync();onStatus('Animation complete. '+$('[data-motion-state]').textContent);};
  const advance=now=>{
    const elapsed=Math.max(0,(now-lastFrame)/1000)*rate;lastFrame=now;
    if(manual)spring=getReduced()?{...spring,position:spring.target,velocity:0}:springStep(spring,elapsed);
    else{time=Math.min(MOTION_DURATION,time+elapsed);if(name==='spring-retarget')spring=springAt(time);}
  };
  const tick=now=>{
    raf=0;if(disposed||playback!=='playing')return;
    advance(now);
    const done=manual?Math.abs(spring.position-spring.target)<.001&&Math.abs(spring.velocity)<.001:time>=MOTION_DURATION;
    if(done&&manual){spring={...spring,position:spring.target,velocity:0};time=MOTION_DURATION;}
    paint();
    if(done){
      if(!manual&&$('[data-loop]').checked){time=0;spring=springAt(0);raf=requestAnimationFrame(tick);}
      else{finish();paint();}
    }else raf=requestAnimationFrame(tick);
  };
  const start=()=>{cancel();playback='playing';lastFrame=performance.now();sync();raf=requestAnimationFrame(tick);};
  const choose=(next,updateURL=true)=>{
    cancel();name=motionExample(next).id;manual=false;time=0;playback='idle';spring=springAt(0);
    controls.hidden=name!=='spring-retarget';stage.innerHTML=motionMarkup(name);$('[data-motion-select]').value=name;
    $('[data-motion-purpose]').textContent=motionExample(name).purpose;
    for(const button of root.querySelectorAll('button[data-motion]'))button.setAttribute('aria-pressed',String(button.dataset.motion===name));
    const index=ordered.findIndex(e=>e.id===name);$('[data-example-count]').textContent=`${index+1} / ${MOTIONS.length}`;
    $('[data-previous]').disabled=index===0;$('[data-next]').disabled=index===MOTIONS.length-1;
    $('[data-guidance]').href=motionExample(name).source;
    $('[data-full-example]').href='?topic='+motionExample(name).topic;
    const url=new URL(location.href);url.search='';url.searchParams.set('topic','motion');url.searchParams.set('motion',name);$('[data-permalink]').href=url.href;
    if(updateURL&&new URLSearchParams(location.search).get('topic')==='motion')history.replaceState({},'',url);
    paint();onStatus('Selected '+motionExample(name).label+'. Replay or scrub when ready.');
  };
  listen($('[data-play]'),'click',()=>{manual=false;time=0;spring=springAt(0);paint();start();onStatus('Playing '+motionExample(name).label+'. Pause, scrub, or reset at any time.');});
  listen(pause,'click',()=>{
    if(playback==='playing'){advance(performance.now());cancel();playback='paused';paint();onStatus('Animation paused. '+$('[data-motion-state]').textContent);}
    else if(playback==='paused'){start();onStatus('Animation resumed.');}
  });
  listen($('[data-reset]'),'click',()=>{cancel();manual=false;time=0;spring=springAt(0);playback='idle';paint();onStatus('Animation reset. Ready to replay.');});
  listen(seek,'input',()=>{cancel();manual=false;time=clamp(Number(seek.value)/1000,0,MOTION_DURATION);spring=springAt(time);playback=time>=MOTION_DURATION?'complete':'paused';paint();onStatus(`Timeline ${time.toFixed(1)} seconds. `+$('[data-motion-state]').textContent);});
  listen($('[data-rate]'),'change',()=>{if(playback==='playing')advance(performance.now());rate=Number($('[data-rate]').value);paint();onStatus(`Playback speed ${rate} times.`);});
  listen($('[data-loop]'),'change',()=>onStatus($('[data-loop]').checked?'Loop enabled. Pause or reset to stop.':'Loop disabled. Playback stops at the result.'));
  listen($('[data-motion-select]'),'change',event=>choose(event.target.value));
  for(const button of root.querySelectorAll('button[data-motion]'))listen(button,'click',()=>choose(button.dataset.motion));
  for(const [selector,direction] of [['[data-previous]',-1],['[data-next]',1]])listen($(selector),'click',()=>choose(ordered[ordered.findIndex(e=>e.id===name)+direction].id));
  for(const button of controls.querySelectorAll('[data-target]'))listen(button,'click',()=>{
    if(playback==='playing')advance(performance.now());
    manual=true;spring=retarget(spring,Number(button.dataset.target));start();
    onStatus('Retargeted '+(spring.target?'right':'left')+' from the current position and velocity.');
  });
  listen(root,'reducedmotionchange',()=>{
    if(manual&&getReduced())spring={...spring,position:spring.target,velocity:0};
    paint();onStatus((getReduced()?'Reduced motion enabled. ':'Motion preview enabled. ')+'Selection and timeline preserved.');
  });
  listen(document,'visibilitychange',()=>{
    if(document.hidden&&playback==='playing'){cancel();playback='paused';paint();onStatus('Animation paused while the page is hidden. Resume when ready.');}
  });
  choose(name,false);
  let width=stage.clientWidth;
  const resize=new ResizeObserver(()=>{
    if(!disposed&&stage.clientWidth!==width){width=stage.clientWidth;paint();}
  });
  if(new URLSearchParams(location.search).get('record')!=='1')resize.observe(stage);
  return ()=>{disposed=true;cancel();resize.disconnect();abort.abort();delete root.dataset.motion;delete root.dataset.playback;};
}
