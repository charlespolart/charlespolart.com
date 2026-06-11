import type { Bilingual, SkillCategory } from './types';

export const skills: Bilingual<SkillCategory[]> = {
  en: [
    {
      key: 'frontend',
      label: 'front-end',
      items: [
        'Angular',
        'React',
        'Astro',
        'TypeScript',
        'JavaScript',
        'Flutter',
        'Riverpod',
        'Dart',
        'Tailwind CSS',
        'HTML5',
        'CSS3',
      ],
    },
    {
      key: 'backend',
      label: 'back-end',
      items: [
        'Node.js',
        'Bun',
        'Hono',
        'NestJS',
        'REST',
        'GraphQL',
        'Drizzle ORM',
        'Microservices',
      ],
    },
    {
      key: 'data-cloud',
      label: 'data & cloud',
      items: ['PostgreSQL', 'MySQL', 'Redis', 'AWS S3 / R2', 'Cloudflare', 'Firebase', 'Docker'],
    },
    {
      key: 'devops',
      label: 'devops & tools',
      items: ['Git', 'CI/CD', 'Vite', 'Caddy', 'Jest', 'Playwright', 'Agile/Scrum', 'TDD'],
    },
    {
      key: 'software',
      label: 'software dev',
      items: ['C++', 'C#', 'Qt', 'WPF'],
    },
  ],
  fr: [
    {
      key: 'frontend',
      label: 'front-end',
      items: [
        'Angular',
        'React',
        'Astro',
        'TypeScript',
        'JavaScript',
        'Flutter',
        'Riverpod',
        'Dart',
        'Tailwind CSS',
        'HTML5',
        'CSS3',
      ],
    },
    {
      key: 'backend',
      label: 'back-end',
      items: [
        'Node.js',
        'Bun',
        'Hono',
        'NestJS',
        'REST',
        'GraphQL',
        'Drizzle ORM',
        'Microservices',
      ],
    },
    {
      key: 'data-cloud',
      label: 'data & cloud',
      items: ['PostgreSQL', 'MySQL', 'Redis', 'AWS S3 / R2', 'Cloudflare', 'Firebase', 'Docker'],
    },
    {
      key: 'devops',
      label: 'devops & outils',
      items: ['Git', 'CI/CD', 'Vite', 'Caddy', 'Jest', 'Playwright', 'Agile/Scrum', 'TDD'],
    },
    {
      key: 'software',
      label: 'logiciel',
      items: ['C++', 'C#', 'Qt', 'WPF'],
    },
  ],
};
