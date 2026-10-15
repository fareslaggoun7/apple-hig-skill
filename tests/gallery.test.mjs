import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {registeredKinds,escapeHTML} from '../examples/gallery/specimens.mjs';
import {springStep,retarget,springAt,frameState,MOTIONS,MOTION_EXAMPLES,MOTION_DURATION,phase} from '../examples/gallery/motion.mjs';
import {motionGuide,motionCatalog} from '../tools/build_motion_docs.mjs';
import {WORKSHOPS,WORKSHOP_ORDER,workshopCatalog} from '../examples/gallery/workshops.mjs';
import {workshopGuide,portableWorkshopGuide} from '../tools/build_workshop_docs.mjs';
const catalog=JSON.parse(fs.readFileSync(new URL('../examples/gallery/catalog.json',import.meta.url)));
const source=JSON.parse(fs.readFileSync(new URL('../skills/apple-hig/references/catalog.json',import.meta.url)));
test('every source topic has an explicit implemented route and accurate source metadata',()=>{
  assert.equal(catalog.topics.length,173);assert.equal(new Set(catalog.topics.map(t=>t.slug)).size,173);
  assert.deepEqual(new Set(catalog.topics.map(t=>t.slug)),new Set(source.pages.map(t=>t.slug)));
  for(const t of catalog.topics){assert.ok(registeredKinds().includes(t.kind),t.slug);const s=source.pages.find(p=>p.slug===t.slug);assert.equal(t.source.split('#')[0],s.url);assert.deepEqual(t.platforms,s.supported_platforms);if(t.source.includes('#'))assert.ok(s.source_anchors.includes(t.source.split('#')[1]));assert.ok(t.scenario.length>20);for(const child of t.children)assert.ok(catalog.topics.some(p=>p.slug===child),child);}
});
test('spring converges consistently across frame rates and bounded long frames',()=>{
  for(const fps of [30,60,120]){let s={position:0,velocity:0,target:1};for(let i=0;i<fps*3;i++)s=springStep(s,1/fps);assert.ok(Math.abs(s.position-1)<.00001);assert.ok(Math.abs(s.velocity)<.0001);}
  let s={position:0,velocity:0,target:1};for(let i=0;i<100;i++)s=springStep(s,10);assert.ok(Number.isFinite(s.position));assert.ok(Math.abs(s.position-1)<.0001);
});
test('retargeting preserves position and velocity, including interruptions',()=>{
  let s={position:0,velocity:0,target:1};for(let i=0;i<10;i++)s=springStep(s,1/60);
  const next=retarget(s,0);assert.equal(next.position,s.position);assert.equal(next.velocity,s.velocity);assert.equal(next.target,0);
  const after=springStep(next,1/240);assert.ok(Math.abs(after.position-next.position)<.02);assert.notEqual(springAt(.6).position,frameState('toggle-state',.6).value);
});
test('all 24 motion examples have a purpose, outcome, reduced alternative, exact source, and implemented companion',()=>{
  assert.equal(MOTIONS.length,24);assert.equal(new Set(MOTIONS.map(m=>m[0])).size,24);
  const motionSource=source.pages.find(page=>page.slug==='motion');
  for(const example of MOTION_EXAMPLES){
    assert.ok(example.purpose.length>30,example.id);assert.ok(example.outcome.length>20);assert.ok(example.reduced.length>20);
    assert.ok(catalog.topics.some(topic=>topic.slug===example.topic),example.topic);
    assert.equal(example.source.split('#')[0],motionSource.url);assert.ok(motionSource.source_anchors.includes(example.source.split('#')[1]));
  }
});
test('every motion has deterministic finite frames and direct reduced alternatives at all scrub positions',()=>{
  for(const [name] of MOTIONS){
    for(let i=0;i<=280;i++){
      const time=i/100,normal=frameState(name,time),reduced=frameState(name,time,true);
      for(const value of [normal.value,normal.scale,normal.progress,reduced.value])assert.ok(Number.isFinite(value),`${name} at ${time}`);
      assert.ok([0,1].includes(reduced.value));assert.equal(reduced.opacity,1);assert.equal(reduced.scale,1);
      assert.deepEqual(normal,frameState(name,time));
    }
    assert.equal(frameState(name,MOTION_DURATION).complete,true);
    assert.equal(frameState(name,MOTION_DURATION,true).summary,frameState(name,MOTION_DURATION).summary);
  }
});
test('the completed frame holds a useful outcome instead of silently resetting',()=>{
  assert.equal(phase(0),0);assert.equal(phase(MOTION_DURATION),1);
  assert.ok(Math.abs(springAt(MOTION_DURATION).position-1)<.00001);
  for(const name of ['sheet-presentation','toggle-state','progress-update','tab-transition','expand-collapse','navigation-push','loading-handoff','number-change'])assert.equal(frameState(name,MOTION_DURATION).value,1,name);
  assert.equal(frameState('progress-update',MOTION_DURATION).progress,85);
});
test('undo restores the removed item and reports both intermediate and final states',()=>{
  for(const reduced of [false,true]){
    assert.equal(frameState('undo-removal',0,reduced).value,0);
    assert.equal(frameState('undo-removal',1.3,reduced).value,1);
    assert.match(frameState('undo-removal',1.3,reduced).summary,/removed.*Undo/);
    assert.equal(frameState('undo-removal',MOTION_DURATION,reduced).value,0);
    assert.match(frameState('undo-removal',MOTION_DURATION,reduced).summary,/restored/);
  }
});
test('intermediate accessible descriptions agree with displayed values and do not announce completion early',()=>{
  for(const reduced of [false,true])for(const time of [.4,.7,.9,1.3]){
    for(const name of ['progress-update','number-change']){
      const state=frameState(name,time,reduced);
      assert.ok(state.summary.includes(String(state.progress)),`${name} must describe its actual value`);
    }
    assert.match(frameState('pull-refresh',1.3,reduced).summary,/Refreshing/);
    assert.match(frameState('spring-retarget',.7,reduced).summary,/Preview in progress/);
  }
});
test('frame sampling clamps invalid times and spring integration never moves for an invalid elapsed value',()=>{
  for(const value of [NaN,Infinity,-Infinity,-10])assert.equal(frameState('toggle-state',value).time,0);
  assert.equal(frameState('toggle-state',100).time,MOTION_DURATION);
  const start={position:.3,velocity:.2,target:1};
  for(const value of [0,-1,NaN,Infinity])assert.deepEqual(springStep(start,value),start);
  assert.deepEqual(springAt(.853),springAt(.853));
});
test('user-entered strings cannot become example markup',()=>{assert.equal(escapeHTML('<script>"&\''),'&lt;script&gt;&quot;&amp;&#39;');});
test('motion guide and catalog match the runnable examples and use still previews by default',()=>{
  const guide=fs.readFileSync(new URL('../examples/gallery/MOTION.md',import.meta.url),'utf8');
  assert.equal(guide,motionGuide());assert.ok(!/!\[[^\]]*\]\([^)]*\.gif\)/.test(guide));
  assert.deepEqual(JSON.parse(fs.readFileSync(new URL('../examples/gallery/motion-catalog.json',import.meta.url))),motionCatalog());
});
test('workshops follow the requested order and every study has an implementation and a real source section',()=>{
  assert.deepEqual(WORKSHOPS.map(w=>w.id),WORKSHOP_ORDER.slice(0,WORKSHOPS.length));
  for(const [index,w] of WORKSHOPS.entries()){
    for(const id of w.related)assert.ok(catalog.topics.some(t=>t.slug===id),w.id+' related '+id);
    assert.equal(w.order,index+1);assert.ok(w.scenarios.length>=4,w.id);assert.equal(new Set(w.scenarios.map(s=>s.id)).size,w.scenarios.length);
    assert.equal(catalog.topics.find(t=>t.slug===w.id).kind,'workshop');
    assert.ok(fs.existsSync(new URL('../skills/apple-hig/'+w.reference,import.meta.url)));
    for(const s of w.scenarios){
      assert.equal(typeof s.initial,'function');assert.equal(typeof s.render,'function');assert.equal(typeof s.action,'function');assert.ok(s.task.length>25);assert.ok(s.principle.length>20);
      const page=source.pages.find(p=>p.url===s.source.split('#')[0]);assert.ok(page,s.source);
      if(s.source.includes('#'))assert.ok(page.source_anchors.includes(s.source.split('#')[1]),s.source);
    }
  }
});
test('workshop indexes and portable routing guide match the implemented registry',()=>{
  assert.equal(fs.readFileSync(new URL('../examples/gallery/WORKSHOPS.md',import.meta.url),'utf8'),workshopGuide());
  assert.equal(fs.readFileSync(new URL('../skills/apple-hig/references/workshops/README.md',import.meta.url),'utf8'),portableWorkshopGuide());
  assert.deepEqual(JSON.parse(fs.readFileSync(new URL('../examples/gallery/workshop-catalog.json',import.meta.url))),workshopCatalog());
});
test('every workshop study has a captured picture and no stale study pictures remain',()=>{
  const expected=WORKSHOPS.flatMap(w=>w.scenarios.map(s=>w.id+'--'+s.id+'.webp')).sort();
  const directory=new URL('../examples/gallery/workshop-previews/',import.meta.url);
  assert.deepEqual(fs.readdirSync(directory).filter(f=>f.endsWith('.webp')).sort(),expected);
  for(const file of expected)assert.ok(fs.statSync(new URL(file,directory)).size>500,file);
});
