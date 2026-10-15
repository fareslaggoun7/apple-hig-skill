/** Development-only browser checks. Requires Playwright + Chromium. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {checkMotion} from './check_motion_browser.mjs';
const {chromium}=createRequire(import.meta.url)('playwright');
const base=process.env.GALLERY_URL||'http://127.0.0.1:8000';
const topics=JSON.parse(fs.readFileSync(new URL('../examples/gallery/catalog.json',import.meta.url))).topics;
// A background HTTP server may not yet be listening when a CI worker starts
// Node. Check readiness once, before opening Chromium; never retry a route test.
async function waitForGallery(){
  const deadline=Date.now()+15000;
  let lastError;
  while(Date.now()<deadline){
    try{
      const response=await fetch(`${base}/catalog.json`,{signal:AbortSignal.timeout(1000)});
      if(!response.ok)throw new Error(`catalog.json returned HTTP ${response.status}`);
      const catalog=await response.json();
      assert.deepEqual(catalog.topics.map(topic=>topic.slug),topics.map(topic=>topic.slug),'The served gallery must match this checkout');
      console.log('Gallery HTTP server is ready.');
      return;
    }catch(error){
      if(error instanceof assert.AssertionError)throw error;
      lastError=error;
      await new Promise(resolve=>setTimeout(resolve,100));
    }
  }
  throw new Error(`Gallery server did not become ready at ${base} within 15 seconds: ${lastError?.message}`,{cause:lastError});
}
await waitForGallery();
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||(fs.existsSync(chromium.executablePath())?chromium.executablePath(): '/usr/bin/chromium')});
const failures=[],errors=[];let routes=0,actions=0;
try{
  for(const width of (process.argv.includes('--interactions-only')?[]:[1280,390])){
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    page.on('pageerror',error=>errors.push(error.message));
    for(const topic of topics){
      try{
        await page.goto(`${base}/?topic=${topic.slug}`);await page.waitForFunction(()=>window.galleryReady===true,null,{timeout:10000});
        assert.equal(await page.locator('#demo-heading').textContent(),topic.title);
        assert.ok(await page.locator('#stage').innerText());
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
        assert.equal(overflow,false,`horizontal overflow ${width}`);
        const all=await page.locator('#stage').evaluate(root=>[...root.querySelectorAll('button,input,select,textarea,summary,a')].filter(n=>!n.closest('[inert]')).length);
        assert.ok(all>0,'no interactive control');
        const first=page.locator('#stage button:enabled:visible').first();
        if(await first.count()){
          await first.click();actions++;
          if(await page.locator('dialog[open]').count())await page.keyboard.press('Escape');
        }
        routes++;
      }catch(error){failures.push(`${width} ${topic.slug}: ${error.message}`);}
    }
    await page.close();console.log(`Completed route sweep at ${width}px.`);
  }
  console.log(JSON.stringify({routes,actions,routeFailures:failures},null,2));
  assert.equal(failures.length,0,failures.join('\n'));
  const page=await browser.newPage({viewport:{width:1280,height:900}});
  page.on('pageerror',error=>errors.push(error.message));
  const open=async topic=>{await page.goto(`${base}/?topic=${topic}`);await page.waitForFunction(()=>window.galleryReady);};
  await open('sheets');await page.getByRole('button',{name:'Edit note',exact:true}).click();await page.locator('dialog input').fill('Revised trail');await page.getByRole('button',{name:'Save note',exact:true}).click();await page.waitForFunction(()=>document.querySelector('[data-note]').textContent==='Revised trail');assert.equal(await page.locator('[data-note]').textContent(),'Revised trail');
  await page.getByRole('button',{name:'Edit note',exact:true}).click();await page.locator('dialog input').fill('Discard this');await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('#stage dialog'));assert.equal(await page.locator('[data-note]').textContent(),'Revised trail');assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Edit note');
  await open('text-fields');await page.locator('#stage form button[type=submit]').click();assert.equal(await page.locator('[name=entry]').getAttribute('aria-invalid'),'true');await page.locator('[name=entry]').fill('Read daily');await page.locator('#stage form button[type=submit]').click();assert.match(await page.locator('#result').textContent(),/Saved/);
  await open('searching');await page.locator('[data-search]').fill('not-present');assert.match(await page.locator('[data-items]').innerText(),/No matching/);await page.getByRole('button',{name:'Clear search'}).click();assert.equal(await page.locator('[data-item]').count(),3);
  await open('tab-bars');await page.locator('[role=tab]').first().focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('[role=tab][aria-selected=true]').textContent(),'Favorites');
  await open('drag-and-drop');await page.getByRole('button',{name:'Move Water bottle down'}).click();assert.match(await page.locator('.reorder-item').first().textContent(),/Notebook/);
  await open('loading');await page.locator('[data-action=start]').click();await page.waitForFunction(()=>document.querySelector('progress').value===100);assert.match(await page.locator('[data-content]').textContent(),/Trail notes/);await page.locator('[data-action=error]').click();assert.match(await page.locator('[data-description]').textContent(),/Could not/);await page.locator('[data-action=start]').click();await page.locator('[data-action=cancel]').click();const cancelled=await page.locator('progress').getAttribute('value');await page.waitForTimeout(250);assert.equal(await page.locator('progress').getAttribute('value'),cancelled);
  await open('popovers');await page.locator('#command-anchor').click();assert.equal(await page.locator('[popover]').evaluate(n=>n.matches(':popover-open')),true);await page.keyboard.press('Escape');assert.equal(await page.locator('[popover]').evaluate(n=>n.matches(':popover-open')),false);
  // Wall-clock scheduling on busy CI workers must not let playback finish before Pause.
  await page.clock.install({time:new Date('2026-10-13T00:00:00Z')});
  await open('motion');await page.clock.pauseAt(new Date('2026-10-13T00:01:00Z'));
  const motionReport=await checkMotion(browser,base);console.log(JSON.stringify({motion:motionReport},null,2));
  await open('widgets');await page.locator('#appearance').click();assert.equal(await page.locator('body').evaluate(n=>n.classList.contains('dark')),true);
  await open('loading');await page.locator('[data-action=start]').click();await page.locator('#topic-list [data-topic=buttons]').click();await page.clock.runFor(300);assert.equal(await page.locator('body').getAttribute('data-topic'),'buttons');assert.match(await page.locator('#result').textContent(),/Try the controls/);assert.equal(await page.locator('#stage progress').count(),0);
  await open('motion');await page.locator('[data-play]').click();await page.locator('#topic-list [data-topic=buttons]').click();await page.clock.runFor(100);assert.match(await page.locator('#result').textContent(),/Try the controls/);
  await open('playing-audio');await page.locator('[data-action=play]').click();await page.locator('#topic-list [data-topic=buttons]').click();await page.clock.runFor(550);assert.match(await page.locator('#result').textContent(),/Try the controls/);
  await open('researchkit');await page.locator('[data-action=next]').click();assert.match(await page.locator('#result').textContent(),/declined/);await page.locator('[data-consent]').selectOption('yes');await page.locator('[data-action=next]').click();await page.locator('[data-action=next]').click();assert.match(await page.locator('#result').textContent(),/survey complete/);
  await open('generative-ai');await page.locator('[data-suggestion]').fill('My reviewed note.');await page.locator('[data-action=next]').click();await page.locator('[data-action=next]').click();assert.match(await page.locator('[data-state]').textContent(),/Applied locally: My reviewed note/);
  await open('file-management');await page.locator('[data-item]').first().click();await page.locator('[data-rename]').fill('Morning notes');await page.getByRole('button',{name:'Rename selected document'}).click();assert.equal(await page.locator('[data-item="Morning notes"]').count(),1);
  await open('voiceover');await page.getByRole('button',{name:'Show semantic outline'}).click();assert.match(await page.locator('[data-context]').textContent(),/status, polite/);
  await open('web-views');await page.getByRole('button',{name:'Open help page'}).click();assert.equal(await page.locator('iframe').isVisible(),true);await page.getByRole('button',{name:'Close help page'}).click();assert.equal(await page.locator('iframe').isVisible(),false);
  await page.close();
  if(errors.length)failures.push(...errors);
  console.log(JSON.stringify({routes,actions,failures},null,2));
  assert.equal(failures.length,0,failures.join('\n'));
}finally{await browser.close();}
