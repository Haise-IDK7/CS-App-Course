# Systematic Program Design

Este curso lo ha desarrollado la UBC (University of British Columbia) y está disponible en edX. Te recomendamos hacerlo con la versión archivada de edX.

> Este curso de programación tiene un enfoque singular: se centra en aprender un método sistemático de programación y no un lenguaje de programación. Este enfoque práctico te ayudará a encauzar tu creatividad para que puedas programar bien en cualquier lenguaje.

**Enlace al curso (recomendado):**

- <https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015>
- <https://learning.edx.org/course/course-v1:UBCx+SPD2x+2T2015>
- <https://learning.edx.org/course/course-v1:UBCx+SPD3x+3T2015>


Enlaces alternativos:

- <https://www.edx.org/learn/coding/university-of-british-columbia-how-to-code-simple-data> (hasta la semana 6A)
- <https://www.edx.org/learn/coding/university-of-british-columbia-how-to-code-complex-data> (de la semana 6B en adelante)

Consulta las preguntas frecuentes de más abajo para saber por qué hay distintas versiones del curso.

## Instrucciones

**Nota:** estas instrucciones son para la versión archivada del curso en edX, que es la que recomendamos. No se aplican a otras versiones del curso.

- El curso no tiene página de inicio en edX, pero no te preocupes. Abre el [enlace](https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015) indicado arriba, inicia sesión (si no la has iniciado) y después inscríbete en el curso.
- Avanza de la semana 1A a la semana 6A tal como aparecen en el resumen del curso. Mira los vídeos, haz los ejercicios y después resuelve los problemas del banco de problemas.
- Cuando completes la semana 6A, haz el proyecto Space Invaders con [estas instrucciones](./space-invaders-instructions.md).
- Después, avanza de la semana 6B en adelante. Mira los vídeos, haz los ejercicios y después resuelve los problemas del banco de problemas.
- Luego, mira los vídeos adicionales de [esta lista de reproducción](https://www.youtube.com/playlist?list=PL6NenTZG6KrqdcyTwGf09uBxjI5pbXuT7).
- Cuando completes todos los módulos del curso, haz el [problema TA solver](https://github.com/ossu/spd-starters/blob/main/final/ta-solver-starter.rkt). Encontrarás las instrucciones en el archivo inicial.
- La pestaña del banco de problemas tiene muchos problemas adicionales. Te sugerimos resolverlos todos para afianzar lo que has entendido.
- Algunos enlaces a los archivos iniciales del curso ya no funcionan. Puedes descargar los archivos iniciales desde este repositorio de GitHub: <https://github.com/ossu/spd-starters>. Puedes descargar un archivo zip con todos los archivos iniciales con [este enlace](https://github.com/ossu/spd-starters/archive/refs/heads/main.zip).
- No podrás enviar tus respuestas de los ejercicios, pero puedes ver las soluciones haciendo clic en «Show Answer» (mostrar respuesta). Corrige tus respuestas con honestidad.
- No podrás enviar los problemas del banco de problemas, pero el curso ofrece soluciones de ejemplo. Puedes comparar tu solución con ellas.
- Aunque hay formas de hacer este curso con otros IDE, te sugerimos usar DrRacket, porque adaptar los archivos iniciales de los problemas a otros IDE no compensa el esfuerzo. 
- Si te atascas, no dudes en preguntar. Puedes unirte al chat de OSSU para este curso aquí:
  - Chat para las discusiones hasta la semana 6A: <https://discord.gg/RfqAmGJ>
  - Chat para las discusiones de la semana 6B en adelante: <https://discord.gg/kczJzpm>

## Notas

- DrRacket usa por defecto la notación más reciente `#true #false '()`. Puedes configurar DrRacket para que use la notación del curso haciendo clic en la barra de menús, en Language > Choose Language. Después elige el lenguaje necesario (BSL, ISL u otras variantes). Luego haz clic en «Show details», abajo a la izquierda de la ventana. Después elige `true false empty` en el campo «Constant Style». Vuelve a ejecutar tu archivo para asegurarte de que usa la nueva configuración.

<img src="change-dr-racket-notation.png" width="600" alt="Diálogo de selección de lenguaje de DrRacket" />

- Puedes activar el cierre automático de paréntesis, corchetes y comillas. En la barra de menús, haz clic en Edit > Preferences > pestaña Editing > subpestaña General Editing > marca la casilla «Enable automatic parentheses, square brackets, and quotes».

<img src="automatic-parentheses.png" width="600" alt="Activar el cierre automático de paréntesis" />

- Puedes usar Ctrl + I para volver a sangrar todo el archivo.

- Si usas Windows o Linux, usa Alt + Retroceso para borrar palabras completas.

- Si por algún motivo no puedes ver los vídeos en edX, puedes verlos en [este canal de YouTube](https://www.youtube.com/@systematicprogramdesign7962/playlists).

## Preguntas frecuentes

### Este curso es aburrido. ¿Puedo saltármelo?

**No.** Puede que al principio te parezca aburrido, pero te sugerimos completarlo. Es un gran curso y probablemente cambiará tu forma de pensar. Muchos estudiantes a los que al principio les pareció aburrido acabaron siendo fans del curso al terminarlo. Ten mucho cuidado: las primeras partes (sobre todo las reglas de cómo funciona la evaluación) son fundamentales para entender cómo funciona y se ejecuta el código durante el resto del curso.

### ¿Por qué se enseña este curso con BSL? ¿No tendría más sentido enseñarlo con un lenguaje estándar de la industria?

Es una decisión intencionada, y estos son los motivos:

1. Lisp es la lengua franca de los científicos de la computación, es decir, de los investigadores de algoritmos con doctorado. Hay motivos buenos y otros meramente históricos para ello, pero es un hecho, así que, si quieres leer artículos técnicos (*white papers*), vas a querer saber leer Lisp. BSL es una buena introducción y, sinceramente, una vez superas el infierno de los paréntesis y conoces cualquier Lisp, sabes leerlos todos.

2. Para la mayoría de las personas, este es el primer curso de su plan de estudios de ciencias de la computación que no gira en torno a enseñarte a usar un lenguaje. Porque el objetivo de las ciencias de la computación no es enseñarte un lenguaje. Ni enseñarte a programar. Ni enseñarte a ser ingeniero de software *full stack*. Las ciencias de la computación son una matemática aplicada de aplicación muy acotada, pero con usos prácticos muy amplios. Si quitas todos los matices, son matemáticas. Lo que significa que tienen ciertas reglas generales que son total y absolutamente independientes del lenguaje en que implementes.

Este curso usa un lenguaje didáctico, de usar y tirar, precisamente para que no te centres en el lenguaje, sino en lo que haces con él. No nos importa `public static void main` ni el estilo PEP8. Queremos ver formas de estructurar un programa en cualquier lenguaje. Así que no nos centramos en lo que hace único a Java ni en lo que hace único a Python, sino en lo que hace que el código sea mejor.

Puede parecer duro aprender un lenguaje nuevo solo para hacer este curso, pero BSL te libera de preocuparte por las reglas de estilo, los problemas en tiempo de ejecución, la compartimentación del código, la compilación o el entorno de programación. Es un regalo. Acéptalo. Los patrones de diseño ya son bastante difíciles.

### ¿Por qué hay distintas versiones del curso, HTC y SPD? ¿Por qué recomendáis la versión archivada?

Hay dos motivos por los que la gente hace estos cursos:

- El conocimiento
- El certificado

OSSU da por hecho que estás aquí por el conocimiento. Eso lo puedes obtener gratis. Si lo haces por el conocimiento, no necesitas entregar tus tareas. Solo necesitas hacerlas.

Si quieres el reconocimiento de haberlo hecho, entonces estás aquí por el certificado. El certificado no se puede obtener gratis. Hay que pagar por él.

No hay ningún motivo para entregar las tareas salvo que lo hagas por el certificado; y si es así, en realidad no puedes obtener un certificado del curso SPD (porque el curso ha caducado), así que estás en el sitio equivocado.

Si quieres un certificado, tienes que hacer How To Code y pagar por él.

Pero en OSSU no necesitas pagar por nada. Te sugerimos hacer SPD porque el acceso a la información es mejor (porque el curso ha caducado) y es más que suficiente para adquirir el conocimiento.

En resumen (TL;DR):

    Si lo haces por el conocimiento, haz SPD: es gratuito, pero está inactivo
    Si lo haces por el certificado, haz How To Code y paga por él: sigue siendo un curso activo

### ¿Puedo hacer este curso con otro lenguaje de programación?

Este curso está muy integrado con los lenguajes de programación que usa. Te sugerimos usar el lenguaje que indica el curso. Aunque los conceptos que aprendes en él se pueden aplicar en cualquier sitio, intentar hacer el curso con otro lenguaje no tiene mucho sentido y solo te hará perder el tiempo.

### ¿Puedo usar otro IDE? No me gusta DrRacket.

Los programas de este curso incrustan imágenes y bloques de texto enriquecido en el código, lo que significa que otros IDE no pueden abrir los archivos. Aunque es posible preparar los archivos iniciales para usarlos con otros IDE, para eso necesitas DrRacket, y el tiempo que te llevaría se aprovecha mejor aprendiendo los conceptos que enseña el curso.

### ¿Cómo pruebo funciones que deben devolver valores aleatorios?

Puedes usar `check-random` para probar esas funciones. Puedes [aprender más sobre ella aquí](https://docs.racket-lang.org/htdp-langs/beginner-abbr.html#(form._((lib._lang%2Fhtdp-beginner-abbr..rkt)._check-random))). La necesitarás para el proyecto Space Invaders.

## Créditos

Los archivos iniciales de los problemas y las instrucciones de Space Invaders se tomaron del curso [«Systematic Program Design» en edX](https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015), publicado con la licencia [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/).
