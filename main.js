/* ══════════════════════════════════════════════════════════════
   MAIN.JS — La Grande Muraille de Chine × UNESCO
   Vanilla JS · Optimisé · Commenté
   ══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────
       1. SCROLL REVEAL (IntersectionObserver)
       ───────────────────────────────────────── */
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback si pas de support IntersectionObserver
        revealElements.forEach(el => el.classList.add('is-visible'));
    }

    /* ─────────────────────────────────────────
       2. BARRE DE PROGRESSION (Scroll)
       ───────────────────────────────────────── */
    const progressBar = document.querySelector('.progress-bar');

    if (progressBar) {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    /* ─────────────────────────────────────────
       3. BACK TO TOP
       ───────────────────────────────────────── */
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        const toggleBackToTop = () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('is-visible');
            } else {
                backToTop.classList.remove('is-visible');
            }
        };

        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        toggleBackToTop();
    }

    /* ─────────────────────────────────────────
       4. FAQ ACCORDÉON
       ───────────────────────────────────────── */
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;

            // Effet accordéon : ferme les autres
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) item.classList.remove('is-open');
            });

            faqItem.classList.toggle('is-open');
        });
    });

    /* ─────────────────────────────────────────
       5. ONGLETS STORY MAP (Architecture)
       ───────────────────────────────────────── */
    const mapTabs = document.querySelectorAll('.map-tab');
    const mapLayers = document.querySelectorAll('.map-layer');

    if (mapTabs.length > 0) {
        mapTabs.forEach(tab => {
            ['mouseenter', 'click'].forEach(eventType => {
                tab.addEventListener(eventType, function () {
                    mapTabs.forEach(t => t.classList.remove('is-active'));
                    mapLayers.forEach(l => l.classList.remove('is-visible'));

                    this.classList.add('is-active');
                    const targetId = this.getAttribute('data-target');
                    const target = document.getElementById(targetId);
                    if (target) target.classList.add('is-visible');
                });
            });
        });
    }

    /* ─────────────────────────────────────────
       6. ANIMATION DES COMPTEURS
       ───────────────────────────────────────── */
    const numberCards = document.querySelectorAll('.number-value');

    if (numberCards.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        numberCards.forEach(el => {
            el.setAttribute('data-original', el.textContent.trim());
            counterObserver.observe(el);
        });
    }

    function animateCounter(element) {
        const text = element.getAttribute('data-original') || element.textContent.trim();

        // Extraire le nombre du texte (ex: "21 196 km" → 21196)
        const numMatch = text.replace(/\s/g, '').match(/[\d]+/);
        if (!numMatch) return;

        const targetNum = parseInt(numMatch[0]);
        if (isNaN(targetNum) || targetNum === 0) return;

        // Reconstituer le format original
        const prefix = text.substring(0, text.indexOf(numMatch[0].charAt(0)));
        const suffix = text.substring(text.indexOf(numMatch[0].charAt(0)) + numMatch[0].length);

        const duration = 1400;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic pour un mouvement naturel
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = Math.floor(easedProgress * targetNum);

            // Formater avec les espaces pour les grands nombres
            const formatted = currentNum.toLocaleString('fr-FR');
            element.textContent = prefix + formatted + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Restaurer le texte original exact
                element.textContent = text;
            }
        }

        requestAnimationFrame(update);
    }

    /* ─────────────────────────────────────────
       7. HAMBURGER MENU — Fermeture
       ───────────────────────────────────────── */
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const navOverlay = document.querySelector('.nav-overlay');

    // Fermer le menu en cliquant sur l'overlay
    if (navOverlay && hamburgerToggle) {
        navOverlay.addEventListener('click', () => {
            hamburgerToggle.checked = false;
        });
    }

    // Fermer le menu au clic sur un lien
    if (hamburgerToggle) {
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerToggle.checked = false;
            });
        });
    }

    /* ─────────────────────────────────────────
       8. GRAFFITI CANVAS (Preservation)
       ───────────────────────────────────────── */
    const canvas = document.getElementById('graffiti-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let painting = false;

        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgba(212, 133, 10, 0.85)';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#d4850a';

        function getPos(e) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const clientX = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY);
            if (clientX == null || clientY == null) return null;
            return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
        }

        function startPosition(e) { painting = true; draw(e); }
        function endPosition() { painting = false; ctx.beginPath(); }

        function draw(e) {
            if (!painting) return;
            const pos = getPos(e);
            if (!pos) return;
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }

        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', endPosition);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseleave', endPosition);

        canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPosition(e); }, { passive: false });
        canvas.addEventListener('touchend', endPosition);
        canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); }, { passive: false });

        const btnClean = document.getElementById('btn-nettoyer');
        if (btnClean) {
            btnClean.addEventListener('click', () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            });
        }
    }

    /* ─────────────────────────────────────────
       9. PARALLAX SUBTIL SUR LE HERO
       ───────────────────────────────────────── */
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    if (scrollY < window.innerHeight) {
                        heroVideo.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

});

/* ══════════════════════════════════════════════════════════════
   PREMIUM EXPERIENCE LAYER — interactions jury-ready
   ══════════════════════════════════════════════════════════════ */
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  const knowledge = [
    {k:'badaling', title:'Badaling', text:'Section restaurée, très accessible depuis Pékin : parfaite pour une première visite.', url:'visiter.html'},
    {k:'mutianyu', title:'Mutianyu', text:'Tronçon panoramique plus calme, excellent pour familles et photographes.', url:'visiter.html'},
    {k:'simatai', title:'Simatai', text:'Expérience nocturne rare, atmosphère spectaculaire et relief marqué.', url:'visiter.html'},
    {k:'jiankou', title:'Jiankou', text:'Section sauvage et exigeante, à réserver aux marcheurs expérimentés.', url:'visiter.html'},
    {k:'unesco 1987 patrimoine', title:'UNESCO', text:'Inscription au patrimoine mondial, axe fort de crédibilité institutionnelle.', url:'preservation.html'},
    {k:'ming riz gluant architecture', title:'Architecture Ming', text:'Briques, tours de guet, mortier au riz gluant : le détail technique qui marque un jury.', url:'architecture.html'},
    {k:'histoire dynastie qin han ming', title:'Frise historique', text:'Une lecture chronologique pour comprendre 2700 ans de stratégie, commerce et frontières.', url:'histoire.html'},
    {k:'lidar drone scan 3d conservation', title:'Conservation digitale', text:'Scans LiDAR, drones et jumeau numérique : angle innovant et professionnel.', url:'preservation.html'}
  ];

  function openCommand(){ $('.command-panel')?.classList.add('is-open'); setTimeout(()=>$('#smart-search')?.focus(),50); renderResults(''); }
  function closeCommand(){ $('.command-panel')?.classList.remove('is-open'); }
  function renderResults(q){
    const box=$('.command-results'); if(!box) return;
    const query=(q||'').toLowerCase().trim();
    const results=knowledge.filter(i=>!query || (i.k+i.title+i.text).toLowerCase().includes(query)).slice(0,5);
    box.innerHTML = results.map(r=>`<a class="result-row" href="${r.url}"><strong>${r.title}</strong><span>${r.text}</span></a>`).join('') || '<div class="result-row"><strong>Aucun résultat</strong><span>Essayez : Ming, UNESCO, 3D, Badaling.</span></div>';
  }

  document.addEventListener('click', (e)=>{
    const cmd=e.target.closest('[data-command]')?.dataset.command;
    if(cmd==='search') openCommand();
    // lang toggle handled by lang_fix.js
    // sound handled by mcn_premium_finish.js
    if(e.target.matches('.command-close') || e.target.matches('.command-panel')) closeCommand();
  });
  document.addEventListener('keydown',(e)=>{ if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openCommand()} if(e.key==='Escape') closeCommand(); });
  document.addEventListener('input',(e)=>{ if(e.target && e.target.id==='smart-search') renderResults(e.target.value); });

  // lang restore handled by lang_fix.js

  // Cookie consent handled by lang_fix.js

  // Audio ambiance générée par WebAudio : aucun fichier externe nécessaire.
  let audioCtx, drone, gain;
  function toggleSound(btn){
    if(!window.AudioContext && !window.webkitAudioContext) return;
    if(!audioCtx){
      audioCtx = new (window.AudioContext||window.webkitAudioContext)();
      drone = audioCtx.createOscillator(); gain = audioCtx.createGain();
      drone.type='sine'; drone.frequency.value=110; gain.gain.value=.025;
      drone.connect(gain).connect(audioCtx.destination); drone.start();
      btn?.classList.add('is-active'); btn && (btn.textContent='♫');
    }else{
      const on = gain.gain.value > 0;
      gain.gain.setTargetAtTime(on?0:.025, audioCtx.currentTime, .08);
      btn?.classList.toggle('is-active', !on); btn && (btn.textContent=on?'♪':'♫');
    }
  }

  // Dynasty lens interactive.
  const lensData={
    qin:['Dynastie Qin','Unification des tronçons défensifs : l’idée d’une frontière impériale prend forme et devient un symbole politique.'],
    han:['Dynastie Han','La Muraille accompagne l’expansion vers l’ouest et protège les routes commerciales de la soie.'],
    ming:['Dynastie Ming','Âge de la brique, des tours de guet et du mortier au riz gluant : l’image iconique que l’on connaît aujourd’hui.'],
    today:['Aujourd’hui','Le monument devient une plateforme de mémoire, de tourisme responsable et de conservation numérique.']
  };
  $$('.lens-chip').forEach(chip=>chip.addEventListener('click',()=>{
    $$('.lens-chip').forEach(c=>c.classList.remove('is-active')); chip.classList.add('is-active');
    const [h,p]=lensData[chip.dataset.lens]||lensData.qin;
    const title=$('.lens-text h3'), txt=$('.lens-text p');
    if(title) title.textContent=h; if(txt) txt.textContent=p;
  }));

  // Map markers overlay feedback.
  $$('.site-marker').forEach(marker=>{
    const update=()=>{ const card=$('.map-info-card'); if(card) card.innerHTML=`<strong>${marker.dataset.site}</strong><br>${marker.dataset.info}`; };
    marker.addEventListener('mouseenter', update); marker.addEventListener('focus', update); marker.addEventListener('click', update);
  });
})();


/* ══════════════════════════════════════════════════════════════
   DIRECTOR'S CUT JS — i18n réelle + modules interactifs
   ══════════════════════════════════════════════════════════════ */
