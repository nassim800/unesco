/* =============================================================
   M.C.N. — PREMIUM FINISH LAYER  (charge en DERNIER)
   - Séparateurs éditoriaux (storytelling) sur l'accueil
   - Modales de profondeur élégantes (Histoire / Architecture /
     Préservation) avec contenu réel et bilingue
   - Frise chronologique cliquable -> scroll + fiche dynastie
   - Robustesse traduction FR/EN sur tout le contenu injecté
   - Ambiance sonore : musique traditionnelle chinoise (guzheng,
     gamme pentatonique) — aucun fichier externe requis, et un
     emplacement prêt pour votre propre MP3.
   Couche 100% additive : ne touche à aucune fonction existante.
   ============================================================= */
(function () {
  "use strict";

  /* ---------- Helpers & i18n ---------- */
  const onReady = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn)
      : fn();

  const lang = () =>
    document.documentElement.classList.contains("is-english") ||
    localStorage.getItem("mcn-lang") === "en"
      ? "en"
      : "fr";
  const t = (o) => (typeof o === "string" ? o : o[lang()] || o.fr || "");

  // Abonnés au changement de langue (pour re-render du contenu injecté)
  const langSubs = new Set();
  function onLangChange(fn) { langSubs.add(fn); }
  function fireLangChange() { langSubs.forEach((f) => { try { f(); } catch (e) {} }); }

  // On observe la classe is-english de <html> (que pose le système existant)
  let lastEnglish = document.documentElement.classList.contains("is-english");
  new MutationObserver(() => {
    const now = document.documentElement.classList.contains("is-english");
    if (now !== lastEnglish) { lastEnglish = now; fireLangChange(); }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  /* =============================================================
     1) MODALE DE PROFONDEUR
     ============================================================= */
  let modalRoot, modalEl, mediaEl, sealEl, bodyEl, lastFocus, currentData = null;
  const DYNASTY_ORDER = ["XIA", "SHANG", "ZHOU", "ROYAUMES", "QIN", "HAN", "TANG", "SONG", "YUAN", "MING", "AUJOURD'HUI"];

  function buildModal() {
    modalRoot = document.createElement("div");
    modalRoot.className = "mcn-modal-root";
    modalRoot.setAttribute("role", "dialog");
    modalRoot.setAttribute("aria-modal", "true");
    modalRoot.innerHTML =
      '<div class="mcn-modal-veil" data-close></div>' +
      '<div class="mcn-modal" role="document">' +
        '<button class="mcn-modal-close" type="button" aria-label="Fermer" data-close>×</button>' +
        '<div class="mcn-modal-media" aria-hidden="true"><span class="mcn-modal-seal"></span></div>' +
        '<div class="mcn-modal-body" tabindex="-1"></div>' +
      "</div>";
    document.body.appendChild(modalRoot);
    modalEl = modalRoot.querySelector(".mcn-modal");
    mediaEl = modalRoot.querySelector(".mcn-modal-media");
    sealEl = modalRoot.querySelector(".mcn-modal-seal");
    bodyEl = modalRoot.querySelector(".mcn-modal-body");

    modalRoot.addEventListener("click", (e) => {
      const nav = e.target.closest("[data-dynasty-nav]");
      if (nav && currentData && currentData.kind === "dynasty") {
        e.preventDefault();
        openDynastySibling(nav.dataset.dynastyNav);
        return;
      }
      if (e.target.hasAttribute("data-close")) closeModal();
    });
    let swipeStartX = 0;
    modalEl.addEventListener("touchstart", (e) => {
      swipeStartX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : 0;
    }, { passive: true });
    modalEl.addEventListener("touchend", (e) => {
      if (!currentData || currentData.kind !== "dynasty" || !swipeStartX) return;
      const endX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : swipeStartX;
      const dx = endX - swipeStartX;
      if (Math.abs(dx) > 72) openDynastySibling(dx < 0 ? "next" : "prev");
      swipeStartX = 0;
    }, { passive: true });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modalRoot.classList.contains("is-open")) closeModal(); });
    onLangChange(() => { if (currentData) renderModal(currentData); });
  }

  function renderModal(data) {
    modalEl.classList.toggle("mcn-dynasty-modal", data.kind === "dynasty");
    const seal = t(data.seal || "");
    if (data.image) {
      modalEl.classList.add("has-media");
      mediaEl.style.backgroundImage = `url("${data.image}")`;
      mediaEl.style.display = "";
      sealEl.textContent = seal;
    } else {
      modalEl.classList.remove("has-media");
      mediaEl.style.display = "none";
    }
    let html = "";
    if (data.kicker) html += `<span class="mcn-modal-kicker">${t(data.kicker)}</span>`;
    html += `<h2 class="mcn-modal-title">${t(data.title)}</h2>`;
    if (data.sub) html += `<p class="mcn-modal-sub">${t(data.sub)}</p>`;
    (data.paras || []).forEach((p) => (html += `<p>${t(p)}</p>`));
    if (data.facts && data.facts.length) {
      html += '<ul class="mcn-modal-facts">';
      data.facts.forEach((f) => (html += `<li><strong>${t(f.value)}</strong><span>${t(f.label)}</span></li>`));
      html += "</ul>";
    }
    (data.blocks || []).forEach((b) => {
      html += `<h4>${t(b.h)}</h4>`;
      (b.paras || []).forEach((p) => (html += `<p>${t(p)}</p>`));
    });
    if (data.tip) html += `<p class="mcn-modal-tip">${t(data.tip)}</p>`;
    if (data.kind === "dynasty") {
      html += '<div class="mcn-dynasty-nav">';
      html += `<button type="button" data-dynasty-nav="prev">${t({ fr: "Précédent", en: "Previous" })}</button>`;
      html += `<span>${t({ fr: "Glissez ou utilisez les boutons pour parcourir les dynasties", en: "Swipe or use the buttons to browse dynasties" })}</span>`;
      html += `<button type="button" data-dynasty-nav="next">${t({ fr: "Suivant", en: "Next" })}</button>`;
      html += "</div>";
    }
    bodyEl.innerHTML = html;
    modalRoot.querySelector(".mcn-modal-close").setAttribute("aria-label", lang() === "en" ? "Close" : "Fermer");
  }

  function openModal(data) {
    if (!modalRoot) buildModal();
    currentData = data;
    renderModal(data);
    lastFocus = document.activeElement;
    document.body.classList.add("mcn-modal-open");
    modalRoot.classList.add("is-open");
    requestAnimationFrame(() => bodyEl.focus());
  }
  function closeModal() {
    if (!modalRoot) return;
    modalRoot.classList.remove("is-open");
    document.body.classList.remove("mcn-modal-open");
    currentData = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function openDynastySibling(direction) {
    const key = currentData && currentData.dynKey;
    const i = DYNASTY_ORDER.indexOf(key);
    if (i < 0) return;
    const offset = direction === "prev" ? -1 : 1;
    const next = DYNASTY_ORDER[(i + offset + DYNASTY_ORDER.length) % DYNASTY_ORDER.length];
    openModal(dynastyPayload(next));
  }

  // attache un déclencheur de modale à une carte existante
  function makeDeep(el, data, options = {}) {
    if (!el || el.dataset.mcnDeep) return;
    el.dataset.mcnDeep = "1";
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    const open = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      openModal(data);
    };
    // mention « Découvrir » discrète
    const more = document.createElement("span");
    more.className = "mcn-more";
    more.setAttribute("data-mcn-more", "1");
    more.setAttribute("tabindex", "0");
    more.setAttribute("role", "button");
    more.textContent = t({ fr: "En savoir plus", en: "Learn more" });
    const target = el.classList.contains("timeline-item") ? (el.querySelector(".timeline-content") || el) : el;
    target.appendChild(more);
    more.addEventListener("click", open);
    more.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") open(e); });
    if (options.revealFirst) {
      const reveal = (e) => {
        if (e.target && e.target.closest && e.target.closest("[data-mcn-more]")) return;
        e.preventDefault();
        more.classList.add("is-visible");
        el.classList.add("mcn-more-visible");
        more.focus({ preventScroll: true });
      };
      el.addEventListener("click", reveal);
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") reveal(e); });
    } else {
      el.addEventListener("click", open);
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") open(e); });
    }
    onLangChange(() => (more.textContent = t({ fr: "En savoir plus", en: "Learn more" })));
  }
  // récupère l'image déjà présente dans la carte (réutilise vos assets)
  const imgOf = (el) => { const i = el && el.querySelector("img"); return i ? i.getAttribute("src") : null; };

  /* =============================================================
     2) CONTENU DES FICHES (réel, bilingue)
     ============================================================= */

  // ---- HISTOIRE : Construction / Matériaux / Travailleurs ----
  const HISTOIRE_CARDS = {
    "Construction": {
      seal: "建", kicker: { fr: "Histoire · Savoir-faire", en: "History · Craft" },
      title: { fr: "La Construction", en: "Construction" },
      sub: { fr: "Bâtir une montagne fortifiée", en: "Building a fortified mountain" },
      paras: [
        { fr: "Élever un mur sur des crêtes à plus de 1 000 m d'altitude était un défi logistique colossal. Les bâtisseurs adaptaient la technique au terrain : terre damée dans les plaines et les déserts, pierre taillée en montagne, brique cuite près des fours impériaux.", en: "Raising a wall along ridges above 1,000 m was a colossal logistical challenge. Builders matched the method to the terrain: rammed earth on plains and deserts, dressed stone in the mountains, fired brick near the imperial kilns." },
        { fr: "La terre était compactée couche par couche entre des coffrages de bois (technique du « hangtu »), puis le mur gagnait un parement de pierre ou de brique. Sur les pentes, des rampes, des poulies et des paniers en file acheminaient blocs et mortier à dos d'homme, de mule ou de chèvre.", en: "Earth was compacted layer by layer between wooden formwork (the “hangtu” technique), then faced with stone or brick. On slopes, ramps, pulleys and human chains carried blocks and mortar on the backs of men, mules and even goats." },
      ],
      facts: [
        { value: { fr: "+2 000 ans", en: "+2,000 yrs" }, label: { fr: "de chantiers successifs", en: "of successive works" } },
        { value: { fr: "Hangtu", en: "Hangtu" }, label: { fr: "terre damée en coffrage", en: "rammed-earth formwork" } },
      ],
      tip: { fr: "Chaque dynastie ne rebâtissait pas tout : elle prolongeait, doublait ou réparait l'œuvre des précédentes.", en: "Each dynasty rarely rebuilt everything: it extended, doubled or repaired the work of its predecessors." },
    },
    "Matériaux": {
      seal: "材", kicker: { fr: "Histoire · Matériaux", en: "History · Materials" },
      title: { fr: "Les Matériaux", en: "Materials" },
      sub: { fr: "Le secret de la longévité", en: "The secret of longevity" },
      paras: [
        { fr: "La résistance millénaire de la Muraille doit beaucoup à un mortier étonnant : un mélange de chaux et de soupe de riz gluant. L'amylopectine du riz crée un liant organique d'une cohésion remarquable — si dense que les herbes peinent à s'y enraciner et qu'il résiste mieux aux séismes que bien des ciments modernes.", en: "The Wall's thousand-year endurance owes much to a surprising mortar: a blend of lime and sticky-rice soup. The rice's amylopectin forms a remarkably cohesive organic binder — so dense that weeds struggle to take root and that it withstands earthquakes better than many modern cements." },
        { fr: "Pour le reste, tout était local : granit et calcaire des montagnes, briques cuites sous les Ming, roseaux et tamaris liés en fascines dans les zones désertiques du nord-ouest où la pierre manquait.", en: "Everything else was local: granite and limestone from the mountains, fired bricks under the Ming, and reeds and tamarisk bound into bundles in the north-western deserts where stone was scarce." },
      ],
      facts: [
        { value: { fr: "Riz gluant", en: "Sticky rice" }, label: { fr: "+ chaux = mortier", en: "+ lime = mortar" } },
        { value: { fr: "Local", en: "Local" }, label: { fr: "pierre, brique, roseaux", en: "stone, brick, reeds" } },
      ],
      tip: { fr: "Sans four ni transport routier, la règle d'or était simple : utiliser ce que la montagne offrait sur place.", en: "Without kilns or road transport, the golden rule was simple: use whatever the mountain offered on the spot." },
    },
    "Travailleurs": {
      seal: "工", kicker: { fr: "Histoire · Hommes", en: "History · People" },
      title: { fr: "Les Travailleurs", en: "The Workers" },
      sub: { fr: "Un effort humain démesuré", en: "An immense human effort" },
      paras: [
        { fr: "Soldats en garnison, paysans réquisitionnés, prisonniers et condamnés : des centaines de milliers d'hommes se sont relayés sur les chantiers, parfois pour ne jamais en revenir. La Muraille est surnommée « le plus long cimetière du monde ».", en: "Garrison soldiers, conscripted peasants, prisoners and convicts: hundreds of thousands of people worked the sites in shifts, some never to return. The Wall is nicknamed “the longest cemetery in the world.”" },
        { fr: "Contrairement à la légende, les corps n'étaient pas scellés dans la maçonnerie : les archéologues les retrouvent dans des fosses proches du tracé. Le chantier nourrissait aussi villages d'artisans, fours à briques, routes de ravitaillement — toute une économie du mur.", en: "Contrary to legend, bodies were not sealed into the masonry: archaeologists find them in pits near the route. The works also sustained villages of artisans, brick kilns and supply roads — a whole economy of the wall." },
      ],
      facts: [
        { value: { fr: "~1 M", en: "~1 M" }, label: { fr: "morts estimés (légendaire)", en: "estimated deaths (legendary)" } },
        { value: { fr: "Corvée", en: "Corvée" }, label: { fr: "travail imposé par l'État", en: "state-imposed labour" } },
      ],
      tip: { fr: "Derrière la prouesse architecturale, la Muraille raconte d'abord une histoire humaine, faite de sacrifices.", en: "Behind the architectural feat, the Wall is first of all a human story, made of sacrifice." },
    },
  };

  // ---- HISTOIRE : dynasties (frise + timeline) ----
  const DYNASTIES = {
    XIA: { seal: "夏", title: { fr: "Dynastie Xia", en: "Xia Dynasty" }, sub: { fr: "~2070–1600 av. J.-C.", en: "~2070–1600 BCE" },
      paras: [ { fr: "Première dynastie semi-légendaire de Chine. On lui attribue les premiers grands travaux de drainage et de digues qui posent, bien avant le mur, l'idée d'un contrôle organisé du territoire et de l'eau.", en: "China's first semi-legendary dynasty. It is credited with the earliest large drainage works and dykes that established, long before the wall, the idea of an organised control of land and water." } ],
      facts: [ { value: "夏", label: { fr: "premiers ouvrages", en: "first works" } } ] },
    SHANG: { seal: "商", title: { fr: "Dynastie Shang", en: "Shang Dynasty" }, sub: { fr: "~1600–1046 av. J.-C.", en: "~1600–1046 BCE" },
      paras: [ { fr: "Les Shang élèvent de puissants remparts de terre damée autour de leurs cités royales (comme Zhengzhou). C'est la naissance de la fortification urbaine chinoise, matrice technique des futures murailles.", en: "The Shang raised powerful rammed-earth ramparts around their royal cities (such as Zhengzhou). This was the birth of Chinese urban fortification, the technical matrix of the future walls." } ],
      facts: [ { value: { fr: "Terre damée", en: "Rammed earth" }, label: { fr: "remparts urbains", en: "urban ramparts" } } ] },
    ZHOU: { seal: "周", title: { fr: "Dynastie Zhou", en: "Zhou Dynasty" }, sub: { fr: "~1046–256 av. J.-C.", en: "~1046–256 BCE" },
      paras: [ { fr: "Sous les Zhou, les seigneuries multiplient les murs frontaliers entre États rivaux. Ces remparts régionaux dispersés sont les véritables ancêtres de la Grande Muraille.", en: "Under the Zhou, lordships multiplied border walls between rival states. These scattered regional ramparts are the true ancestors of the Great Wall." } ],
      facts: [ { value: { fr: "Murs d'États", en: "State walls" }, label: { fr: "prémices du tracé", en: "the route's seeds" } } ] },
    ROYAUMES: { seal: "戰", title: { fr: "Royaumes Combattants", en: "Warring States" }, sub: { fr: "481–221 av. J.-C.", en: "481–221 BCE" },
      paras: [ { fr: "Période de guerres permanentes entre sept grands royaumes. Chacun fortifie ses frontières : Qin, Zhao et Yan bâtissent au nord de longs murs contre les nomades. Qin Shi Huang n'aura plus qu'à les relier.", en: "A period of constant war among seven great kingdoms. Each fortified its borders: Qin, Zhao and Yan built long northern walls against the nomads. Qin Shi Huang would only need to connect them." } ],
      facts: [ { value: { fr: "7 royaumes", en: "7 kingdoms" }, label: { fr: "murs concurrents", en: "competing walls" } } ] },
    QIN: { seal: "秦", title: { fr: "Dynastie Qin", en: "Qin Dynasty" }, sub: { fr: "221–206 av. J.-C.", en: "221–206 BCE" },
      paras: [ { fr: "Qin Shi Huang unifie la Chine et ordonne de relier les murs du nord en une barrière continue contre les Xiongnu. Le général Meng Tian y aurait employé des centaines de milliers d'hommes. C'est la première « Grande » Muraille.", en: "Qin Shi Huang unified China and ordered the northern walls linked into a continuous barrier against the Xiongnu. General Meng Tian is said to have employed hundreds of thousands of men. This was the first “Great” Wall." } ],
      facts: [ { value: { fr: "1ʳᵉ unifiée", en: "1st unified" }, label: { fr: "barrière continue", en: "continuous barrier" } }, { value: "Meng Tian", label: { fr: "général bâtisseur", en: "builder general" } } ] },
    HAN: { seal: "漢", title: { fr: "Dynastie Han", en: "Han Dynasty" }, sub: { fr: "206 av. J.-C.–220", en: "206 BCE–220 CE" },
      paras: [ { fr: "Les Han prolongent la Muraille vers l'ouest, jusqu'aux confins du désert de Gobi, pour protéger la Route de la Soie. Ils perfectionnent les tours à signaux de fumée, capables de transmettre une alerte sur des centaines de kilomètres en quelques heures.", en: "The Han extended the Wall westward to the edges of the Gobi to protect the Silk Road. They perfected smoke-signal towers able to relay an alert over hundreds of kilometres within hours." } ],
      facts: [ { value: { fr: "Route de la Soie", en: "Silk Road" }, label: { fr: "extension ouest", en: "western extension" } }, { value: { fr: "Signaux", en: "Signals" }, label: { fr: "fumée & feu", en: "smoke & fire" } } ] },
    TANG: { seal: "唐", title: { fr: "Dynastie Tang", en: "Tang Dynasty" }, sub: { fr: "618–907", en: "618–907" },
      paras: [ { fr: "Apogée culturel de la Chine, les Tang dominent largement leurs voisins du nord et privilégient la diplomatie et les garnisons mobiles à la fortification. La construction marque une longue pause, mais les sections existantes restent entretenues.", en: "At China's cultural zenith, the Tang largely dominated their northern neighbours and favoured diplomacy and mobile garrisons over fortification. Construction paused for a long time, though existing sections were maintained." } ],
      facts: [ { value: { fr: "Pause", en: "Pause" }, label: { fr: "diplomatie privilégiée", en: "diplomacy favoured" } } ] },
    SONG: { seal: "宋", title: { fr: "Dynastie Song", en: "Song Dynasty" }, sub: { fr: "960–1279", en: "960–1279" },
      paras: [ { fr: "Pressés par les empires Liao puis Jin au nord, les Song renforcent leurs défenses et innovent (arbalètes, poudre à canon). Mais la perte du nord les prive d'une grande partie du tracé historique du mur.", en: "Pressured by the Liao and then Jin empires to the north, the Song strengthened their defences and innovated (crossbows, gunpowder). Yet the loss of the north deprived them of much of the wall's historic route." } ],
      facts: [ { value: { fr: "Poudre", en: "Gunpowder" }, label: { fr: "premières armes à feu", en: "early firearms" } } ] },
    YUAN: { seal: "元", title: { fr: "Dynastie Yuan", en: "Yuan Dynasty" }, sub: { fr: "1271–1368", en: "1271–1368" },
      paras: [ { fr: "Fondée par Kubilaï Khan, la dynastie mongole règne sur toute la Chine : la Muraille perd sa raison d'être défensive et la construction est suspendue. Les structures, elles, demeurent et seront réinvesties plus tard.", en: "Founded by Kublai Khan, the Mongol dynasty ruled all of China: the Wall lost its defensive purpose and construction was suspended. The structures, however, remained and would be reused later." } ],
      facts: [ { value: { fr: "Mongols", en: "Mongols" }, label: { fr: "mur sans usage", en: "wall without use" } } ] },
    MING: { seal: "明", title: { fr: "Dynastie Ming", en: "Ming Dynasty" }, sub: { fr: "1368–1644", en: "1368–1644" },
      paras: [ { fr: "C'est l'âge d'or et le visage actuel de la Muraille. Face aux Mongols, les Ming reconstruisent en briques cuites et pierre de taille, dressent des milliers de tours de guet massives, doublent et triplent les lignes. Badaling, Mutianyu, Jinshanling et Simatai datent de cette époque.", en: "This is the golden age and the present face of the Wall. Against the Mongols, the Ming rebuilt in fired brick and dressed stone, raised thousands of massive watchtowers, and doubled or tripled the lines. Badaling, Mutianyu, Jinshanling and Simatai date from this era." } ],
      facts: [ { value: { fr: "Âge d'or", en: "Golden age" }, label: { fr: "briques & tours", en: "bricks & towers" } }, { value: "25 000+", label: { fr: "tours de guet", en: "watchtowers" } } ] },
    "AUJOURD'HUI": { seal: "今", title: { fr: "Aujourd'hui", en: "Today" }, sub: { fr: "Patrimoine mondial depuis 1987", en: "World Heritage since 1987" },
      paras: [ { fr: "De rempart militaire, la Muraille est devenue trésor de l'humanité. Inscrite à l'UNESCO en 1987, elle est désormais protégée, restaurée et numérisée (scans LiDAR, jumeau 3D). Elle reste le symbole universel de la Chine et l'un des sites les plus visités au monde.", en: "From a military rampart, the Wall became a treasure of humanity. Listed by UNESCO in 1987, it is now protected, restored and digitised (LiDAR scans, 3D twin). It remains the universal symbol of China and one of the most visited sites on Earth." } ],
      facts: [ { value: "1987", label: { fr: "inscription UNESCO", en: "UNESCO listing" } }, { value: "10M+", label: { fr: "visiteurs / an", en: "visitors / yr" } } ] },
  };
  const DYNASTY_DEEP = {
    XIA: {
      image: "xia.jpeg",
      blocks: [
        { h: { fr: "Apparition", en: "Rise" }, paras: [
          { fr: "La Xia reste une dynastie de seuil : entre récit fondateur, archéologie de l'âge du bronze et premières formes d'autorité sur les vallées du fleuve Jaune. Son importance pour la Muraille tient moins à un mur construit qu'à une idée nouvelle : organiser un territoire, maîtriser l'eau et imposer un centre politique.", en: "The Xia stands at a threshold: between founding narrative, Bronze Age archaeology and early forms of authority over the Yellow River valleys. Its importance for the Wall lies less in a built wall than in a new idea: organising territory, controlling water and imposing a political centre." }
        ] },
        { h: { fr: "Ce qui change", en: "What changed" }, paras: [
          { fr: "Les grands travaux hydrauliques attribués à Yu le Grand installent une culture de chantier collectif. Digues, canaux et levées préfigurent la logique de mobilisation qui rendra possible, plus tard, les ouvrages défensifs de grande échelle.", en: "The hydraulic works attributed to Yu the Great created a culture of collective construction. Dykes, canals and levees foreshadowed the mobilisation logic that would later make large defensive works possible." }
        ] },
        { h: { fr: "Fin et héritage", en: "Fall and legacy" }, paras: [
          { fr: "La tradition raconte que la Xia s'efface au profit des Shang après l'affaiblissement de son dernier souverain. Son héritage est celui d'un premier imaginaire impérial : contrôler la nature pour tenir le pays.", en: "Tradition says the Xia gave way to the Shang after the weakening of its last ruler. Its legacy is an early imperial imagination: controlling nature in order to hold the country together." }
        ] }
      ]
    },
    SHANG: {
      image: "shang.jpeg",
      blocks: [
        { h: { fr: "Apparition", en: "Rise" }, paras: [
          { fr: "Les Shang s'imposent dans le nord de la Chine avec des capitales fortifiées, une métallurgie du bronze très avancée et un pouvoir royal structuré autour des rites. Les villes deviennent des centres défensifs autant que politiques.", en: "The Shang rose in northern China with fortified capitals, advanced bronze metallurgy and a royal power structured around ritual. Cities became defensive centres as much as political ones." }
        ] },
        { h: { fr: "Lien avec la Muraille", en: "Link with the Wall" }, paras: [
          { fr: "Les grands remparts de terre damée des cités Shang ne sont pas encore la Grande Muraille, mais ils donnent la technique : coffrage, couches compactées, rythme de chantier, contrôle des accès et protection de zones de pouvoir.", en: "The large rammed-earth ramparts of Shang cities were not yet the Great Wall, but they provided the technique: formwork, compacted layers, building rhythm, access control and protection of centres of power." }
        ] },
        { h: { fr: "Fin et héritage", en: "Fall and legacy" }, paras: [
          { fr: "Les Zhou renversent les Shang au XIe siècle av. J.-C. La culture du rempart urbain reste pourtant essentielle et se diffuse dans les États qui se partageront bientôt le territoire chinois.", en: "The Zhou overthrew the Shang in the 11th century BCE. Yet the culture of urban ramparts remained essential and spread among the states that would soon divide Chinese territory." }
        ] }
      ]
    },
    ZHOU: {
      image: "zhou.jpeg",
      blocks: [
        { h: { fr: "Apparition", en: "Rise" }, paras: [
          { fr: "Les Zhou établissent un ordre féodal très vaste. Le pouvoir central confie des terres à des lignages alliés, ce qui crée progressivement des principautés puissantes, autonomes et concurrentes.", en: "The Zhou established a vast feudal order. The central power entrusted lands to allied lineages, gradually creating powerful, autonomous and competing principalities." }
        ] },
        { h: { fr: "Des frontières fortifiées", en: "Fortified borders" }, paras: [
          { fr: "À mesure que l'autorité royale s'affaiblit, les États construisent des murs pour défendre leurs plaines, contrôler les routes et marquer leurs frontières. La Muraille naît d'abord comme une constellation de murs locaux.", en: "As royal authority weakened, states built walls to defend their plains, control routes and mark their borders. The Wall was born first as a constellation of local walls." }
        ] },
        { h: { fr: "Fin et héritage", en: "Fall and legacy" }, paras: [
          { fr: "La période se fragmente en Printemps et Automnes puis Royaumes Combattants. Cette fragmentation transforme l'architecture défensive en outil permanent de stratégie politique.", en: "The period fragmented into the Spring and Autumn era and then the Warring States. This fragmentation turned defensive architecture into a permanent tool of political strategy." }
        ] }
      ]
    },
    ROYAUMES: {
      image: "royaumes.jpeg",
      blocks: [
        { h: { fr: "Apparition", en: "Rise" }, paras: [
          { fr: "Entre grands royaumes rivaux, la guerre devient continue. Qin, Zhao, Yan, Wei et d'autres États fortifient leurs frontières, non seulement contre les voisins chinois, mais aussi contre les peuples nomades du nord.", en: "Among rival kingdoms, warfare became continuous. Qin, Zhao, Yan, Wei and other states fortified their borders, not only against Chinese neighbours but also against northern nomadic peoples." }
        ] },
        { h: { fr: "Le laboratoire du mur", en: "The wall laboratory" }, paras: [
          { fr: "Les techniques se diversifient : terre damée, fossés, tours, portes et lignes doubles. Ces murs fragmentés forment le matériau politique que Qin Shi Huang reliera après l'unification.", en: "Techniques diversified: rammed earth, ditches, towers, gates and double lines. These fragmented walls formed the political material Qin Shi Huang would connect after unification." }
        ] },
        { h: { fr: "Fin et héritage", en: "Fall and legacy" }, paras: [
          { fr: "La victoire de Qin en 221 av. J.-C. met fin à la période. L'héritage majeur est une carte de frontières déjà militarisées, prête à devenir un système impérial.", en: "Qin's victory in 221 BCE ended the period. The major legacy was a map of already militarised borders, ready to become an imperial system." }
        ] }
      ]
    },
    QIN: {
      image: "qin.jpeg",
      blocks: [
        { h: { fr: "Apparition", en: "Rise" }, paras: [
          { fr: "Qin Shi Huang unifie la Chine en 221 av. J.-C. et impose une administration centralisée. La frontière nord devient un enjeu impérial : protéger l'empire neuf contre les Xiongnu et afficher l'autorité du premier empereur.", en: "Qin Shi Huang unified China in 221 BCE and imposed a centralised administration. The northern border became an imperial issue: protecting the new empire against the Xiongnu and displaying the First Emperor's authority." }
        ] },
        { h: { fr: "La première Grande Muraille", en: "The first Great Wall" }, paras: [
          { fr: "Les murs antérieurs de Qin, Zhao et Yan sont reliés, réparés ou prolongés. Le général Meng Tian dirige une mobilisation massive. La construction est rapide, souvent en terre damée, et répond à une urgence militaire.", en: "Earlier Qin, Zhao and Yan walls were connected, repaired or extended. General Meng Tian led a massive mobilisation. Construction was rapid, often in rammed earth, and answered a military emergency." }
        ] },
        { h: { fr: "Fin et héritage", en: "Fall and legacy" }, paras: [
          { fr: "La dynastie Qin tombe vite, en 206 av. J.-C., minée par la dureté du régime et les révoltes. Mais l'idée d'une frontière monumentale, continue et impériale survit durablement.", en: "The Qin dynasty fell quickly, in 206 BCE, weakened by harsh rule and rebellions. But the idea of a monumental, continuous and imperial frontier endured." }
        ] }
      ]
    },
    HAN: {
      image: "han.jpeg",
      blocks: [
        { h: { fr: "Apparition", en: "Rise" }, paras: [
          { fr: "Les Han reprennent l'héritage Qin mais l'inscrivent dans une politique plus durable. L'empire se consolide, s'étend vers l'ouest et ouvre les routes qui deviendront la Route de la Soie.", en: "The Han inherited Qin structures but embedded them in a longer-lasting policy. The empire consolidated, expanded westward and opened the routes that would become the Silk Road." }
        ] },
        { h: { fr: "Muraille et commerce", en: "Wall and trade" }, paras: [
          { fr: "Les défenses avancent jusqu'aux portes du désert de Gobi. Tours de signal, garnisons, relais et postes frontaliers protègent les caravanes, les envoyés diplomatiques et les zones agricoles conquises.", en: "Defences advanced toward the Gobi Desert. Signal towers, garrisons, relays and frontier posts protected caravans, diplomatic envoys and conquered agricultural zones." }
        ] },
        { h: { fr: "Fin et héritage", en: "Fall and legacy" }, paras: [
          { fr: "Après 220, l'empire se divise. Les lignes Han deviennent des repères de contrôle territorial et de communication militaire pour les dynasties suivantes.", en: "After 220 CE, the empire split. Han lines became reference points for territorial control and military communication for later dynasties." }
        ] }
      ]
    },
    TANG: {
      image: "tang.jpeg",
      blocks: [
        { h: { fr: "Apparition", en: "Rise" }, paras: [
          { fr: "Les Tang installent l'un des grands âges culturels de la Chine. Capitale cosmopolite, administration solide, échanges internationaux : l'empire préfère souvent la diplomatie, les alliances et les garnisons mobiles aux murs continus.", en: "The Tang created one of China's great cultural ages. A cosmopolitan capital, strong administration and international exchanges meant the empire often preferred diplomacy, alliances and mobile garrisons to continuous walls." }
        ] },
        { h: { fr: "Une pause stratégique", en: "A strategic pause" }, paras: [
          { fr: "La Muraille n'est pas abandonnée, mais elle n'est plus l'outil principal de défense. Les Tang entretiennent des points clés et s'appuient sur la puissance militaire et l'influence culturelle.", en: "The Wall was not abandoned, but it was no longer the main defensive tool. The Tang maintained key points and relied on military power and cultural influence." }
        ] },
        { h: { fr: "Fin et héritage", en: "Fall and legacy" }, paras: [
          { fr: "Les rébellions internes et la montée des pouvoirs régionaux affaiblissent la dynastie. Son héritage rappelle que la Muraille n'est jamais seulement un mur : elle dépend du contexte diplomatique et militaire.", en: "Internal rebellions and rising regional powers weakened the dynasty. Its legacy reminds us that the Wall is never only a wall: it depends on diplomatic and military context." }
        ] }
      ]
    },
    SONG: {
      image: "song.jpeg",
      blocks: [
        { h: { fr: "Apparition", en: "Rise" }, paras: [
          { fr: "Les Song réunifient une grande partie de la Chine, mais doivent composer avec de puissants voisins au nord, notamment les Liao puis les Jin. L'équilibre militaire devient instable.", en: "The Song reunified much of China but had to deal with powerful northern neighbours, notably the Liao and then the Jin. The military balance became unstable." }
        ] },
        { h: { fr: "Innovation défensive", en: "Defensive innovation" }, paras: [
          { fr: "L'époque est marquée par les progrès techniques : arbalètes, poudre, organisation logistique. Les fortifications restent importantes, mais la perte de territoires du nord limite l'accès à de nombreux tronçons historiques.", en: "The era was marked by technical progress: crossbows, gunpowder and logistics. Fortifications remained important, but the loss of northern territories limited access to many historic sections." }
        ] },
        { h: { fr: "Fin et héritage", en: "Fall and legacy" }, paras: [
          { fr: "La conquête mongole met fin aux Song en 1279. Leur héritage est celui d'une défense savante, où la technologie complète le mur sans pouvoir toujours compenser la pression géopolitique.", en: "The Mongol conquest ended the Song in 1279. Their legacy is one of learned defence, where technology complemented the wall without always compensating for geopolitical pressure." }
        ] }
      ]
    },
    YUAN: {
      image: "yuan.jpeg",
      blocks: [
        { h: { fr: "Apparition", en: "Rise" }, paras: [
          { fr: "Fondée par Kubilaï Khan, la dynastie Yuan place la Chine au cœur de l'empire mongol. La frontière nord n'est plus une limite extérieure : elle est intégrée à un espace impérial beaucoup plus vaste.", en: "Founded by Kublai Khan, the Yuan dynasty placed China at the heart of the Mongol empire. The northern frontier was no longer an external limit: it was integrated into a much larger imperial space." }
        ] },
        { h: { fr: "Le mur suspendu", en: "The suspended wall" }, paras: [
          { fr: "La construction ralentit fortement. La Muraille perd son rôle immédiat contre les peuples venus du nord, puisque ceux-ci gouvernent désormais l'empire. Les ouvrages existants subsistent comme traces et ressources.", en: "Construction slowed sharply. The Wall lost its immediate role against northern peoples, since they now ruled the empire. Existing structures survived as traces and resources." }
        ] },
        { h: { fr: "Fin et héritage", en: "Fall and legacy" }, paras: [
          { fr: "Les révoltes et l'affaiblissement du pouvoir mongol ouvrent la voie aux Ming. La pause Yuan rendra la reconstruction Ming d'autant plus massive et symbolique.", en: "Rebellions and the weakening of Mongol power opened the way for the Ming. The Yuan pause would make the Ming reconstruction even more massive and symbolic." }
        ] }
      ]
    },
    MING: {
      image: "ming.jpeg",
      blocks: [
        { h: { fr: "Apparition", en: "Rise" }, paras: [
          { fr: "Après avoir chassé les Yuan, les Ming doivent protéger la Chine restaurée contre les incursions mongoles. La frontière nord redevient une urgence stratégique et un symbole de souveraineté.", en: "After expelling the Yuan, the Ming had to protect restored China against Mongol incursions. The northern frontier again became a strategic urgency and a symbol of sovereignty." }
        ] },
        { h: { fr: "L'âge de la brique", en: "The age of brick" }, paras: [
          { fr: "Les Ming donnent à la Muraille son visage actuel : briques cuites, pierre taillée, tours de guet rapprochées, portes fortifiées, casernes et lignes multiples. Badaling, Mutianyu, Jinshanling ou Simatai portent cette signature.", en: "The Ming gave the Wall its present face: fired bricks, dressed stone, closely spaced watchtowers, fortified gates, barracks and multiple lines. Badaling, Mutianyu, Jinshanling and Simatai carry this signature." },
          { fr: "Le mortier à base de chaux et de riz gluant, la standardisation des briques et la densité des tours expliquent la résistance de nombreux tronçons visibles aujourd'hui.", en: "Lime-and-sticky-rice mortar, standardised bricks and dense watchtowers explain the durability of many sections visible today." }
        ] },
        { h: { fr: "Fin et héritage", en: "Fall and legacy" }, paras: [
          { fr: "La chute des Ming en 1644 ne vient pas d'un simple franchissement du mur, mais d'un enchaînement de crises internes et de basculements militaires. Leur héritage monumental est celui que le monde associe le plus à la Grande Muraille.", en: "The fall of the Ming in 1644 did not result from a simple crossing of the wall, but from internal crises and military shifts. Their monumental legacy is the one the world most associates with the Great Wall." }
        ] }
      ]
    },
    "AUJOURD'HUI": {
      image: "moderne.jpeg",
      blocks: [
        { h: { fr: "Patrimoine mondial", en: "World Heritage" }, paras: [
          { fr: "Depuis son inscription UNESCO en 1987, la Muraille est protégée comme un bien de valeur universelle exceptionnelle. Elle n'est plus seulement une frontière militaire : elle est un lieu de mémoire, de recherche, de tourisme et de diplomatie culturelle.", en: "Since its UNESCO listing in 1987, the Wall has been protected as a property of outstanding universal value. It is no longer only a military frontier: it is a place of memory, research, tourism and cultural diplomacy." }
        ] },
        { h: { fr: "Défis contemporains", en: "Contemporary challenges" }, paras: [
          { fr: "Érosion, fréquentation, urbanisation et restaurations trop visibles menacent son authenticité. La conservation actuelle cherche l'équilibre entre accès public, respect scientifique et surveillance numérique.", en: "Erosion, visitor pressure, urbanisation and overly visible restorations threaten its authenticity. Current conservation seeks a balance between public access, scientific respect and digital monitoring." }
        ] },
        { h: { fr: "Vers une médiation numérique", en: "Toward digital mediation" }, paras: [
          { fr: "Scans LiDAR, drones, jumeaux 3D et interfaces de visite permettent de comprendre la Muraille sans l'user. C'est précisément l'ambition de ce prototype : transformer la visite en expérience responsable.", en: "LiDAR scans, drones, 3D twins and visit interfaces make it possible to understand the Wall without wearing it down. This is precisely the ambition of this prototype: turning the visit into a responsible experience." }
        ] }
      ]
    }
  };
  // associe un libellé de frise/timeline à une clé DYNASTIES
  const dynKeyFromLabel = (s) => {
    const u = (s || "").toUpperCase();
    if (u.includes("XIA")) return "XIA";
    if (u.includes("SHANG")) return "SHANG";
    if (u.includes("ZHOU")) return "ZHOU";
    if (u.includes("ROYAUME") || u.includes("FÉODA") || u.includes("FEODA") || u.includes("COMBATTANT") || u.includes("WARRING") || u.includes("STATES")) return "ROYAUMES";
    if (u.includes("QIN")) return "QIN";
    if (u.includes("HAN")) return "HAN";
    if (u.includes("TANG")) return "TANG";
    if (u.includes("SONG")) return "SONG";
    if (u.includes("YUAN")) return "YUAN";
    if (u.includes("MING")) return "MING";
    if (u.includes("AUJOURD") || u.includes("MODERNE") || u.includes("TODAY")) return "AUJOURD'HUI";
    return null;
  };

  function dynastyPayload(key) {
    const item = [...document.querySelectorAll(".timeline-item")]
      .find((el) => dynKeyFromLabel(el.querySelector(".timeline-dynasty")?.textContent || el.querySelector(".timeline-title")?.textContent || "") === key);
    const data = Object.assign({ kind: "dynasty", dynKey: key }, DYNASTIES[key] || {}, DYNASTY_DEEP[key] || {});
    data.image = data.image || imgOf(item);
    return data;
  }

  // ---- ARCHITECTURE : éléments ----
  const ARCHI = {
    "Tours de guet": { seal: "塔", kicker: { fr: "Architecture", en: "Architecture" }, title: { fr: "Tours de guet", en: "Watchtowers" }, sub: { fr: "Les yeux et la mémoire du mur", en: "The eyes and memory of the wall" },
      paras: [ { fr: "Disposées tous les 90 à 180 mètres, les tours servaient à la fois de postes d'observation, de casernes pour la garnison et de dépôts d'armes et de vivres. Les plus grandes pouvaient loger une dizaine de soldats en permanence.", en: "Spaced every 90–180 metres, the towers served at once as lookouts, barracks for the garrison and stores of weapons and food. The largest could permanently house around ten soldiers." }, { fr: "Leur étagement permettait une défense en profondeur : tirer à couvert, communiquer par signaux d'une tour à l'autre, et tenir un point même si le mur voisin tombait.", en: "Their tiering allowed a defence in depth: firing under cover, signalling from tower to tower, and holding a point even if the neighbouring wall fell." } ],
      facts: [ { value: "90–180 m", label: { fr: "entre deux tours", en: "between towers" } }, { value: "25 000+", label: { fr: "tours recensées", en: "recorded towers" } } ] },
    "Matériaux": { seal: "材", kicker: { fr: "Architecture", en: "Architecture" }, title: { fr: "Matériaux", en: "Materials" }, sub: { fr: "Ce que la montagne offrait", en: "Whatever the mountain offered" },
      paras: [ { fr: "Terre battue dans les plaines, pierres locales en montagne, briques cuites liées au mortier de chaux et riz gluant sous les Ming : le choix dépendait toujours des ressources de chaque région et de l'époque.", en: "Rammed earth on the plains, local stone in the mountains, fired bricks bound with lime-and-sticky-rice mortar under the Ming: the choice always depended on each region's resources and on the period." } ],
      facts: [ { value: { fr: "Brique Ming", en: "Ming brick" }, label: { fr: "+ mortier riz gluant", en: "+ sticky-rice mortar" } } ] },
    "Forteresses & Passes": { seal: "關", kicker: { fr: "Architecture", en: "Architecture" }, title: { fr: "Forteresses & Passes", en: "Fortresses & Passes" }, sub: { fr: "Les verrous de l'empire", en: "The locks of the empire" },
      paras: [ { fr: "Aux points stratégiques se dressaient de véritables citadelles. À l'est, Shanhaiguan — « la Première Passe sous le Ciel » — verrouille la rencontre du mur et de la mer. À l'ouest, Jiayuguan garde l'entrée du corridor du Hexi, porte de la Route de la Soie.", en: "At strategic points stood true citadels. In the east, Shanhaiguan — “the First Pass Under Heaven” — locks the meeting of wall and sea. In the west, Jiayuguan guards the entrance to the Hexi corridor, gateway to the Silk Road." } ],
      facts: [ { value: "Shanhaiguan", label: { fr: "verrou est (mer)", en: "eastern lock (sea)" } }, { value: "Jiayuguan", label: { fr: "verrou ouest (désert)", en: "western lock (desert)" } } ] },
    "Postes de signal": { seal: "烽", kicker: { fr: "Architecture", en: "Architecture" }, title: { fr: "Postes de signal", en: "Signal Posts" }, sub: { fr: "L'internet de l'Antiquité", en: "Antiquity's internet" },
      paras: [ { fr: "Un réseau de tours à feu permettait de transmettre une alerte par fumée le jour et par flammes la nuit. Un code précis indiquait l'ampleur de la menace par le nombre de colonnes. Une nouvelle pouvait franchir des centaines de kilomètres en quelques heures.", en: "A network of fire towers relayed alerts by smoke in daytime and flame at night. A precise code signalled the scale of a threat through the number of columns. News could travel hundreds of kilometres within a few hours." } ],
      facts: [ { value: { fr: "Fumée / feu", en: "Smoke / fire" }, label: { fr: "code par colonnes", en: "code by columns" } } ] },
    "Chemin de ronde": { seal: "道", kicker: { fr: "Architecture", en: "Architecture" }, title: { fr: "Chemin de ronde", en: "Rampart Walk" }, sub: { fr: "Une route au sommet du monde", en: "A road atop the world" },
      paras: [ { fr: "Large de 4 à 5 mètres, le sommet pavé du mur formait une voie rapide militaire : plusieurs cavaliers pouvaient s'y croiser, et l'infanterie s'y déplacer à l'abri du parapet crénelé. C'était l'autoroute stratégique de la frontière.", en: "Four to five metres wide, the paved top of the wall formed a fast military road: several horsemen could pass abreast and infantry could move sheltered by the crenellated parapet. It was the frontier's strategic motorway." } ],
      facts: [ { value: "4–5 m", label: { fr: "largeur pavée", en: "paved width" } } ] },
    "Drainage": { seal: "水", kicker: { fr: "Architecture", en: "Architecture" }, title: { fr: "Drainage", en: "Drainage" }, sub: { fr: "Le génie discret de la durée", en: "The quiet engineering of endurance" },
      paras: [ { fr: "Si la Muraille a tenu des siècles, c'est aussi grâce à un détail invisible : la gestion de l'eau. Caniveaux, gargouilles et légère pente du chemin de ronde évacuaient les pluies pour empêcher l'eau de s'infiltrer et de désagréger le cœur en terre.", en: "If the Wall has stood for centuries, it is also thanks to an invisible detail: water management. Gutters, gargoyles and a slight slope on the rampart walk drained the rains to keep water from seeping in and crumbling the earthen core." } ],
      facts: [ { value: { fr: "Pente + gargouilles", en: "Slope + gargoyles" }, label: { fr: "anti-érosion", en: "anti-erosion" } } ] },
  };

  // ---- PRÉSERVATION : défis ----
  const DEFIS = {
    "Érosion naturelle": { seal: "蝕", kicker: { fr: "Préservation · Défi", en: "Preservation · Challenge" }, title: { fr: "Érosion naturelle", en: "Natural Erosion" }, sub: { fr: "Le temps, premier adversaire", en: "Time, the first adversary" },
      paras: [ { fr: "Gel, pluies, vent de sable et racines fragilisent en permanence la maçonnerie ancienne. Près d'un tiers des sections Ming a déjà disparu, et de longs tronçons en terre des dynasties anciennes s'effacent peu à peu du paysage.", en: "Frost, rain, sandstorms and roots constantly weaken the ancient masonry. Nearly a third of the Ming sections has already vanished, and long earthen stretches from older dynasties are slowly fading from the landscape." } ],
      facts: [ { value: { fr: "~30 %", en: "~30%" }, label: { fr: "sections Ming perdues", en: "Ming sections lost" } } ],
      tip: { fr: "La consolidation préventive coûte bien moins cher que la reconstruction d'une section effondrée.", en: "Preventive consolidation costs far less than rebuilding a collapsed section." } },
    "Pression touristique": { seal: "客", kicker: { fr: "Préservation · Défi", en: "Preservation · Challenge" }, title: { fr: "Pression touristique", en: "Tourist Pressure" }, sub: { fr: "Aimer le site sans l'user", en: "Loving the site without wearing it out" },
      paras: [ { fr: "Les sections les plus célèbres, comme Badaling, reçoivent des dizaines de millions de visiteurs. Piétinement, graffitis et déchets accélèrent l'usure. La réponse passe par des quotas, la billetterie en ligne, la répartition vers des sections moins fréquentées et la pédagogie.", en: "The most famous sections, such as Badaling, receive tens of millions of visitors. Foot traffic, graffiti and litter accelerate wear. The response lies in quotas, online ticketing, redirection toward less-visited sections and education." } ],
      facts: [ { value: "10M+", label: { fr: "visiteurs / an", en: "visitors / yr" } } ],
      tip: { fr: "Visiter une section secondaire (Jinshanling, Huanghuacheng) soulage les sites saturés.", en: "Visiting a secondary section (Jinshanling, Huanghuacheng) relieves the saturated ones." } },
    "Développement urbain": { seal: "城", kicker: { fr: "Préservation · Défi", en: "Preservation · Challenge" }, title: { fr: "Développement urbain", en: "Urban Development" }, sub: { fr: "La ville qui grignote l'histoire", en: "The city encroaching on history" },
      paras: [ { fr: "Routes, carrières, agriculture et expansion des villes ont parfois entamé ou coupé le tracé. Par le passé, des villageois ont aussi prélevé des briques pour bâtir maisons et étables. La loi chinoise de protection (2006) encadre désormais strictement ces atteintes.", en: "Roads, quarries, farming and urban sprawl have at times cut into or severed the route. In the past, villagers also took bricks to build homes and barns. China's protection law (2006) now strictly regulates such damage." } ],
      facts: [ { value: "2006", label: { fr: "loi de protection", en: "protection law" } } ],
      tip: { fr: "Cartographier précisément le tracé (LiDAR, satellite) est la première arme contre l'empiètement.", en: "Mapping the route precisely (LiDAR, satellite) is the first weapon against encroachment." } },
  };

  // ---- PRÉSERVATION : actions & initiatives (fiches enrichies) ----
  const ACTIONS = {
    "Éducation et sensibilisation": { seal: "教", kicker: { fr: "Action & Initiative", en: "Action & Initiative" }, title: { fr: "Éducation & sensibilisation", en: "Education & Awareness" }, sub: { fr: "Protéger, c'est d'abord faire comprendre", en: "To protect is first to make understood" },
      paras: [ { fr: "La préservation durable commence par la transmission. Programmes scolaires, visites guidées « patrimoine responsable », signalétique et dispositifs numériques (jumeau 3D, réalité augmentée) apprennent aux visiteurs pourquoi et comment respecter le site.", en: "Lasting preservation begins with transmission. School programmes, “responsible heritage” guided tours, signage and digital tools (3D twin, augmented reality) teach visitors why and how to respect the site." }, { fr: "C'est exactement la vocation de ce projet M.C.N. : rendre la Muraille lisible, accessible et désirable… sans l'abîmer.", en: "This is exactly the purpose of this M.C.N. project: to make the Wall legible, accessible and desirable… without harming it." } ],
      facts: [ { value: { fr: "Jeunesse", en: "Youth" }, label: { fr: "public prioritaire", en: "priority audience" } } ] },
    "Partenariats internationaux": { seal: "盟", kicker: { fr: "Action & Initiative", en: "Action & Initiative" }, title: { fr: "Partenariats internationaux", en: "International Partnerships" }, sub: { fr: "Un patrimoine de l'humanité, protégé ensemble", en: "A heritage of humanity, protected together" },
      paras: [ { fr: "La Muraille est inscrite sur la Liste du patrimoine mondial de l'UNESCO depuis 1987. Sa sauvegarde mobilise l'administration chinoise du patrimoine, des sociétés savantes comme la China Great Wall Society, des universités et des partenaires technologiques engagés dans la numérisation et la conservation préventive.", en: "The Wall has been on the UNESCO World Heritage List since 1987. Its safeguarding mobilises China's heritage administration, learned societies such as the China Great Wall Society, universities and technology partners engaged in digitisation and preventive conservation." }, { fr: "Coopération scientifique, financement de chantiers-pilotes et partage de données ouvrent la voie à une conservation à l'échelle des 21 000 km de l'ouvrage.", en: "Scientific cooperation, funding of pilot works and data sharing pave the way for conservation at the scale of the structure's 21,000 km." } ],
      facts: [ { value: "1987", label: { fr: "inscription UNESCO", en: "UNESCO listing" } }, { value: { fr: "Sociétés savantes", en: "Learned societies" }, label: { fr: "+ universités", en: "+ universities" } } ] },
  };

  /* =============================================================
     3) CÂBLAGE PAR PAGE
     ============================================================= */
  function wireByLabel(cards, labelSel, dict, useCardImage) {
    cards.forEach((card) => {
      const labelEl = card.querySelector(labelSel);
      if (!labelEl) return;
      const key = labelEl.textContent.trim();
      const data = dict[key];
      if (!data) return;
      const payload = Object.assign({}, data);
      if (useCardImage && !payload.image) payload.image = imgOf(card);
      makeDeep(card, payload);
    });
  }

  function wirePage() {
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

    // HISTOIRE
    if (path.includes("histoire")) {
      // cartes Construction / Matériaux / Travailleurs
      wireByLabel(document.querySelectorAll(".history-card"), ".history-label", HISTOIRE_CARDS, true);

      // frise : clic -> scroll vers la dynastie + fiche
      document.querySelectorAll(".frise-dyn").forEach((f) => {
        const nameEl = f.querySelector(".frise-name");
        const key = dynKeyFromLabel(nameEl ? nameEl.textContent : "");
        if (!key) return;
        f.dataset.mcnDeep = "1";
        f.setAttribute("tabindex", "0");
        f.setAttribute("role", "button");
        const go = (e) => {
          e.preventDefault();
          // Clic frise = scroll UNIQUEMENT vers la dynasty (pas de modale)
          const target = [...document.querySelectorAll(".timeline-item .timeline-dynasty")]
            .find((d) => dynKeyFromLabel(d.textContent) === key);
          if (target) {
            const item = target.closest(".timeline-item");
            item.scrollIntoView({ behavior: "smooth", block: "center" });
            item.classList.add("mcn-scroll-highlight");
            setTimeout(() => item.classList.remove("mcn-scroll-highlight"), 1600);
          }
          // PAS d'openModal ici : la modale s'ouvre uniquement via "En savoir plus"
        };
        f.addEventListener("click", go);
        f.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") go(e); });
      });

      // items de la timeline détaillée : aussi cliquables
      document.querySelectorAll(".timeline-item").forEach((item) => {
        const dynEl = item.querySelector(".timeline-dynasty");
        const key = dynKeyFromLabel(dynEl ? dynEl.textContent : "");
        if (!key) return;
        const data = dynastyPayload(key);
        data.image = data.image || imgOf(item);
        makeDeep(item, data, { revealFirst: true });
      });
    }

    // ARCHITECTURE
    if (path.includes("architecture")) {
      wireByLabel(document.querySelectorAll(".history-card"), ".history-label", ARCHI, true);
    }

    // PRÉSERVATION
    if (path.includes("preservation")) {
      wireByLabel(document.querySelectorAll(".challenge-card"), ".challenge-label", DEFIS, true);
      // actions & initiatives : le 2e .action-header porte le vrai titre
      document.querySelectorAll(".action-section").forEach((sec) => {
        const headers = sec.querySelectorAll(".action-header");
        const titleEl = headers[headers.length - 1];
        const key = titleEl ? titleEl.textContent.trim() : "";
        const data = ACTIONS[key];
        if (data) { const p = Object.assign({}, data); p.image = imgOf(sec); makeDeep(sec, p); }
      });
    }

    // ACCUEIL — séparateurs éditoriaux
    if (path === "" || path.includes("index")) injectChapters();
  }

  /* =============================================================
     4) SÉPARATEURS ÉDITORIAUX (accueil)
     ============================================================= */
  const CHAPTERS = [
    { before: ".oracle-grid", kicker: { fr: "Exploration", en: "Explore" },
      title: { fr: "Des fonctionnalités pensées comme une <em>institution</em>", en: "Features designed like an <em>institution</em>" },
      lede: { fr: "Planificateur intelligent, indice de fragilité, mode international : chaque outil prolonge la médiation au lieu de la décorer.", en: "Smart planner, fragility index, international mode: each tool extends the mediation rather than decorating it." } },
    { before: ".curator-room", kicker: { fr: "Conservation", en: "Conservation" },
      title: { fr: "La restauration, <em>expliquée</em> et non spectacularisée", en: "Restoration, <em>explained</em> — not turned into spectacle" },
      lede: { fr: "Avant / après : comprendre la différence entre une section sauvage et une section restaurée, avec mesure et respect du patrimoine.", en: "Before / after: understand the difference between a wild and a restored section, with measure and respect for the heritage." } },
    { before: ".passport-panel", kicker: { fr: "Expérience", en: "Experience" },
      title: { fr: "Un <em>passeport patrimoine</em> à collectionner", en: "A <em>heritage passport</em> to collect" },
      lede: { fr: "Le visiteur gagne des sceaux en explorant l'histoire, l'architecture, la préservation et la visite — une mémoire de son parcours.", en: "Visitors earn seals by exploring history, architecture, preservation and the visit — a memory of their journey." } },
  ];

  function injectChapters() {
    const main = document.querySelector(".main-content");
    if (!main) return;
    CHAPTERS.forEach((c) => {
      const anchor = main.querySelector(c.before);
      if (!anchor || anchor.previousElementSibling?.classList?.contains("mcn-chapter")) return;
      const sec = document.createElement("section");
      sec.className = "mcn-chapter";
      sec.setAttribute("data-mcn-reveal", "1");
      const render = () => {
        sec.innerHTML =
          `<span class="mcn-chapter-kicker">${t(c.kicker)}</span>` +
          `<h2 class="mcn-chapter-title">${t(c.title)}</h2>` +
          `<p class="mcn-chapter-lede">${t(c.lede)}</p>` +
          `<div class="mcn-chapter-rule"></div>`;
      };
      render();
      onLangChange(render);
      anchor.parentNode.insertBefore(sec, anchor);
    });

    // reveal au scroll
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
      }, { threshold: 0.18 });
      document.querySelectorAll(".mcn-chapter[data-mcn-reveal]").forEach((el) => io.observe(el));
    } else {
      document.querySelectorAll(".mcn-chapter[data-mcn-reveal]").forEach((el) => el.classList.add("is-in"));
    }
  }

  /* =============================================================
     5) AMBIANCE SONORE — guzheng / gamme pentatonique chinoise
     (aucun fichier requis ; emplacement prêt pour votre MP3)
     ============================================================= */
  // ► Pour utiliser un VRAI enregistrement, placez un fichier à côté
  //   des pages (ex. "guzheng.mp3") et renseignez son nom ci-dessous.
  const TRADITIONAL_TRACK_URL = "nastelbom_chinese-music.mp3";

  const Music = (function () {
    const STORE_KEY = "mcn-music-state";
    let ctx, master, timer, htmlAudio, on = false, resumeArmed = false;
    // pentatonique majeure (Gong) ~ Do Ré Mi Sol La sur 2 octaves
    const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0];

    function pluck(freq, when, vel) {
      // corde pincée : 2 partiels + léger vibrato + longue décroissance (esprit guzheng)
      const o1 = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain();
      o1.type = "triangle"; o2.type = "sine";
      o1.frequency.value = freq; o2.frequency.value = freq * 2.0;
      const lfo = ctx.createOscillator(), lfoG = ctx.createGain();
      lfo.frequency.value = 5; lfoG.gain.value = freq * 0.004;
      lfo.connect(lfoG).connect(o1.frequency); lfo.start(when); lfo.stop(when + 3);
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(vel, when + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, when + 2.6);
      o1.connect(g); o2.connect(g); g.connect(master);
      o1.start(when); o2.start(when); o1.stop(when + 2.7); o2.stop(when + 2.7);
    }

    function schedule() {
      const now = ctx.currentTime;
      // une phrase douce de 2 à 4 notes
      const n = 2 + Math.floor(Math.random() * 3);
      let prev = -1;
      for (let i = 0; i < n; i++) {
        let idx; do { idx = Math.floor(Math.random() * scale.length); } while (idx === prev);
        prev = idx;
        pluck(scale[idx], now + i * (0.42 + Math.random() * 0.22), 0.12 + Math.random() * 0.05);
      }
      timer = setTimeout(schedule, 2400 + Math.random() * 2200);
    }

    function startSynth() {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      master = ctx.createGain();
      master.gain.value = 0.0001;
      // petite « réverbération » par delay feedback (profondeur de salle)
      const delay = ctx.createDelay(); delay.delayTime.value = 0.28;
      const fb = ctx.createGain(); fb.gain.value = 0.32;
      const wet = ctx.createGain(); wet.gain.value = 0.5;
      master.connect(ctx.destination);
      master.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(ctx.destination);
      master.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 1.2);
      schedule();
    }
    function stopSynth() {
      if (master && ctx) master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      clearTimeout(timer);
    }

    function saveState() {
      const currentTime = htmlAudio ? htmlAudio.currentTime : Number(localStorage.getItem("mcn-music-time") || 0);
      const payload = {
        on,
        time: currentTime
      };
      localStorage.setItem(STORE_KEY, JSON.stringify(payload));
      localStorage.setItem("mcn-music-on", on ? "1" : "0");
      if (htmlAudio) {
        localStorage.setItem("mcn-music-time", String(currentTime));
        localStorage.setItem("mcn-music-savedAt", String(Date.now()));
      }
    }
    function storedState() {
      try { return JSON.parse(localStorage.getItem(STORE_KEY) || "{}"); }
      catch (e) { return {}; }
    }
    function updateButtons() {
      document.querySelectorAll('[data-command="sound"]').forEach((btn) => {
        btn.classList.toggle("is-active", on);
        btn.textContent = on ? "♫" : "♪";
        btn.setAttribute("aria-label", on
          ? (lang() === "en" ? "Turn off ambience" : "Couper l'ambiance")
          : (lang() === "en" ? "Sound ambience" : "Ambiance sonore"));
      });
    }
    function armResume() {
      if (resumeArmed) return;
      resumeArmed = true;
      const resume = () => {
        if (!on || !htmlAudio) return;
        htmlAudio.play().then(() => {
          resumeArmed = false;
          ["pointerdown", "keydown", "touchstart"].forEach((evt) => window.removeEventListener(evt, resume, true));
        }).catch(() => {});
      };
      ["pointerdown", "keydown", "touchstart"].forEach((evt) => window.addEventListener(evt, resume, true));
    }

    function start(restore = false) {
      on = true;
      if (TRADITIONAL_TRACK_URL) {
        // Indique si l'instance vient du bootAudio (déjà en lecture, seek déjà fait par <head>)
        const fromBoot = !htmlAudio && !!window.__mcnBootAudio;
        if (!htmlAudio) {
          // Réutiliser l'audio préchargé dans <head> pour éliminer le gap entre pages
          htmlAudio = window.__mcnBootAudio || new Audio(TRADITIONAL_TRACK_URL);
          window.__mcnBootAudio = null;
          htmlAudio.loop = true;
          htmlAudio.preload = "auto";
        }
        if (restore) {
          // FIX v10.1 — double-seek éliminé :
          // Le script <head> a déjà lancé la lecture ET fait le seek au bon timestamp.
          // Si htmlAudio joue déjà (!paused), refaire currentTime = X interromprait le flux → coupure.
          // On se contente d'ajuster le volume et on laisse la lecture continuer.
          if (fromBoot && !htmlAudio.paused) {
            htmlAudio.volume = 0.55;
            // Pas de seek, pas de play() : l'audio est déjà en cours au bon endroit.
          } else {
            // Calcul précis du temps de reprise (cas sans bootAudio ou audio pausé)
            const saved = storedState();
            const savedTime = Number(saved.time || localStorage.getItem("mcn-music-time") || 0);
            const savedAt = Number(localStorage.getItem("mcn-music-savedAt") || Date.now());
            const elapsed = (Date.now() - savedAt) / 1000;

            htmlAudio.volume = 0.55;

            const doPlay = () => {
              let resumeTime = savedTime + elapsed;
              if (htmlAudio.duration && isFinite(htmlAudio.duration)) {
                resumeTime = resumeTime % htmlAudio.duration;
              }
              try { htmlAudio.currentTime = resumeTime; } catch(e) {}
              htmlAudio.play().catch(() => armResume());
            };

            if (htmlAudio.readyState >= 3) {
              doPlay();
            } else {
              const onReady = () => { doPlay(); htmlAudio.removeEventListener("canplay", onReady); };
              htmlAudio.addEventListener("canplay", onReady);
              htmlAudio.load();
            }
          }
        } else {
          htmlAudio.volume = 0;
          htmlAudio.play().catch(() => armResume());
          let v = 0;
          const fade = setInterval(() => {
            v = Math.min(0.55, v + 0.04);
            htmlAudio.volume = v;
            if (v >= 0.55) clearInterval(fade);
          }, 60);
        }
      } else { startSynth(); }
      saveState();
      updateButtons();
    }
    function stop() {
      on = false;
      if (htmlAudio) { let v = htmlAudio.volume; const fade = setInterval(() => { v = Math.max(0, v - 0.06); htmlAudio.volume = v; if (v <= 0) { htmlAudio.pause(); clearInterval(fade); } }, 70); }
      else { stopSynth(); }
      saveState();
      updateButtons();
    }
    // Sauvegarder avant navigation (links cliqués) — [v10-PATCH] exclut les liens PJAX internes
    document.addEventListener("click", (e) => {
      if (on && e.target.closest("a[href]")) {
        const href = e.target.closest("a[href]").getAttribute("href");
        // Ne pas sauvegarder pour les liens PJAX (navigation interne sans rechargement)
        // Les liens PJAX sont interceptés par mcn_v10.js wireRouter → pas de rechargement
        const PJAX_FILES = ['index.html','histoire.html','architecture.html','preservation.html','visiter.html','apropos.html','mentions-legales.html','politique-confidentialite.html'];
        const leaf = (href || '').split('/').pop().split('?')[0].split('#')[0] || 'index.html';
        const isPjax = PJAX_FILES.indexOf(leaf) >= 0;
        if (isPjax) return; // PJAX = pas de rechargement = pas besoin de sauvegarder ici
        if (href && !href.startsWith("#") && !href.startsWith("javascript") && !href.startsWith("mailto")) {
          saveState();
        }
      }
    }, true);
    window.addEventListener("pagehide", saveState);
    window.addEventListener("beforeunload", saveState);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") saveState(); });
    // FIX v10.1 : 2 s au lieu de 400 ms — précision suffisante pour la reprise, sans thrashing localStorage
    setInterval(() => { if (on) saveState(); }, 2000);
    function restoreIfNeeded() {
      const saved = storedState();
      if (saved.on || localStorage.getItem("mcn-music-on") === "1") start(true);
      else updateButtons();
    }
    return { toggle: () => (on ? stop() : start(false)), isOn: () => on, restoreIfNeeded };
  })();

  // On prend la main sur le bouton « son ». On écoute sur `window` en phase de
  // capture : window précède document dans la chaîne d'événements, donc on passe
  // AVANT l'ancien handler son (lui aussi en capture sur document) et on le neutralise.
  function hijackSound() {
    window.addEventListener("click", function (e) {
      const btn = e.target.closest && e.target.closest('[data-command="sound"]');
      if (!btn) return;
      e.preventDefault();
      e.stopImmediatePropagation(); // empêche l'ancien drone WebAudio de démarrer
      Music.toggle();
    }, true);
  }

  function fixedLangLabels(nextLang = lang()) {
    document.querySelectorAll(".mode-normal").forEach((el) => { el.textContent = nextLang === "en" ? "Standard" : "Normal"; });
    document.querySelectorAll(".mode-daltonien").forEach((el) => { el.textContent = nextLang === "en" ? "Color-blind" : "Daltonien"; });
    document.querySelectorAll('[data-command="lang"]').forEach((el) => {
      el.textContent = "FR/EN";
      el.setAttribute("aria-label", nextLang === "en" ? "Switch French / English" : "Basculer français anglais");
    });
  }

  function syncColorMode() {
    const cb = document.getElementById("daltonien-mode");
    if (!cb) return;
    const stored = localStorage.getItem("mcn-colorblind");
    const on = stored === null ? cb.checked : stored === "1";
    cb.checked = on;
    document.documentElement.classList.toggle("mcn-colorblind", on);
    fixedLangLabels();
  }

  function hijackLangAndColor() {
    // Le clic FR/EN est géré par lang_fix.js (chargé en premier).
    // lang_fix.js appelle window.mcnApplyLang puis les __mcnLangSubs.
    // On enregistre fireLangChange dans les abonnés pour que les modales se mettent à jour.
    if (!window.__mcnLangSubs) window.__mcnLangSubs = new Set();
    window.__mcnLangSubs.add(function() {
      try { fixedLangLabels(localStorage.getItem('mcn-lang') === 'en' ? 'en' : 'fr'); } catch(e) {}
      try { fireLangChange(); } catch(e) {}
    });

    window.addEventListener("change", function (e) {
      if (!e.target || e.target.id !== "daltonien-mode") return;
      localStorage.setItem("mcn-colorblind", e.target.checked ? "1" : "0");
      syncColorMode();
    }, true);

    window.mcnSyncFixedLabels = fixedLangLabels;
  }

  /* ---------- Boot ---------- */
  window.mcnWirePage = wirePage;
  onReady(function () {
    try { hijackLangAndColor(); syncColorMode(); fixedLangLabels(); } catch (e) {}
    try { hijackSound(); } catch (e) {}
    try { Music.restoreIfNeeded(); } catch (e) {}
    try { wirePage(); } catch (e) { console.warn("[MCN finish] wirePage:", e); }
  });
  // Réinjection des déclencheurs (frise dynasties, etc.) après navigation SPA, SANS retoucher la musique.
  document.addEventListener('mcn:navigated', function(){
    try { wirePage(); } catch (e) {}
    try { syncColorMode(); fixedLangLabels(localStorage.getItem('mcn-lang')==='en'?'en':'fr'); } catch (e) {}
  });
})();
