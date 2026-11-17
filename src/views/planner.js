import { h } from '../core/dom.js';
import { state, save, today, exportData, importData, resetAll } from '../core/store.js';
import { LEAVES, COURSES, STAGES, STAGE_ORDER, planCourses, hoursOf } from '../data/curriculum.js';
import { sectionProgress } from './plan.js';

const fmtDate = (d) => d.toLocaleDateString('es', { year: 'numeric', month: 'short', day: 'numeric' });
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + Math.round(n)); return x; };

// Calendario estimado: los cursos pendientes de tu plan, uno tras otro, al ritmo de horas semanales indicado.
export function schedule(plan) {
  const rows = [];
  let cursor = plan.start ? new Date(plan.start + 'T00:00:00') : new Date();
  const now = new Date(); if (cursor < now) cursor = now;
  for (const c of planCourses(plan)) {
    if (state.status[c.id] === 'done') { rows.push({ c, done: true }); continue; }
    const hrs = hoursOf(c), days = hrs / Math.max(1, plan.hours) * 7;
    const start = cursor, end = addDays(cursor, days);
    rows.push({ c, start, end, hrs, unknown: !c.hours });
    cursor = end;
  }
  return { rows, end: cursor };
}

function download(name, text, type) { const a = h('a', { href: URL.createObjectURL(new Blob([text], { type })), download: name }); a.click(); }

