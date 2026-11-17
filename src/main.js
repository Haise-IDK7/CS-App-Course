import './styles.css';
import { h, icon, norm } from './core/dom.js';
import { state, save, onChange } from './core/store.js';
import { LEAVES, COURSES, STAGES, STAGE_ORDER, DOCS, DOCS_ES, docInfo } from './data/curriculum.js';
import { viewHome, viewPlan, viewSection, viewTopics, sectionProgress } from './views/plan.js';
import { viewPlanner, viewProgress } from './views/planner.js';
import { viewDocs, viewDoc, viewGuide } from './views/docs.js';

const ROUTES = [
  [/^\/?$/, viewHome, 'inicio'],
  [/^\/plan$/, viewPlan, 'plan'],
  [/^\/seccion\/([\w-]+)$/, viewSection, 'plan'],
  [/^\/planificador$/, viewPlanner, 'planificador'],
  [/^\/temas$/, viewTopics, 'temas'],
  [/^\/docs$/, viewDocs, 'docs'],
  [/^\/doc\/(.+)$/, viewDoc, 'docs'],
  [/^\/guia$/, viewGuide, 'guia'],
  [/^\/progreso$/, viewProgress, 'progreso']
];
const NAV = [['inicio', '#/', 'Inicio', 'home'], ['guia', '#/guia', 'Cómo funciona', 'abc'], ['plan', '#/plan', 'Plan de estudios', 'check'], ['planificador', '#/planificador', 'Planificador', 'chart'], ['temas', '#/temas', 'Temas', 'cards'], ['docs', '#/docs', 'Documentos', 'book'], ['progreso', '#/progreso', 'Progreso', 'code']];

