(function(){
const API='https://script.google.com/macros/s/AKfycbyjTV3BcPjYhXEDFlRhw0P-ZNDR7_k47N3emxak9ccgB2iHjUadognpyWUTBaZe07bu/exec';
const KEY='scAllDataCacheV58',nativeFetch=window.fetch.bind(window);let mem=null,promise=null,stamp=0;
function packet(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(_){return null}}
function read(){if(mem)return mem;const x=packet();if(x&&x.data){mem=x.data;stamp=+x.at||0;return mem}return null}
function age(){if(!stamp){const x=packet();stamp=x&&+x.at||0}return stamp?Date.now()-stamp:1e15}
function store(v){const data=(v&&v.data)||v||{},old=mem||read()||{};if(!data||typeof data!=='object')return old;mem=data;stamp=Date.now();try{localStorage.setItem(KEY,JSON.stringify({at:stamp,data}))}catch(_){}if(JSON.stringify(old)!==JSON.stringify(data))setTimeout(()=>window.dispatchEvent(new CustomEvent('sursand-data-updated',{detail:{source:'network'}})),0);return data}
function env(data){return {success:true,data:data==null?[]:data}}
function resp(data){return new Response(JSON.stringify(env(data)),{status:200,headers:{'Content-Type':'application/json'}})}
const aliases={representatives:['representatives'],businesses:['businesses'],services:['localServices','serviceProviders','services'],localServices:['localServices','serviceProviders','services'],education:['education'],healthcare:['healthcare'],doctors:['doctors'],transport:['transport'],places:['places','importantPlaces'],importantPlaces:['importantPlaces','places'],governmentOffices:['governmentOffices'],events:['events'],announcements:['announcements'],notifications:['notifications'],importantContacts:['importantContacts'],jobs:['jobs'],agriculture:['agriculture'],governmentServices:['governmentServices'],usefulLinks:['usefulLinks'],changeMakers:['changeMakers'],localAds:['localAds']};
function fromCache(action){const c=read();if(!c)return null;for(const k of (aliases[action]||[action]))if(Array.isArray(c[k]))return c[k];return null}
window.SCReadAllDataCache=read;window.SCAllDataCacheAge=age;
window.SCGetAllData=function(force){if(promise)return promise;const c=read();if(!force&&c)return Promise.resolve(c);promise=nativeFetch(API+'?action=all&_='+Date.now(),{cache:'no-store'}).then(r=>r.text()).then(t=>{let j;try{j=JSON.parse(t)}catch(_){throw Error('Data service returned an invalid response')}if(!j||j.success!==true)throw Error((j&&j.error)||'Data unavailable');return store(j)}).finally(()=>promise=null);return promise};
window.SCRefreshAllData=()=>window.SCGetAllData(true);
window.SCWarmDataMedia=function(x){try{const u=[],w=v=>{if(Array.isArray(v))return v.forEach(w);if(!v||typeof v!=='object')return;Object.keys(v).forEach(k=>{const q=v[k];if(typeof q==='string'&&/image|photo|logo|banner/i.test(k)&&/^https?:/i.test(q))u.push(q);else if(q&&typeof q==='object')w(q)})};w(x);[...new Set(u)].slice(0,120).forEach(q=>{const i=new Image();i.src=q})}catch(_){}};
function refreshSoon(){if(window.__scRefreshBusy)return;window.__scRefreshBusy=true;setTimeout(()=>window.SCGetAllData(true).catch(()=>{}).finally(()=>window.__scRefreshBusy=false),0)}
window.fetch=function(input,init){try{const method=String((init&&init.method)||'GET').toUpperCase(),url=typeof input==='string'?input:(input&&input.url)||'';if(method==='GET'&&url.indexOf(API)===0){const m=url.match(/[?&]action=([^&]+)/),action=m?decodeURIComponent(m[1]):'all';if(action==='all'){const c=read();if(c){if(age()>15000)refreshSoon();return Promise.resolve(resp(c))}return window.SCGetAllData(false).then(resp)}const c=fromCache(action);if(c!==null){if(age()>15000)refreshSoon();return Promise.resolve(resp(c))}}}catch(_){}return nativeFetch(input,init)};
if(!window.__scStartupAllData){window.__scStartupAllData=true;const c=read();if(c){window.SCWarmDataMedia(c);refreshSoon()}else window.SCGetAllData(true).then(window.SCWarmDataMedia).catch(()=>{})}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&age()>30000)refreshSoon()});
window.addEventListener('online',function(){
  window.SCGetAllData(true).then(function(d){
    window.dispatchEvent(new CustomEvent('sursand-online-refresh',{detail:d}));
    const path=location.pathname||'';
    if(/\/p\//.test(path)&&!document.querySelector('form:focus-within'))setTimeout(function(){location.reload()},120);
  }).catch(function(){});
});

})();