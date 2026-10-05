(function(){
function times(){document.querySelectorAll('input').forEach(function(i){let k=((i.name||'')+' '+(i.id||'')+' '+(i.placeholder||'')).toLowerCase();if((i.type==='text'||!i.getAttribute('type'))&&/(^|\s|_|-)(time|timing)(\s|_|-|$)/.test(k)){try{i.type='time'}catch(_){}}})}
function refreshButton(){}
function homeSearch(){const q=document.getElementById('homeSearch');if(!q||document.getElementById('scHomeSuggest'))return;const box=document.createElement('div');box.id='scHomeSuggest';box.style.cssText='display:none;position:absolute;left:8px;right:8px;top:100%;margin-top:6px;background:#fff;color:#1f2937;border:1px solid #dfe7e2;border-radius:14px;box-shadow:0 14px 35px #0002;z-index:1000;max-height:300px;overflow:auto;text-align:left';const form=q.closest('form');if(form){form.style.position='relative';form.appendChild(box)}
 const routes={businesses:'p/businesses.html',localServices:'p/services.html',services:'p/services.html',events:'p/events.html',notifications:'p/notifications.html',representatives:'p/representatives.html',transport:'p/transport.html',places:'p/important-places.html',governmentOffices:'p/government-offices.html',changeMakers:'p/change-makers.html',jobs:'p/jobs.html',healthcare:'p/healthcare.html'};
 const title=o=>o['Business Name']||o['Business Name Hindi']||o['Service Provider Name']||o['Service Person Name']||o['Full Name']||o['Full Name Hindi']||o['Place Name']||o['Place Name Hindi']||o['Event Title']||o['Notification Title']||o['Representative Name']||o['Name']||o['Title']||'';
 function draw(){const z=q.value.trim().toLowerCase();if(!z){box.style.display='none';box.innerHTML='';return}const d=(window.SCReadAllDataCache&&window.SCReadAllDataCache())||{},a=[];Object.keys(d).forEach(k=>Array.isArray(d[k])&&d[k].forEach(o=>{const t=title(o),all=Object.values(o||{}).filter(v=>typeof v!=='object').join(' ').toLowerCase();if(t&&all.includes(z))a.push({k,o,t,score:t.toLowerCase()===z?0:t.toLowerCase().startsWith(z)?1:2})}));a.sort((x,y)=>x.score-y.score||x.t.localeCompare(y.t));box.innerHTML=a.slice(0,8).map(x=>'<a href="'+(routes[x.k]||'p/search.html')+'?focus='+encodeURIComponent(x.t)+'" style="display:block;padding:10px 12px;text-decoration:none;color:inherit;border-bottom:1px solid #edf2ef;font:700 11px Arial">'+String(x.t).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))+'</a>').join('')||'<div style="padding:11px;font:600 10px Arial;color:#64748b">No matching result</div>';box.style.display='block'}
 q.addEventListener('input',draw);q.addEventListener('focus',draw);document.addEventListener('click',e=>{if(!form.contains(e.target))box.style.display='none'});if(window.SCGetAllData)window.SCGetAllData(false).then(draw).catch(()=>{})}
function init(){times();refreshButton();homeSearch()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();window.addEventListener('sursand-data-updated',function(){times();if(window.scApplyPrefs)scApplyPrefs()});new MutationObserver(times).observe(document.documentElement,{childList:true,subtree:true})
})();

;(()=>{
 const raw=new URLSearchParams(location.search).get('focus'); if(!raw)return;
 const n=decodeURIComponent(raw).trim().toLowerCase(); if(!n)return;
 let count=0; const timer=setInterval(()=>{
   count++; const all=[...document.querySelectorAll('article,[class*="card"],tr,li,.provider-card,.business-card')];
   let hits=all.filter(x=>(x.innerText||'').toLowerCase().includes(n));
   if(hits.length){
     hits.sort((a,b)=>(a.innerText||'').length-(b.innerText||'').length); const hit=hits[0];
     clearInterval(timer); hit.scrollIntoView({behavior:'smooth',block:'center'});
     hit.style.outline='3px solid #f28c28'; hit.style.outlineOffset='3px';
   } else if(count>40) clearInterval(timer);
 },150);
})();

;(function(){
function addCss(){if(document.getElementById('scV42HeadCss'))return;const x=document.createElement('style');x.id='scV42HeadCss';x.textContent='@keyframes scSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} .sc-appbar{justify-content:flex-start!important;padding-left:8px!important;padding-right:8px!important}.sc-appbar-brand{margin-left:0!important;margin-right:auto!important;min-width:0!important}.sc-appbar-actions{margin-left:auto!important;display:flex!important;gap:7px!important;align-items:center!important}.scV42A{width:44px!important;height:44px!important;min-width:44px!important;border-radius:14px!important;border:1px solid #f0d7bd!important;background:#fff7ed!important;color:#c86508!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;position:relative!important;text-decoration:none!important}.scV42A svg{width:24px!important;height:24px!important}.scV42R.busy svg{transform-origin:50% 50%;animation:scSpin .68s linear infinite}@media(max-width:390px){.sc-appbar-brand small{display:none!important}.sc-appbar-actions{gap:5px!important}.scV42A{width:42px!important;height:42px!important;min-width:42px!important}}';document.head.appendChild(x)}
function prefix(){return location.pathname.includes('/p/')?'':'p/'}
async function refresh(b){if(!b||b.dataset.busy)return;b.dataset.busy='1';b.classList.add('busy');try{if(window.SCRefreshAllData)await window.SCRefreshAllData();if(window.SursandOffline&&SursandOffline.refresh)SursandOffline.refresh();await new Promise(r=>setTimeout(r,850));location.reload()}catch(e){delete b.dataset.busy;b.classList.remove('busy')}}
window.SCGlobalRefresh=refresh;
function build(){addCss();const bar=document.querySelector('.sc-appbar');if(!bar)return;const brand=bar.querySelector('.sc-appbar-brand');if(brand){brand.style.marginLeft='0';brand.style.marginRight='auto'}let h=bar.querySelector('.sc-appbar-actions');if(!h){h=document.createElement('div');h.className='sc-appbar-actions';bar.appendChild(h)}h.innerHTML='';
const bell=document.createElement('a');bell.className='scV42A';bell.href=prefix()+'notifications.html';bell.setAttribute('aria-label','Notifications');bell.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg><i class="sc-bell-dot"></i>';
const scan=document.createElement('button');scan.type='button';scan.className='scV42A';scan.setAttribute('aria-label','Scan');scan.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/><circle cx="12" cy="12" r="3.2"/><path d="M12 7.2v1.4M12 15.4v1.4M7.2 12h1.4M15.4 12h1.4"/></svg>';scan.onclick=()=>window.SCQR&&SCQR.openScanner();
const r=document.createElement('button');r.type='button';r.id='scHeaderRefresh';r.className='scV42A scV42R';r.setAttribute('aria-label','Refresh');r.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M20 6v5h-5"/><path d="M20 11a8 8 0 1 0 1 4"/></svg>';r.onclick=()=>refresh(r);h.append(bell,scan,r)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();


/* Contact picker removed permanently. Phone/WhatsApp numbers are entered manually. */
