// Render de los documentos Markdown del repositorio, con enlaces internos reescritos a rutas de la app.
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true, linkify: true });

// Identificadores de encabezado al estilo de GitHub, para que funcionen los enlaces «#seccion».
export const anchor = (text) => text.trim().toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s+/g, '-');
md.renderer.rules.heading_open = (tokens, idx, opts, env, self) => {
  tokens[idx].attrSet('id', 'h-' + anchor(tokens[idx + 1].content.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*`_]/g, '')));
  return self.renderToken(tokens, idx, opts);
};

// Resuelve una ruta relativa respecto a la carpeta del documento actual.
export function resolve(from, rel) {
  const parts = from.split('/').slice(0, -1);
  for (const seg of rel.split('/')) { if (seg === '..') parts.pop(); else if (seg && seg !== '.') parts.push(seg); }
  return parts.join('/');
}

// docPath: ruta del documento dentro de fuente/. has(path): ¿existe ese documento? asset(path): URL de una imagen incluida.
export function render(src, docPath, { has, asset }) {
  return md.render(src).replace(/(href|src)="([^"]+)"/g, (all, attr, url) => {
    if (url.startsWith('#/')) return all;
    if (/^(https?:|mailto:|data:)/.test(url)) return attr === 'href' ? `href="${url}" target="_blank" rel="noopener"` : all;
    const [path, hash] = url.split('#');
    if (attr === 'src') { const u = asset(resolve(docPath, path)); return u ? `src="${u}"` : all; }
    const target = path ? resolve(docPath, path.replace(/^\.\//, '')) : docPath;
    if (has(target)) return `href="#/doc/${target}${hash ? '?a=' + hash.toLowerCase() : ''}"`;
    const img = asset(target);
    return img ? `href="${img}" target="_blank"` : `href="https://github.com/ossu/computer-science/blob/master/${target}" target="_blank" rel="noopener"`;
  });
}

export const renderInline = (s) => md.renderInline(s).replace(/href="(https?:[^"]+)"/g, 'href="$1" target="_blank" rel="noopener"');
