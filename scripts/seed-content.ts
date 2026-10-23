/**
 * Institutional content used to initialise the CMS.
 *
 * SOURCES (only verifiable facts are presented as such):
 *  - [FB] Official ACIEA Facebook page, export kept in assets/source/facebook-export/
 *         https://www.facebook.com/profile.php?id=61574577881568
 *  - [GWP] GWP West Africa announcement of the MoU signed on 3 July 2026
 *         https://gwpo-gwp.org/afrique-ouest/fr/news/gwp-wa-and-aciea-formalize-strategic-partnership-to-advance-digital-innovation-for-sustainable-water-management/
 *  - [BRIEF] Project brief (name, location, year of creation, LinkedIn page)
 * English texts are working translations pending validation by ACIEA.
 */

export const FB_URL = 'https://www.facebook.com/profile.php?id=61574577881568'
export const LINKEDIN_URL = 'https://www.linkedin.com/company/aciea/'
export const GWP_URL =
  'https://gwpo-gwp.org/afrique-ouest/fr/news/gwp-wa-and-aciea-formalize-strategic-partnership-to-advance-digital-innovation-for-sustainable-water-management/'
export const GWP_URL_EN =
  'https://gwpo-gwp.org/afrique-ouest/news/gwp-wa-and-aciea-formalize-strategic-partnership-to-advance-digital-innovation-for-sustainable-water-management/'

type L<T = string> = { fr: T; en: T }

/* ------------------------------------------------------------------ */
/* Media (files from assets/source/photos)                             */
/* ------------------------------------------------------------------ */

export type MediaSeed = {
  key: string
  file: string
  alt: L
  caption?: L
  provenance: 'official' | 'field' | 'illustrative' | 'to-verify'
  gallery?: boolean
  /** Focal point (%) kept visible when the image is cropped. */
  focal?: { x: number; y: number }
  /** File lives in assets/source/videos. */
  video?: boolean
}

export const MEDIA: MediaSeed[] = [
  {
    key: 'meea',
    file: 'rencontre-ministere-environnement.jpg',
    alt: {
      fr: 'Délégation de l’ACIEA reçue au Ministère de l’Environnement, de l’Eau et de l’Assainissement',
      en: 'ACIEA delegation received at the Ministry of Environment, Water and Sanitation',
    },
    caption: {
      fr: 'Rencontre avec le Ministère de l’Environnement, de l’Eau et de l’Assainissement',
      en: 'Meeting with the Ministry of Environment, Water and Sanitation',
    },
    provenance: 'official',
    gallery: true,
    focal: { x: 50, y: 45 },
  },
  {
    key: 'pays-bas',
    file: 'rencontre-ambassade-pays-bas.jpg',
    alt: {
      fr: 'Délégation de l’ACIEA reçue à l’Ambassade du Royaume des Pays-Bas au Burkina Faso',
      en: 'ACIEA delegation received at the Embassy of the Kingdom of the Netherlands in Burkina Faso',
    },
    caption: {
      fr: 'Rencontre à l’Ambassade du Royaume des Pays-Bas',
      en: 'Meeting at the Embassy of the Kingdom of the Netherlands',
    },
    provenance: 'official',
    gallery: true,
    focal: { x: 50, y: 40 },
  },
  {
    key: 'saagdo-capture-plateforme',
    file: 'saagdo-capture-plateforme.png',
    alt: {
      fr: 'Plateforme de gestion SAAGDO : carte des signalements à Ouagadougou, avec leur statut (en attente, en cours, terminé, police, rejeté)',
      en: 'SAAGDO management platform: map of reports in Ouagadougou with their status (pending, in progress, done, police, rejected)',
    },
    provenance: 'official',
  },
  {
    key: 'saagdo-capture-application',
    file: 'saagdo-capture-application.png',
    alt: {
      fr: 'Application mobile SAAGDO : accueil avec « Signaler un déchet », « Brigade LAABAL » et la carte des toilettes publiques',
      en: 'SAAGDO mobile app: home screen with “Report waste”, “LAABAL brigade” and the public toilets map',
    },
    provenance: 'official',
  },
  {
    key: 'video-aciea',
    file: 'presentation-aciea.mp4',
    video: true,
    alt: {
      fr: 'Vidéo : des membres de l’ACIEA, dont Doriane SAMBORE, présentent l’Alliance (1 min 35)',
      en: 'Video: ACIEA members, including Doriane SAMBORE, present the Alliance (1 min 35, in French)',
    },
    caption: {
      fr: 'Des membres de l’ACIEA présentent l’Alliance',
      en: 'ACIEA members present the Alliance (in French)',
    },
    provenance: 'official',
  },
  {
    key: 'video-aciea-affiche',
    file: 'video-aciea-affiche.jpg',
    alt: {
      fr: 'Deux membres de l’ACIEA en tenue blanche devant un monument de Ouagadougou',
      en: 'Two ACIEA members dressed in white in front of a Ouagadougou monument',
    },
    provenance: 'official',
  },
  {
    key: 'video-saagdo-affiche',
    file: 'video-saagdo-affiche.jpg',
    alt: {
      fr: 'Un membre de l’équipe SAAGDO s’adresse à la caméra dans un parc',
      en: 'A SAAGDO team member speaks to the camera in a park',
    },
    provenance: 'official',
  },
  {
    key: 'video-saagdo',
    file: 'presentation-saagdo.mp4',
    video: true,
    alt: {
      fr: 'Vidéo : l’équipe SAAGDO présente l’application et son fonctionnement (3 min, en anglais, sous-titrée)',
      en: 'Video: the SAAGDO team presents the app and how it works (3 min, in English, subtitled)',
    },
    caption: {
      fr: 'L’équipe SAAGDO présente l’application (en anglais, sous-titrée)',
      en: 'The SAAGDO team presents the app (subtitled)',
    },
    provenance: 'official',
  },
  {
    key: 'signature-gwp',
    file: 'signature-protocole-gwp-ao.jpg',
    alt: {
      fr: 'Les représentants de l’ACIEA et du GWP Afrique de l’Ouest présentent le protocole d’accord signé, devant une bannière du GWP',
      en: 'ACIEA and GWP West Africa representatives hold up the signed memorandum of understanding in front of a GWP banner',
    },
    caption: {
      fr: 'Signature du protocole d’accord ACIEA – GWP Afrique de l’Ouest',
      en: 'Signing of the ACIEA – GWP West Africa memorandum of understanding',
    },
    provenance: 'official',
    gallery: true,
    focal: { x: 50, y: 40 },
  },
  {
    key: 'equipe-saagdo',
    file: 'equipe-saagdo.jpg',
    alt: {
      fr: 'Cinq jeunes de l’équipe SAAGDO se tiennent la main, en t-shirts « SAAGDO — Ensemble pour une ville propre »',
      en: 'Five young members of the SAAGDO team hold hands, wearing “SAAGDO — Ensemble pour une ville propre” T-shirts',
    },
    caption: {
      fr: 'L’équipe SAAGDO — « Ensemble pour une ville propre »',
      en: 'The SAAGDO team — “Together for a clean city”',
    },
    provenance: 'official',
    gallery: true,
    focal: { x: 50, y: 15 },
  },
  {
    key: 'logo',
    file: 'ccc.jpg',
    alt: { fr: 'Logo officiel de l’ACIEA', en: 'Official ACIEA logo' },
    provenance: 'official',
  },
  {
    key: 'camp',
    file: 'CAMP.jpg',
    alt: {
      fr: 'Groupe de jeunes participants au Camp Vacances Éco-Citoyen de Komsilga',
      en: 'Group of young participants at the Eco-Citizen Holiday Camp in Komsilga',
    },
    caption: {
      fr: 'Camp Vacances Éco-Citoyen — Komsilga, septembre 2025',
      en: 'Eco-Citizen Holiday Camp — Komsilga, September 2025',
    },
    provenance: 'official',
    gallery: true,
  },
  {
    key: 'arbre',
    file: 'ARBRE.jpg',
    alt: {
      fr: 'Rassemblement en plein air sous les arbres autour d’une bannière « Espace Jeunes — Arbre et culture »',
      en: 'Outdoor gathering under trees around an “Espace Jeunes — Arbre et culture” banner',
    },
    caption: {
      fr: 'Activité autour de l’arbre et de la jeunesse',
      en: 'Activity on trees and youth',
    },
    provenance: 'official',
    gallery: true,
  },
  {
    key: 'reboisement',
    file: 'DD.jpg',
    alt: {
      fr: 'Jeunes membres tenant des plants d’arbres prêts à être mis en terre',
      en: 'Young members holding tree seedlings ready for planting',
    },
    caption: { fr: 'Action de reboisement', en: 'Tree-planting action' },
    provenance: 'official',
    gallery: true,
  },
  {
    key: 'plantation',
    file: 'ENGAGE.jpg',
    alt: {
      fr: 'Membres de l’ACIEA mettant en terre un jeune plant',
      en: 'ACIEA members planting a young tree',
    },
    caption: { fr: 'Mise en terre de plants', en: 'Planting seedlings' },
    provenance: 'official',
    gallery: true,
  },
  {
    key: 'saoudite',
    file: 'TRRTG.jpg',
    alt: {
      fr: 'Délégation de l’ACIEA reçue à l’Ambassade du Royaume d’Arabie saoudite au Burkina Faso',
      en: 'ACIEA delegation received at the Embassy of the Kingdom of Saudi Arabia in Burkina Faso',
    },
    caption: {
      fr: 'Audience à l’Ambassade d’Arabie saoudite — 6 mai 2025',
      en: 'Meeting at the Saudi Embassy — 6 May 2025',
    },
    provenance: 'official',
    gallery: true,
  },
  {
    key: 'cndd',
    file: 'TTR.jpg',
    alt: {
      fr: 'Délégation de l’ACIEA et représentants du SP/CNDD, 30 mai 2025',
      en: 'ACIEA delegation and SP/CNDD representatives, 30 May 2025',
    },
    caption: {
      fr: 'Rencontre avec le SP/CNDD — 30 mai 2025',
      en: 'Meeting with SP/CNDD — 30 May 2025',
    },
    provenance: 'official',
    gallery: true,
  },
  {
    key: 'mairie',
    file: 'PDS.jpg',
    alt: {
      fr: 'Délégation de l’ACIEA à la Mairie centrale de Ouagadougou',
      en: 'ACIEA delegation at Ouagadougou central town hall',
    },
    caption: {
      fr: 'Mairie centrale de Ouagadougou — 22 juillet 2025',
      en: 'Ouagadougou town hall — 22 July 2025',
    },
    provenance: 'official',
    gallery: true,
  },
  {
    key: 'independance',
    file: 'INDE.jpg',
    alt: {
      fr: 'Visuel de l’ACIEA pour la fête de l’indépendance du Burkina Faso',
      en: 'ACIEA visual for Burkina Faso’s Independence Day',
    },
    provenance: 'official',
  },
  {
    key: 'wateraid',
    file: 'FG.jpg',
    alt: {
      fr: 'Membres de l’ACIEA dans les locaux de WaterAid',
      en: 'ACIEA members at WaterAid offices',
    },
    provenance: 'official',
    gallery: true,
  },
  {
    key: 'bresil',
    file: 'FDFD.jpg',
    alt: {
      fr: 'Délégation de l’ACIEA lors d’une audience diplomatique',
      en: 'ACIEA delegation during a diplomatic meeting',
    },
    provenance: 'official',
    gallery: true,
  },
  {
    key: 'atelier',
    file: 'pournous.jpg',
    alt: {
      fr: 'Séance de travail en salle informatique',
      en: 'Working session in a computer room',
    },
    caption: { fr: 'Séance de travail', en: 'Working session' },
    provenance: 'official',
    gallery: true,
  },
  {
    key: 'rencontre',
    file: 'TGTGR.jpg',
    alt: {
      fr: 'Délégation de l’ACIEA lors d’une rencontre institutionnelle',
      en: 'ACIEA delegation at an institutional meeting',
    },
    caption: { fr: 'Rencontre institutionnelle', en: 'Institutional meeting' },
    provenance: 'official',
    gallery: true,
  },
  {
    key: 'rencontre2',
    file: 'OTRE.jpg',
    alt: {
      fr: 'Délégation de l’ACIEA reçue dans un bureau institutionnel',
      en: 'ACIEA delegation received in an institutional office',
    },
    caption: { fr: 'Rencontre institutionnelle', en: 'Institutional meeting' },
    provenance: 'official',
    gallery: true,
  },
  {
    key: 'presentation',
    file: 'sithao.jpg',
    alt: {
      fr: 'Membres de l’ACIEA lors d’une présentation',
      en: 'ACIEA members during a presentation',
    },
    caption: { fr: 'Présentation publique', en: 'Public presentation' },
    provenance: 'official',
    gallery: true,
  },
]

