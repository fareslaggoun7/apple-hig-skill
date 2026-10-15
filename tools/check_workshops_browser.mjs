/** Behavioral checks for each implemented workshop, in the user's requested order. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {WORKSHOPS} from '../examples/gallery/workshops.mjs';
const action=(page,name)=>page.locator(`[data-w-action="${name}"]`).click();
const choose=(page,id)=>page.locator('[data-w-scenario]').selectOption(id);
const behavior={
  async 'getting-started'(page){
    await choose(page,'brief');await page.locator('[data-w-form=brief] button').click();assert.match(await page.locator('[data-brief-error]').textContent(),/Name the person/);await page.locator('[data-w-field=goal]').fill('Capture a trail note');await page.locator('[data-w-field=os]').fill('Actual OS to verify');await page.locator('[data-w-change=platform]').selectOption('ipados');await page.locator('[data-w-form=brief] button').click();assert.match(await page.locator('[data-brief-summary]').textContent(),/iPadOS/);
    await choose(page,'source-route');assert.equal(await page.locator('.wk-topic-routes button').count(),9);await page.locator('[data-w-change=platform]').selectOption('macos');assert.match(await page.locator('.wk-panel a').getAttribute('href'),/designing-for-macos/);
    await choose(page,'structure');await page.locator('[data-w-field=note]').fill('Same draft');await page.locator('[data-w-change=structure]').selectOption('connected');assert.equal(await page.locator('.wk-structure aside').count(),1);assert.equal(await page.locator('[data-w-field=note]').inputValue(),'Same draft');
    await choose(page,'states');await page.locator('[data-w-field=note]').fill('Keep this draft');await action(page,'submit');await action(page,'cancel');await page.waitForTimeout(600);assert.match(await page.locator('[data-start-outcome]').textContent(),/Cancelled/);await action(page,'failure');await action(page,'submit');await page.waitForFunction(()=>document.querySelector('[data-start-outcome]').textContent.includes('submitted'));await action(page,'again');assert.equal(await page.locator('[data-w-field=note]').inputValue(),'Keep this draft');await action(page,'submit');await choose(page,'record');await page.waitForTimeout(600);await choose(page,'states');assert.match(await page.locator('[data-start-outcome]').textContent(),/leaving/);
    await choose(page,'record');await page.locator('[data-w-field=claim]').fill('Original decision');const downloaded=page.waitForEvent('download');await action(page,'export');const download=await downloaded;const data=JSON.parse(fs.readFileSync(await download.path(),'utf8'));assert.equal(data.status,'unreviewed-draft');assert.equal(data.independent_review,false);assert.equal(data.semantic_error_bound,null);assert.equal(data.decision,'Original decision');
    await choose(page,'source-route');await page.locator('.wk-topic-routes [data-w-action="topic:designing-for-ios"]').click();await page.waitForFunction(()=>document.querySelector('[data-workshop="designing-for-ios"]'));await page.goto(new URL('?topic=getting-started',page.url()).href);await page.waitForFunction(()=>window.galleryReady);
    return 13;
  },
  async 'designing-for-visionos'(page){
    await choose(page,'contained-task');await page.locator('[data-w-field=note]').fill('Keep my spatial note');await action(page,'inspector');assert.equal(await page.locator('.wk-inspector').count(),1);assert.equal(await page.locator('[data-w-field=note]').inputValue(),'Keep my spatial note');
    await choose(page,'immersion');await page.locator('[data-w-field=note]').fill('Observation retained');await action(page,'enter');assert.equal(await page.locator('.wk-spatial-stage.is-immersed').count(),1);await action(page,'exit');assert.equal(await page.evaluate(()=>document.activeElement.dataset.focusKey),'enter');assert.equal(await page.locator('[data-w-field=note]').inputValue(),'Observation retained');
    await choose(page,'objects');await action(page,'select:studio');await action(page,'turn');assert.equal(await page.locator('[data-w-field=rotation]').inputValue(),'30');await page.locator('[data-w-field=rotation]').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('[data-w-field=rotation]').inputValue(),'60');assert.equal(await page.locator('.wk-object.is-studio').count(),1);
    await choose(page,'comfort');await page.locator('[data-w-field=note]').fill('Stable work');await page.locator('[data-w-field=stationary]').uncheck();assert.equal(await page.locator('.wk-stable-frame.is-visible').count(),0);assert.equal(await page.locator('[data-w-field=note]').inputValue(),'Stable work');
    await choose(page,'sharing');await page.locator('[data-w-field=note]').fill('Shared draft');await action(page,'invite');await action(page,'accept');assert.match(await page.locator('[data-spatial-participants]').textContent(),/2 participants/);await action(page,'leave');assert.match(await page.locator('[data-spatial-participants]').textContent(),/1 participant/);assert.equal(await page.locator('[data-w-field=note]').inputValue(),'Shared draft');
    return 12;
  },
  async 'designing-for-tvos'(page){
    await choose(page,'focus');await page.locator('[data-w-action="open:0"]').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>document.activeElement.dataset.focusKey),'open:1');await page.keyboard.press('ArrowDown');assert.equal(await page.evaluate(()=>document.activeElement.dataset.focusKey),'open:3');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.dataset.focusKey),'film-detail');await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.dataset.focusKey),'open:3');assert.equal(await page.locator('[data-tv-grid] button[tabindex="0"]').count(),1);
    await page.locator('[data-w-width]').selectOption('compact');await page.locator('[data-w-action="open:0"]').focus();await page.keyboard.press('ArrowDown');assert.equal(await page.evaluate(()=>document.activeElement.dataset.focusKey),'open:1');await page.locator('[data-w-width]').selectOption('regular');
    await choose(page,'legibility');await page.locator('[data-w-field=large]').check();assert.equal(await page.locator('.wk-tv-readable').count(),1);
    await choose(page,'profiles');await action(page,'open:0');await action(page,'list');await page.locator('[data-w-change=profile]').selectOption('Sam');assert.match(await page.locator('[data-viewer-list]').textContent(),/Sam: 0/);await page.locator('[data-w-change=profile]').selectOption('Alex');assert.match(await page.locator('[data-viewer-list]').textContent(),/Alex: 1/);
    await choose(page,'signin');await page.locator('[data-w-field=code]').fill('123456');await page.locator('[data-w-form=signin] button').click();assert.match(await page.locator('#tv-code-error').textContent(),/bundled code/);await page.locator('[data-w-field=code]').fill('246810');await page.locator('[data-w-form=signin] button').click();assert.match(await page.locator('.wk-panel h3').textContent(),/connection complete/);
    await choose(page,'playback');await action(page,'play');await action(page,'chapter');await action(page,'minimize');assert.equal(await page.locator('.wk-story-player.is-small').count(),1);assert.match(await page.locator('[data-chapter]').textContent(),/coast/);await action(page,'play');assert.match(await page.locator('.wk-story-player').textContent(),/paused/);
    return 13;
  },
  async 'designing-for-games'(page){
    await choose(page,'play-first');await action(page,'left');assert.match(await page.locator('[data-game-message]').textContent(),/Edge/);for(const n of ['right','right','right','down','down'])await action(page,n);assert.match(await page.locator('[data-game-message]').textContent(),/Camp reached/);assert.equal(await page.evaluate(()=>document.activeElement.dataset.focusKey),'restart');assert.equal(await page.locator('[data-w-action=right]').isDisabled(),true);await action(page,'restart');assert.match(await page.locator('[data-game-position]').textContent(),/row 1, column 1/);
    await choose(page,'displays');await action(page,'right');await page.locator('[data-w-change=ratio]').selectOption('square');assert.match(await page.locator('[data-game-position]').textContent(),/column 2/);
    await choose(page,'controls');await page.locator('[data-w-change=keys]').selectOption('wasd');await page.locator('.wk-game-board').focus();await page.keyboard.press('d');await page.keyboard.press('s');assert.match(await page.locator('[data-game-position]').textContent(),/row 2, column 2/);const captured=await page.locator('#topic-search').evaluate(n=>{const e=new KeyboardEvent('keydown',{key:'d',bubbles:true,cancelable:true});n.dispatchEvent(e);return e.defaultPrevented;});assert.equal(captured,false);
    await choose(page,'accessibility');await page.locator('[data-w-field=contrast]').check();await page.locator('[data-w-field=captions]').uncheck();assert.equal(await page.locator('.wk-game-shell.high-contrast').count(),1);assert.match(await page.locator('.wk-game-board').getAttribute('aria-label'),/Camp row 3/);
    await choose(page,'continuity');await action(page,'right');await action(page,'checkpoint');await action(page,'down');await action(page,'pause');assert.equal(await page.locator('[data-w-action=right]').isDisabled(),true);await action(page,'restore');assert.match(await page.locator('[data-game-position]').textContent(),/row 1, column 2/);assert.equal(await page.locator('[data-w-action=right]').isDisabled(),false);
    return 12;
  },
  async 'design-principles'(page){
    await choose(page,'purpose');await action(page,'capture');assert.match(await page.locator('#capture-error').textContent(),/Write a note/);await page.locator('[data-w-field=note]').fill('A useful thought');await action(page,'capture');assert.match(await page.locator('[data-captured]').textContent(),/1 saved/);
    await choose(page,'agency');const original=await page.locator('[data-principle-note]').textContent();await action(page,'archive');assert.equal(await page.evaluate(()=>document.activeElement.dataset.focusKey),'undo');assert.equal(await page.locator('[data-principle-note]').count(),0);await action(page,'undo');assert.equal(await page.locator('[data-principle-note]').textContent(),original);
    await choose(page,'responsibility');await page.locator('[data-w-field=city]').fill('My city');await action(page,'sample-location');assert.match(await page.locator('[data-w-field=city]').inputValue(),/Sample/);assert.match(await page.locator('[data-data-use]').textContent(),/no device location/);
    await choose(page,'familiarity');await action(page,'save:0');assert.equal(await page.locator('[data-w-action="save:0"]').isDisabled(),true);assert.equal(await page.locator('[data-w-action="save:1"]').isDisabled(),false);
    await choose(page,'flexibility');await action(page,'move:1');assert.match(await page.locator('[data-flex-list] li').first().textContent(),/Visit the coast/);await page.locator('[data-w-width]').selectOption('compact');assert.match(await page.locator('[data-flex-list] li').first().textContent(),/Visit the coast/);
    await choose(page,'simplicity');await page.locator('[data-w-field=note]').fill('Keep the note');await action(page,'advanced');await page.locator('[data-w-field=category]').fill('Travel');await action(page,'advanced');await action(page,'advanced');assert.equal(await page.locator('[data-w-field=category]').inputValue(),'Travel');assert.equal(await page.locator('[data-w-field=note]').inputValue(),'Keep the note');
    await choose(page,'craft');await action(page,'rename');await page.locator('dialog input').fill('');await page.locator('dialog button[value=save]').click();assert.match(await page.locator('[data-editor-error]').textContent(),/Enter a title/);await page.keyboard.press('Escape');await action(page,'rename');await page.locator('dialog input').fill('A precise title');await page.locator('dialog button[value=save]').click();await page.waitForFunction(()=>document.querySelector('[data-crafted-title]').textContent==='A precise title');assert.equal(await page.evaluate(()=>document.activeElement.dataset.focusKey),'rename');
    await choose(page,'delight');await action(page,'done');assert.match(await page.locator('[data-delight-state]').textContent(),/plan is ready/);await action(page,'reopen');assert.match(await page.locator('[data-delight-state]').textContent(),/no hurry/);
    return 15;
  },
  async 'designing-for-iphone-duo'(page){
    await choose(page,'display-contexts');await action(page,'select:trail');await page.locator('[data-w-change=pose]').selectOption('inner');assert.equal(await page.locator('.wk-duo-panes>aside').count(),1);assert.equal(await page.locator('.wk-duo-panes>article').count(),1);
    await choose(page,'draft-continuity');await action(page,'select:trail');await page.locator('[data-w-field=body]').fill('Duo draft');await page.locator('[data-w-change=pose]').selectOption('inner');await action(page,'select:coast');await page.locator('[data-w-field=body]').fill('Coast draft');await action(page,'select:trail');await page.locator('[data-w-change=pose]').selectOption('outer');assert.equal(await page.locator('[data-w-field=body]').inputValue(),'Duo draft');
    await choose(page,'reserved-space');await action(page,'camera');assert.equal(await page.locator('.wk-duo.has-camera.has-fold').count(),1);await action(page,'fold');assert.equal(await page.locator('.wk-duo.has-fold').count(),0);await page.locator('[data-w-field=body]').fill('Clear of the camera');await page.locator('[data-w-change=pose]').selectOption('portrait');assert.equal(await page.locator('[data-w-field=body]').inputValue(),'Clear of the camera');
    await choose(page,'arrangement');await page.locator('[data-w-field=body]').fill('My caption');await page.locator('[data-w-change=arrangement]').selectOption('overlay');await page.locator('[data-w-change=pose]').selectOption('portrait');assert.equal(await page.locator('.wk-arrangement.is-layered.is-tall').count(),1);assert.equal(await page.locator('[data-w-field=body]').inputValue(),'My caption');await action(page,'save');assert.match(await page.locator('.wk-scene').textContent(),/Local save 1/);
    await choose(page,'action-overflow');await action(page,'compressed');await page.locator('.wk-panel details summary').click();await action(page,'tag');assert.match(await page.locator('.wk-panel [data-duo-notice]').textContent(),/Travel tag/);await action(page,'compose');assert.equal(await page.locator('[data-w-field=body]').inputValue(),'');
    return 10;
  },
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
