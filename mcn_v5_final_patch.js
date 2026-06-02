/* M.C.N. v5 — search i18n + visible passport stamp animation */
(function(){
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const isEn=()=>localStorage.getItem('mcn-lang')==='en' || document.documentElement.classList.contains('is-english');
  const sites={
    badaling:{name:'Badaling',seal:'八达岭',fr:'Section restaurée, très accessible depuis Pékin : parfaite pour une première visite.',en:'Restored section, very accessible from Beijing: perfect for a first visit.'},
    mutianyu:{name:'Mutianyu',seal:'慕田峪',fr:'Tronçon panoramique plus calme, excellent pour familles et photographes.',en:'Calmer panoramic section, excellent for families and photographers.'},
    simatai:{name:'Simatai',seal:'司马台',fr:'Expérience nocturne rare, atmosphère spectaculaire et relief marqué.',en:'Rare night experience, spectacular atmosphere and dramatic relief.'},
    jiankou:{name:'Jiankou',seal:'箭扣',fr:'Section sauvage et exigeante, à réserver aux marcheurs expérimentés.',en:'Wild and demanding section, reserved for experienced hikers.'},
    jinshanling:{name:'Jinshanling',seal:'金山岭',fr:'Section semi-restaurée très photogénique, idéale pour les crêtes et la lumière dorée.',en:'Highly photogenic semi-restored section, ideal for ridgelines and golden light.'},
    huanghuacheng:{name:'Huanghuacheng',seal:'黄花城',fr:'Muraille au bord de l’eau, visite calme et très visuelle.',en:'Lakeside Great Wall section, calm and highly scenic.'},
    unesco:{name:'UNESCO',seal:'世遗',fr:'Inscription au patrimoine mondial, axe fort de crédibilité institutionnelle.',en:'World Heritage listing, a strong axis of institutional credibility.',url:'preservation.html'},
    ming:{name:'Architecture Ming',seal:'明',fr:'Briques, tours de guet, mortier au riz gluant : le détail technique qui marque un jury.',en:'Bricks, watchtowers and sticky-rice mortar: the technical detail that impresses a jury.',url:'architecture.html'},
    histoire:{name:'Frise historique',seal:'史',fr:'Une lecture chronologique pour comprendre 2700 ans de stratégie, commerce et frontières.',en:'A chronological reading to understand 2,700 years of strategy, trade and borders.',url:'histoire.html'},
    conservation:{name:'Conservation digitale',seal:'护',fr:'Scans LiDAR, drones et jumeau numérique : angle innovant et professionnel.',en:'LiDAR scans, drones and a digital twin: an innovative professional angle.',url:'preservation.html'}
  };
  const searchItems=[
    ['badaling','Badaling','visiter.html'],['mutianyu','Mutianyu','visiter.html'],['simatai','Simatai','visiter.html'],['jiankou','Jiankou','visiter.html'],['jinshanling','Jinshanling','visiter.html'],['huanghuacheng','Huanghuacheng','visiter.html'],['unesco 1987 patrimoine world heritage','UNESCO','preservation.html'],['ming riz gluant architecture sticky rice','Architecture Ming','architecture.html'],['histoire dynastie qin han ming timeline','Frise historique','histoire.html'],['lidar drone scan 3d conservation','Conservation digitale','preservation.html']
  ];
  function t(){return isEn()?{
    panel:'M.C.N. / Curatorial search', title:'Explore the Wall instantly', ph:'Try: Badaling, sticky rice, UNESCO, Ming...', none:'No result', hint:'Try: Ming, UNESCO, 3D, Badaling.', earned:'Earned seals', empty:'No seal yet. Generate a route notebook, then add a seal.', added:'Seal stamped in your heritage passport.', passportTitle:'Heritage passport', viewPassport:'View my passport', newSeal:'New seal acquired'
  }:{
    panel:'M.C.N. / Recherche curatoriale', title:'Explorer la Muraille en un instant', ph:'Essayez : Badaling, riz gluant, UNESCO, Ming...', none:'Aucun résultat', hint:'Essayez : Ming, UNESCO, 3D, Badaling.', earned:'Sceaux obtenus', empty:'Aucun sceau pour l’instant. Générez un carnet puis ajoutez un sceau.', added:'Sceau tamponné dans votre passeport patrimoine.', passportTitle:'Passeport patrimoine', viewPassport:'Voir mon passeport', newSeal:'Nouveau sceau acquis'
  };}
  function keyFromName(v){
    const s=String(v||'').toLowerCase();
    return ['badaling','mutianyu','jinshanling','simatai','jiankou','huanghuacheng'].find(k=>s.includes(k)) || $('.journey-pin.active')?.dataset.section || JSON.parse(localStorage.getItem('mcn-last-route')||'{}').key || 'badaling';
  }
  function renderSearch(q=''){
    const box=$('.command-results'); if(!box) return;
    const lang=isEn()?'en':'fr', tx=t();
    const head=$('.command-card .eyebrow'); if(head) head.textContent=tx.panel;
    const h=$('.command-card h2'); if(h) h.textContent=tx.title;
    const input=$('#smart-search'); if(input) input.placeholder=tx.ph;
    const query=String(q||input?.value||'').toLowerCase().trim();
    const results=searchItems.filter(([k,title])=>!query || (k+' '+title+' '+(sites[k]?.fr||'')+' '+(sites[k]?.en||'')).toLowerCase().includes(query)).slice(0,6);
    box.innerHTML=results.map(([k,title,url])=>{
      const item=sites[k]||{};
      return `<a class="result-row" href="${item.url||url}"><strong>${title}</strong><span>${item[lang]||item.fr||''}</span></a>`;
    }).join('') || `<div class="result-row"><strong>${tx.none}</strong><span>${tx.hint}</span></div>`;
  }
  function getEarned(){try{return JSON.parse(localStorage.getItem('mcn-passport-stamps')||'[]')}catch(_){return []}}
  function setEarned(arr){localStorage.setItem('mcn-passport-stamps',JSON.stringify(Array.from(new Set(arr))));}
  function renderPassportV5(){ if(window.mcnRenderPassport) window.mcnRenderPassport(); return;
    const earned=getEarned().map(keyFromName);
    setEarned(earned);
    const tx=t();
    const recent=localStorage.getItem('mcn-last-earned-stamp')||'';
    const rows=$$('.stamp-row,.passport-stamps-live');
    rows.forEach(row=>{
      const inHome=!!row.closest('.passport-panel');
      if(!earned.length){ row.innerHTML=`<p class="passport-empty">${tx.empty}</p>`; return; }
      row.innerHTML=(inHome?`<div class="passport-earned-title">${tx.earned}</div>`:'')+
        earned.map(k=>`<button type="button" class="stamp is-earned mcn-stamp-earned ${recent===k?'is-new-stamp':''}" data-stamp="${k}" title="${recent===k?tx.newSeal:''}"><span class="stamp-seal">${sites[k]?.seal||'長城'}</span><span>${sites[k]?.name||k}</span></button>`).join('');
    });
    const title=$('#passport-title'); if(title) title.textContent=tx.passportTitle;
  }
  function stampAnimation(key){
    const data=sites[key]||sites.badaling;
    const el=document.createElement('div');
    el.className='mcn-stamp-impact';
    el.innerHTML=`<div class="mcn-stamp-mark"><span>${data.seal}</span><small>${data.name}</small></div>`;
    document.body.appendChild(el);
    setTimeout(()=>el.classList.add('is-visible'),20);
    setTimeout(()=>el.classList.add('is-hit'),430);
    setTimeout(()=>el.remove(),1700);
  }

  function passportLink(){
    const onHome=/index\.html$|\/$/.test(location.pathname) || location.pathname.split('/').pop()==='';
    return onHome ? '#passport-title' : 'index.html#passport-title';
  }
  function showPassportCta(key){
    const data=sites[key]||sites.badaling, tx=t();
    let pop=$('.mcn-passport-pop');
    if(!pop){pop=document.createElement('div');pop.className='mcn-passport-pop';document.body.appendChild(pop);}
    pop.innerHTML=`<div class="mcn-passport-pop-seal">${data.seal}</div><div><strong>${tx.newSeal}</strong><span>${data.name}</span></div><a href="${passportLink()}">${tx.viewPassport}</a><button type="button" aria-label="Close">×</button>`;
    pop.classList.add('is-visible');
    pop.querySelector('button')?.addEventListener('click',()=>pop.classList.remove('is-visible'),{once:true});
    clearTimeout(pop._hide);
    pop._hide=setTimeout(()=>pop.classList.remove('is-visible'),7000);
  }

  function addCurrentSeal(){
    const r=JSON.parse(localStorage.getItem('mcn-last-route')||'{}');
    const key=keyFromName(r.key||r.name||r.section||$('.journey-pin.active')?.dataset.section);
    const earned=getEarned().map(keyFromName);
    if(!earned.includes(key)) earned.push(key);
    localStorage.setItem('mcn-last-earned-stamp',key);
    setEarned(earned);
    renderPassportV5();
    stampAnimation(key);
    showPassportCta(key);
    const msg=t().added;
    let toast=$('.smart-toast'); if(!toast){toast=document.createElement('div');toast.className='smart-toast';document.body.appendChild(toast);}
    toast.textContent=msg; toast.classList.add('is-visible'); clearTimeout(toast._v5); toast._v5=setTimeout(()=>toast.classList.remove('is-visible'),2600);
  }
  function installStyles(){
    if($('#mcn-v5-style')) return;
    const st=document.createElement('style'); st.id='mcn-v5-style'; st.textContent=`
      .passport-earned-title{width:100%;font-family:var(--font-body,inherit);letter-spacing:.24em;text-transform:uppercase;color:var(--mcn-gold,#e39a14);font-weight:800;font-size:.78rem;margin:.35rem 0 .75rem}
      .stamp.mcn-stamp-earned{display:inline-flex;align-items:center;gap:.65rem;min-height:64px;padding:.55rem .9rem;border-color:rgba(227,154,20,.75);background:rgba(227,154,20,.12);box-shadow:0 0 22px rgba(227,154,20,.14) inset,0 0 18px rgba(227,154,20,.08)}
      .stamp.mcn-stamp-earned .stamp-seal{display:grid;place-items:center;width:42px;height:42px;border:2px solid #d23a3a;border-radius:12px;color:#ffe3b0;background:rgba(125,20,20,.28);font-family:serif;font-size:1.05rem;line-height:1;transform:rotate(-5deg)}
      .stamp.mcn-stamp-earned.is-new-stamp{border-color:#e33737!important;background:linear-gradient(135deg,rgba(158,25,25,.34),rgba(227,154,20,.14))!important;box-shadow:0 0 0 2px rgba(227,45,45,.35),0 0 34px rgba(227,45,45,.25),0 0 18px rgba(227,154,20,.1) inset;animation:mcnNewSealPulse 1.25s ease-in-out 3}
      .stamp.mcn-stamp-earned.is-new-stamp .stamp-seal{border-color:#ff3e3e;color:#fff1df;background:rgba(145,12,12,.65)}
      @keyframes mcnNewSealPulse{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-3px) rotate(-1deg)}}
      .mcn-passport-pop{position:fixed;right:28px;bottom:28px;z-index:99998;display:grid;grid-template-columns:auto 1fr auto auto;align-items:center;gap:14px;max-width:min(560px,calc(100vw - 34px));padding:14px 16px;border:1px solid rgba(227,154,20,.55);border-radius:22px;background:rgba(14,13,12,.94);box-shadow:0 20px 70px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.06) inset;opacity:0;transform:translateY(18px) scale(.98);pointer-events:none;transition:opacity .25s ease,transform .25s ease}
      .mcn-passport-pop.is-visible{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
      .mcn-passport-pop-seal{display:grid;place-items:center;width:52px;height:52px;border:2px solid #e33737;border-radius:14px;color:#ffe2c2;background:rgba(120,12,12,.62);font-family:serif;font-weight:900;transform:rotate(-6deg)}
      .mcn-passport-pop strong{display:block;color:#fff7ec;font-family:var(--font-title,serif);font-size:1rem;letter-spacing:.04em}.mcn-passport-pop span{display:block;color:rgba(255,255,255,.68);font-size:.86rem;margin-top:2px}.mcn-passport-pop a{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:0 14px;border-radius:14px;background:linear-gradient(135deg,#efaa18,#b86a0d);color:#120d07!important;text-decoration:none!important;font-weight:900;letter-spacing:.08em;text-transform:uppercase;font-size:.74rem;white-space:nowrap}.mcn-passport-pop button{width:34px;height:34px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#fff;font-size:1.1rem;cursor:pointer}
      @media(max-width:720px){.mcn-passport-pop{left:14px;right:14px;bottom:14px;grid-template-columns:auto 1fr auto}.mcn-passport-pop a{grid-column:1/-1}.mcn-passport-pop button{position:absolute;right:8px;top:8px}}
      .mcn-stamp-impact{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;pointer-events:none;background:rgba(0,0,0,0);opacity:0;transition:opacity .25s ease, background .25s ease}
      .mcn-stamp-impact.is-visible{opacity:1;background:rgba(0,0,0,.18)}
      .mcn-stamp-mark{width:190px;height:190px;border:8px solid #c62828;border-radius:28px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#ffd9aa;background:rgba(80,12,12,.78);box-shadow:0 18px 60px rgba(0,0,0,.45);transform:translateY(-90px) scale(1.65) rotate(-14deg);filter:blur(.2px);opacity:.92}
      .mcn-stamp-mark span{font-family:serif;font-size:3.3rem;font-weight:900;line-height:1}.mcn-stamp-mark small{margin-top:.5rem;letter-spacing:.16em;text-transform:uppercase;font-weight:900;color:#fff3df}
      .mcn-stamp-impact.is-hit .mcn-stamp-mark{animation:mcnStampHit 1.05s cubic-bezier(.17,.84,.44,1) forwards}
      @keyframes mcnStampHit{0%{transform:translateY(-90px) scale(1.65) rotate(-14deg);opacity:.96}32%{transform:translateY(0) scale(.9) rotate(-7deg);opacity:1}46%{transform:translateY(0) scale(1.05) rotate(-7deg);opacity:1}100%{transform:translateY(20px) scale(1) rotate(-7deg);opacity:0}}
    `; document.head.appendChild(st);
  }
  function boot(){
    installStyles(); setTimeout(()=>renderSearch(),80);
    document.addEventListener('click',e=>{
      if(e.target.closest('[data-command="search"]')) setTimeout(()=>renderSearch(),90);
      if(e.target.closest('.lang-btn')) setTimeout(()=>{renderSearch();},120);
    },true);
    document.addEventListener('input',e=>{ if(e.target && e.target.id==='smart-search') setTimeout(()=>renderSearch(e.target.value),0); },true);
    document.addEventListener('mcn:navigated',()=>{ try{ renderSearch(); }catch(_){ } });
    window.mcnRenderSearch=renderSearch;
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