(function(){
  const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const dict={
    'Accueil':'Home','Histoire':'History','Architecture & Sites':'Architecture & Sites','Préservation & UNESCO':'Preservation & UNESCO','Visiter':'Visit','Normal':'Default','Daltonien':'Color blind','La Grande Muraille de Chine':'The Great Wall of China','En partenariat avec l\'UNESCO':'In partnership with UNESCO','Introduction à la Grande Muraille de Chine':'Introduction to the Great Wall of China','Chiffres clés':'Key figures','Longueur totale':'Total length','Histoire':'History','Inscription UNESCO':'UNESCO listing','Visiteurs/an':'Visitors/year','Questions fréquentes':'Frequently asked questions','Liens utiles':'Useful links','Informations':'Information','Contact':'Contact','Nous contacter':'Contact us','Créer mon parcours':'Build my route','Carnet patrimoine':'Heritage passport','Culture':'Culture','Photo':'Photo','Famille':'Family','Aventure':'Adventure','Planificateur express':'Express planner','Conservation prédictive':'Predictive conservation','Indice de fragilité':'Fragility index','Mode international':'International mode','Salle du conservateur':'Curator room','Avant / Après restauration':'Before / After restoration','Passeport patrimoine':'Heritage passport','Expérience immersive':'Immersive experience','Accepter l\'expérience':'Accept experience','Explorer la Muraille en un instant':'Explore the Wall instantly','Essayez : Badaling, riz gluant, UNESCO, Ming...':'Try: Badaling, sticky rice, UNESCO, Ming...','Retour en haut':'Back to top','Site officiel de l\'UNESCO':'Official UNESCO website','Planifier sa visite':'Plan your visit','Mentions légales':'Legal notice','Politique de confidentialité':'Privacy policy','Tous droits réservés':'All rights reserved','Le Mur vivant : une interface culturelle qui réagit au visiteur':'The Living Wall: a cultural interface that reacts to the visitor','Conseiller de visite intelligent':'Smart visit advisor','Accessibilité':'Accessibility','Section restaurée':'Restored section','Section sauvage':'Wild section','Carnet numérique':'Digital notebook','Histoire':'History','UNESCO':'UNESCO','Visite':'Visit','Voir le challenge sur Instagram':'See the challenge on Instagram','Galerie sociale officielle du prototype':'Official social gallery for the prototype'};
  const longDict=[
    ['Plus qu\'un site vitrine : un dispositif de médiation numérique où chaque visiteur peut composer son parcours, visualiser les dynasties, comprendre les risques de conservation et repartir avec un carnet de visite personnalisé.','More than a showcase website: a digital mediation system where each visitor can build an itinerary, explore dynasties, understand preservation risks and leave with a personal heritage notebook.'],
    ['Choisissez votre profil : le site propose une section adaptée, le niveau d\'effort, le meilleur moment et l\'expérience à privilégier.','Choose your profile: the site recommends the right section, effort level, best time and experience to prioritise.'],
    ['Le bouton FR/EN traduit désormais les éléments clés de l\'interface et mémorise la préférence localement.','The FR/EN button now translates the key interface elements and stores the preference locally.'],
    ['Après avoir généré son carnet, le visiteur peut participer à un jeu concours culturel : publier une photo originale avec le hashtag #MCNGreatWallChallenge.','After generating their notebook, visitors can join a cultural photo challenge by posting an original photo with the hashtag #MCNGreatWallChallenge.'],
    ['Le défi valorise les regards créatifs et respectueux du patrimoine : une composition originale, une lumière soignée, un récit court sur la section visitée et une attitude responsable sur le site.','The challenge rewards creative, heritage-conscious perspectives: an original composition, thoughtful light, a short story about the section visited and responsible behaviour on site.'],
    ['Une fonctionnalité mémorable pour le jury : le visiteur collecte des sceaux virtuels en explorant l\'histoire, l\'architecture, la préservation et la visite.','A memorable jury-facing feature: visitors collect virtual seals while exploring history, architecture, preservation and travel.']
  ];
  function walkText(root,fn){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});let n;while(n=w.nextNode())fn(n)}
  function applyLang(lang){document.documentElement.lang=lang; document.documentElement.classList.toggle('is-english',lang==='en');
    walkText(document.body,n=>{ if(!n._fr) n._fr=n.nodeValue; const base=n._fr; let out=base; if(lang==='en'){ const t=base.trim(); if(dict[t]) out=base.replace(t,dict[t]); longDict.forEach(([fr,en])=>{out=out.replace(fr,en)}); out=out.replace('© 2026 Projet M.C.N. × UNESCO — Tous droits réservés','© 2026 M.C.N. × UNESCO project — All rights reserved'); } n.nodeValue=out; });
    $$('input[placeholder]').forEach(i=>{ if(!i.dataset.frPlaceholder) i.dataset.frPlaceholder=i.placeholder; i.placeholder=lang==='en'?(dict[i.dataset.frPlaceholder]||i.dataset.frPlaceholder):i.dataset.frPlaceholder; });
  }
  // mcnApplyLang: handled by lang_fix.js
  // lang init: handled by lang_fix.js
  // lang click: handled by lang_fix.js

  document.addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px');},{passive:true});
  const plan={culture:['Mutianyu · 1 journée','Équilibre idéal entre beauté, accessibilité et densité historique. À visiter tôt le matin pour une lumière douce.'],photo:['Jinshanling · Golden hour','Reliefs spectaculaires, crêtes lisibles, tours espacées : le meilleur ratio photographie / authenticité.'],famille:['Badaling · Demi-journée','Accès simple, infrastructures complètes, sécurité renforcée : parfait pour une découverte sans friction.'],aventure:['Jiankou · Guide obligatoire','Tronçon sauvage, vertical et mémorable : expérience forte mais réservée aux randonneurs entraînés.']};
  $$('.planner-chip').forEach(b=>b.addEventListener('click',()=>{ $$('.planner-chip').forEach(x=>x.classList.remove('is-active')); b.classList.add('is-active'); const [h,t]=plan[b.dataset.plan]||plan.culture; const out=$('.planner-output'); if(out) out.innerHTML=`<strong>${h}</strong><span>${t}</span>`; }));
  $$('.compare-range').forEach(r=>r.addEventListener('input',()=>{const ov=r.parentElement.querySelector('.compare-overlay'); if(ov) ov.style.width=r.value+'%';}));
  function toast(msg){let t=$('.smart-toast'); if(!t){t=document.createElement('div');t.className='smart-toast';document.body.appendChild(t)} t.textContent=msg;t.classList.add('is-visible');clearTimeout(t._to);t._to=setTimeout(()=>t.classList.remove('is-visible'),2500)}
  document.addEventListener('click',e=>{const cmd=e.target.closest('[data-command]')?.dataset.command; if(cmd==='open-planner'){document.querySelector('.oracle-grid')?.scrollIntoView({behavior:'smooth',block:'center'});toast('Planificateur activé : choisissez un profil de visite.')} if(cmd==='open-passport'){openPassport();}});
  function openPassport(){let m=$('.heritage-passport-modal'); if(!m){m=document.createElement('div');m.className='heritage-passport-modal';m.innerHTML='<div class="passport-modal-card"><button class="close-passport" aria-label="Fermer">\u00d7</button><span class="eyebrow">M.C.N. Heritage Passport</span><h2 id="passport-title-modal">Passeport patrimoine</h2><p><span class="lang-fr">Explorez les six sections et collectez vos sceaux depuis la page Visiter.</span><span class="lang-en">Explore the six sections and collect your seals from the Visit page.</span></p><div class="stamp-row passport-stamps-live"></div></div>';document.body.appendChild(m);m.addEventListener('click',ev=>{if(ev.target===m||ev.target.classList.contains('close-passport'))m.classList.remove('is-open')});} if(typeof window.renderPassportStamps==='function') window.renderPassportStamps(); m.classList.add('is-open')}
})();


/* ══════════════════════════════════════════════════════════════
   CARNET DE ROUTE IMPÉRIAL — Journey Planner
   ══════════════════════════════════════════════════════════════ */
