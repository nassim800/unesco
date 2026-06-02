
/* ============================================================
   M.C.N. × UNESCO — v11 final stability patch
   - color-blind mode applied to dock/passport badges
   - responsive safety for dock, passport, carnet modal
   - EN route notebook preview cleanup
   - final missing translations
   ============================================================ */
(function(){
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from((r||document).querySelectorAll(s));
  const isEn=()=>document.documentElement.classList.contains('is-english') || localStorage.getItem('mcn-lang')==='en';

  const dict = new Map([
    ['Don sécurisé — les fonds soutiennent directement le développement du projet.','Secure donation — funds directly support the development of the project.'],
    ['Don sécurisé via PayPal','Secure donation via PayPal'],
    ['Première grande traversée','First grand crossing'],
    ['Badaling — Première grande traversée','Badaling — First grand crossing'],
    ['Départ depuis Pékin, marge de sécurité incluse.','Departure from Beijing, safety margin included.'],
    ['Arrivée au centre d’accueil et récupération des billets.','Arrival at the visitor centre and ticket collection.'],
    ["Arrivée au centre d'accueil et récupération des billets.",'Arrival at the visitor centre and ticket collection.'],
    ['Montée vers les tours nord avec pauses photo.','Climb toward the northern towers with photo stops.'],
    ['Déjeuner local et découverte des spécialités.','Local lunch and discovery of regional specialities.'],
    ['Musée / lecture patrimoniale sur la défense Ming.','Museum / heritage reading on Ming defence.'],
    ['Retour vers Pékin ou installation hôtel.','Return to Beijing or hotel check-in.'],
    ['Zhajiangmian, jiaozi, thé au jasmin et snacks de Yanqing.','Zhajiangmian, jiaozi, jasmine tea and Yanqing snacks.'],
    ['Retour à Pékin conseillé ou hôtel confort à Yanqing.','Return to Beijing recommended, or a comfort hotel in Yanqing.'],
    ['Arrivez avant 8h30 : lumière douce et files plus courtes.','Arrive before 8:30 a.m.: soft light and shorter queues.'],
    ['Carnet généré','Generated notebook'],
    ['Télécharger le PDF','Download PDF'],
    ['Ajouter le sceau','Add seal'],
    ['Ouvrir Google Maps','Open Google Maps'],
    ['À goûter','To taste'],
    ['Où dormir','Where to stay'],
    ['Conseil','Field tip'],
    ['Date libre','Flexible date'],
    ['date libre','flexible date']
  ]);

  function translateText(t){
    if(!t) return t;
    let out=t;
    dict.forEach((en,fr)=>{ out = out.split(fr).join(en); });
    return out;
  }

  function applyFinalTranslations(){
    if(!isEn()) return;
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(n){
      if(!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const p=n.parentElement;
      if(!p || ['SCRIPT','STYLE','TEXTAREA','INPUT'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }});
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{ const v=translateText(n.nodeValue); if(v!==n.nodeValue) n.nodeValue=v; });
  }

  function fixNotebookPreview(){
    if(!isEn()) return;
    $$('.journey-carnet-modal, .journey-carnet-card, .carnet-paper').forEach(root=>{
      const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){return n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}});
      const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(n=>{ n.nodeValue=translateText(n.nodeValue); });
    });
    try{
      const r=JSON.parse(localStorage.getItem('mcn-last-route')||'{}');
      if(r && r.title){
        r.title=translateText(r.title);
        r.timeline=(r.timeline||[]).map(translateText);
        r.food=translateText(r.food||'');
        r.hotelText=translateText(r.hotelText||'');
        r.tip=translateText(r.tip||'');
        localStorage.setItem('mcn-last-route',JSON.stringify(r));
      }
    }catch(e){}
  }

  function installStyles(){
    if($('#mcn-v11-final-css')) return;
    const st=document.createElement('style'); st.id='mcn-v11-final-css';
    st.textContent=`
      html.mcn-colorblind .premium-dock .dock-btn,
      html.mcn-colorblind .lang-dock-group .dock-btn,
      html.mcn-colorblind .color-mode-toggle,
      html.mcn-colorblind .mode-button,
      html.mcn-colorblind .mcn-stamp-v9{border-color:rgba(52,184,255,.72)!important;color:#dff5ff!important;box-shadow:0 0 0 1px rgba(52,184,255,.08) inset!important}
      html.mcn-colorblind .dock-btn:hover,
      html.mcn-colorblind .dock-btn[aria-pressed="true"],
      html.mcn-colorblind .lang-btn.active,
      html.mcn-colorblind .mode-button.active{background:linear-gradient(135deg,#34b8ff,#0077d4)!important;color:#fff!important;border-color:#6bd0ff!important}
      html.mcn-colorblind .mcn-stamp-v9.is-earned{background:rgba(21,147,230,.12)!important;border-color:#34b8ff!important;color:#fff!important}
      html.mcn-colorblind .mcn-stamp-v9.is-earned .seal-char{border-color:#75d8ff!important;color:#c9f2ff!important;background:rgba(0,93,168,.35)!important}
      html.mcn-colorblind .mcn-stamp-v9.is-newest{border-color:#fff!important;background:linear-gradient(135deg,rgba(52,184,255,.26),rgba(0,93,168,.18))!important;box-shadow:0 0 0 3px rgba(255,255,255,.35),0 0 22px rgba(52,184,255,.22)!important}
      .legal-section{max-width:900px!important;margin:0 auto!important;padding:clamp(26px,4vw,54px)!important;text-align:left!important;border:1px solid rgba(226,155,35,.18);border-radius:28px;background:linear-gradient(135deg,rgba(255,255,255,.035),rgba(0,0,0,.14));}
      .legal-section h1,.legal-section h2{text-align:center!important;font-family:'Cinzel',serif!important;font-size:clamp(2.6rem,6vw,5rem)!important;line-height:.95!important;margin:0 0 34px!important;color:#f5f0e8!important}
      .legal-block{margin:0 0 26px!important;font-size:clamp(1.02rem,1.5vw,1.18rem)!important;line-height:1.85!important;color:#d8d0c7!important}
      .legal-block strong{display:block;margin-bottom:8px;font-family:'Cinzel',serif;color:#f4ead7;font-size:1.08em}
      .legal-list{margin:12px 0 18px 1.2rem!important;padding-left:1rem!important;line-height:1.8!important;font-size:clamp(1rem,1.35vw,1.12rem)!important}
      .legal-section a{color:var(--primary,#e49a18);text-underline-offset:4px}
      @media (max-width:760px){
        body{overflow-x:hidden}
        .premium-dock{right:12px!important;top:auto!important;bottom:14px!important;transform:none!important;flex-direction:row!important;gap:8px!important;padding:8px!important;border-radius:24px!important;background:rgba(5,5,5,.72)!important;backdrop-filter:blur(12px)!important}
        .premium-dock .dock-btn{width:44px!important;height:44px!important;min-width:44px!important;font-size:.78rem!important}
        .lang-dock-group{display:flex!important;flex-direction:row!important;gap:8px!important}
        .nav-container{padding-inline:16px!important}
        .stamp-row{justify-content:flex-start!important;gap:10px!important}
        .mcn-stamp-v9{min-height:42px!important;padding:.52rem .82rem!important;font-size:.66rem!important;letter-spacing:.11em!important}
        .mcn-stamp-v9 .seal-char{width:26px!important;height:26px!important}
        .journey-carnet-card{width:94vw!important;max-height:86vh!important;padding:22px!important;border-radius:22px!important}
        .carnet-grid{grid-template-columns:1fr!important}
        .route-actions{grid-template-columns:1fr!important}
        .legal-section{margin:0 14px!important;padding:24px 18px!important}
        .legal-section h1,.legal-section h2{font-size:clamp(2.15rem,14vw,3.8rem)!important}
      }
    `;
    document.head.appendChild(st);
  }

  function boot(){
    installStyles();
    applyFinalTranslations();
    fixNotebookPreview();
    setTimeout(()=>{applyFinalTranslations();fixNotebookPreview();},250);
  }
  document.addEventListener('click',e=>{
    if(e.target.closest('#generate-journey,#download-route-pdf,#download-route-pdf-main,.mcn-v4-pdf')) setTimeout(fixNotebookPreview,80);
    if(e.target.closest('.lang-btn,[data-lang]')) setTimeout(boot,180);
  },true);
  const mo=new MutationObserver(()=>{ if(isEn()) fixNotebookPreview(); });
  if(document.body) mo.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('mcn:navigated',()=>setTimeout(boot,120));
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
