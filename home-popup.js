(function(){
const SEEN='scPopupSeenV32:',ADI='scAdRotationV32';
const val=(o,k)=>{for(const x of k)if(o&&o[x]!=null&&String(o[x]).trim())return String(o[x]).trim();return''},esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),img=o=>window.scRecordImage?window.scRecordImage(o):val(o,['Image URL','Image','Event Image','Ad Image','Photo URL','Photo']);
function stamp(o){const n=Date.parse(val(o,['Joining Date','Join Date','Joined At','Published At','Created At','Start Date','Event Date','Date','Timestamp']));return isNaN(n)?0:n}
function active(o){let x=val(o,['Start Date']);if(x){let d=new Date(x);if(!isNaN(d)){d.setHours(0,0,0,0);if(d>new Date())return false}}x=val(o,['End Date']);if(x){let d=new Date(x);if(!isNaN(d)){d.setHours(23,59,59,999);if(d<new Date())return false}}return true}
function good(o){return !!(o&&active(o)&&(val(o,['Notification Title','Event Title','Title','Ad Title','Full Name','Name'])||val(o,['Description','Details','Message','Content','Summary','Ad Description'])||img(o)))}
function key(o,t){return SEEN+t+':'+val(o,['ID','Id','id','Notification Title','Event Title','Title','Full Name','Name'])+':'+stamp(o)}
function dest(o,t){return val(o,['Related Page','Target URL','Related URL','More Info Link','Link URL','Link','URL','Registration Link'])||(t==='welcome'?'p/change-makers.html':t==='news'?'p/news.html':(t==='event'||t==='announcement')?'p/events.html':'p/notifications.html')}
function close(){document.getElementById('scV16Popup')?.remove()}
function show(o,t,auto){
 if(!good(o))return false;close();
 const hi=(localStorage.getItem('scLanguage')||'en')==='hi',
 title=(hi&&val(o,['Notification Title Hindi','Event Title Hindi','Title Hindi','Full Name Hindi']))||val(o,['Notification Title','Event Title','Title','Ad Title','Full Name','Name'])||(t==='welcome'?'Welcome to Change Makers':'Sursand Connect'),
 desc=(hi&&val(o,['Description Hindi','Ad Description Hindi']))||val(o,['Description','Details','Message','Content','Summary','Ad Description']),
 im=img(o),url=dest(o,t),sd=val(o,['Start Date','Event Date','Date']),ed=val(o,['End Date']),st=val(o,['Start Time','Event Time','Time']),et=val(o,['End Time']),meta=[],cat=val(o,['Event Category','Category','Type']);if(cat&&t!=='ad')meta.push('🏷️ <b>'+esc(cat)+'</b>');
 if(t!=='ad'&&sd)meta.push('📅 <b>Start:</b> '+esc(sd)+(st?' • '+esc(st):''));
 if(t!=='ad'&&ed)meta.push('🏁 <b>End:</b> '+esc(ed)+(et?' • '+esc(et):''));
 const w=document.createElement('div');w.id='scV16Popup';
 if((t==='ad'||t==='event'||t==='announcement')&&im){
   const isEA=(t==='event'||t==='announcement'),infoLabel=isEA?(hi?'अधिक जानकारी':'More Info'):(hi?'जानकारी देखें':'Get Info'),moreLabel=hi?'अधिक जानकारी':'More Info',adLabel=t==='event'?(hi?'कार्यक्रम':'Event'):t==='announcement'?(hi?'घोषणा':'Announcement'):(hi?'विज्ञापन':'Advertisement');
   w.innerHTML='<div class="pc adpc"><button class="x">×</button><img class="adfull" src="'+esc(im)+'" alt=""><button class="adinfo" type="button"><span>ⓘ</span>'+infoLabel+'</button><div class="addetails"><div class="adgrab"></div><span class="tag">'+adLabel+'</span><h2>'+esc(title)+'</h2>'+(desc?'<div class="pd">'+esc(desc).replace(/\n/g,'<br>')+'</div>':'')+(url?'<a class="pv" href="'+esc(url)+'">'+moreLabel+'</a>':'')+'</div></div>';
   if(isEA){const b=w.querySelector('.adinfo');if(b)b.onclick=function(){location.href='p/events.html'}}
 }else{
   w.innerHTML='<div class="pc '+((t==='event'||t==='announcement')?'eventpc':'')+'"><button class="x">×</button>'+(im?'<img class="pi" src="'+esc(im)+'" alt="">':'')+'<div class="pb">'+(t==='ad'?'<span class="tag">Advertisement</span>':'')+'<h2>'+esc(title)+'</h2>'+(meta.length?'<div class="pm">'+meta.join('<br>')+'</div>':'')+(desc?'<div class="pd">'+esc(desc).replace(/\n/g,'<br>')+'</div>':'')+(url?'<a class="pv" href="'+esc(url)+'">View Full Details</a>':'')+'</div></div>';
 }
 document.body.appendChild(w);w.style.opacity='0';w.style.transition='opacity .22s ease';requestAnimationFrame(()=>w.style.opacity='1');
 w.querySelector('.x').onclick=close;
 const ib=w.querySelector('.adinfo'),details=w.querySelector('.addetails');
 if(ib&&details&&t==='ad')ib.onclick=()=>{details.classList.add('open');ib.classList.add('opened')};
 if(auto)setTimeout(()=>{const p=document.getElementById('scV16Popup');if(p&&!p.querySelector('.addetails.open'))close()},5000);
 return true
}
const css=document.createElement('style');css.textContent='#scV16Popup{position:fixed;inset:0;z-index:2200000;background:rgba(15,23,42,.66);display:flex;align-items:center;justify-content:center;padding:14px;animation:scFade .28s ease both}#scV16Popup .pc{animation:scPop .34s cubic-bezier(.2,.8,.2,1) both}@keyframes scFade{from{opacity:0}to{opacity:1}}@keyframes scPop{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:none}}.pc{width:min(92vw,520px);max-height:82vh;overflow:auto;background:#fff;border-radius:23px;box-shadow:0 28px 80px rgba(0,0,0,.34);position:relative}.x{position:absolute;right:9px;top:9px;z-index:8;width:36px;height:36px;border:0;border-radius:50%;background:rgba(15,23,42,.82);color:#fff;font-size:21px;box-shadow:0 5px 15px #0004}.pi{width:100%;max-height:46vh;aspect-ratio:4/3;object-fit:cover;display:block}.pc.eventpc{overflow:hidden}.eventpc .pb{max-height:38vh;overflow:auto}.pb{padding:16px}.pb h2{font-size:19px;margin:3px 0 9px}.tag{display:inline-block;background:#fff0dd;color:#b45309;border-radius:999px;padding:6px 10px;font-size:9px;font-weight:900;margin-bottom:7px}.pm{padding:9px;background:#f8fafc;border-radius:11px;font-size:9px;line-height:1.6;margin-bottom:9px}.pd{font-size:11px;line-height:1.65;color:#475569}.pv{display:inline-flex;margin-top:12px;padding:11px 15px;border-radius:12px;background:linear-gradient(135deg,#148b54,#086f48);color:#fff;text-decoration:none;font-size:10px;font-weight:900;box-shadow:0 7px 16px #08704435}.adpc{width:min(92vw,520px);height:auto;aspect-ratio:1/1;max-height:92vw;overflow:hidden;background:#0f172a;border-radius:26px}.adfull{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}.adpc:after{content:"";position:absolute;left:0;right:0;bottom:0;height:32%;pointer-events:none;background:linear-gradient(transparent,rgba(0,0,0,.34))}.adinfo{position:absolute;z-index:6;left:50%;bottom:20px;transform:translateX(-50%);min-width:154px;border:1px solid rgba(255,255,255,.65);border-radius:18px;padding:13px 22px;background:linear-gradient(145deg,#ffb82e,#f47c12);color:#fff;font-size:14px;font-weight:950;box-shadow:0 8px 0 #b9580c,0 16px 28px #0006;text-shadow:0 1px 1px #8a3f0a;transition:.2s}.adinfo span{margin-right:8px}.adinfo:active{transform:translate(-50%,5px);box-shadow:0 3px 0 #b9580c,0 9px 20px #0005}.adinfo.opened{opacity:0;pointer-events:none;transform:translate(-50%,18px)}.addetails{position:absolute;z-index:7;left:0;right:0;bottom:0;max-height:64%;overflow:auto;background:rgba(255,255,255,.97);backdrop-filter:blur(12px);padding:11px 20px 22px;border-radius:25px 25px 0 0;box-shadow:0 -12px 38px #0004;transform:translateY(105%);transition:transform .32s cubic-bezier(.2,.8,.2,1)}.addetails.open{transform:translateY(0)}.adgrab{width:46px;height:5px;border-radius:99px;background:#cbd5e1;margin:0 auto 13px}.addetails h2{font-size:20px;line-height:1.25;margin:3px 0 10px;color:#172033}@media(max-width:420px){.adpc{width:92vw;height:auto;aspect-ratio:1/1}.adinfo{bottom:17px}.addetails{max-height:68%}}';document.head.appendChild(css);
function choose(d,allowAd){
 if(!d)return false;const a=[];
 (d.notifications||[]).forEach(o=>{if(!good(o))return;const typ=[val(o,['Category','Notification Type','Type']),val(o,['Title','Notification Title']),val(o,['Message','Description','Content'])].join(' ');if(/change\s*maker|changemaker|welcome/i.test(typ)){const raw=val(o,['Joining Date','Join Date','Joined At','Published At','Created At','Date','Timestamp']);const jd=new Date(raw),now=new Date();if(isNaN(jd)||jd.getFullYear()!==now.getFullYear()||jd.getMonth()!==now.getMonth()||jd.getDate()!==now.getDate())return;a.push({o,t:'welcome',auto:false,z:stamp(o)});return}a.push({o,t:'notification',auto:false,z:stamp(o)})});
 (d.events||[]).forEach(o=>good(o)&&a.push({o,t:'event',auto:false,z:stamp(o)}));
 (d.announcements||[]).forEach(o=>good(o)&&a.push({o,t:'announcement',auto:false,z:stamp(o)}));
 a.sort((x,y)=>y.z-x.z);const q=a.find(x=>!localStorage.getItem(key(x.o,x.t)));if(q){localStorage.setItem(key(q.o,q.t),'1');return show(q.o,q.t,q.auto)}
 if(!allowAd)return false;const ads=(d.localAds||[]).filter(good);if(ads.length){const i=+(localStorage.getItem(ADI)||0);const ok=show(ads[i%ads.length],'ad',true);localStorage.setItem(ADI,String((i+1)%ads.length));return ok}return false
}
async function run(){
 const cached=window.SCReadAllDataCache&&window.SCReadAllDataCache();
 if(cached&&choose(cached,true)){ setTimeout(()=>{try{window.SCGetAllData&&window.SCGetAllData(true)}catch(_){ }},0); return; }
 try{const d=window.SCGetAllData?await window.SCGetAllData(true):null;if(d&&choose(d,false))return;if(d)choose(d,true);else if(cached)choose(cached,true)}
 catch(e){if(cached)choose(cached,true)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();