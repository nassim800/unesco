/* ═══════════════════════════════════════════════════════════════
   DYNASTY_DEEP.JS — Contenu enrichi des fiches dynasties
   Enrichit mcn_premium_finish.js : surcharge renderModal pour les
   modales de type "dynasty" avec des sections complètes, rulers,
   guerres, contribution à la Muraille.
   Doit être chargé APRÈS mcn_premium_finish.js.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const isEn = () => document.documentElement.classList.contains('is-english') ||
    localStorage.getItem('mcn-lang') === 'en';

  const t = (fr, en) => isEn() ? en : fr;

  /* ─── Contenu profond par dynKey ─── */
  const DEEP = {

    XIA: () => ({
      facts: [
        { value: '~2070–1600', label: t('av. J.-C.', 'BCE'), },
        { value: t('Légendaire', 'Legendary'), label: t('1ère dynastique', '1st dynasty') },
        { value: t('Yu le Grand', 'Yu the Great'), label: t('fondateur', 'founder') },
      ],
      sections: [
        {
          icon: '🌊', title: t('Apparition & fondation', 'Rise & foundation'),
          body: t(
            "La Xia reste la première dynasty semi-légendaire de Chine (~2070–1600 av. J.-C.). Son fondateur mythique, Yu le Grand, aurait maîtrisé les grandes inondations du fleuve Jaune — un exploit fondateur. Les fouilles de Erlitou (Henan) suggèrent une réalité archéologique à partir de ~1900 av. J.-C. : palais, bronzes et tombes royales attestent une organisation étatique émergente.",
            "The Xia is the first semi-legendary dynasty of China (~2070–1600 BCE). Its mythical founder Yu the Great was said to have tamed the great Yellow River floods — a founding feat. Excavations at Erlitou (Henan) suggest an archaeological reality from ~1900 BCE: palaces, bronzes and royal tombs attest to an emerging state organization."
          )
        },
        {
          icon: '🏗️', title: t('Grands travaux & contrôle territorial', 'Major works & territorial control'),
          body: t(
            "Les ouvrages hydrauliques (digues, canaux, levées) attribués à Yu posent les bases d'une administration centralisée. Cette culture du grand chantier collectif préfigure la logique de mobilisation qui rendra possible, des siècles plus tard, la construction de la Grande Muraille.",
            "Hydraulic works (dykes, canals, levees) attributed to Yu laid the foundations of centralized administration. This culture of collective construction foreshadowed the mobilization logic that would later make the Great Wall possible."
          )
        },
        {
          icon: '🏚️', title: t('Déclin & héritage', 'Fall & legacy'),
          body: t(
            "La tradition veut que le dernier souverain Xia, Jie, ait sombré dans la tyrannie, provoquant la révolte des Shang vers 1600 av. J.-C. Son legs majeur est un imaginaire impérial fondateur : contrôler la nature et les hommes pour tenir un territoire.",
            "Tradition holds that the last Xia ruler, Jie, fell into tyranny, prompting the Shang revolt around 1600 BCE. His major legacy is a founding imperial imagination: controlling nature and people to hold territory."
          )
        }
      ],
      rulers: [
        { date: t('~2070', '~2070 BCE'), name: t('Yu le Grand', 'Yu the Great'), desc: t('Dompte les inondations, fonde la dynasty', 'Tames floods, founds the dynasty') },
        { date: t('~1600', '~1600 BCE'), name: t('Jie (dernier)', 'Jie (last)'), desc: t('Tyrannie — chute de la Xia', 'Tyranny — fall of the Xia') },
      ],
      wallContrib: t(
        "Pas de mur à proprement parler, mais la Xia invente la culture du grand chantier impérial : mobiliser des centaines de milliers d'hommes pour façonner un territoire.",
        "No wall as such, but the Xia invented the culture of imperial large works: mobilizing hundreds of thousands of people to shape a territory."
      ),
    }),

    SHANG: () => ({
      facts: [
        { value: '~1600–1046', label: t('av. J.-C.', 'BCE') },
        { value: t('Yin / Zhengzhou', 'Yin / Zhengzhou'), label: t('capitales', 'capitals') },
        { value: t('Bronze', 'Bronze'), label: t('âge', 'age') },
      ],
      sections: [
        {
          icon: '🏙️', title: t('Apparition & capitales fortifiées', 'Rise & fortified capitals'),
          body: t(
            "Les Shang s'imposent dans le nord de la Chine avec des capitales successives dont la plus connue est Yin (Anyang). Ces centres de pouvoir sont entourés de puissants remparts de terre damée — certains atteignent 35 mètres de large à la base. L'écriture sur os oraculaires et une métallurgie du bronze avancée témoignent d'une civilisation complexe.",
            "The Shang established themselves in northern China with successive capitals, the most famous being Yin (Anyang). These power centers were surrounded by powerful rammed-earth ramparts — some reaching 35 metres wide at the base. Oracle bone script and advanced bronze metallurgy attest to a complex civilization."
          )
        },
        {
          icon: '⚔️', title: t('Guerres & défenses', 'Wars & defenses'),
          body: t(
            "Les Shang guerroient en permanence contre des peuples voisins (Qiang, Gui Fang, Tu Fang). Les expéditions militaires sont fréquentes et documentées sur les os oraculaires. Les remparts urbains renforcent la notion de territoire défendu.",
            "The Shang were in constant warfare against neighboring peoples (Qiang, Gui Fang, Tu Fang). Military campaigns were frequent and documented on oracle bones. Urban ramparts reinforced the concept of defended territory."
          ),
          war: true
        },
        {
          icon: '🏚️', title: t('Déclin & héritage', 'Fall & legacy'),
          body: t(
            "Le dernier roi Shang, Zhou Xin (pas la dynasty Zhou), est renversé par le roi Wu de Zhou en 1046 av. J.-C. Son legacy technique est immense : le coffrage de terre damée (hangtu) des remparts Shang devient la technique de base de toutes les fortifications chinoises, y compris les premières phases de la Grande Muraille.",
            "The last Shang king, Zhou Xin, was overthrown by King Wu of Zhou in 1046 BCE. His technical legacy is immense: the rammed-earth formwork (hangtu) of Shang ramparts became the basic technique of all Chinese fortifications, including the early phases of the Great Wall."
          )
        }
      ],
      rulers: [
        { date: t('~1600', '~1600 BCE'), name: t('Cheng Tang', 'Cheng Tang'), desc: t('Fondateur, renverse les Xia', 'Founder, overthrows the Xia') },
        { date: t('~1250', '~1250 BCE'), name: t('Wu Ding', 'Wu Ding'), desc: t('Apogée — nombreuses victoires militaires', 'Peak — many military victories') },
        { date: t('~1046', '~1046 BCE'), name: t('Zhou Xin (dernier)', 'Zhou Xin (last)'), desc: t('Déclin et chute de la dynasty', 'Decline and fall of the dynasty') },
      ],
      wallContrib: t(
        "Les remparts de terre damée (hangtu) des cités Shang sont la matrice technique directe de la future Grande Muraille. Coffrage, couches compactées, portes fortifiées : tout le vocabulaire de la fortification chinoise naît ici.",
        "The rammed-earth ramparts (hangtu) of Shang cities are the direct technical matrix of the future Great Wall. Formwork, compacted layers, fortified gates: the entire vocabulary of Chinese fortification was born here."
      ),
    }),

    ZHOU: () => ({
      facts: [
        { value: '~1046–256', label: t('av. J.-C.', 'BCE') },
        { value: t('Féodalisme', 'Feudalism'), label: t('organisation', 'organization') },
        { value: t('7 royaumes', '7 kingdoms'), label: t('à la fin', 'at the end') },
      ],
      sections: [
        {
          icon: '🏯', title: t('Ordre féodal & murs frontaliers', 'Feudal order & border walls'),
          body: t(
            "Les Zhou (Occidentaux puis Orientaux) établissent un ordre féodal vaste : le pouvoir central confie des terres à des lignages alliés. Progressivement, ces principautés deviennent autonomes et bâtissent des murs pour défendre leurs frontières mutuelles et contre les nomades du nord (Rong, Di). La Muraille naît d'abord comme une constellation de murs régionaux.",
            "The Zhou (Western then Eastern) established a vast feudal order: the central power entrusted lands to allied lineages. Progressively, these principalities became autonomous and built walls to defend their mutual borders and against northern nomads (Rong, Di). The Wall was born first as a constellation of regional walls."
          )
        },
        {
          icon: '📚', title: t('Âge d\'or culturel', 'Cultural golden age'),
          body: t(
            "La période des Printemps et Automnes (~770–481 av. J.-C.) voit éclore Confucius, Laozi et Sun Tzu. Malgré les guerres, c'est un apogée philosophique et littéraire. La période des Royaumes Combattants qui suit intensifie la fortification tout en enrichissant l'armement (arbalète, cavalerie montée).",
            "The Spring and Autumn period (~770–481 BCE) saw Confucius, Laozi and Sun Tzu emerge. Despite wars, it was a philosophical and literary zenith. The Warring States period that followed intensified fortification while enriching weaponry (crossbow, mounted cavalry)."
          )
        },
        {
          icon: '🏚️', title: t('Déclin — fragmentation', 'Fall — fragmentation'),
          body: t(
            "Le pouvoir central Zhou s'efface progressivement. La période se fragmenta en Royaumes Combattants, laissant une carte de frontières déjà militarisées. C'est cette infrastructure de murs régionaux que Qin Shi Huang n'aura plus qu'à relier.",
            "Zhou central power gradually faded. The period fragmented into Warring States, leaving a map of already militarized borders. It was this infrastructure of regional walls that Qin Shi Huang would simply connect."
          )
        }
      ],
      rulers: [
        { date: t('~1046', '~1046 BCE'), name: t('Wu Wang', 'King Wu'), desc: t('Fondateur — renverse les Shang', 'Founder — overthrows the Shang') },
        { date: t('551–479', '551–479 BCE'), name: t('Époque de Confucius', 'Era of Confucius'), desc: t('Apogée philosophique chinois', 'Chinese philosophical zenith') },
        { date: t('256', '256 BCE'), name: t('Nan Wang (dernier)', 'King Nan (last)'), desc: t('Chute face à Qin', 'Falls to Qin') },
      ],
      wallContrib: t(
        "Les États Zhou (notamment Qin, Zhao et Yan) bâtissent de longs murs frontaliers au nord. Ces tronçons fragmentés forment le matériau brut que Qin Shi Huang reliera après 221 av. J.-C.",
        "The Zhou states (notably Qin, Zhao and Yan) built long northern border walls. These fragmented stretches form the raw material Qin Shi Huang would connect after 221 BCE."
      ),
    }),

    ROYAUMES: () => ({
      facts: [
        { value: '481–221', label: t('av. J.-C.', 'BCE') },
        { value: t('7 grands', '7 major'), label: t('royaumes', 'kingdoms') },
        { value: t('Murs multiples', 'Multiple walls'), label: t('frontières nord', 'northern borders') },
      ],
      sections: [
        {
          icon: '⚔️', title: t('La guerre permanente', 'Permanent warfare'),
          body: t(
            "Qin, Zhao, Han, Wei, Yan, Chu et Qi : sept royaumes en guerre constante. Les armées se professionnalisent (mérite remplace la naissance), l'arbalète et la cavalerie montée transforment la tactique. Les batailles impliquent des dizaines de milliers de soldats. La bataille de Changping (260 av. J.-C.) voit Qin exterminer 400 000 soldats Zhao.",
            "Qin, Zhao, Han, Wei, Yan, Chu and Qi: seven kingdoms in constant war. Armies professionalized (merit replaced birth), crossbows and mounted cavalry transformed tactics. Battles involved tens of thousands of soldiers. The Battle of Changping (260 BCE) saw Qin exterminate 400,000 Zhao soldiers."
          ),
          war: true
        },
        {
          icon: '🏗️', title: t('Le laboratoire de la muraille', 'The wall laboratory'),
          body: t(
            "Pour se défendre des nomades xiongnu au nord ET des royaumes voisins, Qin, Zhao et Yan construisent de longs murs en terre damée et en pierre. Ces travaux diversifient les techniques : double ligne, fossés, tours de signal, portes fortifiées. C'est le vrai laboratoire technique de la future Grande Muraille.",
            "To defend against northern Xiongnu nomads AND neighboring kingdoms, Qin, Zhao and Yan built long walls in rammed earth and stone. These works diversified techniques: double lines, ditches, signal towers, fortified gates. This is the real technical laboratory of the future Great Wall."
          )
        },
        {
          icon: '📉', title: t('Unification par Qin', 'Unification by Qin'),
          body: t(
            "En 221 av. J.-C., le roi Zheng de Qin conquiert les six autres royaumes et se proclame Qin Shi Huang (premier Empereur). La période des Royaumes Combattants laisse en héritage une carte de frontières militarisées, une expérience de fortification et une population habituée à la mobilisation de guerre.",
            "In 221 BCE, King Zheng of Qin conquered the other six kingdoms and proclaimed himself Qin Shi Huang (First Emperor). The Warring States period left a legacy of militarized borders, fortification expertise and a population accustomed to war mobilization."
          )
        }
      ],
      rulers: [
        { date: '475–221 BCE', name: t('Ère des 7 royaumes', 'Era of 7 kingdoms'), desc: t('Pas de souverain unique', 'No single ruler') },
        { date: '260 BC', name: t('Bai Qi (général Qin)', 'Bai Qi (Qin general)'), desc: t('Victoire de Changping — 400 000 Zhao tués', 'Victory of Changping — 400,000 Zhao killed') },
        { date: '246 BCE', name: t('Zheng (futur Qin Shi Huang)', 'Zheng (future Qin Shi Huang)'), desc: t('Monte sur le trône de Qin à 13 ans', 'Ascends Qin throne aged 13') },
      ],
      wallContrib: t(
        "Les murs des royaumes Qin, Zhao et Yan (frontière nord) sont les ancêtres directs de la Grande Muraille. Qin Shi Huang n'aura qu'à les relier et les étendre après 221 av. J.-C.",
        "The walls of the Qin, Zhao and Yan kingdoms (northern border) are the direct ancestors of the Great Wall. Qin Shi Huang needed only to connect and extend them after 221 BCE."
      ),
    }),

    QIN: () => ({
      facts: [
        { value: '221–206', label: t('av. J.-C.', 'BCE') },
        { value: t('1ère unifiée', '1st unified'), label: t('Chine', 'China') },
        { value: 'Meng Tian', label: t('général bâtisseur', 'builder general') },
      ],
      sections: [
        {
          icon: '👑', title: t('Qin Shi Huang — le Premier Empereur', 'Qin Shi Huang — the First Emperor'),
          body: t(
            "Zheng de Qin unifie la Chine en 221 av. J.-C. et s'autoproclame « Qin Shi Huang » — Premier Souverain Sacré. Il impose l'écriture unifiée, les poids et mesures, la monnaie, les routes. Il fait construire l'armée de terre cuite de Xi'an pour l'éternité. Son règne est une révolution administrative et civilisationnelle.",
            "Zheng of Qin unified China in 221 BCE and proclaimed himself 'Qin Shi Huang' — First Sacred Ruler. He imposed unified writing, weights and measures, currency and roads. He built the Terracotta Army of Xi'an for eternity. His reign was an administrative and civilizational revolution."
          )
        },
        {
          icon: '🏗️', title: t('La première Grande Muraille', 'The first Great Wall'),
          body: t(
            "Le général Meng Tian relie les murs nord existants (Qin, Zhao, Yan) et les prolonge pour former une barrière continue contre les Xiongnu. On estime que 300 000 soldats et 500 000 civils y travaillèrent. La construction est rapide, principalement en terre damée. De nombreux ouvriers meurent d'épuisement, de froid et de faim.",
            "General Meng Tian connected the existing northern walls (Qin, Zhao, Yan) and extended them to form a continuous barrier against the Xiongnu. An estimated 300,000 soldiers and 500,000 civilians worked on it. Construction was rapid, mainly in rammed earth. Many workers died from exhaustion, cold and hunger."
          )
        },
        {
          icon: '⚔️', title: t('Guerres contre les Xiongnu', 'Wars against the Xiongnu'),
          body: t(
            "Les Xiongnu — confédération nomade redoutable — menacent en permanence le nord. Meng Tian les repousse de la boucle du fleuve Jaune (Ordos). Mais sans la Muraille, les incursions recommencent. Le mur est autant psychologique que militaire : il marque la limite de la civilisation.",
            "The Xiongnu — a formidable nomadic confederation — constantly threatened the north. Meng Tian pushed them back from the Yellow River bend (Ordos). But without the Wall, incursions resumed. The wall was as psychological as military: it marked the limit of civilization."
          ),
          war: true
        },
        {
          icon: '🏚️', title: t('Chute brutale de la dynasty', 'Brutal fall of the dynasty'),
          body: t(
            "Qin Shi Huang meurt en 210 av. J.-C. Les révoltes éclatent dès 209 sous Liu Bang et Xiang Yu. La dynasty tombe en 206 av. J.-C. — moins de 15 ans après sa fondation. Mais son héritage est incommensurable : la Chine unifiée, la muraille continue, et le modèle impérial que toutes les dynasties suivantes imiteront.",
            "Qin Shi Huang died in 210 BCE. Revolts broke out from 209 under Liu Bang and Xiang Yu. The dynasty fell in 206 BCE — less than 15 years after its founding. But its legacy is immeasurable: unified China, the continuous wall, and the imperial model all subsequent dynasties would emulate."
          )
        }
      ],
      rulers: [
        { date: '221–210 BCE', name: t('Qin Shi Huang', 'Qin Shi Huang'), desc: t('1er Empereur — unifie la Chine et la Muraille', '1st Emperor — unifies China and the Wall') },
        { date: '210–207 BCE', name: t('Qin Er Shi (Huhai)', 'Qin Er Shi (Huhai)'), desc: t('Régime despotique — révoltes généralisées', 'Despotic rule — widespread revolts') },
        { date: '207 BCE', name: t('Ziying (dernier)', 'Ziying (last)'), desc: t('Se rend à Liu Bang en 46 jours', 'Surrenders to Liu Bang in 46 days') },
      ],
      wallContrib: t(
        "La première Grande Muraille continue est l'œuvre des Qin. En terra damée et pierre, de la Mandchourie au Gansu, elle fixe pour la première fois la frontière nord de l'empire chinois.",
        "The first continuous Great Wall is the work of the Qin. In rammed earth and stone, from Manchuria to Gansu, it established for the first time the northern frontier of the Chinese empire."
      ),
    }),

    HAN: () => ({
      facts: [
        { value: '206 BCE–220 CE', label: t('durée', 'duration') },
        { value: t('Route de la Soie', 'Silk Road'), label: t('extension ouest', 'western extension') },
        { value: t('Signaux fumée', 'Smoke signals'), label: t('innovation', 'innovation') },
      ],
      sections: [
        {
          icon: '🌐', title: t('L\'empire Han — Pax Sinica', 'The Han empire — Pax Sinica'),
          body: t(
            "Liu Bang (Gaozu) fonde la dynasty Han en 206 av. J.-C. Les Han divisent la Chine en commanderies et royaumes vassaux. L'empire se consolide sous Wudi (141–87 av. J.-C.) qui lance de grandes expéditions à l'ouest. La population atteint 60 millions. La dynasty Han est l'âge d'or de la Chine antique, au point que les Chinois se nomment encore « peuple Han ».",
            "Liu Bang (Gaozu) founded the Han dynasty in 206 BCE. The Han divided China into commanderies and vassal kingdoms. The empire consolidated under Wudi (141–87 BCE) who launched great western expeditions. Population reached 60 million. The Han dynasty is the golden age of ancient China — the Chinese still call themselves the 'Han people'."
          )
        },
        {
          icon: '🏗️', title: t('Extension de la Muraille & Route de la Soie', 'Wall extension & Silk Road'),
          body: t(
            "L'Empereur Wudi étend la Muraille vers l'ouest, jusqu'à Dunhuang et aux confins du Gobi. Ces nouvelles sections protègent le corridor du Hexi — artère vitale de la Route de la Soie. Les Han perfectionnent les tours à signaux de fumée : un code précis permettait de transmettre une alerte sur des centaines de kilomètres en quelques heures.",
            "Emperor Wudi extended the Wall westward to Dunhuang and the Gobi edges. These new sections protected the Hexi Corridor — the vital artery of the Silk Road. The Han perfected smoke-signal towers: a precise code could relay an alert over hundreds of kilometres within hours."
          )
        },
        {
          icon: '⚔️', title: t('Guerres contre les Xiongnu', 'Wars against the Xiongnu'),
          body: t(
            "Les Han combattent les Xiongnu pendant deux siècles. Sous Gaozu, une défaite humiliante oblige même l'empereur à payer tribut. Wudi renverse ce rapport de force : le général Wei Qing et le cavalier Huo Qubing repoussent les Xiongnu au-delà du désert de Gobi. Cette victoire ouvre la Route de la Soie.",
            "The Han fought the Xiongnu for two centuries. Under Gaozu, a humiliating defeat even forced the emperor to pay tribute. Wudi reversed this: generals Wei Qing and cavalry commander Huo Qubing pushed the Xiongnu beyond the Gobi. This victory opened the Silk Road."
          ),
          war: true
        },
        {
          icon: '🏚️', title: t('Déclin & fin des Han', 'Decline & end of the Han'),
          body: t(
            "La dynasty se scinde en Han Orientaux (25–220 ap. J.-C.) après l'interrègne de Wang Mang. Les soulèvements des Turbans Jaunes (184) et la montée des seigneurs de guerre comme Cao Cao affaiblissent le pouvoir central. En 220, Cao Pi met fin aux Han et inaugure l'ère des Trois Royaumes.",
            "The dynasty split into Eastern Han (25–220 CE) after Wang Mang's interregnum. The Yellow Turban uprising (184) and warlords like Cao Cao weakened central power. In 220, Cao Pi ended the Han and inaugurated the Three Kingdoms era."
          )
        }
      ],
      rulers: [
        { date: '206 BCE–195 BCE', name: t('Gaozu (Liu Bang)', 'Gaozu (Liu Bang)'), desc: t('Fondateur — issu du peuple', 'Founder — rose from common people') },
        { date: '141–87 BCE', name: t('Wudi (l\'Empereur Martial)', 'Wudi (the Martial Emperor)'), desc: t('Apogée — Route de la Soie, extension Muraille', 'Peak — Silk Road, Wall extension') },
        { date: '25–57 CE', name: t('Guangwudi', 'Guangwudi'), desc: t('Refondateur des Han Orientaux', 'Refounded Eastern Han') },
        { date: '189–220 CE', name: t('Xiandi (dernier)', 'Xiandi (last)'), desc: t('Abdique face à Cao Cao', 'Abdicates to Cao Cao') },
      ],
      wallContrib: t(
        "Les Han prolongent la Muraille sur 10 000 km supplémentaires vers l'ouest (jusque Dunhuang). Ils inventent le système de signaux de fumée et de feu pour la communication rapide, et dotent le mur d'un réseau dense de tours de guet et de garnisons.",
        "The Han extended the Wall by some 10,000 additional km westward (to Dunhuang). They invented the smoke-and-fire signal system for rapid communication, and equipped the wall with a dense network of watchtowers and garrisons."
      ),
    }),

    TANG: () => ({
      facts: [
        { value: '618–907', label: t('ap. J.-C.', 'CE') },
        { value: t('Diplomatie', 'Diplomacy'), label: t('plutôt que murs', 'over walls') },
        { value: t('Apogée culturel', 'Cultural zenith'), label: t("de la Chine", 'of China') },
      ],
      sections: [
        {
          icon: '👑', title: t('L\'âge d\'or de la Chine', 'China\'s golden age'),
          body: t(
            "Les Tang, fondés par Li Yuan (Gaozu) et surtout son fils Taizong, portent la Chine à son apogée culturel. Chang'an (Xi'an) est la plus grande ville du monde avec 1 million d'habitants. Poètes (Li Bai, Du Fu), peintres, musiciens et lettrés fleurissent. Les échanges avec l'Asie centrale, la Perse et l'Inde sont intenses.",
            "The Tang, founded by Li Yuan (Gaozu) and especially his son Taizong, brought China to its cultural zenith. Chang'an (Xi'an) was the world's largest city with 1 million inhabitants. Poets (Li Bai, Du Fu), painters, musicians and scholars flourished. Exchanges with Central Asia, Persia and India were intense."
          )
        },
        {
          icon: '🕊️', title: t('Diplomatie & pause de la fortification', 'Diplomacy & fortification pause'),
          body: t(
            "Maîtres des steppes à leur apogée, les Tang n'ont guère besoin de la Muraille comme bouclier. Ils préfèrent les alliances matrimoniales (« princesses diplomatiques »), les tributs et les garnisons mobiles aux murs continus. Les sections Qin et Han sont entretenues mais peu renforcées.",
            "Masters of the steppes at their peak, the Tang had little need for the Wall as a shield. They preferred matrimonial alliances ('diplomatic princesses'), tributes and mobile garrisons to continuous walls. Qin and Han sections were maintained but little reinforced."
          )
        },
        {
          icon: '⚔️', title: t('Guerres & frontières', 'Wars & frontiers'),
          body: t(
            "Malgré leur domination initiale, les Tang affrontent les Tibétains, les Arabes (défaite de Talas, 751), les Khitan et les tribus turques Göktürk. La révolte d'An Lushan (755–763) ravage l'empire et précipite son déclin. Les provinces regagnent leur autonomie.",
            "Despite their initial dominance, the Tang faced Tibetans, Arabs (defeat at Talas, 751), Khitans and Göktürk tribes. The An Lushan rebellion (755–763) devastated the empire and accelerated its decline. Provinces regained autonomy."
          ),
          war: true
        },
        {
          icon: '🏚️', title: t('Déclin & héritage', 'Decline & legacy'),
          body: t(
            "Les soulèvements paysans (Huang Chao, 875–884) et la montée des gouverneurs militaires (jiedushi) fragmentent l'empire. La dynasty s'éteint en 907, ouvrant la période des Cinq Dynasties et Dix Royaumes. Son legs : une culture rayonnante, des routes commerciales prospères et un modèle d'administration que les Song prendront pour modèle.",
            "Peasant uprisings (Huang Chao, 875–884) and rising military governors (jiedushi) fragmented the empire. The dynasty ended in 907, opening the Five Dynasties and Ten Kingdoms period. Its legacy: a radiant culture, prosperous trade routes and an administrative model the Song would emulate."
          )
        }
      ],
      rulers: [
        { date: '618–626', name: t('Gaozu (Li Yuan)', 'Gaozu (Li Yuan)'), desc: t('Fondateur de la dynasty Tang', 'Tang dynasty founder') },
        { date: '626–649', name: t('Taizong (Li Shimin)', 'Taizong (Li Shimin)'), desc: t('Apogée — « Règne de Zhenguan »', 'Peak — "Zhenguan Reign of Prosperity"') },
        { date: '690–705', name: t('Impératrice Wu Zetian', 'Empress Wu Zetian'), desc: t('Seule impératrice régnante de l\'histoire chinoise', 'Only ruling empress in Chinese history') },
        { date: '712–756', name: t('Xuanzong (Minghuang)', 'Xuanzong (Minghuang)'), desc: t('Apogée culturel — puis An Lushan', 'Cultural peak — then An Lushan') },
        { date: '904–907', name: t('Aizong (dernier)', 'Aizong (last)'), desc: t('Chute face aux seigneurs de guerre', 'Falls to warlords') },
      ],
      wallContrib: t(
        "Les Tang n'agrandissent pas la Muraille mais la maintiennent comme infrastructure stratégique et symbole de frontière. Leur legacy pour la Muraille est celui de la prudence : un mur sans armée et sans diplomatie ne sert à rien.",
        "The Tang did not expand the Wall but maintained it as strategic infrastructure and border symbol. Their Wall legacy is one of wisdom: a wall without an army and without diplomacy is worthless."
      ),
    }),

    SONG: () => ({
      facts: [
        { value: '960–1279', label: t('ap. J.-C.', 'CE') },
        { value: t('Poudre à canon', 'Gunpowder'), label: t('arme de guerre', 'weapon of war') },
        { value: t('Liao, Jin, Mongols', 'Liao, Jin, Mongols'), label: t('envahisseurs', 'invaders') },
      ],
      sections: [
        {
          icon: '🏙️', title: t('Réunification & prospérité', 'Reunification & prosperity'),
          body: t(
            "Zhao Kuangyin (Taizu) fonde les Song en 960 après la période chaotique des Cinq Dynasties. L'empire se réunifie, mais sans le nord-ouest ni le nord-est. Les Song du Nord (960–1127) connaissent une remarquable prospérité économique : imprimerie, boussole, monnaie papier, grandes villes marchandes.",
            "Zhao Kuangyin (Taizu) founded the Song in 960 after the chaotic Five Dynasties period. The empire reunified, but without the northwest or northeast. The Northern Song (960–1127) experienced remarkable economic prosperity: printing, compass, paper money, large merchant cities."
          )
        },
        {
          icon: '⚔️', title: t('Pression militaire constante', 'Constant military pressure'),
          body: t(
            "Les Song n'ont jamais les moyens militaires de leurs ambitions territoriales. Face aux Liao (Khitan) au nord, ils signent la paix de Shanyuan (1005) qui leur coûte un tribut annuel. Face aux Jin (Jurchen) qui envahissent le nord en 1127, ils se replient au sud (Song du Sud, 1127–1279, capitale Hangzhou). La Muraille historique est alors aux mains de leurs ennemis.",
            "The Song never had the military means to match their territorial ambitions. Against the Liao (Khitan) in the north, they signed the Shanyuan peace (1005) at the cost of an annual tribute. When the Jin (Jurchen) invaded the north in 1127, they retreated south (Southern Song, 1127–1279, capital Hangzhou). The historic Wall was then in enemy hands."
          ),
          war: true
        },
        {
          icon: '🔬', title: t('Innovation technique', 'Technical innovation'),
          body: t(
            "Les Song développent des armes à poudre (grenades, flèches-fusées, lance-flammes), des arbalètes mécaniques et des navires de guerre redoutables. Cette innovation compense partiellement leur infériorité cavalière. C'est la période la plus innovante techniquement de l'histoire militaire chinoise prémoderne.",
            "The Song developed gunpowder weapons (grenades, rocket arrows, flamethrowers), mechanical crossbows and formidable warships. This innovation partially compensated for their cavalry inferiority. This is the most technically innovative period in pre-modern Chinese military history."
          )
        },
        {
          icon: '🏚️', title: t('Chute face aux Mongols', 'Fall to the Mongols'),
          body: t(
            "La conquête mongole de Gengis Khan puis Kubilaï Khan est irrésistible. Les Song du Sud résistent jusqu'en 1279 — plus longtemps que tout autre État face aux Mongols. La bataille navale de Yamen (1279) marque la fin : la flotte Song est détruite, le dernier Empereur enfant périt dans la mer.",
            "The Mongol conquest under Genghis Khan then Kublai Khan was irresistible. The Southern Song held out until 1279 — longer than any other state against the Mongols. The naval Battle of Yamen (1279) marked the end: the Song fleet was destroyed, the last child Emperor perished in the sea."
          )
        }
      ],
      rulers: [
        { date: '960–976', name: t('Taizu (Zhao Kuangyin)', 'Taizu (Zhao Kuangyin)'), desc: t('Fondateur — général devenu Empereur', 'Founder — general turned Emperor') },
        { date: '997–1022', name: t('Zhenzong', 'Zhenzong'), desc: t('Paix de Shanyuan avec les Liao', 'Shanyuan peace with the Liao') },
        { date: '1127–1162', name: t('Gaozong (1er Song du Sud)', 'Gaozong (1st Southern Song)'), desc: t('Fuite au sud après invasion Jin', 'Flees south after Jin invasion') },
        { date: '1278–1279', name: t('Bing (dernier)', 'Bing (last)'), desc: t('Meurt à 8 ans dans la mer de Yamen', 'Dies aged 8 in the sea at Yamen') },
      ],
      wallContrib: t(
        "Privés du nord historique (où se trouvait la Muraille), les Song renforcent les forteresses du sud et innovent techniquement. Leur héritage indirect : prouver que mur et diplomatie seuls ne suffisent pas — il faut aussi une armée de qualité.",
        "Deprived of the historic north (where the Wall was), the Song reinforced southern fortresses and innovated technically. Their indirect legacy: proving that walls and diplomacy alone are not enough — a quality army is also needed."
      ),
    }),

    YUAN: () => ({
      facts: [
        { value: '1271–1368', label: t('ap. J.-C.', 'CE') },
        { value: t('Mongols', 'Mongols'), label: t('maîtres de l\'empire', 'empire masters') },
        { value: t('Kubilaï Khan', 'Kublai Khan'), label: t('fondateur', 'founder') },
      ],
      sections: [
        {
          icon: '🐎', title: t('L\'empire mongol — une Chine dans un empire continental', 'The Mongol empire — China within a continental empire'),
          body: t(
            "Kubilaï Khan fonde la dynasty Yuan en 1271 et conquiert les Song du Sud en 1279. Pour la première fois, la totalité de la Chine est gouvernée par un peuple non-han. L'empire mongol s'étend de la Corée à la Perse : la Muraille perd sa raison d'être — les « barbares » gouvernent désormais des deux côtés.",
            "Kublai Khan founded the Yuan dynasty in 1271 and conquered the Southern Song in 1279. For the first time, all of China was governed by a non-Han people. The Mongol empire stretched from Korea to Persia: the Wall lost its purpose — the 'barbarians' now ruled on both sides."
          )
        },
        {
          icon: '🌍', title: t('Pax Mongolica & Marco Polo', 'Pax Mongolica & Marco Polo'),
          body: t(
            "Le gigantesque empire mongol crée une Pax Mongolica : les routes commerciales de la Route de la Soie sont sûres, favorisant des échanges sans précédent. Marco Polo séjourne à la cour de Kubilaï Khan (1271–1295) et en rapporte un récit fascinant. Le commerce, la culture et les épidémies (Peste Noire) circulent librement.",
            "The vast Mongol empire created a Pax Mongolica: Silk Road trade routes were safe, enabling unprecedented exchanges. Marco Polo visited Kublai Khan's court (1271–1295) and brought back a fascinating account. Trade, culture and epidemics (Black Death) flowed freely."
          )
        },
        {
          icon: '📉', title: t('Déclin & révoltes Han', 'Decline & Han revolts'),
          body: t(
            "Les Yuan peinent à gouverner la Chine densément peuplée. L'oppression fiscale, la hiérarchie raciale (Mongols > Semu > Han du nord > Han du sud) et les catastrophes naturelles (inondations du fleuve Jaune) provoquent les révoltes des Turbans Rouges à partir de 1351. Liu Bang — pardon : Zhu Yuanzhang — un ancien moine, prend la tête de la rébellion et fonde les Ming.",
            "The Yuan struggled to govern densely populated China. Tax oppression, racial hierarchy (Mongols > Semu > northern Han > southern Han) and natural disasters (Yellow River floods) provoked the Red Turban revolts from 1351 onwards. Zhu Yuanzhang — a former monk — led the rebellion and founded the Ming."
          ),
          war: true
        }
      ],
      rulers: [
        { date: '1260–1294', name: t('Kubilaï Khan', 'Kublai Khan'), desc: t('Fondateur Yuan — conquiert les Song, reçoit Marco Polo', 'Yuan founder — conquers Song, hosts Marco Polo') },
        { date: '1294–1307', name: t('Temür Khan', 'Temur Khan'), desc: t('Maintient l\'empire, prospérité relative', 'Maintains empire, relative prosperity') },
        { date: '1333–1370', name: t('Toghon Temür (dernier)', 'Toghon Temür (last)'), desc: t('Fuit devant Zhu Yuanzhang vers la Mongolie', 'Flees to Mongolia before Zhu Yuanzhang') },
      ],
      wallContrib: t(
        "Les Yuan ne construisent pas la Muraille mais la préservent involontairement : faute d'usage défensif, elle n'est ni démontée ni détruite. Les structures survivent, prêtes à être réinvesties par les Ming qui, eux, la reconstruiront de fond en comble.",
        "The Yuan did not build the Wall but unintentionally preserved it: without defensive use, it was neither dismantled nor destroyed. The structures survived, ready to be reused by the Ming who would rebuild it from the ground up."
      ),
    }),

    MING: () => ({
      facts: [
        { value: '1368–1644', label: t('ap. J.-C.', 'CE') },
        { value: '25 000+', label: t('tours de guet', 'watchtowers') },
        { value: t('Âge d\'or', 'Golden age'), label: t('de la Muraille', 'of the Wall') },
      ],
      sections: [
        {
          icon: '👑', title: t('Fondation & restauration de la Chine', 'Foundation & restoration of China'),
          body: t(
            "Zhu Yuanzhang (Hongwu) fonde les Ming en 1368 à Nanjing. Après un siècle de domination mongole, la Chine retrouve un Empereur Han. Yongle (1402–1424) déplace la capitale à Pékin, fait construire la Cité Interdite et lance Zheng He dans de grandes expéditions maritimes atteignant l'Afrique.",
            "Zhu Yuanzhang (Hongwu) founded the Ming in 1368 at Nanjing. After a century of Mongol rule, China had a Han Emperor again. Yongle (1402–1424) moved the capital to Beijing, built the Forbidden City and sent Zheng He on great maritime expeditions reaching Africa."
          )
        },
        {
          icon: '🏗️', title: t('L\'âge d\'or de la Muraille', 'The golden age of the Wall'),
          body: t(
            "Face aux Mongols toujours menaçants, les Ming reconstruisent la Muraille en briques cuites et pierre taillée — une révolution par rapport à la terre damée des Qin. Des milliers de tours de guet massives sont élevées, les lignes doublées ou triplées. Badaling, Mutianyu, Jinshanling, Simatai et Jiayuguan datent de cette période. Le mortier à base de chaux et riz gluant garantit une résistance exceptionnelle.",
            "Against still-threatening Mongols, the Ming rebuilt the Wall in fired brick and dressed stone — a revolution compared to Qin rammed earth. Thousands of massive watchtowers were raised, lines doubled or tripled. Badaling, Mutianyu, Jinshanling, Simatai and Jiayuguan date from this era. Lime-and-sticky-rice mortar ensured exceptional durability."
          )
        },
        {
          icon: '⚔️', title: t('Guerres & défis du nord', 'Wars & northern challenges'),
          body: t(
            "La menace mongole reste présente. En 1449, lors de la Campagne de Tumu, l'Empereur Yingzong est capturé par les Oirats — humiliation sans précédent. Cette défaite déclenche une vague de construction intensive de la Muraille. En 1550, le khan mongol Altan met en déroute les forces chinoises et atteint les faubourgs de Pékin. Chaque incident renforce la course à la fortification.",
            "The Mongol threat persisted. In 1449, during the Tumu Campaign, Emperor Yingzong was captured by the Oirats — an unprecedented humiliation. This defeat triggered an intensive wave of Wall construction. In 1550, Mongol khan Altan routed Chinese forces and reached Beijing's suburbs. Each incident reinforced the fortification race."
          ),
          war: true
        },
        {
          icon: '🏚️', title: t('Chute des Ming', 'Fall of the Ming'),
          body: t(
            "La dynasty s'effondre sous le poids de plusieurs crises simultanées : soulèvements paysans (Li Zicheng prend Pékin en 1644), pressions mandchoues au nord-est, corruption et épidémies. Le général Wu Sangui ouvre volontairement la passe de Shanhaiguan aux Mandchous pour réprimer Li Zicheng — les Qing entrent et ne repartiront jamais. L'ironie : la Muraille Ming la plus puissante n'est pas percée mais contournée.",
            "The dynasty collapsed under several simultaneous crises: peasant uprisings (Li Zicheng took Beijing in 1644), Manchu pressure from the northeast, corruption and epidemics. General Wu Sangui voluntarily opened Shanhaiguan Pass to the Manchus to suppress Li Zicheng — the Qing entered and never left. The irony: the mightiest Ming Wall was not breached but bypassed."
          )
        }
      ],
      rulers: [
        { date: '1368–1398', name: t('Hongwu (Zhu Yuanzhang)', 'Hongwu (Zhu Yuanzhang)'), desc: t('Fondateur — issu de la paysannerie', 'Founder — rose from peasantry') },
        { date: '1402–1424', name: t('Yongle', 'Yongle'), desc: t('Cité Interdite, Zheng He, Pékin capitale', 'Forbidden City, Zheng He, Beijing capital') },
        { date: '1436–1449', name: t('Yingzong', 'Yingzong'), desc: t('Capturé à Tumu — lance la grande construction', 'Captured at Tumu — triggers major Wall construction') },
        { date: '1572–1620', name: t('Wanli', 'Wanli'), desc: t('Long règne — grande phase de reconstruction', 'Long reign — major reconstruction phase') },
        { date: '1644', name: t('Chongzhen (dernier)', 'Chongzhen (last)'), desc: t('Se pend à Coal Hill quand Pékin tombe', "Hangs himself at Coal Hill as Beijing falls") },
      ],
      wallContrib: t(
        "Les Ming donnent à la Muraille son visage actuel. Briques cuites, pierre taillée, mortier au riz gluant, tours de guet sophistiquées, casernes, portes fortifiées, systèmes de drainage : la Grande Muraille telle que le monde la connaît est à 80% une œuvre Ming.",
        "The Ming gave the Wall its present face. Fired bricks, dressed stone, sticky-rice mortar, sophisticated watchtowers, barracks, fortified gates, drainage systems: the Great Wall as the world knows it is 80% a Ming creation."
      ),
    }),

    "AUJOURD'HUI": () => ({
      facts: [
        { value: '1987', label: t('Inscription UNESCO', 'UNESCO listing') },
        { value: '21 196 km', label: t('longueur totale', 'total length') },
        { value: '10M+', label: t('visiteurs/an', 'visitors/yr') },
      ],
      sections: [
        {
          icon: '🏛️', title: t('Patrimoine mondial de l\'humanité', 'World Heritage of humanity'),
          body: t(
            "Inscrite au patrimoine mondial de l'UNESCO en 1987, la Grande Muraille est reconnue comme « bien de valeur universelle exceptionnelle ». Elle est protégée par la loi chinoise de 2006 sur la protection du patrimoine culturel. Des mesures de gestion strictes encadrent la restauration, le tourisme et les activités à proximité.",
            "Listed as a UNESCO World Heritage site in 1987, the Great Wall is recognized as a 'property of outstanding universal value.' It is protected by China's 2006 Cultural Heritage Protection Law. Strict management measures govern restoration, tourism and nearby activities."
          )
        },
        {
          icon: '🔬', title: t('Conservation scientifique & numérique', 'Scientific & digital conservation'),
          body: t(
            "Des équipes chinoises et internationales utilisent des scans LiDAR, des drones et de la photogrammétrie pour créer des jumeaux numériques 3D de chaque section. Ces outils permettent de détecter des fissures invisibles à l'œil nu, d'anticiper les effondrements et de planifier les restaurations avec une précision millimétrique. C'est l'ambition de ce projet M.C.N.",
            "Chinese and international teams use LiDAR scans, drones and photogrammetry to create 3D digital twins of each section. These tools detect cracks invisible to the naked eye, anticipate collapses and plan restorations with millimeter precision. This is the ambition of this M.C.N. project."
          )
        },
        {
          icon: '⚠️', title: t('Défis contemporains', 'Contemporary challenges'),
          body: t(
            "Environ 30 % des sections Ming ont disparu depuis 1950. L'érosion naturelle, le tourisme de masse (Badaling reçoit 10 millions de visiteurs/an), l'urbanisation et les restaurations parfois trop visibles menacent l'authenticité. La Chine a récemment interdit la restauration agressive et privilégie la « conservation préventive » plutôt que la reconstruction.",
            "About 30% of Ming sections have disappeared since 1950. Natural erosion, mass tourism (Badaling receives 10 million visitors/year), urbanization and sometimes overly visible restorations threaten authenticity. China recently banned aggressive restoration and favors 'preventive conservation' over reconstruction."
          )
        },
        {
          icon: '🌱', title: t('Vers une médiation responsable', 'Toward responsible mediation'),
          body: t(
            "La Muraille est désormais au cœur d'une réflexion mondiale sur le tourisme durable : quotas de visiteurs à Badaling, développement de sections moins connues (Jinshanling, Simatai), application numérique de visite, éducation aux gestes de préservation. Ce prototype M.C.N. s'inscrit dans cette démarche : rendre la Muraille accessible numériquement pour préserver sa réalité physique.",
            "The Wall is now at the center of a global reflection on sustainable tourism: visitor quotas at Badaling, development of less-known sections (Jinshanling, Simatai), digital visit applications, education in preservation practices. This M.C.N. prototype is part of this approach: making the Wall digitally accessible to preserve its physical reality."
          )
        }
      ],
      rulers: [
        { date: '1949', name: t('République Populaire de Chine', 'People\'s Republic of China'), desc: t('Premières restaurations à Badaling (1952)', 'First restorations at Badaling (1952)') },
        { date: '1987', name: 'UNESCO', desc: t('Inscription au patrimoine mondial', 'World Heritage listing') },
        { date: '2006', name: t('Loi de protection', 'Protection Law'), desc: t('Cadre légal strict pour la conservation', 'Strict legal framework for conservation') },
        { date: '2022', name: t('Scan LiDAR national', 'National LiDAR scan'), desc: t('Cartographie numérique complète en cours', 'Complete digital mapping underway') },
      ],
      wallContrib: t(
        "La Muraille d'aujourd'hui n'est plus une frontière mais un bien commun de l'humanité. Sa conservation est à la fois un défi technique, touristique, financier et diplomatique — et un symbole de ce que l'humanité choisit de transmettre.",
        "Today's Wall is no longer a frontier but a common heritage of humanity. Its conservation is at once a technical, tourist, financial and diplomatic challenge — and a symbol of what humanity chooses to pass on."
      ),
    }),
  };

  /* ─── Rendu HTML enrichi ─── */
  function renderDynastyDeep(dynKey, bodyEl) {
    const generator = DEEP[dynKey];
    if (!generator) return false;
    const data = generator();

    const en = isEn();
    let html = '';

    // Ornement
    html += `<div class="mcn-dynasty-ornament"><span>${dynKey}</span></div>`;

    // Faits clés en grille
    if (data.facts && data.facts.length) {
      html += '<div class="mcn-dynasty-fact-grid">';
      data.facts.forEach(f => {
        const val = typeof f.value === 'object' ? (en ? f.value.en : f.value.fr) : f.value;
        const lbl = typeof f.label === 'object' ? (en ? f.label.en : f.label.fr) : f.label;
        html += `<div class="mcn-dynasty-fact-item"><strong>${val}</strong><span>${lbl}</span></div>`;
      });
      html += '</div>';
    }

    // Sections thématiques
    if (data.sections && data.sections.length) {
      data.sections.forEach(sec => {
        if (sec.war) {
          html += `<div class="mcn-dynasty-section mcn-dynasty-war">
            <div class="mcn-dynasty-war-label">⚔️ ${sec.title}</div>
            <p>${sec.body}</p>
          </div>`;
        } else {
          html += `<div class="mcn-dynasty-section">
            <h4>${sec.icon} ${sec.title}</h4>
            <p>${sec.body}</p>
          </div>`;
        }
      });
    }

    // Gouverneurs / Empereurs notables
    if (data.rulers && data.rulers.length) {
      html += `<div class="mcn-dynasty-rulers">
        <div class="mcn-dynasty-rulers-title">${en ? '👑 Notable rulers' : '👑 Gouverneurs & empereurs notables'}</div>`;
      data.rulers.forEach(r => {
        html += `<div class="mcn-dynasty-ruler-item">
          <div class="mcn-dynasty-ruler-date">${r.date}</div>
          <div>
            <div class="mcn-dynasty-ruler-name">${r.name}</div>
            <div class="mcn-dynasty-ruler-desc">${r.desc}</div>
          </div>
        </div>`;
      });
      html += '</div>';
    }

    // Contribution à la Muraille
    if (data.wallContrib) {
      html += `<div class="mcn-wall-badge">${en ? 'Contribution to the Wall' : 'Contribution à la Muraille'}</div>
        <div class="mcn-dynasty-section">
          <h4>🧱 ${en ? 'Wall construction & legacy' : 'Construction & héritage de la Muraille'}</h4>
          <p>${data.wallContrib}</p>
        </div>`;
    }

    bodyEl.innerHTML = html;
    return true;
  }

  /* ─── Patch de renderModal pour les dynasties ─── */
  function patchPremiumFinish() {
    // On cherche la modale root créée par mcn_premium_finish.js
    // et on observe les ouvertures pour enrichir le contenu
    const observer = new MutationObserver(() => {
      const modalRoot = document.querySelector('.mcn-modal-root');
      if (!modalRoot || modalRoot.__dynDeepPatched) return;
      modalRoot.__dynDeepPatched = true;

      // Observer les changements de classe (ouverture)
      const openObserver = new MutationObserver(() => {
        if (!modalRoot.classList.contains('is-open')) return;
        const bodyEl = modalRoot.querySelector('.mcn-modal-body');
        if (!bodyEl || bodyEl.__dynEnriched) return;

        // Récupérer la dynasty depuis le titre de la modale
        const titleEl = bodyEl.querySelector('.mcn-modal-title');
        if (!titleEl) return;

        // Chercher le dynKey depuis l'attribut ou le contenu
        const dynModal = modalRoot.querySelector('.mcn-dynasty-modal');
        if (!dynModal) return; // pas une modale dynasty

        // Trouver le dynKey en cherchant le sceau dans la media zone
        const sealEl = modalRoot.querySelector('.mcn-modal-seal');
        const sealText = sealEl ? sealEl.textContent.trim() : '';

        // Map des sceaux → dynKey
        const sealMap = {
          '夏': 'XIA', '商': 'SHANG', '周': 'ZHOU', '戰': 'ROYAUMES',
          '秦': 'QIN', '漢': 'HAN', '唐': 'TANG', '宋': 'SONG',
          '元': 'YUAN', '明': 'MING', '今': "AUJOURD'HUI"
        };

        const dynKey = sealMap[sealText];
        if (!dynKey) return;

        // Enrichir le contenu
        const kicker = bodyEl.querySelector('.mcn-modal-kicker');
        const title  = bodyEl.querySelector('.mcn-modal-title');
        const sub    = bodyEl.querySelector('.mcn-modal-sub');

        // Sauvegarder header
        const headerHtml = (kicker ? kicker.outerHTML : '') + (title ? title.outerHTML : '') + (sub ? sub.outerHTML : '');
        const navEl = bodyEl.querySelector('.mcn-dynasty-nav');
        const navHtml = navEl ? navEl.outerHTML : '';

        // Remplacer le contenu
        const tempDiv = document.createElement('div');
        if (!renderDynastyDeep(dynKey, tempDiv)) return;
        bodyEl.innerHTML = headerHtml + tempDiv.innerHTML + navHtml;
        bodyEl.__dynEnriched = true;

        // Scroll au top
        bodyEl.scrollTop = 0;
      });

      openObserver.observe(modalRoot, { attributes: true, attributeFilter: ['class'] });

      // Re-render quand la langue change
      if (!window.__mcnLangSubs) window.__mcnLangSubs = new Set();
      window.__mcnLangSubs.add(() => {
        if (!modalRoot.classList.contains('is-open')) return;
        const bodyEl = modalRoot.querySelector('.mcn-modal-body');
        if (bodyEl) bodyEl.__dynEnriched = false; // force re-render
        // Trigger re-render
        const evt = new Event('fake-open-for-lang');
        openObserver.takeRecords(); // flush
      });
    });

    observer.observe(document.body, { childList: true });
  }

  /* ─── Lancement ─── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchPremiumFinish);
  } else {
    patchPremiumFinish();
  }

})();
