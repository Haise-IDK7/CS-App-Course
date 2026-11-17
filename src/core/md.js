// Render de los documentos Markdown del repositorio, con enlaces internos reescritos a rutas de la app.
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true, linkify: true });

// Identificadores de encabezado al estilo de GitHub, para que funcionen los enlaces «#seccion».
export const anchor = (text) => text.trim().toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s+/g, '-');
const headingText = (inline) => inline.content.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*`_]/g, '');
// Las traducciones conservan los identificadores del original: env.heads trae las anclas del documento en inglés,
// en el mismo orden, para que los enlaces «archivo.md#seccion» sigan llegando al encabezado correcto.
md.renderer.rules.heading_open = (tokens, idx, opts, env, self) => {
  const id = env.heads ? (env.heads[env.n++] ?? unique(env, anchor(headingText(tokens[idx + 1])))) : unique(env, anchor(headingText(tokens[idx + 1])));
  tokens[idx].attrSet('id', 'h-' + id);
  return self.renderToken(tokens, idx, opts);
};

// Como GitHub: si un encabezado repite el identificador de otro anterior, se le añade -1, -2…
function unique(env, id) {
  env.seen ??= {};
  const n = env.seen[id] ?? 0;
  env.seen[id] = n + 1;
  return n ? `${id}-${n}` : id;
}

// Anclas de los encabezados de un documento, en orden.
export const headingAnchors = (src) => { const env = {}; return md.parse(src, {}).flatMap((t, i, all) => (t.type === 'heading_open' ? [unique(env, anchor(headingText(all[i + 1])))] : [])); };

// Resuelve una ruta relativa respecto a la carpeta del documento actual.
export function resolve(from, rel) {
  // Una ruta que empieza por «/» es relativa a la raíz del repositorio, no a la carpeta del documento.
  const parts = rel.startsWith('/') ? [] : from.split('/').slice(0, -1);
  for (const seg of rel.split('/')) { if (seg === '..') parts.pop(); else if (seg && seg !== '.') parts.push(seg); }
  return parts.join('/');
}

// docPath: ruta del documento dentro de fuente/. has(path): ¿existe ese documento? asset(path): URL de una imagen incluida.
// heads (opcional): anclas del original, para documentos traducidos.
export function render(src, docPath, { has, asset }, heads = null) {
  return md.render(src, heads ? { heads, n: 0 } : {}).replace(/(href|src)="([^"]+)"/g, (all, attr, url) => {
    if (url.startsWith('#/')) return all;
    if (/^(https?:|mailto:|data:)/.test(url)) return attr === 'href' ? `href="${url}" target="_blank" rel="noopener"` : all;
    let [path, hash] = url.split('#');
    // Algunos enlaces del original escriben una ruta tras «#» (p. ej. «#extras/courses.md»): se tratan como ruta.
    if (!path && hash && /\.md$/i.test(hash)) { path = hash; hash = ''; }
    if (attr === 'src') { const u = asset(resolve(docPath, path)); return u ? `src="${u}"` : all; }
    const target = path ? resolve(docPath, path.replace(/^\.\//, '')) : docPath;
    if (has(target)) return `href="#/doc/${target}${hash ? '?a=' + hash.toLowerCase() : ''}"`;
    const img = asset(target);
    return img ? `href="${img}" target="_blank"` : `href="https://github.com/ossu/computer-science/blob/master/${target}" target="_blank" rel="noopener"`;
  });
}

export const renderInline = (s) => md.renderInline(s).replace(/href="(https?:[^"]+)"/g, 'href="$1" target="_blank" rel="noopener"');
