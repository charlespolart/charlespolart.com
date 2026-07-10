import type { Bilingual, ExperienceEntry } from './types';

export const experience: Bilingual<ExperienceEntry[]> = {
  en: [
    {
      id: 'app-studio',
      title: 'Indie App Publisher',
      dateStart: '2025',
      dateEnd: 'now',
      tag: 'Cross-platform apps + on-device AI · built, published & monetized',
      items: [
        {
          client: 'Dian Dian · 点点',
          project: 'cross-platform year tracker',
          description:
            'Flutter app (iOS / Android) + Express / TypeScript / Postgres backend, real-time WebSocket sync, JWT auth, RevenueCat in-app purchases. Self-hosted (Docker, CI/CD).',
        },
        {
          client: 'Murmure',
          project: 'on-device AI dictation (macOS)',
          description:
            'Native macOS menu-bar dictation, 100% on-device & offline : whisper.cpp STT + a local Qwen3 LLM (MLX) that cleans the transcript behind a diff-based guardrail (can never alter meaning). ~99 languages, global hotkey, smart paste. Swift / SwiftUI.',
        },
      ],
    },
    {
      id: 'freelance',
      title: 'Freelance Developer',
      dateStart: '2017.02',
      dateEnd: 'now',
      tag: 'Web · mobile · desktop · cross-stack · 8 yrs',
      items: [
        {
          client: 'Agora Nova',
          project: 'political social network',
          description:
            'Flutter mobile app + REST API for a public-debate platform : multi-role accounts, posts, polls, hashtags, moderation, RGPD-compliant FR hosting, CI/CD.',
        },
        {
          client: 'SNCF',
          project: 'DigiDoc+',
          description:
            "Front-end refactor of DigiDoc+, SNCF's internal platform delivering rail prescription texts (regulations, instructions, safety consignes) to every agent — successor to DigiDoc/Syspre. Angular / TypeScript / RxJS : faceted full-text search (Elasticsearch backend), classification-based navigation, identification cards, favorites, history. Agile collaboration with back-end and SARDO business teams.",
        },
        {
          client: 'Kiwidiag',
          project: 'real-estate diagnostics marketplace',
          description:
            'Marketplace booking certified surveyors for mandatory French property diagnostics (DPE, asbestos, lead, gas, electricity…). Backend work : Node, Koa, GraphQL, Sequelize, PostgreSQL — Stripe payments, Twilio SMS.',
        },
        {
          client: 'Leroy Merlin',
          project: 'front-end integration',
          description: 'Front-end dev & integration on the Leroy Merlin site (Angular, Node.js).',
        },
        {
          client: 'Capa Interim',
          project: 'matchmaking platform',
          description:
            'Full backend for a temp-work site : ads search, account + CV upload, admin for ads / news / users (Symfony 3, PHP, MySQL).',
        },
        {
          client: 'Axion',
          project: 'NGO image platform',
          description:
            'Thematic image-sharing site for a humanitarian NGO : publishing, categorisation, moderation (Symfony 3, PHP, MySQL).',
        },
        {
          client: 'ConsolWeb',
          project: 'wiring software',
          description:
            'Desktop app opening multi-format wiring schematics : layer viewer + ordered technician guidance (C#, WPF).',
        },
        {
          client: 'Revue scientifique',
          project: 'PDF extractor',
          description:
            'Desktop tool for automated structured-data extraction from scientific PDFs (C++, Qt).',
        },
      ],
    },
    {
      id: 'silicom',
      title: 'C++/Qt Developer',
      company: 'Silicom',
      dateStart: '2020.12',
      dateEnd: '2023.05',
      tag: 'Defense & aerospace mission · 2 yrs 6 mo',
      items: [
        {
          client: 'CEA',
          project: 'Workspace',
          description:
            'Dev & integration of new features in a seismic / infrasound / hydroacoustic signal analysis tool used for nuclear monitoring.',
        },
        {
          client: 'CEA',
          project: 'Ceres TMA',
          description:
            'Maintenance on a tool evaluating health impact of pollutant releases into the environment.',
        },
        {
          client: 'CEA',
          project: 'Diva TMA',
          description: 'Monitoring & display of seismic network station data over time.',
        },
        {
          client: 'Airbus D&S',
          project: 'Magellan',
          description:
            'Features for a secure communication software operating over wireless networks.',
        },
      ],
    },
    {
      id: 'stages',
      title: 'Engineering Internships',
      company: 'Thales · Dassault · R&D Tech',
      dateStart: '2016',
      dateEnd: '2020',
      tag: '3 internships · C++ · C# · Qt · Python',
      items: [
        {
          client: 'Thales · La Ruche',
          dates: '2020.03 — 2020.08 · 6 mo',
          description: 'Aerial drone detection software in Unity + radar simulator (C#, C).',
        },
        {
          client: 'Sogitec / Dassault',
          dates: '2017.04 — 2017.08 · 5 mo',
          description:
            'Hybrid raytracing / rasterization rendering system for flight simulation (C++).',
        },
        {
          client: 'R&D Tech France',
          dates: '2016.09 — 2017.03 · 7 mo',
          description:
            'Embedded C/C++ R&D : laser control over network, drone parachute trigger, robot arm stabilization.',
        },
      ],
    },
  ],
  fr: [
    {
      id: 'app-studio',
      title: "Éditeur d'applications",
      dateStart: '2025',
      dateEnd: 'now',
      tag: 'Apps cross-platform + IA on-device · conçues, publiées & monétisées',
      items: [
        {
          client: 'Dian Dian · 点点',
          project: "suivi visuel d'année cross-platform",
          description:
            "App Flutter (iOS / Android) + backend Express / TypeScript / Postgres, sync temps réel WebSocket, auth JWT, achats in-app RevenueCat. Auto-hébergée (Docker, CI/CD).",
        },
        {
          client: 'Murmure',
          project: 'dictée IA on-device (macOS)',
          description:
            "Dictée menu-bar macOS native, 100% locale & hors-ligne : STT whisper.cpp + un LLM Qwen3 local (MLX) qui nettoie la transcription derrière un garde-fou diff (sans jamais altérer le sens). ~99 langues, raccourci global, collage intelligent. Swift / SwiftUI.",
        },
      ],
    },
    {
      id: 'freelance',
      title: 'Développeur Freelance',
      dateStart: '2017.02',
      dateEnd: 'now',
      tag: 'Web · mobile · desktop · cross-stack · 8 ans',
      items: [
        {
          client: 'Agora Nova',
          project: 'réseau social politique',
          description:
            'App mobile Flutter + API REST pour une plateforme de débat public : comptes multi-rôles, posts, sondages, hashtags, modération, hébergement FR RGPD, CI/CD.',
        },
        {
          client: 'SNCF',
          project: 'DigiDoc+',
          description:
            "Refonte front-end de DigiDoc+, plateforme interne SNCF qui diffuse les textes de prescription ferroviaire (règlements, instructions, consignes de sécurité) aux cheminots — successeur de DigiDoc/Syspre. Angular / TypeScript / RxJS : recherche plein texte à facettes (Elasticsearch côté back), navigation par classification, fiches d'identification, favoris, historique. Collaboration agile avec les équipes back-end et métier (SARDO).",
        },
        {
          client: 'Kiwidiag',
          project: 'marketplace de diagnostics immobiliers',
          description:
            'Plateforme pour commander les diagnostics immobiliers obligatoires (DPE, amiante, plomb, gaz, électricité…) auprès de diagnostiqueurs certifiés. Dev backend : Node, Koa, GraphQL, Sequelize, PostgreSQL — paiements Stripe, SMS Twilio.',
        },
        {
          client: 'Leroy Merlin',
          project: 'intégration front-end',
          description: 'Dev front et intégration sur le site Leroy Merlin (Angular, Node.js).',
        },
        {
          client: 'Capa Interim',
          project: 'plateforme de mise en relation',
          description:
            "Backend complet d'un site d'intérim : recherche d'annonces, compte + upload CV, admin annonces / actus / utilisateurs (Symfony 3, PHP, MySQL).",
        },
        {
          client: 'Axion',
          project: 'plateforme images ONG',
          description:
            "Site thématique de partage d'images pour une ONG humanitaire : publication, catégorisation, modération (Symfony 3, PHP, MySQL).",
        },
        {
          client: 'ConsolWeb',
          project: 'logiciel de câblage',
          description:
            'App desktop ouvrant des schémas de câblage multi-formats : vue par couches + guidage ordonné du technicien (C#, WPF).',
        },
        {
          client: 'Revue scientifique',
          project: 'extracteur PDF',
          description:
            "Outil desktop d'extraction automatisée de données structurées depuis des PDFs scientifiques (C++, Qt).",
        },
      ],
    },
    {
      id: 'silicom',
      title: 'Développeur C++/Qt',
      company: 'Silicom',
      dateStart: '2020.12',
      dateEnd: '2023.05',
      tag: 'Mission défense & aérospatial · 2 ans 6 mois',
      items: [
        {
          client: 'CEA',
          project: 'Workspace',
          description:
            "Dev & intégration de nouvelles fonctionnalités dans un outil d'analyse de signaux sismiques / infrasons / hydroacoustiques pour la surveillance nucléaire.",
        },
        {
          client: 'CEA',
          project: 'Ceres TMA',
          description:
            "TMA d'un outil d'évaluation des conséquences sanitaires des rejets de polluants dans l'environnement.",
        },
        {
          client: 'CEA',
          project: 'Diva TMA',
          description:
            'Surveillance et affichage des données des stations du réseau sismique dans le temps.',
        },
        {
          client: 'Airbus D&S',
          project: 'Magellan',
          description:
            'Nouvelles fonctionnalités pour un logiciel de communication sécurisée sur réseaux sans fil.',
        },
      ],
    },
    {
      id: 'stages',
      title: "Stages d'ingénierie",
      company: 'Thales · Dassault · R&D Tech',
      dateStart: '2016',
      dateEnd: '2020',
      tag: '3 stages · C++ · C# · Qt · Python',
      items: [
        {
          client: 'Thales · La Ruche',
          dates: '2020.03 — 2020.08 · 6 mois',
          description:
            'Logiciel de détection de drones aériens sous Unity + simulateur de radar (C#, C).',
        },
        {
          client: 'Sogitec / Dassault',
          dates: '2017.04 — 2017.08 · 5 mois',
          description:
            'Système de rendu hybride raytracing/rastérisation pour simulation de vol (C++).',
        },
        {
          client: 'R&D Tech France',
          dates: '2016.09 — 2017.03 · 7 mois',
          description:
            "C/C++ embarqué R&D : contrôle de lasers sur le réseau, déclenchement parachute drone, stabilisation d'un bras robot.",
        },
      ],
    },
  ],
};
