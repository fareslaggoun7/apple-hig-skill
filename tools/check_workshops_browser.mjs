/** Behavioral checks for each implemented workshop, in the user's requested order. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {WORKSHOPS} from '../examples/gallery/workshops.mjs';
const action=(page,name)=>page.locator(`[data-w-action="${name}"]`).click();
const choose=(page,id)=>page.locator('[data-w-scenario]').selectOption(id);
const behavior={
  async 'designing-for-ios'(page){
    await choose(page,'library');await action(page,'open:ridge');await action(page,'bookmark');await action(page,'back');
    assert.match(await page.locator('.wk-items').textContent(),/Saved/);assert.equal(await page.evaluate(()=>document.activeElement.dataset.focusKey),'open:ridge');
    await choose(page,'search');await page.locator('[data-w-field=query]').fill('not present');assert.match(await page.locator('.wk-empty').textContent(),/No matching/);
    await action(page,'clear');assert.equal(await page.locator('.wk-items li').count(),3);
    await page.locator('[data-w-field=query]').fill('coast');await action(page,'open:coast');await action(page,'back');assert.equal(await page.locator('[data-w-field=query]').inputValue(),'coast');
    await choose(page,'compose');await action(page,'edit');await page.locator('dialog input').fill('');await page.locator('dialog button[value=save]').click();assert.match(await page.locator('[data-editor-error]').textContent(),/Enter a title/);
    await page.keyboard.press('Escape');assert.equal(await page.locator('[data-note-title]').textContent(),'Weekend field notes');
    await action(page,'edit');await page.locator('dialog input').fill('A better draft');await page.locator('dialog button[value=save]').click();
    await page.waitForFunction(()=>document.querySelector('[data-note-title]').textContent==='A better draft');assert.equal(await page.evaluate(()=>document.activeElement.dataset.focusKey),'edit');
    await choose(page,'tab-state');await action(page,'open:ridge');await action(page,'bookmark');await action(page,'back');await page.locator('[role=tab]').first().focus();await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('[role=tab][aria-selected=true]').textContent(),'Saved');assert.equal(await page.locator('.wk-items li').count(),1);
    await choose(page,'compose');assert.equal(await page.locator('[data-note-title]').textContent(),'A better draft');
    await page.locator('[data-w-size]').selectOption('1.5');await page.locator('[data-w-width]').selectOption('compact');assert.equal(await page.locator('[data-note-title]').textContent(),'A better draft');
    await page.locator('#reduce-motion').check();assert.equal(await page.locator('[data-w-scenario]').inputValue(),'compose');assert.equal(await page.locator('[data-note-title]').textContent(),'A better draft');
    await choose(page,'load-recovery');await action(page,'load');await action(page,'cancel');await page.waitForTimeout(550);assert.match(await page.locator('.wk-reader').textContent(),/A few good things/);
    await action(page,'fail');assert.match(await page.locator('.wk-reader').textContent(),/Could not load/);await action(page,'retry');await page.waitForFunction(()=>document.querySelector('.wk-reader').textContent.includes('Your collection is ready'));
    await action(page,'load');await choose(page,'compose');await page.waitForTimeout(550);await choose(page,'load-recovery');
    assert.match(await page.locator('.wk-reader').textContent(),/A few good things/);
    await action(page,'load');await page.locator('#topic-list [data-topic=buttons]').click();await page.waitForTimeout(550);
    assert.match(await page.locator('#result').textContent(),/Try the controls/);
    await page.goto(new URL('?topic=designing-for-ios',page.url()).href);await page.waitForFunction(()=>window.galleryReady);
    return 19;
  },
};
export async function checkWorkshops(browser,base,selected){
  const workshops=WORKSHOPS.filter(w=>!selected||w.id===selected);if(!workshops.length)throw Error('No implemented matching workshop');
  const page=await browser.newPage({viewport:{width:1280,height:1100},reducedMotion:'no-preference'}),errors=[];let layouts=0,actions=0;
  page.on('pageerror',error=>errors.push(error.message));
  try{
    for(const w of workshops){
      await page.goto(`${base}/?topic=${w.id}`);await page.waitForFunction(()=>window.galleryReady);
      if(!behavior[w.id])throw Error('Missing behavioral check for '+w.id);
      actions+=await behavior[w.id](page);
      for(const width of [320,390,1280])for(const dark of [false,true]){
        await page.setViewportSize({width,height:1100});await page.evaluate(dark=>document.body.classList.toggle('dark',dark),dark);
        for(const s of w.scenarios){
          await choose(page,s.id);await page.locator('[data-w-size]').selectOption('1.5');
          assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${w.id} ${s.id} ${width}`);
          assert.ok(await page.locator('.wk-scene').innerText());
          assert.equal(new URL(await page.locator('[data-w-permalink]').getAttribute('href')).searchParams.get('example'),s.id);layouts++;
        }
      }
      await page.setViewportSize({width:1280,height:1100});await page.locator('#reduce-motion').uncheck();
      console.log('Verified '+w.label+': '+w.scenarios.length+' implemented studies.');
    }
    assert.deepEqual(errors,[]);
    return {topics:workshops.length,studies:workshops.reduce((n,w)=>n+w.scenarios.length,0),layouts,behavior_checks:actions,failures:errors};
  }finally{await page.close();}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const {chromium}=createRequire(import.meta.url)('playwright');
  const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||(fs.existsSync(chromium.executablePath())?chromium.executablePath():'/usr/bin/chromium')});
  try{console.log(JSON.stringify(await checkWorkshops(browser,process.env.GALLERY_URL||'http://127.0.0.1:8000',process.argv.find(s=>s.startsWith('--topic='))?.slice(8)),null,2));}finally{await browser.close();}
}
