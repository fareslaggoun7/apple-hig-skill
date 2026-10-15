/** Capture each implemented study from its actual browser renderer. */
import fs from 'node:fs';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import {WORKSHOPS} from '../examples/gallery/workshops.mjs';
const {chromium}=createRequire(import.meta.url)('playwright');
const selected=process.argv.find(s=>s.startsWith('--topic='))?.slice(8);
const workshops=WORKSHOPS.filter(w=>!selected||w.id===selected);
if(!workshops.length)throw Error('No matching implemented workshop');
const base=process.env.GALLERY_URL||'http://127.0.0.1:8000';
fs.mkdirSync('work/workshop-captures',{recursive:true});fs.mkdirSync('examples/gallery/workshop-previews',{recursive:true});
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||(fs.existsSync(chromium.executablePath())?chromium.executablePath():'/usr/bin/chromium')});
try{
  const page=await browser.newPage({viewport:{width:1440,height:1200},reducedMotion:'reduce'});
  for(const w of workshops){
    await page.goto(`${base}/?topic=${w.id}`);await page.waitForFunction(()=>window.galleryReady);
    for(const s of w.scenarios){
      await page.locator('[data-w-scenario]').selectOption(s.id);
      const png=await page.locator('.wk-scene').screenshot();const temp='work/workshop-captures/'+w.id+'--'+s.id+'.png';fs.writeFileSync(temp,png);
      execFileSync('python3',['-c',"from PIL import Image; import sys; im=Image.open(sys.argv[1]).convert('RGB'); im.thumbnail((960,720)); im.save(sys.argv[2],format='WEBP',quality=88)",temp,`examples/gallery/workshop-previews/${w.id}--${s.id}.webp`]);
    }
    await page.locator('[data-w-scenario]').selectOption(w.scenarios[0].id);
    await page.locator('.workshop').screenshot({path:'work/workshop-captures/'+w.id+'-desktop.png'});
    execFileSync('python3',['-c',"from PIL import Image; import sys; im=Image.open(sys.argv[1]).convert('RGB'); im.thumbnail((900,700)); im.save(sys.argv[2],format='WEBP',quality=85)",'work/workshop-captures/'+w.id+'-desktop.png',`examples/gallery/previews/${w.id}.webp`]);
    if(w.id==='designing-for-ios')await page.locator('.wk-scene').screenshot({path:'docs/assets/specimen-designing-for-ios.png'});
    await page.setViewportSize({width:390,height:1200});
    await page.locator('.workshop').screenshot({path:'work/workshop-captures/'+w.id+'-mobile.png'});
    await page.setViewportSize({width:1440,height:1200});
    console.log('Captured '+w.label+': '+w.scenarios.length+' studies, desktop and phone workshop views.');
  }
}finally{await browser.close();}
