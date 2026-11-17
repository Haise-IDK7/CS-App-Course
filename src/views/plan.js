import { h } from '../core/dom.js';
import { state, save, cycle } from '../core/store.js';
import { LEAVES, SECTIONS, STAGES, STAGE_ORDER, COURSES, sectionById, planCourses, prereqEs, hoursOf } from '../data/curriculum.js';

const LABEL = { undefined: 'Pendiente', doing: 'En curso', done: 'Completado' };
const fmtH = (n) => `${Math.round(n)} h`;

export function sectionProgress(s) {
  const group = s.courses.filter((c) => c.group === 'elige-uno');
  // en un grupo «elige uno» basta con completar un curso
  const counted = s.courses.filter((c) => c.group !== 'elige-uno');
  const total = counted.length + (group.length ? 1 : 0);
  const done = counted.filter((c) => state.status[c.id] === 'done').length + (group.some((c) => state.status[c.id] === 'done') ? 1 : 0);
  return { done, total };
}

function statusButton(c, onChange) {
  const st = state.status[c.id];
  const b = h('button', { class: `st ${st || ''}`, title: `${LABEL[st]}. Clic para cambiar de estado`, 'aria-label': `${c.name}: ${LABEL[st]}. Cambiar estado`, onclick: () => { cycle(c.id); onChange(); } }, st === 'done' ? '✓' : st === 'doing' ? '…' : '');
  return b;
}

// Fila de curso. full = con descripción, prerrequisitos, enlaces y apuntes.
export function courseRow(c, { full = false, repaint }) {
  const st = state.status[c.id];
  const linkOut = (l, text) => h('a', { class: 'chip', href: l.url, target: '_blank', rel: 'noopener' }, text || l.text);
  const meta = [];
  if (full) {
    if (c.prerequisites) meta.push(h('span', { class: 'pill' }, `Requiere: ${prereqEs(c.prerequisites.text)}`));
    if (c.doc) meta.push(h('a', { class: 'chip', href: `#/doc/${c.doc}` }, 'Guía de OSSU para este curso'));
    c.alternatives.forEach((a, i) => meta.push(linkOut(a, c.alternatives.length > 1 ? `Alternativa ${i + 1}` : 'Alternativa')));
    c.chat.forEach((l) => meta.push(linkOut(l, l.text === 'chat' ? 'Canal de Discord' : `Discord: ${l.text}`)));
    c.prerequisites?.links.forEach((l) => meta.push(linkOut(l, `Prerrequisito: ${l.text}`)));
    c.notes?.links.forEach((l) => meta.push(linkOut(l)));
  }
  const notes = full ? h('textarea', { class: 'notes', style: { minHeight: '3.2rem', marginTop: '0.5rem', fontSize: '0.9rem' }, placeholder: 'Tus apuntes de este curso (se guardan solos)', value: state.notes[c.id] || '', 'aria-label': `Apuntes de ${c.name}` }) : null;
  if (notes) { let t; notes.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { if (notes.value) state.notes[c.id] = notes.value; else delete state.notes[c.id]; save(); }, 400); }); }
  const title = c.doc ? h('a', { href: `#/doc/${c.doc}` }, c.name) : h('a', { href: c.url, target: '_blank', rel: 'noopener' }, c.name);
  return h('li', { class: `course ${st || ''}`, id: `c-${c.id}` },
    statusButton(c, repaint),
    h('div', {}, h('h4', {}, title), full && c.desc ? h('p', {}, c.desc) : null,
      full && c.notes && !c.notes.links.length ? h('p', {}, `Nota de OSSU: ${c.notes.text}`) : null,
      meta.length ? h('div', { class: 'meta' }, meta) : null, notes),
    h('div', { class: 'right' }, c.duration ? h('div', {}, c.duration.replace('weeks', 'semanas').replace('months', 'meses')) : h('div', {}, 'a tu ritmo'), c.effort ? h('div', {}, c.effort.replace('hours/week', 'h/semana')) : null,
      c.hours ? h('div', {}, `≈ ${c.hours} h`) : null, st === 'done' && state.dates[c.id] ? h('div', { style: { color: 'var(--ok)' } }, state.dates[c.id]) : null));
}

function courseList(s, opts) {
  const ul = h('ul', { class: 'courses' });
  let noted = false;
  for (const c of s.courses) {
    if (c.group === 'elige-uno' && !noted) { ul.append(h('li', { class: 'group-note' }, 'Elige uno de los dos cursos siguientes: basta con completar uno.')); noted = true; }
    ul.append(courseRow(c, opts));
  }
  return ul;
}