/* ------------------------------------------------------------------ */
/* Site settings                                                       */
/* ------------------------------------------------------------------ */

export const SETTINGS = {
  organizationName: {
    fr: 'Alliance pour l’innovation climatique et l’action écologique',
    en: 'Alliance for Climate Innovation and Ecological Action',
  },
  tagline: {
    fr: 'Innovons ensemble pour un avenir durable',
    en: 'Innovating together for a sustainable future',
  },
  description: {
    fr: 'Organisation à but non lucratif basée à Ouagadougou, l’ACIEA mobilise l’innovation, la science et l’engagement des jeunes au service du climat, de l’eau et des écosystèmes.',
    en: 'A non-profit organisation based in Ouagadougou, ACIEA mobilises innovation, science and youth engagement for the climate, water and ecosystems.',
  },
  legalStatus: { fr: 'Organisation à but non lucratif', en: 'Non-profit organisation' },
  country: { fr: 'Burkina Faso', en: 'Burkina Faso' },
  address: { fr: 'Ouagadougou, Burkina Faso', en: 'Ouagadougou, Burkina Faso' },
  dataController: { fr: 'ACIEA — Bureau exécutif', en: 'ACIEA — Executive office' },
  defaultMetaTitle: {
    fr: 'ACIEA — Alliance pour l’innovation climatique et l’action écologique',
    en: 'ACIEA — Alliance for Climate Innovation and Ecological Action',
  },
  defaultMetaDescription: {
    fr: 'ACIEA, organisation à but non lucratif basée à Ouagadougou (Burkina Faso) : innovation climatique, eau et assainissement, biodiversité, numérique et engagement des jeunes.',
    en: 'ACIEA, a non-profit based in Ouagadougou (Burkina Faso): climate innovation, water and sanitation, biodiversity, digital tools and youth engagement.',
  },
  // Confirmed by ACIEA on 22/10/2026 as the site's official contact details.
  email: 'aciea662@gmail.com',
  phone: '+226 73 42 14 75',
}

/* ------------------------------------------------------------------ */
/* Focus areas                                                         */
/* ------------------------------------------------------------------ */

export const DOMAINS: {
  slug: string
  icon: string
  title: L
  summary: L
  body: L
  points: L<string[]>
}[] = [
  {
    slug: 'climat-resilience',
    icon: 'thermometer-sun',
    title: { fr: 'Climat et résilience', en: 'Climate and resilience' },
    summary: {
      fr: 'Contribuer à l’adaptation des territoires et des communautés aux effets du changement climatique, en conjuguant savoirs locaux, sensibilisation et solutions innovantes.',
      en: 'Helping territories and communities adapt to the effects of climate change by combining local knowledge, awareness-raising and innovative solutions.',
    },
    body: {
      fr: 'Le Burkina Faso et l’Afrique de l’Ouest sont directement exposés aux effets du changement climatique. L’ACIEA s’attache à promouvoir des solutions durables et adaptées aux réalités locales, et à faire des jeunes des acteurs de la résilience.\n\nL’Alliance développe le dialogue avec les institutions nationales, les collectivités et les partenaires internationaux afin de favoriser des synergies au service de l’action climatique.',
      en: 'Burkina Faso and West Africa are directly exposed to the effects of climate change. ACIEA promotes sustainable solutions adapted to local realities and empowers young people as actors of resilience.\n\nThe Alliance fosters dialogue with national institutions, local authorities and international partners to build synergies for climate action.',
    },
    points: {
      fr: [
        'Sensibilisation aux enjeux climatiques',
        'Promotion de pratiques d’adaptation adaptées aux réalités locales',
        'Dialogue avec les institutions et les collectivités',
        'Mobilisation des jeunes pour l’action climatique',
      ],
      en: [
        'Raising awareness of climate issues',
        'Promoting adaptation practices suited to local realities',
        'Dialogue with institutions and local authorities',
        'Mobilising young people for climate action',
      ],
    },
  },
  {
    slug: 'eau-assainissement',
    icon: 'droplets',
    title: { fr: 'Eau et assainissement', en: 'Water and sanitation' },
    summary: {
      fr: 'Œuvrer pour une gestion durable des ressources en eau et un meilleur assainissement, grâce à la surveillance environnementale et à la prévention des pollutions.',
      en: 'Working towards sustainable water resource management and better sanitation through environmental monitoring and pollution prevention.',
    },
    body: {
      fr: 'L’eau est au cœur des enjeux de santé, de développement et d’adaptation climatique. L’ACIEA porte des réponses mêlant sensibilisation, salubrité et outils numériques.\n\nC’est dans ce domaine que s’inscrit **SAAGDO**, solution numérique associant surveillance environnementale, cartographie participative et anticipation des risques de pollution liés à l’eau et à l’assainissement.',
      en: 'Water lies at the heart of health, development and climate adaptation. ACIEA develops responses combining awareness-raising, sanitation and digital tools.\n\nThis is the field of **SAAGDO**, a digital solution combining environmental monitoring, participatory mapping and the anticipation of water- and sanitation-related pollution risks.',
    },
    points: {
      fr: [
        'Gestion durable des ressources en eau',
        'Prévention des pollutions liées à l’eau et à l’assainissement',
        'Salubrité et gestion des déchets',
        'Outils numériques de surveillance environnementale',
      ],
      en: [
        'Sustainable water resource management',
        'Preventing water- and sanitation-related pollution',
        'Sanitation and waste management',
        'Digital environmental monitoring tools',
      ],
    },
  },
  {
    slug: 'biodiversite',
    icon: 'trees',
    title: { fr: 'Conservation de la biodiversité', en: 'Biodiversity conservation' },
    summary: {
      fr: 'Préserver les écosystèmes et la biodiversité par le reboisement, la sensibilisation et la valorisation durable des ressources naturelles.',
      en: 'Protecting ecosystems and biodiversity through tree planting, awareness-raising and the sustainable use of natural resources.',
    },
    body: {
      fr: 'La dégradation des écosystèmes fragilise les moyens de subsistance et la capacité d’adaptation des populations. L’ACIEA mobilise ses membres et les jeunes autour d’actions concrètes de reboisement et de protection de la nature.',
      en: 'Ecosystem degradation undermines livelihoods and people’s capacity to adapt. ACIEA mobilises its members and young people around practical tree-planting and nature protection actions.',
    },
    points: {
      fr: ['Reboisement et restauration', 'Protection des écosystèmes', 'Éducation à la nature'],
      en: ['Tree planting and restoration', 'Ecosystem protection', 'Nature education'],
    },
  },
  {
    slug: 'innovation-numerique-ia',
    icon: 'brain-circuit',
    title: {
      fr: 'Innovation numérique et intelligence artificielle',
      en: 'Digital innovation and artificial intelligence',
    },
    summary: {
      fr: 'Mettre le numérique, la donnée et l’intelligence artificielle au service de l’action environnementale et de l’aide à la décision.',
      en: 'Harnessing digital tools, data and artificial intelligence for environmental action and decision support.',
    },
    body: {
      fr: 'La donnée environnementale est souvent dispersée, difficile d’accès et peu exploitée. L’ACIEA explore le potentiel des outils numériques — applications mobiles, plateformes de gestion, cartographie et intelligence artificielle — pour mieux observer, comprendre et anticiper.',
      en: 'Environmental data is often scattered, hard to access and under-used. ACIEA explores the potential of digital tools — mobile apps, management platforms, mapping and artificial intelligence — to better observe, understand and anticipate.',
    },
    points: {
      fr: [
        'Digitalisation et valorisation des données environnementales',
        'Cartographie participative',
        'Intelligence artificielle appliquée à l’anticipation des risques',
        'Technologies vertes',
      ],
      en: [
        'Digitising and enhancing environmental data',
        'Participatory mapping',
        'Artificial intelligence for risk anticipation',
        'Green technologies',
      ],
    },
  },
  {
    slug: 'recherche-scientifique',
    icon: 'microscope',
    title: { fr: 'Recherche scientifique', en: 'Scientific research' },
    summary: {
      fr: 'Ancrer l’action dans la connaissance : collecte de données, analyse et coopération avec les acteurs de la recherche.',
      en: 'Grounding action in knowledge: data collection, analysis and cooperation with research actors.',
    },
    body: {
      fr: 'L’ACIEA souhaite fonder ses initiatives sur des données fiables et des méthodes rigoureuses, et contribuer à la production de connaissances utiles aux décideurs et aux communautés.',
      en: 'ACIEA aims to base its initiatives on reliable data and rigorous methods, and to contribute knowledge useful to decision-makers and communities.',
    },
    points: {
      fr: [
        'Collecte et analyse de données',
        'Coopération avec les universités et centres de recherche',
        'Diffusion des connaissances',
      ],
      en: [
        'Data collection and analysis',
        'Cooperation with universities and research centres',
        'Knowledge sharing',
      ],
    },
  },
  {
    slug: 'education-engagement',
    icon: 'graduation-cap',
    title: {
      fr: 'Éducation environnementale et engagement communautaire',
      en: 'Environmental education and community engagement',
    },
    summary: {
      fr: 'Former, sensibiliser et mobiliser les jeunes et les communautés pour faire de chacun un acteur de la transition écologique.',
      en: 'Training, raising awareness and mobilising young people and communities so that everyone becomes an actor of the ecological transition.',
    },
    body: {
      fr: 'L’ACIEA place la jeunesse au cœur de son action. Ateliers pratiques, camps éco-citoyens et actions de terrain permettent de transformer les convictions en initiatives concrètes.\n\nL’Alliance soutient également l’entrepreneuriat vert, en particulier auprès des jeunes et des femmes.',
      en: 'ACIEA puts young people at the heart of its work. Hands-on workshops, eco-citizen camps and field actions turn convictions into concrete initiatives.\n\nThe Alliance also supports green entrepreneurship, particularly among young people and women.',
    },
    points: {
      fr: [
        'Éco-citoyenneté et sensibilisation',
        'Camps et ateliers pratiques',
        'Entrepreneuriat vert des jeunes et des femmes',
        'Renforcement des capacités communautaires',
      ],
      en: [
        'Eco-citizenship and awareness-raising',
        'Camps and hands-on workshops',
        'Green entrepreneurship for young people and women',
        'Community capacity building',
      ],
    },
  },
]

