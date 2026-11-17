# Guía CS

Aplicación de escritorio, en español, para seguir el plan de estudios de Ciencias de la Computación de [Open Source Society University (OSSU)](https://github.com/ossu/computer-science): una ruta de cursos gratuitos, de universidades como MIT, Stanford y Harvard, equivalente a un grado universitario.

La app toma toda la información del repositorio [Haise-IDK7/computer-science](https://github.com/Haise-IDK7/computer-science) (copia del de OSSU) y la convierte en una guía de aprendizaje con seguimiento del progreso.

## Descargar

| Sistema | Archivo |
|---|---|
| **Windows** | `Guia-CS-Instalador.exe` (instalador) o `Guia-CS-Portable.exe` (se ejecuta sin instalar) |
| Linux | `Guia-CS.AppImage` |
| macOS | `Guia-CS.dmg` |

Están en la página de [**Releases**](https://github.com/Haise-IDK7/CS-App-Course/releases/latest) del repositorio. Si todavía no hay ninguna versión publicada, consulta [Cómo publicar una versión](#cómo-publicar-una-versión).

**En Windows:** abre el instalador y sigue los pasos. Como el archivo no está firmado digitalmente, Windows mostrará «Windows protegió su PC»: pulsa **Más información** y luego **Ejecutar de todas formas**.

## Qué incluye

- **Plan de estudios completo:** 63 cursos en 15 secciones y 4 etapas (introducción, núcleo, avanzado y proyecto final), con duración, esfuerzo semanal, prerrequisitos, enlaces al curso, a sus alternativas y a su canal de Discord.
- **Todo en español:** descripción y objetivos de cada sección, una explicación de qué trata cada curso y los temas traducidos (con su nombre en inglés al pasar el cursor).
- **Seguimiento:** marca cada curso como pendiente, en curso o completado, con fecha y apuntes propios.
- **Planificador:** indica tus horas semanales y la app calcula la fecha estimada de cada curso y del final, según las especialidades avanzadas que elijas. Se actualiza con lo que completas.
- **Mapa de temas:** qué se estudia en cada sección, con filtro.
- **Los 21 documentos del repositorio**, completos y sin conexión: preguntas frecuentes, guías de cada curso (incluidos los proyectos de sistemas operativos), cursos y lecturas extra, directrices curriculares e historial de cambios. Todos **traducidos al español**, con un botón para ver el original en inglés. La traducción conserva los nombres de cursos y libros, el código, los comandos y los enlaces, incluidos los que llevan a una sección concreta de otro documento.
- **Buscador** (Ctrl K) de cursos, temas y documentos; tema claro y oscuro.
- **Exportación** del progreso como copia de seguridad, lista en Markdown (para publicarla en tu repositorio, como sugiere OSSU) u hoja de cálculo CSV.

Toda la app funciona sin conexión. Solo necesitan internet los enlaces a los cursos, que se abren en tu navegador.

## Ejecutarla desde el código

Necesitas [Node.js](https://nodejs.org/) 20 o posterior.

```bash
git clone https://github.com/Haise-IDK7/CS-App-Course.git
cd CS-App-Course
npm install
npm run desktop      # compila y abre la app de escritorio
npm run dist:win     # genera el instalador y el portable de Windows en release/
```

`npm run dev` la abre en el navegador, en http://localhost:5173.

## Cómo publicar una versión

1. En GitHub, ve a **Releases** y pulsa **Draft a new release**.
2. En **Choose a tag** escribe `v1.0.0` y elige **Create new tag**; pulsa **Publish release**.
3. El flujo **App de escritorio** de GitHub Actions construye los instaladores (unos 4 minutos) y los adjunta a esa versión.

Además, cada PR y cada cambio en `main` construyen los instaladores: aparecen como artefactos (`guia-cs-windows-latest`, etc.) en la ejecución correspondiente de **Actions > App de escritorio**. También puedes lanzarlo a mano con **Run workflow**.

## Mantener el plan al día

El plan no está escrito a mano en la app: se lee del README de OSSU guardado en `fuente/`. Las traducciones de los documentos están en `fuente-es/`, con la misma ruta que el original; `npm test` comprueba que cada traducción conserve los encabezados, enlaces, imágenes, tablas y bloques de código del original, y que no quede texto sin traducir. Si actualizas `fuente/`, las pruebas indicarán qué traducciones hay que revisar. Para actualizarlo:

```bash
git clone https://github.com/Haise-IDK7/computer-science.git ../computer-science
npm run sync -- ../computer-science
npm test
```

Las pruebas avisan si aparece una sección, un tema, un curso o un documento nuevo sin su texto en español; se añaden en `src/data/es.js`.

## Estructura

```
fuente/            copia de los documentos del repositorio de OSSU (licencia MIT)
fuente-es/         traducción al español de esos documentos (misma ruta que el original)
src/core/ossu.js   lee el README y lo convierte en secciones, temas y cursos
src/data/es.js     textos en español: secciones, objetivos, temas, cursos y resúmenes
src/guia.md        «Cómo funciona», adaptación al español de la introducción de OSSU
src/views/         pantallas: inicio, plan, secciones, planificador, temas, documentos, progreso
electron/          proceso principal de la app de escritorio
tests/             pruebas del lector del plan, fidelidad de las traducciones y prueba de humo en navegador
```

## Créditos y licencia

El plan de estudios y los documentos de `fuente/` son de Open Source Society University y sus colaboradores, bajo licencia MIT (`fuente/LICENSE`). El código de esta app se publica también bajo licencia MIT (`LICENSE`). Esta app no está afiliada a OSSU.
