import type { Bilingual, EducationEntry } from './types';

export const education: Bilingual<EducationEntry[]> = {
  en: [
    {
      dateStart: '2014',
      dateEnd: '2019',
      institution: 'Epitech, Rennes',
      degree: 'Expert in Information Technologies (Master)',
    },
    {
      dateStart: '2017',
      dateEnd: '2018',
      institution: 'Beijing Jiaotong University · 北京交通大学',
      degree: 'Exchange year — Beijing, China',
    },
  ],
  fr: [
    {
      dateStart: '2014',
      dateEnd: '2019',
      institution: 'Epitech, Rennes',
      degree: "Expert en Technologies de l'Information (Master)",
    },
    {
      dateStart: '2017',
      dateEnd: '2018',
      institution: 'Beijing Jiaotong University · 北京交通大学',
      degree: 'Échange universitaire — Pékin, Chine',
    },
  ],
};