/* ------------------------------------------------------------------ */
/* Partners                                                            */
/* ------------------------------------------------------------------ */

export const GWP_PARTNER = {
  slug: 'gwp-afrique-de-l-ouest',
  name: {
    fr: 'Global Water Partnership Afrique de l’Ouest',
    en: 'Global Water Partnership West Africa',
  },
  acronym: { fr: 'GWP-AO', en: 'GWP-WA' },
  website: 'https://gwpo-gwp.org/afrique-ouest/',
  category: 'institutional' as const,
  agreementType: { fr: 'Protocole d’accord', en: 'Memorandum of Understanding' },
  agreementDate: '2026-07-03T12:00:00.000Z',
  description: {
    fr: 'Le 3 juillet 2026, l’ACIEA et le GWP Afrique de l’Ouest ont signé un protocole d’accord au Secrétariat du GWP-AO à Ouagadougou. Ce partenariat porte sur la gestion durable des ressources en eau, la résilience climatique et l’innovation numérique, avec au cœur le déploiement de la solution SAAGDO.',
    en: 'On 3 July 2026, ACIEA and GWP West Africa signed a Memorandum of Understanding at the GWP-WA Secretariat in Ouagadougou. The partnership covers sustainable water resource management, climate resilience and digital innovation, centred on the deployment of the SAAGDO solution.',
  },
  areas: {
    fr: [
      'Gestion durable des ressources en eau',
      'Résilience climatique',
      'Innovation numérique',
      'Déploiement de SAAGDO (surveillance environnementale, cartographie citoyenne, prévision des risques de pollution)',
    ],
    en: [
      'Sustainable water resource management',
      'Climate resilience',
      'Digital innovation',
      'Deployment of SAAGDO (environmental monitoring, citizen mapping, pollution risk prediction)',
    ],
  },
  sourceUrl: GWP_URL,
}

/**
 * Further institutional partners named by ACIEA on 22/10/2026. No agreement
 * type, date or website was supplied, so none is shown.
 */
export const OTHER_PARTNERS = [
  {
    slug: 'mairie-centrale-de-ouagadougou',
    name: { fr: 'Mairie centrale de Ouagadougou', en: 'Ouagadougou Central Town Hall' },
    description: {
      fr: 'Le 22 juillet 2025, l’ACIEA a présenté sa mission et ses domaines d’intervention au président de la Délégation spéciale de la commune de Ouagadougou et à son directeur technique.',
      en: 'On 22 July 2025, ACIEA presented its mission and areas of work to the President of the Special Delegation of the Municipality of Ouagadougou and his Technical Director.',
    },
  },
  {
    slug: 'ministere-agriculture-eau-ressources-animales-halieutiques',
    name: {
      fr: 'Ministère de l’Agriculture, de l’Eau, des Ressources animales et halieutiques',
      en: 'Ministry of Agriculture, Water, Animal and Fisheries Resources',
    },
    description: { fr: '', en: '' },
  },
]

/* ------------------------------------------------------------------ */
/* News (verified posts from the official Facebook page + GWP)         */
/* ------------------------------------------------------------------ */

export type NewsSeed = {
  slug: string
  publishedAt: string
  category: 'institutional' | 'partnership' | 'field' | 'event' | 'statement' | 'innovation'
  cover?: string
  gallery?: string[]
  title: L
  excerpt: L
  content: L
  sourceUrl: string
  draft?: boolean
  reviewNote?: string
}

