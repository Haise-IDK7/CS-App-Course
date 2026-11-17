// Comprueba que cada traducción conserva la estructura del original: encabezados, enlaces, imágenes, código y tablas.
// Así una traducción no puede perder una sección, romper un enlace ni alterar un comando sin que falle la prueba.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true, linkify: true });
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const DOCS = walk('fuente').filter((p) => p.endsWith('.md')).map((p) => relative('fuente', p));

function shape(src) {
  const t = md.parse(src, {});
  const heads = [], links = [], imgs = [], code = [];
  let blocks = 0;
  let rows = 0;
  t.forEach((tok) => {
    if (tok.type === 'heading_open') heads.push(tok.tag);
    // Los bloques con ``` (código real) deben ser idénticos. Los bloques sangrados a veces contienen prosa
    // (por ejemplo, un resumen «TL;DR»), así que de esos solo se exige que haya los mismos.
    if (tok.type === 'fence') code.push(tok.content.trim());
    if (tok.type === 'code_block') blocks++;
    if (tok.type === 'tr_open') rows++;
    for (const c of tok.children || []) {
      if (c.type === 'link_open') links.push(c.attrGet('href'));
      if (c.type === 'image') imgs.push(c.attrGet('src'));
    }
  });
  const htmlLinks = [...src.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  return { heads, links: links.sort(), imgs: imgs.sort(), code, blocks, rows, htmlLinks: htmlLinks.sort() };
}

// Palabras funcionales del inglés que no deberían abundar en un texto traducido. Se excluyen el código, las URL
// y el texto de los enlaces, que suele ser el nombre propio (en inglés) de un curso o de un libro.
const EN = /\b(the|and|you|with|this|that|which|should|will|your|are|have)\b/gi;
const prose = (src) => src.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '').replace(/<[^>]+>/g, '').replace(/https?:\S+/g, '');

for (const doc of DOCS) {
  test(`traducción de ${doc}`, () => {
    const es = join('fuente-es', doc);
    assert.ok(existsSync(es), `falta la traducción ${es}`);
    const a = shape(readFileSync(join('fuente', doc), 'utf8')), b = shape(readFileSync(es, 'utf8'));
    assert.deepEqual(b.heads, a.heads, 'mismos encabezados (número y nivel)');
    assert.deepEqual(b.links, a.links, 'mismos enlaces');
    assert.deepEqual(b.imgs, a.imgs, 'mismas imágenes');
    assert.deepEqual(b.htmlLinks, a.htmlLinks, 'mismos enlaces HTML');
    assert.equal(b.rows, a.rows, 'mismas filas de tabla');
    assert.deepEqual(b.code, a.code, 'bloques de código idénticos');
    assert.equal(b.blocks, a.blocks, 'mismos bloques sangrados');
    const text = prose(readFileSync(es, 'utf8'));
    const words = text.split(/\s+/).filter(Boolean).length;
    const en = (text.match(EN) || []).length;
    assert.ok(en / Math.max(words, 1) < 0.02, `demasiado inglés sin traducir: ${en} de ${words} palabras`);
  });
}

// Los enlaces «documento.md#seccion» de las traducciones deben llegar a un encabezado que exista en el destino.
test('los enlaces con ancla de las traducciones llegan a su encabezado', async () => {
  const { render, headingAnchors } = await import('../src/core/md.js');
  const has = (p) => DOCS.includes(p);
  const rotos = [];
  for (const doc of DOCS) {
    const html = render(readFileSync(join('fuente-es', doc), 'utf8'), doc, { has, asset: () => null }, headingAnchors(readFileSync(join('fuente', doc), 'utf8')));
    for (const [, target, a] of html.matchAll(/href="#\/doc\/([^"?]+)\?a=([^"]+)"/g)) {
      if (!headingAnchors(readFileSync(join('fuente', target), 'utf8')).includes(a)) rotos.push(`${doc} -> ${target}#${a}`);
    }
  }
  assert.deepEqual(rotos, []);
});
