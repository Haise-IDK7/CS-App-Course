// Datos del plan de estudios, obtenidos del README incluido en fuente/ y enriquecidos con la capa en español.
import readme from '../../fuente/README.md?raw';
import { parseCurriculum, allCourses } from '../core/ossu.js';
import * as ES from './es.js';

const docFiles = import.meta.glob('../../fuente/**/*.md', { query: '?raw', import: 'default', eager: true });
const imgFiles = import.meta.glob('../../fuente/**/*.{png,webp,svg,ico}', { query: '?url', import: 'default', eager: true });
const strip = (k) => k.replace('../../fuente/', '');

export const DOCS = Object.fromEntries(Object.entries(docFiles).map(([k, v]) => [strip(k), v]));
export const ASSETS = Object.fromEntries(Object.entries(imgFiles).map(([k, v]) => [strip(k), v]));
export const docInfo = (path) => { const [t, d] = ES.DOCS[path] || [path, '']; return { path, titulo: t, desc: d }; };

export const SECTIONS = parseCurriculum(readme).map((s) => ({
  ...s,
  es: ES.SECTIONS[s.id] || { t: s.title, d: s.intro.join(' '), o: [] },
  temas: s.topics.map((t) => ({ en: t, es: ES.TOPICS[t] || t })),
  courses: s.courses.map((c) => ({ ...c, desc: ES.COURSES[c.id] || '', doc: c.local && DOCS[c.local] ? c.local : null }))
}));
export const STAGES = ES.STAGES;
export const STAGE_ORDER = ['intro', 'core', 'advanced', 'final'];
export const LEAVES = SECTIONS.filter((s) => !s.container);
export const COURSES = allCourses(LEAVES);
export const courseById = (id) => COURSES.find((c) => c.id === id);
export const sectionById = (id) => LEAVES.find((s) => s.id === id);
export const prereqEs = (t) => ES.PREREQ[t] || t;

// Cursos que cuentan para tu plan: introducción y núcleo completos (con una sola opción en los grupos «elige uno»),
// las especialidades avanzadas que elijas y los cursos de proyecto que elijas.
export function planCourses(plan) {
  const out = [];
  for (const s of LEAVES) {
    if (s.stage === 'advanced' && !plan.tracks.includes(s.id)) continue;
    const group = s.courses.filter((c) => c.group === 'elige-uno');
    const pick = group.find((c) => c.id === plan.pick[s.id]) || group[0];
    for (const c of s.courses) {
      if (c.group === 'elige-uno' && c !== pick) continue;
      if (s.stage === 'final' && !plan.finals.includes(c.id)) continue;
      out.push({ ...c, section: s });
    }
  }
  return out;
}

export const hoursOf = (c) => c.hours ?? 0;