const app = document.getElementById('app');
const side = h('aside', { class: 'side', 'aria-label': 'Navegación' });
const page = h('main', { class: 'page', tabIndex: -1 });
const themeBtn = h('button', { class: 'iconbtn', 'aria-label': 'Cambiar entre tema claro y oscuro', onclick: toggleTheme });
app.append(h('div', { class: 'shell' }, side, h('div', { class: 'main' },
  h('div', { class: 'top' },
    h('button', { class: 'iconbtn menubtn', 'aria-label': 'Abrir el menú', html: icon('menu'), onclick: () => side.classList.toggle('open') }),
    h('button', { class: 'searchbtn', onclick: openSearch, html: `${icon('search')}<span>Buscar cursos, temas y documentos</span><kbd>Ctrl K</kbd>` }),
    h('span', { class: 'grow' }), themeBtn),
  page)));

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next; state.theme = next; save(); paintTheme();
}
function paintTheme() { themeBtn.innerHTML = icon(document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon'); }

function renderSide(active, sectionId) {
  side.textContent = '';
  side.append(
    h('a', { class: 'brand', href: '#/' }, h('img', { src: './icon.svg', alt: '' }), 'Guía CS'),
    h('nav', { class: 'nav', 'aria-label': 'Secciones' }, NAV.map(([key, href, label, ic]) => h('a', { href, 'aria-current': key === active ? 'page' : null, html: `${icon(ic)}<span>${label}</span>` }))),
    ...STAGE_ORDER.flatMap((st) => [
      h('h2', {}, STAGES[st].titulo),
      h('div', { class: 'nav' }, LEAVES.filter((s) => s.stage === st).map((s) => {
        const p = sectionProgress(s);
        return h('a', { href: `#/seccion/${s.id}`, 'aria-current': s.id === sectionId ? 'page' : null },
          h('span', { class: `tick${p.done === p.total && p.total ? ' on' : ''}` }), h('span', { style: { flex: 1 } }, s.es.t), h('span', { class: 'pct muted', style: { fontSize: '0.74rem' } }, `${p.done}/${p.total}`));
      }))
    ]));
}

let current = { key: 'inicio', section: null };
function route() {
  const raw = decodeURIComponent(location.hash.replace(/^#/, '')) || '/';
  const [path, query] = raw.split('?');
  const [m, view, key] = ROUTES.map(([re, v, k]) => [path.match(re), v, k]).find(([mm]) => mm) || [[''], viewHome, 'inicio'];
  current = { key, section: view === viewSection ? m[1] : null };
  renderSide(key, current.section);
  side.classList.remove('open');
  page.textContent = ''; page.className = 'page';
  try { view(page, ...m.slice(1), new URLSearchParams(query || '')); }
  catch (err) { console.error(err); page.append(h('p', {}, `No se pudo mostrar esta página: ${err.message}`)); }
  if (!query) window.scrollTo(0, 0);
}
onChange(() => renderSide(current.key, current.section));

// ---- Buscador ----
function searchIndex() {
  const items = [];
  for (const c of COURSES) items.push({ kind: 'Curso', title: c.name, sub: `${c.section.es.t}. ${c.desc}`, href: `#/seccion/${c.section.id}?c=${c.id}`, text: norm(`${c.name} ${c.desc}`) });
  for (const s of LEAVES) {
    items.push({ kind: 'Sección', title: s.es.t, sub: s.es.d, href: `#/seccion/${s.id}`, text: norm(`${s.es.t} ${s.title} ${s.es.d}`) });
    for (const t of s.temas) items.push({ kind: 'Tema', title: t.es, sub: `${t.en}, en ${s.es.t}`, href: `#/seccion/${s.id}`, text: norm(`${t.es} ${t.en}`) });
  }
  for (const path of Object.keys(DOCS)) { const d = docInfo(path); items.push({ kind: 'Documento', title: d.titulo, sub: d.desc, href: `#/doc/${path}`, text: norm(`${d.titulo} ${d.desc} ${DOCS_ES[path] || ''} ${DOCS[path]}`) }); }
  return items;
}
let index = null;
function openSearch() {
  if (document.querySelector('.overlay')) return;
  index ??= searchIndex();
  const input = h('input', { type: 'search', placeholder: 'Por ejemplo: grafos, sistemas operativos, SQL', 'aria-label': 'Buscar' });
  const list = h('ul');
  const overlay = h('div', { class: 'overlay', onclick: (e) => { if (e.target === overlay) close(); } }, h('div', { class: 'palette', role: 'dialog', 'aria-label': 'Buscador' }, input, list));
  let act = 0, results = [];
  const close = () => overlay.remove();
  const paint = () => {
    list.textContent = '';
    if (!results.length) { list.append(h('li', { class: 'empty' }, input.value.trim().length > 1 ? 'Sin resultados. Prueba con el término en inglés.' : 'Escribe al menos dos letras.')); return; }
    results.forEach((r, i) => list.append(h('li', {}, h('a', { href: r.href, class: i === act ? 'act' : '', onclick: close }, `${r.title} `, h('span', { class: 'pill' }, r.kind), h('small', {}, r.sub.slice(0, 140))))));
  };
  input.addEventListener('input', () => {
    const words = norm(input.value).split(/\s+/).filter((w) => w.length > 1);
    results = !words.length ? [] : index.map((it) => ({ it, score: words.every((w) => it.text.includes(w)) ? words.reduce((s, w) => s + (norm(it.title).includes(w) ? 10 : 1), it.kind === 'Curso' ? 2 : 0) : 0 })).filter((r) => r.score).sort((a, b) => b.score - a.score).slice(0, 12).map((r) => r.it);
    act = 0; paint();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowDown') { act = Math.min(results.length - 1, act + 1); paint(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { act = Math.max(0, act - 1); paint(); e.preventDefault(); }
    else if (e.key === 'Enter' && results[act]) { location.hash = results[act].href; close(); }
  });
  document.body.append(overlay); paint(); input.focus();
}
window.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); } });

window.addEventListener('hashchange', route);
paintTheme();
route();
