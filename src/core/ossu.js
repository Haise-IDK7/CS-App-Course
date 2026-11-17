// Convierte el README del plan de estudios de OSSU en datos: secciones, temas y cursos.
// Módulo puro (sin DOM): lo usan la app y las pruebas. Si el README cambia de versión, los datos cambian solos.

export const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const links = (cell) => [...cell.matchAll(LINK)].map((m) => ({ text: m[1], url: m[2] }));
const plain = (cell) => cell.replace(LINK, '$1').replace(/[*`]/g, '').trim();

// "13 weeks", "10-12 weeks", "6 months" -> semanas (media del rango); "-" -> null
function weeks(text) {
  const m = text.match(/([\d.]+)(?:\s*[-–]\s*([\d.]+))?\s*(week|month)/i);
  if (!m) return null;
  const v = (parseFloat(m[1]) + parseFloat(m[2] || m[1])) / 2;
  return /month/i.test(m[3]) ? v * 4.33 : v;
}
// "6-10 hours/week", "4–12 hours/week", "5 hours/week" -> [mín, máx]; "-" -> null
function effort(text) {
  const m = text.match(/([\d.]+)(?:\s*[-–]\s*([\d.]+))?\s*hours?\/week/i);
  return m ? [parseFloat(m[1]), parseFloat(m[2] || m[1])] : null;
}

function parseTable(lines, group) {
  const cells = (l) => l.split('|').map((c) => c.trim());
  const head = cells(lines[0]).map((h) => h.toLowerCase());
  const col = (name) => head.findIndex((h) => h.startsWith(name));
  const iDur = col('duration'), iEff = col('effort'), iPre = col('prerequisites'), iChat = col('discussion');
  const iNotes = head.findIndex((h) => h.startsWith('notes') || h.startsWith('additional'));
  return lines.slice(2).filter((l) => l.includes('|')).map((l) => {
    const c = cells(l), ls = links(c[0]);
    const name = ls[0]?.text ?? plain(c[0]);
    const dur = c[iDur] ?? '-', eff = c[iEff] ?? '-';
    const w = weeks(dur), e = effort(eff);
    return {
      id: slug(name), name, url: ls[0]?.url ?? null,
      local: ls[0] && !/^https?:/.test(ls[0].url) ? ls[0].url : null,
      alternatives: ls.slice(1),
      duration: dur === '-' ? null : dur, effort: eff === '-' ? null : eff,
      weeks: w, effortRange: e, hours: w && e ? Math.round(w * (e[0] + e[1]) / 2) : null,
      prerequisites: iPre >= 0 && c[iPre] && c[iPre] !== '-' ? { text: plain(c[iPre]), links: links(c[iPre]) } : null,
      notes: iNotes >= 0 && c[iNotes] && c[iNotes] !== '-' ? { text: plain(c[iNotes]), links: links(c[iNotes]) } : null,
      chat: iChat >= 0 ? links(c[iChat] || '') : [],
      group
    };
  });
}

const STAGES = { 'intro-cs': 'intro', 'core-cs': 'core', 'advanced-cs': 'advanced', 'final-project': 'final' };

export function parseCurriculum(readme) {
  const start = readme.indexOf('## Prerequisites'), end = readme.indexOf('## Congratulations');
  const lines = readme.slice(start, end).split('\n');
  const sections = [];
  let stage = null, cur = null, i = 0;
  const open = (title, level) => {
    const id = slug(title);
    if (level === 2) stage = STAGES[id] ?? null;
    cur = stage ? { id, title, stage, level, intro: [], topics: [], courses: [], footnotes: [] } : null;
    if (cur) sections.push(cur);
  };
  while (i < lines.length) {
    const l = lines[i];
    const h = l.match(/^(##|###)\s+(.*)$/);
    if (h) { open(h[2].trim(), h[1].length); i++; continue; }
    if (!cur) { i++; continue; }
    if (/^\*\*Topics covered\*\*/.test(l)) {
      i++;
      while (i < lines.length && /^`[^`]+`\s*$/.test(lines[i])) { const t = lines[i].trim().slice(1, -1); if (t !== 'and more') cur.topics.push(t); i++; }
      continue;
    }
    if (/^Courses\s*\|/.test(l)) {
      const block = [];
      while (i < lines.length && lines[i].includes('|')) block.push(lines[i++]);
      const prev = cur.courses.length ? cur.footnotes : cur.intro;
      const chooseOne = prev.length > 0 && /Choose \*\*one\*\*/.test(prev[prev.length - 1]);
      if (chooseOne) prev.pop();
      cur.courses.push(...parseTable(block, chooseOne ? 'elige-uno' : null));
      continue;
    }
    if (l.trim()) (cur.courses.length ? cur.footnotes : cur.intro).push(l.trim());
    i++;
  }
  // Las secciones «contenedor» (Core CS, Advanced CS) no tienen cursos propios: se marcan como cabeceras de etapa.
  for (const s of sections) s.container = s.level === 2 && !s.courses.length;
  return sections;
}

export const allCourses = (sections) => sections.flatMap((s) => s.courses.map((c) => ({ ...c, section: s })));
