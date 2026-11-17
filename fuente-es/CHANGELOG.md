# Historial de cambios

**Nota**: el plan de estudios está en revisión para la v9. Esta revisión consiste sobre todo en contrastar nuestras recomendaciones con nuestras [directrices curriculares](CURRICULAR_GUIDELINES.md), añadir los temas que faltan y retirar los cursos redundantes o fuera de alcance. A medida que se completan las solicitudes de comentarios (RFC) de este trabajo, los cambios se aplican de inmediato al plan de estudios. Cuando termine la revisión completa, dejaremos constancia del salto de versión a la v9.

Todos los cambios relevantes de este proyecto se documentarán en este archivo.
Este proyecto sigue *en espíritu* el [versionado semántico](http://semver.org/):
- Las actualizaciones «MAJOR» (mayores) corresponden a cambiar los temas que se estudian en una materia
- Las actualizaciones «MINOR» (menores) corresponden a cambiar cursos sin cambiar los temas
- Las actualizaciones «PATCH» (parches) corresponden a añadidos o retiradas estéticos y no esenciales, o a cambios en el orden de las asignaturas para una mejor progresión

## [8.0.0] 2017-11-01
### Añadido
- extras/readings: «The System Design Primer»
- extras/readings: «Category Theory for Programmers: The Preface»
- extras/readings: «Programming Languages: Application and Interpretation»
- extras/readings: «Programming and Programming Languages»
- CONTRIBUTING: sección «Learning Git» (aprender Git) en la página de directrices para colaboradores
- Core Math: se añadió «Essence of Linear Algebra» como prerrequisito de «Linear Algebra: Foundations to Frontiers»

### Actualizado
- Se movió «Introduction to Mathematical Thinking» a extras/courses
- Se movió «Hack the Kernel» (ops-class) de Advanced Systems a Core Systems
- Core Systems: «Operating Systems: Three Easy Pieces» ya no es obligatorio, pero se recomienda como texto complementario de «Hack the Kernel»
- Core Theory: se sustituyó Coursera por Lagunita como plataforma de Stanford Algorithms, porque Coursera usa patrones oscuros (*dark patterns*) para engañar a los usuarios y que paguen

## [7.2.2] 2017-07-02
### Añadido
- Libro «Haskell Programming from First Principles» como alternativa de pago para aprender Haskell
- «Think Python» en extras/readings
- Entradas en las preguntas frecuentes y enlaces en los cursos correspondientes
- «Category Theory: A Gentle Introduction» en extras/readings

## [7.2.1] 2017-05-14
### Actualizado
- El curso de redes debería llevar 8 semanas
- Se corrigió una falta de ortografía

### Añadido
- Curso Introduction to Haskell en [extras/courses](extras/courses.md)

## [7.2.0] 2017-04-28
### Añadido
- Curso Software Testing
- Enlace a Algorithms: Design and Analysis de Stanford Lagunita
- Se añadió un enlace a la sección sobre ecuaciones paramétricas y coordenadas polares del curso Single Variable Calculus del MIT, para preparar adecuadamente a los estudiantes para Multivariable Calculus

## [7.1.2] 2017-04-22
### Actualizado
- Se añadió un enlace a Mega Project List en la introducción de la sección de proyectos

## [7.1.1] 2017-04-11
### Actualizado
- Últimos retoques de la versión

## [7.1.0] 2017-04-10
### Actualizado
- Se revirtió la reestructuración del curso de lenguajes de programación

### Añadido
- Cursos Reliable Distributed Algorithms
- Nuevo curso de introducción a las ciencias de la computación

## [7.0.2] 2017-03-30
### Actualizado
- Se movieron los cursos opcionales sobre aprendizaje en línea a una nueva sección de extras/courses
- Se movió a extras/courses el curso alternativo de arquitectura de computadores

### Añadido
- Especialización en Scala en Advanced applications

### Eliminado
- Se eliminaron todas las opciones de lecturas obligatorias salvo una, para simplificar el plan de estudios

## [7.0.1] 2017-03-11
### Actualizado
- Se corrigió el enlace a la página de ciencias de la computación «hazlo tú mismo» de Bradfield

### Añadido
- Nota en Calculus One con enlaces a las erratas y a recomendaciones sobre cómo avanzar en el curso
- Cursos opcionales en extras:
  - Curso de álgebra lineal de Strang
  - Structure and Interpretation of Computer Programs de Berkeley
- Lecturas opcionales en extras:
  - Libro de programación avanzada de Van Roy
  - Libro de arquitectura de computadores de P&H (Patterson y Hennessy)
  - Libro de algoritmos de Skiena
  - Libro de álgebra lineal de Strang
  - Libro Database Management Systems
  - Libro de Tarr (sic; se refiere a Terence Parr) sobre cómo crear tu propio lenguaje específico de dominio
  - Lecturas de varios autores sobre sistemas distribuidos

## [7.0] 2017-03-09
Reforma completa de la estructura del programa

### Actualizado
- Se aclararon las directrices para colaboradores y se movieron a un archivo aparte
- Se pasó de muchas materias a solo cuatro materias con muchos temas
- Se unificaron free-books.md y paid-books.md en readings.md
- Se unificaron free-courses.md y paid-courses.md en courses.md
- Se sustituyó el antiguo «How to Code» por el nuevo «How to Code» (MicroMasters de desarrollo de software)
- Se sustituyó Princeton Algorithms (movido a [cursos alternativos](#extras/courses.md)) por Stanford Algorithms

### Añadido
- Se indican los prerrequisitos de todos los cursos
- Requisitos: requisitos de materias y temas, y requisitos de proyectos
- Lecturas obligatorias sobre Haskell, Prolog y sistemas operativos
- Cursos: Programming Languages de Dan Grossman
- Cursos: From Nand to Tetris
- Curso optativo: Intro to Parallel Programming
- Curso optativo: LAFF: Programming for Correctness
- Curso optativo: Introduction to Mathematical Thinking
- Cursos optativos: Electricity and Magnetism
- Cursos optativos: Computation Structures del MIT
- Curso optativo: Multivariable Calculus
- Curso optativo: ops-class.org
- Curso optativo: Automata Theory
- Curso optativo: Introduction to Logic
- Curso optativo: Computational Geometry
- Curso optativo: Formal Concept Analysis
- Curso optativo: Game Theory
- Especializaciones optativas:
  - Robótica
  - Minería de datos
  - Big data
  - Internet de las cosas
  - Computación en la nube
  - Desarrollo web full stack
  - Ciencia de datos
- Especializaciones profesionales:
  - Mastering Software Development in R
  - Artificial Intelligence Engineer
  - Machine Learning Engineer
  - Ciberseguridad
  - Desarrollador Android

### Eliminado
- Se eliminaron muchos enlaces rotos y cursos obsoletos
- Se eliminó el requisito de un proyecto por curso
- Curso: Object-Oriented Programming in Java
- Curso: Functional Programming in Scala
- Curso: Computer Architecture (aunque se dejó como nota al pie)
- Curso: Intro to Theoretical Computer Science
- Curso: Software Processes and Agile Practices
- Curso: Operating Systems & System Programming
- Curso: Introduction to Cyber Security
- Curso: Parallel Computer Architecture and Programming
- Curso: UX Design for Mobile Developers

## [6.0] 2016-10-09
### Actualizado
- Se colocó Calculus One antes de Mathematics for Computer Science y junto a él
- Se mejoró el texto de «Order of the classes» (orden de las asignaturas)

### Añadido
- Se creó un tablero público de Trello con la nueva versión del plan de estudios
- Se creó la sección «How to track and show your progress» (cómo seguir y mostrar tu progreso) en «How to use this guide» (cómo usar esta guía)
- Se añadió el archivo PROJECTS.md
- Se copiaron todas las secciones del plan de estudios en PROJECTS.md

### Eliminado
- Se eliminó la sección «Next Goals» (próximos objetivos)
- Se eliminó la referencia a la aplicación web de OSSU

## [5.1.0] 2016-08-20
Actualización a la última versión de Math for Computer Science:

### Actualizado
- Sección: **Math (Discrete Math)** (matemáticas discretas)
  - Mathematics for Computer Science

## [5.0.0] 2016-08-20
Debido a la retirada de un curso, hicimos las siguientes actualizaciones:

### Eliminado
- Sección: **Natural Language Processing** (procesamiento del lenguaje natural)
  - Natural Language Processing

### Añadido
- Sección: **Natural Language Processing**
  - Introduction to Natural Language Processing

## [4.1.0] 2016-08-05
Debido a cambios en la plataforma de Coursera, hicimos las siguientes actualizaciones:
### Corregido
- Sección: **Big Data**
  - Introduction to Big Data

## [4.0.0] 2016-07-30
Debido a cambios en la plataforma de Coursera, hicimos las siguientes actualizaciones:

### Eliminado
- Sección: **Theory** (teoría)
  - Automata
- Sección: **Math (Linear Algebra)** (álgebra lineal)
  - Coding the Matrix: Linear Algebra through Computer Science Applications
- Sección: **Parallel Computing** (computación paralela)
  - Heterogeneous Parallel Programming
- Sección: **Natural Language Processing**
  - Natural Language Processing

### Corregido
- Sección: **Computer Networks** (redes de computadores)
  - Computer Networks
- Sección: **Compilers** (compiladores)
  - Compilers

### Añadido
- Sección: **Theory**
  - Intro to Theoretical Computer Science
- Sección: **Math (Linear Algebra)**
  - Linear Algebra - Foundations to Frontiers
- Sección: **Parallel Computing**
  - Parallel Computer Architecture and Programming
- Sección: **Natural Language Processing**
  - Natural Language Processing

## [3.0.0] 2016-05-04
### Eliminado
- Sección: **Introduction to Computer Science** (introducción a las ciencias de la computación):
	- Introduction to Computer Science and Programming Using Python
	- From Nand to Tetris (Part 1)

### Añadido
- Sección: **Introduction to Computer Science**:
	- Introduction to Computer Science - CS50

## [2.0.1] 2016-04-04
### Corregido
- Ahora los estudiantes deben inscribirse a través de nuestra [aplicación web](https://ossu.firebaseapp.com).

## [2.0.0] 2016-03-17
### Corregido
- Nombres y enlaces de los cursos de la sección Program Design (diseño de programas)

### Eliminado
- **Introduction to Computer Science**:
	- Introduction to Computer Science
	- Introduction to Computational Thinking and Data Science
- **Algorithms** (algoritmos)
	- Analysis of Algorithms
- **Programming Paradigms** (paradigmas de programación)
	- Principles of Reactive Programming
- **Math (Calculus)** (cálculo)
	- Multivariable Calculus
- **Software Architecture** (arquitectura de software):
	- Web Application Architectures
- **Software Engineering** (ingeniería de software):
	- Agile Development Using Ruby on Rails - Basics
	- Agile Development Using Ruby on Rails - Advanced
	- Startup Engineering
- **Computer Architecture** (arquitectura de computadores):
	- The Hardware/Software Interface
- **Operating Systems** (sistemas operativos):
	- Operating System Engineering
- **Computer Networks**:
	- Introduction to Computer Networking
- **Cryptography** (criptografía):
	- Applied Cryptography

**P. D.**: estos cursos eliminados están ahora en la sección [extras](https://github.com/ossu/computer-science/tree/master/extras).

## [1.3.12] 2016-03-17
### Añadido
- Cómo colaborar: enviar enlaces nuevos a la sección de extras

## [1.3.11] 2016-03-06
### Corregido
- Nand to Tetris: cambio de nombre y de URL
- Desarrollo ágil de UC Berkeley: cambio de nombre y de URL
- Enlaces directos a las especializaciones

## [1.3.10] 2016-03-06
### Corregido
- Enlace del curso Systematic Program Design Part 2

## [1.3.9] 2015-11-09
### Corregido
- Enlace al curso correcto de Natural Language Processing

## [1.3.8] 2015-11-07
### Añadido
- Se añadió la sección «Project Suggestions» (sugerencias de proyectos) con más referencias

## [1.3.7] 2015-11-01
### Eliminado
- Se eliminó el archivo project.md, movido al repositorio **help**

## [1.3.6] 2015-10-22
### Añadido
- Última versión de CS 162, Operating Systems and System Programming

## [1.2.6] 2015-10-19
### Añadido
- Insignia y enlace a la lista Awesome

## [1.2.5] 2015-10-16
### Corregido
- Se corrigió el nombre de la sección y se añadió un hipervínculo a ella.

## [1.2.4] 2015-10-14
### Eliminado
- Se eliminó la cita sobre el compromiso público

## [1.2.3] 2015-10-12
### Cambiado
- Se actualizó la sección de prerrequisitos para hacerla más clara

## [1.2.2] 2015-10-12
### Corregido
- Nuevo enlace al issue destinado a la inscripción de los estudiantes

## [1.2.1] 2015-10-11
### Añadido
- Artículo «Git - the simple guide» (Git: la guía sencilla) en la sección de prerrequisitos

##[1.1.1] 2015-10-11
### Corregido
- Corrección de erratas
  - Como MOOC significa «Massive Open Online Course» (curso en línea masivo y abierto), «curso MOOC» es redundante
  - Se desarrolló lo de «problema real»
  - Se corrigieron algunos pequeños errores gramaticales y de redacción

## [1.1.0] 2015-10-08
### Añadido
- Sección de motivación y preparación (recursos opcionales)
  - Artículo: MIT Challenge
  - Curso: Learning How to Learn

## [1.0.0] 2015-10-08

Publicación de la primera versión **completa** del plan de estudios de ciencias de la computación
