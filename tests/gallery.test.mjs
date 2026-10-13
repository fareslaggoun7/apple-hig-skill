import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {registeredKinds,escapeHTML} from '../examples/gallery/specimens.mjs';
import {springStep,retarget,springAt,frameState,MOTIONS} from '../examples/gallery/motion.mjs';
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
test('ten motion experiments have deterministic frames and direct reduced alternatives',()=>{
  assert.equal(MOTIONS.length,10);assert.equal(new Set(MOTIONS.map(m=>m[0])).size,10);
  for(const [name] of MOTIONS){for(const time of [0,.4,.7,1.2,1.8,2.8]){const s=frameState(name,time,true);assert.ok([0,1].includes(s.value));assert.equal(s.opacity,1);assert.deepEqual(frameState(name,time),frameState(name,time));}}
});
test('user-entered strings cannot become example markup',()=>{assert.equal(escapeHTML('<script>"&\''),'&lt;script&gt;&quot;&amp;&#39;');});
