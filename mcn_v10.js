/* ============================================================
   M.C.N. × UNESCO — mcn_v10.js  (autorité unique)
   1. Passeport patrimoine : accumulation fiable, dernier = rouge
   2. Router PJAX : musique réellement continue (pas de rechargement)
   3. Délégation carnet (survit aux navigations PJAX)
   ============================================================ */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var isEn = function () { return document.documentElement.classList.contains('is-english'); };

  /* ═══════════════════════════════════════════════════════════
     1. PASSEPORT — source de vérité unique
     ═══════════════════════════════════════════════════════════ */
  var LS_STAMPS = 'mcn-passport-stamps';
  var LS_LAST   = 'mcn-last-earned-stamp';

  var ORDER = ['badaling', 'mutianyu', 'jinshanling', 'simatai', 'jiankou', 'huanghuacheng'];
  var NAMES = { badaling: 'Badaling', mutianyu: 'Mutianyu', jinshanling: 'Jinshanling', simatai: 'Simatai', jiankou: 'Jiankou', huanghuacheng: 'Huanghuacheng' };
  var CHARS = { badaling: '八', mutianyu: '慕', jinshanling: '金', simatai: '司', jiankou: '箭', huanghuacheng: '黄' };

  function toKey(raw) {
    var s = String(raw || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (s.indexOf('badaling') >= 0 || s.indexOf('八') >= 0) return 'badaling';
    if (s.indexOf('mutianyu') >= 0 || s.indexOf('慕') >= 0) return 'mutianyu';
    if (s.indexOf('jinshanling') >= 0 || s.indexOf('金山') >= 0) return 'jinshanling';
    if (s.indexOf('simatai') >= 0 || s.indexOf('司马') >= 0) return 'simatai';
    if (s.indexOf('jiankou') >= 0 || s.indexOf('箭扣') >= 0) return 'jiankou';
    if (s.indexOf('huanghuacheng') >= 0 || s.indexOf('黄花') >= 0) return 'huanghuacheng';
    return '';
  }

  function readStamps() {
    var raw = [];
    try { raw = JSON.parse(localStorage.getItem(LS_STAMPS) || '[]'); } catch (e) { raw = []; }
    var out = [], seen = {};
    raw.forEach(function (v) { var k = toKey(v); if (k && !seen[k]) { seen[k] = 1; out.push(k); } });
    return out;
  }

  function writeStamps(arr) {
    var out = [], seen = {};
    arr.forEach(function (v) { var k = toKey(v); if (k && !seen[k]) { seen[k] = 1; out.push(k); } });
    localStorage.setItem(LS_STAMPS, JSON.stringify(out));
    return out;
  }

  /* Ajoute un sceau SANS jamais effacer les précédents. */
  function addStamp(raw) {
    var key = toKey(raw);
    if (!key) key = currentBestKey();
    if (!key) return;
    var earned = readStamps();
    if (earned.indexOf(key) === -1) earned.push(key);
    writeStamps(earned);                       // accumulation garantie
    localStorage.setItem(LS_LAST, key);        // marque le dernier acquis
    renderPassport();
    feedback(key);
  }

  function currentBestKey() {
    var r = {};
    try { r = JSON.parse(localStorage.getItem('mcn-last-route') || '{}'); } catch (e) {}
    // v10.1 : 'key' ET 'section' sont tous les deux testés (les deux blocs main.js
    // n'écrivent pas la même propriété)
    var fromRoute = toKey(r.key || r.section || r.name || '');
    if (fromRoute) return fromRoute;
    var act = $('.journey-pin.active, .atlas-site.is-active, .site-chip.is-active');
    if (act && act.dataset.section) return toKey(act.dataset.section);
    return 'badaling';
  }

  function stampHTML(key, earned, newest) {
    var name = NAMES[key] || key, char = CHARS[key] || '長';
    var cls = 'mcn-stamp-v9' + (earned ? ' is-earned' : '') + (newest ? ' is-newest' : '');
    var lbl = isEn() ? (newest ? 'new' : earned ? 'earned' : 'to collect')
                     : (newest ? 'nouveau' : earned ? 'acquis' : 'à obtenir');
    return '<button type="button" class="' + cls + '" data-stamp="' + key + '" title="' + lbl +
           '" aria-label="' + name + ' — ' + lbl + '"><span class="seal-char" aria-hidden="true">' +
           char + '</span><span>' + name + '</span></button>';
  }

  /* Rend TOUTES les rangées de sceaux. Les anciens restent "acquis" (or),
     seul le dernier porte le contour rouge. */
  function renderPassport() {
    var earned = readStamps();
    var recent = toKey(localStorage.getItem(LS_LAST) || '');
    var html = ORDER.map(function (k) {
      return stampHTML(k, earned.indexOf(k) >= 0, earned.indexOf(k) >= 0 && recent === k);
    }).join('');
    $$('.stamp-row, .passport-stamps-live').forEach(function (row) { row.innerHTML = html; });
    var title = $('#passport-title');
    if (title) title.textContent = isEn() ? 'Heritage passport' : 'Passeport patrimoine';
  }

  function feedback(key) {
    var name = NAMES[key] || key, char = CHARS[key] || '長';
    var pop = $('.mcn-v9-pop');
    if (!pop) { pop = document.createElement('div'); pop.className = 'mcn-v9-pop'; document.body.appendChild(pop); }
    var href = /index\.html$|\/$/.test(location.pathname) || location.pathname.split('/').pop() === '' ? '#passport-title' : 'index.html#passport-title';
    pop.innerHTML =
      '<div class="mcn-v9-pop-seal">' + char + '</div>' +
      '<div class="mcn-v9-pop-body"><strong>' + (isEn() ? 'New seal acquired' : 'Nouveau sceau acquis') + '</strong><span>' + name + '</span></div>' +
      '<a href="' + href + '">' + (isEn() ? 'View passport' : 'Voir le passeport') + '</a>' +
      '<button type="button" class="mcn-v9-pop-close" aria-label="Fermer">×</button>';
    clearTimeout(pop._t);
    pop.classList.add('is-visible');
    pop._t = setTimeout(function () { pop.classList.remove('is-visible'); }, 5000);
    pop.querySelector('.mcn-v9-pop-close').addEventListener('click', function () { pop.classList.remove('is-visible'); });
  }

  // Exposé pour que main.js / v5 délèguent vers v10
  window.mcnAddStamp = addStamp;
  window.mcnRenderPassport = renderPassport;
  window.renderPassportStamps = renderPassport;

  /* ═══════════════════════════════════════════════════════════
     2. DÉLÉGATION carnet + passeport (un seul écouteur, capture)
     ═══════════════════════════════════════════════════════════ */
  function wireDelegation() {
    document.addEventListener('click', function (e) {
      // Ajout de sceau — supersede toutes les anciennes liaisons
      if (e.target.closest('#save-passport, #modal-save-passport, .mcn-v4-add-seal, [data-command="add-seal"]')) {
        e.preventDefault(); e.stopImmediatePropagation();
        addStamp(currentBestKey());
        return;
      }
      // Générer le carnet (survit aux navigations PJAX)
      if (e.target.closest('#generate-journey')) {
        e.preventDefault(); e.stopImmediatePropagation();
        if (window.mcnBuildRoute) window.mcnBuildRoute(true);
        return;
      }
      // Copier le programme
      if (e.target.closest('#copy-route')) {
        e.preventDefault(); e.stopImmediatePropagation();
        var r = {};
        try { r = JSON.parse(localStorage.getItem('mcn-last-route') || '{}'); } catch (x) {}
        var txt = (r.title || 'Carnet de route') + ' — ' + (r.score || '') + '/100\n' + ((r.timeline || []).join('\n'));
        if (navigator.clipboard) { navigator.clipboard.writeText(txt).catch(function () {}); }
        return;
      }
      // Fermeture du pop sceau
      if (e.target.closest('.mcn-v9-pop a')) {
        var pop = $('.mcn-v9-pop'); if (pop) pop.classList.remove('is-visible');
      }
    }, true);

    // Recalcul du carnet quand les préférences changent (survit au PJAX)
    document.addEventListener('change', function (e) {
      if (e.target.closest('#visit-profile, #visit-transport, #visit-guide, #visit-food, #visit-hotel, #visit-date')) {
        if (window.mcnBuildRoute) window.mcnBuildRoute(false);
      }
    }, true);

    // Re-render au changement de langue + sync inter-onglets
    document.addEventListener('click', function (e) {
      if (e.target.closest('.lang-btn, [data-lang]')) setTimeout(renderPassport, 200);
    }, true);
    window.addEventListener('storage', function (e) {
      if (e.key === LS_STAMPS || e.key === LS_LAST) renderPassport();
    });
  }

  /* ═══════════════════════════════════════════════════════════
     3. STYLES (passeport + scrollbar recherche + responsive)
     ═══════════════════════════════════════════════════════════ */
  function injectCSS() {
    if ($('#mcn-v10-css')) return;
    var st = document.createElement('style');
    st.id = 'mcn-v10-css';
    st.textContent = [
      /* ----- Passeport ----- */
      '.stamp-row{display:flex!important;flex-wrap:wrap!important;gap:12px 16px!important;align-items:center!important}',
      '.mcn-stamp-v9{position:relative;display:inline-flex;align-items:center;gap:.5rem;min-height:48px;padding:.6rem 1.2rem;border:1px solid rgba(227,154,20,.32);border-radius:999px;background:rgba(255,255,255,.02);color:rgba(255,255,255,.55);font-weight:800;letter-spacing:.16em;text-transform:uppercase;font-size:.76rem;cursor:default;transition:border-color .2s,background .2s,color .2s,box-shadow .2s;opacity:.7}',
      '.mcn-stamp-v9 .seal-char{display:grid;place-items:center;width:30px;height:30px;border:1.5px solid rgba(227,154,20,.35);border-radius:8px;font-family:serif;font-size:.95rem;font-weight:900;color:rgba(227,154,20,.45);background:rgba(60,10,10,.18);transform:rotate(-6deg);transition:inherit}',
      '.mcn-stamp-v9.is-earned{opacity:1;color:#fff7ea;background:rgba(227,154,20,.07);border-color:rgba(227,154,20,.7);box-shadow:0 0 16px rgba(227,154,20,.07) inset}',
      '.mcn-stamp-v9.is-earned .seal-char{border-color:#d4821a;color:#ffd9aa;background:rgba(100,22,10,.42)}',
      '.mcn-stamp-v9.is-newest{border-color:#e03030!important;background:linear-gradient(135deg,rgba(130,15,15,.22),rgba(227,154,20,.06))!important;box-shadow:0 0 0 2px rgba(230,50,50,.3),0 0 22px rgba(230,50,50,.14)!important;color:#fff!important;animation:mcnNewestPulse 1.1s ease-in-out 3}',
      '.mcn-stamp-v9.is-newest .seal-char{border-color:#ff4444!important;color:#fff0e0!important;background:rgba(140,10,10,.6)!important}',
      '@keyframes mcnNewestPulse{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}',
      /* pop */
      '.mcn-v9-pop{position:fixed;right:24px;bottom:24px;z-index:99998;display:flex;align-items:center;gap:14px;max-width:min(520px,calc(100vw - 32px));padding:13px 16px;border:1px solid rgba(227,154,20,.5);border-radius:20px;background:rgba(12,11,10,.95);box-shadow:0 18px 60px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.05) inset;opacity:0;transform:translateY(14px) scale(.98);pointer-events:none;transition:opacity .22s ease,transform .22s ease}',
      '.mcn-v9-pop.is-visible{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}',
      '.mcn-v9-pop-seal{display:grid;place-items:center;width:48px;height:48px;flex-shrink:0;border:2px solid #e03030;border-radius:12px;font-family:serif;font-size:1.4rem;font-weight:900;color:#ffd9aa;background:rgba(110,10,10,.6);transform:rotate(-5deg)}',
      '.mcn-v9-pop-body{flex:1;min-width:0}.mcn-v9-pop-body strong{display:block;color:#fff7ea;font-size:.95rem}.mcn-v9-pop-body span{display:block;color:rgba(255,255,255,.6);font-size:.82rem;margin-top:2px}',
      '.mcn-v9-pop a{display:inline-flex;align-items:center;justify-content:center;height:38px;padding:0 13px;border-radius:12px;background:linear-gradient(135deg,#efaa18,#b36010);color:#120d07!important;font-weight:900;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;text-decoration:none!important;white-space:nowrap;flex-shrink:0}',
      '.mcn-v9-pop-close{width:30px;height:30px;flex-shrink:0;border-radius:50%;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);color:#fff;font-size:1rem;cursor:pointer}',
      '@media(max-width:680px){.mcn-v9-pop{left:14px;right:14px;bottom:14px;flex-wrap:wrap}.mcn-v9-pop a{flex:1}}',

      /* ----- Scrollbar recherche ----- */
      '.command-results{max-height:min(52vh,420px)!important;overflow-y:auto!important;overflow-x:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:rgba(227,154,20,.6) rgba(255,255,255,.06);padding-right:6px}',
      '.command-results::-webkit-scrollbar{width:10px}',
      '.command-results::-webkit-scrollbar-track{background:rgba(255,255,255,.05);border-radius:8px}',
      '.command-results::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#e39a14,#9c5e0c);border-radius:8px;border:2px solid transparent;background-clip:padding-box}',
      '.command-results::-webkit-scrollbar-thumb:hover{background:#e39a14}',
      '.command-card{max-height:90vh;overflow:hidden;display:flex;flex-direction:column}',

      /* ----- Responsive global ----- */
      '@media(max-width:900px){',
      '  .four-columns{grid-template-columns:repeat(2,1fr)!important}',
      '  .command-dashboard{grid-template-columns:repeat(2,1fr)!important}',
      '  .oracle-grid{grid-template-columns:1fr!important}',
      '  .support-contact-grid{grid-template-columns:1fr!important}',
      '  .team-grid,.team-grid-real{grid-template-columns:repeat(2,1fr)!important}',
      '}',
      '@media(max-width:640px){',
      '  .four-columns,.numbers-grid,.impact-strip,.command-dashboard{grid-template-columns:1fr!important}',
      '  .team-grid,.team-grid-real,.team-grid-compact{grid-template-columns:1fr!important}',
      '  .hero-title{font-size:clamp(1.9rem,8vw,3rem)!important;line-height:1.1}',
      '  .hero-subtitle{font-size:clamp(.95rem,4vw,1.2rem)!important}',
      '  .command-actions,.about-hero-actions,.about-centered-actions,.command-actions{flex-wrap:wrap}',
      '  .premium-cta,.ghost-cta,.imperial-btn{width:100%;justify-content:center;text-align:center}',
      '  .route-actions{flex-direction:column}',
      '  .route-actions .imperial-btn,.route-actions a{width:100%}',
      '  .imperial-grid,.journey-grid{grid-template-columns:1fr!important;display:flex!important;flex-direction:column!important}',
      '  .score-grid,.carnet-grid,.route-cards{grid-template-columns:1fr!important}',
      '  .journey-pins{display:flex;flex-wrap:wrap;gap:8px}',
      '  .stamp-row{gap:8px 10px!important}',
      '  .mcn-stamp-v9{font-size:.68rem;padding:.5rem .85rem;min-height:42px;letter-spacing:.1em}',
      '  .mcn-stamp-v9 .seal-char{width:26px;height:26px;font-size:.85rem}',
      '  .premium-dock{bottom:12px!important;gap:6px!important;padding:6px 8px!important}',
      '  .dock-btn{min-width:40px;min-height:40px}',
      '  .modal-inner{width:94vw!important;max-width:94vw!important}',
      '  .command-card{width:94vw!important;max-width:94vw!important;padding:18px!important}',
      '  .nav-menu{gap:2px}',
      '  table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch}',
      '  .footer-content{grid-template-columns:1fr!important;text-align:center}',
      '  iframe{max-width:100%!important}',
      '}',
      '@media(max-width:420px){',
      '  .number-value{font-size:1.4rem!important}',
      '  .mcn-stamp-v9 span:not(.seal-char){font-size:.62rem}',
      '}',
      /* Évite tout débordement horizontal */
      'html,body{max-width:100%;overflow-x:hidden}',
      'img,video,iframe{max-width:100%}',
      /* Indicateur de chargement PJAX discret */
      '.mcn-route-loading .progress-bar{opacity:1}',
      'html.mcn-route-loading{cursor:progress}'
    ].join('\n');
    document.head.appendChild(st);
  }

  /* ═══════════════════════════════════════════════════════════
     4. ROUTER PJAX — navigation interne sans rechargement
        => l'élément <audio> n'est jamais détruit => musique continue
     ═══════════════════════════════════════════════════════════ */
  var INTERNAL = ['index.html', 'histoire.html', 'architecture.html', 'preservation.html', 'visiter.html', 'apropos.html', 'mentions-legales.html', 'politique-confidentialite.html'];
  // Scripts applicatifs déjà chargés (à ne jamais ré-injecter)
  var APP_SCRIPTS = ['main.js', 'premium_upgrade.js', 'mcn_public_final.js', 'mcn_premium_finish.js', 'dynasty_deep.js', 'lang_fix.js', 'mcn_v4_final_patch.js', 'mcn_v5_final_patch.js', 'mcn_v7_passport_home_patch.js', 'mcn_v10.js'];

  function fileOf(href) {
    try { return (new URL(href, location.href).pathname.split('/').pop() || 'index.html'); }
    catch (e) { return ''; }
  }

  function isRoutable(a) {
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return false;
    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0 || href.indexOf('javascript:') === 0) return false;
    try { if (new URL(a.href, location.href).origin !== location.origin) return false; } catch (e) { return false; }
    return INTERNAL.indexOf(fileOf(a.href)) >= 0;
  }

  function ensureExternalScripts(doc) {
    // Charge les scripts externes spécifiques à la page cible (ex : Leaflet sur Visiter)
    var promises = [];
    $$('script[src]', doc).forEach(function (sc) {
      var src = sc.getAttribute('src') || '';
      var leaf = src.split('/').pop();
      if (APP_SCRIPTS.indexOf(leaf) >= 0) return;             // app déjà chargée
      if ($('script[src="' + src + '"]')) return;             // déjà présent
      // déjà chargé par URL absolue ?
      var already = false;
      $$('script[src]').forEach(function (e) { if (e.src === sc.src) already = true; });
      if (already) return;
      promises.push(new Promise(function (res) {
        var n = document.createElement('script');
        n.src = src;
        if (sc.integrity) { n.integrity = sc.integrity; n.crossOrigin = sc.crossOrigin || 'anonymous'; }
        n.onload = res; n.onerror = res;
        document.body.appendChild(n);
      }));
    });
    // CSS externes (ex : leaflet.css)
    $$('link[rel="stylesheet"][href]', doc).forEach(function (lk) {
      var href = lk.getAttribute('href') || '';
      if (href.indexOf('http') !== 0) return;                 // css locaux déjà là
      if ($('link[href="' + href + '"]')) return;
      var n = document.createElement('link'); n.rel = 'stylesheet'; n.href = href;
      if (lk.integrity) { n.integrity = lk.integrity; n.crossOrigin = lk.crossOrigin || 'anonymous'; }
      document.head.appendChild(n);
    });
    return Promise.all(promises);
  }

  function swap(doc) {
    // Titre + meta description
    if (doc.title) document.title = doc.title;
    var nd = doc.querySelector('meta[name="description"]'), od = document.querySelector('meta[name="description"]');
    if (nd && od) od.setAttribute('content', nd.getAttribute('content') || '');

    // Remplace UNIQUEMENT le contenu interne : header/footer/dock/audio persistent
    var newMain = doc.querySelector('main'), oldMain = document.querySelector('main');
    if (newMain && oldMain) {
      oldMain.innerHTML = newMain.innerHTML;
      // recopie les classes du main (ex : about-page)
      oldMain.className = newMain.className;
    }

    // Met à jour l'état actif de la navigation + les modales propres à la page
    syncNav();
    importPageModals(doc);
  }

  function syncNav() {
    var current = fileOf(location.href);
    $$('.nav-menu a').forEach(function (a) {
      var on = fileOf(a.href) === current;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  function importPageModals(doc) {
    // Les modales de sites (#modal-badaling…) vivent dans <main> donc déjà recopiées.
    // Rien d'autre à faire : les modales CSS :target fonctionnent immédiatement.
  }

  function reinit(hash) {
    document.documentElement.classList.remove('mcn-route-loading');
    // Langue : ré-applique sur le contenu fraîchement injecté
    try { if (window.mcnApplyLang) window.mcnApplyLang(localStorage.getItem('mcn-lang') === 'en' ? 'en' : 'fr'); } catch (e) {}
    // Révélations (animations) : on affiche tout de suite le contenu injecté
    $$('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
    // Passeport
    renderPassport();
    // Notifie les modules (carte, frise dynasties, recherche, carnet)
    document.dispatchEvent(new CustomEvent('mcn:navigated'));
    // Scroll
    if (hash) { var t = document.querySelector(hash); if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; } }
    window.scrollTo(0, 0);
  }

  var navigating = false;
  function navigate(url, push) {
    if (navigating) return;
    navigating = true;
    document.documentElement.classList.add('mcn-route-loading');
    var u;
    try { u = new URL(url, location.href); } catch (e) { location.href = url; return; }
    fetch(u.href, { credentials: 'same-origin' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return ensureExternalScripts(doc).then(function () {
          swap(doc);
          if (push) history.pushState({ mcn: 1 }, '', u.pathname + u.search + u.hash);
          reinit(u.hash);
        });
      })
      .catch(function (err) {
        location.href = u.href;
      })
      .then(function () { navigating = false; });
  }

  function wireRouter() {
    // FIX v10.1 : capture (true) au lieu de bubble (false).
    // Raison : d'autres handlers en capture (main.js, premium_finish) pouvaient appeler
    // stopImmediatePropagation avant que le bubble ne remonte jusqu'ici.
    // En capture, v10 (chargé EN DERNIER) enregistre son handler après tous les autres →
    // il est appelé EN DERNIER dans la phase capture → il peut lire l'événement complet
    // avant que quiconque ne l'arrête. wireDelegation (#save-passport etc.) cible des
    // IDs précis ; wireRouter cible a[href] de navigation : pas de conflit.
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!isRoutable(a)) return;
      // Laisse passer ctrl/cmd/clic milieu (nouvel onglet)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      e.stopImmediatePropagation(); // empêche les handlers bubble (rechargement natif)
      navigate(a.href, true);
    }, true);  // CAPTURE — v10 est chargé en dernier, donc last-in parmi les captures
    window.addEventListener('popstate', function () { navigate(location.href, false); });
  }

  /* ═══════════════════════════════════════════════════════════
     5. INIT
     ═══════════════════════════════════════════════════════════ */
  function boot() {
    injectCSS();
    wireDelegation();
    renderPassport();
    wireRouter();
    setTimeout(renderPassport, 300);
    setTimeout(renderPassport, 900);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
