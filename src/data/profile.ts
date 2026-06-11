import type { Bilingual, Profile } from './types';

export const profile: Bilingual<Profile> = {
  en: {
    name: 'Charles Polart',
    role: 'Full Stack Developer',
    roleAccent: 'Angular · Node · Flutter',
    location:
      '<img src="/flag-fr.svg" alt="France" class="flag" /><img src="/flag-bzh.svg" alt="Bretagne" class="flag" />',
    freelance: 'Freelance · 8 yrs',
    remote: 'Remote OK',
    born: 'Born 02 Mar 1995 · EN fluent · 中文 basics',
    available: 'AVAILABLE — open to new contracts',
    email: 'charles.polart@hotmail.fr',
    phone: '+33 6 27 75 77 15',
    github: 'github.com/charlespolart',
    githubUrl: 'https://github.com/charlespolart',
    linkedin: 'linkedin.com/in/charles-polart-638182170',
    linkedinUrl: 'https://linkedin.com/in/charles-polart-638182170',
  },
  fr: {
    name: 'Charles Polart',
    role: 'Développeur Full Stack',
    roleAccent: 'Angular · Node · Flutter',
    location:
      '<img src="/flag-fr.svg" alt="France" class="flag" /><img src="/flag-bzh.svg" alt="Bretagne" class="flag" />',
    freelance: 'Freelance · 8 ans',
    remote: 'Remote OK',
    born: 'Né le 02 Mars 1995 · Anglais courant · 中文 notions',
    available: 'DISPONIBLE — ouvert aux nouveaux contrats',
    email: 'charles.polart@hotmail.fr',
    phone: '+33 6 27 75 77 15',
    github: 'github.com/charlespolart',
    githubUrl: 'https://github.com/charlespolart',
    linkedin: 'linkedin.com/in/charles-polart-638182170',
    linkedinUrl: 'https://linkedin.com/in/charles-polart-638182170',
  },
};
