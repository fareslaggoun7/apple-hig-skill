/** Shared HTML helpers for original platform studies. No native SDK calls. */
export const e=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const button=(label,action,style='',attributes='')=>`<button data-w-action="${action}" data-focus-key="${action}" class="${style}" ${attributes}>${e(label)}</button>`;
export const field=(label,key,value,attributes='')=>`<label class="wk-field">${e(label)}<input data-w-field="${key}" data-focus-key="${key}" value="${e(value)}" ${attributes}></label>`;
export const area=(label,key,value,attributes='')=>`<label class="wk-field">${e(label)}<textarea data-w-field="${key}" data-focus-key="${key}" ${attributes}>${e(value)}</textarea></label>`;
export const art=(label='An original landscape')=>`<div class="wk-art" role="img" aria-label="${e(label)}"><span></span></div>`;
export const chip=text=>`<span class="wk-chip">${e(text)}</span>`;
export const source=(topic,section='Best-practices')=>'https://developer.apple.com/design/human-interface-guidelines/'+topic+(section==='Overview'?'':'#'+section);
export const section=(heading,body)=>`<section class="wk-panel"><h4>${e(heading)}</h4>${body}</section>`;
export function editor(ctx,{title='Edit note',value,onSave}){
  if(ctx.root.querySelector('dialog[open]'))return;
  const opener=document.activeElement,openerKey=opener?.dataset.focusKey,dialog=document.createElement('dialog');
  dialog.className='wk-editor';dialog.setAttribute('aria-labelledby','wk-editor-title');
  dialog.innerHTML=`<form method="dialog"><span class="wk-kicker">FIELDNOTES / DRAFT</span><h2 id="wk-editor-title">${e(title)}</h2><label class="wk-field">Note title<input name="note-title" value="${e(value)}" maxlength="100" autofocus></label><p class="wk-error" data-editor-error></p><div class="row"><button value="cancel" formnovalidate>Cancel</button><button class="primary" value="save">Save note</button></div></form>`;
  dialog.addEventListener('submit',ev=>{
    if(ev.submitter?.value==='save'&&!dialog.querySelector('input').value.trim()){
      ev.preventDefault();dialog.querySelector('[data-editor-error]').textContent='Enter a title. Your original note is preserved.';
      dialog.querySelector('input').setAttribute('aria-invalid','true');dialog.querySelector('input').focus();
    }
  },{signal:ctx.signal});
  dialog.addEventListener('close',()=>{
    if(dialog.returnValue==='save'){onSave(dialog.querySelector('input').value.trim());ctx.render();ctx.status('Note saved. Returned to the original task.');}
    else ctx.status('Cancelled. Original note preserved.');
    dialog.remove();if(opener?.isConnected)opener.focus();else [...ctx.root.querySelectorAll('[data-focus-key]')].find(n=>n.dataset.focusKey===openerKey)?.focus();
  },{once:true,signal:ctx.signal});
  ctx.root.append(dialog);ctx.own(()=>dialog.remove());dialog.showModal();
}