(function(){
  const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const data={
    badaling:{name:'Badaling',tag:'La porte d’entrée iconique, fluide et accessible depuis Pékin.',dest:'Badaling Great Wall',travel:'transit',title:'Badaling — Première grande traversée',scores:[72,96,82,48],base:92,food:'Zhajiangmian, jiaozi et thé au jasmin au retour vers Pékin.',hotel:'Retour conseillé à Pékin pour un meilleur choix d’hôtels, ou nuit à Yanqing pour partir tôt.',tip:'Arrivez avant 8h30 : lumière douce, files plus courtes et photos plus propres.',timeline:['07:20|Départ de Pékin Nord ou Qinghe vers Badaling.','09:00|Entrée sur la section restaurée, montée progressive vers les tours nord.','10:45|Pause panorama : meilleur spot pour photo institutionnelle.','12:15|Déjeuner local puis visite du musée de la Grande Muraille.','15:30|Retour vers Pékin ou extension à Yanqing.']},
    mutianyu:{name:'Mutianyu',tag:'L’équilibre parfait entre beauté, confort et forêt de montagne.',dest:'Mutianyu Great Wall',travel:'driving',title:'Mutianyu — Forêt, crêtes et visite confortable',scores:[81,88,91,72],base:94,food:'Truite de montagne, nouilles artisanales, légumes sautés et thé local.',hotel:'Boutique guesthouse près de Huairou ou retour confortable à Pékin.',tip:'Privilégiez la montée en téléphérique et la descente en luge pour une expérience mémorable.',timeline:['07:45|Départ en voiture privée ou bus touristique depuis Pékin.','09:35|Arrivée à Mutianyu, montée vers les tours centrales.','11:00|Marche panoramique en forêt : rythme fluide, foule modérée.','12:45|Déjeuner à Huairou avec spécialités locales.','15:00|Descente en luge ou téléphérique, retour vers Pékin.']},
    jinshanling:{name:'Jinshanling',tag:'Le paradis des photographes : lignes de crête, tours et lumière dorée.',dest:'Jinshanling Great Wall',travel:'driving',title:'Jinshanling — Expédition photo golden hour',scores:[92,68,98,86],base:96,food:'Plats du Hebei, galettes locales, tofu épicé et thé chaud.',hotel:'Guesthouse près de Luanping pour lever de soleil, sinon retour tardif à Pékin.',tip:'Emportez batterie externe et veste coupe-vent : la lumière est sublime mais les crêtes exposées.',timeline:['10:30|Départ décalé pour viser la lumière d’après-midi.','13:00|Arrivée, marche de tour en tour sur les crêtes.','15:30|Session photo : lignes de fuite et tours Ming.','17:20|Golden hour sur les remparts.','19:00|Dîner local ou nuit en guesthouse.']},
    simatai:{name:'Simatai',tag:'La section nocturne, spectaculaire, avec le village aquatique de Gubei.',dest:'Simatai Great Wall',travel:'driving',title:'Simatai — Nuit impériale et Gubei Water Town',scores:[88,70,95,78],base:95,food:'Cuisine de Gubei Water Town : raviolis, brochettes, desserts au sésame.',hotel:'Hôtel thématique à Gubei Water Town pour prolonger la visite nocturne.',tip:'Réservez la visite nocturne : c’est l’expérience la plus différenciante de toute la Muraille.',timeline:['12:00|Départ tranquille depuis Pékin.','14:45|Installation à Gubei Water Town et découverte du village.','17:30|Dîner tôt puis montée vers Simatai.','19:00|Visite nocturne : lanternes, reliefs et ambiance cinématographique.','21:30|Nuit sur place ou retour privé vers Pékin.']},
    jiankou:{name:'Jiankou',tag:'Le choc visuel sauvage, réservé aux randonneurs expérimentés.',dest:'Jiankou Great Wall',travel:'driving',title:'Jiankou — Aventure sauvage encadrée',scores:[99,35,97,93],base:89,food:'Repas paysan à Xizhazi : légumes de montagne, œufs fermiers, nouilles.',hotel:'Guesthouse simple au village de Xizhazi ou retour à Huairou.',tip:'Guide obligatoire recommandé : certaines portions sont instables et non restaurées.',timeline:['06:30|Départ très tôt avec guide local et équipement de randonnée.','08:45|Brief sécurité au village de Xizhazi.','09:30|Ascension vers les tours sauvages, progression lente.','12:30|Pique-nique panoramique, observation conservation.','15:30|Descente encadrée, retour avant la nuit.']},
    huanghuacheng:{name:'Huanghuacheng',tag:'Muraille et lac : expérience rare, poétique et moins attendue.',dest:'Huanghuacheng Lakeside Great Wall',travel:'driving',title:'Huanghuacheng — Muraille au bord de l’eau',scores:[85,74,93,82],base:93,food:'Poisson de lac, légumes sauvages, nouilles et thé floral.',hotel:'Auberge au bord de l’eau ou nuit confort à Huairou.',tip:'Choisissez une fin d’après-midi calme : les reflets du lac rendent le site unique.',timeline:['08:30|Départ de Pékin vers Huairou.','10:30|Balade sur les portions au-dessus du lac.','12:15|Déjeuner poisson de lac et spécialités rurales.','14:00|Marche douce + points photo sur les reflets.','16:30|Retour ou nuit en auberge lacustre.']}
  };
  const profileBoost={culture:[6,0,0,0],photo:[0,-2,8,2],family:[0,7,0,-4],adventure:[8,-8,6,8],premium:[2,8,4,0]};
  function setDateDefault(){const input=$('#visit-date'); if(input && !input.value){const d=new Date(); d.setDate(d.getDate()+21); input.value=d.toISOString().slice(0,10)}}
  function getSelected(){return $('.journey-pin.active')?.dataset.section || 'badaling'}
  function build(){const key=getSelected(), s=data[key]||data.badaling; const profile=$('#visit-profile')?.value||'culture', transport=$('#visit-transport')?.value||'train', guide=$('#visit-guide')?.value||'no', hotel=$('#visit-hotel')?.value||'none', food=$('#visit-food')?.value||'local'; const boost=profileBoost[profile]||[0,0,0,0]; const scores=s.scores.map((v,i)=>Math.max(15,Math.min(99,v+boost[i]))); let total=Math.round((scores.reduce((a,b)=>a+b,0)/4)*.55+s.base*.45); if(guide==='expert') total=Math.min(99,total+3); if(hotel==='boutique') total=Math.min(99,total+2); if(transport==='hike' && key!=='jiankou') total-=4;
    $('#selected-section-name') && ($('#selected-section-name').textContent=s.name); $('#selected-section-tagline') && ($('#selected-section-tagline').textContent=s.tag); $('#route-title') && ($('#route-title').textContent=s.title); $('#experience-score') && ($('#experience-score').textContent=total); $('.experience-score')?.style.setProperty('--score', total);
    [['#score-auth',scores[0]],['#score-access',scores[1]],['#score-photo',scores[2]],['#score-crowd',scores[3]]].forEach(([id,val])=>{const m=$(id); if(m)m.value=val});
    const tl=$('#route-timeline'); if(tl){tl.innerHTML=s.timeline.map(row=>{const [time,text]=row.split('|'); return `<li><time>${time}</time><span>${text}</span></li>`}).join('')}
    let foodText=s.food; if(food==='vegetarian') foodText+=' Option végétarienne : légumes sautés, tofu, nouilles et thé.'; if(food==='halal') foodText+=' Conseil halal-friendly : privilégier menus végétariens/poisson et vérifier les viandes.'; if(food==='premium') foodText+=' Version premium : dîner gastronomique au retour à Pékin.'; $('#food-reco') && ($('#food-reco').textContent=foodText);
    let hotelText=s.hotel; if(hotel==='none') hotelText='Aucun hôtel requis : programme optimisé en aller-retour depuis Pékin.'; if(hotel==='comfort') hotelText+=' Sélection confort : hôtel 3/4★ proche des accès.'; if(hotel==='boutique') hotelText+=' Recommandation : boutique hôtel immersif pour prolonger l’expérience.'; if(hotel==='beijing') hotelText='Retour à Pékin recommandé : plus grand choix, meilleure logistique internationale.'; $('#hotel-reco') && ($('#hotel-reco').textContent=hotelText);
    let tip=s.tip; if(guide==='yes') tip+=' Un guide local ajoute contexte historique et fluidifie les billets.'; if(guide==='expert') tip+=' Le guide expert peut axer la visite sur conservation, dynasties et architecture Ming.'; $('#pro-tip') && ($('#pro-tip').textContent=tip);
    const mode=transport==='train'?'transit':transport==='bus'?'transit':transport==='hike'?'walking':'driving'; const url=`https://www.google.com/maps/dir/?api=1&origin=Beijing&destination=${encodeURIComponent(s.dest)}&travelmode=${mode}`; const a=$('#maps-link'); if(a) a.href=url;
    localStorage.setItem('mcn-last-route', JSON.stringify({section:s.name,title:s.title,score:total,date:$('#visit-date')?.value||'',timeline:s.timeline}));
  }
  function toast(msg){let t=$('.smart-toast'); if(!t){t=document.createElement('div');t.className='smart-toast';document.body.appendChild(t)} t.textContent=msg;t.classList.add('is-visible');clearTimeout(t._to);t._to=setTimeout(()=>t.classList.remove('is-visible'),2600)}
  $$('.journey-pin').forEach(pin=>pin.addEventListener('click',()=>{$$('.journey-pin').forEach(p=>p.classList.remove('active')); pin.classList.add('active'); build();}));
  ['#visit-profile','#visit-transport','#visit-guide','#visit-food','#visit-hotel','#visit-date'].forEach(id=>$(id)?.addEventListener('change',build));
  $('#generate-journey')?.addEventListener('click',()=>{build(); toast('Carnet généré : itinéraire, conseils et lien Google Maps prêts.');});
  /* [v10-PATCH] handler passeport bubble NEUTRALISÉ — la gestion est en capture dans mcn_v10.js */
  $('#copy-route')?.addEventListener('click',async()=>{const r=JSON.parse(localStorage.getItem('mcn-last-route')||'{}'); const txt=`${r.title||'Carnet de route'} — score ${r.score||''}/100\n${(r.timeline||[]).join('\n')}`; try{await navigator.clipboard.writeText(txt); toast('Programme copié dans le presse-papiers.')}catch(e){toast('Programme prêt à être copié.')}});
  setDateDefault(); build();
})();

