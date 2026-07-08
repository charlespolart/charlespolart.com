import type { Bilingual, UIStrings } from './types';

export const ui: Bilingual<UIStrings> = {
  en: {
    nav: [
      { id: 'whoami', label: 'whoami', num: '00' },
      { id: 'about', label: 'about', num: '01' },
      { id: 'skills', label: 'skills', num: '02' },
      { id: 'experience', label: 'experience', num: '03' },
      { id: 'projects', label: 'projects', num: '04' },
      { id: 'education', label: 'education', num: '05' },
      { id: 'contact', label: 'contact', num: '06' },
    ],
    header: { developer: 'FULL STACK · 8 YRS', back: 'THEMES' },
    sections: {
      whoami: { title: 'WHOAMI', meta: 'root identity', command: 'whoami --full' },
      about: { title: 'ABOUT', meta: 'about.txt', command: 'cat about.txt' },
      skills: { title: 'SKILLS', meta: 'skills.json', command: 'skills --list --json' },
      experience: { title: 'EXPERIENCE', meta: 'experience.log', command: 'cat experience.log' },
      projects: { title: 'PROJECTS', meta: '~/projects/', command: 'ls -la projects/ && cat *.md' },
      education: { title: 'EDUCATION', meta: 'education.log', command: 'cat education.log' },
      contact: { title: 'CONTACT', meta: 'contact.cfg', command: 'contact --help' },
    },
    about: {
      paragraphs: [
        'Full stack developer, <span class="hl">8 years</span> building web, mobile (<span class="hl">iOS &amp; Android</span>) and desktop apps — from architecture to production. A dev who <span class="green">thinks product, not just code</span>.',
        'Specialized in <span class="hl">Angular</span>, <span class="hl">Node.js</span> and <span class="hl">Flutter</span>. I put <span class="green">AI at the core</span> of my work : agentic dev steered with <span class="hl">Claude Code</span> (structured by an engineering playbook, not &ldquo;vibe-coding&rdquo;) and on-device LLM products &mdash; see <span class="green">Murmure</span>.',
        'Currently <span class="green">freelance</span> &mdash; recent missions for <span class="green">Agora Nova</span>, <span class="green">SNCF</span>, <span class="green">Leroy Merlin</span>. Past <span class="hl">defense / aerospace</span> work in C++/Qt at Silicom (CEA, Airbus).',
      ],
    },
    contact: {
      keys: {
        mail: 'mail',
        phone: 'phone',
        github: 'github',
        linkedin: 'linkedin',
        location: 'location',
      },
      locationValue:
        '<img src="/flag-fr.svg" alt="France" class="flag" /><img src="/flag-bzh.svg" alt="Bretagne" class="flag" /> · Remote OK',
      statusText: 'AVAILABLE — open to new contracts',
    },
    keyhint: { lang: 'lang', scroll: 'scroll', jump: 'jump' },
    boot: [
      { type: 'dim', text: 'CHARLES.OS BIOS  v2.4.1      © 1995—2026' },
      { type: 'dim', text: 'Initializing main board...' },
      { type: 'plain', text: '> Running POST [Power-On Self Test]                       [ OK ]' },
      { type: 'progress', label: '> Memory check       ', amount: 65536, unit: 'KB' },
      { type: 'plain', text: '> Detecting keyboard...                                   [ OK ]' },
      { type: 'plain', text: '> Initializing 80×24 amber phosphor display...            [ OK ]' },
      { type: 'plain', text: '> Mounting /usr/local/charles.cv                          [ OK ]' },
      { type: 'progress', label: '> Reading sectors    ', amount: 100, unit: '%' },
      { type: 'ok', text: '> SYSTEM READY — type help, or scroll.' },
      { type: 'plain', text: '' },
    ],
  },
  fr: {
    nav: [
      { id: 'whoami', label: 'whoami', num: '00' },
      { id: 'about', label: 'about', num: '01' },
      { id: 'skills', label: 'skills', num: '02' },
      { id: 'experience', label: 'experience', num: '03' },
      { id: 'projects', label: 'projects', num: '04' },
      { id: 'education', label: 'education', num: '05' },
      { id: 'contact', label: 'contact', num: '06' },
    ],
    header: { developer: 'FULL STACK · 8 ANS', back: 'THEMES' },
    sections: {
      whoami: { title: 'WHOAMI', meta: 'identité root', command: 'whoami --full' },
      about: { title: 'À PROPOS', meta: 'about.txt', command: 'cat about.txt' },
      skills: { title: 'COMPÉTENCES', meta: 'skills.json', command: 'skills --list --json' },
      experience: { title: 'EXPÉRIENCE', meta: 'experience.log', command: 'cat experience.log' },
      projects: { title: 'PROJETS', meta: '~/projects/', command: 'ls -la projects/ && cat *.md' },
      education: { title: 'FORMATION', meta: 'education.log', command: 'cat education.log' },
      contact: { title: 'CONTACT', meta: 'contact.cfg', command: 'contact --help' },
    },
    about: {
      paragraphs: [
        'Développeur full stack, <span class="hl">8 ans</span> à construire des applications web, mobiles (<span class="hl">iOS &amp; Android</span>) et desktop — de l&rsquo;architecture à la production. Un dev qui <span class="green">pense produit, pas juste code</span>.',
        'Spécialisé en <span class="hl">Angular</span>, <span class="hl">Node.js</span> et <span class="hl">Flutter</span>. Je place l&rsquo;<span class="green">IA au cœur</span> de mon travail : dev agentique piloté avec <span class="hl">Claude Code</span> (structuré par un playbook d&rsquo;ingénierie, pas du «&nbsp;vibe-coding&nbsp;») et des produits LLM on-device &mdash; cf. <span class="green">Murmure</span>.',
        'Actuellement <span class="green">freelance</span> &mdash; missions récentes pour <span class="green">Agora Nova</span>, <span class="green">SNCF</span>, <span class="green">Leroy Merlin</span>. Passif <span class="hl">défense / aérospatial</span> en C++/Qt chez Silicom (CEA, Airbus).',
      ],
    },
    contact: {
      keys: {
        mail: 'mail',
        phone: 'tél',
        github: 'github',
        linkedin: 'linkedin',
        location: 'lieu',
      },
      locationValue:
        '<img src="/flag-fr.svg" alt="France" class="flag" /><img src="/flag-bzh.svg" alt="Bretagne" class="flag" /> · Remote OK',
      statusText: 'DISPONIBLE — ouvert aux nouveaux contrats',
    },
    keyhint: { lang: 'langue', scroll: 'défiler', jump: 'aller à' },
    boot: [
      { type: 'dim', text: 'CHARLES.OS BIOS  v2.4.1      © 1995—2026' },
      { type: 'dim', text: 'Initialisation de la carte mère...' },
      { type: 'plain', text: '> Lancement du POST [auto-test démarrage]                 [ OK ]' },
      { type: 'progress', label: '> Test mémoire       ', amount: 65536, unit: 'KO' },
      { type: 'plain', text: '> Détection clavier...                                    [ OK ]' },
      { type: 'plain', text: '> Initialisation affichage 80×24 phosphore ambré...       [ OK ]' },
      { type: 'plain', text: '> Montage de /usr/local/charles.cv                        [ OK ]' },
      { type: 'progress', label: '> Lecture secteurs   ', amount: 100, unit: '%' },
      { type: 'ok', text: '> SYSTÈME PRÊT — tapez help, ou défilez.' },
      { type: 'plain', text: '' },
    ],
  },
};