export const NEWS: NewsSeed[] = [
  {
    slug: 'protocole-accord-gwp-afrique-de-l-ouest',
    publishedAt: '2026-07-03T12:00:00.000Z',
    category: 'partnership',
    cover: 'signature-gwp',
    title: {
      fr: 'L’ACIEA et le GWP Afrique de l’Ouest formalisent un partenariat stratégique',
      en: 'ACIEA and GWP West Africa formalise a strategic partnership',
    },
    excerpt: {
      fr: 'Un protocole d’accord signé le 3 juillet 2026 à Ouagadougou pour la gestion durable de l’eau, la résilience climatique et l’innovation numérique, autour de la solution SAAGDO.',
      en: 'A Memorandum of Understanding signed on 3 July 2026 in Ouagadougou on sustainable water management, climate resilience and digital innovation, centred on the SAAGDO solution.',
    },
    content: {
      fr: `Le 3 juillet 2026, l’Alliance for Climate Innovation and Ecological Action (ACIEA) et le Global Water Partnership Afrique de l’Ouest (GWP-AO) ont signé un protocole d’accord au Secrétariat du GWP-AO à Ouagadougou.

Ce partenariat vise à contribuer à des solutions innovantes, inclusives et durables face aux enjeux de pollution de l’eau, d’assainissement, de dégradation de l’environnement et de changement climatique en Afrique de l’Ouest.

## SAAGDO au cœur de la collaboration

Le partenariat s’articule autour du déploiement de **SAAGDO**, une application mobile associée à une plateforme de gestion, conçue pour renforcer la surveillance environnementale, la cartographie citoyenne et la prévision des risques de pollution liés à l’eau et à l’assainissement.

Source : [annonce officielle du GWP Afrique de l’Ouest](${GWP_URL})`,
      en: `On 3 July 2026, the Alliance for Climate Innovation and Ecological Action (ACIEA) and the Global Water Partnership West Africa (GWP-WA) signed a Memorandum of Understanding at the GWP-WA Secretariat in Ouagadougou.

The partnership aims to contribute innovative, inclusive and sustainable solutions to water pollution, sanitation, environmental degradation and climate change challenges in West Africa.

## SAAGDO at the heart of the collaboration

The partnership centres on the deployment of **SAAGDO**, a mobile application and management platform designed to strengthen environmental monitoring, citizen mapping and the prediction of water- and sanitation-related pollution risks.

Source: [official GWP West Africa announcement](${GWP_URL_EN})`,
    },
    sourceUrl: GWP_URL,
  },
  {
    slug: 'camp-vacances-eco-citoyen-komsilga-2025',
    publishedAt: '2025-09-14T12:00:00.000Z',
    category: 'field',
    cover: 'camp',
    title: {
      fr: 'Camp Vacances Éco-Citoyen 2025 : une jeunesse réunie à Komsilga pour un avenir vert',
      en: 'Eco-Citizen Holiday Camp 2025: young people gather in Komsilga for a green future',
    },
    excerpt: {
      fr: 'Du 2 au 8 septembre 2025, la commune de Komsilga a accueilli le Camp Vacances Éco-Citoyen : ateliers d’agriculture hors-sol, de recyclage des pneus usagés et d’éco-citoyenneté, complétés par des actions de reboisement.',
      en: 'From 2 to 8 September 2025, the municipality of Komsilga hosted the Eco-Citizen Holiday Camp: workshops on soilless farming, recycling used tyres and eco-citizenship, alongside tree-planting.',
    },
    content: {
      fr: `Du 2 au 8 septembre 2025, la commune de Komsilga a vibré au rythme du Camp Vacances Éco-Citoyen. Ce camp a réuni des dizaines de jeunes autour d’une même vision : celle d’un monde plus respectueux de l’environnement et solidaire face aux défis climatiques.

## Se former et agir

Durant sept jours, les participants ont pris part à des ateliers pratiques :

- **Agriculture hors-sol** : une alternative innovante face aux défis de la sécurité alimentaire et du changement climatique.
- **Recyclage des pneus usagés** : transformer les déchets en ressources utiles pour réduire la pollution.
- **Éco-citoyenneté** : comprendre son rôle et ses responsabilités dans la construction d’un avenir durable.

Ces formations ont été complétées par des actions concrètes comme le reboisement.

## Un espace de fraternité

Au-delà des apprentissages, le camp a été un espace d’échanges interculturels : discussions autour des feux de camp, contes traditionnels et moments de convivialité ont renforcé la cohésion et l’esprit d’équipe.

> Innovons ensemble pour un avenir durable.`,
      en: `From 2 to 8 September 2025, the municipality of Komsilga hosted the Eco-Citizen Holiday Camp, bringing together dozens of young people around a shared vision: a world that respects the environment and stands together in the face of climate challenges.

## Learning and acting

Over seven days, participants took part in hands-on workshops:

- **Soilless farming**: an innovative response to food security and climate challenges.
- **Recycling used tyres**: turning waste into useful resources to reduce pollution.
- **Eco-citizenship**: understanding one’s role and responsibilities in building a sustainable future.

The training was complemented by practical actions such as tree planting.

## A space for fellowship

Beyond learning, the camp was a space for intercultural exchange: campfire discussions, traditional tales and moments of conviviality strengthened team spirit.

> Innovating together for a sustainable future.`,
    },
    sourceUrl: FB_URL,
  },
  {
    slug: 'message-65e-anniversaire-independance-burkina-faso',
    publishedAt: '2025-08-05T08:00:00.000Z',
    category: 'statement',
    cover: 'independance',
    title: {
      fr: 'Message de l’ACIEA à l’occasion du 65e anniversaire de l’indépendance du Burkina Faso',
      en: 'ACIEA’s message on the 65th anniversary of Burkina Faso’s independence',
    },
    excerpt: {
      fr: 'L’ACIEA rend hommage au peuple burkinabè pour 65 ans de résilience, de dignité et d’engagement, et appelle à faire rayonner l’écocitoyenneté.',
      en: 'ACIEA pays tribute to the people of Burkina Faso for 65 years of resilience, dignity and commitment, and calls for eco-citizenship to flourish.',
    },
    content: {
      fr: `En ce 5 août 2025, l’Alliance for Climate Innovation and Ecological Action rend hommage au peuple burkinabè pour 65 ans de résilience, de dignité et d’engagement.

Face aux défis climatiques, sécuritaires et sociaux, nous croyons en une jeunesse forte, innovante et unie pour bâtir un avenir durable. Ensemble, cultivons la paix, protégeons nos ressources et faisons rayonner l’écocitoyenneté.

Que cette fête de l’indépendance ravive notre engagement collectif pour un Burkina Faso prospère, écologique et solidaire.`,
      en: `On 5 August 2025, the Alliance for Climate Innovation and Ecological Action pays tribute to the people of Burkina Faso for 65 years of resilience, dignity and commitment.

Facing climate, security and social challenges, we believe in strong, innovative and united young people to build a sustainable future. Together, let us cultivate peace, protect our resources and make eco-citizenship flourish.

May this Independence Day renew our collective commitment to a prosperous, ecological and united Burkina Faso.`,
    },
    sourceUrl: FB_URL,
  },
  {
    slug: 'rencontre-mairie-centrale-ouagadougou',
    publishedAt: '2025-07-22T12:00:00.000Z',
    category: 'institutional',
    cover: 'mairie',
    title: {
      fr: 'Rencontre entre l’ACIEA et la Mairie centrale de Ouagadougou autour de solutions innovantes',
      en: 'ACIEA meets Ouagadougou central town hall to discuss innovative solutions',
    },
    excerpt: {
      fr: 'Le 22 juillet 2025, l’ACIEA a présenté sa mission et ses axes d’intervention au Président de la Délégation spéciale et à son Directeur technique.',
      en: 'On 22 July 2025, ACIEA presented its mission and areas of work to the President of the Special Delegation and his Technical Director.',
    },
    content: {
      fr: `Le mardi 22 juillet 2025, une réunion s’est tenue dans les locaux de la Mairie centrale de Ouagadougou entre l’ACIEA et les autorités municipales, représentées par M. Maurice Konaté, Président de la Délégation spéciale (PDS), et son Directeur technique, M. Saidou Nassouri.

La rencontre a débuté par une présentation des participants, suivie de l’exposé de la mission et des principaux axes d’intervention de l’ACIEA. L’équipe a mis en lumière ses projets dans les domaines de la gestion des déchets, des technologies vertes et de la préservation de l’environnement.

Les échanges ont fait émerger un intérêt partagé pour des solutions concrètes en faveur d’une ville durable, résiliente et innovante, et les deux parties ont exprimé leur intérêt à collaborer sur des projets communs.`,
      en: `On Tuesday 22 July 2025, a meeting was held at Ouagadougou central town hall between ACIEA and the municipal authorities, represented by Mr Maurice Konaté, President of the Special Delegation, and his Technical Director, Mr Saidou Nassouri.

After introductions, ACIEA presented its mission and main areas of work, highlighting projects in waste management, green technologies and environmental protection.

The discussions revealed a shared interest in concrete solutions for a sustainable, resilient and innovative city, and both parties expressed interest in collaborating on joint projects.`,
    },
    sourceUrl: FB_URL,
  },
  {
    slug: 'rencontre-ministere-environnement-eau-assainissement',
    publishedAt: '2025-07-08T12:00:00.000Z',
    category: 'institutional',
    cover: 'meea',
    title: {
      fr: 'Rencontre entre l’ACIEA et le Ministère de l’Environnement, de l’Eau et de l’Assainissement',
      en: 'ACIEA meets the Ministry of Environment, Water and Sanitation',
    },
    excerpt: {
      fr: 'Le 8 juillet 2025, une délégation de l’ACIEA a été reçue par le Directeur de cabinet du MEEA pour présenter l’Alliance, sa vision et ses actions.',
      en: 'On 8 July 2025, an ACIEA delegation was received by the Chief of Staff of the Ministry to present the Alliance, its vision and its actions.',
    },
    content: {
      fr: `Le 8 juillet 2025, une délégation de l’ACIEA a été reçue par le Directeur de cabinet du Ministère de l’Environnement, de l’Eau et de l’Assainissement (MEEA).

Cette rencontre avait pour objectif de présenter l’ACIEA, sa vision, ses objectifs et ses actions en faveur de l’environnement. Le Directeur de cabinet a salué l’engagement des jeunes burkinabè au sein de l’Alliance, soulignant la pertinence des initiatives portées et leur ancrage citoyen et technologique.

Un échange porteur d’espoir pour de futures synergies en faveur d’un Burkina Faso plus résilient face aux défis climatiques.`,
      en: `On 8 July 2025, an ACIEA delegation was received by the Chief of Staff of the Ministry of Environment, Water and Sanitation (MEEA).

The meeting aimed to present ACIEA, its vision, objectives and environmental actions. The Chief of Staff praised the commitment of young Burkinabè within the Alliance, highlighting the relevance of its initiatives and their civic and technological grounding.

A promising exchange for future synergies towards a Burkina Faso more resilient to climate challenges.`,
    },
    sourceUrl: FB_URL,
  },
  {
    slug: 'rencontre-strategique-sp-cndd',
    publishedAt: '2025-05-30T12:00:00.000Z',
    category: 'institutional',
    cover: 'cndd',
    title: {
      fr: 'Rencontre stratégique entre l’ACIEA et le SP/CNDD',
      en: 'Strategic meeting between ACIEA and SP/CNDD',
    },
    excerpt: {
      fr: 'Le 30 mai 2025, l’ACIEA a été reçue par le Secrétariat permanent du Conseil national pour le développement durable pour un dialogue sur l’eau, l’assainissement et l’innovation climatique.',
      en: 'On 30 May 2025, ACIEA was received by the Permanent Secretariat of the National Council for Sustainable Development to discuss water, sanitation and climate innovation.',
    },
    content: {
      fr: `Le vendredi 30 mai 2025, l’ACIEA a été reçue en audience par une délégation du Secrétariat permanent du Conseil national pour le développement durable (SP/CNDD).

Cette rencontre s’inscrit dans un dialogue constructif en vue d’une collaboration sur des enjeux tels que l’eau, l’assainissement, l’innovation climatique et la préservation de l’environnement. La délégation de l’ACIEA a présenté sa vision, sa mission et ses domaines d’intervention.

L’audience a été marquée par une volonté commune de bâtir un partenariat fondé sur la complémentarité des actions et le renforcement des synergies existantes.`,
      en: `On Friday 30 May 2025, ACIEA was received by a delegation of the Permanent Secretariat of the National Council for Sustainable Development (SP/CNDD).

The meeting is part of a constructive dialogue towards collaboration on water, sanitation, climate innovation and environmental protection. The ACIEA delegation presented its vision, mission and areas of work.

Both sides expressed a shared wish to build a partnership based on complementary actions and stronger synergies.`,
    },
    sourceUrl: FB_URL,
  },
  {
    slug: 'echange-ambassade-pays-bas',
    publishedAt: '2025-05-20T12:00:00.000Z',
    category: 'institutional',
    cover: 'pays-bas',
    title: {
      fr: 'Rencontre stratégique pour le climat : l’Ambassade des Pays-Bas reçoit l’ACIEA',
      en: 'Strategic climate meeting: the Embassy of the Netherlands receives ACIEA',
    },
    excerpt: {
      fr: 'Le 20 mai 2025, l’Ambassade du Royaume des Pays-Bas au Burkina Faso a accueilli une délégation de l’ACIEA pour un échange sur les enjeux climatiques et la coopération.',
      en: 'On 20 May 2025, the Embassy of the Kingdom of the Netherlands in Burkina Faso welcomed an ACIEA delegation to discuss climate issues and cooperation.',
    },
    content: {
      fr: `Le 20 mai 2025, l’Ambassade du Royaume des Pays-Bas au Burkina Faso a accueilli une délégation de l’ACIEA dans le cadre d’un échange autour des enjeux climatiques et de la coopération internationale.

L’ACIEA a présenté ses missions : la promotion de solutions innovantes, durables et adaptées aux réalités locales, le renforcement des capacités communautaires, la sensibilisation citoyenne, la mise en œuvre de projets écologiques participatifs et le soutien à l’entrepreneuriat vert, en particulier auprès des jeunes et des femmes.

L’Ambassade a exprimé son intérêt à explorer des pistes de collaboration.`,
      en: `On 20 May 2025, the Embassy of the Kingdom of the Netherlands in Burkina Faso welcomed an ACIEA delegation to discuss climate issues and international cooperation.

ACIEA presented its missions: promoting innovative, sustainable solutions adapted to local realities, community capacity building, civic awareness, participatory ecological projects and support for green entrepreneurship, particularly among young people and women.

The Embassy expressed interest in exploring avenues for collaboration.`,
    },
    sourceUrl: FB_URL,
  },
  {
    slug: 'audience-ambassade-arabie-saoudite',
    publishedAt: '2025-05-06T12:00:00.000Z',
    category: 'institutional',
    cover: 'saoudite',
    title: {
      fr: 'Audience à l’Ambassade du Royaume d’Arabie saoudite : une ouverture vers la coopération environnementale',
      en: 'Meeting at the Embassy of the Kingdom of Saudi Arabia: towards environmental cooperation',
    },
    excerpt: {
      fr: 'Le 6 mai 2025, l’ACIEA a été reçue par l’Ambassadeur du Royaume d’Arabie saoudite au Burkina Faso pour présenter sa vision et ses missions.',
      en: 'On 6 May 2025, ACIEA was received by the Ambassador of the Kingdom of Saudi Arabia to Burkina Faso to present its vision and missions.',
    },
    content: {
      fr: `Le mardi 6 mai 2025, l’ACIEA a été reçue en audience par Son Excellence l’Ambassadeur du Royaume d’Arabie saoudite au Burkina Faso.

Cette rencontre officielle a permis à l’Alliance de présenter sa vision, ses missions et ses activités, et d’échanger sur les perspectives de coopération autour des enjeux climatiques, de la salubrité, de la préservation écologique et de l’innovation environnementale.

Les deux parties ont exprimé leur volonté de bâtir des partenariats en faveur du développement durable et de la résilience climatique au Burkina Faso.`,
      en: `On Tuesday 6 May 2025, ACIEA was received by His Excellency the Ambassador of the Kingdom of Saudi Arabia to Burkina Faso.

The official meeting enabled the Alliance to present its vision, missions and activities, and to discuss cooperation prospects on climate issues, sanitation, ecological preservation and environmental innovation.

Both parties expressed their wish to build partnerships for sustainable development and climate resilience in Burkina Faso.`,
    },
    sourceUrl: FB_URL,
  },
  {
    slug: 'audience-ambassade-bresil',
    publishedAt: '2025-05-01T12:00:00.000Z',
    category: 'institutional',
    cover: 'bresil',
    draft: true,
    reviewNote: 'Publication Facebook tronquée : date et contenu à confirmer avant publication.',
    title: {
      fr: 'Climat, jeunesse et innovation : l’ACIEA reçue par l’Ambassade du Brésil',
      en: 'Climate, youth and innovation: ACIEA received by the Embassy of Brazil',
    },
    excerpt: {
      fr: 'Brouillon — date et contenu à confirmer.',
      en: 'Draft — date and content to be confirmed.',
    },
    content: {
      fr: 'Contenu à compléter à partir de la publication officielle.',
      en: 'Content to be completed from the official post.',
    },
    sourceUrl: FB_URL,
  },
  {
    slug: 'journee-nationale-de-l-arbre-2025',
    publishedAt: '2025-08-01T12:00:00.000Z',
    category: 'field',
    cover: 'arbre',
    draft: true,
    reviewNote:
      'Vidéo « Journée nationale de l’arbre 2025 » publiée sur Facebook : date, lieu et contenu à confirmer.',
    title: { fr: 'Journée nationale de l’arbre 2025', en: 'National Tree Day 2025' },
    excerpt: {
      fr: 'Brouillon — date, lieu et contenu à confirmer.',
      en: 'Draft — date, place and content to be confirmed.',
    },
    content: { fr: 'Contenu à compléter.', en: 'Content to be completed.' },
    sourceUrl: FB_URL,
  },
]

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export const PROJECTS = {
  saagdo: {
    slug: 'saagdo',
    status: 'ongoing' as const,
    domains: ['eau-assainissement', 'innovation-numerique-ia'],
    scope: 'regional' as const,
    title: {
      fr: 'SAAGDO — surveillance environnementale et prévention des pollutions liées à l’eau',
      en: 'SAAGDO — environmental monitoring and prevention of water-related pollution',
    },
    excerpt: {
      fr: 'Une solution numérique associant application mobile et plateforme de gestion pour la surveillance environnementale, la cartographie participative et l’anticipation des risques de pollution liés à l’eau et à l’assainissement.',
      en: 'A digital solution combining a mobile app and a management platform for environmental monitoring, participatory mapping and the anticipation of water- and sanitation-related pollution risks.',
    },
    context: {
      fr: `La pollution des ressources en eau et les défaillances d’assainissement représentent des enjeux majeurs de santé publique et d’environnement. Les informations disponibles sont souvent dispersées, ce qui complique l’anticipation et la décision.

SAAGDO a été conçue pour répondre à ce besoin en combinant contribution citoyenne, données environnementales et outils d’analyse. Son déploiement est au cœur du protocole d’accord signé avec le GWP Afrique de l’Ouest le 3 juillet 2026.`,
      en: `Water resource pollution and sanitation failures are major public health and environmental challenges. Available information is often scattered, making anticipation and decision-making harder.

SAAGDO was designed to meet this need by combining citizen contributions, environmental data and analysis tools. Its deployment is at the heart of the Memorandum of Understanding signed with GWP West Africa on 3 July 2026.`,
    },
    objectives: {
      fr: [
        'Renforcer la surveillance environnementale',
        'Développer la cartographie citoyenne',
        'Anticiper les risques de pollution liés à l’eau et à l’assainissement',
      ],
      en: [
        'Strengthen environmental monitoring',
        'Develop citizen mapping',
        'Anticipate water- and sanitation-related pollution risks',
      ],
    },
    activities: {
      fr: [
        {
          title: 'Application mobile',
          description: 'Outil de contribution et de collecte d’informations.',
        },
        {
          title: 'Plateforme de gestion',
          description: 'Centralisation, traitement et visualisation des données.',
        },
      ],
      en: [
        {
          title: 'Mobile application',
          description: 'Tool for contributing and collecting information.',
        },
        {
          title: 'Management platform',
          description: 'Centralising, processing and visualising data.',
        },
      ],
    },
    achievements: {
      fr: [
        {
          text: 'Protocole d’accord signé avec le GWP Afrique de l’Ouest le 3 juillet 2026',
          verified: true,
          sourceUrl: GWP_URL,
        },
      ],
      en: [
        {
          text: 'Memorandum of Understanding signed with GWP West Africa on 3 July 2026',
          verified: true,
          sourceUrl: GWP_URL,
        },
      ],
    },
    audience: {
      fr: 'Communautés, collectivités, services techniques et acteurs de l’eau et de l’assainissement.',
      en: 'Communities, local authorities, technical services and water and sanitation stakeholders.',
    },
  },
  camp: {
    slug: 'camp-vacances-eco-citoyen-komsilga-2025',
    status: 'completed' as const,
    domains: ['education-engagement', 'biodiversite', 'climat-resilience'],
    scope: 'local' as const,
    locality: 'Komsilga',
    startDate: '2025-09-02T08:00:00.000Z',
    endDate: '2025-09-08T18:00:00.000Z',
    title: { fr: 'Camp Vacances Éco-Citoyen 2025', en: 'Eco-Citizen Holiday Camp 2025' },
    excerpt: {
      fr: 'Sept jours de formation et d’action à Komsilga pour outiller les jeunes : agriculture hors-sol, recyclage des pneus usagés, éco-citoyenneté et reboisement.',
      en: 'Seven days of training and action in Komsilga to equip young people: soilless farming, recycling used tyres, eco-citizenship and tree planting.',
    },
    context: {
      fr: `Face aux défis climatiques et de sécurité alimentaire, l’ACIEA a réuni des jeunes autour d’un camp mêlant formation, action et engagement citoyen, du 2 au 8 septembre 2025, dans la commune de Komsilga.

Le camp a voulu montrer qu’avec peu de moyens mais beaucoup de volonté, il est possible d’apporter des solutions locales aux défis globaux.`,
      en: `In response to climate and food security challenges, ACIEA brought young people together for a camp combining training, action and civic engagement, from 2 to 8 September 2025, in the municipality of Komsilga.

The camp set out to show that with few resources but strong commitment, local solutions to global challenges are possible.`,
    },
    objectives: {
      fr: [
        'Outiller les jeunes avec des solutions pratiques',
        'Promouvoir l’éco-citoyenneté',
        'Agir concrètement pour la nature',
      ],
      en: [
        'Equip young people with practical solutions',
        'Promote eco-citizenship',
        'Take concrete action for nature',
      ],
    },
    activities: {
      fr: [
        {
          title: 'Agriculture hors-sol',
          description:
            'Alternative innovante face aux défis de la sécurité alimentaire et du changement climatique.',
        },
        {
          title: 'Recyclage des pneus usagés',
          description: 'Transformer les déchets en ressources utiles pour réduire la pollution.',
        },
        {
          title: 'Éco-citoyenneté',
          description:
            'Comprendre son rôle et ses responsabilités dans la construction d’un avenir durable.',
        },
        { title: 'Reboisement', description: 'Action de terrain menée par les participants.' },
      ],
      en: [
        {
          title: 'Soilless farming',
          description: 'An innovative response to food security and climate challenges.',
        },
        {
          title: 'Recycling used tyres',
          description: 'Turning waste into useful resources to reduce pollution.',
        },
        {
          title: 'Eco-citizenship',
          description:
            'Understanding one’s role and responsibilities in building a sustainable future.',
        },
        { title: 'Tree planting', description: 'Field action carried out by participants.' },
      ],
    },
    // Dates, place and activities are already on the page: no separate achievement line.
    achievements: { fr: [], en: [] },
    audience: { fr: 'Jeunes.', en: 'Young people.' },
  },
}

