/** Behavioral checks for each implemented workshop, in the user's requested order. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {WORKSHOPS} from '../examples/gallery/workshops.mjs';
const action=(page,name)=>page.locator(`[data-w-action="${name}"]`).click();
const choose=(page,id)=>page.locator('[data-w-scenario]').selectOption(id);
const behavior={
  async 'designing-for-watchos'(page){
    await choose(page,'glance');await action(page,'context');assert.match(await page.locator('.wk-watch').textContent(),/short walk/);
    await choose(page,'session');await action(page,'start');await page.waitForTimeout(1150);assert.notEqual(await page.locator('[data-watch-time]').textContent(),'5:00');await action(page,'pause');const time=await page.locator('[data-watch-time]').textContent();await page.waitForTimeout(1100);assert.equal(await page.locator('[data-watch-time]').textContent(),time);
    await action(page,'start');await choose(page,'crown');await page.waitForTimeout(1100);await choose(page,'session');assert.match(await page.locator('.wk-watch').textContent(),/Paused or ready/);await action(page,'restart');assert.equal(await page.locator('[data-watch-time]').textContent(),'5:00');
    await choose(page,'crown');await action(page,'more');assert.match(await page.locator('[data-watch-duration]').textContent(),/6 min/);await page.locator('[data-w-field=minutes]').fill('1');assert.equal(await page.locator('[data-w-action=less]').isDisabled(),true);await page.locator('[data-w-field=minutes]').focus();await page.keyboard.press('ArrowRight');assert.match(await page.locator('[data-watch-duration]').textContent(),/2 min/);
    await choose(page,'complication');await action(page,'detail');assert.match(await page.locator('.wk-watch').textContent(),/east entrance/);await action(page,'back');assert.equal(await page.evaluate(()=>document.activeElement.dataset.focusKey),'detail');
    await choose(page,'notification');await action(page,'reply');assert.equal(await page.locator('[data-w-action=reply]').isDisabled(),true);await action(page,'detail');await action(page,'back');assert.match(await page.locator('.wk-watch').textContent(),/Acknowledged/);
    return 11;
  },
  async 'designing-for-macos'(page){
    await choose(page,'documents');await page.locator('[data-w-field=body]').fill('Mac draft');await action(page,'document:coast');await action(page,'document:trail');assert.equal(await page.locator('[data-w-field=body]').inputValue(),'Mac draft');
    await choose(page,'commands');await action(page,'new');assert.equal(await page.locator('[data-w-field=body]').inputValue(),'');await page.locator('[data-w-field=body]').fill('Before revision');await action(page,'revise');assert.equal(await page.locator('[data-w-field=body]').inputValue(),'Revised field notes.');await action(page,'undo');assert.equal(await page.locator('[data-w-field=body]').inputValue(),'Before revision');assert.equal(await page.locator('[data-w-action=undo]').isDisabled(),true);
    await page.locator('[data-w-field=body]').focus();await page.keyboard.press('Control+s');assert.match(await page.locator('[data-document-status]').textContent(),/Saved/);
    await choose(page,'personalize');await page.locator('[data-w-field=body]').fill('My workspace');await page.locator('[data-w-field=showSave]').uncheck();assert.equal(await page.locator('[data-custom-toolbar] [data-w-action=save]').count(),0);assert.equal(await page.locator('[data-w-field=body]').inputValue(),'My workspace');await action(page,'save');assert.match(await page.locator('[data-document-status]').textContent(),/Saved/);
    await choose(page,'focus');await page.locator('[data-w-field=body]').fill('Focused draft');await action(page,'focus');assert.equal(await page.locator('.wk-document-sidebar').count(),0);await action(page,'focus');assert.equal(await page.locator('[data-w-field=body]').inputValue(),'Focused draft');
    await choose(page,'precision');await action(page,'left');assert.match(await page.locator('[data-marker-value]').textContent(),/49/);await page.locator('[data-w-field=offset]').fill('100');assert.equal(await page.locator('[data-w-action=right]').isDisabled(),true);await page.locator('[data-w-field=offset]').focus();await page.keyboard.press('ArrowLeft');assert.match(await page.locator('[data-marker-value]').textContent(),/99/);
    return 12;
  },
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
  async 'designing-for-ipados'(page){
    await choose(page,'workspace');await page.locator('[data-w-field=body]').fill('A preserved iPad draft.');
    await action(page,'collection:ideas');assert.match(await page.locator('.wk-document-bar h3').textContent(),/Studio/);
    await action(page,'collection:travel');assert.equal(await page.locator('[data-w-field=body]').inputValue(),'A preserved iPad draft.');
    await action(page,'document:coast');await page.locator('[data-w-field=body]').fill('A second independent draft.');await action(page,'document:trail');assert.equal(await page.locator('[data-w-field=body]').inputValue(),'A preserved iPad draft.');
    await choose(page,'adaptation');await page.locator('[data-w-field=body]').fill('Keep this when columns reflow.');
    await page.locator('[data-w-width]').selectOption('compact');await page.locator('[data-w-size]').selectOption('1.5');
    assert.equal(await page.locator('[data-w-field=body]').inputValue(),'Keep this when columns reflow.');
    await action(page,'sidebar');await action(page,'sidebar');assert.equal(await page.locator('[data-w-field=body]').inputValue(),'Keep this when columns reflow.');
    await choose(page,'inspector');await page.locator('[data-w-field=body]').fill('One two three');assert.equal(await page.locator('[data-word-count]').textContent(),'3');
    await action(page,'inspector');assert.equal(await page.locator('.wk-inspector').count(),0);assert.equal(await page.locator('[data-w-field=body]').inputValue(),'One two three');
    await choose(page,'keyboard');await page.locator('[data-w-field=body]').focus();await page.keyboard.press('Control+s');assert.match(await page.locator('[data-document-status]').textContent(),/Saved/);
    const captured=await page.locator('#topic-search').evaluate(n=>{const ev=new KeyboardEvent('keydown',{key:'s',ctrlKey:true,bubbles:true,cancelable:true});n.dispatchEvent(ev);return ev.defaultPrevented;});assert.equal(captured,false);
    await choose(page,'sketch-transfer');await action(page,'mark');assert.match(await page.locator('.wk-panel .wk-meta').textContent(),/1 stroke/);
    const canvas=page.locator('canvas');const bounds=await canvas.boundingBox();await page.mouse.move(bounds.x+20,bounds.y+20);await page.mouse.down();await page.mouse.move(bounds.x+75,bounds.y+50,{steps:3});await page.mouse.up();assert.match(await page.locator('.wk-panel .wk-meta').textContent(),/2 strokes/);
    await action(page,'clip');assert.match(await page.locator('[data-w-field=body]').inputValue(),/Sketch clip/);await action(page,'clear-sketch');assert.match(await page.locator('.wk-panel .wk-meta').textContent(),/0 strokes/);assert.match(await page.locator('[data-w-field=body]').inputValue(),/Sketch clip/);
    return 13;
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
