/* ═══════════════════════════════════════════════════════════════════
   M.C.N. — LANG_FIX.JS  v5 — Architecture CSS-first + boutons FR|EN
   
   Principe : les textes longs/riches utilisent .lang-fr / .lang-en
   (affichage CSS). La traduction de texte est réservée aux labels
   courts, titres, navigation, boutons — tout ce qui n'a pas de balisage riche.
   Chargé EN DERNIER dans chaque page.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Utilitaires ── */
  const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
  const key  = s => norm(s).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, "'").replace(/[""«»]/g, '"');

  /* ═══════════════════════════════════════════════
     DICTIONNAIRE FR → EN (labels courts uniquement)
     Les textes longs sont gérés par .lang-fr/.lang-en CSS
  ═══════════════════════════════════════════════ */
  const D = new Map();
  const a = (fr, en) => D.set(key(fr), en);

  /* Navigation */
  a('Aller au contenu','Skip to content'); a('Normal','Standard'); a('Daltonien','Color-blind');
  a('Accueil','Home'); a('Histoire','History'); a('Architecture & Sites','Architecture & Sites');
  a('Préservation & UNESCO','Preservation & UNESCO'); a('Visiter','Visit'); a('À propos','About'); a('A propos','About');
  a('Retour en haut','Back to top'); a('Recherche intelligente','Smart search');
  a('Basculer français anglais','Switch French / English');
  a('Passer en français','Switch to French'); a('Switch to English','Switch to English');
  a('Ambiance sonore','Sound ambience'); a('Outils rapides','Quick tools');
  a('Recherche rapide','Quick search'); a('Fermer','Close');
  a('M.C.N. / Recherche curatoriale','M.C.N. / Curatorial search');
  a('Explorer la Muraille en un instant','Explore the Wall instantly');
  a("Essayez : Badaling, riz gluant, UNESCO, Ming...",'Try: Badaling, sticky rice, UNESCO, Ming...');
  a('Essayez : Ming, UNESCO, 3D, Badaling.','Try: Ming, UNESCO, 3D, Badaling.');
  a('Aucun résultat','No result'); a('Expérience immersive','Immersive experience');
  a("Nous utilisons uniquement des préférences locales pour retenir la langue, l'accessibilité et l'ambiance. Aucun traçage publicitaire.",'We only use local preferences to remember language, accessibility and ambience. No advertising tracking.');
  a("Accepter l'expérience",'Accept the experience');

  /* Footer */
  a('Liens utiles','Useful links'); a("Site officiel de l'UNESCO",'Official UNESCO website');
  a('Planifier sa visite','Plan your visit'); a("L'équipe M.C.N.",'The M.C.N. team');
  a('Informations','Information'); a('Mentions légales','Legal notice');
  a('Politique de confidentialité','Privacy policy');
  a('Une question sur le projet ou la Muraille ?','A question about the project or the Wall?');
  a('✉️ Nous contacter','✉️ Contact us');
  a('© 2026 Projet M.C.N. × UNESCO — Tous droits réservés','© 2026 M.C.N. × UNESCO project — All rights reserved');

  /* Accueil — titres & labels */
  a('La Grande Muraille de Chine','The Great Wall of China');
  a('Patrimoine mondial UNESCO','UNESCO World Heritage');
  a("En partenariat avec l'UNESCO",'In partnership with UNESCO');
  a('Introduction à la Grande Muraille de Chine','Introduction to the Great Wall of China');
  a('Chiffres clés','Key figures'); a('Longueur totale','Total length');
  a('2 700 ans','2,700 years'); a('Inscription UNESCO','UNESCO listing'); a('Visiteurs/an','Visitors/year');
  a('21 196 km','21,196 km'); a('Histoire','History');
  a('Édifiée sur plus de deux millénaires, la Grande Muraille reflète l\'évolution des dynasties chinoises et leur volonté de protéger le territoire.','Built over more than two millennia, the Great Wall reflects the evolution of Chinese dynasties and their determination to protect the territory.');
  a("Tours de guet, forteresses et murs s'étendent à travers montagnes et plaines, chaque section offrant un style et un paysage distincts.",'Watchtowers, fortresses and walls stretch across mountains and plains, with each section offering a distinct style and landscape.');
  a("Inscrite à l'UNESCO depuis 1987, la Muraille fait l'objet de restaurations continues pour contrer l'érosion, le tourisme et le temps.",'Listed by UNESCO since 1987, the Wall undergoes continuous restoration to counter erosion, tourism pressure and time.');
  a("Sections restaurées ou portions sauvages : chaque itinéraire offre une expérience unique et des panoramas impressionnants.",'Restored sections or wild stretches: each route offers a unique experience and striking panoramas.');
  a('La Grande Muraille de Chine, immense fortification serpentant à travers montagnes et vallées, est un symbole majeur de l\'histoire et de la culture chinoises. Construite pour protéger l\'empire, elle témoigne du savoir-faire et de la détermination de ses bâtisseurs. Aujourd\'hui encore, elle fascine des millions de visiteurs et demeure un puissant héritage du passé.','The Great Wall of China, an immense fortification winding across mountains and valleys, is a major symbol of Chinese history and culture. Built to protect the empire, it reflects the skill and determination of its builders. Today, it still fascinates millions of visitors and remains a powerful legacy of the past.');

  /* Heritage command */
  a('Centre de médiation numérique','Digital mediation center');
  a('Médiation culturelle numérique','Digital cultural mediation');
  a("Une expérience UNESCO pensée comme un musée digital premium",'A UNESCO experience designed as a premium digital museum');
  a("Une expérience patrimoniale pensée comme un musée numérique",'A heritage experience designed as a digital museum');
  a("Lancer l'exploration 3D",'Launch the 3D exploration'); a('Explorer les outils 3D','Explore the 3D tools');
  a('Composer un itinéraire','Build an itinerary'); a('Signal UNESCO','UNESCO signal');
  a('Patrimoine mondial','World Heritage'); a('Risque érosion','Erosion risk');
  a('Sections à surveiller','Sections to monitor'); a('Scan LiDAR','LiDAR scan');
  a('Jumeau numérique','Digital twin'); a('Accessibilité','Accessibility');
  a('Contraste renforcé','Enhanced contrast'); a('International','International');
  a('Mode français / anglais intégré','Integrated French / English mode');
  a('Inclusif','Inclusive'); a('Mode daltonien + contraste premium','Color-blind mode + premium contrast');
  a('Immersif','Immersive'); a('Crédible','Credible'); a('Ton institutionnel et muséal','Institutional museum tone');
  a('3D, Street View, Story Map, audio','3D, Street View, Story Map, audio');

  /* Planificateur */
  a('Conseiller de visite intelligent','Intelligent visit advisor'); a('Planificateur express','Express planner');
  a("Choisissez votre profil : le site propose une section adaptée, le niveau d'effort, le meilleur moment et l'expérience à privilégier.",'Choose your profile: the site suggests a suitable section, effort level, best time and recommended experience.');
  a('Culture','Culture'); a('Photo','Photo'); a('Famille','Family'); a('Aventure','Adventure');
  a('Mutianyu · 1 journée','Mutianyu · 1 day');
  a("Équilibre idéal entre beauté, accessibilité et densité historique. À visiter tôt le matin pour une lumière douce.",'An ideal balance of beauty, accessibility and historical density. Visit early in the morning for soft light.');
  a('Conservation prédictive','Predictive conservation'); a('Indice de fragilité','Fragility index');
  a("Simulation pédagogique : climat, fréquentation et érosion sont synthétisés en un indicateur clair pour comprendre les enjeux UNESCO.",'Educational simulation: climate, visitor pressure and erosion are synthesized into a clear indicator to understand UNESCO preservation issues.');
  a('Mode international','International mode'); a('Salle du conservateur','Curator room');
  a('Avant / Après restauration','Before / After restoration'); a('Section restaurée','Restored section');
  a('Section sauvage','Wild section'); a('Carnet numérique','Digital notebook');
  a('Carnet de visite patrimonial','Heritage visit notebook'); a('Passeport patrimoine','Heritage passport');
  a('Architecture','Architecture'); a('UNESCO','UNESCO'); a('Visite','Visit');

  /* Histoire */
  a('Construction','Construction'); a('Matériaux','Materials'); a('Travailleurs','Workers');
  a('Utilisation de coffrages en bois pour la terre battue et de systèmes de rampes pour acheminer les blocs de pierre sur les crêtes escarpées.','Use of wooden formwork for rammed earth and ramp systems to carry stone blocks up steep ridges.');
  a("Un mélange local de granit, de briques cuites et de mortier au riz gluant, garantissant une résistance millénaire face à l'érosion.",'A local blend of granite, fired bricks and sticky-rice mortar, providing thousand-year resistance against erosion.');
  a("Un effort colossal mobilisant soldats, paysans et prisonniers, travaillant dans des conditions extrêmes pour protéger l'Empire.",'A colossal effort involving soldiers, peasants and prisoners working in extreme conditions to protect the Empire.');
  a('Frise chronologique des dynasties','Dynasty timeline'); a('Dynasties clés de la Grande Muraille','Key dynasties of the Great Wall');
  a('Dynastie Xia','Xia Dynasty'); a('Dynastie Shang','Shang Dynasty'); a('États féodaux','Feudal states');
  a('Période des Royaumes Combattants','Warring States period'); a('Royaumes Combattants','Warring States');
  a('Dynastie Qin','Qin Dynasty'); a('Dynastie Han','Han Dynasty'); a('Dynastie Tang','Tang Dynasty');
  a('Dynastie Song','Song Dynasty'); a('Dynastie Yuan','Yuan Dynasty'); a('Dynastie Ming','Ming Dynasty');
  a("Aujourd'hui",'Today'); a("AUJOURD'HUI",'TODAY'); a('Ère Moderne','Modern Era'); a('XXIe siècle','21st century');
  a('En savoir plus','Learn more'); a('Précédent','Previous'); a('Suivant','Next');
  a('Glissez ou utilisez les boutons pour parcourir les dynasties','Swipe or use the buttons to browse dynasties');
  a('Première dynasty légendaire de Chine. Les premiers travaux de drainage posent les bases du contrôle territorial.',"China's first legendary dynasty. Early drainage works laid the foundations of territorial control.");
  a("Premières fortifications en terre battue pour protéger les cités royales. Début de l'organisation défensive du territoire chinois.",'First rammed-earth fortifications to protect royal cities. Beginning of the defensive organization of Chinese territory.');
  a("Premières fortifications fragmentées érigées par les États féodaux pour marquer leurs frontières.",'First fragmented fortifications erected by feudal states to mark their borders.');
  a("Unification des remparts par le premier Empereur pour créer une barrière continue contre les incursions du Nord.",'Unification of the ramparts by the First Emperor to create a continuous barrier against northern incursions.');
  a("Extension de la muraille vers l'ouest jusqu'aux déserts du Gobi. Protection des routes commerciales de la Route de la Soie.",'Extension of the Wall westward to the Gobi deserts. Protection of the Silk Road trade routes.');
  a("Période de relative paix aux frontières. Les Tang privilégient la diplomatie sur la fortification, mais entretiennent les sections existantes.",'A period of relative peace on the borders. The Tang favored diplomacy over fortification, while maintaining existing sections.');
  a("Confrontés aux invasions du Nord, les Song renforcent les défenses et innovent dans les techniques de construction des fortifications.",'Facing northern invasions, the Song strengthened defenses and innovated in fortification construction techniques.');
  a("Les Mongols, maîtres de l'empire, n'ont pas besoin de la muraille pour se défendre. La construction est suspendue mais les structures sont préservées.",'The Mongols, masters of the empire, did not need the Wall for defense. Construction was suspended but the structures were preserved.');
  a("Âge d'or de la construction. La muraille se pare de briques et de tours de guet pour devenir le monument majestueux actuel.",'Golden age of construction. The Wall gained bricks and watchtowers, becoming the majestic monument known today.');
  a("Passage de rempart militaire à trésor mondial. Classée à l'UNESCO, elle est aujourd'hui le symbole universel de la Chine.",'From military rampart to world treasure. Listed by UNESCO, it is now the universal symbol of China.');

  /* Architecture */
  a('Caractéristiques techniques','Technical characteristics'); a('Largeur moyenne','Average width'); a('Hauteur moyenne','Average height');
  a('Tours de guet','Watchtowers'); a('Éléments architecturaux','Architectural elements');
  a('Forteresses & Passes','Fortresses & Passes'); a('Postes de signal','Signal posts');
  a('Chemin de ronde','Parapet walk'); a('Drainage','Drainage');
  a('Évolution architecturale par dynastie','Architectural evolution by dynasty');
  a('Terre battue & Pierre','Rammed earth & stone'); a("Extension vers l'ouest",'Westward expansion');
  a('Briques & Perfection','Brickwork & perfection'); a('Exploration Immersive des Tronçons','Immersive section exploration');
  a("La Grande Muraille de Chine est bien plus qu'un simple mur. C'est un système défensif complexe composé de murs, de tours de guet, de forteresses et de postes de signal. Chaque section reflète les techniques et les ressources locales de son époque.",'The Great Wall of China is much more than a simple wall. It is a complex defensive system made of walls, watchtowers, fortresses and signal posts. Each section reflects the techniques and local resources of its era.');

  /* Préservation */
  a('Préservation & UNESCO','Preservation & UNESCO'); a('Défis de préservation','Preservation challenges');
  a('Érosion naturelle','Natural erosion'); a('Tourisme de masse','Mass tourism'); a('Pression touristique','Tourism pressure');
  a('Développement urbain','Urban development'); a('Changement climatique','Climate change');
  a('Conservation et sensibilisation','Conservation and awareness'); a('Éducation et sensibilisation','Education and awareness');
  a('Contribuer','Contribute'); a('Partenariats internationaux','International partnerships');
  a('Historique des Restaurations','Restoration history'); a('Survol Inédit par Drone','Exclusive drone flyover');
  a('La Technologie LiDAR','LiDAR Technology'); a('📐 Une précision millimétrique','📐 Millimeter-level precision');
  a('🛡️ Prévenir plutôt que guérir','🛡️ Prevent rather than cure');
  a("💻 Archives pour l'Éternité",'💻 Archives for eternity');
  a('Atelier de restauration virtuelle','Virtual restoration workshop'); a('🧽 Restaurer le mur','🧽 Restore the wall');
  a('🎨 Tagger la muraille','🎨 Tag the Wall'); a('Découvrir le Scan 3D','Discover the 3D scan');

  /* Visiter */
  a('Visiter la Grande Muraille','Visit the Great Wall'); a('Sites incontournables','Must-see sites');
  a('Meilleure période','Best season'); a('Accès depuis Pékin','Access from Beijing');
  a("Tarifs d'entrée",'Entrance fees'); a('Carte des sites','Site map');
  a('Carte interactive des sections','Interactive section map'); a('Section sélectionnée','Selected section');
  a('Ouvrir dans Google Maps','Open in Google Maps'); a('Aller au carnet','Go to notebook');
  a('Module de visite responsable','Responsible visit module'); a('Choisir une section','Choose a section');
  a('Facile · familles','Easy · families'); a('Premium · panoramas','Premium · panoramas');
  a('Photo · crêtes','Photo · ridgelines'); a('Nocturne · Gubei','Night visit · Gubei');
  a('Sauvage · expert','Wild · expert'); a('Lac · calme','Lake · calm');
  a("Composer l'expérience",'Build the experience'); a('Préférences de visite','Visit preferences');
  a('Date de visite','Visit date'); a('Profil voyageur','Traveler profile');
  a('Moyen de transport','Transport'); a('Guide local','Local guide'); a('Repas souhaité','Food preference');
  a('Hébergement','Accommodation'); a('Générer mon carnet','Generate my notebook');
  a('Itinéraire recommandé','Recommended itinerary'); a('Authenticité','Authenticity');
  a('Photogénie','Photogenic value'); a('Affluence maîtrisée','Crowd control');
  a("Ouvrir l'itinéraire réel",'Open real route'); a('Ajouter au passeport','Add to passport');
  a('Télécharger le PDF','Download PDF'); a('Copier le programme','Copy the program');
  a("Retours d'expérience",'Visitor feedback'); a('Retours visiteurs','Visitor feedback');
  a('Chiffres du tourisme','Tourism figures'); a('Carnet de Route Impérial','Imperial Route Notebook');
  a('La section la plus accessible et la mieux restaurée. Idéale pour une première visite. Téléphérique disponible. À 70 km de Pékin.','The most accessible and best-restored section. Ideal for a first visit. Cable car available. 70 km from Beijing.');
  a("Moins fréquentée, avec des forêts magnifiques. Téléphérique et luge de descente disponibles. Ambiance plus tranquille que Badaling.",'Less crowded, with beautiful forests. Cable car and toboggan descent available. A quieter atmosphere than Badaling.');
  a("Section sauvage non restaurée pour randonneurs expérimentés. Vue spectaculaire, atmosphère authentique. Guide local recommandé.",'Unrestored wild section for experienced hikers. Spectacular views, authentic atmosphere. Local guide recommended.');
  a('Printemps (avril-mai) et automne (septembre-octobre) : températures douces et ciel dégagé. Évitez les jours fériés chinois, très fréquentés.','Spring (April–May) and autumn (September–October): mild temperatures and clear skies. Avoid very crowded Chinese public holidays.');
  a("Bus depuis Deshengmen ou Dongzhimen pour Badaling et Mutianyu. Comptez 1h à 2h de trajet. Tours organisées chaque matin.",'Buses from Deshengmen or Dongzhimen serve Badaling and Mutianyu. Expect 1 to 2 hours of travel. Organized tours depart every morning.');
  a("Badaling : ~45 ¥ (6€). Mutianyu : ~65 ¥ (8€). Réservation en ligne recommandée pour éviter les files d'attente.",'Badaling: around ¥45 (€6). Mutianyu: around ¥65 (€8). Online booking is recommended to avoid queues.');
  a('Culture & patrimoine','Culture & heritage'); a('Photo / coucher de soleil','Photo / sunset');
  a('Famille & confort','Family & comfort'); a('Aventure & randonnée','Adventure & hiking');
  a('Train / transport public','Train / public transport'); a('Bus touristique','Tourist bus');
  a('Voiture privée','Private car'); a('Randonnée guidée','Guided hike');
  a('Non, visite autonome','No, self-guided visit'); a('Oui, guide culturel','Yes, cultural guide');
  a('Guide expert patrimoine','Heritage expert guide'); a('Spécialités locales','Local specialties');
  a('Option végétarienne','Vegetarian option'); a('Option halal-friendly','Halal-friendly option');
  a('Table premium au retour','Premium dinner on return'); a("Pas d'hôtel",'No hotel');
  a('Hôtel confort proche','Nearby comfort hotel'); a('Boutique hôtel / expérience','Boutique hotel / experience');
  a('Retour hôtel à Pékin','Return to Beijing hotel'); a('🍜 À goûter','🍜 To taste');
  a('🏨 Où dormir','🏨 Where to stay'); a('🎒 Conseil terrain','🎒 Field tip');

  /* À propos */
  a('M.C.N. / Médiation Culturelle & Numérique','M.C.N. / Cultural & Digital Mediation');
  a("L'équipe derrière l'expérience",'The team behind the experience');
  a('Équipe projet','Project team'); a('4 profils complémentaires','4 complementary profiles');
  a('Soutenir le prototype','Support the prototype'); a('Soutien via PayPal','PayPal support');
  a('Contact rapide','Quick contact'); a("Écrire à l'équipe",'Write to the team');
  a('Nom','Name'); a('Votre nom','Your name'); a('Email','Email'); a('Sujet','Subject');
  a('Message','Message'); a('Votre message...','Your message...'); a('Envoyer le message','Send message');
  a('Question sur le projet','Question about the project'); a('Partenariat','Partnership');
  a('Bug ou amélioration','Bug or improvement'); a('Soutien / don','Support / donation');
  a('Découvrir les profils','Discover the profiles'); a("Contacter l'équipe",'Contact the team');
  a('Qualité & amélioration continue','Quality & continuous improvement');
  a("Votre retour améliore l'expérience",'Your feedback improves the experience');
  a('Donner un avis utilisateur','Give user feedback'); a('Faire un don','Make a donation');
  a("Amélioration de la cartographie et des itinéraires",'Improving maps and routes');
  a("Ajout de contenus historiques vérifiés",'Adding verified historical content');
  a("Optimisation mobile et accessibilité renforcée",'Mobile optimization and stronger accessibility');
  a('Proposer un partenariat','Suggest a partnership'); a('Nous contacter','Contact us');

  /* Mentions légales */
  a('Mentions Légales','Legal Notice'); a('Politique de Confidentialité','Privacy Policy');
  a('1. Éditeur du site :','1. Site publisher:'); a('2. Hébergement :','2. Hosting:');
  a('3. Propriété intellectuelle :','3. Intellectual property:');
  a('4. Partenariat fictif / académique :','4. Fictional / academic partnership:');
  a('5. Dons et contact :','5. Donations and contact:');
  a('1. Collecte des données :','1. Data collection:'); a('2. Cookies et préférences locales :','2. Cookies and local preferences:');
  a('3. Partage des informations :','3. Information sharing:'); a('4. Vos droits :','4. Your rights:');
  a('Directeur de la publication : Équipe de projet M.C.N.','Publication director: M.C.N. project team');



  /* Complément global v6 — pages complètes */
  a('Le bouton FR/EN traduit désormais les éléments clés de l\'interface et mémorise la préférence localement.','The FR/EN button now translates the key interface elements and remembers the preference locally.');
  a('Disposées tous les 90 à 180 mètres, elles servaient de postes d\'observation, de casernes et de dépôts de provisions.','Placed every 90 to 180 meters, they served as observation posts, barracks and supply depots.');
  a('Terre battue, pierres locales, briques cuites liées au mortier de chaux et riz gluant. Le choix variait selon les ressources de chaque région.','Rammed earth, local stone and fired bricks bonded with lime and sticky-rice mortar. The choice varied according to each region’s resources.');
  a('Points de contrôle stratégiques comme Shanhaiguan à l\'est et Jiayuguan à l\'ouest. Ces portes commandaient l\'accès à l\'empire.','Strategic checkpoints such as Shanhaiguan in the east and Jiayuguan in the west. These gates controlled access to the empire.');
  a('Système de communication par signaux de fumée et de feu permettant de transmettre des alertes sur des centaines de km en quelques heures.','A smoke-and-fire signal communication system that could transmit alerts over hundreds of kilometers in a few hours.');
  a('Le sommet du mur, large de 4 à 5 mètres, permettait à plusieurs cavaliers de se croiser. Pavé de briques pour faciliter la marche.','The top of the wall, 4 to 5 meters wide, allowed several riders to pass one another. It was paved with bricks to make movement easier.');
  a('Des gargouilles et canalisations intégrées dans la structure permettaient d\'évacuer les eaux de pluie et d\'éviter l\'érosion des murs.','Gargoyles and channels integrated into the structure drained rainwater and helped prevent wall erosion.');
  a('Construction rapide avec les matériaux locaux. La terre battue est compactée entre des planches de bois. Priorité à la longueur sur la solidité.','Rapid construction with local materials. Rammed earth was compacted between wooden boards. Length was prioritized over solidity.');
  a('Utilisation de roseaux et peupliers dans les zones désertiques. Innovation avec les tours de signal pour une communication rapide sur de longues distances.','Use of reeds and poplar wood in desert areas. Signal towers introduced faster long-distance communication.');
  a('Âge d\'or de la construction. Introduction massive des briques cuites liées au mortier de chaux et riz gluant. Tours de guet massives et sophistiquées.','The golden age of construction, with extensive use of fired bricks bonded with lime and sticky-rice mortar, plus massive, sophisticated watchtowers.');

  a('La préservation de la Grande Muraille de Chine, site du patrimoine mondial de l\'UNESCO, est cruciale pour sauvegarder son intégrité historique et culturelle face aux défis modernes.','Preserving the Great Wall of China, a UNESCO World Heritage Site, is crucial to safeguarding its historical and cultural integrity against modern challenges.');
  a('Le vent, la pluie et les variations de température fragilisent progressivement les structures anciennes, accélérant leur dégradation.','Wind, rain and temperature variations gradually weaken ancient structures and accelerate their deterioration.');
  a('Le flux massif de visiteurs fragilise les pierres originales. La gestion durable des accès est cruciale pour limiter l\'usure mécanique.','Mass visitor flows weaken the original stones. Sustainable access management is essential to limit mechanical wear.');
  a('L\'expansion des infrastructures modernes menace l\'intégrité du site. Nous œuvrons pour sanctuariser les zones historiques environnantes.','The expansion of modern infrastructure threatens the site’s integrity. We work to protect the surrounding historic areas.');
  a('Projets de restauration','Restoration projects');
  a('Projet 2020-2025','2020–2025 project');
  a('Campagne majeure de consolidation des structures instables et nettoyage des graffitis historiques, respectant les méthodes de construction ancestrales.','A major campaign to consolidate unstable structures and clean historic graffiti while respecting ancestral construction methods.');
  a('Budget','Budget'); a('Longueur','Length');
  a('Et vous, quel graffiti auriez-vous fait ? (Virtuellement, bien sûr !)','What graffiti would you have made? Virtually, of course!');
  a('Conservation digitale','Digital conservation');
  a('Utilisation de scans LiDAR et de drones pour créer un jumeau numérique précis. Cette modélisation permet d\'anticiper les risques d\'effondrement.','LiDAR scans and drones are used to create an accurate digital twin. This modeling helps anticipate collapse risks.');
  a('Vols de Drones','Drone flights'); a('Actions & Initiatives','Actions & Initiatives');
  a('Programmes éducatifs internationaux pour sensibiliser les jeunes générations à la préservation du patrimoine mondial.','International educational programs raise younger generations’ awareness of World Heritage preservation.');
  a('Collaborations avec des experts et organisations mondiales pour la préservation de la Grande Muraille de Chine.','Collaborations with experts and global organizations for the preservation of the Great Wall of China.');
  a('Premiers grands travaux de restauration après la fondation de la RPC.','First major restoration works after the founding of the PRC.');
  a('Intensification des projets suite à l\'inscription au patrimoine mondial de l\'UNESCO.','Restoration projects intensified after the UNESCO World Heritage listing.');
  a('Utilisation de techniques modernes pour une restauration plus précise.','Use of modern techniques for more precise restoration.');
  a('Focus sur la conservation préventive et la gestion durable.','Focus on preventive conservation and sustainable management.');
  a('Découvrez la majesté de la Grande Muraille, serpentant sur les crêtes montagneuses, capturée en ultra-haute définition.','Discover the majesty of the Great Wall winding across mountain ridges, captured in ultra-high definition.');
  a('Votre navigateur ne supporte pas la lecture de vidéos.','Your browser does not support video playback.');
  a('Le LiDAR (Light Detection and Ranging) utilise des impulsions laser pour créer un "nuage de points" ultra-précis de la muraille. Cela permet de détecter des affaissements ou des fissures invisibles à l\'œil nu.','LiDAR (Light Detection and Ranging) uses laser pulses to create an ultra-precise point cloud of the Wall. It can reveal subsidence or cracks invisible to the naked eye.');
  a('Grâce à ces jumeaux numériques, l\'UNESCO et le gouvernement chinois peuvent anticiper les effondrements et cibler exactement quelles briques ont besoin d\'être renforcées.','Thanks to these digital twins, UNESCO and the Chinese government can anticipate collapses and identify exactly which bricks need reinforcement.');
  a('Si une section devait un jour être détruite par une catastrophe naturelle, ces scans 3D permettraient de la reconstruire à l\'identique, brique par brique.','If a section were ever destroyed by a natural disaster, these 3D scans would allow it to be rebuilt identically, brick by brick.');
  a('Mur d\'expression libre','Free-expression wall');
  a('⚠️ Attention : À ne surtout pas reproduire sur place !','⚠️ Warning: never reproduce this on site!');
  a('Le patrimoine est précieux. Exprimez-vous ici, mais n\'oubliez pas de nettoyer avant de partir !','Heritage is precious. Express yourself here, but remember to clean up before leaving!');
  a('🧽 Nettoyer mon graffiti','🧽 Clean my graffiti');

  a('La Grande Muraille s\'étend sur plus de 21 000 km. Chaque section offre une expérience différente : sections restaurées et accessibles ou portions sauvages pour les aventuriers. Voici les sites incontournables et les informations pratiques pour préparer votre voyage.','The Great Wall stretches over more than 21,000 km. Each section offers a different experience: restored, accessible areas or wild stretches for adventurers. Here are the must-see sites and practical information to prepare your trip.');
  a('Réputée pour ses couchers de soleil et ses paysages époustouflants. Visite de nuit possible. Classée « authenticité remarquable » par l\'UNESCO.','Famous for its sunsets and breathtaking landscapes. Night visits are possible. Recognized by UNESCO for its remarkable authenticity.');
  a('📜 Histoire et Légende','📜 History and legend'); a('✨ Pourquoi visiter ?','✨ Why visit?'); a('ℹ️ Informations pratiques','ℹ️ Practical information');
  a('Construite en 1504 pendant la dynastie Ming, Badaling était un avant-poste militaire stratégique protégeant la passe de Juyongguan. Son nom, signifiant « les huit directions », vient du fait que son sommet offrait une vue dégagée sur tous les horizons.','Built in 1504 during the Ming dynasty, Badaling was a strategic military outpost protecting the Juyongguan Pass. Its name, meaning “the eight directions,” comes from the clear views its summit offered in every direction.');
  a('C\'est la section la plus grandiose et la mieux restaurée. Idéale pour les personnes à mobilité réduite ou voyageant en famille, elle dispose d\'infrastructures modernes. C\'est aussi là que de nombreux chefs d\'État ont marché.','It is the most majestic and best-restored section. Ideal for people with reduced mobility or families, it has modern facilities. Many heads of state have also walked here.');
  a('Distance depuis Pékin :','Distance from Beijing:'); a('Environ 70 km (1h30 en train ou bus).','Around 70 km (1.5 hours by train or bus).');
  a('Difficulté :','Difficulty:'); a('Facile à modérée (pentes aménagées).','Easy to moderate (managed slopes).');
  a('Affluence :','Crowds:'); a('Très élevée, préférez tôt le matin.','Very high; prefer early morning.'); a('📍 Voir sur Google Maps','📍 View on Google Maps');
  a('Érigée au 6ème siècle sous les Qi du Nord, puis reconstruite par les Ming, Mutianyu possède une architecture unique : de nombreuses tours de guet rapprochées, et un mur crénelé des deux côtés.','Built in the 6th century under the Northern Qi and later rebuilt by the Ming, Mutianyu has unique architecture: many closely spaced watchtowers and crenellations on both sides of the wall.');
  a('Le compromis parfait ! Moins bondée que Badaling mais tout aussi spectaculaire, elle est célèbre pour ses forêts luxuriantes. Son grand point fort : la luge toboggan pour redescendre !','The perfect compromise: less crowded than Badaling but just as spectacular, it is famous for lush forests. Its standout feature is the toboggan slide back down.');
  a('Environ 73 km (2h de route).','Around 73 km (2 hours by road).'); a('Modérée (beaucoup d\'escaliers sans téléphérique).','Moderate (many stairs without the cable car).'); a('Moyenne, très agréable.','Moderate and very pleasant.');
  a('Construite sous les Ming, Simatai est la seule section préservant son aspect d\'origine. Elle est reconnue par l\'UNESCO pour son authenticité remarquable parmi toutes les sections.','Built under the Ming, Simatai is the only section preserving its original appearance. UNESCO recognizes it for its remarkable authenticity among all sections.');
  a('La seule section ouverte la nuit, offrant des panoramas féériques. Le village aquatique de Gubei voisin permet de combiner patrimoine et détente.','The only section open at night, offering magical panoramas. Nearby Gubei Water Town combines heritage and relaxation.');
  a('Environ 120 km (2h30 de route).','Around 120 km (2.5 hours by road).'); a('Moyenne à élevée (pentes raides).','Moderate to high (steep slopes).'); a('Moyenne.','Moderate.');
  a('Son nom signifie « l\'encoche de la flèche », en raison de la forme de la montagne. Jiankou a été construite en dolomite blanche, lui donnant une couleur frappante face à la roche sombre.','Its name means “arrow notch,” due to the shape of the mountain. Jiankou was built from white dolomite, giving it a striking color against the dark rock.');
  a('C\'est la muraille dans son état brut. Jamais restaurée, envahie par la végétation. Le paradis des photographes et des randonneurs à la recherche de la « vraie » Muraille.','This is the Wall in its raw state: never restored and overgrown with vegetation. A paradise for photographers and hikers seeking the “real” Wall.');
  a('Environ 80 km.','Around 80 km.'); a('Extrême. Ascension presque verticale par endroits.','Extreme. Almost vertical climbs in places.'); a('Très faible (guide local recommandé).','Very low (local guide recommended).');
  a('Atlas planifiable','Plannable atlas');
  a('Section restaurée, accès le plus simple depuis Pékin. Cliquez sur un site pour l’afficher sur la carte. Le Carnet de Route Impérial se synchronise aussi, sans vous déplacer dans la page.','Restored section, the easiest access from Beijing. Click a site to show it on the map. The Imperial Route Notebook also synchronizes without moving you around the page.');
  a('La carte intégrée est une vraie Google Maps : quand vous déplacez ou zoomez, le repère reste attaché au site réel sélectionné.','The embedded map is a real Google Map: when you pan or zoom, the marker remains attached to the actual selected site.');
  a('Nouveau module signature / prototype patrimoine','New signature module / heritage prototype');
  a('✓ Itinéraires réels Google Maps','✓ Real Google Maps routes'); a('✓ Recommandations personnalisées','✓ Personalized recommendations'); a('✓ Tourisme responsable','✓ Responsible tourism'); a('✓ Défi photo communautaire','✓ Community photo challenge');
  a('La porte d\'entrée iconique, fluide et accessible depuis Pékin.','The iconic, smooth and accessible gateway from Beijing.');
  a('Premium / sans friction','Premium / seamless');
  a('Badaling — Première grande traversée','Badaling — First great crossing');
  a('Zhajiangmian, jiaozi et thé au jasmin au retour vers Pékin.','Zhajiangmian, jiaozi and jasmine tea on the return to Beijing.');
  a('Retour conseillé à Pékin pour un meilleur choix d\'hôtels.','Returning to Beijing is recommended for a wider choice of hotels.');
  a('Arrivez avant 8h30 : lumière douce, files plus courtes et photos plus propres.','Arrive before 8:30 a.m.: soft light, shorter lines and cleaner photos.');
  a('Gamification responsable','Responsible gamification'); a('Défi photo : Mon regard sur la Muraille','Photo challenge: My view of the Wall');
  a('Voir le challenge sur Instagram','View the challenge on Instagram'); a('#MCNGreatWallChallenge · Galerie sociale officielle du prototype','#MCNGreatWallChallenge · Official social gallery of the prototype');
  a('Avis d\'expérience — style Google','Experience reviews — Google style');
  a('Une section de confiance conçue pour rassurer l\'utilisateur, mettre en avant les points forts des sections visitées et guider le choix d\'itinéraire.','A trust section designed to reassure users, highlight the strengths of visited sections and guide itinerary choices.');
  a('« Panorama spectaculaire, accès très simple depuis Pékin et parcours bien balisé. Idéal pour une première découverte de la Muraille. »','“Spectacular panorama, very easy access from Beijing and a well-marked route. Ideal for a first discovery of the Wall.”');
  a('Visiteur international · Google Reviews','International visitor · Google Reviews');
  a('« Moins dense, très photogénique, avec une vue magnifique sur les crêtes. Le téléphérique rend la visite confortable. »','“Less crowded, highly photogenic, with a magnificent view over the ridges. The cable car makes the visit comfortable.”');
  a('Famille en voyage · Google Reviews','Traveling family · Google Reviews');
  a('« Une expérience plus authentique et sportive. Les tours de guet et la lumière du matin donnent une impression mémorable. »','“A more authentic and athletic experience. The watchtowers and morning light create a memorable impression.”');
  a('Randonneur · Google Reviews','Hiker · Google Reviews');
  a('Distance de Pékin (Badaling)','Distance from Beijing (Badaling)'); a('Sections accessibles','Accessible sections');

  a('L\'équipe derrière','The team behind'); a('l\'expérience','the experience');
  a('Nous avons imaginé ce prototype comme une réponse professionnelle à un appel d\'offres culturel : un site immersif, accessible et international pour promouvoir la Grande Muraille de Chine, rendre sa culture plus lisible et transformer la visite en parcours numérique.','We designed this prototype as a professional response to a cultural call for projects: an immersive, accessible and international website to promote the Great Wall of China, make its culture easier to understand and transform the visit into a digital journey.');
  a('Votre avis nous aide à améliorer la navigation, les contenus, l\'accessibilité et la qualité générale de l\'expérience.','Your feedback helps us improve navigation, content, accessibility and the overall quality of the experience.');
  a('Donner son avis','Give feedback'); a('4 profils','4 profiles'); a('complémentaires','complementary');
  a('Quatre rôles complémentaires structurent le prototype : direction technique, cohérence culturelle, interactions et finition responsive.','Four complementary roles structure the prototype: technical direction, cultural consistency, interactions and responsive finishing.');
  a('Direction technique · HTML/CSS/JS','Technical direction · HTML/CSS/JS');
  a('Coordination du projet, architecture du site, intégration principale et cohérence de l\'expérience utilisateur.','Project coordination, site architecture, main integration and user-experience consistency.');
  a('Cohérence culturelle · HTML/CSS','Cultural consistency · HTML/CSS');
  a('Vérification culturelle, précision des contenus historiques et contribution à la structure éditoriale du site.','Cultural verification, accuracy of historical content and contribution to the site’s editorial structure.');
  a('Interactions · CSS/JS','Interactions · CSS/JS');
  a('Développement des interactions, amélioration des composants dynamiques et fluidité des parcours.','Interaction development, improvement of dynamic components and smoother user journeys.');
  a('Finition responsive · CSS/JS','Responsive finishing · CSS/JS');
  a('Optimisation des interfaces, ajustements visuels et stabilité responsive des composants interactifs.','Interface optimization, visual adjustments and responsive stability of interactive components.');
  a('Faire grandir','Help it grow');
  a('Un soutien permettrait d\'améliorer l\'hébergement, d\'ajouter de vraies API touristiques, d\'enrichir les contenus historiques vérifiés et de maintenir les modules d\'accessibilité.','Support would help improve hosting, add real tourism APIs, enrich verified historical content and maintain accessibility modules.');
  a('Un soutien permettrait d\'améliorer l\'hébergement, d\'ajouter de vraies API touristiques, d\'enrichir les contenus multimédias et de maintenir les modules d\'accessibilité.','Support would help improve hosting, add real tourism APIs, enrich multimedia content and maintain accessibility modules.');
  a('Don sécurisé via PayPal','Secure donation via PayPal');
  a('Prototype : lien à connecter au compte officiel du projet si le site passe en production.','Prototype: link to connect to the project’s official account if the site goes into production.');
  a('Soutenir via PayPal','Support via PayPal');
  a('Le bouton PayPal est prêt pour la démonstration et peut être remplacé par votre vrai lien de collecte.','The PayPal button is ready for the demonstration and can be replaced by your real collection link.');
  a('Le formulaire utilise Formspree et transmet le message à l\'adresse de contact du projet. Pour améliorer le site en autonomie, vous pouvez aussi','The form uses Formspree and forwards the message to the project contact address. To improve the site independently, you can also');
  a('recenser l’expérience utilisateur','collect user-experience feedback');

  a('Le site « La Grande Muraille de Chine » est un projet étudiant réalisé dans le cadre de la formation M.C.N. (Médiation Culturelle et Numérique).','The “Great Wall of China” website is a student project created as part of the M.C.N. program (Cultural and Digital Mediation).');
  a('Ce site est hébergé localement ou sur une plateforme d\'hébergement web gratuite / académique dans le cadre d\'un rendu de projet universitaire.','This site is hosted locally or on a free/academic web-hosting platform as part of a university project submission.');
  a('La structure générale, ainsi que les textes, images et éléments graphiques composant ce site sont la propriété de l\'équipe M.C.N. ou sont utilisés avec autorisation/libre de droits à des fins éducatives. Toute reproduction, totale ou partielle, est strictement interdite sans autorisation préalable.','The overall structure, texts, images and graphic elements making up this site are the property of the M.C.N. team or are used with authorization/royalty-free for educational purposes. Any full or partial reproduction is strictly prohibited without prior authorization.');
  a('Les mentions et logos de l\'UNESCO utilisés sur ce site le sont exclusivement dans un cadre académique et symbolique. Ce site n\'est pas une plateforme officielle de l\'UNESCO.','UNESCO references and logos used on this site are exclusively for academic and symbolic purposes. This site is not an official UNESCO platform.');
  a('La page À propos peut contenir un lien de soutien externe et un formulaire Formspree. Ces éléments sont intégrés dans une logique de prototype et doivent être configurés avec les comptes officiels de l\'équipe avant toute mise en production.','The About page may contain an external support link and a Formspree form. These elements are included as part of the prototype and must be configured with the team’s official accounts before any production release.');
  a('Dans le cadre de ce projet académique et informatif (M.C.N.), nous ne collectons aucune donnée personnelle à des fins commerciales. Les seules données traitées sont celles que vous pourriez nous envoyer volontairement via les formulaires de contact éventuels.','As part of this academic and informational project (M.C.N.), we do not collect any personal data for commercial purposes. The only data processed is what you may voluntarily send through possible contact forms.');
  a('Ce prototype ne dépose aucun cookie publicitaire ou de traçage. Il utilise uniquement le stockage local du navigateur (','This prototype does not place any advertising or tracking cookies. It only uses the browser’s local storage (');
  a(') pour mémoriser des préférences de confort : langue français/anglais, mode daltonien, ambiance sonore, acceptation de l\'expérience et dernier carnet de route généré. Ces informations restent sur l\'appareil de l\'utilisateur et ne sont pas transmises à nos serveurs.',') to remember comfort preferences: French/English language, color-blind mode, sound ambience, experience acceptance and the last generated route notebook. This information remains on the user’s device and is not transmitted to our servers.');
  a('Vos informations ne sont jamais vendues, échangées ou transférées à des tiers. Ce site est réalisé en partenariat symbolique avec les directives de l\'UNESCO pour la préservation numérique.','Your information is never sold, exchanged or transferred to third parties. This site is created in symbolic partnership with UNESCO guidelines for digital preservation.');
  a('4. Formulaire de contact et services externes :','4. Contact form and external services:');
  a('5. Vos droits :','5. Your rights:');
  a('Le formulaire de la page À propos utilise Formspree pour transmettre les messages à l\'adresse de contact du projet. Les liens de soutien peuvent rediriger vers PayPal ou une autre plateforme externe : leurs propres politiques de confidentialité s\'appliquent.','The form on the About page uses Formspree to send messages to the project contact address. Support links may redirect to PayPal or another external platform; their own privacy policies apply.');
  a('Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données en nous contactant directement via l\'adresse fournie dans le pied de page.','In accordance with the GDPR, you have the right to access, rectify and delete your data by contacting us directly through the address provided in the footer.');

  /* Paires longues (substring) */
  const PHRASES = [
    ["Le site devient un véritable poste de pilotage culturel : parcours de visite, conservation, accessibilité, cartographie et récits historiques sont réunis dans une interface immersive inspirée de l'encre, du jade et de l'or impérial.","The site becomes a true cultural command center: visit routes, conservation, accessibility, mapping and historical narratives are brought together in an immersive interface inspired by ink, jade and imperial gold."],
    ["Parcours de visite, conservation, accessibilité, cartographie et récits historiques sont réunis dans une interface immersive, inspirée de l'encre, de la pierre et de l'or impérial.","Visit routes, conservation, accessibility, mapping and historical narratives are brought together in an immersive interface inspired by ink, stone and imperial gold."],
    ["Après avoir généré son carnet, le visiteur peut participer à un jeu concours culturel : publier une photo originale avec le hashtag","After generating the notebook, visitors can join a cultural contest by posting an original photo with the hashtag"],
    ["Le défi valorise les regards créatifs et respectueux du patrimoine : une composition originale, une lumière soignée, un récit court sur la section visitée et une attitude responsable sur le site.","The challenge rewards creative, heritage-conscious perspectives: original framing, refined light, a short story about the visited section and responsible behavior on site."],
    ["Un planificateur culturel intelligent : cliquez sur un tronçon, choisissez votre date, votre rythme et vos préférences. Le site compose un itinéraire réaliste avec accès Google Maps, conseils de visite, gastronomie locale, hôtels, score d'expérience et passeport patrimoine.","An intelligent cultural planner: click a section, choose your date, pace and preferences. The site builds a realistic itinerary with Google Maps access, visit advice, local food, hotels, experience score and heritage passport."],
    ["Section restaurée, accès le plus simple depuis Pékin.","Restored section, the simplest access from Beijing."],
    ["Une fonctionnalité mémorable pour le jury : le visiteur collecte des sceaux virtuels en explorant l'histoire, l'architecture, la préservation et la visite.","A memorable feature for the jury: visitors collect virtual seals while exploring history, architecture, preservation and the visit."],
    ["Un comparateur visuel explique la différence entre une section sauvage et une section restaurée, sans remplacer l'histoire par du spectaculaire gratuit.","A visual comparator explains the difference between a wild section and a restored section without replacing history with empty spectacle."],
    ["Simulation pédagogique : climat, fréquentation et érosion sont synthétisés en un indicateur clair pour comprendre les enjeux UNESCO.","Educational simulation: climate, visitor pressure and erosion are synthesized into a clear indicator to understand UNESCO preservation issues."],
  ];

  /* ═══════════════════════════════════════════════
     TRADUCTION D'UN NŒUD TEXTE
  ═══════════════════════════════════════════════ */
  function tr(original) {
    if (!original || !norm(original)) return original;
    const k = key(original);
    if (D.has(k)) return D.get(k);
    let out = original;
    for (const [fr, en] of PHRASES) {
      if (out.includes(fr)) out = out.split(fr).join(en);
    }
    return out;
  }

  const SKIP_TAGS  = 'script,style,noscript,code,pre,textarea';
  // Elements gérés par CSS lang-fr/lang-en : ne pas traduire leur texte
  const SKIP_CLASS = '.lang-fr,.lang-en';

  function translateDOM(lang) {
    const walker = document.createTreeWalker(
      document.body, NodeFilter.SHOW_TEXT,
      { acceptNode: n => {
          if (!norm(n.nodeValue)) return NodeFilter.FILTER_REJECT;
          const el = n.parentElement;
          if (!el) return NodeFilter.FILTER_REJECT;
          if (el.closest(SKIP_TAGS)) return NodeFilter.FILTER_REJECT;
          // Skip elements managed by CSS (.lang-fr / .lang-en)
          if (el.closest('.lang-fr') || el.closest('.lang-en')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
      }}
    );
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      if (!n.__mcnFR) n.__mcnFR = n.nodeValue;
      const next = lang === 'en' ? tr(n.__mcnFR) : n.__mcnFR;
      if (n.nodeValue !== next) n.nodeValue = next;
    });

    // Attributs
    ['placeholder','aria-label','title','alt'].forEach(attr => {
      document.querySelectorAll('[' + attr + ']:not(.lang-fr):not(.lang-en)').forEach(el => {
        if (el.closest('.lang-fr') || el.closest('.lang-en')) return;
        const ds = '_fr_' + attr.replace('-','_');
        if (!el.dataset[ds]) el.dataset[ds] = el.getAttribute(attr) || '';
        const next = lang === 'en' ? tr(el.dataset[ds]) : el.dataset[ds];
        if (el.getAttribute(attr) !== next) el.setAttribute(attr, next);
      });
    });

    // Options
    document.querySelectorAll('option').forEach(o => {
      if (!o.dataset.mcnFr) o.dataset.mcnFr = o.textContent;
      o.textContent = lang === 'en' ? tr(o.dataset.mcnFr) : o.dataset.mcnFr;
    });
  }

  /* ═══════════════════════════════════════════════
     AFFICHAGE CSS — .lang-fr / .lang-en
     html:not(.is-english) .lang-en { display: none }
     html.is-english       .lang-fr { display: none }
     Géré par le CSS dans dynasty_modal_enhance.css
  ═══════════════════════════════════════════════ */
  function applyCSSLang(lang) {
    // La classe is-english sur <html> suffit pour le CSS
    // Pas besoin de toucher manuellement à chaque .lang-fr/.lang-en
    document.documentElement.classList.toggle('is-english', lang === 'en');
  }

  /* ═══════════════════════════════════════════════
     APPLIQUER LA LANGUE
  ═══════════════════════════════════════════════ */
  function applyLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('mcn-lang', lang);
    applyCSSLang(lang);
    translateDOM(lang);
    if (typeof mcnFinalV7PostProcess === 'function') setTimeout(() => mcnFinalV7PostProcess(lang), 0);
    if (typeof mcnV8Patch === 'function') setTimeout(() => mcnV8Patch(lang), 10);

    // Boutons lang-btn : activer le bon
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Autres labels fixes
    document.querySelectorAll('.mode-normal').forEach(el => { el.textContent = lang === 'en' ? 'Standard' : 'Normal'; });
    document.querySelectorAll('.mode-daltonien').forEach(el => { el.textContent = lang === 'en' ? 'Color-blind' : 'Daltonien'; });

    // Notifier mcn_premium_finish
    if (window.__mcnLangSubs) window.__mcnLangSubs.forEach(fn => { try { fn(); } catch(e) {} });
  }

  /* ═══════════════════════════════════════════════
     DALTONIEN
  ═══════════════════════════════════════════════ */
  function applyColorblind(on) {
    const cb = document.getElementById('daltonien-mode');
    if (cb) cb.checked = on;
    document.documentElement.classList.toggle('mcn-colorblind', on);
    if (on) localStorage.setItem('mcn-colorblind', '1');
    else localStorage.removeItem('mcn-colorblind');
  }
  document.addEventListener('change', e => {
    if (e.target && e.target.id === 'daltonien-mode') {
      const on = e.target.checked;
      localStorage.setItem('mcn-colorblind', on ? '1' : '0');
      applyColorblind(on);
    }
  });

  /* ═══════════════════════════════════════════════
     COOKIE BANNER
  ═══════════════════════════════════════════════ */
  function initCookies() {
    const banner = document.querySelector('.cookie-consent');
    if (!banner) return;
    if (localStorage.getItem('mcn-consent') !== 'ok') {
      setTimeout(() => banner.classList.add('is-visible'), 900);
    }
    const btn = banner.querySelector('.cookie-accept');
    if (btn) btn.addEventListener('click', () => {
      localStorage.setItem('mcn-consent', 'ok');
      banner.classList.remove('is-visible');
    });
  }



  /* ═══════════════════════════════════════════════
     PATCH FINAL v7 — captures utilisateur : dynasties, atlas, carnet,
     challenge photo, avis Google et textes injectés dynamiques.
  ═══════════════════════════════════════════════ */
  (function addFinalV7Translations(){
    const pairs = [
      ['Première dynastie légendaire de Chine. Les premiers travaux de drainage posent les bases du contrôle territorial.', 'First legendary dynasty of China. Early drainage works laid the foundations for territorial control.'],
      ['Première dynastie semi-légendaire de Chine. On lui attribue les premiers grands travaux de drainage et de digues qui posent, bien avant le mur, l\'idée d\'un contrôle organisé du territoire et de l\'eau.', 'China\'s first semi-legendary dynasty. It is credited with early drainage and dyke works that, long before the Wall, introduced the idea of organized control over land and water.'],
      ['Premières fortifications en terre battue pour protéger les cités royales. Début de l\'organisation défensive du territoire chinois.', 'First rammed-earth fortifications built to protect royal cities. Beginning of the defensive organization of Chinese territory.'],
      ['Premières fortifications fragmentées érigées par les États féodaux pour marquer leurs frontières.', 'First fragmented fortifications erected by feudal states to mark their borders.'],
      ['Unification des remparts par le premier Empereur pour créer une barrière continue contre les incursions du Nord.', 'Unification of earlier walls by the First Emperor to create a continuous barrier against northern incursions.'],
      ['Section restaurée, accès le plus simple depuis Pékin. Idéale pour familles, accessibilité et première découverte.', 'Restored section with the easiest access from Beijing. Ideal for families, accessibility and a first discovery.'],
      ['Section restaurée, accès le plus simple depuis Pékin. Cliquez sur un site pour l’afficher sur la carte. Le Carnet de Route Impérial se synchronise aussi, sans vous déplacer dans la page.', 'Restored section with the easiest access from Beijing. Click a site to display it on the map. The Imperial Route Notebook also synchronizes without moving you down the page.'],
      ['L\'embedded map is a real Google Map: when you pan or zoom, the marker remains attached to the actual selected site.', 'The embedded map is a real Google Map: when you pan or zoom, the marker remains attached to the actual selected site.'],
      ['La carte intégrée est une vraie Google Map : lorsque vous déplacez ou zoomez la carte, le marqueur reste attaché au site réellement sélectionné.', 'The embedded map is a real Google Map: when you pan or zoom, the marker remains attached to the actual selected site.'],
      ['Badaling — Première grande traversée', 'Badaling — First grand crossing'],
      ['Départ depuis Pékin, marge de sécurité incluse.', 'Departure from Beijing, safety margin included.'],
      ['Arrivée au centre d’accueil et récupération des billets.', 'Arrival at the visitor center and ticket collection.'],
      ['Montée vers les tours nord avec pauses photo.', 'Climb toward the northern towers with photo stops.'],
      ['Déjeuner local et découverte des spécialités.', 'Local lunch and discovery of regional specialties.'],
      ['Musée / lecture patrimoniale sur la défense Ming.', 'Museum / heritage reading on Ming defense.'],
      ['Retour vers Pékin ou installation hôtel.', 'Return to Beijing or hotel check-in.'],
      ['Zhajiangmian, jiaozi, thé au jasmin et snacks de Yanqing.', 'Zhajiangmian, jiaozi, jasmine tea and Yanqing snacks.'],
      ['Retour à Pékin conseillé ou hôtel confort à Yanqing.', 'Return to Beijing recommended, or a comfort hotel in Yanqing.'],
      ['Arrivez avant 8h30 : lumière douce et files plus courtes.', 'Arrive before 8:30 a.m.: soft light and shorter queues.'],
      ['Des retours synthétiques pour comparer les sections, comprendre leur niveau d’accessibilité et préparer une visite plus sereine.', 'Concise feedback to compare sections, understand their accessibility level and prepare a calmer visit.'],
      ['Des retours synthétiques pour comparer les sections, comprendre leur niveau d\'accessibilité et préparer une visite plus sereine.', 'Concise feedback to compare sections, understand their accessibility level and prepare a calmer visit.'],
      ['Une section de confiance conçue pour rassurer l\'utilisateur, mettre en avant les points forts des sections visitées et guider le choix d\'itinéraire.', 'A trust-building section designed to reassure users, highlight each visited section’s strengths and guide itinerary choices.'],
      ['Défi photo : Mon regard sur la Muraille', 'Photo challenge: My view of the Wall'],
      ['Mon regard sur la Muraille', 'My view of the Wall'],
      ['Voir la galerie responsable', 'View the responsible gallery'],
      ['VOIR LA GALERIE RESPONSABLE', 'VIEW THE RESPONSIBLE GALLERY'],
      ['Après avoir généré son carnet, le visiteur peut participer à un jeu concours culturel : publier une photo originale avec le hashtag', 'After generating the notebook, visitors can join a cultural contest by posting an original photo with the hashtag'],
      ['Le défi valorise les regards créatifs et respectueux du patrimoine : une composition originale, une lumière soignée, un récit court sur la section visitée et une attitude responsable sur le site.', 'The challenge rewards creative, heritage-conscious perspectives: original framing, refined light, a short story about the visited section and responsible behavior on site.'],
      ['ROYAUMES', 'WARRING STATES'],
      ['AUJOURD\'HUI', 'TODAY'],
      ['États féodaux', 'Feudal states'],
      ['Période des Royaumes Combattants', 'Warring States Period'],
      ['Dynastie Xia', 'Xia Dynasty'], ['Dynastie Shang', 'Shang Dynasty'], ['Dynastie Qin', 'Qin Dynasty'], ['Dynastie Han', 'Han Dynasty'],
      ['Dynasties clés de la Grande Muraille', 'Key dynasties of the Great Wall'],
      ['~2070-1600 av. J.-C.', '~2070–1600 BCE'], ['~1600-1046 av. J.-C.', '~1600–1046 BCE'], ['481-221 av. J.-C.', '481–221 BCE'], ['221-206 av. J.-C.', '221–206 BCE'], ['206 av. J.-C. - 220', '206 BCE – 220 CE'],
      ['481–221 av. J.-C. — États féodaux en guerre, fortifications multiples.', '481–221 BCE — Warring feudal states, multiple fortifications.'],
      ['~2070 av. J.-C.', '~2070 BCE'], ['~1600 av. J.-C.', '~1600 BCE'], ['~1046 av. J.-C.', '~1046 BCE'], ['481 av. J.-C.', '481 BCE'], ['221 av. J.-C.', '221 BCE'], ['206 av. J.-C.', '206 BCE'], ['618 ap. J.-C.', '618 CE'],
      ['Section sélectionnée', 'Selected section'], ['Atlas planifiable', 'Plannable atlas'], ['Ouvrir dans Google Maps', 'Open in Google Maps'], ['Aller au carnet', 'Go to notebook'],
      ['Carnet de Route Impérial', 'Imperial Route Notebook'], ['Itinéraire recommandé', 'Recommended itinerary'], ['À goûter', 'To taste'], ['Où dormir', 'Where to stay'], ['Conseil terrain', 'Field tip'],
      ['Avis d\'expérience — style Google', 'Experience reviews — Google style'], ['Retours visiteurs', 'Visitor feedback'],
      ['M.C.N. / Médiation Culturelle & Numérique', 'M.C.N. / Cultural & Digital Mediation'],
      ['L\'équipe derrière', 'The team behind'], ['l\'expérience', 'the experience'],
      ['4 profils', '4 profiles'], ['complémentaires', 'complementary']
    ];
    pairs.forEach(([fr,en]) => a(fr,en));
  })();

  function mcnFinalV7PostProcess(lang) {
    if (lang !== 'en') return;
    const map = new Map([
      ['ROYAUMES','WARRING STATES'], ['AUJOURD\'HUI','TODAY'],
      ['Voir la galerie responsable','View the responsible gallery'], ['VOIR LA GALERIE RESPONSABLE','VIEW THE RESPONSIBLE GALLERY']
    ]);
    document.querySelectorAll('.frise-name, .timeline-dynasty, .timeline-title, .imperial-btn, .premium-cta, .ghost-cta, #challenge-title, #reviews-title, #atlas-copy, #route-title, #food-reco, #hotel-reco, #pro-tip').forEach(el => {
      const raw = (el.textContent || '').trim();
      if (map.has(raw)) el.textContent = map.get(raw);
      else {
        const translated = tr(raw);
        if (translated && translated !== raw) el.textContent = translated;
      }
    });
    document.querySelectorAll('.frise-tip, .timeline-period, .timeline-text, .section-heading p, .challenge-copy p, #route-timeline li span, #route-timeline li, .google-map-panel p, .review-card p, .review-card small').forEach(el => {
      const raw = (el.textContent || '').trim();
      const translated = tr(raw);
      if (translated && translated !== raw) el.textContent = translated;
    });
  }



  /* ═══════════════════════════════════════════════
     PATCH v8 — corrections finales captures + dynamique FR/EN réversible
  ═══════════════════════════════════════════════ */
  const MCN_V8_SECTIONS = {
    badaling: {
      name:'Badaling',
      tag:{fr:"La porte d’entrée iconique, fluide et accessible depuis Pékin.", en:"The iconic, smooth and accessible gateway from Beijing."},
      copy:{fr:"Section restaurée, accès le plus simple depuis Pékin. Idéale pour familles, accessibilité et première découverte.", en:"Restored section with the easiest access from Beijing. Ideal for families, accessibility and a first discovery."},
      title:{fr:"Badaling — Première grande traversée", en:"Badaling — First grand crossing"},
      food:{fr:"Zhajiangmian, jiaozi, thé au jasmin et snacks de Yanqing.", en:"Zhajiangmian, jiaozi, jasmine tea and Yanqing snacks."},
      hotel:{fr:"Retour à Pékin conseillé ou hôtel confort à Yanqing.", en:"Return to Beijing recommended, or a comfort hotel in Yanqing."},
      tip:{fr:"Arrivez avant 8h30 : lumière douce et files plus courtes.", en:"Arrive before 8:30 a.m.: soft light and shorter queues."},
      timeline:{fr:['07:15|Départ depuis Pékin, marge de sécurité incluse.','09:00|Arrivée au centre d’accueil et récupération des billets.','09:30|Montée vers les tours nord avec pauses photo.','12:15|Déjeuner local et découverte des spécialités.','14:00|Musée / lecture patrimoniale sur la défense Ming.','16:00|Retour vers Pékin ou installation hôtel.'], en:['07:15|Departure from Beijing, safety margin included.','09:00|Arrival at the visitor center and ticket collection.','09:30|Climb toward the northern towers with photo stops.','12:15|Local lunch and discovery of regional specialties.','14:00|Museum / heritage reading on Ming defense.','16:00|Return to Beijing or hotel check-in.']}
    },
    mutianyu: {
      name:'Mutianyu', tag:{fr:'Le meilleur équilibre entre beauté, confort et panoramas.', en:'The best balance between beauty, comfort and panoramic views.'},
      copy:{fr:'Panoramas plus calmes, section restaurée élégante, excellente pour photos et familles.', en:'Quieter panoramas, an elegant restored section, excellent for photos and families.'},
      title:{fr:'Mutianyu — Panorama premium et familial', en:'Mutianyu — Premium family panorama'},
      food:{fr:'Truite locale, nouilles, raviolis vapeur et thé vert.', en:'Local trout, noodles, steamed dumplings and green tea.'},
      hotel:{fr:'Boutique hôtel dans le district de Huairou ou retour Pékin.', en:'Boutique hotel in Huairou district or return to Beijing.'},
      tip:{fr:'Privilégiez la fin d’après-midi pour une lumière rasante spectaculaire.', en:'Choose late afternoon for spectacular low-angle light.'},
      timeline:{fr:['07:45|Départ depuis Pékin vers Huairou.','09:45|Arrivée à Mutianyu et montée téléphérique ou sentier doux.','10:30|Marche panoramique entre les tours 14 et 20.','12:45|Déjeuner local à Huairou.','14:30|Temps photo, descente et visite d’un village voisin.','17:00|Retour ou check-in boutique hôtel.'], en:['07:45|Departure from Beijing toward Huairou.','09:45|Arrival at Mutianyu and cable-car ascent or gentle trail.','10:30|Panoramic walk between towers 14 and 20.','12:45|Local lunch in Huairou.','14:30|Photo time, descent and visit to a nearby village.','17:00|Return or boutique-hotel check-in.']}
    },
    jinshanling: {
      name:'Jinshanling', tag:{fr:'La section des photographes et des marcheurs exigeants.', en:'The section for photographers and demanding hikers.'},
      copy:{fr:'Semi-restaurée, photogénique, parfaite pour ressentir la Muraille dans le paysage.', en:'Semi-restored and highly photogenic, perfect for feeling the Wall within the landscape.'},
      title:{fr:'Jinshanling — Traversée photographique', en:'Jinshanling — Photographic crossing'},
      food:{fr:'Plats paysans du Hebei, légumes de montagne, nouilles maison.', en:'Hebei country dishes, mountain vegetables and homemade noodles.'},
      hotel:{fr:'Guesthouse près de Gubeikou ou lodge panoramique.', en:'Guesthouse near Gubeikou or panoramic lodge.'},
      tip:{fr:'Chaussures de marche obligatoires : marches irrégulières et longues crêtes.', en:'Walking shoes required: uneven steps and long ridgelines.'},
      timeline:{fr:['06:30|Départ tôt pour profiter de la lumière du matin.','09:30|Arrivée et briefing sécurité.','10:00|Randonnée progressive sur les crêtes restaurées et sauvages.','12:30|Pique-nique ou déjeuner local.','14:00|Séquence photo Golden Wall et tours anciennes.','17:30|Retour ou nuit en guesthouse.'], en:['06:30|Early departure to enjoy morning light.','09:30|Arrival and safety briefing.','10:00|Progressive hike across restored and wild ridges.','12:30|Picnic or local lunch.','14:00|Golden Wall photo session and ancient towers.','17:30|Return or overnight in a guesthouse.']}
    },
    simatai: {
      name:'Simatai', tag:{fr:'L’expérience nocturne la plus spectaculaire.', en:'The most spectacular night-time experience.'},
      copy:{fr:'Section ouverte en soirée, atmosphère dramatique près de Gubei Water Town.', en:'Evening-access section with a dramatic atmosphere near Gubei Water Town.'},
      title:{fr:'Simatai — Muraille nocturne', en:'Simatai — Night Wall'},
      food:{fr:'Cuisine de Gubei Water Town, fondue locale, desserts chinois.', en:'Gubei Water Town cuisine, local hotpot and Chinese desserts.'},
      hotel:{fr:'Hôtel à Gubei Water Town pour prolonger l’expérience nocturne.', en:'Hotel in Gubei Water Town to extend the night experience.'},
      tip:{fr:'Réservez tôt : les créneaux de nuit sont limités et très demandés.', en:'Book early: night slots are limited and highly requested.'},
      timeline:{fr:['12:00|Départ tranquille depuis Pékin.','15:00|Arrivée à Gubei Water Town et promenade culturelle.','17:30|Dîner avant la montée.','19:00|Accès à Simatai illuminée.','20:30|Photos nocturnes et lecture du paysage.','22:00|Nuit sur place ou retour tardif.'], en:['12:00|Relaxed departure from Beijing.','15:00|Arrival at Gubei Water Town and cultural walk.','17:30|Dinner before the ascent.','19:00|Access to illuminated Simatai.','20:30|Night photos and landscape reading.','22:00|Overnight stay or late return.']}
    },
    jiankou: {
      name:'Jiankou', tag:{fr:'Sauvage, intense, réservé aux profils expérimentés.', en:'Wild, intense and reserved for experienced visitors.'},
      copy:{fr:'Section non restaurée, spectaculaire mais exigeante. À aborder avec guide et prudence.', en:'Unrestored, spectacular but demanding. Visit with a guide and caution.'},
      title:{fr:'Jiankou — Expédition sauvage encadrée', en:'Jiankou — Guided wild expedition'},
      food:{fr:'Repas rural à Xizhazi, légumes sautés, tofu, thé chaud.', en:'Rural meal in Xizhazi, stir-fried vegetables, tofu and hot tea.'},
      hotel:{fr:'Maison d’hôtes locale simple ou retour tardif à Pékin.', en:'Simple local guesthouse or late return to Beijing.'},
      tip:{fr:'Ne partez pas seul : terrain instable, orientation difficile et préservation fragile.', en:'Do not go alone: unstable ground, difficult orientation and fragile heritage.'},
      timeline:{fr:['06:00|Départ avec guide spécialisé.','08:30|Briefing sécurité et accès village.','09:00|Montée progressive vers les tours sauvages autorisées.','12:00|Pause panoramique sans sortir des zones sûres.','14:00|Descente contrôlée et repas rural.','17:30|Retour vers Pékin.'], en:['06:00|Departure with a specialized guide.','08:30|Safety briefing and village access.','09:00|Progressive ascent toward authorized wild towers.','12:00|Panoramic break without leaving safe areas.','14:00|Controlled descent and rural meal.','17:30|Return to Beijing.']}
    },
    huanghuacheng: {
      name:'Huanghuacheng', tag:{fr:'Muraille, eau et montagne dans une ambiance rare.', en:'Wall, water and mountains in a rare atmosphere.'},
      copy:{fr:'Section lacustre originale, idéale pour une visite calme et contemplative.', en:'Original lakeside section, ideal for a calm and contemplative visit.'},
      title:{fr:'Huanghuacheng — Muraille au bord de l’eau', en:'Huanghuacheng — Lakeside Wall'},
      food:{fr:'Poisson du lac, légumes sautés, nouilles et thé local.', en:'Lake fish, stir-fried vegetables, noodles and local tea.'},
      hotel:{fr:'Auberge lacustre ou hôtel confort à Huairou.', en:'Lakeside inn or comfort hotel in Huairou.'},
      tip:{fr:'Excellent choix au printemps et en automne pour les reflets sur le lac.', en:'Excellent choice in spring and autumn for reflections on the lake.'},
      timeline:{fr:['08:00|Départ depuis Pékin vers Huairou.','10:00|Arrivée au site lacustre.','10:30|Marche douce et points de vue sur l’eau.','12:30|Déjeuner poisson / spécialités locales.','14:30|Promenade photo ou bateau selon saison.','16:30|Retour vers Pékin.'], en:['08:00|Departure from Beijing toward Huairou.','10:00|Arrival at the lakeside site.','10:30|Gentle walk and viewpoints over the water.','12:30|Fish lunch / local specialties.','14:30|Photo walk or boat depending on the season.','16:30|Return to Beijing.']}
    }
  };

  const MCN_V8_EXTRA = [
    ['Restaurer virtuellement la muraille','Virtually restore the Wall'], ['🎨 Restaurer virtuellement la muraille','🎨 Virtually restore the Wall'], ['🎨 RESTAURER VIRTUELLEMENT LA MURAILLE','🎨 VIRTUALLY RESTORE THE WALL'],

    ['481-221 av. J.-C. — États féodaux en guerre, fortifications multiples.','481–221 BCE — Warring feudal states, multiple fortifications.'],
    ['481–221 av. J.-C. — États féodaux en guerre, fortifications multiples.','481–221 BCE — Warring feudal states, multiple fortifications.'],
    ['⚠️ Attention : À ne surtout pas reproduire sur place !','⚠️ Warning: never reproduce this on the actual site!'],
    ["Le patrimoine est précieux. Exprimez-vous ici, mais n'oubliez pas de nettoyer avant de partir !",'Heritage is precious. Express yourself here, but remember to restore the wall before leaving!'],
    ['🧽 Nettoyer mon graffiti','🧽 Restore the wall'],
    ["Mur d\'expression libre",'Virtual restoration workshop'],
    ['Atelier pédagogique : à ne jamais reproduire sur site.','Educational workshop: never reproduce this on site.'],
    ["Observez l'impact d'une trace sur la pierre, puis restaurez le mur pour comprendre les gestes de préservation.",'Observe the impact of a mark on stone, then restore the wall to understand preservation practices.'],
    ['Merci : sur site, le meilleur geste de conservation est de ne rien laisser derrière soi.','Thank you: on site, the best conservation gesture is to leave nothing behind.'],
    ['221–206 av. J.-C. — Unification par Qin Shi Huang. Première Grande Muraille continue.','221–206 BCE — Unification by Qin Shi Huang. First continuous Great Wall.'],
    ['221-206 av. J.-C. — Unification par Qin Shi Huang. Première Grande Muraille continue.','221–206 BCE — Unification by Qin Shi Huang. First continuous Great Wall.'],
    ['~2070-1600 av. J.-C. — Premières fortifications et contrôle territorial.','~2070–1600 BCE — Early fortifications and territorial control.'],
    ['~1600-1046 av. J.-C. — Premiers murs en terre battue autour des cités royales.','~1600–1046 BCE — First rammed-earth walls around royal cities.'],
    ['~1046-256 av. J.-C. — Remparts entre États rivaux, prémices de la Grande Muraille.','~1046–256 BCE — Ramparts between rival states, forerunners of the Great Wall.'],
    ['206 av. J.-C. - 220 ap. J.-C. — Extension vers l\'ouest, protection de la Route de la Soie.','206 BCE – 220 CE — Westward extension, protection of the Silk Road.'],
    ['618-907 — Période de paix relative. Diplomatie privilégiée sur la fortification.','618–907 — Period of relative peace. Diplomacy favored over fortification.'],
    ['960-1279 — Renforcement des défenses face aux invasions du Nord.','960–1279 — Strengthening of defenses against northern invasions.'],
    ["1271-1368 — Les Mongols contrôlent l'empire. Construction suspendue.",'1271–1368 — The Mongols controlled the empire. Construction suspended.'],
    ["1368-1644 — Âge d'or de la construction. Briques, tours de guet massives.",'1368–1644 — Golden age of construction. Bricks and massive watchtowers.'],
    ['Classée UNESCO en 1987. Symbole mondial de la Chine.','Listed by UNESCO in 1987. Global symbol of China.'],
    ['Faire grandir l’expérience','Help grow the experience'], ['Faire grandir l\'expérience','Help grow the experience'], ['Faire grandir','Help grow'],
    ['Soutenir le prototype','Support the prototype'], ['Faire un don','Support the prototype'],
    ['4 profils complémentaires','4 profiles complementary']
  ];
  MCN_V8_EXTRA.forEach(([fr,en]) => a(fr,en));
  Object.values(MCN_V8_SECTIONS).forEach(s => {
    ['tag','copy','title','food','hotel','tip'].forEach(k => a(s[k].fr, s[k].en));
    s.timeline.fr.forEach((row,i) => a(row.split('|')[1], s.timeline.en[i].split('|')[1]));
  });

  function mcnV8CurrentSection(){
    return document.querySelector('.journey-pin.active')?.dataset.section || document.querySelector('.site-chip.is-active')?.dataset.section || document.querySelector('.atlas-site.is-active')?.dataset.section || 'badaling';
  }
  function mcnV8Set(sel, value){ const el=document.querySelector(sel); if(el && value) el.textContent=value; }
  function mcnV8SyncRouteTexts(lang){
    const keyName = mcnV8CurrentSection();
    const s = MCN_V8_SECTIONS[keyName] || MCN_V8_SECTIONS.badaling;
    mcnV8Set('#selected-section-name', s.name); mcnV8Set('#atlas-name', s.name);
    mcnV8Set('#selected-section-tagline', s.tag[lang]); mcnV8Set('#atlas-copy', s.copy[lang]);
    mcnV8Set('#route-title', s.title[lang]); mcnV8Set('#food-reco', s.food[lang]); mcnV8Set('#hotel-reco', s.hotel[lang]); mcnV8Set('#pro-tip', s.tip[lang]);
    const tl = document.querySelector('#route-timeline');
    if(tl){ tl.innerHTML = s.timeline[lang].map(row => { const [time,text] = row.split('|'); return `<li><time>${time}</time><span>${text}</span></li>`; }).join(''); }
  }
  function mcnV8FixAboutLayout(){
    const title = document.getElementById('team-title');
    if(title){
      const en = title.querySelector('.lang-en');
      const fr = title.querySelector('.lang-fr');
      if(en) en.innerHTML = '<span class="team-title-accent">4 profiles</span><br><span class="team-title-white">complementary</span>';
      if(fr) fr.innerHTML = '<span class="team-title-accent">4 profils</span> <span class="team-title-white">complémentaires</span>';
    }
    const support = document.getElementById('support-title');
    if(support && localStorage.getItem('mcn-lang') === 'en') support.innerHTML = 'Help grow <em>the experience</em>';
  }
  function mcnV8Patch(lang){
    if(document.querySelector('#carnet-route-imperial')) mcnV8SyncRouteTexts(lang);
    mcnV8FixAboutLayout();

    // Frise dynasties : Warring States doit rester mappable vers ROYAUMES.
    document.querySelectorAll('.frise-dyn').forEach(card => {
      const name = card.querySelector('.frise-name');
      const date = card.querySelector('.frise-date');
      const tip  = card.querySelector('.frise-tip');
      if(!name) return;
      const n = norm(name.textContent).replace(/\s+/g,' ');
      if(lang === 'en'){
        if(n === 'ROYAUMES' || n === 'WARRING STATES') { name.innerHTML = 'WARRING<br>STATES'; card.dataset.dynKey = 'ROYAUMES'; }
        if(n === "AUJOURD'HUI" || n === 'TODAY') name.textContent = 'TODAY';
        if(date) date.textContent = date.textContent
          .replace(/av\. J\.-C\./g,'BCE')
          .replace(/ap\. J\.-C\./g,'CE');
        if(tip){ const out = tr(tip.textContent.trim()); if(out !== tip.textContent.trim()) tip.textContent = out; }
      } else {
        if(n === 'WARRING STATES') name.textContent = 'ROYAUMES';
        if(n === 'TODAY') name.textContent = "AUJOURD'HUI";
        if(date) date.textContent = date.textContent
          .replace(/BCE/g,'av. J.-C.')
          .replace(/CE/g,'ap. J.-C.');
        if(tip){ const rev = [...DICT.entries()].find(([fr,en]) => norm(en) === norm(tip.textContent)); if(rev) tip.textContent = rev[0]; }
      }
    });

    // Restauration virtuelle : textes + message ajouté après nettoyage.
    const cleanBtn = document.getElementById('btn-nettoyer');
    if(cleanBtn){
      cleanBtn.textContent = lang === 'en' ? '🧽 RESTORE THE WALL' : '🧽 Restaurer le mur';
      if(!cleanBtn.dataset.mcnNoteBound){
        cleanBtn.dataset.mcnNoteBound = '1';
        cleanBtn.addEventListener('click', () => setTimeout(() => mcnV8Patch(localStorage.getItem('mcn-lang') === 'en' ? 'en' : 'fr'), 60));
      }
      let note = document.querySelector('.restoration-note');
      if(!note && cleanBtn.parentElement){
        note = document.createElement('p');
        note.className = 'restoration-note';
        note.style.cssText = 'margin:14px auto 0;max-width:760px;text-align:center;color:#b8b4ad;font-size:15px;line-height:1.6;';
        cleanBtn.parentElement.insertAdjacentElement('afterend', note);
      }
      if(note) note.textContent = lang === 'en'
        ? 'Thank you: on site, the best conservation gesture is to leave nothing behind.'
        : 'Merci : sur site, le meilleur geste de conservation est de ne rien laisser derrière soi.';
    }

    const restBtn = Array.from(document.querySelectorAll('button,a')).find(el => /restaurer virtuellement la muraille|virtually restore the wall|tagger la muraille/i.test(el.textContent));
    if(restBtn) restBtn.textContent = lang === 'en' ? '🎨 VIRTUALLY RESTORE THE WALL' : '🎨 Restaurer virtuellement la muraille';
  }

  /* ═══════════════════════════════════════════════
     CLIC SUR LES BOUTONS LANGUE (FR | EN)
  ═══════════════════════════════════════════════ */
  window.addEventListener('click', function(e) {
    // Nouveaux boutons .lang-btn[data-lang]
    const langBtn = e.target.closest('.lang-btn[data-lang]');
    if (langBtn) {
      e.preventDefault();
      e.stopImmediatePropagation();
      applyLang(langBtn.dataset.lang);
      return;
    }
    // Ancien bouton [data-command="lang"] (compatibilité)
    const oldBtn = e.target.closest('[data-command="lang"]');
    if (oldBtn) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const current = localStorage.getItem('mcn-lang') === 'en' ? 'en' : 'fr';
      applyLang(current === 'en' ? 'fr' : 'en');
    }
  }, true);

  /* ═══════════════════════════════════════════════
     EXPORT GLOBAL
  ═══════════════════════════════════════════════ */
  window.mcnApplyLang = applyLang;
  window.mcnSyncFixedLabels = l => applyLang(l || (localStorage.getItem('mcn-lang') === 'en' ? 'en' : 'fr'));

  /* ═══════════════════════════════════════════════
     BOOT
  ═══════════════════════════════════════════════ */
  const BOOT_LANG = localStorage.getItem('mcn-lang') === 'en' ? 'en' : 'fr';
  const BOOT_CB   = localStorage.getItem('mcn-colorblind') === '1';

  function boot() {
    applyLang(BOOT_LANG);
    applyColorblind(BOOT_CB);
    initCookies();
    mcnFinalV7PostProcess(BOOT_LANG);
    if (typeof mcnV8Patch === 'function') mcnV8Patch(BOOT_LANG);
    // STABLE v3.2 : pas de MutationObserver global sur les textes.
    // Il provoquait des boucles de traduction et figeait Visiter / À propos.
    let mcnV8Timer = null;
    const resync = () => {
      clearTimeout(mcnV8Timer);
      mcnV8Timer = setTimeout(() => {
        const l = localStorage.getItem('mcn-lang') === 'en' ? 'en' : 'fr';
        mcnFinalV7PostProcess(l);
        if (typeof mcnV8Patch === 'function') mcnV8Patch(l);
      }, 80);
    };
    document.addEventListener('click', resync, true);
    document.addEventListener('change', resync, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
