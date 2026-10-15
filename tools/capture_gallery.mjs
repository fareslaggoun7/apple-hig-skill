/** Capture real browser output, including a deterministic frame for each GIF. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import {WORKSHOPS} from '../examples/gallery/workshops.mjs';
import {MOTIONS,MOTION_DURATION} from '../examples/gallery/motion.mjs';
const {chromium}=createRequire(import.meta.url)('playwright');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const assets=path.join(root,'docs/assets'),previews=path.join(root,'examples/gallery/previews');
const work=path.join(root,'work/gallery-frames');
const motionPreviews=path.join(root,'examples/gallery/motion-previews');
const base=process.env.GALLERY_URL||'http://127.0.0.1:8000';
fs.mkdirSync(previews,{recursive:true});fs.mkdirSync(work,{recursive:true});fs.mkdirSync(motionPreviews,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||(fs.existsSync(chromium.executablePath())?chromium.executablePath():'/usr/bin/chromium')});
const screenshots={};
try{
  const page=await browser.newPage({viewport:{width:1400,height:1050},deviceScaleFactor:1,reducedMotion:'reduce'});
  const open=async topic=>{await page.goto(`${base}/?topic=${topic}`);await page.waitForFunction(()=>window.galleryReady);await page.evaluate(()=>document.fonts.ready);};
  const selected=process.argv.find(s=>s.startsWith('--topics='))?.slice(9).split(',');
  const targets=JSON.parse(fs.readFileSync(path.join(root,'examples/gallery/catalog.json'))).topics.filter(t=>!selected||selected.includes(t.slug));
  for(const t of targets){
    await open(t.slug);
    if(['dialog','sheet','action-sheet'].includes(t.kind)){await page.locator('#stage button').first().click();}
    else if(t.kind==='popover'){await page.locator('#command-anchor').click();}
    const target=['dialog','sheet','action-sheet'].includes(t.kind)?page.locator('dialog[open]'):page.locator('#stage');
    const png=await target.screenshot();
    const temp=path.join(work,'preview.png');fs.writeFileSync(temp,png);
    execFileSync('python3',['-c',"from PIL import Image; import sys; im=Image.open(sys.argv[1]).convert('RGB'); im.thumbnail((900,600)); im.save(sys.argv[2],format='WEBP',quality=85)",temp,path.join(previews,t.slug+'.webp')]);
    if(['buttons','windows','sheets','designing-for-ios','sidebars','motion','charts','toggles','maps'].includes(t.slug)){
      const file=path.join(assets,'specimen-'+t.slug+'.png');fs.writeFileSync(file,png);screenshots[t.slug]=file;
    }
  }
  console.log('Captured '+targets.length+' rendered topic previews.');
  await page.setViewportSize({width:1280,height:1100});await open('motion');
  await page.locator('.motion-lab').screenshot({path:path.join(assets,'motion-lab-desktop.png')});
  await page.setViewportSize({width:390,height:1100});await open('motion');
  await page.locator('.motion-lab').screenshot({path:path.join(assets,'motion-lab-mobile.png')});
  await page.setViewportSize({width:1400,height:1050});
  await open('buttons');await page.screenshot({path:path.join(assets,'gallery-desktop.png'),fullPage:true});
  await page.setViewportSize({width:390,height:1000});await open('sidebars');await page.screenshot({path:path.join(assets,'gallery-mobile.png'),fullPage:true});
  await page.setViewportSize({width:820,height:370});await page.emulateMedia({reducedMotion:'no-preference'});
  for(const [name] of (process.argv.includes('--pictures-only')?[]:MOTIONS)){
    const dir=path.join(work,name);fs.mkdirSync(dir,{recursive:true});
    await page.goto(`${base}/?topic=motion&motion=${name}&record=1&frame=0`);await page.waitForFunction(()=>window.galleryReady);
    for(let i=0;i<=Math.round(MOTION_DURATION*15);i++){
      await page.evaluate(async({name,time})=>{const {renderFrame}=await import('./motion.mjs');renderFrame(document.querySelector('.motion-stage'),name,time,false);},{name,time:i/15});
      await page.locator('.motion-stage').screenshot({path:path.join(dir,String(i).padStart(3,'0')+'.png')});
    }
    execFileSync('python3',['-c',"from PIL import Image; import pathlib,sys; files=sorted(pathlib.Path(sys.argv[1]).glob('*.png')); frames=[Image.open(p).convert('RGB').resize((640,256)) for p in files]; frames[0].save(sys.argv[2],save_all=True,append_images=frames[1:],duration=[300]+[67]*(len(frames)-2)+[1100],loop=1,optimize=True)",dir,path.join(assets,'motion-'+name+'.gif')]);
    for(const reduced of [false,true]){
      await page.evaluate(async({name,reduced})=>{const {renderFrame,MOTION_DURATION}=await import('./motion.mjs');renderFrame(document.querySelector('.motion-stage'),name,name==='undo-removal'?1.3:MOTION_DURATION,reduced);},{name,reduced});
      const png=await page.locator('.motion-stage').screenshot();const temp=path.join(work,'motion-poster.png');fs.writeFileSync(temp,png);
      execFileSync('python3',['-c',"from PIL import Image; import sys; im=Image.open(sys.argv[1]).convert('RGB'); im.resize((640,256)).save(sys.argv[2],format='WEBP',quality=85)",temp,path.join(motionPreviews,name+(reduced?'-reduced':'')+'.webp')]);
    }
    console.log('Captured motion preview: '+name);
  }
  const data=name=>'data:image/png;base64,'+fs.readFileSync(screenshots[name]||path.join(assets,'specimen-'+name+'.png')).toString('base64');
  await page.setViewportSize({width:1600,height:850});
  await page.setContent(`<!doctype html><html><head><style>
    *{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif;background:#081625;color:#eaf5ff}.hero{height:850px;padding:56px 64px;background:radial-gradient(ellipse at 90% 0,#123b53,transparent 60%),linear-gradient(145deg,#101f35,#081625)}header{display:flex;justify-content:space-between;align-items:center;color:#93b7d0;font-size:16px;letter-spacing:2px}.mark{width:46px;height:46px;border:1px solid #5c8eae;border-radius:13px;display:grid;place-items:center;color:#adf3f6;font-weight:750;font-size:25px;letter-spacing:0}header>div{display:flex;align-items:center;gap:15px}.intro{display:flex;justify-content:space-between;align-items:end;margin:30px 0 38px}h1{font-size:88px;letter-spacing:-5px;line-height:1.02;margin:0}h1 span{color:#73dae2}.copy{font-size:24px;line-height:1.5;color:#a3bdd2;margin:20px 0 0}.stats{display:flex;gap:38px;padding-bottom:10px}.stat strong{display:block;font-size:44px;font-weight:650;color:#83e0e6;letter-spacing:-2px}.stat small{display:block;color:#a3bdd2;font-size:14px}.cards{display:grid;grid-template-columns:1fr 1fr 1fr;gap:22px}.card{background:#14283e;border:1px solid #34516b;border-radius:20px;overflow:hidden}.cap{display:flex;justify-content:space-between;padding:18px 20px;font-size:16px;color:#c8e3f1}.cap small{color:#78cdd8;font-size:12px;letter-spacing:1px}.art{height:228px;background:#f4f7fc;display:grid;place-items:center;overflow:hidden}.art img{width:100%;height:100%;object-fit:contain}.card p{font-size:15px;color:#94b5cf;margin:17px 20px 20px}.footer{display:flex;justify-content:space-between;align-items:center;margin-top:30px;color:#94b5cf;font-size:15px}.clients{display:flex;gap:10px}.clients span{border:1px solid #3d586e;padding:8px 14px;border-radius:20px;color:#d6e9f3;font-size:13px}.eyebrow{color:#81d2dc;font-size:14px;letter-spacing:3px;margin-bottom:16px}
    </style></head><body><div class="hero"><header><div><span class="mark">H</span> THE SOURCE-GUIDED INTERFACE LIBRARY</div><span>INDEPENDENT COMMUNITY PROJECT</span></header><div class="intro"><div><div class="eyebrow">DESIGN · BUILD · REVIEW</div><h1>Apple HIG <span>Skill</span></h1><p class="copy">From official guidance to interfaces you can try.<br>Traceable decisions. Original examples. Purposeful motion.</p></div><div class="stats"><div class="stat"><strong>173</strong><small>indexed topics</small></div><div class="stat"><strong>${WORKSHOPS.reduce((n,w)=>n+w.scenarios.length,0)}</strong><small>workshop studies</small></div><div class="stat"><strong>${MOTIONS.length}</strong><small>motion experiments</small></div></div></div><div class="cards"><div class="card"><div class="cap">01 / Controls <small>TRY THE ACTION</small></div><div class="art"><img src="${data('buttons')}"></div><p>Named actions, feedback, and a clear way back.</p></div><div class="card"><div class="cap">02 / Workspaces <small>KEEP CONTEXT</small></div><div class="art"><img src="${'data:image/webp;base64,'+fs.readFileSync(path.join(root,'examples/gallery/workshop-previews/designing-for-ipados--workspace.webp')).toString('base64')}"></div><p>Ten ordered platform and design workshops.</p></div><div class="card"><div class="cap">03 / Motion <small>EXPLAIN CHANGE</small></div><div class="art"><img src="${data('motion')}"></div><p>Interruptible transitions and reduced alternatives.</p></div></div><div class="footer"><span>Original web adaptations + clearly labeled integration models</span><div class="clients"><span>Claude.ai ZIP</span><span>Claude Code</span><span>Codex</span></div></div></div></body></html>`);
  await page.screenshot({path:path.join(assets,'gallery-hero.png')});
  console.log('Captured original README banner from composed real specimens.');
}finally{await browser.close();}
