/** Keep the motion index and still-preview guide aligned with the actual renderers. */
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {MOTION_EXAMPLES,MOTION_DURATION} from '../examples/gallery/motion.mjs';

export function motionCatalog(){return {schema_version:1,count:MOTION_EXAMPLES.length,duration_seconds:MOTION_DURATION,examples:MOTION_EXAMPLES};}
export function motionGuide(){
  const lines=[
    '# 24 motion examples', '',
    'Run the [gallery](README.md) and open `?topic=motion`. Choose an example, then replay, pause/resume, reset, or scrub its timeline with the pointer or keyboard. Change speed for inspection, enable looping deliberately, or retarget the spring while it moves. Each example has a direct link, a source section, a companion interactive topic, and an explicit reduced alternative.', '',
    'The documentation uses still frames by default. Open a linked recording when you want movement. Recorded GIFs play twice, hold their final frame, and then stop; they cannot follow your system preference. The live player respects system Reduce Motion and its local opt-in, including changes during playback, without resetting your selection or timeline. No animation or loop starts automatically.', '',
    '## Guidance and scope', '',
    "Apple’s [Motion → Best practices](https://developer.apple.com/design/human-interface-guidelines/motion#Best-practices) recommends purposeful, optional motion. [Providing feedback](https://developer.apple.com/design/human-interface-guidelines/motion#Providing-feedback) recommends realistic relationships, brevity and precision, generally avoiding extra animation for frequent interactions, and allowing cancellation as much as possible. These sections were retrieved on 15 October 2026 and matched the recorded fingerprints. The [portable motion workflow](../../skills/apple-hig/references/motion-design.md) explains how to apply them.", '',
    'These are original browser illustrations. Durations, easing, physics, dimensions, and colors are educational choices, not Apple specifications. The 2.8-second inspection timeline includes time to see the result; it does not prescribe a production interaction delay. The preview stage is inert artwork; use the surrounding real HTML player controls or open the full companion topic for keyboard interaction, dialog cancellation, and focus recovery. Loading, refresh, and save events are local illustrations.', '',
    '![Actual desktop motion player](../../docs/assets/motion-lab-desktop.png)', '',
  ];
  for(const group of [...new Set(MOTION_EXAMPLES.map(e=>e.group))]){
    lines.push('## '+group,'','| Example and purpose | Still frame → recording | Reduced alternative |','| --- | --- | --- |');
    for(const e of MOTION_EXAMPLES.filter(e=>e.group===group)){
      const gif='../../docs/assets/motion-'+e.id+'.gif';
      lines.push(`| [${e.label}](index.html?topic=motion&motion=${e.id})<br>${e.purpose}<br>Result: ${e.outcome}<br>[Apple section](${e.source}) · [Full topic](index.html?topic=${e.topic}) | [![Still frame: ${e.label}](motion-previews/${e.id}.webp)](${gif})<br>[Play recording](${gif}) | ![Stationary or direct-state alternative: ${e.label}](motion-previews/${e.id}-reduced.webp)<br>${e.reduced} |`);
    }
    lines.push('');
  }
  lines.push('## Continuity, lifetime, and recording','','The spring uses original acceleration `260 × (target − position) − 32 × velocity`, with numerical substeps of at most 1/240 second and bounded delayed frames. Retargeting changes only its target. It preserves position and velocity, and responsive geometry is recalculated when the stage changes size. This is an educational model, not Apple’s native spring implementation.','','Pause/resume retains elapsed time; speed changes affect subsequent time. Reset and navigation cancel scheduled frames. Hidden-page playback pauses and requires an explicit resume. A completed transition holds its useful result. Live status describes meaningful actions and outcomes rather than announcing every frame.','','The record route `?topic=motion&motion=shared-element&record=1&frame=0.7` renders a deterministic frame in seconds. Add `reduced=1` for its direct alternative. The same renderers supply the player, 48 still previews, and 24 GIF recordings; each recording samples 43 timeline positions including the endpoint. The undo still intentionally shows its removed state so the recovery opportunity is visible.','','## Verification','','The controlled-clock browser suite exercises all examples in both modes, normal and reduced endpoints, keyboard scrubbing, pause/resume, speed changes, optional loops, spring interruption, resizing, dynamic system preferences, hidden-page pausing, and cleanup after navigation. It also checks all 24 examples at 320px, 390px, and 1280px in light and dark appearances. See [executed checks](../../docs/TESTING.md). Screenshots and these software checks do not establish native animation fidelity, assistive-technology correctness, device comfort, or a numerical semantic error bound.','');
  return lines.join('\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const outputs=new Map([
    [new URL('../examples/gallery/MOTION.md',import.meta.url),motionGuide()],
    [new URL('../examples/gallery/motion-catalog.json',import.meta.url),JSON.stringify(motionCatalog(),null,2)+'\n'],
  ]);
  for(const [url,content] of outputs){
    if(process.argv.includes('--check')){if(!fs.existsSync(url)||fs.readFileSync(url,'utf8')!==content)throw Error('Generated motion guide is stale: '+url.pathname);}
    else fs.writeFileSync(url,content);
  }
  console.log('Motion guide and catalog match '+MOTION_EXAMPLES.length+' runnable examples.');
}
