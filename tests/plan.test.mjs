// El plan de estudios se obtiene leyendo el README de OSSU: estas pruebas avisan si su formato cambia.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseCurriculum, allCourses } from '../src/core/ossu.js';
import * as ES from '../src/data/es.js';

const root = new URL('..', import.meta.url).pathname;
const sections = parseCurriculum(readFileSync(join(root, 'fuente/README.md'), 'utf8'));
const leaves = sections.filter((s) => !s.container), courses = allCourses(leaves);

test('se leen todas las etapas, secciones y cursos', () => {
  assert.deepEqual([...new Set(sections.map((s) => s.stage))], ['intro', 'core', 'advanced', 'final']);
  assert.equal(leaves.length, 15);
  assert.equal(courses.length, 63);
  assert.equal(new Set(courses.map((c) => c.id)).size, courses.length, 'identificadores de curso repetidos');
  for (const c of courses) assert.ok(c.url, `curso sin enlace: ${c.name}`);
});

test('duraciones, esfuerzo y grupos', () => {
  const by = (id) => courses.find((c) => c.id === id);
  const spd = by('systematic-program-design');
  assert.equal(spd.weeks, 13); assert.deepEqual(spd.effortRange, [8, 10]); assert.equal(spd.hours, 117);
  assert.equal(by('operating-systems-three-easy-pieces').weeks, 11);
  assert.deepEqual(by('computer-networking-a-top-down-approach').effortRange, [4, 12]);
  assert.equal(Math.round(by('game-design-and-development-with-unity-2020-specialization').weeks), 26);
  assert.equal(by('essence-of-linear-algebra').hours, null);
  assert.equal(courses.filter((c) => c.group === 'elige-uno').length, 2);
  assert.equal(by('calculus-1a-differentiation').alternatives.length, 1);
  assert.equal(spd.chat.length, 2);
});

test('la capa en español cubre todo', () => {
  for (const s of leaves) { assert.ok(ES.SECTIONS[s.id], `sección sin traducir: ${s.id}`); for (const t of s.topics) assert.ok(ES.TOPICS[t], `tema sin traducir: ${t}`); }
  for (const c of courses) assert.ok(ES.COURSES[c.id], `curso sin descripción: ${c.id}`);
  for (const id of Object.keys(ES.COURSES)) assert.ok(courses.some((c) => c.id === id), `descripción de un curso que ya no existe: ${id}`);
});

test('documentos: cada uno tiene resumen y los enlaces locales de los cursos existen', () => {
  const walk = (d) => readdirSync(join(root, 'fuente', d), { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith('.md') ? [join(d, e.name)] : []));
  for (const p of walk('')) assert.ok(ES.DOCS[p], `documento sin resumen: ${p}`);
  for (const c of courses.filter((x) => x.local)) assert.ok(existsSync(join(root, 'fuente', c.local)), `falta ${c.local}`);
});
