import type { Bilingual, SkillCategory } from './types';

export const skills: Bilingual<SkillCategory[]> = {
  en: [
    {
      key: 'frontend',
      label: 'front-end',
      items: [
        'Angular',
        'React',
        'React Native',
        'TypeScript',
        'JavaScript',
        'Flutter',
        'Dart',
        'HTML5',
        'CSS3',
      ],
    },
    {
      key: 'backend',
      label: 'back-end',
      items: ['Node.js', 'Bun', 'PHP', 'Symfony', 'REST', 'GraphQL', 'Microservices'],
    },
    {
      key: 'data-cloud',
      label: 'data & cloud',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'AWS', 'Docker'],
    },
    {
      key: 'devops',
      label: 'devops & tools',
      items: ['Git', 'CI/CD', 'Webpack', 'Jest', 'Agile/Scrum', 'TDD'],
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
        'React Native',
        'TypeScript',
        'JavaScript',
        'Flutter',
        'Dart',
        'HTML5',
        'CSS3',
      ],
    },
    {
      key: 'backend',
      label: 'back-end',
      items: ['Node.js', 'Bun', 'PHP', 'Symfony', 'REST', 'GraphQL', 'Microservices'],
    },
    {
      key: 'data-cloud',
      label: 'data & cloud',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'AWS', 'Docker'],
    },
    {
      key: 'devops',
      label: 'devops & outils',
      items: ['Git', 'CI/CD', 'Webpack', 'Jest', 'Agile/Scrum', 'TDD'],
    },
    {
      key: 'software',
      label: 'logiciel',
      items: ['C++', 'C#', 'Qt', 'WPF'],
    },
  ],
};