/* ------------------------------------------------------------------ */
/* Pages (globals)                                                     */
/* ------------------------------------------------------------------ */

export const HOMEPAGE = {
  hero: {
    eyebrow: {
      fr: 'Alliance for Climate Innovation and Ecological Action',
      en: 'Alliance for Climate Innovation and Ecological Action',
    },
    title: {
      fr: 'Innover pour le climat. Agir pour un avenir durable.',
      en: 'Innovating for the climate. Acting for a sustainable future.',
    },
    subtitle: {
      fr: 'Basée à Ouagadougou, l’ACIEA est une organisation à but non lucratif qui réunit innovation, science et engagement citoyen pour protéger l’environnement et renforcer la résilience climatique au Burkina Faso et en Afrique de l’Ouest.',
      en: 'Based in Ouagadougou, ACIEA is a non-profit organisation bringing together innovation, science and civic engagement to protect the environment and strengthen climate resilience in Burkina Faso and West Africa.',
    },
  },
  intro: {
    eyebrow: { fr: 'Qui sommes-nous', en: 'Who we are' },
    title: {
      fr: 'Une alliance tournée vers les solutions',
      en: 'An alliance focused on solutions',
    },
    text: {
      fr: 'Face à l’urgence climatique et à la dégradation des écosystèmes, l’ACIEA a fait le choix de l’action. Créée en 2024, l’Alliance rassemble des jeunes engagés, des profils scientifiques et techniques et des acteurs de terrain.\n\nNotre conviction : l’innovation, la donnée et l’engagement collectif permettent de concevoir des solutions durables, adaptées aux réalités locales.',
      en: 'Faced with the climate emergency and ecosystem degradation, ACIEA has chosen action. Founded in 2024, the Alliance brings together committed young people, scientific and technical profiles and field actors.\n\nOur conviction: innovation, data and collective engagement make it possible to design sustainable solutions suited to local realities.',
    },
    mission: {
      fr: 'Promouvoir des solutions innovantes, durables et adaptées aux réalités locales face aux défis environnementaux, en renforçant les capacités des communautés et l’engagement citoyen.',
      en: 'Promoting innovative, sustainable solutions adapted to local realities in the face of environmental challenges, by strengthening community capacity and civic engagement.',
    },
  },
  saagdo: {
    title: {
      fr: 'SAAGDO — Surveiller l’eau, prévenir les pollutions.',
      en: 'SAAGDO — Monitoring water, preventing pollution.',
    },
    text: {
      fr: 'Une application mobile et une plateforme de gestion pour renforcer la surveillance environnementale, la cartographie citoyenne et l’anticipation des risques de pollution liés à l’eau et à l’assainissement.',
      en: 'A mobile application and a management platform to strengthen environmental monitoring, citizen mapping and the anticipation of water- and sanitation-related pollution risks.',
    },
  },
  cta: {
    title: {
      fr: 'Construisons ensemble des solutions durables pour les générations futures.',
      en: 'Let’s build sustainable solutions together for future generations.',
    },
    text: {
      fr: 'Institutions, bailleurs, universités, entreprises et organisations communautaires : rejoignez une dynamique d’innovation au service du climat.',
      en: 'Institutions, donors, universities, companies and community organisations: join a drive for innovation in the service of the climate.',
    },
  },
}

