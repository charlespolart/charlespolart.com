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
          'Public-debate mobile platform — Flutter app + Bun REST API. Verified multi-role accounts, posts, polls, hashtags, moderation. GDPR-compliant FR hosting, CI/CD.',
        features: [
          'Multi-role identity with account verification',
          'Posts, polls, reactions, comments, hashtags',
          'Moderation tools + role-based access',
          'CI/CD deploy on RGPD-compliant FR infrastructure',
        ],
        screenshots: [
          '/projects/agora-nova/01.png',
          '/projects/agora-nova/02.png',
          '/projects/agora-nova/03.png',
          '/projects/agora-nova/04.png',
          '/projects/agora-nova/05.png',
          '/projects/agora-nova/06.png',
          '/projects/agora-nova/07.png',
          '/projects/agora-nova/08.png',
        ],
      },
      {
        id: 'sncf',
        num: '[02]',
        title: 'SNCF · DigiDoc+',
        stack: 'Angular · TypeScript · RxJS · Elasticsearch',
        meta: 'Freelance · enterprise · regulatory texts',
        description:
          "Front-end refactor of DigiDoc+, SNCF's internal platform delivering rail prescription texts (regulations, safety instructions) to every agent — successor to DigiDoc / Syspre. Angular / TypeScript / RxJS, faceted full-text search (Elasticsearch).",
        features: [
          'Faceted full-text search across the regulatory corpus (Elasticsearch)',
          'Navigation by themes, business activities, document types, regions',
          'Documents + modules (sub-parts of text) — versions, variants, abrogations',
          'Identification cards, favorites, history, parution alerts',
        ],
        screenshots: [
          '/projects/sncf/01.png',
          '/projects/sncf/02.png',
          '/projects/sncf/03.png',
          '/projects/sncf/04.png',
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
        links: [{ url: 'https://www.kiwidiag.com', label: 'kiwidiag.com' }],
        screenshots: ['/projects/kiwidiag/01.png', '/projects/kiwidiag/02.png'],
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
        screenshots: ['/projects/workspace/01.png'],
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
        screenshots: ['/projects/consolweb/01.png'],
      },
      {
        id: 'capa',
        num: '[07]',
        title: 'Capa Interim',
        stack: 'Symfony 3 · PHP · MySQL',
        meta: 'Freelance',
        description:
          'Backend for a temp-work matchmaking site : job search, account + CV upload, full admin for ads / news / users.',
        links: [{ url: 'https://www.capainterim.com', label: 'capainterim.com' }],
        screenshots: ['/projects/capa/01.png', '/projects/capa/02.png'],
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
    apps: [
      {
        id: 'dian-dian',
        num: '[09]',
        title: 'Dian Dian · 点点',
        stack: 'Flutter · Dart · Express · TypeScript · Postgres · WebSocket',
        meta: 'Indie product · stores · 2025',
        description:
          'Cross-platform visual year tracker : color-code each day on a 12×31 grid, pixel-art aesthetic. End-to-end — Flutter (iOS / Android) + Express/Postgres backend, real-time WebSocket sync, RevenueCat IAP, self-hosted (Docker, CI/CD).',
        features: [
          'Year grid : 12 months × 31 days, pastel + custom colors, drag-reorder legends, quick-fill',
          'Real-time WebSocket sync across devices, multi-year trackers, PNG export, 7 themes + dark mode',
          'Stats : days filled, best streak, yearly %, distribution, monthly + day-of-week breakdown',
          'Premium : RevenueCat (monthly / yearly / lifetime + trial), custom pixel-art paywall, AdMob',
        ],
        links: [
          { url: 'https://apps.apple.com/app/id6761432329', label: 'App Store' },
          { url: 'https://diandian.overridedev.com', label: 'diandian.overridedev.com' },
        ],
        screenshots: [
          '/projects/dian-dian/01.png',
          '/projects/dian-dian/02.png',
          '/projects/dian-dian/03.png',
          '/projects/dian-dian/04.png',
          '/projects/dian-dian/05.png',
          '/projects/dian-dian/06.png',
          '/projects/dian-dian/07.png',
          '/projects/dian-dian/08.png',
        ],
      },
      {
        id: 'murmure',
        num: '[10]',
        title: 'Murmure',
        stack: 'Swift · SwiftUI · whisper.cpp · llama.cpp · Metal',
        meta: 'Indie product · macOS · on-device AI',
        description:
          'Menu-bar dictation app for macOS: hit a global hotkey, speak, and the text is pasted into any app — 100% on-device & offline, nothing ever leaves the machine. Local speech-to-text (whisper.cpp, Metal-accelerated) plus a local Llama LLM that cleans up and formats the final transcript.',
        features: [
          'On-device, offline transcription — zero cloud, zero data sent',
          'Local Llama LLM formats the final transcript (punctuation, casing, structure)',
          'Global hotkey + smart paste into any app via the Accessibility API',
          'Multilingual auto-detection (FR / EN / 中文), live preview, custom vocabulary',
        ],
      },
    ],
    personal: [
      {
        id: 'algo-trading',
        num: '[11]',
        title: 'Algo Trading Platform',
        stack: 'Bun · TypeScript · Hono · React · Postgres · Docker',
        meta: 'Personal · 2025—2026',
        description:
          'Crypto algorithmic trading platform (spot + USDT-M futures) : execution and market data through exchange APIs. Strategies written in TypeScript run identically in backtest, paper and live — high-fidelity backtester, walk-forward optimizer and live bots with risk guards.',
        features: [
          'TypeScript-native strategies — identical code in backtest / paper / live, no lookahead by construction',
          'High-fidelity backtester : candle or replayed aggTrades, fees / slippage / funding, walk-forward optimizer',
          'Live / paper / testnet bots : virtual allocation, risk guards, kill switch, Telegram alerts',
          'Self-hosted on VPS : Docker, Caddy (auto-TLS + mTLS), CI/CD to GHCR',
        ],
        screenshots: [
          '/projects/algo-trading/01.png',
          '/projects/algo-trading/02.png',
          '/projects/algo-trading/03.png',
          '/projects/algo-trading/04.png',
          '/projects/algo-trading/05.png',
          '/projects/algo-trading/06.png',
        ],
      },
      {
        id: 'pathtracing',
        num: '[12]',
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
        links: [{ url: 'https://github.com/charlespolart/Pathtracing', label: 'github.com/charlespolart/Pathtracing' }],
        screenshots: [
          '/projects/pathtracing/01.png',
          '/projects/pathtracing/02.png',
          '/projects/pathtracing/03.png',
          '/projects/pathtracing/04.png',
          '/projects/pathtracing/05.png',
          '/projects/pathtracing/06.png',
          '/projects/pathtracing/07.png',
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
          "Plateforme mobile de débat public — app Flutter + API REST sous Bun. Comptes multi-rôles vérifiés, posts, sondages, hashtags, modération. Hébergement FR conforme RGPD, CI/CD.",
        features: [
          'Identité multi-rôles avec vérification de compte',
          'Posts, sondages, réactions, commentaires, hashtags',
          'Outils de modération + accès par rôles',
          'CI/CD vers infra FR RGPD',
        ],
        screenshots: [
          '/projects/agora-nova/01.png',
          '/projects/agora-nova/02.png',
          '/projects/agora-nova/03.png',
          '/projects/agora-nova/04.png',
          '/projects/agora-nova/05.png',
          '/projects/agora-nova/06.png',
          '/projects/agora-nova/07.png',
          '/projects/agora-nova/08.png',
        ],
      },
      {
        id: 'sncf',
        num: '[02]',
        title: 'SNCF · DigiDoc+',
        stack: 'Angular · TypeScript · RxJS · Elasticsearch',
        meta: 'Freelance · entreprise · textes réglementaires',
        description:
          "Refonte front-end de DigiDoc+, la plateforme interne SNCF qui diffuse les textes de prescription ferroviaire (règlements, consignes de sécurité) à l'ensemble des cheminots — successeur de DigiDoc / Syspre. Angular / TypeScript / RxJS, recherche plein texte à facettes (Elasticsearch).",
        features: [
          'Recherche plein texte à facettes sur le corpus réglementaire (Elasticsearch)',
          'Navigation par thèmes, activités métiers, types de documents, régions',
          'Documents + modules (parties de texte) — versions, variantes, abrogations',
          "Fiches d'identification, favoris, historique, alertes de parution",
        ],
        screenshots: [
          '/projects/sncf/01.png',
          '/projects/sncf/02.png',
          '/projects/sncf/03.png',
          '/projects/sncf/04.png',
        ],
      },
      {
        id: 'kiwidiag',
        num: '[03]',
        title: 'Kiwidiag',
        stack: 'Node · Koa · GraphQL · Sequelize · Postgres · Angular',
        meta: 'Freelance · marketplace',
        description:
          'Marketplace pour commander les diagnostics immobiliers obligatoires (DPE, amiante, plomb, gaz, électricité…) auprès de diagnostiqueurs certifiés. Comptes multi-rôles (client / diagnostiqueur / partenaire), planning, géolocalisation, paiements Stripe et avis.',
        features: [
          'Comptes multi-rôles : client · diagnostiqueur · partenaire',
          'Catalogue des diagnostics FR obligatoires (DPE, amiante, plomb, gaz…)',
          'Dispo des diagnostiqueurs + flow de réservation géolocalisé',
          'Paiements Stripe, vérification SMS Twilio, avis',
        ],
        links: [{ url: 'https://www.kiwidiag.com', label: 'kiwidiag.com' }],
        screenshots: ['/projects/kiwidiag/01.png', '/projects/kiwidiag/02.png'],
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
        screenshots: ['/projects/workspace/01.png'],
      },
      {
        id: 'magellan',
        num: '[05]',
        title: 'Magellan',
        stack: 'C++ · Qt',
        meta: 'Airbus Defence · Silicom',
        description:
          'Logiciel de communication sécurisée sur réseaux sans fil hostiles. Contraintes temps réel dur, exigences niveau défense.',
      },
      {
        id: 'consolweb',
        num: '[06]',
        title: 'ConsolWeb · Logiciel câblage',
        stack: 'C# · WPF',
        meta: 'Freelance',
        description:
          "App desktop qui ouvre des schémas de câblage multi-formats. Vue par couches PCB, guide le technicien point par point dans l'ordre optimal.",
        screenshots: ['/projects/consolweb/01.png'],
      },
      {
        id: 'capa',
        num: '[07]',
        title: 'Capa Interim',
        stack: 'Symfony 3 · PHP · MySQL',
        meta: 'Freelance',
        description:
          "Backend d'un site d'intérim : recherche d'annonces, compte + upload CV, partie admin complète pour annonces / actus / utilisateurs.",
        links: [{ url: 'https://www.capainterim.com', label: 'capainterim.com' }],
        screenshots: ['/projects/capa/01.png', '/projects/capa/02.png'],
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
    apps: [
      {
        id: 'dian-dian',
        num: '[09]',
        title: 'Dian Dian · 点点',
        stack: 'Flutter · Dart · Express · TypeScript · Postgres · WebSocket',
        meta: 'Produit indé · stores · 2025',
        description:
          "Tracker visuel d'année cross-platform : colorie chaque jour sur une grille 12×31, esthétique pixel-art. De bout en bout — Flutter (iOS / Android) + backend Express/Postgres, sync temps réel WebSocket, IAP RevenueCat, auto-hébergé (Docker, CI/CD).",
        features: [
          'Grille annuelle : 12 mois × 31 jours, couleurs pastel + custom, légendes réordonnables (drag), remplissage rapide',
          'Sync temps réel WebSocket entre appareils, trackers multi-années, export PNG, 7 thèmes + mode sombre',
          'Stats : jours remplis, meilleure série, % annuel, distribution, répartition par mois + jour de la semaine',
          'Premium : RevenueCat (mensuel / annuel / à vie + essai), paywall pixel-art custom, AdMob',
        ],
        links: [
          { url: 'https://apps.apple.com/app/id6761432329', label: 'App Store' },
          { url: 'https://diandian.overridedev.com', label: 'diandian.overridedev.com' },
        ],
        screenshots: [
          '/projects/dian-dian/01.png',
          '/projects/dian-dian/02.png',
          '/projects/dian-dian/03.png',
          '/projects/dian-dian/04.png',
          '/projects/dian-dian/05.png',
          '/projects/dian-dian/06.png',
          '/projects/dian-dian/07.png',
          '/projects/dian-dian/08.png',
        ],
      },
      {
        id: 'murmure',
        num: '[10]',
        title: 'Murmure',
        stack: 'Swift · SwiftUI · whisper.cpp · llama.cpp · Metal',
        meta: 'Produit indé · macOS · on-device AI',
        description:
          "App de dictée menu-bar pour macOS : un raccourci global, tu parles, et le texte est collé dans n'importe quelle app — 100% local & hors-ligne, rien ne quitte jamais la machine. STT local (whisper.cpp, accéléré Metal) + un LLM Llama local qui nettoie et formate la transcription finale.",
        features: [
          'Transcription on-device, hors-ligne — zéro cloud, zéro donnée envoyée',
          'LLM Llama local pour formater la transcription finale (ponctuation, casse, structure)',
          "Raccourci global + collage intelligent dans n'importe quelle app (API Accessibilité)",
          'Détection multilingue (FR / EN / 中文), aperçu live, vocabulaire custom',
        ],
      },
    ],
    personal: [
      {
        id: 'algo-trading',
        num: '[11]',
        title: 'Algo Trading Platform',
        stack: 'Bun · TypeScript · Hono · React · Postgres · Docker',
        meta: 'Perso · 2025—2026',
        description:
          "Plateforme de trading algorithmique crypto (spot + futures USDT-M) : exécution et données de marché via les API des exchanges. Les stratégies écrites en TypeScript tournent à l'identique en backtest, paper et live — backtester haute-fidélité, optimiseur walk-forward et bots live avec garde-fous de risque.",
        features: [
          'Stratégies en TypeScript — code identique en backtest / paper / live, sans lookahead par construction',
          'Backtester haute-fidélité : bougies ou aggTrades rejoués, frais / slippage / funding, optimiseur walk-forward',
          'Bots live / paper / testnet : allocation virtuelle, garde-fous de risque, kill switch, alertes Telegram',
          'Auto-hébergé sur VPS : Docker, Caddy (auto-TLS + mTLS), CI/CD vers GHCR',
        ],
        screenshots: [
          '/projects/algo-trading/01.png',
          '/projects/algo-trading/02.png',
          '/projects/algo-trading/03.png',
          '/projects/algo-trading/04.png',
          '/projects/algo-trading/05.png',
          '/projects/algo-trading/06.png',
        ],
      },
      {
        id: 'pathtracing',
        num: '[12]',
        title: 'Path Tracing Engine',
        stack: 'C++ · Qt · OpenGL · STL',
        meta: 'Perso · 2019—2022',
        description:
          'Moteur de rendu 3D photoréaliste écrit from scratch — STL only, FreeImage pour les textures, OpenGL pour la prévisu.',
        features: [
          'Chargement .obj + .mtl avec éditeur de matériaux',
          'Arbres de collision AABB, multithreadé',
          'Prévisu OpenGL avec placement caméra à la souris',
          'Sérialisation des scènes en JSON (save / import)',
        ],
        links: [{ url: 'https://github.com/charlespolart/Pathtracing', label: 'github.com/charlespolart/Pathtracing' }],
        screenshots: [
          '/projects/pathtracing/01.png',
          '/projects/pathtracing/02.png',
          '/projects/pathtracing/03.png',
          '/projects/pathtracing/04.png',
          '/projects/pathtracing/05.png',
          '/projects/pathtracing/06.png',
          '/projects/pathtracing/07.png',
        ],
      },
    ],
  },
};
