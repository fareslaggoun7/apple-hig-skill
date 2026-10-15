/** Generate the public index from the implemented, ordered workshop registry. */
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {WORKSHOPS,workshopCatalog} from '../examples/gallery/workshops.mjs';
export function workshopGuide(){
  const lines=['# Platform and design workshops','','Work through these topics in the requested order. Each workshop contains concrete, source-linked browser tasks, an implementation guide in the portable skill, and pictures captured from its actual renderers. Run the [gallery](README.md) before opening the HTML routes.','','Choose a study; use its controls, keyboard, text-size and layout studies, appearance switch, and reset. Individual studies preserve their local state when revisited. Changing a gallery topic or refreshing starts a new workshop. These original HTML adaptations do not establish native device behavior, SDK availability, assistive-technology conformance, or a numerical semantic error bound.',''];
  for(const w of WORKSHOPS){
    lines.push(`## ${w.order}. ${w.label}`,'',w.scope,'',`[Open workshop](index.html?topic=${w.id}) · [Implementation guide](../../skills/apple-hig/${w.reference})`,'','| Study | Task and source | Actual rendered picture |','| --- | --- | --- |');
    for(const s of w.scenarios)lines.push(`| [${s.title}](index.html?topic=${w.id}&example=${s.id}) | ${s.task}<br>[Apple section](${s.source}) | ![${w.label}: ${s.title}](workshop-previews/${w.id}--${s.id}.webp) |`);
    lines.push('');
  }
  return lines.join('\n');
}
export function portableWorkshopGuide(){return '# Platform and design workflows\n\nRead the workflow for the task’s target platform or design topic, then load its applicable foundation, component, input, and technology cards. These guides distinguish current Apple recommendations, original product choices, browser studies, and unverified native behavior.\n\n'+WORKSHOPS.map(w=>`${w.order}. [${w.label}](${w.reference.replace('references/workshops/','')}) — ${w.scenarios.length} source-linked studies.`).join('\n')+'\n\n[Runnable workshops and actual pictures](https://github.com/fareslaggoun7/apple-hig-skill/blob/main/examples/gallery/WORKSHOPS.md). Each platform needs its own deployment, input, accessibility, and device/runtime review. Do not transfer native measurements or SDK guarantees into browser examples.\n';}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  for(const [file,content] of [['WORKSHOPS.md',workshopGuide()],['workshop-catalog.json',JSON.stringify(workshopCatalog(),null,2)+'\n']]){
    const url=new URL('../examples/gallery/'+file,import.meta.url);
    if(process.argv.includes('--check')){if(!fs.existsSync(url)||fs.readFileSync(url,'utf8')!==content)throw Error('Stale workshop file: '+file);}
    else fs.writeFileSync(url,content);
  }
  const portable=new URL('../skills/apple-hig/references/workshops/README.md',import.meta.url);
  if(process.argv.includes('--check')){if(!fs.existsSync(portable)||fs.readFileSync(portable,'utf8')!==portableWorkshopGuide())throw Error('Stale portable workshop index');}
  else fs.writeFileSync(portable,portableWorkshopGuide());
  console.log('Workshop guide matches '+WORKSHOPS.length+' implemented topics and '+WORKSHOPS.reduce((n,w)=>n+w.scenarios.length,0)+' studies.');
}