export const ABOUT = {
  hero: {
    eyebrow: { fr: 'À propos', en: 'About' },
    title: {
      fr: 'Une alliance de jeunes engagés pour l’innovation climatique',
      en: 'An alliance of committed young people for climate innovation',
    },
    subtitle: {
      fr: 'L’ACIEA conjugue innovation, science et action de terrain pour relever les défis environnementaux du Burkina Faso et de l’Afrique de l’Ouest.',
      en: 'ACIEA combines innovation, science and field action to tackle environmental challenges in Burkina Faso and West Africa.',
    },
  },
  presentation: {
    fr: `Organisation à but non lucratif, l’ACIEA porte haut les valeurs de l’écologie, de l’innovation, de la salubrité et de l’énergie durable. Ses actions couvrent la lutte contre le changement climatique et l’adaptation, la gestion durable de l’eau, la protection de la biodiversité, l’innovation numérique, la recherche et l’éducation environnementale.

Elle œuvre aux côtés de partenaires nationaux et internationaux pour la protection de l’environnement et l’amélioration des conditions de vie des populations.`,
    en: `A non-profit organisation, ACIEA upholds the values of ecology, innovation, sanitation and sustainable energy. Its work covers climate change mitigation and adaptation, sustainable water management, biodiversity protection, digital innovation, research and environmental education.

It works alongside national and international partners to protect the environment and improve people’s living conditions.`,
  },
  historyIntro: {
    fr: 'L’ACIEA multiplie les échanges avec les institutions nationales, les collectivités et les partenaires internationaux, tout en menant des actions de terrain auprès des jeunes.',
    en: 'ACIEA engages with national institutions, local authorities and international partners while carrying out field actions with young people.',
  },
  milestones: [
    {
      date: '2024-06-30T12:00:00.000Z',
      precision: 'year',
      title: { fr: 'Création de l’ACIEA à Ouagadougou', en: 'ACIEA founded in Ouagadougou' },
      sourceUrl: LINKEDIN_URL,
    },
    {
      date: '2025-05-06T12:00:00.000Z',
      precision: 'day',
      title: {
        fr: 'Audience à l’Ambassade du Royaume d’Arabie saoudite',
        en: 'Meeting at the Embassy of Saudi Arabia',
      },
      sourceUrl: FB_URL,
    },
    {
      date: '2025-05-20T12:00:00.000Z',
      precision: 'day',
      title: {
        fr: 'Échange avec l’Ambassade du Royaume des Pays-Bas',
        en: 'Exchange with the Embassy of the Netherlands',
      },
      sourceUrl: FB_URL,
    },
    {
      date: '2025-05-30T12:00:00.000Z',
      precision: 'day',
      title: { fr: 'Rencontre avec le SP/CNDD', en: 'Meeting with SP/CNDD' },
      sourceUrl: FB_URL,
    },
    {
      date: '2025-07-08T12:00:00.000Z',
      precision: 'day',
      title: {
        fr: 'Rencontre avec le Ministère de l’Environnement, de l’Eau et de l’Assainissement',
        en: 'Meeting with the Ministry of Environment, Water and Sanitation',
      },
      sourceUrl: FB_URL,
    },
    {
      date: '2025-07-22T12:00:00.000Z',
      precision: 'day',
      title: {
        fr: 'Rencontre avec la Mairie centrale de Ouagadougou',
        en: 'Meeting with Ouagadougou central town hall',
      },
      sourceUrl: FB_URL,
    },
    {
      date: '2025-09-02T12:00:00.000Z',
      precision: 'day',
      title: {
        fr: 'Camp Vacances Éco-Citoyen à Komsilga (2–8 septembre)',
        en: 'Eco-Citizen Holiday Camp in Komsilga (2–8 September)',
      },
      sourceUrl: FB_URL,
    },
    {
      date: '2026-07-03T12:00:00.000Z',
      precision: 'day',
      title: {
        fr: 'Protocole d’accord avec le GWP Afrique de l’Ouest',
        en: 'Memorandum of Understanding with GWP West Africa',
      },
      description: {
        fr: 'Partenariat pour la gestion durable de l’eau, la résilience climatique et l’innovation numérique, autour de SAAGDO.',
        en: 'Partnership on sustainable water management, climate resilience and digital innovation, centred on SAAGDO.',
      },
      sourceUrl: GWP_URL,
    },
  ],
  mission: {
    fr: 'Promouvoir des solutions innovantes, durables et adaptées aux réalités locales face aux défis environnementaux et climatiques, en renforçant les capacités des communautés et l’engagement citoyen, en particulier des jeunes et des femmes.',
    en: 'To promote innovative, sustainable solutions adapted to local realities in the face of environmental and climate challenges, by strengthening community capacity and civic engagement, particularly among young people and women.',
  },
  vision: {
    fr: 'Une transformation durable portée par l’innovation écologique, au service des communautés et de la planète, pour un Burkina Faso prospère, écologique et solidaire.',
    en: 'A sustainable transformation driven by ecological innovation, serving communities and the planet, for a prosperous, ecological and united Burkina Faso.',
  },
  values: [
    {
      icon: 'leaf',
      title: { fr: 'Écologie', en: 'Ecology' },
      description: {
        fr: 'Protéger les écosystèmes et les ressources naturelles dont dépendent les populations.',
        en: 'Protecting the ecosystems and natural resources people depend on.',
      },
    },
    {
      icon: 'lightbulb',
      title: { fr: 'Innovation', en: 'Innovation' },
      description: {
        fr: 'Mobiliser la créativité, la science et le numérique pour des solutions nouvelles.',
        en: 'Harnessing creativity, science and digital tools for new solutions.',
      },
    },
    {
      icon: 'recycle',
      title: { fr: 'Salubrité', en: 'Sanitation' },
      description: {
        fr: 'Promouvoir un cadre de vie sain, la gestion des déchets et l’assainissement.',
        en: 'Promoting healthy living environments, waste management and sanitation.',
      },
    },
    {
      icon: 'sun',
      title: { fr: 'Énergie durable', en: 'Sustainable energy' },
      description: {
        fr: 'Encourager des choix énergétiques sobres et respectueux de l’environnement.',
        en: 'Encouraging energy choices that are efficient and environmentally friendly.',
      },
    },
  ],
  commitments: {
    fr: [
      'Renforcement des capacités communautaires',
      'Sensibilisation citoyenne',
      'Projets écologiques participatifs',
      'Soutien à l’entrepreneuriat vert, en particulier des jeunes et des femmes',
    ],
    en: [
      'Community capacity building',
      'Civic awareness-raising',
      'Participatory ecological projects',
      'Support for green entrepreneurship, particularly among young people and women',
    ],
  },
  governance: {
    fr: `L’ACIEA est une organisation à but non lucratif dirigée par ses instances statutaires.

La composition détaillée des instances (assemblée générale, bureau exécutif) ainsi que les statuts et rapports d’activité seront publiés sur cette page après validation par l’Alliance.`,
    en: `ACIEA is a non-profit organisation governed by its statutory bodies.

The detailed composition of its bodies (general assembly, executive office) as well as its statutes and activity reports will be published on this page once approved by the Alliance.`,
  },
}

export const SAAGDO = {
  hero: {
    eyebrow: { fr: 'Plateforme numérique environnementale', en: 'Environmental digital platform' },
    title: {
      fr: 'SAAGDO : mettre la donnée environnementale au service de l’action.',
      en: 'SAAGDO: putting environmental data to work for action.',
    },
    subtitle: {
      fr: 'SAAGDO associe une application mobile et une plateforme de gestion pour renforcer la surveillance environnementale, la cartographie citoyenne et l’anticipation des risques de pollution liés à l’eau et à l’assainissement.',
      en: 'SAAGDO combines a mobile application and a management platform to strengthen environmental monitoring, citizen mapping and the anticipation of water- and sanitation-related pollution risks.',
    },
  },
  problemIntro: {
    fr: 'Prévenir les pollutions liées à l’eau et à l’assainissement suppose de disposer d’informations fiables, à jour et partagées. Plusieurs obstacles freinent aujourd’hui l’action.',
    en: 'Preventing water- and sanitation-related pollution requires reliable, up-to-date and shared information. Several obstacles currently hold back action.',
  },
  problems: [
    {
      icon: 'droplets',
      title: { fr: 'Pollution des ressources en eau', en: 'Water resource pollution' },
      description: {
        fr: 'Rejets, dépôts de déchets et défaillances d’assainissement menacent la qualité de l’eau.',
        en: 'Discharges, waste dumping and sanitation failures threaten water quality.',
      },
    },
    {
      icon: 'map',
      title: { fr: 'Collecte d’informations', en: 'Information collection' },
      description: {
        fr: 'Les observations de terrain sont dispersées et rarement consolidées.',
        en: 'Field observations are scattered and rarely consolidated.',
      },
    },
    {
      icon: 'eye',
      title: { fr: 'Surveillance environnementale', en: 'Environmental monitoring' },
      description: {
        fr: 'Un suivi régulier des sites sensibles est difficile à organiser.',
        en: 'Regular monitoring of sensitive sites is hard to organise.',
      },
    },
    {
      icon: 'globe',
      title: { fr: 'Accès aux données', en: 'Data access' },
      description: {
        fr: 'Les données utiles restent souvent peu accessibles aux acteurs concernés.',
        en: 'Useful data often remains hard to access for stakeholders.',
      },
    },
    {
      icon: 'users',
      title: { fr: 'Participation des communautés', en: 'Community participation' },
      description: {
        fr: 'Les citoyens manquent d’outils simples pour signaler et suivre les problèmes.',
        en: 'Citizens lack simple tools to report and follow up on issues.',
      },
    },
    {
      icon: 'scale',
      title: { fr: 'Aide à la décision', en: 'Decision support' },
      description: {
        fr: 'Les décideurs ont besoin d’informations synthétiques pour anticiper.',
        en: 'Decision-makers need synthesised information to anticipate.',
      },
    },
  ],
  // Features as shown in the team's presentation video and the app/platform screenshots.
  solutionIntro: {
    fr: 'Une application pour les citoyens, une plateforme pour ceux qui agissent sur le terrain.',
    en: 'An app for citizens, a platform for those who act on the ground.',
  },
  components: [
    {
      icon: 'megaphone',
      title: { fr: 'Signaler un déchet', en: 'Report waste' },
      description: {
        fr: 'Le citoyen prend en photo un dépôt de déchets et le signale en quelques secondes depuis l’application.',
        en: 'Citizens photograph a waste dump and report it in seconds from the app.',
      },
    },
    {
      icon: 'shield-check',
      title: { fr: 'Brigade LAABAL', en: 'LAABAL brigade' },
      description: {
        fr: 'Un signalement anonyme, adressé directement à la brigade LAABAL.',
        en: 'An anonymous report, sent straight to the LAABAL brigade.',
      },
    },
    {
      icon: 'recycle',
      title: { fr: 'Transmission et suivi', en: 'Routing and follow-up' },
      description: {
        fr: 'Chaque signalement est transmis à la mairie ou à la brigade LAABAL, puis suivi jusqu’au nettoyage : en attente, en cours, terminé.',
        en: 'Each report is sent to the town hall or the LAABAL brigade, then followed until clean-up: pending, in progress, done.',
      },
    },
    {
      icon: 'map',
      title: { fr: 'Toilettes publiques', en: 'Public toilets' },
      description: {
        fr: 'Une carte des toilettes publiques disponibles à Ouagadougou.',
        en: 'A map of the public toilets available in Ouagadougou.',
      },
    },
    {
      icon: 'line-chart',
      title: { fr: 'Tableau de bord', en: 'Dashboard' },
      description: {
        fr: 'Pour les gestionnaires : carte des signalements, statistiques et gestion des utilisateurs.',
        en: 'For managers: report map, statistics and user management.',
      },
    },
    {
      icon: 'users',
      title: { fr: 'Concours citoyen', en: 'Citizen challenge' },
      description: {
        fr: 'Un classement des utilisateurs les plus actifs et un concours fondé sur des actions réelles.',
        en: 'A ranking of the most active users and a challenge based on real actions.',
      },
    },
  ],
  flow: [
    {
      icon: 'users',
      title: { fr: 'Contribution terrain', en: 'Field contribution' },
      description: {
        fr: 'Citoyens et agents signalent une observation via l’application mobile.',
        en: 'Citizens and field agents report an observation via the mobile app.',
      },
    },
    {
      icon: 'satellite',
      title: { fr: 'Collecte des données', en: 'Data collection' },
      description: {
        fr: 'Les observations sont regroupées sur la plateforme de gestion.',
        en: 'Observations are gathered on the management platform.',
      },
    },
    {
      icon: 'brain-circuit',
      title: { fr: 'Traitement et analyse', en: 'Processing and analysis' },
      description: {
        fr: 'Les informations sont structurées et analysées pour identifier des risques.',
        en: 'Information is structured and analysed to identify risks.',
      },
    },
    {
      icon: 'map',
      title: { fr: 'Cartographie', en: 'Mapping' },
      description: {
        fr: 'Les résultats sont restitués sur des cartes lisibles.',
        en: 'Results are presented on readable maps.',
      },
    },
    {
      icon: 'scale',
      title: { fr: 'Aide à la décision', en: 'Decision support' },
      description: {
        fr: 'Les acteurs disposent d’informations utiles pour agir et anticiper.',
        en: 'Stakeholders get useful information to act and anticipate.',
      },
    },
  ],
  partnershipText: {
    fr: 'Le 3 juillet 2026, l’ACIEA et le Global Water Partnership Afrique de l’Ouest (GWP-AO) ont signé, au Secrétariat du GWP-AO à Ouagadougou, un protocole d’accord portant sur la gestion durable des ressources en eau, la résilience climatique et l’innovation numérique. Le déploiement de SAAGDO est au cœur de ce partenariat.',
    en: 'On 3 July 2026, ACIEA and the Global Water Partnership West Africa (GWP-WA) signed, at the GWP-WA Secretariat in Ouagadougou, a Memorandum of Understanding on sustainable water resource management, climate resilience and digital innovation. The deployment of SAAGDO is at the heart of this partnership.',
  },
}

