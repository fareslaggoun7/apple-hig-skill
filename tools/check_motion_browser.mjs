/** Behavioral regression checks for the actual motion player, using a controlled browser clock. */
import assert from 'node:assert/strict';
import {MOTION_EXAMPLES,MOTION_DURATION} from '../examples/gallery/motion.mjs';

export async function checkMotion(browser,base){
  const page=await browser.newPage({viewport:{width:1280,height:1000},reducedMotion:'no-preference'});
  const errors=[];let checks=0;
  page.on('pageerror',error=>errors.push(error.message));
  const state=()=>page.locator('#stage').getAttribute('data-playback');
  const frame=()=>page.locator('.motion-stage').getAttribute('data-frame').then(Number);
  const choose=id=>page.locator('[data-motion-select]').selectOption(id);
  const changePreference=async value=>{
    await page.evaluate(value=>{
      const query=matchMedia('(prefers-reduced-motion: reduce)');
      window.motionPreferenceChange=query.matches===(value==='reduce')?Promise.resolve():new Promise(resolve=>query.addEventListener('change',()=>resolve(),{once:true}));
    },value);
    await page.emulateMedia({reducedMotion:value});await page.evaluate(()=>window.motionPreferenceChange);
  };
  const seek=async value=>page.locator('[data-seek]').evaluate((node,value)=>{node.value=String(value);node.dispatchEvent(new Event('input',{bubbles:true}));},value);
  try{
    await page.clock.install({time:new Date('2026-10-15T00:00:00Z')});
    await page.goto(`${base}/?topic=motion`);await page.waitForFunction(()=>window.galleryReady);
    await page.clock.pauseAt(new Date('2026-10-15T00:01:00Z'));
    await page.evaluate(()=>{
      const request=requestAnimationFrame,cancel=cancelAnimationFrame;
      window.motionPendingFrames=new Set();
      window.requestAnimationFrame=callback=>{const id=request(time=>{window.motionPendingFrames.delete(id);callback(time);});window.motionPendingFrames.add(id);return id;};
      window.cancelAnimationFrame=id=>{window.motionPendingFrames.delete(id);cancel(id);};
    });
    assert.equal(await state(),'idle');assert.equal(await frame(),0);assert.equal(await page.locator('[data-loop]').isChecked(),false);checks++;
    await page.locator('[data-next]').click();assert.equal(await page.locator('[data-motion-select]').inputValue(),'reduced-motion');
    await page.locator('[data-previous]').click();assert.equal(await page.locator('[data-previous]').isDisabled(),true);
    await page.locator('.motion-library summary').click();await page.locator('button[data-motion="undo-removal"]').click();
    assert.equal(await page.locator('[data-next]').isDisabled(),true);
    assert.equal(await page.locator('button[data-motion][aria-pressed=true]').count(),1);
    assert.equal(await page.locator('[data-motion-select]').inputValue(),'undo-removal');
    await page.locator('.motion-library summary').click();checks++;
    // Check every example in both modes: selected-after-pause, actual frame advancement,
    // pause stability, resume, held endpoint, status, and rewind/reset.
    for(const reduced of [false,true]){
      await page.locator('#reduce-motion').setChecked(reduced);
      for(const example of MOTION_EXAMPLES){
        await choose(example.id);assert.equal(await state(),'idle');assert.equal(await frame(),0);
        await page.locator('[data-play]').click();await page.clock.runFor(160);
        assert.equal(await state(),'playing',example.id);assert.ok(await frame()>.1,example.id+' must advance');
        await page.locator('[data-pause]').click();const paused=await frame();
        await page.clock.runFor(600);assert.equal(await frame(),paused);assert.equal(await state(),'paused');
        await page.locator('[data-pause]').click();await page.clock.runFor(3000);
        assert.equal(await state(),'complete');assert.equal(await frame(),MOTION_DURATION);
        assert.match(await page.locator('#result').textContent(),/Animation complete/);
        assert.equal(await page.locator('[data-motion-state]').textContent(),example.id==='undo-removal'?'Weekend plans restored. All three notes are present.':example.outcome);
        await page.clock.runFor(1000);assert.equal(await frame(),MOTION_DURATION);
        assert.equal(await page.evaluate(()=>window.motionPendingFrames.size),0);
        await seek(700);assert.equal(await state(),'paused');assert.equal(await frame(),.7);
        await page.locator('[data-reset]').click();assert.equal(await state(),'idle');assert.equal(await frame(),0);
        checks++;
      }
    }
    await page.locator('#reduce-motion').uncheck();
    await choose('progress-update');await page.locator('[data-rate]').selectOption('0.5');
    await page.locator('[data-play]').click();await page.clock.runFor(1000);const slow=await frame();
    assert.ok(slow>.45&&slow<.55,'half speed must advance about half a second');
    await page.locator('[data-rate]').selectOption('2');await page.clock.runFor(500);
    assert.ok(Math.abs((await frame())-slow-1)<.06,'changing speed preserves consumed time');checks++;
    await page.locator('[data-pause]').click();
    await choose('sheet-presentation');await page.locator('[data-rate]').selectOption('1');
    await page.locator('[data-play]').click();await page.clock.runFor(500);await page.locator('[data-pause]').click();
    const preserved=await frame();await page.locator('#reduce-motion').check();
    assert.equal(await page.locator('[data-motion-select]').inputValue(),'sheet-presentation');
    assert.equal(await frame(),preserved);assert.equal(await state(),'paused');
    assert.equal(await page.evaluate(()=>document.activeElement.id),'reduce-motion');
    await changePreference('reduce');assert.equal(await frame(),preserved);
    assert.equal(await page.locator('#reduce-motion').isChecked(),true);
    assert.equal(await page.locator('#reduce-motion').getAttribute('aria-disabled'),'true');
    assert.equal(await page.evaluate(()=>document.activeElement.id),'reduce-motion','system changes must preserve keyboard focus');
    await page.keyboard.press('Space');assert.equal(await page.locator('#reduce-motion').isChecked(),true,'system reduction cannot be toggled off locally');
    assert.equal(await frame(),preserved);assert.equal(await state(),'paused');
    await changePreference('no-preference');assert.equal(await page.locator('#reduce-motion').isChecked(),true,'local reduction survives a system preference change');
    await page.locator('#reduce-motion').uncheck();checks++;
    await choose('tab-transition');await page.locator('[data-play]').click();await page.clock.runFor(400);
    const playingFrame=await frame();await page.locator('#reduce-motion').check();
    assert.equal(await frame(),playingFrame);assert.equal(await state(),'playing');
    assert.equal(await page.locator('[data-motion-select]').inputValue(),'tab-transition');
    assert.equal(await page.locator('.motion-stage').getAttribute('data-reduced'),'true');
    await page.clock.runFor(120);assert.ok(await frame()>playingFrame);
    await page.locator('#reduce-motion').uncheck();checks++;
    // Keyboard scrubbing has exact endpoints and can resume from an intermediate position.
    await page.locator('[data-seek]').focus();await page.keyboard.press('End');assert.equal(await frame(),2.8);
    await page.keyboard.press('Home');assert.equal(await frame(),0);
    await page.keyboard.press('ArrowRight');assert.equal(await frame(),.01);
    await page.locator('[data-pause]').click();await page.clock.runFor(80);assert.ok(await frame()>.05);checks++;
    await page.locator('[data-reset]').click();await page.locator('[data-loop]').check();
    await page.locator('[data-play]').click();await page.clock.runFor(3100);assert.equal(await state(),'playing');assert.ok(await frame()<.4);
    await page.locator('[data-pause]').click();const loopPause=await frame();await page.clock.runFor(5000);assert.equal(await frame(),loopPause);
    await page.locator('[data-loop]').uncheck();await page.locator('[data-pause]').click();await page.clock.runFor(3000);assert.equal(await state(),'complete');checks++;
    await choose('spring-retarget');await page.locator('[data-target="1"]').click();await page.clock.runFor(120);
    const before=await page.locator('.motion-card').evaluate(node=>node.style.transform);
    await page.locator('[data-target="0"]').click();assert.equal(await page.locator('.motion-card').evaluate(node=>node.style.transform),before);
    await page.clock.runFor(32);const after=await page.locator('.motion-card').evaluate(node=>new DOMMatrixReadOnly(node.style.transform).m41);
    assert.ok(Number.isFinite(after));assert.equal(await page.locator('[data-seek]').isDisabled(),true);
    await page.locator('[data-pause]').click();const manualPause=await page.locator('.motion-card').evaluate(node=>node.style.transform);
    await page.clock.runFor(1000);assert.equal(await page.locator('.motion-card').evaluate(node=>node.style.transform),manualPause);
    await page.locator('[data-pause]').click();await page.clock.runFor(32);
    assert.notEqual(await page.locator('.motion-card').evaluate(node=>node.style.transform),manualPause);checks++;
    await page.locator('[data-target="1"]').click();await page.clock.runFor(2200);assert.equal(await state(),'complete');
    // Viewport layout and ResizeObserver run on the browser's rendering cycle,
    // independently of the mocked animation clock. Wait for that actual event.
    await page.evaluate(()=>{
      window.motionResizeObserved=new Promise(resolve=>{
        const observer=new ResizeObserver(()=>{if(innerWidth===320){observer.disconnect();resolve();}});
        observer.observe(document.querySelector('.motion-stage'));
      });
    });
    await page.setViewportSize({width:320,height:1100});await page.evaluate(()=>window.motionResizeObserved);
    const fits=await page.locator('.motion-stage').evaluate(stage=>{const a=stage.getBoundingClientRect(),b=stage.querySelector('.motion-card').getBoundingClientRect();return b.left>=a.left&&b.right<=a.right;});assert.equal(fits,true,'settled spring must stay in bounds after resize');
    await page.locator('#reduce-motion').check();await page.locator('[data-target="0"]').click();await page.clock.runFor(32);
    assert.equal(await page.locator('.motion-card').evaluate(node=>node.style.transform),'translateX(0px)');assert.match(await page.locator('.motion-card').textContent(),/Left selected/);checks++;
    // Reduced alternatives use a finite set of direct states, never fractional movement,
    // rotation, scaling, widths, or opacity across the sampled transition.
    for(const example of MOTION_EXAMPLES){
      await choose(example.id);
      const failures=await page.evaluate(async name=>{
        const {renderFrame}=await import('./motion.mjs'),stage=document.querySelector('.motion-stage'),values=new Map();
        for(const time of [0,.35,.5,.7,1,1.4,1.9,2.4,2.8]){
          renderFrame(stage,name,time,true);
          [...stage.querySelectorAll('*')].forEach((node,index)=>{
            for(const property of ['transform','opacity','width','height','maxHeight']){
              const key=index+':'+property;if(!values.has(key))values.set(key,new Set());values.get(key).add(node.style[property]);
            }
          });
        }
        return [...values].filter(([,states])=>states.size>2).map(([key,states])=>({key,states:[...states]}));
      },example.id);
      assert.deepEqual(failures,[],example.id+' reduced motion must use direct visual states');checks++;
    }
    for(const width of [320,390,1280])for(const dark of [false,true]){
      await page.setViewportSize({width,height:1100});
      await page.evaluate(dark=>document.body.classList.toggle('dark',dark),dark);
      for(const example of MOTION_EXAMPLES){
        await choose(example.id);await seek(2800);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${width}px ${example.id}`);
        assert.equal(await page.locator('.motion-stage').getAttribute('inert'),'');
        assert.equal(await page.locator('.motion-stage button,.motion-stage input,.motion-stage a').count(),0);
        assert.equal(new URL(await page.locator('[data-permalink]').getAttribute('href')).searchParams.get('motion'),example.id);checks++;
      }
    }
    // Hidden-page pausing and navigation release the animation and event listeners.
    await page.setViewportSize({width:1280,height:1000});await choose('sheet-presentation');await page.locator('[data-play]').click();await page.clock.runFor(200);
    await page.evaluate(()=>{Object.defineProperty(document,'hidden',{value:true,configurable:true});document.dispatchEvent(new Event('visibilitychange'));delete document.hidden;});
    assert.equal(await state(),'paused');const hiddenFrame=await frame();await page.clock.runFor(1000);assert.equal(await frame(),hiddenFrame);checks++;
    await page.locator('[data-pause]').click();await page.locator('#topic-list [data-topic=buttons]').click();
    await page.clock.runFor(3000);assert.equal(await page.evaluate(()=>window.motionPendingFrames.size),0);
    const status=await page.locator('#result').textContent();
    await page.evaluate(()=>{Object.defineProperty(document,'hidden',{value:true,configurable:true});document.dispatchEvent(new Event('visibilitychange'));delete document.hidden;});
    assert.equal(await page.locator('#result').textContent(),status);assert.deepEqual(errors,[]);checks++;
    return {examples:MOTION_EXAMPLES.length,playback_modes:2,viewports:[320,390,1280],appearances:2,checks,failures:errors};
  }finally{await page.close();}
}