/* === HOTFIX FINAL 20/20 — traduction globale, carnet réel, passeport, atlas === */
(function(){
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const sectionData={
    badaling:{name:'Badaling',dest:'Badaling Great Wall',tag:'La porte d’entrée iconique, fluide et accessible depuis Pékin.',copy:'Section restaurée, accès le plus simple depuis Pékin. Idéale pour familles, accessibilité et première découverte.',title:'Badaling — Première grande traversée',food:'Zhajiangmian, jiaozi, thé au jasmin et snacks de Yanqing.',hotel:'Retour à Pékin conseillé ou hôtel confort à Yanqing.',tip:'Arrivez avant 8h30 : lumière douce et files plus courtes.',timeline:['07:15|Départ depuis Pékin, marge de sécurité incluse.','09:00|Arrivée au centre d’accueil et récupération des billets.','09:30|Montée vers les tours nord avec pauses photo.','12:15|Déjeuner local et découverte des spécialités.','14:00|Musée / lecture patrimoniale sur la défense Ming.','16:00|Retour vers Pékin ou installation hôtel.']},
    mutianyu:{name:'Mutianyu',dest:'Mutianyu Great Wall',tag:'Le meilleur équilibre entre beauté, confort et panoramas.',copy:'Panoramas plus calmes, section restaurée élégante, excellente pour photos et familles.',title:'Mutianyu — Panorama premium et familial',food:'Truite locale, nouilles, raviolis vapeur et thé vert.',hotel:'Boutique hôtel dans le district de Huairou ou retour Pékin.',tip:'Privilégiez la fin d’après-midi pour une lumière rasante spectaculaire.',timeline:['07:45|Départ depuis Pékin vers Huairou.','09:45|Arrivée à Mutianyu et montée téléphérique ou sentier doux.','10:30|Marche panoramique entre les tours 14 et 20.','12:45|Déjeuner local à Huairou.','14:30|Temps photo, descente et visite d’un village voisin.','17:00|Retour ou check-in boutique hôtel.']},
    jinshanling:{name:'Jinshanling',dest:'Jinshanling Great Wall',tag:'La section des photographes et des marcheurs exigeants.',copy:'Semi-restaurée, photogénique, parfaite pour ressentir la Muraille dans le paysage.',title:'Jinshanling — Traversée photographique',food:'Plats paysans du Hebei, légumes de montagne, nouilles maison.',hotel:'Guesthouse près de Gubeikou ou lodge panoramique.',tip:'Chaussures de marche obligatoires : marches irrégulières et longues crêtes.',timeline:['06:30|Départ tôt pour profiter de la lumière du matin.','09:30|Arrivée et briefing sécurité.','10:00|Randonnée progressive sur les crêtes restaurées et sauvages.','12:30|Pique-nique ou déjeuner local.','14:00|Séquence photo Golden Wall et tours anciennes.','17:30|Retour ou nuit en guesthouse.']},
    simatai:{name:'Simatai',dest:'Simatai Great Wall',tag:'L’expérience nocturne la plus spectaculaire.',copy:'Section ouverte en soirée, atmosphère dramatique près de Gubei Water Town.',title:'Simatai — Muraille nocturne',food:'Cuisine de Gubei Water Town, fondue locale, desserts chinois.',hotel:'Hôtel à Gubei Water Town pour prolonger l’expérience nocturne.',tip:'Réservez tôt : les créneaux de nuit sont limités et très demandés.',timeline:['12:00|Départ tranquille depuis Pékin.','15:00|Arrivée à Gubei Water Town et promenade culturelle.','17:30|Dîner avant la montée.','19:00|Accès à Simatai illuminée.','20:30|Photos nocturnes et lecture du paysage.','22:00|Nuit sur place ou retour tardif.']},
    jiankou:{name:'Jiankou',dest:'Jiankou Great Wall',tag:'Sauvage, intense, réservé aux profils expérimentés.',copy:'Section non restaurée, spectaculaire mais exigeante. À aborder avec guide et prudence.',title:'Jiankou — Expédition sauvage encadrée',food:'Repas rural à Xizhazi, légumes sautés, tofu, thé chaud.',hotel:'Maison d’hôtes locale simple ou retour tardif à Pékin.',tip:'Ne partez pas seul : terrain instable, orientation difficile et préservation fragile.',timeline:['06:00|Départ avec guide spécialisé.','08:30|Briefing sécurité et accès village.','09:00|Montée progressive vers les tours sauvages autorisées.','12:00|Pause panoramique sans sortir des zones sûres.','14:00|Descente contrôlée et repas rural.','17:30|Retour vers Pékin.']},
    huanghuacheng:{name:'Huanghuacheng',dest:'Huanghuacheng Lakeside Great Wall',tag:'Muraille, eau et montagne dans une ambiance rare.',copy:'Section lacustre originale, idéale pour une visite calme et contemplative.',title:'Huanghuacheng — Muraille au bord de l’eau',food:'Poisson du lac, légumes sautés, nouilles et thé local.',hotel:'Auberge lacustre ou hôtel confort à Huairou.',tip:'Excellent choix au printemps et en automne pour les reflets sur le lac.',timeline:['08:00|Départ depuis Pékin vers Huairou.','10:00|Arrivée au site lacustre.','10:30|Marche douce et points de vue sur l’eau.','12:30|Déjeuner poisson / spécialités locales.','14:30|Promenade photo ou bateau selon saison.','16:30|Retour vers Pékin.']}
  };
  const EN={
    'Accueil':'Home','Histoire':'History','Architecture & Sites':'Architecture & Sites','Préservation & UNESCO':'Preservation & UNESCO','Visiter':'Visit','Normal':'Default','Daltonien':'Color-blind','La Grande Muraille de Chine':'The Great Wall of China','En partenariat avec l\'UNESCO':'In partnership with UNESCO','Introduction à la Grande Muraille de Chine':'Introduction to the Great Wall of China','Questions Fréquentes':'Frequently Asked Questions','Liens utiles':'Useful links','Informations':'Information','Contact':'Contact','Nous contacter':'Contact us','Carte des sites':'Site map','Carte interactive des sections':'Interactive section atlas','Carnet de Route Impérial':'Imperial Route Notebook','Nouveau module signature / prototype UNESCO':'Signature module / UNESCO prototype','Composer l\'expérience':'Build the experience','Préférences de visite':'Visit preferences','Date de visite':'Visit date','Profil voyageur':'Traveler profile','Moyen de transport':'Transport','Guide local':'Local guide','Repas souhaité':'Food preferences','Hébergement':'Accommodation','Générer mon carnet':'Generate my notebook','Itinéraire recommandé':'Recommended itinerary','Authenticité':'Authenticity','Accessibilité':'Accessibility','Photogénie':'Photogenic value','Affluence maîtrisée':'Crowd control','À goûter':'Food to try','Où dormir':'Where to stay','Conseil terrain':'Field tip','Ouvrir l\'itinéraire réel':'Open real route','Ajouter au passeport':'Add to passport','Copier le programme':'Copy program','Gamification responsable':'Responsible gamification','Défi photo : Mon regard sur la Muraille':'Photo challenge: My view of the Wall','Voir l\'inspiration sociale':'See social inspiration','Chiffres du tourisme':'Tourism figures','Visiteurs/an':'Visitors/year','Distance de Pékin (Badaling)':'Distance from Beijing (Badaling)','Inscription UNESCO':'UNESCO listing','Sections accessibles':'Accessible sections','Site officiel de l\'UNESCO':'Official UNESCO website','Planifier sa visite':'Plan your visit','Mentions légales':'Legal notice','Politique de confidentialité':'Privacy policy','Tous droits réservés':'All rights reserved','Explorer la Muraille en un instant':'Explore the Wall instantly','Expérience immersive':'Immersive experience','Accepter l\'expérience':'Accept experience','Retour en haut':'Back to top','Choisir une section':'Choose a section','Atlas planifiable':'Plannable atlas','Ouvrir dans Google Maps':'Open in Google Maps','Créer mon parcours':'Build my route','Carnet patrimoine':'Heritage passport','Passeport patrimoine':'Heritage passport','Le Mur vivant : une interface culturelle qui réagit au visiteur':'The Living Wall: a cultural interface that reacts to visitors','Comparer les dynasties comme dans une salle de contrôle':'Compare dynasties like in a control room','Avant / Après restauration':'Before / After restoration','Salle du conservateur':'Curator room','Planificateur express':'Express planner','Mode international':'International mode','Indice de fragilité':'Fragility index','Conservation prédictive':'Predictive preservation','Section restaurée':'Restored section','Section sauvage':'Wild section','Carnet numérique':'Digital notebook','Voir le challenge sur Instagram':'See the challenge on Instagram','Galerie sociale officielle du prototype':'Official social gallery for the prototype'
  };
  const phrases=[
    ['Après avoir généré son carnet, le visiteur peut participer à un jeu concours culturel : publier une photo originale avec le hashtag #MCNGreatWallChallenge.','After generating their notebook, visitors can join a cultural photo challenge by posting an original photo with the hashtag #MCNGreatWallChallenge.'],
    ['Le défi valorise les regards créatifs et respectueux du patrimoine : une composition originale, une lumière soignée, un récit court sur la section visitée et une attitude responsable sur le site.','The challenge rewards creative, heritage-conscious perspectives: an original composition, thoughtful light, a short story about the section visited and responsible behaviour on site.'],
    ['Un planificateur culturel intelligent : cliquez sur un tronçon, choisissez votre date, votre rythme et vos préférences. Le site compose un itinéraire réaliste avec accès Google Maps, conseils de visite, gastronomie locale, hôtels, score d\'expérience et passeport patrimoine.','A smart cultural planner: click a section, choose your date, pace and preferences. The site builds a realistic itinerary with Google Maps access, travel advice, local food, hotels, experience score and heritage passport.'],
    ['Après avoir généré son carnet, le visiteur peut participer à un jeu concours culturel : publier une photo originale avec le hashtag','After generating the notebook, visitors can join a cultural photo challenge by posting an original picture with the hashtag'],
    ['Le but n\'est pas de faire du tourisme de masse, mais de récompenser les regards respectueux du patrimoine.','The goal is not mass tourism, but to reward respectful ways of looking at heritage.'],
    ['Nous utilisons uniquement des préférences locales pour retenir la langue, l\'accessibilité et l\'ambiance. Aucun traçage publicitaire.','We only use local preferences to remember language, accessibility and ambience. No advertising tracking.']
  ];
  function trText(str){ let out=EN[str.trim()]||str; phrases.forEach(([fr,en])=>{out=out.replace(fr,en)}); return out; }
  function applyLang(lang){
    document.documentElement.lang=lang; localStorage.setItem('mcn-lang',lang); document.documentElement.classList.toggle('is-english',lang==='en');
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(n){if(!n.nodeValue.trim())return NodeFilter.FILTER_REJECT; const p=n.parentElement; if(!p||['SCRIPT','STYLE','TEXTAREA','INPUT','SELECT','OPTION'].includes(p.tagName))return NodeFilter.FILTER_REJECT; return NodeFilter.FILTER_ACCEPT;}});
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{ if(!n.__fr) n.__fr=n.nodeValue; n.nodeValue=lang==='en'?trText(n.__fr):n.__fr; });
    $$('input[placeholder]').forEach(i=>{ if(!i.dataset.frPlaceholder) i.dataset.frPlaceholder=i.placeholder; i.placeholder=lang==='en'?trText(i.dataset.frPlaceholder):i.dataset.frPlaceholder; });
    $$('option').forEach(o=>{ if(!o.dataset.fr) o.dataset.fr=o.textContent; o.textContent=lang==='en'?trText(o.dataset.fr):o.dataset.fr; });
    updateDynamicLang(); renderPassportStamps();
  }
  // mcnApplyLang: handled by lang_fix.js
  // lang click: handled by lang_fix.js

  function toast(msg){ if(window.mcnToast) return window.mcnToast(msg); let t=$('.smart-toast'); if(!t){t=document.createElement('div'); t.className='smart-toast'; document.body.appendChild(t);} t.textContent=msg; t.classList.add('is-visible'); setTimeout(()=>t.classList.remove('is-visible'),2500); }
  function activeKey(){return $('.journey-pin.active')?.dataset.section||$('.atlas-site.is-active')?.dataset.section||'badaling'}
  function syncSection(key){
    const s=sectionData[key]||sectionData.badaling;
    $$('.journey-pin').forEach(p=>p.classList.toggle('active',p.dataset.section===key)); $$('.atlas-site').forEach(p=>p.classList.toggle('is-active',p.dataset.section===key));
    if($('#selected-section-name')) $('#selected-section-name').textContent=s.name; if($('#selected-section-tagline')) $('#selected-section-tagline').textContent=s.tag;
    if($('#atlas-name')) $('#atlas-name').textContent=s.name; if($('#atlas-copy')) $('#atlas-copy').textContent=s.copy; if($('#atlas-maps')) $('#atlas-maps').href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.dest)}`;
    buildRoute(false);
  }
  function buildRoute(openModal=true){
    const key=activeKey(), s=sectionData[key]||sectionData.badaling;
    const date=$('#visit-date')?.value||'date libre', transport=$('#visit-transport')?.value||'train', guide=$('#visit-guide')?.value||'no', hotel=$('#visit-hotel')?.value||'none', food=$('#visit-food')?.value||'local', profile=$('#visit-profile')?.value||'culture';
    const scores={badaling:[72,96,82,48],mutianyu:[78,90,92,70],jinshanling:[92,58,98,86],simatai:[84,64,95,76],jiankou:[98,34,96,90],huanghuacheng:[86,72,92,82]}[key];
    let score=Math.round(scores.reduce((a,b)=>a+b,0)/4); if(guide==='expert')score+=4; if(hotel==='boutique')score+=2; if(profile==='premium')score+=2; score=Math.min(99,score);
    $('#route-title') && ($('#route-title').textContent=s.title); $('#experience-score') && ($('#experience-score').textContent=score); $('.experience-score')?.style.setProperty('--score',score);
    ['auth','access','photo','crowd'].forEach((id,i)=>{const m=$('#score-'+id); if(m)m.value=scores[i];});
    const tl=$('#route-timeline'); if(tl) tl.innerHTML=s.timeline.map(r=>{const [time,text]=r.split('|');return `<li><time>${time}</time><span>${text}</span></li>`}).join('');
    let foodText=s.food; if(food==='vegetarian')foodText+=' Option végétarienne : tofu, légumes sautés, nouilles et thé.'; if(food==='halal')foodText+=' Option halal-friendly : privilégier poisson/végétarien et vérifier les viandes.'; if(food==='premium')foodText+=' Version premium : table gastronomique au retour.';
    $('#food-reco') && ($('#food-reco').textContent=foodText); $('#hotel-reco') && ($('#hotel-reco').textContent=hotel==='none'?s.hotel:hotel==='beijing'?'Retour dans un hôtel central de Pékin, pratique pour le lendemain.':hotel==='boutique'?'Boutique hôtel sélectionné pour ambiance locale et photos.':'Hôtel confort proche du site pour limiter la fatigue.'); $('#pro-tip') && ($('#pro-tip').textContent=s.tip);
    const mode=transport==='car'?'driving':transport==='hike'?'walking':'transit'; if($('#maps-link')) $('#maps-link').href=`https://www.google.com/maps/dir/?api=1&origin=Beijing&destination=${encodeURIComponent(s.dest)}&travelmode=${mode}`;
    const route={key,section:s.name,title:s.title,score,date,transport,guide,hotel,food:foodText,hotelText:$('#hotel-reco')?.textContent||s.hotel,tip:s.tip,timeline:s.timeline.map(x=>x.replace('|',' — ')),maps:$('#maps-link')?.href||''};
    localStorage.setItem('mcn-last-route',JSON.stringify(route)); $('.journey-result')?.classList.add('has-generated'); updateDynamicLang(); if(openModal) openCarnet(route); return route;
  }
  function openCarnet(route){
    let m=$('.journey-carnet-modal'); if(!m){m=document.createElement('div'); m.className='journey-carnet-modal'; document.body.appendChild(m); m.addEventListener('click',e=>{if(e.target===m||e.target.closest('.close-carnet'))m.classList.remove('is-open')});}
    const EN=localStorage.getItem('mcn-lang')==='en';const ML=EN?{gen:'Generated notebook',date:'Date',score:'Score',taste:'To taste',stay:'Where to stay',tip:'Field tip',maps:'Open Google Maps',pdf:'Download PDF',seal:'Add seal'}:{gen:'Carnet généré',date:'Date',score:'Score',taste:'À goûter',stay:'Où dormir',tip:'Conseil',maps:'Ouvrir Google Maps',pdf:'Télécharger le PDF',seal:'Ajouter le sceau'};
    m.innerHTML=`<div class="journey-carnet-card"><button class="close-carnet" aria-label="Fermer">×</button><span class="eyebrow">${ML.gen}</span><h2>${route.section}</h2><div class="carnet-paper"><h3>${route.title}</h3><p><strong>${ML.date} :</strong> ${route.date} · <strong>${ML.score} :</strong> ${route.score}/100</p><ol>${route.timeline.map(x=>`<li>${x}</li>`).join('')}</ol><div class="carnet-grid"><div><strong>${ML.taste}</strong><span>${route.food}</span></div><div><strong>${ML.stay}</strong><span>${route.hotelText}</span></div><div><strong>${ML.tip}</strong><span>${route.tip}</span></div></div></div><div class="route-actions"><a class="imperial-btn" target="_blank" rel="noopener" href="${route.maps}">${ML.maps}</a><button class="imperial-btn secondary" id="download-route-pdf">${ML.pdf}</button><button class="imperial-btn secondary" id="modal-save-passport">${ML.seal}</button></div></div>`;
    m.classList.add('is-open'); $('#modal-save-passport',m)?.addEventListener('click',()=>savePassport(route.key));
  }
  function savePassport(key=activeKey()){ if(window.mcnAddStamp){window.mcnAddStamp(key);} }
  function renderPassportStamps(){ if(window.mcnRenderPassport) window.mcnRenderPassport(); }
  function updateDynamicLang(){ if(localStorage.getItem('mcn-lang')!=='en')return; ['#selected-section-tagline','#atlas-copy','#food-reco','#hotel-reco','#pro-tip'].forEach(sel=>{const el=$(sel); if(el&&el.__fr) el.textContent=trText(el.__fr);}); }
  document.addEventListener('click',e=>{const a=e.target.closest('.atlas-site'); if(a){syncSection(a.dataset.section);} const p=e.target.closest('.journey-pin'); if(p){setTimeout(()=>syncSection(p.dataset.section),0);} },true);
  $('#generate-journey')?.addEventListener('click',e=>{e.preventDefault(); e.stopImmediatePropagation(); buildRoute(true); toast('Carnet généré : votre programme complet est prêt.');},true);
  /* [v10-PATCH] save-passport : délègue UNIQUEMENT à mcnAddStamp via v10 (plus de stopImmediatePropagation) */
  $('#save-passport')?.addEventListener('click',e=>{e.preventDefault(); /* pas de stopImmediatePropagation : v10 capture gère */ },true);
  $('#copy-route')?.addEventListener('click',async e=>{e.preventDefault(); e.stopImmediatePropagation(); const r=JSON.parse(localStorage.getItem('mcn-last-route')||'{}'); const txt=`${r.title||'Carnet de route'} — ${r.score||''}/100\n${(r.timeline||[]).join('\n')}\n${r.food||''}\n${r.hotelText||''}`; try{await navigator.clipboard.writeText(txt);toast('Carnet copié dans le presse-papiers.')}catch(_){toast('Carnet prêt à être copié.')}} ,true);
  window.mcnSyncSection=syncSection; window.mcnActiveKey=activeKey; window.mcnBuildRoute=buildRoute;
  document.addEventListener('mcn:navigated',()=>{ try{ syncSection(activeKey()); }catch(_){ } });
  window.addEventListener('DOMContentLoaded',()=>{syncSection(activeKey()); renderPassportStamps(); /* lang: handled by lang_fix.js */});
})();

