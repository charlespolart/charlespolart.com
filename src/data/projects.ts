import type { Bilingual, ProjectGroups } from './types';

export const projects: Bilingual<ProjectGroups> = {
  en: {
    work: [
      {
        id: 'agora-nova',
        num: '[01]',
        title: 'Agora Nova',
        stack: 'Flutter · Bun · Dart · TS/JS',
        meta: 'Freelance · political social network',
        description:
          'Public-debate platform for citizens, journalists and public figures. Flutter mobile app + Bun-powered REST API. Multi-role accounts with verification, feeds, posts, reactions, polls, hashtags and moderation. RGPD-compliant FR hosting, CI/CD pipeline.',
        features: [
          'Multi-role identity with account verification',
          'Posts, polls, reactions, comments, hashtags',
          'Moderation tools + role-based access',
          'CI/CD deploy on RGPD-compliant FR infrastructure',
        ],
      },
      {
        id: 'sncf',
        num: '[02]',
        title: 'SNCF · DigiDoc+',
        stack: 'Angular · TypeScript · RxJS',
        meta: 'Freelance · enterprise · regulatory texts',
        description:
          "Full refactor of the internal regulatory-text consultation app used across SNCF (successor to DigiDoc/Syspre). Front-end design for search & consultation of prescriptive texts. Agile collaboration with back-end + business teams (SARDO).",
        features: [
          'Full-text search across the regulatory corpus',
          'Filters, favorites, advanced query UX',
          'Consultation flow tuned for daily SNCF use',
        ],
      },
      {
        id: 'kiwidiag',
        num: '[03]',
        title: 'Kiwidiag',
        stack: 'Node · Koa · GraphQL · Sequelize · Postgres · Angular',
        meta: 'Freelance · marketplace',
        description:
          'Marketplace booking certified surveyors for the mandatory French property diagnostics (DPE, asbestos, lead, gas, electricity…). Multi-role accounts (customer / diagnostician / partner), planning, geolocation, Stripe payments and reviews.',
        features: [
          'Multi-role accounts : customer · diagnostician · partner',
          'Catalog of mandatory FR diagnostics (DPE, asbestos, lead, gas…)',
          'Surveyor availability + booking flow with geolocation',
          'Stripe payments, Twilio SMS verification, reviews',
        ],
        link: 'https://www.kiwidiag.com',
        linkLabel: 'kiwidiag.com',
      },
      {
        id: 'workspace',
        num: '[04]',
        title: 'Workspace / Diva / Ceres',
        stack: 'C++ · Qt',
        meta: 'CEA · Silicom',
        description:
          'Three desktop tools used by CEA researchers for nuclear monitoring and environmental impact assessment. New features + integration on all three.',
        features: [
          'Workspace : seismic / infrasound / hydroacoustic signal analysis',
          'Diva : time-series monitoring of seismic-network stations',
          'Ceres : health impact assessment of pollutant releases into the environment',
        ],
      },
      {
        id: 'magellan',
        num: '[05]',
        title: 'Magellan',
        stack: 'C++ · Qt',
        meta: 'Airbus Defence · Silicom',
        description:
          'Secure communication software over hostile wireless networks. Hard-real-time constraints, defense-grade requirements.',
      },
      {
        id: 'consolweb',
        num: '[06]',
        title: 'ConsolWeb · Wiring Tool',
        stack: 'C# · WPF',
        meta: 'Freelance',
        description:
          'Desktop app that opens multi-format wiring schematics. Layered PCB viewer guiding technicians point-by-point in the optimal wiring order.',
      },
      {
        id: 'capa',
        num: '[07]',
        title: 'Capa Interim',
        stack: 'Symfony 3 · PHP · MySQL',
        meta: 'Freelance',
        description:
          'Backend for a temp-work matchmaking site : job search, account + CV upload, full admin for ads / news / users.',
        link: 'https://www.capainterim.com',
        linkLabel: 'capainterim.com',
      },
      {
        id: 'axion',
        num: '[08]',
        title: 'Axion',
        stack: 'Symfony 3 · PHP · MySQL',
        meta: 'Freelance · NGO',
        description:
          'Thematic image-sharing site for a humanitarian NGO. Content publishing, discovery feed and community interactions (likes, comments).',
      },
    ],
    personal: [
      {
        id: 'pathtracing',
        num: '[09]',
        title: 'Path Tracing Engine',
        stack: 'C++ · Qt · OpenGL · STL',
        meta: 'Personal · 2019—2022',
        description:
          'Photorealistic 3D rendering engine built from scratch — STL only, FreeImage for textures, OpenGL for preview.',
        features: [
          '.obj + .mtl loading with full material editor',
          'AABB collision tree, multithreaded',
          'OpenGL preview with mouse-driven camera',
          'JSON scene save / import',
        ],
        link: 'https://github.com/charlespolart/Pathtracing',
        linkLabel: 'github.com/charlespolart/Pathtracing',
      },
      {
        id: 'crypto-bot',
        num: '[10]',
        title: 'Crypto Trading Bot',
        stack: 'Angular · Bun · TypeScript · Binance API',
        meta: 'Personal · 2019—2022',
        description:
          'Automated trading on Binance with a pluggable strategy system and a backtesting harness — designed to iterate on strategies without touching plumbing.',
        features: [
          'Indicators : RSI, EMA, EMACross, ATR, SwingLow',
          'Hot-swap strategies, position state machine',
          'Persisted trade history for replay & backtests',
        ],
      },
    ],
  },
  fr: {
    work: [
      {
        id: 'agora-nova',
        num: '[01]',
        title: 'Agora Nova',
        stack: 'Flutter · Bun · Dart · TS/JS',
        meta: 'Freelance · réseau social politique',
        description:
          "Plateforme de débat public pour citoyens, journalistes et responsables politiques. App mobile Flutter + API REST sous Bun. Comptes multi-rôles avec vérification, fil d'actualité, posts, réactions, sondages, hashtags et modération. Hébergement FR conforme RGPD, CI/CD.",
        features: [
          'Identité multi-rôles avec vérification de compte',
          'Posts, sondages, réactions, commentaires, hashtags',
          'Outils de modération + accès par rôles',
          'CI/CD vers infra FR RGPD',
        ],
      },
      {
        id: 'sncf',
        num: '[02]',
        title: 'SNCF · DigiDoc+',
        stack: 'Angular · TypeScript · RxJS',
        meta: 'Freelance · entreprise · textes réglementaires',
        description:
          "Refonte complète de l'application interne de consultation des textes réglementaires utilisée par l'ensemble des cheminots (successeur de DigiDoc/Syspre). Conception des interfaces de recherche et de consultation des textes prescriptifs. Collaboration agile avec les équipes back-end et métier (SARDO).",
        features: [
          'Recherche plein texte sur le corpus réglementaire',
          "Filtres, favoris, UX d'interrogation avancée",
          'Flow de consultation calibré pour usage quotidien SNCF',
        ],
      },
      {
        id: 'kiwidiag',
        num: '[03]',
        title: 'Kiwidiag',
        stack: 'Node · Koa · GraphQL · Sequelize · Postgres · Angular',
        meta: 'Freelance · marketplace',
        description:
          "Marketplace pour commander les diagnostics immobiliers obligatoires (DPE, amiante, plomb, gaz, électricité…) auprès de diagnostiqueurs certifiés. Comptes multi-rôles (client / diagnostiqueur / partenaire), planning, géolocalisation, paiements Stripe et avis.",
        features: [
          'Comptes multi-rôles : client · diagnostiqueur · partenaire',
          'Catalogue des diagnostics FR obligatoires (DPE, amiante, plomb, gaz…)',
          'Dispo des diagnostiqueurs + flow de réservation géolocalisé',
          'Paiements Stripe, vérification SMS Twilio, avis',
        ],
        link: 'https://www.kiwidiag.com',
        linkLabel: 'kiwidiag.com',
      },
      {
        id: 'workspace',
        num: '[04]',
        title: 'Workspace / Diva / Ceres',
        stack: 'C++ · Qt',
        meta: 'CEA · Silicom',
        description:
          "Trois outils desktop utilisés par les chercheurs CEA pour la surveillance nucléaire et l'évaluation d'impact environnemental. Nouvelles fonctionnalités + intégration sur les trois.",
        features: [
          'Workspace : analyse de signaux sismiques / infrasons / hydroacoustiques',
          'Diva : surveillance temporelle des stations du réseau sismique',
          'Ceres : évaluation des conséquences sanitaires des rejets de polluants',
        ],
      },
      {
        id: 'magellan',
        num: '[05]',
        title: 'Magellan',
        stack: 'C++ · Qt',
        meta: 'Airbus Defence · Silicom',
        description:
          "Logiciel de communication sécurisée sur réseaux sans fil hostiles. Contraintes temps réel dur, exigences niveau défense.",
      },
      {
        id: 'consolweb',
        num: '[06]',
        title: 'ConsolWeb · Logiciel câblage',
        stack: 'C# · WPF',
        meta: 'Freelance',
        description:
          "App desktop qui ouvre des schémas de câblage multi-formats. Vue par couches PCB, guide le technicien point par point dans l'ordre optimal.",
      },
      {
        id: 'capa',
        num: '[07]',
        title: 'Capa Interim',
        stack: 'Symfony 3 · PHP · MySQL',
        meta: 'Freelance',
        description:
          "Backend d'un site d'intérim : recherche d'annonces, compte + upload CV, partie admin complète pour annonces / actus / utilisateurs.",
        link: 'https://www.capainterim.com',
        linkLabel: 'capainterim.com',
      },
      {
        id: 'axion',
        num: '[08]',
        title: 'Axion',
        stack: 'Symfony 3 · PHP · MySQL',
        meta: 'Freelance · ONG',
        description:
          "Site de partage d'images autour de thématiques liées à des causes humanitaires : publication de contenus, fil de découverte, interactions communautaires (likes, commentaires).",
      },
    ],
    personal: [
      {
        id: 'pathtracing',
        num: '[09]',
        title: 'Path Tracing Engine',
        stack: 'C++ · Qt · OpenGL · STL',
        meta: 'Perso · 2019—2022',
        description:
          "Moteur de rendu 3D photoréaliste écrit from scratch — STL only, FreeImage pour les textures, OpenGL pour la prévisu.",
        features: [
          "Chargement .obj + .mtl avec éditeur de matériaux",
          "Arbres de collision AABB, multithreadé",
          'Prévisu OpenGL avec placement caméra à la souris',
          'Sérialisation des scènes en JSON (save / import)',
        ],
        link: 'https://github.com/charlespolart/Pathtracing',
        linkLabel: 'github.com/charlespolart/Pathtracing',
      },
      {
        id: 'crypto-bot',
        num: '[10]',
        title: 'Crypto Trading Bot',
        stack: 'Angular · Bun · TypeScript · Binance API',
        meta: 'Perso · 2019—2022',
        description:
          "Trading automatisé sur Binance avec un système de stratégies pluggable et un harness de backtesting — pour itérer sur les stratégies sans toucher à la tuyauterie.",
        features: [
          'Indicateurs : RSI, EMA, EMACross, ATR, SwingLow',
          "Changement de stratégie à chaud, machine à états des positions",
          'Historique des trades persisté pour replay & backtests',
        ],
      },
    ],
  },
};