export function viewPlanner(page) {
  const p = state.plan;
  const paint = () => {
    const y = window.scrollY;
    page.textContent = '';
    const { rows, end } = schedule(p);
    const pending = rows.filter((r) => !r.done), hrs = pending.reduce((s, r) => s + r.hrs, 0), unknown = pending.filter((r) => r.unknown);
    const hoursOut = h('output', { style: { fontFamily: 'var(--mono)', color: 'var(--cobalt)' } }, `${p.hours} h/semana`);
    const range = h('input', { type: 'range', min: 2, max: 60, step: 1, value: p.hours, 'aria-label': 'Horas de estudio por semana' });
    range.addEventListener('input', () => { hoursOut.textContent = `${range.value} h/semana`; });
    range.addEventListener('change', () => { p.hours = +range.value; save(); paint(); });
    const date = h('input', { type: 'date', value: p.start || today(), 'aria-label': 'Fecha de inicio' });
    date.addEventListener('change', () => { p.start = date.value || null; save(); paint(); });
    const check = (label, on, toggle) => { const i = h('input', { type: 'checkbox', checked: on }); i.addEventListener('change', () => { toggle(i.checked); save(); paint(); }); return h('label', {}, i, h('span', {}, label)); };
    const toggleIn = (arr, id) => (v) => { const k = arr.indexOf(id); if (v && k < 0) arr.push(id); if (!v && k >= 0) arr.splice(k, 1); };
    const sec = LEAVES.find((s) => s.courses.some((c) => c.group === 'elige-uno'));
    const group = sec ? sec.courses.filter((c) => c.group === 'elige-uno') : [];

    page.append(
      h('h1', { style: { fontSize: '2rem' } }, 'Planificador'),
      h('p', { class: 'muted', style: { maxWidth: '46rem' } }, 'Calcula cuándo terminarías según tus horas de estudio. Usa la duración y el esfuerzo que OSSU indica para cada curso (el punto medio de cada rango) y descuenta lo que ya has completado. Es una estimación: tu ritmo real dependerá de tu experiencia previa.'),
      h('div', { class: 'form', style: { marginTop: '1rem' } },
        h('div', {}, h('label', {}, 'Horas de estudio por semana ', hoursOut), range),
        h('div', {}, h('label', {}, 'Fecha de inicio'), date),
        h('div', {}, h('label', {}, 'Especialidades avanzadas (optativas)'), h('div', { class: 'checks' }, LEAVES.filter((s) => s.stage === 'advanced').map((s) => check(`${s.es.t} (≈ ${s.courses.reduce((a, c) => a + hoursOf(c), 0)} h)`, p.tracks.includes(s.id), toggleIn(p.tracks, s.id))))),
        h('div', {}, h('label', {}, 'Cursos guiados para el proyecto final (opcionales)'), h('div', { class: 'checks' }, LEAVES.find((s) => s.stage === 'final').courses.map((c) => check(`${c.name} (≈ ${hoursOf(c)} h)`, p.finals.includes(c.id), toggleIn(p.finals, c.id))))),
        group.length ? h('div', {}, h('label', {}, `En ${sec.es.t}, elige uno`), h('div', { class: 'checks' }, group.map((c, i) => { const r = h('input', { type: 'radio', name: 'pick', checked: (p.pick[sec.id] || group[0].id) === c.id }); r.addEventListener('change', () => { p.pick[sec.id] = c.id; save(); paint(); }); return h('label', {}, r, h('span', {}, c.name)); }))) : null),
      h('div', { class: 'kpis' },
        h('div', { class: 'kpi' }, h('b', {}, pending.length), h('span', {}, 'cursos pendientes en tu plan')),
        h('div', { class: 'kpi' }, h('b', {}, `${Math.round(hrs)} h`), h('span', {}, 'de estudio estimadas')),
        h('div', { class: 'kpi' }, h('b', {}, `${(hrs / Math.max(1, p.hours) / 4.33).toFixed(1)}`), h('span', {}, 'meses a este ritmo')),
        h('div', { class: 'kpi' }, h('b', { style: { fontSize: '1.25rem' } }, pending.length ? fmtDate(end) : 'Completado'), h('span', {}, 'fecha estimada de fin'))));
    if (unknown.length) page.append(h('p', { class: 'muted', style: { fontSize: '0.88rem' } }, `Sin duración publicada, no entran en el cálculo: ${unknown.map((r) => r.c.name).join(', ')}.`));
    if (!p.tracks.length) page.append(h('p', { class: 'note idea', style: { maxWidth: '46rem' } }, 'Aún no has elegido ninguna especialidad avanzada, así que el cálculo cubre la introducción y el núcleo. OSSU recomienda escoger al menos una cuando termines el núcleo.'));

    const table = h('table', { class: 'tl' }, h('thead', {}, h('tr', {}, h('th', {}, 'Curso'), h('th', {}, 'Horas'), h('th', {}, 'Empieza'), h('th', {}, 'Termina'))));
    const body = h('tbody'); let last = null;
    for (const r of rows) {
      if (r.c.section !== last) { last = r.c.section; body.append(h('tr', { class: 'sec' }, h('td', { colSpan: 4 }, h('a', { href: `#/seccion/${last.id}`, style: { color: 'var(--ink)' } }, `${STAGES[last.stage].titulo}: ${last.es.t}`)))); }
      body.append(h('tr', {}, h('td', {}, r.c.name), h('td', { class: 'num' }, r.done ? '' : r.unknown ? '—' : Math.round(r.hrs)), r.done ? h('td', { colSpan: 2, style: { color: 'var(--ok)' } }, `Completado${state.dates[r.c.id] ? ' el ' + state.dates[r.c.id] : ''}`) : [h('td', { class: 'num' }, fmtDate(r.start)), h('td', { class: 'num' }, fmtDate(r.end))]));
    }
    table.append(body);
    page.append(h('h2', { class: 'section-title' }, 'Calendario estimado'), h('div', { style: { overflowX: 'auto' } }, table));
    window.scrollTo(0, y);
  };
  paint();
}