/** `retired` entries repeated the page they sit on: the seed removes them (order stays stable). */
export const FAQS: {
  scope: 'saagdo' | 'partners' | 'general'
  q: L
  a: L
  retired?: boolean
}[] = [
  {
    scope: 'saagdo',
    retired: true,
    q: { fr: 'Qu’est-ce que SAAGDO ?', en: 'What is SAAGDO?' },
    a: {
      fr: 'SAAGDO est une solution numérique portée par l’ACIEA, associant une application mobile et une plateforme de gestion. Elle vise à renforcer la surveillance environnementale, la cartographie citoyenne et l’anticipation des risques de pollution liés à l’eau et à l’assainissement.',
      en: 'SAAGDO is a digital solution led by ACIEA, combining a mobile application and a management platform. It aims to strengthen environmental monitoring, citizen mapping and the anticipation of water- and sanitation-related pollution risks.',
    },
  },
  {
    scope: 'saagdo',
    retired: true,
    q: {
      fr: 'La démonstration de cette page utilise-t-elle des données réelles ?',
      en: 'Does the demo on this page use real data?',
    },
    a: {
      fr: 'Non. Toutes les valeurs, points et signalements affichés dans la démonstration sont fictifs et générés pour illustrer le fonctionnement de l’interface. Ils ne proviennent d’aucune collecte réelle.',
      en: 'No. All values, points and reports shown in the demo are fictitious and generated to illustrate how the interface works. They do not come from any real data collection.',
    },
  },
  {
    scope: 'saagdo',
    q: {
      fr: 'Comment accéder à la plateforme SAAGDO ?',
      en: 'How can I access the SAAGDO platform?',
    },
    a: {
      fr: 'La plateforme opérationnelle n’est pas accessible depuis ce site pour le moment. Le lien officiel sera publié ici dès qu’il sera disponible. Pour toute demande, utilisez le formulaire de collaboration.',
      en: 'The operational platform is not accessible from this website yet. The official link will be published here as soon as it is available. For any request, please use the collaboration form.',
    },
  },
  {
    scope: 'saagdo',
    q: {
      fr: 'Quel est le rôle du GWP Afrique de l’Ouest ?',
      en: 'What is GWP West Africa’s role?',
    },
    a: {
      fr: 'Le GWP Afrique de l’Ouest et l’ACIEA ont signé un protocole d’accord le 3 juillet 2026 portant sur la gestion durable des ressources en eau, la résilience climatique et l’innovation numérique, dont le déploiement de SAAGDO est l’élément central.',
      en: 'GWP West Africa and ACIEA signed a Memorandum of Understanding on 3 July 2026 on sustainable water management, climate resilience and digital innovation, with the deployment of SAAGDO at its core.',
    },
  },
  {
    scope: 'saagdo',
    q: { fr: 'Comment collaborer autour de SAAGDO ?', en: 'How can I collaborate on SAAGDO?' },
    a: {
      fr: 'Collectivités, services techniques, chercheurs ou partenaires techniques et financiers peuvent présenter leur projet via le formulaire « Devenir partenaire » en choisissant le type de collaboration « Autour de SAAGDO ».',
      en: 'Local authorities, technical services, researchers or technical and financial partners can present their project through the “Become a partner” form, selecting “Around SAAGDO” as the collaboration type.',
    },
  },
  {
    scope: 'partners',
    q: {
      fr: 'Quels types de partenariats l’ACIEA recherche-t-elle ?',
      en: 'What kinds of partnerships does ACIEA seek?',
    },
    a: {
      fr: 'Institutionnels, techniques, scientifiques, technologiques, communautaires ou financiers : toute coopération cohérente avec nos domaines d’intervention peut être étudiée.',
      en: 'Institutional, technical, scientific, technological, community or financial: any cooperation consistent with our focus areas can be considered.',
    },
  },
  {
    scope: 'partners',
    q: { fr: 'Comment proposer un partenariat ?', en: 'How do I propose a partnership?' },
    a: {
      fr: 'Remplissez le formulaire de proposition en présentant votre organisation, le type de collaboration envisagé et votre projet. Vous pouvez joindre un document de présentation (PDF ou DOCX, 5 Mo maximum).',
      en: 'Fill in the proposal form describing your organisation, the type of collaboration envisaged and your project. You may attach a presentation document (PDF or DOCX, 5 MB max.).',
    },
  },
  {
    scope: 'partners',
    q: {
      fr: 'Que deviennent les informations transmises ?',
      en: 'What happens to the information I send?',
    },
    a: {
      fr: 'Elles sont enregistrées de façon sécurisée et consultées uniquement par les administrateurs habilités de l’ACIEA, pour la durée de conservation indiquée dans la politique de confidentialité.',
      en: 'It is stored securely and only accessed by authorised ACIEA administrators, for the retention period stated in the privacy policy.',
    },
  },
]

export const PAGES: { slug: string; title: L; intro: L; content: L }[] = [
  {
    slug: 'legal',
    title: { fr: 'Mentions légales', en: 'Legal notice' },
    intro: {
      fr: 'Informations légales relatives au site de l’ACIEA.',
      en: 'Legal information about the ACIEA website.',
    },
    content: {
      fr: `## Éditeur du site

**ACIEA — Alliance for Climate Innovation and Ecological Action** (Alliance pour l’innovation climatique et l’action écologique), organisation à but non lucratif.

Siège : Ouagadougou, Burkina Faso.

Contact : aciea662@gmail.com — +226 73 42 14 75.

## Hébergement

Hébergeur : *à compléter lors de la mise en production (raison sociale, adresse, contact)*.

## Propriété intellectuelle

Les contenus du site (textes, photographies, logos, documents) sont la propriété de l’ACIEA ou de leurs auteurs respectifs. Toute reproduction sans autorisation préalable est interdite, sauf mention contraire.

Les logos des partenaires sont la propriété de leurs titulaires respectifs.

## Responsabilité

L’ACIEA s’efforce de publier des informations exactes et vérifiées. Les contenus signalés comme illustratifs ou fictifs (notamment la démonstration SAAGDO) ne constituent pas des données réelles.`,
      en: `## Publisher

**ACIEA — Alliance for Climate Innovation and Ecological Action**, a non-profit organisation.

Headquarters: Ouagadougou, Burkina Faso.

Contact: aciea662@gmail.com — +226 73 42 14 75.

## Hosting

Hosting provider: *to be completed at go-live (company name, address, contact)*.

## Intellectual property

Website content (texts, photographs, logos, documents) belongs to ACIEA or its respective authors. Any reproduction without prior permission is prohibited unless otherwise stated.

Partner logos are the property of their respective owners.

## Liability

ACIEA strives to publish accurate, verified information. Content labelled as illustrative or fictitious (including the SAAGDO demo) does not constitute real data.`,
    },
  },
  {
    slug: 'privacy',
    title: { fr: 'Politique de confidentialité', en: 'Privacy policy' },
    intro: {
      fr: 'Comment l’ACIEA collecte, utilise et protège vos données personnelles.',
      en: 'How ACIEA collects, uses and protects your personal data.',
    },
    content: {
      fr: `## Responsable du traitement

L’ACIEA, organisation à but non lucratif basée à Ouagadougou (Burkina Faso), est responsable des traitements de données réalisés via ce site.

## Données collectées

- **Formulaire de contact** : nom, email, organisation (facultatif), objet, message.
- **Demande de partenariat** : nom, organisation, fonction, email professionnel, téléphone (facultatif), pays, type de collaboration, objet, message, pièce jointe éventuelle.
- **Lettre d’information** : adresse email et date de consentement.

Aucune adresse IP n’est conservée en clair : une empreinte chiffrée temporaire est utilisée uniquement pour limiter les envois abusifs.

## Finalités et base légale

Les données sont utilisées pour répondre à vos demandes, étudier les propositions de collaboration et, si vous y avez consenti, vous adresser la lettre d’information. Le traitement repose sur votre consentement, recueilli dans chaque formulaire.

## Destinataires

Les données sont accessibles uniquement aux administrateurs habilités de l’ACIEA. Elles ne sont ni vendues ni cédées à des tiers.

## Durée de conservation

Les messages et demandes sont supprimés automatiquement à l’issue de la durée configurée par l’ACIEA (24 mois par défaut). Vous pouvez vous désinscrire de la lettre d’information à tout moment.

## Cookies

Le site n’utilise pas de cookies publicitaires ni de traceurs de mesure d’audience. Seuls des cookies techniques sont utilisés : mémorisation de la langue et session sécurisée de l’espace d’administration.

## Vos droits

Vous pouvez demander l’accès, la rectification ou la suppression de vos données, ou retirer votre consentement, en écrivant à l’ACIEA via la page Contact.

*Cette politique doit être validée par l’ACIEA au regard de la réglementation applicable au Burkina Faso en matière de protection des données personnelles.*`,
      en: `## Data controller

ACIEA, a non-profit organisation based in Ouagadougou (Burkina Faso), is responsible for the data processing carried out through this website.

## Data collected

- **Contact form**: name, email, organisation (optional), subject, message.
- **Partnership request**: name, organisation, position, professional email, phone (optional), country, collaboration type, subject, message, optional attachment.
- **Newsletter**: email address and date of consent.

No IP address is stored in clear: a temporary hashed fingerprint is used solely to limit abusive submissions.

## Purposes and legal basis

Data is used to respond to your requests, review collaboration proposals and, if you have consented, send you the newsletter. Processing is based on your consent, collected in each form.

## Recipients

Data is only accessible to authorised ACIEA administrators. It is neither sold nor transferred to third parties.

## Retention

Messages and requests are automatically deleted after the period configured by ACIEA (24 months by default). You can unsubscribe from the newsletter at any time.

## Cookies

The website uses no advertising cookies or audience-measurement trackers. Only technical cookies are used: language preference and secure admin session.

## Your rights

You may request access, rectification or deletion of your data, or withdraw your consent, by writing to ACIEA via the Contact page.

*This policy must be validated by ACIEA against the personal data protection rules applicable in Burkina Faso.*`,
    },
  },
  {
    slug: 'terms',
    title: { fr: 'Conditions d’utilisation', en: 'Terms of use' },
    intro: {
      fr: 'Règles d’utilisation du site de l’ACIEA.',
      en: 'Rules for using the ACIEA website.',
    },
    content: {
      fr: `## Objet

Les présentes conditions encadrent l’utilisation du site de l’ACIEA. En naviguant sur le site, vous les acceptez.

## Utilisation des formulaires

Les formulaires doivent être utilisés de bonne foi. Tout envoi abusif, automatisé ou contenant des éléments malveillants est interdit et peut être bloqué.

## Documents téléchargeables

Les publications mises à disposition le sont pour un usage d’information. Leur réutilisation doit mentionner la source.

## Liens externes

Le site peut renvoyer vers des sites tiers dont l’ACIEA ne maîtrise pas le contenu.

## Évolution

L’ACIEA peut modifier ces conditions à tout moment. *Document à valider par l’ACIEA.*`,
      en: `## Purpose

These terms govern use of the ACIEA website. By browsing the site, you accept them.

## Use of forms

Forms must be used in good faith. Any abusive, automated or malicious submission is prohibited and may be blocked.

## Downloadable documents

Publications are provided for information purposes. Reuse must cite the source.

## External links

The website may link to third-party sites whose content ACIEA does not control.

## Changes

ACIEA may amend these terms at any time. *Document to be validated by ACIEA.*`,
    },
  },
]

