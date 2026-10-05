(function(){
const SEEN='scSeenUpdateV32:',BASE='scNotificationBaselineV32',PUSHED='scPhoneNotifiedV32:';let latest=[];
const first=(o,k)=>{for(const x of k)if(o&&o[x]!=null&&String(o[x]).trim())return String(o[x]).trim();return''};
const stamp=o=>{const n=Date.parse(first(o,['Published At','Created At','Date','Event Date','Timestamp','Start Date']));return isNaN(n)?0:n};
const id=u=>u.type+':'+first(u.x,['ID','Id','id','Title','Event Title','Notification Title','Full Name','Name'])+':'+stamp(u.x);
function dots(x){document.querySelectorAll('.sc-bell-dot').forEach(d=>d.style.display=x?'block':'none')}
function mark(){latest.forEach(u=>localStorage.setItem(SEEN+id(u),'1'));const mx=Math.max(0,...latest.map(u=>stamp(u.x)));localStorage.setItem(BASE,String(mx));dots(false)}
function collect(d){const a=[];(Array.isArray(d.notifications)?d.notifications:[]).forEach(x=>a.push({x,type:'notification'}));return a.sort((a,b)=>stamp(b.x)-stamp(a.x))}
function use(d){latest=collect(d);const mx=Math.max(0,...latest.map(u=>stamp(u.x)));let base=Number(localStorage.getItem(BASE)||0);if(!base){localStorage.setItem(BASE,String(mx));latest.forEach(u=>localStorage.setItem(SEEN+id(u),'1'));dots(false);return}const unseen=latest.filter(u=>stamp(u.x)>base&&!localStorage.getItem(SEEN+id(u)));dots(unseen.length>0)}
async function check(){const cached=window.SCReadAllDataCache&&window.SCReadAllDataCache();if(cached)use(cached);try{const d=window.SCGetAllData?await window.SCGetAllData(false):null;if(d)use(d)}catch(e){if(!cached)dots(false)}}
function hook(){document.querySelectorAll('a[href$="notifications.html"]').forEach(a=>a.addEventListener('click',mark))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{hook();check()});else{hook();check()}window.addEventListener('sursand-data-updated',check);window.SCNotificationCheck=check;
})();

;(()=>{
 function isCMWelcomeText(t){return /change\s*maker|changemaker/i.test(String(t||''))&&/welcome|स्वागत/i.test(String(t||''))}
 function clean(){
   document.querySelectorAll('[class*="notification"],article,.card,li').forEach(el=>{
     if(isCMWelcomeText(el.innerText||'')) el.remove();
   });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',clean);else clean();
 new MutationObserver(clean).observe(document.documentElement,{childList:true,subtree:true});
})();
