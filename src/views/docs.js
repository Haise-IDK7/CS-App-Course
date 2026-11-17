import { h } from '../core/dom.js';
import { state, save } from '../core/store.js';
import { DOCS, DOCS_ES, ASSETS, docInfo } from '../data/curriculum.js';
import { render, headingAnchors } from '../core/md.js';
import guia from '../guia.md?raw';

const ctx = { has: (p) => p in DOCS, asset: (p) => ASSETS[p] };
const GROUPS = [
  ['Sobre el plan', ['FAQ.md', 'HELP.md', 'CURRICULAR_GUIDELINES.md', 'CONTRIBUTING.md', 'CHANGELOG.md', 'README.md']],
  ['Guías de cursos', Object.keys(DOCS).filter((p) => p.startsWith('coursepages/')).sort((a, b) => (a.endsWith('README.md') ? 0 : 1) - (b.endsWith('README.md') ? 0 : 1) || a.localeCompare(b))],
  ['Material extra', Object.keys(DOCS).filter((p) => p.startsWith('extras/')).sort()]
];

export function viewDocs(page) {
  page.append(h('h1', { style: { fontSize: '2rem' } }, 'Documentos'),
    h('p', { class: 'muted', style: { maxWidth: '46rem' } }, `Los ${Object.keys(DOCS).length} documentos del repositorio de OSSU, traducidos al español y disponibles sin conexión. En cada uno puedes cambiar al texto original en inglés.`));
  for (const [title, paths] of GROUPS) {
    page.append(h('h2', { class: 'section-title' }, title), h('div', { class: 'tiles' }, paths.filter((p) => p in DOCS).map((p) => { const d = docInfo(p); return h('a', { class: 'tile', href: `#/doc/${p}` }, h('h3', {}, d.titulo), h('p', {}, d.desc)); })));
  }
}

export function viewDoc(page, path, query) {
  page.classList.add('narrow');
  if (!(path in DOCS)) { page.append(h('p', {}, 'Ese documento no existe. ', h('a', { href: '#/docs' }, 'Ver todos los documentos'))); return; }
  const d = docInfo(path);
  const hasEs = path in DOCS_ES;
  const article = h('article', { class: 'prose' });
  const toggle = h('button', { class: 'btn ghost', type: 'button' });
  const note = h('span', {});
  const paint = () => {
    const es = hasEs && state.docLang !== 'en';
    article.lang = es ? 'es' : 'en';
    article.innerHTML = es ? render(DOCS_ES[path], path, ctx, headingAnchors(DOCS[path])) : render(DOCS[path], path, ctx);
    note.textContent = es ? 'Traducción al español del documento de OSSU. ' : 'Texto original en inglés. ';
    toggle.textContent = es ? 'Ver original en inglés' : 'Ver traducción al español';
    toggle.hidden = !hasEs;
  };
  toggle.onclick = () => { state.docLang = state.docLang === 'en' ? 'es' : 'en'; save(); paint(); };
  paint();
  page.append(h('p', { class: 'crumbs' }, h('a', { href: '#/docs' }, 'Documentos'), ` / ${d.titulo}`),
    h('div', { class: 'doc-en' }, h('b', {}, `${d.titulo}. `), d.desc, ' ', note,
      h('a', { href: `https://github.com/ossu/computer-science/blob/master/${path}`, target: '_blank', rel: 'noopener' }, 'Versión más reciente en GitHub'), ' ', toggle),
    article);
  const a = query?.get('a');
  if (a) requestAnimationFrame(() => document.getElementById(`h-${a}`)?.scrollIntoView({ block: 'start' }));
}

export function viewGuide(page) {
  page.classList.add('narrow');
  page.append(h('article', { class: 'prose', html: render(guia, 'guia.md', ctx) }));
}