export function viewProgress(page) {
  const done = COURSES.filter((c) => state.status[c.id] === 'done'), doing = COURSES.filter((c) => state.status[c.id] === 'doing');
  const file = h('input', { type: 'file', accept: '.json,application/json', hidden: true }), msg = h('p', { class: 'muted', 'aria-live': 'polite' });
  file.addEventListener('change', async () => { try { importData(await file.files[0].text()); location.reload(); } catch (err) { msg.textContent = `No se pudo importar: ${err.message}`; } });
  // Lista de control en Markdown, como propone OSSU para mostrar el progreso en tu propio repositorio.
  const markdown = () => STAGE_ORDER.map((st) => `## ${STAGES[st].titulo}\n\n` + LEAVES.filter((s) => s.stage === st).map((s) => `### ${s.es.t}\n\n` + s.courses.map((c) => `- [${state.status[c.id] === 'done' ? 'x' : ' '}] ${c.name}${state.status[c.id] === 'done' ? ' ✅' + (state.dates[c.id] ? ` (${state.dates[c.id]})` : '') : state.status[c.id] === 'doing' ? ' (en curso)' : ''}`).join('\n')).join('\n\n')).join('\n\n');
  const csv = () => 'etapa;seccion;curso;estado;fecha;horas_estimadas\n' + COURSES.map((c) => [STAGES[c.section.stage].titulo, c.section.es.t, c.name, state.status[c.id] === 'done' ? 'completado' : state.status[c.id] === 'doing' ? 'en curso' : 'pendiente', state.dates[c.id] || '', c.hours ?? ''].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n');
  page.append(
    h('h1', { style: { fontSize: '2rem' } }, 'Progreso'),
    h('div', { class: 'kpis' },
      h('div', { class: 'kpi' }, h('b', {}, done.length), h('span', {}, `cursos completados de ${COURSES.length} en total`)),
      h('div', { class: 'kpi' }, h('b', {}, doing.length), h('span', {}, 'en curso')),
      h('div', { class: 'kpi' }, h('b', {}, `${done.reduce((s, c) => s + hoursOf(c), 0)} h`), h('span', {}, 'de estudio completadas (estimación)')),
      h('div', { class: 'kpi' }, h('b', {}, Object.keys(state.notes).length), h('span', {}, 'cursos con apuntes'))),
    h('h2', { class: 'section-title' }, 'Por sección'),
    h('ul', { class: 'list card' }, LEAVES.map((s) => { const p = sectionProgress(s); return h('li', {}, h('div', { class: 'grow' }, h('a', { href: `#/seccion/${s.id}`, style: { color: 'var(--ink)' } }, h('b', {}, s.es.t)), h('span', { class: 'muted' }, ` ${STAGES[s.stage].titulo}`), h('div', { class: 'bar', style: { marginTop: '0.4rem', maxWidth: '22rem' } }, h('i', { style: { width: `${p.total ? 100 * p.done / p.total : 0}%` } }))), h('span', { class: `pill${p.done === p.total ? ' ok' : ''}` }, `${p.done} de ${p.total}`)); })),
    done.length ? h('h2', { class: 'section-title' }, 'Completados') : null,
    done.length ? h('ul', { class: 'list card' }, [...done].sort((a, b) => (state.dates[b.id] || '').localeCompare(state.dates[a.id] || '')).map((c) => { const d = h('input', { type: 'date', value: state.dates[c.id] || '', 'aria-label': `Fecha de finalización de ${c.name}`, style: { padding: '0.25rem 0.4rem', border: '1px solid var(--rule)', borderRadius: '6px', background: 'var(--paper)' } }); d.addEventListener('change', () => { state.dates[c.id] = d.value; save(); }); return h('li', {}, h('span', { class: 'grow' }, c.name), d); })) : null,
    h('h2', { class: 'section-title' }, 'Exportar y copia de seguridad'),
    h('p', { class: 'muted', style: { maxWidth: '46rem' } }, 'Tu progreso y tus apuntes se guardan solo en este equipo. Exporta una copia para llevarla a otro equipo. La lista en Markdown sirve para publicar tu avance en tu propio repositorio, como sugiere OSSU.'),
    h('div', { class: 'row' },
      h('button', { class: 'btn', onclick: () => download('progreso-guia-cs.json', exportData(), 'application/json') }, 'Exportar copia de seguridad'),
      h('button', { class: 'btn', onclick: () => file.click() }, 'Importar copia'), file,
      h('button', { class: 'btn', onclick: () => download('progreso-ossu.md', markdown(), 'text/markdown') }, 'Exportar lista en Markdown'),
      h('button', { class: 'btn', onclick: () => download('progreso-ossu.csv', csv(), 'text/csv') }, 'Exportar hoja de cálculo (CSV)'),
      h('button', { class: 'btn', onclick: (e) => { if (e.target.dataset.sure) { resetAll(); location.reload(); } else { e.target.dataset.sure = 1; e.target.textContent = 'Pulsa otra vez para borrar todo'; } } }, 'Borrar todo el progreso')),
    msg);
}
