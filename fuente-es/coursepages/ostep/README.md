# Operating Systems: Three Easy Pieces

El mérito es de [palladian](https://github.com/palladian1)
## Introducción

Para empezar, seamos francos: es realmente difícil encontrar un buen curso en línea autocontenido sobre sistemas operativos. OSTEP es el mejor curso que hemos encontrado hasta ahora. A continuación describimos dos formas de abordar el curso: un enfoque «básico», adecuado para la mayoría de los estudiantes, y un enfoque «ampliado», apropiado para quienes piensan especializarse en programación de sistemas.

El enfoque «básico» cubre todos los requisitos de nuestro plan de estudios en sistemas operativos y debería llevar unas 80 horas de trabajo.

El enfoque «ampliado» incluye todo el trabajo del enfoque básico y más. Implica aprender C y ensamblador x86 muy en serio, y profundizar en la programación del núcleo. Lleva bastante más tiempo (más de 200 horas) y es mucho más exigente. Para quienes se interesan por esta área de la computación, también es muy gratificante.

## Enfoque básico

1. Lee el libro de texto gratuito en línea Operating Systems: Three Easy Pieces.
2. Responde las preguntas de tarea al final de cada capítulo. (Hay un [repositorio de GitHub](https://github.com/remzi-arpacidusseau/ostep-homework) asociado para las tareas).

Esto debería llevar unas 8 semanas, a 10 horas por semana. ¡Es todo lo que necesitas hacer!

Necesitarás un sistema Unix/Linux, algunas herramientas básicas de línea de comandos y un compilador de C (como GCC o Clang). En Windows puedes instalar Ubuntu en una máquina virtual o usar WSL (Windows Subsystem for Linux, el subsistema de Windows para Linux). macOS es un sistema tipo Unix, así que debería servir.

### Enlaces del curso

* [Libro](https://pages.cs.wisc.edu/~remzi/OSTEP/)
* [Tareas](https://pages.cs.wisc.edu/~remzi/OSTEP/Homework/homework.html)
* [Repositorio con el código fuente de las tareas](https://github.com/remzi-arpacidusseau/ostep-homework)
* [Soluciones de las tareas](https://github.com/xxyzz/ostep-hw)

### C

**Pregunta**: veo algo de código C en este libro. ¿Cuánto C necesito saber?

**Respuesta**: tendrás que leer y entender algo de código C en este libro. Necesitarás entender lo básico de arreglos, punteros y formato de impresión. Puedes consultar el libro gratuito [Dive into Systems: capítulos 1 y 2](https://diveintosystems.org/book/C1-C_intro/index.html). Las [páginas del manual de CS50](https://manual.cs50.io) también son útiles para consultar funciones. No deberías dedicar demasiado tiempo a aprender C.

El código que leerás es bastante sencillo y se presenta en fragmentos cortos. El libro te ayuda bastante al presentar paso a paso muchas API de C, como la API de procesos, la API de hilos, etc. Puedes escribir, compilar y ejecutar los fragmentos de código y leer las explicaciones correspondientes. El libro los explica con mucho detalle y en un estilo cercano que se lee con gusto.

También escribirás un poco de código C. Solo una minoría de los capítulos (unos 10 de 50) te piden escribir algo de código C (los demás te piden ejecutar el código de simulación proporcionado y responder preguntas). Suelen ser programas en C sencillos y cortos que imitan el código presentado en ese capítulo, con pequeñas modificaciones.
Cuando estés listo para empezar las tareas, comienza por el [proyecto reverse](https://github.com/remzi-arpacidusseau/ostep-projects/tree/master/initial-reverse); será una buena prueba para ver si estás preparado para el resto de los proyectos. Para el resto de los proyectos de tarea, usa el enlace que aparece en los enlaces del curso.

Si te atascas con ellos, no les dediques demasiado tiempo. Hay un excelente conjunto de soluciones [aquí](https://github.com/xxyzz/ostep-hw). No hay ningún código de honor al respecto, así que puedes usar las soluciones con libertad. Si ves que estás dedicando demasiado tiempo, no dudes en leer y entender las soluciones. Tu prioridad principal debe ser entender los conceptos de los sistemas operativos, no dominar la programación en C.

## Enfoque ampliado

Si eliges esta opción, este será el primer curso del plan de OSSU para el que tendrás que aprender por tu cuenta algunos prerrequisitos antes de empezar, además de los cursos que lo preceden en el plan. También puede que tengas problemas al ejecutar los scripts de las demostraciones de las tareas y los que prueban tus soluciones de los proyectos (aunque esperamos haber resuelto ya la mayoría).

Dicho esto, si puedes dedicar el tiempo que exigen los prerrequisitos, creemos que la recompensa merece mucho la pena: este curso es apasionante, interesante y bastante útil para otros campos de las ciencias de la computación y la programación. Uno de sus grandes atractivos es la oportunidad de ver en acción un sistema operativo tipo Unix simplificado pero totalmente funcional, y de entender los conceptos y las decisiones de diseño que hay detrás, así como los detalles de implementación de bajo nivel.

Debes ver todos los videos de las clases o leer los capítulos 1 a 47 del libro de texto (tranquilo, los capítulos suelen tener solo unas pocas páginas), y además terminar los proyectos que se indican más abajo. También te animamos encarecidamente a hacer los ejercicios de tarea a medida que se asignan en el sitio web del curso o en los capítulos del libro; piensa en ellos como las preguntas de «comprueba lo que has entendido» que aparecen en mitad de los videos de las clases en sitios como Coursera o edX.

### Prerrequisitos

Esta asignatura exige mucha experiencia programando en C. Deberías terminar uno de los libros de C que aparecen en los [recursos de más abajo](#c-1) *antes* de empezar este curso; si intentas aprender C a la vez que el material del curso, es probable que te sientas desbordado. Si nunca has usado C, cuenta con dedicarle mucho tiempo; es difícil predecir cuánto le llevará a cada persona, pero una estimación aproximada podría ser de 8 a 10 horas semanales durante 3 a 5 semanas. Siempre puedes aprender C a la vez que haces otro curso de OSSU, o incluso rehacer en C los ejercicios de otros cursos para practicar.

También deberías terminar las dos partes de Nand2Tetris antes de empezar este curso. OSTEP se centra en las arquitecturas reales x86 y x86_64, así que tendrás que llenar algunas lagunas para trasladar a una arquitectura nueva los conceptos que aprendiste en Nand2Tetris. Puedes hacerlo con los recursos de x86 de más abajo, pero ten en cuenta que todos dan por hecho que sabes C, así que aprende C primero. Esto debería llevar unas 6 a 8 horas en total.

### Enlaces del curso

* [Sitio web del curso](https://pages.cs.wisc.edu/~remzi/Classes/537/Spring2018/)
* [Libro](https://pages.cs.wisc.edu/~remzi/OSTEP/)
* [Videos de las clases](https://pages.cs.wisc.edu/~remzi/Classes/537/Spring2018/Discussion/videos.html)
* [Tareas](https://pages.cs.wisc.edu/~remzi/OSTEP/Homework/homework.html)
* [Repositorio con el código fuente de las tareas](https://github.com/remzi-arpacidusseau/ostep-homework)
* [Soluciones de las tareas](https://github.com/xxyzz/ostep-hw)
* [Proyectos](https://github.com/remzi-arpacidusseau/ostep-projects)
* [xv6](https://github.com/mit-pdos/xv6-public)

### Hoja de ruta

Este curso lo impartió originalmente el autor del libro OSTEP en la Universidad de Wisconsin, como CS 537, así que los proyectos se asignan según los momentos más convenientes para que los estudiantes de esa universidad pudieran usar recursos del campus, como las sesiones de repaso y las tutorías. Eso significa que no coinciden perfectamente con el material que se está viendo en ese momento en las clases o en los capítulos del libro. Recomendamos hacer el curso en este orden:

[Orden de lectura](Reading-order.md)

* Lee los capítulos 1 y 2 del libro OSTEP y mira la primera mitad (la introducción) de la clase 1.
* Haz el proyecto `initial-utilities`; está pensado como prueba de fuego para asegurarte de que te manejas lo bastante bien con C antes de seguir esta asignatura. Puedes ver la sesión de discusión 1 como ayuda. Si tardas más de 2 horas en escribir el código (sin contar el tiempo de la sesión de discusión ni el que dediques a depurar), plantéate dedicar más tiempo a aprender C antes de avanzar en el curso. (Si quieres más práctica, también puedes hacer `initial-reverse`, pero no es obligatorio).
* Mira las clases 1 a 5 y lee los capítulos 3 a 24 del libro OSTEP. Recomendamos hacer las tareas a medida que aparecen en el calendario del curso o en los capítulos del libro.
* Mira la sesión de discusión 3 y vuelve a leer el capítulo 5; después haz el proyecto `processes-shell`.
* Lee la guía anotada de xv6 enlazada en la sección de recursos, más abajo, desde el principio hasta el final de la sección `System Calls: Processes`.
* Mira la sesión de discusión 2 y después haz el proyecto `initial-xv6`.
* Mira la sesión de discusión 5 y después haz el proyecto `scheduling-xv6-lottery`.
* Mira la sesión de discusión 7 y después haz el proyecto `vm-xv6-intro`.
* Mira las clases 6 a 9 (y, si quieres, la clase de repaso) y lee los capítulos 25 a 34; de nuevo, te animamos a hacer las tareas.
* Mira la sesión de discusión 10 y después haz el proyecto `concurrency-xv6-threads`.
* Mira las sesiones de discusión 11 y 12 y después haz el proyecto `concurrency-mapreduce`.
* Mira las clases 10 a 14 (y, si quieres, la segunda clase de repaso) y lee los capítulos 35 a 47; recuerda hacer las tareas a la par de las clases o los capítulos.
* Haz el proyecto `filesystems-checker`.

### Cómo ejecutar los proyectos

Este curso lo impartió originalmente el autor del libro OSTEP en la Universidad de Wisconsin, como CS 537, lo que significa que las tareas y los proyectos se escribieron pensando en esos estudiantes y se diseñaron para ejecutarse en los computadores de los laboratorios de esa universidad, con versiones concretas de software preinstaladas. Esperamos que esta sección resuelva eso para que puedas ejecutarlos en otros computadores, pero no lo hemos probado en todos, así que, si tienes otros problemas, avísanos en el [canal de Discord](https://discord.gg/MJ9YXyV) e intentaremos ayudarte.

Para ejecutar las tareas y los proyectos en Linux o macOS, necesitas tener instalados todos estos programas:

* `gcc`
* `gas`
* `ld`
* `gdb`
* `make`
* `objcopy`
* `objdump`
* `dd`
* `python`
* `perl`
* `gawk`
* `expect`
* `git`

También tendrás que instalar `qemu`, pero recomendamos usar la versión parcheada que proporcionan los autores de xv6; consulta [este enlace](https://pdos.csail.mit.edu/6.828/2018/tools.html) para más detalles.

En macOS tendrás que instalar un conjunto de compilación cruzada de `gcc` capaz de producir binarios ELF para x86; consulta también el enlace de arriba para más detalles.

En Windows puedes usar una máquina virtual con Linux para las tareas y los proyectos. Algunos de estos paquetes todavía no son compatibles con los computadores Apple M1, y el software de máquinas virtuales aún no se ha adaptado a la nueva arquitectura de procesador; algunos estudiantes han usado un VPS (servidor privado virtual) para hacer las tareas y los proyectos.

A continuación, clona los repositorios `ostep-homework` y `ostep-projects`:
```sh
git clone https://github.com/remzi-arpacidusseau/ostep-homework/
git clone https://github.com/remzi-arpacidusseau/ostep-projects/
cd ostep-projects
```

Tendrás que clonar [el repositorio `xv6-public`](https://github.com/mit-pdos/xv6-public) en el directorio de cada proyecto de OSTEP relacionado con xv6. Podrías usar la misma copia para todos los proyectos, pero recomendamos usar copias separadas para evitar que proyectos anteriores causen errores en los posteriores. Ejecuta los siguientes comandos en *cada uno* de los directorios `initial-xv6`, `scheduling-xv6-lottery`, `vm-xv6-intro`, `concurrency-xv6-threads` y `filesystems-checker`.

```sh
mkdir src
git clone https://github.com/mit-pdos/xv6-public src
```

### Pistas y consejos para los proyectos

- `initial-reverse`: ¡los mensajes de error necesarios para pasar las pruebas estaban mal! El texto proporcionado decía `"error: ..."`, pero las pruebas esperaban `"reverse: ..."`, así que asegúrate de que tu código coincida con lo que esperan las pruebas.
- [pistas y consejos para `processes-shell`](Project-2A-processes-shell.md)
- [pistas para el proyecto 1B: `initial-xv6`](Project-1B-initial-xv6.md)
- [pistas para `scheduling-xv6-lottery`](Scheduling-xv6-lottery.md)
- [pistas para `vm-xv6-intro`](vm-xv6-intro.md)

### Recursos

#### C

Por favor, no intentes aprender C en sitios como GeeksforGeeks, TutorialsPoint o Hackr.io (ni siquiera vamos a enlazarlos aquí). Son buenos recursos para otros lenguajes, pero C tiene demasiadas trampas, y los tutoriales de C en línea suelen estar llenos de errores peligrosos y malas prácticas de programación. Revisamos muchos recursos de C para hacer las recomendaciones de abajo y, por desgracia, encontramos *muchos* malos o poco seguros; aquí solo incluimos los mejores, así que no busques más.

Recomendamos aprender C estudiando (entero) *Modern C*, de Jens Gustedt, que está [disponible gratis en línea](https://inria.hal.science/hal-02383654v2/file/modernC.pdf). Este libro es relativamente corto y te pondrá al día tanto en el lenguaje C como en las prácticas modernas de programación en él. ¡Asegúrate de hacer todos los ejercicios de las notas al pie!

Aunque el libro anterior es nuestra recomendación por defecto, también recomendamos [*C Programming: A Modern Approach*](http://www.knking.com/books/c2/), de K.N. King, como segunda opción, más accesible para principiantes. Tiene algunas desventajas: es mucho más largo (casi 850 páginas), no está disponible gratis (y puede ser difícil encontrar ejemplares) y no es tan reciente como *Modern C* (aunque sigue siendo pertinente). Dicho esto, tiene más ejercicios si quieres practicar más, y las secciones de preguntas y respuestas al final de cada capítulo están llenas de perlas de sabiduría sobre C y respuestas a las preguntas frecuentes sobre C. También cubre casi todo el lenguaje C y su biblioteca estándar, así que sirve además como libro de consulta.

CS 50 no cubre suficiente C para OSTEP, pero si ya hiciste CS 50, puedes complementarlo con los libros de arriba.

Otros recursos (***opcionales***):
* [Páginas del manual de CS 50](https://manual.cs50.io): una gran referencia para consultar funciones de la biblioteca de C; la mayoría de las funciones incluyen el manual habitual y una opción para principiantes, «less comfortable» (ten en cuenta que la versión «less comfortable» usa `string` como alias de `char *`).
* [cdecl](https://cdecl.org): una herramienta que traduce al inglés las declaraciones crípticas de C.
* [Itinerario de C en exercism.org](https://exercism.org/tracks/C): ejercicios de práctica adicionales.
* [Secure Coding Practices in C and C++](https://www.amazon.com/dp/0321822137): si quieres entender por qué otros recursos de C son tan poco seguros.
* [*The C Programming Language*](https://www.amazon.com/dp/0131103628): el libro original sobre C, escrito por sus creadores. Demasiado anticuado para OSTEP, pero una buena lectura si consigues un ejemplar.

#### Arquitectura x86 y lenguaje ensamblador

Nand2Tetris ya te presentó la mayoría de los conceptos que necesitas para entender los sistemas y las arquitecturas de computadores, así que ahora solo tienes que trasladar ese conocimiento a la arquitectura x86 real (de 32 bits).

La forma más sencilla de hacerlo es ver una parte de las clases del curso *Computer Systems: A Programmer's Perspective* (o leer los capítulos correspondientes del [libro de texto](https://www.amazon.com/dp/013409266X) del mismo nombre). Las clases que necesitas son:

* [Programación a nivel de máquina I: conceptos básicos](https://scs.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=6e410255-3858-4e85-89c7-812c5845d197)
* [Programación a nivel de máquina II: control](https://scs.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=fc93c499-8fc9-4652-9a99-711058054afb)
* [Programación a nivel de máquina III: procedimientos](https://scs.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=2994255f-923b-4ad4-8fb4-5def7fd802cd)
* [Programación a nivel de máquina IV: datos](https://scs.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=03308c94-fc20-40d8-8978-1a9b81c344ed)
* [Programación a nivel de máquina V: temas avanzados](https://scs.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=3f0bf9ca-d640-4798-b91a-73aed656a10a)
* [Enlazado](https://scs.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=0aef84fc-a53b-49c6-bb43-14cb2b175249)

Además, se recomienda hacer los siguientes laboratorios. Están pensados para enseñarte a trabajar con ensamblador:
* **Bomb Lab**: [enunciado](http://csapp.cs.cmu.edu/3e/bomblab.pdf), [material para estudio autónomo](https://csapp.cs.cmu.edu/3e/bomb.tar).
  > Una «bomba binaria» es un programa que se entrega a los estudiantes como archivo de código objeto. Al ejecutarlo, pide al usuario que escriba 6 cadenas distintas. Si alguna es incorrecta, la bomba «explota»: imprime un mensaje de error y registra el evento en un servidor de calificaciones. Los estudiantes deben «desactivar» su propia bomba, única, desensamblando el programa y aplicándole ingeniería inversa para averiguar cuáles deben ser las 6 cadenas. El laboratorio enseña a los estudiantes a entender el lenguaje ensamblador y también les obliga a aprender a usar un depurador. Además, es muy divertido. Un laboratorio legendario entre los estudiantes de grado de CMU.
* **Attack Lab**: [enunciado](http://csapp.cs.cmu.edu/3e/attacklab.pdf), [material para estudio autónomo](https://csapp.cs.cmu.edu/3e/target1.tar).
  > Los estudiantes reciben un par de ejecutables binarios x86-64, únicos y generados a medida, llamados objetivos (*targets*), que tienen errores de desbordamiento de búfer. Un objetivo es vulnerable a ataques de inyección de código. El otro es vulnerable a ataques de programación orientada al retorno (ROP). Se pide a los estudiantes que modifiquen el comportamiento de los objetivos desarrollando *exploits* basados en inyección de código o en programación orientada al retorno. Este laboratorio enseña a los estudiantes la disciplina de la pila y el peligro de escribir código vulnerable a ataques de desbordamiento de búfer. **Nota:** ejecuta los objetivos con la opción -q para evitar que intenten conectarse a un servidor de calificaciones que no existe.

Otros recursos (***opcionales***):
* [CPU Registers x86](https://wiki.osdev.org/CPU_Registers_x86): útil para consultar registros concretos.
* [*PC Assembly Language*](https://pdos.csail.mit.edu/6.828/2018/readings/pcasm-book.pdf): un libro corto sobre ensamblador x86.
* [GCC Inline Assembly HOWTO](https://www.ibiblio.org/gferg/ldp/GCC-Inline-Assembly-HOWTO.html): una guía para escribir código ensamblador dentro de un programa en C.
* [*Intel 80386 Programmer's Reference Manual*](https://pdos.csail.mit.edu/6.828/2018/readings/i386.pdf): el recurso oficial (y enorme) de Intel.

#### xv6

No necesitas leer nada sobre xv6 hasta después de empezar OSTEP; de hecho, recomendamos posponer los proyectos relacionados con xv6 hasta que hayas terminado toda la sección de virtualización. A partir de ahí, necesitarás una guía que te acompañe por el código fuente.

Los autores de xv6 ofrecen un [libro](https://pdos.csail.mit.edu/6.828/2018/xv6/book-rev11.pdf) que puedes leer junto con el código fuente. También hay una práctica [versión en PDF](https://pdos.csail.mit.edu/6.828/2018/xv6/xv6-rev11.pdf) del código, con números de línea y un índice para ver exactamente dónde se usa cada función o constante.

Sin embargo, ese libro pasa por alto muchos detalles del código que pueden resultarte difíciles, como las características avanzadas de C que se usan, las instrucciones específicas de la arquitectura x86 y los aspectos de concurrencia (si no has terminado esa sección de OSTEP antes de empezar los proyectos de xv6). Para resolverlo, ofrecemos una [guía anotada de xv6](https://github.com/palladian1/xv6-annotated) que recorre todo el código de xv6 y lo analiza línea por línea, explicando las características de C, las especificaciones del hardware y las convenciones de x86 que se usan. Por eso es más larga que el libro oficial de xv6; no hace falta que la leas entera (y probablemente puedes saltarte las secciones opcionales, salvo que te interesen los controladores de dispositivos), pero puedes usarla como referencia si alguna parte del código te tiene rascándote la cabeza.

[Aquí](https://github.com/YehudaShapira/xv6-explained) tienes otra explicación detallada del código de xv6.

Y [aquí](https://www.youtube.com/playlist?list=PLbtzT1TYeoMhTPzyTZboW_j7TPAnjv9XB) hay una excelente serie de videos que recorre gran parte del código de xv6.

#### Varios

Necesitarás una idea general de cómo funcionan los Makefiles para usar el Makefile de xv6. [Este tutorial](https://makefiletutorial.com) cubre mucho más de lo que necesitas; lee solo las secciones «Getting Started» y «Targets» y vuelve al resto más adelante si necesitas consultar algo (aunque no debería hacerte falta).

Otros recursos (opcionales):
* [GCC Command Options](https://gcc.gnu.org/onlinedocs/gcc-11.1.0/gcc/Invoking-GCC.html#Invoking-GCC): una guía de las opciones de línea de comandos del compilador de C de GNU, `gcc`.
* [Linker Scripts](https://sourceware.org/binutils/docs/ld/Scripts.html#Scripts): una guía para escribir scripts para el enlazador de GNU, `ld`.
* [OSDev Wiki](https://wiki.osdev.org): un gran recurso sobre todo tipo de conceptos de sistemas operativos y detalles de implementación.
* [*Linux Kernel Development*](https://www.amazon.com/dp/0672329468): si quieres aplicar lo que sabes de xv6 para contribuir al núcleo de Linux, es una gran lectura después de OSTEP.