/* ------------------------------------------------------------------ */
/* Additions (second pass): team portraits, documented counts, extra  */
/* items drawn from the photos supplied in the repository.            */
/* ------------------------------------------------------------------ */

/**
 * Portraits supplied by ACIEA. Names come from the file names (often a first
 * name or surname only); positions are not documented and are shown generically.
 * Full names, roles and consent must be confirmed in the admin (review note set).
 */
/**
 * Executive office shown on the team page. Names, roles and consent to
 * publication confirmed by ACIEA on 22/10/2026. `file` is a portrait in
 * assets/source/photos (a neutral placeholder shows when omitted).
 */
export const TEAM: {
  name: string
  position: { fr: string; en: string }
  file?: string
  /** Focal point (%) on the face, used by round crops such as the message signature. */
  focal?: { x: number; y: number }
}[] = [
  {
    name: 'ILBOUDO Dieudonné',
    position: { fr: 'Président', en: 'President' },
    file: 'president-ilboudo-dieudonne.jpg',
    focal: { x: 55, y: 5 },
  },
  {
    name: 'SAMBORE Daho Nadia Doriane Leslie',
    position: { fr: 'Vice-présidente', en: 'Vice-President' },
    file: 'vice-presidente-sambore-doriane.jpg',
  },
  {
    name: 'TASSEMBEDO Fonzia',
    position: { fr: 'Secrétaire générale', en: 'Secretary General' },
    file: 'secretariat-tassembedo-fonzia.jpg',
  },
]

/** Counts derived only from the documented sources above (no estimate). */
export const METRICS = [
  {
    icon: 'handshake',
    value: 1,
    label: {
      fr: 'Partenariat formalisé par protocole d’accord',
      en: 'Partnership formalised by MoU',
    },
    period: { fr: 'GWP Afrique de l’Ouest, juillet 2026', en: 'GWP West Africa, July 2026' },
    sourceUrl: GWP_URL,
  },
  {
    icon: 'globe',
    value: 5,
    label: {
      fr: 'Rencontres institutionnelles documentées',
      en: 'Documented institutional meetings',
    },
    period: { fr: 'Mai – juillet 2025', en: 'May – July 2025' },
    sourceUrl: FB_URL,
  },
  {
    icon: 'graduation-cap',
    value: 7,
    label: {
      fr: 'Jours de formation et d’action au Camp Éco-Citoyen',
      en: 'Days of training and action at the Eco-Citizen Camp',
    },
    period: { fr: 'Komsilga, septembre 2025', en: 'Komsilga, September 2025' },
    sourceUrl: FB_URL,
  },
  {
    icon: 'sprout',
    value: 3,
    label: {
      fr: 'Ateliers pratiques proposés aux jeunes',
      en: 'Hands-on workshops offered to young people',
    },
    period: {
      fr: 'Hors-sol, recyclage des pneus, éco-citoyenneté',
      en: 'Soilless farming, tyre recycling, eco-citizenship',
    },
    sourceUrl: FB_URL,
  },
]

export const REFORESTATION = {
  slug: 'reboisement-journee-nationale-arbre-2025',
  title: {
    fr: 'Reboisement et Journée nationale de l’arbre 2025',
    en: 'Tree planting and National Tree Day 2025',
  },
  excerpt: {
    fr: 'Actions de mise en terre de plants menées par les membres et les jeunes de l’Alliance, dont la participation à la Journée nationale de l’arbre 2025.',
    en: 'Tree-planting actions carried out by the Alliance’s members and young people, including participation in National Tree Day 2025.',
  },
  context: {
    fr: `Le reboisement est l’une des actions concrètes par lesquelles l’ACIEA mobilise les jeunes en faveur de la nature et de la résilience climatique.

L’Alliance a publié sur sa page officielle une vidéo consacrée à sa participation à la **Journée nationale de l’arbre 2025**, ainsi que des photos de membres mettant en terre de jeunes plants.`,
    en: `Tree planting is one of the practical ways ACIEA mobilises young people for nature and climate resilience.

The Alliance published on its official page a video about its participation in **National Tree Day 2025**, along with photos of members planting seedlings.`,
  },
  achievements: {
    fr: [
      {
        text: 'Participation à la Journée nationale de l’arbre 2025 (vidéo publiée sur la page officielle de l’ACIEA)',
        verified: true,
        sourceUrl: FB_URL,
      },
    ],
    en: [
      {
        text: 'Participation in National Tree Day 2025 (video published on ACIEA’s official page)',
        verified: true,
        sourceUrl: FB_URL,
      },
    ],
  },
}

export const WATERAID_NEWS = {
  slug: 'rencontre-directeur-pays-wateraid',
  publishedAt: '2025-05-25T12:00:00.000Z',
  title: {
    fr: 'Rencontre entre l’ACIEA et le Directeur pays de WaterAid : une opportunité de collaboration prometteuse',
    en: 'ACIEA meets the WaterAid Country Director: a promising collaboration opportunity',
  },
  excerpt: {
    fr: 'En mai 2025, une délégation de l’ACIEA a été reçue par le Directeur pays de WaterAid pour un échange autour de l’eau, de l’assainissement et des possibilités de collaboration.',
    en: 'In May 2025, an ACIEA delegation was received by the WaterAid Country Director to discuss water, sanitation and collaboration opportunities.',
  },
  content: {
    fr: `En mai 2025, une délégation de l’ACIEA a été reçue par le Directeur pays de WaterAid, organisation internationale engagée pour l’accès à l’eau, à l’assainissement et à l’hygiène.

L’Alliance a présenté cette rencontre comme une opportunité de collaboration prometteuse, en cohérence avec son domaine d’intervention « Eau et assainissement ».`,
    en: `In May 2025, an ACIEA delegation was received by the Country Director of WaterAid, an international organisation working for access to water, sanitation and hygiene.

The Alliance described this meeting as a promising collaboration opportunity, in line with its “Water and sanitation” focus area.`,
  },
}

/** Komsilga (Kadiogo), commune-level position — Wikipedia: 12°11′11″N 1°38′01″W. */
export const KOMSILGA = { latitude: 12.1865, longitude: -1.6338, region: 'Kadiogo' }

/**
 * President's message, text supplied and approved by ACIEA on 22/10/2026
 * (French original verbatim; English translation to be validated).
 * Paragraphs are separated by a blank line. Signed by TEAM[0].
 */
export const PRESIDENT_MESSAGE = {
  fr: `Créée en 2024 à Ouagadougou, l’Alliance pour l’innovation climatique et l’action écologique (ACIEA) est née de notre volonté de contribuer à la protection de l’environnement, au bien-être des populations et au développement durable, en utilisant notamment les possibilités offertes par la technologie et le numérique.

Face aux défis du changement climatique, de l’accès à l’eau potable, de l’assainissement et des besoins humanitaires, nous sommes convaincus que la science, l’innovation et les outils numériques peuvent nous aider à trouver des solutions concrètes et adaptées aux réalités de nos communautés.

Notre ambition est de faire de l’ACIEA une organisation reconnue au Burkina Faso et au-delà, engagée dans la protection de l’environnement, la gestion durable des ressources en eau, l’amélioration des conditions d’hygiène et d’assainissement, ainsi que l’accompagnement des populations vulnérables.

Nous accordons également une place importante à la jeunesse, car nous croyons en sa créativité, ses compétences et sa capacité à utiliser les nouvelles technologies pour répondre aux besoins de notre société.

Nous invitons les partenaires, les chercheurs, les professionnels et les jeunes à nous rejoindre afin de développer ensemble des initiatives utiles aux populations et respectueuses de l’environnement.

Ensemble, mettons la science, la technologie, le numérique et la solidarité au service de l’être humain et d’un avenir durable.`,
  en: `Founded in 2024 in Ouagadougou, the Alliance for Climate Innovation and Ecological Action (ACIEA) was born of our desire to contribute to protecting the environment, to people’s well-being and to sustainable development, notably by drawing on the possibilities offered by technology and digital tools.

Faced with the challenges of climate change, access to drinking water, sanitation and humanitarian needs, we are convinced that science, innovation and digital tools can help us find concrete solutions suited to the realities of our communities.

Our ambition is to make ACIEA a recognised organisation in Burkina Faso and beyond, committed to protecting the environment, managing water resources sustainably, improving hygiene and sanitation, and supporting vulnerable people.

We also give young people an important place, because we believe in their creativity, their skills and their ability to use new technologies to meet the needs of our society.

We invite partners, researchers, professionals and young people to join us so that, together, we can develop initiatives that serve people and respect the environment.

Together, let us put science, technology, digital tools and solidarity at the service of humanity and a sustainable future.`,
}
