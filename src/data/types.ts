export type Locale = 'en' | 'fr';

export type Bilingual<T> = Record<Locale, T>;

export interface Profile {
  name: string;
  role: string;
  roleAccent: string;
  location: string;
  freelance: string;
  remote: string;
  born: string;
  available: string;
  email: string;
  phone: string;
  github: string;
  githubUrl: string;
  linkedin: string;
  linkedinUrl: string;
}

export interface SkillCategory {
  key: string;
  label: string;
  items: string[];
}

export interface ExperienceItem {
  client?: string;
  project?: string;
  dates?: string;
  description: string;
}

export interface ExperienceEntry {
  id: string;
  title: string;
  company?: string;
  dateStart: string;
  dateEnd: string;
  tag?: string;
  items: ExperienceItem[];
}

export interface ProjectEntry {
  id: string;
  num: string;
  title: string;
  stack: string;
  meta: string;
  description: string;
  features?: string[];
  link?: string;
  linkLabel?: string;
  /** Public paths to screenshot files, e.g. ['/projects/kiwidiag/01.jpg']. */
  screenshots?: string[];
}

export interface ProjectGroups {
  work: ProjectEntry[];
  apps: ProjectEntry[];
  personal: ProjectEntry[];
}

export interface EducationEntry {
  dateStart: string;
  dateEnd: string;
  institution: string;
  degree: string;
}

export interface SectionMeta {
  title: string;
  meta: string;
  command: string;
}

export interface NavItem {
  id: string;
  label: string;
  num: string;
}

export interface UIStrings {
  nav: NavItem[];
  header: { developer: string; back: string };
  sections: {
    whoami: SectionMeta;
    about: SectionMeta;
    skills: SectionMeta;
    experience: SectionMeta;
    projects: SectionMeta;
    education: SectionMeta;
    contact: SectionMeta;
  };
  about: { paragraphs: string[] };
  contact: {
    keys: { mail: string; phone: string; github: string; linkedin: string; location: string };
    locationValue: string;
    statusText: string;
  };
  keyhint: { lang: string; scroll: string; jump: string };
  boot: BootLine[];
}

export interface BootLine {
  type: 'dim' | 'ok' | 'bright' | 'plain' | 'progress';
  text?: string;
  label?: string;
  amount?: number;
  unit?: string;
}