/* === PATCH CARTE RÉELLE ANCRÉE — Leaflet + synchronisation Carnet === */
(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const sections={
    badaling:{name:'Badaling',lat:40.3599,lng:116.0200,dest:'Badaling Great Wall',copy:'Section restaurée, accès le plus simple depuis Pékin. Idéale pour familles, accessibilité et première découverte.'},
    mutianyu:{name:'Mutianyu',lat:40.4319,lng:116.5704,dest:'Mutianyu Great Wall',copy:'Panoramas plus calmes, section restaurée élégante, excellente pour photos et familles.'},
    jinshanling:{name:'Jinshanling',lat:40.6841,lng:117.2319,dest:'Jinshanling Great Wall',copy:'Semi-restaurée, photogénique, parfaite pour ressentir la Muraille dans le paysage.'},
    simatai:{name:'Simatai',lat:40.6502,lng:117.2794,dest:'Simatai Great Wall',copy:'Section ouverte en soirée, atmosphère dramatique près de Gubei Water Town.'},
    jiankou:{name:'Jiankou',lat:40.4572,lng:116.5367,dest:'Jiankou Great Wall',copy:'Section non restaurée, spectaculaire mais exigeante. À aborder avec guide et prudence.'},
    huanghuacheng:{name:'Huanghuacheng',lat:40.4188,lng:116.3220,dest:'Huanghuacheng Lakeside Great Wall',copy:'Section lacustre originale, idéale pour une visite calme et contemplative.'}
  };
  function selectSection(key, pan=true){
    const s=sections[key]||sections.badaling;
    const pin=document.querySelector(`.journey-pin[data-section="${key}"]`);
    if(pin) pin.click();
    const name=$('#atlas-name'), copy=$('#atlas-copy'), maps=$('#atlas-maps'), iframe=$('#sites-google-map');
    if(name) name.textContent=s.name;
    if(copy) copy.textContent=s.copy;
    if(maps) maps.href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.dest)}`;
    if(iframe) iframe.src=`https://www.google.com/maps?q=${encodeURIComponent(s.dest)}&output=embed`;
    document.querySelectorAll('.site-chip[data-section]').forEach(btn=>btn.classList.toggle('is-active', btn.dataset.section===key));
    if(window.__mcnLeafletMap && pan) window.__mcnLeafletMap.flyTo([s.lat,s.lng], 10, {duration:.75});
    Object.entries(window.__mcnMarkers||{}).forEach(([k,m])=>{ const el=m.getElement(); if(el) el.classList.toggle('is-active',k===key); });
  }
  window.mcnSelectSection=selectSection;
  function init(){
    const el=$('#sites-real-map'); if(!el || !window.L || el.dataset.ready) return; el.dataset.ready='1';
    const map=L.map(el,{scrollWheelZoom:false,zoomControl:true}).setView([40.50,116.72],9);
    window.__mcnLeafletMap=map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.jpeg',{maxZoom:18,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
    window.__mcnMarkers={};
    Object.entries(sections).forEach(([key,s])=>{
      const icon=L.divIcon({className:`mcn-leaflet-marker ${key==='badaling'?'is-active':''}`,iconSize:[18,18],iconAnchor:[9,9]});
      const marker=L.marker([s.lat,s.lng],{icon}).addTo(map);
      marker.bindPopup(`<div class="mcn-map-popup"><strong>${s.name}</strong><p>${s.copy}</p><button type="button" data-map-select="${key}">Synchroniser le carnet</button></div>`);
      marker.on('click',()=>selectSection(key,false));
      window.__mcnMarkers[key]=marker;
    });
    map.on('popupopen',e=>{ const btn=e.popup.getElement()?.querySelector('[data-map-select]'); if(btn) btn.addEventListener('click',()=>{selectSection(btn.dataset.mapSelect, false);}); });
    setTimeout(()=>map.invalidateSize(),250);
  }
  window.mcnInitMap=init;
  document.addEventListener('DOMContentLoaded',init);
  window.addEventListener('load',init);
  document.addEventListener('mcn:navigated',()=>{ try{ init(); }catch(_){ } });
  document.addEventListener('click',e=>{
    const chip=e.target.closest('.site-chip[data-section]');
    if(chip){ selectSection(chip.dataset.section); return; }
    const p=e.target.closest('.journey-pin[data-section]');
    if(p){
      const key=p.dataset.section, s=sections[key];
      if(s){
        const iframe=$('#sites-google-map'), name=$('#atlas-name'), copy=$('#atlas-copy'), maps=$('#atlas-maps');
        if(iframe) iframe.src=`https://www.google.com/maps?q=${encodeURIComponent(s.dest)}&output=embed`;
        if(name) name.textContent=s.name;
        if(copy) copy.textContent=s.copy;
        if(maps) maps.href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.dest)}`;
        document.querySelectorAll('.site-chip[data-section]').forEach(btn=>btn.classList.toggle('is-active', btn.dataset.section===key));
        Object.entries(window.__mcnMarkers||{}).forEach(([k,m])=>{ const node=m.getElement(); if(node) node.classList.toggle('is-active',k===key); });
      }
    }
  }, true);
})();





/* === FINAL PATCH — PDF lisible, traduction globale renforcée, mode daltonien persistant === */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));

  // Synchronise le switch daltonien avec une classe globale, utile pour les nouveaux modules.
  const cb=$('#daltonien-mode');
  function syncColor(){document.documentElement.classList.toggle('mcn-colorblind',!!cb?.checked); localStorage.setItem('mcn-colorblind',cb?.checked?'1':'0');}
  if(cb){cb.checked=localStorage.getItem('mcn-colorblind')==='1'; cb.addEventListener('change',syncColor); syncColor();}

  // Dictionnaire étendu : couvre les pages statiques, les formulaires, les nouveaux modules et le contenu dynamique.
  const exact={
    "Accueil":"Home","Histoire":"History","Architecture & Sites":"Architecture & Sites","Préservation & UNESCO":"Preservation & UNESCO","Visiter":"Visit","Normal":"Default","Daltonien":"Color-blind",
    "La Grande Muraille de Chine":"The Great Wall of China","En partenariat avec l'UNESCO":"In partnership with UNESCO","Introduction à la Grande Muraille de Chine":"Introduction to the Great Wall of China",
    "Chiffres clés":"Key figures","Longueur totale":"Total length","Inscription UNESCO":"UNESCO listing","Visiteurs/an":"Visitors/year","Questions fréquentes":"Frequently asked questions","Questions Fréquentes":"Frequently Asked Questions",
    "Liens utiles":"Useful links","Informations":"Information","Contact":"Contact","Nous contacter":"Contact us","Site officiel de l'UNESCO":"Official UNESCO website","Planifier sa visite":"Plan your visit","Mentions légales":"Legal notice","Politique de confidentialité":"Privacy policy","Tous droits réservés":"All rights reserved",
    "Informations pratiques":"Practical information","Meilleure période":"Best season","Accès depuis Pékin":"Access from Beijing","Tarifs d'entrée":"Entrance fees","Carte des sites":"Site map","Carte interactive des sections":"Interactive section map","Section sélectionnée":"Selected section","Atlas planifiable":"Plannable atlas","Ouvrir dans Google Maps":"Open in Google Maps","Aller au carnet":"Go to notebook",
    "Carnet de Route Impérial":"Imperial Route Notebook","Nouveau module signature / prototype UNESCO":"Signature module / UNESCO prototype","Composer l'expérience":"Build the experience","Préférences de visite":"Visit preferences","Date de visite":"Visit date","Profil voyageur":"Traveler profile","Moyen de transport":"Transport","Guide local":"Local guide","Repas souhaité":"Food preference","Hébergement":"Accommodation","Générer mon carnet":"Generate my notebook","Itinéraire recommandé":"Recommended itinerary","Authenticité":"Authenticity","Accessibilité":"Accessibility","Photogénie":"Photogenic value","Affluence maîtrisée":"Crowd control","À goûter":"Food to try","Où dormir":"Where to stay","Conseil terrain":"Field tip","Ouvrir l'itinéraire réel":"Open real route","Ajouter au passeport":"Add to passport","Télécharger le PDF":"Download PDF","Copier le programme":"Copy program","Choisir une section":"Choose a section",
    "Culture & patrimoine":"Culture & heritage","Photo / coucher de soleil":"Photo / sunset","Famille & confort":"Family & comfort","Aventure & randonnée":"Adventure & hiking","Premium / sans friction":"Premium / seamless","Train / transport public":"Train / public transport","Bus touristique":"Tourist bus","Voiture privée":"Private car","Randonnée guidée":"Guided hike","Non, visite autonome":"No, self-guided visit","Oui, guide culturel":"Yes, cultural guide","Guide expert patrimoine":"Heritage expert guide","Spécialités locales":"Local specialties","Option végétarienne":"Vegetarian option","Option halal-friendly":"Halal-friendly option","Table premium au retour":"Premium dinner on return","Pas d'hôtel":"No hotel","Hôtel confort proche":"Nearby comfort hotel","Boutique hôtel / expérience":"Boutique hotel / experience","Retour hôtel à Pékin":"Return to Beijing hotel",
    "Gamification responsable":"Responsible gamification","Défi photo : Mon regard sur la Muraille":"Photo challenge: My view of the Wall","Voir le challenge sur Instagram":"See the challenge on Instagram","Galerie sociale officielle du prototype":"Official social gallery for the prototype","Chiffres du tourisme":"Tourism figures","Distance de Pékin (Badaling)":"Distance from Beijing (Badaling)","Sections accessibles":"Accessible sections","Explorer la Muraille en un instant":"Explore the Wall instantly","Essayez : Badaling, riz gluant, UNESCO, Ming...":"Try: Badaling, sticky rice, UNESCO, Ming...","Retour en haut":"Back to top","M.C.N. / Recherche curatoriale":"M.C.N. / Curatorial search"
  };
  const phrases=[
    ["La porte d'entrée iconique, fluide et accessible depuis Pékin.","The iconic gateway, smooth and accessible from Beijing."],
    ["L’équilibre parfait entre beauté, confort et forêt de montagne.","The perfect balance of beauty, comfort and mountain forest."],
    ["Le paradis des photographes : lignes de crête, tours et lumière dorée.","A photographer’s paradise: ridgelines, towers and golden light."],
    ["La section nocturne, spectaculaire, avec le village aquatique de Gubei.","The spectacular night section, paired with Gubei Water Town."],
    ["Le choc visuel sauvage, réservé aux randonneurs expérimentés.","A wild visual shock for experienced hikers."],
    ["Muraille et lac : expérience rare, poétique et moins attendue.","Wall and lake: a rare, poetic, less expected experience."],
    ["Section restaurée, accès le plus simple depuis Pékin. Cliquez sur un site pour l’afficher sur la carte. Le Carnet de Route Impérial se synchronise aussi, sans vous déplacer dans la page.","Restored section with the easiest access from Beijing. Click a site to display it on the map. The Imperial Route Notebook also synchronizes without moving you down the page."],
    ["Un planificateur culturel intelligent : cliquez sur un tronçon, choisissez votre date, votre rythme et vos préférences. Le site compose un itinéraire réaliste avec accès Google Maps, conseils de visite, gastronomie locale, hôtels, score d'expérience et passeport patrimoine.","A smart cultural planner: click a section, choose your date, pace and preferences. The site builds a realistic route with Google Maps access, visit advice, local food, hotels, an experience score and a heritage passport."],
    ["✓ Itinéraires réels Google Maps","✓ Real Google Maps routes"],["✓ Recommandations personnalisées","✓ Personalized recommendations"],["✓ Tourisme responsable","✓ Responsible tourism"],["✓ Défi photo communautaire","✓ Community photo challenge"],
    ["Après avoir généré son carnet, le visiteur peut participer à un jeu concours culturel : publier une photo originale avec le hashtag","After generating the notebook, the visitor can join a cultural contest by posting an original photo with the hashtag"],
    ["Le défi valorise les regards créatifs et respectueux du patrimoine : une composition originale, une lumière soignée, un récit court sur la section visitée et une attitude responsable sur le site.","The challenge highlights creative and heritage-conscious perspectives: original framing, careful lighting, a short story about the section visited and responsible behavior on site."],
    ["Printemps (avril-mai) et automne (septembre-octobre) : températures douces et ciel dégagé. Évitez les jours fériés chinois, très fréquentés.","Spring (April–May) and autumn (September–October): mild temperatures and clear skies. Avoid very crowded Chinese public holidays."],
    ["Bus depuis Deshengmen ou Dongzhimen pour Badaling et Mutianyu. Comptez 1h à 2h de trajet. Tours organisées chaque matin.","Buses from Deshengmen or Dongzhimen to Badaling and Mutianyu. Allow 1 to 2 hours. Organized tours leave every morning."],
    ["Badaling : ~45 ¥ (6€). Mutianyu : ~65 ¥ (8€). Réservation en ligne recommandée pour éviter les files d'attente.","Badaling: about ¥45 (€6). Mutianyu: about ¥65 (€8). Online booking is recommended to avoid queues."],
    ["Une question sur le projet ou la Muraille ?","A question about the project or the Wall?"]
  ];
  function trText(txt){let out=txt; const trim=txt.trim(); if(exact[trim]) return txt.replace(trim,exact[trim]); phrases.forEach(([fr,en])=>{out=out.split(fr).join(en)}); return out;}
  function walk(node,cb){const w=document.createTreeWalker(node,NodeFilter.SHOW_TEXT,{acceptNode:n=>!n.parentElement||['SCRIPT','STYLE','NOSCRIPT'].includes(n.parentElement.tagName)?NodeFilter.FILTER_REJECT:(n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT)}); let n; while(n=w.nextNode()) cb(n);}
  // mcnApplyLang: handled by lang_fix.js
  // lang click: handled by lang_fix.js
  // lang init: handled by lang_fix.js

  function currentRoute(){try{return JSON.parse(localStorage.getItem('mcn-last-route')||'{}')}catch(_){return {}}}
  function clean(v){return String(v||'').replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"').replace(/[\u2013\u2014]/g,'-').normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
  function esc(v){return clean(v).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)')}
  function wrap(v,max){const words=clean(v).split(/\s+/).filter(Boolean), lines=[]; let line=''; words.forEach(w=>{if((line+' '+w).trim().length>max){if(line)lines.push(line); line=w}else line=(line+' '+w).trim()}); if(line)lines.push(line); return lines;}
  function routeFromDom(){
    const timeline=$$('#route-timeline li').map(li=>{const t=li.querySelector('time')?.textContent||''; const s=li.querySelector('span')?.textContent||li.textContent; return t+'|'+s.replace(t,'').trim();});
    return {section:$('#selected-section-name')?.textContent||'Grande Muraille', title:$('#route-title')?.textContent||'Itinéraire recommandé', score:$('#experience-score')?.textContent||'', date:$('#visit-date')?.value||'', timeline, food:$('#food-reco')?.textContent||'', hotelText:$('#hotel-reco')?.textContent||'', tip:$('#pro-tip')?.textContent||'', maps:$('#maps-link')?.href||''};
  }
  function makePdf(){
    let route=currentRoute(); const dom=routeFromDom(); route={...dom,...route, timeline:dom.timeline.length?dom.timeline:route.timeline};
    const W=595,H=842,ops=[]; const cmd=s=>ops.push(s);
    const rgb=(r,g,b)=>`${r} ${g} ${b}`; const rect=(x,y,w,h,c)=>cmd(`${c} rg ${x} ${y} ${w} ${h} re f`); const stroke=(x,y,w,h,c)=>cmd(`${c} RG ${x} ${y} ${w} ${h} re S`);
    const text=(x,y,size,str,font='F1',color=rgb(.10,.09,.08))=>cmd(`${color} rg BT /${font} ${size} Tf ${x} ${y} Td (${esc(str)}) Tj ET`);
    rect(0,0,W,H,rgb(.985,.965,.925)); rect(0,H-126,W,126,rgb(.22,.08,.035)); rect(0,H-8,W,8,rgb(.86,.52,.08));
    text(42,H-42,10,'M.C.N.  /  UNESCO PROTOTYPE','F1',rgb(.95,.66,.18)); text(42,H-78,29,'Carnet de Route Imperial','F2',rgb(.98,.88,.68)); text(42,H-104,12,`${route.section||'Grande Muraille'}  -  ${route.date||'Date a definir'}  -  Score ${route.score||'--'}/100`,'F1',rgb(.95,.66,.18));
    let y=H-158; text(42,y,20,route.title||'Itineraire recommande','F2',rgb(.22,.08,.035)); y-=25; rect(42,y,511,2,rgb(.86,.52,.08)); y-=34;
    text(42,y,15,'Programme de visite','F2',rgb(.22,.08,.035)); y-=22;
    (route.timeline||[]).forEach((item)=>{let time='',body=''; if(String(item).includes('|')){[time,body]=String(item).split('|')} else {let p=String(item).split(' - '); time=p[0]; body=p.slice(1).join(' - ')||item;} rect(42,y-18,68,28,rgb(.86,.52,.08)); text(55,y-8,10,time,'F2',rgb(1,1,1)); wrap(body,76).slice(0,2).forEach((l,i)=>text(124,y-4-i*13,10.5,l)); y-=48; });
    y-=6; text(42,y,15,'Recommandations personnalisées','F2',rgb(.22,.08,.035)); y-=18;
    const cards=[[PL.food,route.food],[PL.stay,route.hotelText],[PL.tip,route.tip]]; let x=42; cards.forEach(([h,b])=>{rect(x,y-126,157,112,rgb(1,.985,.95)); stroke(x,y-126,157,112,rgb(.78,.49,.14)); text(x+12,y-36,12,h,'F2',rgb(.22,.08,.035)); wrap(b,29).slice(0,6).forEach((l,i)=>text(x+12,y-56-i*12,8.8,l)); x+=176;});
    y-=158; rect(42,y-54,511,54,rgb(.96,.91,.82)); text(56,y-20,10,'Lien Google Maps reel','F2',rgb(.22,.08,.035)); wrap(route.maps||'Disponible depuis le site',95).slice(0,2).forEach((l,i)=>text(56,y-36-i*11,8,l));
    text(42,36,8,'Document genere localement par le prototype M.C.N. - aucune donnee personnelle transmise.');
    const stream=ops.join('\n'); const objs=[]; objs.push('1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj'); objs.push('2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj'); objs.push('3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >> endobj'); objs.push('4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj'); objs.push('5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >> endobj'); objs.push(`6 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`);
    let pdf='%PDF-1.4\n',xref=[0]; objs.forEach(o=>{xref.push(pdf.length); pdf+=o+'\n'}); const start=pdf.length; pdf+=`xref\n0 ${objs.length+1}\n0000000000 65535 f \n`+xref.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n ').join('\n')+`\ntrailer << /Size ${objs.length+1} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`;
    const blob=new Blob([pdf],{type:'application/pdf'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='carnet-route-imperial.pdf'; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href); a.remove();},1000);
  }
  document.addEventListener('click',e=>{const b=e.target.closest('#download-route-pdf,#download-route-pdf-main'); if(!b)return; e.preventDefault(); e.stopImmediatePropagation(); makePdf();},true);
  window.mcnDownloadRoutePdf=makePdf;
})();

/* === PATCH FINAL 2 — accessibilité réelle, traduction plus complète, PDF propre === */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));

  // Traduction globale plus robuste : dictionnaire par texte exact + fragments fréquents.
  const exact={
    'Accueil':'Home','Histoire':'History','Architecture & Sites':'Architecture & Sites','Préservation & UNESCO':'Preservation & UNESCO','Visiter':'Visit','Normal':'Default','Daltonien':'Color-blind',
    'Centre de médiation numérique':'Digital mediation center','Une expérience UNESCO pensée comme un musée digital premium':'A UNESCO experience designed as a premium digital museum',
    "Le site devient un véritable poste de pilotage culturel : parcours de visite, conservation, accessibilité, cartographie et récits historiques sont réunis dans une interface immersive inspirée de l’encre, du jade et de l’or impérial.":'The site becomes a true cultural command center: itineraries, preservation, accessibility, mapping and historical narratives are brought together in an immersive interface inspired by ink, jade and imperial gold.',
    "Lancer l'exploration 3D":'Launch 3D exploration','Composer un itinéraire':'Build an itinerary','Signal UNESCO':'UNESCO signal','Patrimoine mondial':'World Heritage','Risque érosion':'Erosion risk','Sections à surveiller':'Sections to monitor','Scan LiDAR':'LiDAR scan','Jumeau numérique':'Digital twin','Contraste renforcé':'Enhanced contrast',
    'International':'International','Mode français / anglais intégré':'Integrated French / English mode','Inclusif':'Inclusive','Mode daltonien + contraste premium':'Color-blind mode + premium contrast','Immersif':'Immersive','3D, Street View, Story Map, audio':'3D, Street View, Story Map, audio','Crédible':'Credible','Ton institutionnel et muséal':'Institutional museum tone',
    'Informations pratiques':'Practical information','Meilleure période':'Best season','Accès depuis Pékin':'Access from Beijing','Tarifs d’entrée':'Entrance fees',"Tarifs d'entrée":'Entrance fees','Carte des sites':'Site map','Carte interactive des sections':'Interactive section map',
    'Carnet de Route Impérial':'Imperial Route Notebook','Nouveau module signature / prototype UNESCO':'Signature module / UNESCO prototype','Composer l’expérience':'Build the experience',"Composer l'expérience":'Build the experience','Préférences de visite':'Visit preferences','Date de visite':'Visit date','Profil voyageur':'Traveler profile','Moyen de transport':'Transport','Guide local':'Local guide','Repas souhaité':'Food preference','Hébergement':'Accommodation','Générer mon carnet':'Generate my notebook','Itinéraire recommandé':'Recommended itinerary','Authenticité':'Authenticity','Accessibilité':'Accessibility','Photogénie':'Photogenic value','Affluence maîtrisée':'Crowd control','À goûter':'Food to try','Où dormir':'Where to stay','Conseil terrain':'Field tip','Ouvrir l’itinéraire réel':'Open real route',"Ouvrir l'itinéraire réel":'Open real route','Ajouter au passeport':'Add to passport','Télécharger le PDF':'Download PDF','Copier le programme':'Copy the program',
    'Choisir une section':'Choose a section','Section sélectionnée':'Selected section','Ouvrir dans Google Maps':'Open in Google Maps','Badaling — première grande traversée':'Badaling — first great crossing','Mutianyu — forêt, crêtes et visite confortable':'Mutianyu — forest, ridges and comfortable visit','Jinshanling — lignes de crête photographiques':'Jinshanling — photographic ridgelines','Simatai — Muraille nocturne':'Simatai — night wall','Jiankou — expérience sauvage encadrée':'Jiankou — guided wild experience','Huanghuacheng — lac et Muraille':'Huanghuacheng — lake and Wall',
    'Culture & patrimoine':'Culture & heritage','Photo / coucher de soleil':'Photo / sunset','Famille & confort':'Family & comfort','Aventure & randonnée':'Adventure & hiking','Premium / sans friction':'Premium / seamless','Train / transport public':'Train / public transport','Bus touristique':'Tourist bus','Voiture privée':'Private car','Randonnée guidée':'Guided hike','Non, visite autonome':'No, self-guided visit','Oui, guide culturel':'Yes, cultural guide','Guide expert patrimoine':'Heritage expert guide','Spécialités locales':'Local specialties','Option végétarienne':'Vegetarian option','Option halal-friendly':'Halal-friendly option','Table premium au retour':'Premium dinner on return',"Pas d'hôtel":'No hotel','Hôtel confort proche':'Nearby comfort hotel','Boutique hôtel / expérience':'Boutique hotel / experience','Retour hôtel à Pékin':'Return to Beijing hotel',
    'Défi photo : Mon regard sur la Muraille':'Photo challenge: My view of the Wall','Voir le challenge sur Instagram':'See the challenge on Instagram','Chiffres du tourisme':'Tourism figures','Visiteurs/an':'Visitors/year','Distance de Pékin (Badaling)':'Distance from Beijing (Badaling)','Inscription UNESCO':'UNESCO listing','Sections accessibles':'Accessible sections','Liens utiles':'Useful links','Informations':'Information','Contact':'Contact','Site officiel de l’UNESCO':'Official UNESCO website',"Site officiel de l'UNESCO":'Official UNESCO website','Planifier sa visite':'Plan your visit','Mentions légales':'Legal notice','Politique de confidentialité':'Privacy policy','Nous contacter':'Contact us','Une question sur le projet ou la Muraille ?':'A question about the project or the Wall?','Tous droits réservés':'All rights reserved',
    'Ère moderne':'Modern era',"Aujourd'hui":'Today',"XXIe siècle":'21st century','Official UNESCO website':'Official UNESCO website','Plan your visit':'Plan your visit','Legal notice':'Legal notice','Privacy policy':'Privacy policy'
  };
  const fragments=[
    ['Printemps (avril-mai) et automne (septembre-octobre) : températures douces et ciel dégagé. Évitez les jours fériés chinois, très fréquentés.','Spring (April–May) and autumn (September–October): mild temperatures and clear skies. Avoid very crowded Chinese public holidays.'],
    ['Bus depuis Deshengmen ou Dongzhimen pour Badaling et Mutianyu. Comptez 1h à 2h de trajet. Tours organisées chaque matin.','Buses from Deshengmen or Dongzhimen serve Badaling and Mutianyu. Expect 1 to 2 hours of travel. Organized tours depart every morning.'],
    ['Badaling : ~45 ¥ (6€). Mutianyu : ~65 ¥ (8€). Réservation en ligne recommandée pour éviter les files d’attente.','Badaling: about ¥45 (€6). Mutianyu: about ¥65 (€8). Online booking is recommended to avoid queues.'],
    ['Passage de rempart militaire à trésor mondial. Classée à l’UNESCO, elle est aujourd’hui le symbole universel de la Chine.','From military rampart to global treasure. Listed by UNESCO, it is now a universal symbol of China.'],
    ['Après avoir généré son carnet, le visiteur peut participer à un jeu concours culturel : publier une photo originale avec le hashtag','After generating the notebook, visitors can join a cultural contest by posting an original photo with the hashtag'],
    ['Le défi valorise les regards créatifs et respectueux du patrimoine : une composition originale, une lumière soignée, un récit court sur la section visitée et une attitude responsable sur le site.','The challenge rewards creative, heritage-conscious perspectives: original framing, refined lighting, a short story about the visited section and responsible behavior on site.'],
    ['Aucun hôtel requis : programme optimisé en aller-retour depuis Pékin.','No hotel required: optimized same-day return from Beijing.'],
    ['Privilégiez la montée en téléphérique et la descente en luge pour une expérience mémorable. Un guide local ajoute contexte historique et fluidifie les billets.','Prefer the cable car ascent and toboggan descent for a memorable experience. A local guide adds historical context and makes ticketing smoother.'],
    ['Truite de montagne, nouilles artisanales, légumes sautés et thé local. Conseil halal-friendly : privilégier menus végétariens/poisson et vérifier les viandes.','Mountain trout, handmade noodles, stir-fried vegetables and local tea. Halal-friendly tip: favor vegetarian/fish menus and check meats.']
  ];
  function tr(s){let out=exact[s.trim()]||s; fragments.forEach(([fr,en])=>{out=out.replace(fr,en)}); return out;}
  function walk(root,cb){const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}); const arr=[]; while(tw.nextNode()) arr.push(tw.currentNode); arr.forEach(cb);}
  // mcnApplyLang: handled by lang_fix.js
  // lang click: handled by lang_fix.js

  // Mode daltonien réellement global.
  function syncColor(){
    const cb=$('#daltonien-mode');
    const on=!!cb?.checked || localStorage.getItem('mcn-colorblind')==='1';
    document.documentElement.classList.toggle('mcn-colorblind',on);
    if(cb) cb.checked=on;
  }
  document.addEventListener('change',e=>{if(e.target&&e.target.id==='daltonien-mode'){localStorage.setItem('mcn-colorblind',e.target.checked?'1':'0'); syncColor();}},true);
  syncColor();

  // Boutons PDF : on neutralise les anciens identifiants pour éviter l'ancien générateur sombre.
  function convertPdfButtons(){
    $$('#download-route-pdf,#download-route-pdf-main').forEach(b=>{b.dataset.cleanPdf='1'; b.removeAttribute('id'); b.classList.add('download-route-pdf-clean'); b.textContent=localStorage.getItem('mcn-lang')==='en'?'Download PDF':'Télécharger le PDF';});
  }
  new MutationObserver(convertPdfButtons).observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(convertPdfButtons,50);

  function clean(v){return String(v||'').replace(/[’‘]/g,"'").replace(/[“”]/g,'"').replace(/[–—]/g,' - ').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7E]/g,'');}
  function esc(v){return clean(v).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)')}
  function wrap(v,max){const words=clean(v).split(/\s+/).filter(Boolean), lines=[]; let line=''; words.forEach(w=>{if((line+' '+w).trim().length>max){if(line)lines.push(line); line=w}else line=(line+' '+w).trim()}); if(line)lines.push(line); return lines;}
  function routeFromDom(){
    const timeline=$$('#route-timeline li').map(li=>({time:li.querySelector('time')?.textContent.trim()||'', body:(li.querySelector('span')?.textContent||li.textContent).replace(li.querySelector('time')?.textContent||'','').trim()}));
    const score=($('#experience-score strong')?.textContent||$('#experience-score')?.textContent||'').replace(/[^0-9]/g,'')||'--';
    return {section:$('#selected-section-name')?.textContent||'Grande Muraille', title:$('#route-title')?.textContent||'Itineraire recommande', score, date:$('#visit-date')?.value||'', timeline, food:$('#food-reco')?.textContent||'', hotelText:$('#hotel-reco')?.textContent||'', tip:$('#pro-tip')?.textContent||'', maps:$('#maps-link')?.href||''};
  }
  function drawText(cmd,x,y,size,str,font='F1',color='0.11 0.10 0.09') { cmd(`${color} rg BT /${font} ${size} Tf ${x} ${y} Td (${esc(str)}) Tj ET`); }
  function makeCleanPdf(){
    const EN=localStorage.getItem('mcn-lang')==='en';
    const PL={
      kicker:EN?'M.C.N. - UNESCO PROTOTYPE':'M.C.N. - UNESCO PROTOTYPE',
      title:EN?'Imperial Route Notebook':'Carnet de Route Imperial',
      dateTbd:EN?'Date to define':'Date a definir',
      score:EN?'Score':'Score',
      program:EN?'Visit programme':'Programme de visite',
      reco:EN?'Personalised recommendations':'Recommandations personnalisees',
      food:EN?'To taste':'A gouter',
      stay:EN?'Where to stay':'Ou dormir',
      tip:EN?'Field tip':'Conseil terrain',
      maps:EN?'Real Google Maps route':'Itineraire reel Google Maps',
      mapsFallback:EN?'Link available from the website.':'Lien disponible depuis le site.',
      footer:EN?'Document generated locally by the M.C.N. prototype - no personal data transmitted.':'Document genere localement par le prototype M.C.N. - aucune donnee personnelle transmise.'
    };
    const route=routeFromDom(); const W=595,H=842,ops=[]; const cmd=s=>ops.push(s); const rect=(x,y,w,h,c)=>cmd(`${c} rg ${x} ${y} ${w} ${h} re f`); const stroke=(x,y,w,h,c)=>cmd(`${c} RG ${x} ${y} ${w} ${h} re S`);
    rect(0,0,W,H,'0.985 0.970 0.940'); rect(0,H-112,W,112,'0.20 0.08 0.04'); rect(0,H-8,W,8,'0.88 0.55 0.10');
    drawText(cmd,44,H-38,10,'M.C.N. - UNESCO PROTOTYPE','F1','0.95 0.66 0.18'); drawText(cmd,44,H-72,29,PL.title,'F2','1 0.90 0.72'); drawText(cmd,44,H-96,12,`${route.section}  -  ${route.date||PL.dateTbd}  -  ${PL.score} ${route.score}/100`,'F1','0.95 0.66 0.18');
    let y=H-150; drawText(cmd,44,y,22,route.title,'F2','0.22 0.08 0.03'); y-=24; rect(44,y,507,2,'0.88 0.55 0.10'); y-=32;
    drawText(cmd,44,y,16,PL.program,'F2','0.22 0.08 0.03'); y-=18;
    route.timeline.slice(0,7).forEach(item=>{ rect(44,y-24,76,34,'0.88 0.55 0.10'); drawText(cmd,62,y-4,11,item.time||'--:--','F2','1 1 1'); wrap(item.body,70).slice(0,2).forEach((l,i)=>drawText(cmd,136,y-2-i*13,10.5,l)); y-=48; });
    y-=6; drawText(cmd,44,y,16,PL.reco,'F2','0.22 0.08 0.03'); y-=22;
    const cards=[[PL.food,route.food],[PL.stay,route.hotelText],[PL.tip,route.tip]]; let x=44; cards.forEach(([h,b])=>{rect(x,y-122,158,112,'1 0.985 0.955'); stroke(x,y-122,158,112,'0.74 0.46 0.12'); drawText(cmd,x+12,y-32,12,h,'F2','0.22 0.08 0.03'); wrap(b,28).slice(0,6).forEach((l,i)=>drawText(cmd,x+12,y-52-i*11,8.6,l)); x+=176;});
    y-=154; rect(44,y-58,507,58,'0.96 0.91 0.82'); drawText(cmd,58,y-20,11,PL.maps,'F2','0.22 0.08 0.03'); wrap(route.maps||PL.mapsFallback,92).slice(0,2).forEach((l,i)=>drawText(cmd,58,y-38-i*11,8.2,l));
    drawText(cmd,44,36,8,PL.footer,'F1','0.33 0.30 0.26');
    const stream=ops.join('\n'); const objs=[]; objs.push('1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj'); objs.push('2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj'); objs.push('3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >> endobj'); objs.push('4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj'); objs.push('5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >> endobj'); objs.push(`6 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`);
    let pdf='%PDF-1.4\n',xref=[0]; objs.forEach(o=>{xref.push(pdf.length); pdf+=o+'\n'}); const start=pdf.length; pdf+=`xref\n0 ${objs.length+1}\n0000000000 65535 f \n`+xref.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n ').join('\n')+`\ntrailer << /Size ${objs.length+1} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`;
    const blob=new Blob([pdf],{type:'application/pdf'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`carnet-${clean(route.section).toLowerCase().replace(/\s+/g,'-')}.pdf`; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);
  }
  document.addEventListener('click',e=>{const b=e.target.closest('[data-clean-pdf],.download-route-pdf-clean'); if(!b)return; e.preventDefault(); e.stopImmediatePropagation(); makeCleanPdf();},true);
  window.mcnDownloadRoutePdf=makeCleanPdf;

  // DOMContentLoaded lang: handled by lang_fix.js
})();
