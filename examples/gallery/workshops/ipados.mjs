import {e,button,area,source} from './shared.mjs';
import {documentState,documentWorkspace,documentAction,documentInput,documentKey} from './documents.mjs';
function sketch(ctx){return `<section class="wk-panel"><span class="wk-kicker">FIELDNOTES / SKETCH & TRANSFER</span><h3>Keep an idea beside its note.</h3><p>Draw with a pointer, or use Add sample stroke. This canvas does not emulate Pencil pressure, hover, or palm rejection.</p><canvas width="600" height="230" data-workshop-sketch role="img" aria-label="Original sketch canvas; named buttons provide alternatives"></canvas><div class="row">${button('Add sample stroke','mark')}${button('Clear sketch','clear-sketch')}${button('Add sample clip to note','clip','primary')}</div><p class="wk-meta">${ctx.state.strokes.length} ${ctx.state.strokes.length===1?'stroke':'strokes'} · Bundled transfer example; no inter-app process.</p>${area('Related note','body',ctx.state.documents[0].body)}</section>`;}
function drawing(ctx,scene){
  const canvas=scene.querySelector('canvas');if(!canvas)return;
  const pen=canvas.getContext('2d');pen.lineWidth=3;pen.lineCap='round';pen.lineJoin='round';
  const draw=()=>{pen.clearRect(0,0,600,230);pen.strokeStyle=getComputedStyle(canvas).color;for(const stroke of ctx.state.strokes){pen.beginPath();stroke.forEach(([x,y],i)=>i?pen.lineTo(x,y):pen.moveTo(x,y));pen.stroke();}};
  let active=null;
  const point=ev=>{const r=canvas.getBoundingClientRect();return [Math.max(0,Math.min(600,(ev.clientX-r.left)*600/r.width)),Math.max(0,Math.min(230,(ev.clientY-r.top)*230/r.height))];};
  canvas.addEventListener('pointerdown',ev=>{active=[point(ev)];ctx.state.strokes.push(active);canvas.setPointerCapture(ev.pointerId);draw();},{signal:ctx.sceneSignal});
  canvas.addEventListener('pointermove',ev=>{if(active){active.push(point(ev));draw();}},{signal:ctx.sceneSignal});
  const end=()=>{if(active){active=null;ctx.render();ctx.status('Sketch stroke added. The related note is preserved.');}};
  canvas.addEventListener('pointerup',end,{signal:ctx.sceneSignal});canvas.addEventListener('pointercancel',end,{signal:ctx.sceneSignal});draw();
}
const base={initial:documentState,action:documentAction,input:documentInput,key:documentKey,source:source('designing-for-ipados'),skin:'tablet'};
export const IPADOS={id:'designing-for-ipados',label:'Designing for iPadOS',short:'iPadOS',order:2,reference:'references/workshops/ipados.md',
 scope:'A responsive HTML document workspace. Keyboard and pointer tasks run in the browser; native multitasking, Apple Pencil and inter-app transfer remain unverified.',related:['sidebars','multitasking','apple-pencil-and-scribble','keyboards','drag-and-drop'],
 scenarios:[
  {...base,id:'workspace',title:'Persistent workspace',task:'Switch collections and documents while preserving each editable draft.',principle:'Use the available display for content and connected tasks, with less nesting.',render:ctx=>documentWorkspace(ctx)},
  {...base,id:'adaptation',title:'Resize without losing work',task:'Edit a draft, then change layout and text size without losing the selected document.',principle:'Adapt to available space and chosen configurations rather than a fixed tablet width.',render:ctx=>documentWorkspace(ctx)},
  {...base,id:'inspector',title:'Nonmodal inspector',initial:()=>({...documentState(),inspector:true}),task:'Inspect document details while editing the same document.',principle:'Expose useful supporting information without interrupting the main task.',render:ctx=>documentWorkspace(ctx)},
  {...base,id:'keyboard',title:'Keyboard & named actions',task:'Save using the scoped keyboard command and the visible equivalent button.',principle:'Let people combine input methods without hiding essential actions.',render:ctx=>documentWorkspace(ctx,{keyboard:true})},
  {...base,id:'sketch-transfer',title:'Sketch beside a note',task:'Draw or add a sample stroke, then transfer a bundled clip into a related note.',principle:'Support mixed-input workflows while stating what the browser model actually establishes.',render:sketch,afterRender:drawing,input(ctx,key,value){if(key==='body')ctx.state.documents[0].body=value;},action(ctx,name){if(name==='mark'){ctx.state.strokes.push([[60,160],[140,80],[220,140],[340,65],[450,120],[540,80]]);ctx.render();ctx.status('Sample stroke added.');}else if(name==='clear-sketch'){ctx.state.strokes=[];ctx.render();ctx.status('Sketch cleared. Related note preserved.');}else if(name==='clip'){ctx.state.documents[0].body+='\nSketch clip: a ridge line with three waypoints.';ctx.render();ctx.status('Bundled sketch description added to the related note. No inter-app transfer occurred.');}}},
 ]};
