// Actualiza la carpeta fuente/ con una copia local del repositorio del plan de estudios.
// Uso: npm run sync -- ruta/al/repositorio/computer-science
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const src = process.argv[2];
if (!src || !existsSync(join(src, 'README.md'))) { console.error('Indica la ruta de una copia local del repositorio (debe contener README.md).'); process.exit(1); }
const dest = join(dirname(fileURLToPath(import.meta.url)), '..', 'fuente');
rmSync(dest, { recursive: true, force: true }); mkdirSync(dest, { recursive: true });
const keep = (p) => !/(^|[\\/])(\.git|\.github|_layouts|_includes|node_modules)([\\/]|$)/.test(p) && !/(_config\.yml|CNAME|\.gitignore)$/.test(p);
cpSync(src, dest, { recursive: true, filter: (p) => keep(p.slice(src.length)) });
console.log('fuente/ actualizada. Ejecuta npm test para comprobar que el plan se sigue leyendo bien.');