export function viewHome(page) {
  const paint = () => {
    page.textContent = '';
    const plan = planCourses(state.plan);
    const done = plan.filter((c) => state.status[c.id] === 'done'), doing = COURSES.filter((c) => state.status[c.id] === 'doing');
    const hTot = plan.reduce((s, c) => s + hoursOf(c), 0), hDone = done.reduce((s, c) => s + hoursOf(c), 0);
    const next = plan.find((c) => !state.status[c.id]);
    const started = Object.keys(state.status).length > 0;
    page.append(
      h('section', { style: { marginBottom: '1.5rem' } },
        h('h1', { style: { fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)', fontWeight: 700, letterSpacing: '-0.02em', maxWidth: '46rem' } }, 'Tu ruta por las ciencias de la computación'),
        h('p', { class: 'muted', style: { fontFamily: 'var(--read)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '44rem' } }, `El plan de estudios abierto de OSSU, equivalente a un grado universitario: ${COURSES.length} cursos gratuitos de universidades como MIT, Stanford y Harvard, ordenados y con sus prerrequisitos. Marca lo que completas y la app calcula cuánto te falta.`),
        h('div', { class: 'row' }, h('a', { class: 'btn primary', href: next ? `#/seccion/${next.section.id}?c=${next.id}` : '#/plan' }, started ? 'Ir a tu siguiente curso' : 'Empezar por el primer curso'), h('a', { class: 'btn', href: '#/guia' }, 'Cómo funciona la ruta'))),
      h('div', { class: 'kpis' },
        h('div', { class: 'kpi' }, h('b', {}, `${done.length}/${plan.length}`), h('span', {}, 'cursos de tu plan completados')),
        h('div', { class: 'kpi' }, h('b', {}, `${hTot ? Math.round(100 * hDone / hTot) : 0} %`), h('span', {}, `del tiempo estimado (${fmtH(hDone)} de ${fmtH(hTot)})`)),
        h('div', { class: 'kpi' }, h('b', {}, doing.length), h('span', {}, 'cursos en marcha')),
        h('div', { class: 'kpi' }, h('b', {}, state.plan.hours), h('span', {}, 'horas por semana planificadas'))));
    if (doing.length) page.append(h('h2', { class: 'section-title' }, 'En curso'), h('ul', { class: 'courses' }, doing.map((c) => courseRow(c, { repaint: paint }))));
    else if (next) page.append(h('h2', { class: 'section-title' }, 'Tu siguiente curso'), h('ul', { class: 'courses' }, courseRow(next, { full: true, repaint: paint })));
    page.append(h('h2', { class: 'section-title' }, 'Las cuatro etapas'),
      h('ol', { class: 'route' }, STAGE_ORDER.map((st, i) => {
        const secs = LEAVES.filter((s) => s.stage === st), p = secs.map(sectionProgress).reduce((a, b) => ({ done: a.done + b.done, total: a.total + b.total }), { done: 0, total: 0 });
        return h('li', { class: p.done === p.total ? 'done' : p.done ? 'part' : '' }, h('span', { class: 'n' }, String(i + 1).padStart(2, '0')),
          h('div', {}, h('h3', {}, h('a', { href: `#/seccion/${secs[0].id}` }, STAGES[st].titulo)), h('p', {}, STAGES[st].desc),
            h('div', { class: 'chips', style: { marginTop: '0.5rem' } }, secs.map((s) => h('a', { class: 'chip', href: `#/seccion/${s.id}` }, s.es.t)))),
          h('div', { style: { paddingTop: '0.5rem' } }, h('div', { class: 'bar', title: `${p.done} de ${p.total}` }, h('i', { style: { width: `${p.total ? 100 * p.done / p.total : 0}%` } }))));
      })));
  };
  paint();
}

export function viewPlan(page) {
  const paint = () => {
    const y = window.scrollY;
    page.textContent = '';
    page.append(h('h1', { style: { fontSize: '2rem' } }, 'Plan de estudios'),
      h('p', { class: 'muted', style: { maxWidth: '46rem' } }, 'Todos los cursos, en el orden recomendado. Pulsa el círculo de un curso para marcarlo «en curso» y otra vez para «completado». Entra en una sección para ver descripciones, prerrequisitos, enlaces y tus apuntes.'));
    for (const st of STAGE_ORDER) {
      const intro = SECTIONS.find((s) => s.stage === st && s.container);
      page.append(h('div', { class: 'stage-title' }, h('h2', {}, STAGES[st].titulo), h('span', { class: 'muted' }, STAGES[st].desc)));
      for (const s of LEAVES.filter((x) => x.stage === st)) {
        const p = sectionProgress(s), hrs = s.courses.reduce((a, c) => a + hoursOf(c), 0);
        if (st !== 'intro' && st !== 'final') page.append(h('h3', { style: { fontSize: '1.05rem', margin: '1.3rem 0 0' } }, h('a', { href: `#/seccion/${s.id}`, style: { color: 'var(--ink)' } }, s.es.t), ' ', h('span', { class: 'pill' }, `${p.done}/${p.total}`), ' ', h('span', { class: 'pill' }, `≈ ${hrs} h`)));
        page.append(courseList(s, { repaint: paint }));
      }
      void intro;
    }
    window.scrollTo(0, y);
  };
  paint();
}

export function viewSection(page, id, query) {
  const s = sectionById(id);
  if (!s) { page.append(h('p', {}, 'Esa sección no existe. ', h('a', { href: '#/plan' }, 'Ver el plan completo'))); return; }
  const i = LEAVES.indexOf(s), prev = LEAVES[i - 1], next = LEAVES[i + 1];
  const paint = () => {
    const y = window.scrollY;
    page.textContent = '';
    const p = sectionProgress(s), hrs = s.courses.filter((c) => c.group !== 'elige-uno' || c === s.courses.find((x) => x.group)).reduce((a, c) => a + hoursOf(c), 0);
    page.append(
      h('p', { class: 'crumbs' }, h('a', { href: '#/plan' }, 'Plan de estudios'), ` / ${STAGES[s.stage].titulo}`),
      h('header', { class: 'lesson-head' }, h('h1', {}, s.es.t), h('div', { class: 'row meta' }, h('span', { class: 'pill' }, s.title), h('span', { class: `pill${p.done === p.total ? ' ok' : ''}` }, `${p.done} de ${p.total} completados`), s.stage !== 'final' ? h('span', { class: 'pill' }, `≈ ${hrs} horas`) : null, h('span', { class: 'pill amber' }, s.stage === 'core' || s.stage === 'intro' ? 'Obligatoria' : s.stage === 'advanced' ? 'Optativa' : 'Elige un proyecto'))),
      h('p', { style: { fontFamily: 'var(--read)', fontSize: '1.08rem', lineHeight: 1.65, maxWidth: '46rem' } }, s.es.d));
    if (s.es.o.length) page.append(h('h2', { class: 'section-title', style: { fontSize: '1.1rem' } }, 'Al terminar sabrás'), h('ul', { style: { maxWidth: '46rem', lineHeight: 1.6 } }, s.es.o.map((o) => h('li', {}, o))));
    if (s.temas.length) page.append(h('h2', { class: 'section-title', style: { fontSize: '1.1rem' } }, 'Temas que cubre'), h('div', { class: 'chips' }, s.temas.map((t) => h('span', { class: 'chip', title: t.en }, t.es))));
    page.append(h('h2', { class: 'section-title', style: { fontSize: '1.1rem' } }, 'Cursos'), courseList(s, { full: true, repaint: paint }));
    for (const f of s.footnotes) page.append(h('p', { class: 'muted', style: { fontSize: '0.86rem' } }, f.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')));
    page.append(h('nav', { class: 'lesson-nav' }, prev ? h('a', { class: 'btn', href: `#/seccion/${prev.id}` }, `Anterior: ${prev.es.t}`) : h('span'), next ? h('a', { class: 'btn primary', href: `#/seccion/${next.id}` }, `Siguiente: ${next.es.t}`) : h('a', { class: 'btn primary', href: '#/progreso' }, 'Ver tu progreso')));
    window.scrollTo(0, y);
  };
  paint();
  const target = query?.get('c');
  if (target) requestAnimationFrame(() => { const el = document.getElementById(`c-${target}`); if (el) { el.scrollIntoView({ block: 'center' }); el.style.background = 'var(--amber-soft)'; } });
}

export function viewTopics(page) {
  const input = h('input', { class: 'field', type: 'search', placeholder: 'Filtrar temas, en español o en inglés', 'aria-label': 'Filtrar temas' });
  const box = h('div');
  const paint = () => {
    const q = input.value.trim().toLowerCase();
    box.textContent = '';
    for (const s of LEAVES.filter((x) => x.temas.length)) {
      const hits = s.temas.filter((t) => !q || t.es.toLowerCase().includes(q) || t.en.toLowerCase().includes(q));
      if (!hits.length) continue;
      box.append(h('h2', { class: 'section-title', style: { fontSize: '1.1rem' } }, h('a', { href: `#/seccion/${s.id}`, style: { color: 'var(--ink)' } }, s.es.t), ' ', h('span', { class: 'pill' }, STAGES[s.stage].titulo)),
        h('div', { class: 'chips' }, hits.map((t) => h('a', { class: 'chip', href: `#/seccion/${s.id}`, title: t.en }, t.es))));
    }
    if (!box.childNodes.length) box.append(h('p', { class: 'muted' }, 'Ningún tema coincide. Prueba el buscador general (Ctrl K), que también mira dentro de los documentos.'));
  };
  input.addEventListener('input', paint);
  page.append(h('h1', { style: { fontSize: '2rem' } }, 'Temas'), h('p', { class: 'muted', style: { maxWidth: '46rem' } }, 'Qué se estudia en cada sección. Sirve para localizar dónde se cubre un tema concreto o para comprobar qué te falta. Pasa el cursor por un tema para ver su nombre en inglés.'), input, box);
  paint();
}
