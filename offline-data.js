(function(){
 const SYNC_KEY='scLastDataSync';
 function controller(){return navigator.serviceWorker&&navigator.serviceWorker.controller}
 function requestRefresh(){const c=controller();if(c)c.postMessage({type:'SC_REFRESH_DATA'});}
 function setLastSync(v){try{localStorage.setItem(SYNC_KEY,v||new Date().toISOString())}catch(_){}}
 window.SursandOffline={refresh:requestRefresh,lastSync:function(){try{return localStorage.getItem(SYNC_KEY)||''}catch(_){return''}}};
 if('serviceWorker'in navigator){
  navigator.serviceWorker.addEventListener('message',function(e){const d=e.data||{};if(d.type==='SC_DATA_UPDATED'){setLastSync(d.timestamp);window.dispatchEvent(new CustomEvent('sursand-data-updated',{detail:d}))}});
  navigator.serviceWorker.ready.then(function(){if(navigator.onLine)requestRefresh()}).catch(function(){});
 }
 // No timer and no forced reload. Refresh once at app/page opening only.
 window.addEventListener('online',function(){requestRefresh()});
})();
