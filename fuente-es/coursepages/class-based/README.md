# Diseño de programas basado en clases

Este curso amplía lo que hiciste en [Systematic Program Design](../spd/README.md): pasa del paradigma de programación funcional con Racket al paradigma basado en clases con Java, y te prepara para [Object-Oriented Design](/README.md#core-programming) (diseño orientado a objetos).

Este curso lo impartió la Northeastern University en el semestre de primavera de 2022, y los materiales están disponibles en su sitio web.

**Enlace al curso:**

- <https://course.ccs.neu.edu/cs2510sp22/index.html>

## Calendario

El calendario original está disponible [aquí](https://course.ccs.neu.edu/cs2510sp22/Syllabus.html), pero la interfaz hace difícil llegar a las fechas originales para ver el orden correcto del curso. Para ayudarte a organizar tu estudio, hemos creado este orden:

| Clases | Laboratorio | Tarea |
|----------|-----|------------|
| [1](https://course.ccs.neu.edu/cs2510sp22/lecture1.html), [2](https://course.ccs.neu.edu/cs2510sp22/lecture2.html), [3](https://course.ccs.neu.edu/cs2510sp22/lecture3.html) | [Laboratorio 1](https://course.ccs.neu.edu/cs2510sp22/lab1.html) | [Tarea 1](https://course.ccs.neu.edu/cs2510sp22/assignment1.html) |
| [4](https://course.ccs.neu.edu/cs2510sp22/lecture4.html), [5](https://course.ccs.neu.edu/cs2510sp22/lecture5.html), [6](https://course.ccs.neu.edu/cs2510sp22/lecture6.html) | [Laboratorio 2](https://course.ccs.neu.edu/cs2510sp22/lab2.html) | [Tarea 2](https://course.ccs.neu.edu/cs2510sp22/assignment2.html) |
| [7](https://course.ccs.neu.edu/cs2510sp22/lecture7.html), [8](https://course.ccs.neu.edu/cs2510sp22/lecture8.html), [9](https://course.ccs.neu.edu/cs2510sp22/lecture9.html) | [Laboratorio 3](https://course.ccs.neu.edu/cs2510sp22/lab3.html) | [Tarea 3](https://course.ccs.neu.edu/cs2510sp22/assignment3.html) |
| [10](https://course.ccs.neu.edu/cs2510sp22/lecture10.html), [11](https://course.ccs.neu.edu/cs2510sp22/lecture11.html), [12](https://course.ccs.neu.edu/cs2510sp22/lecture12.html) | [Laboratorio 4](https://course.ccs.neu.edu/cs2510sp22/lab4.html) | [Tarea 4](https://course.ccs.neu.edu/cs2510sp22/assignment4.html) |
| [13](https://course.ccs.neu.edu/cs2510sp22/lecture13.html), [14](https://course.ccs.neu.edu/cs2510sp22/lecture14.html) | [Laboratorio 5](https://course.ccs.neu.edu/cs2510sp22/lab5.html) | [Tarea 5](https://course.ccs.neu.edu/cs2510sp22/assignment5.html) |
| [15](https://course.ccs.neu.edu/cs2510sp22/lecture15.html), [16](https://course.ccs.neu.edu/cs2510sp22/lecture16.html) | [Laboratorio 6](https://course.ccs.neu.edu/cs2510sp22/lab6.html) | [Tarea 6](https://course.ccs.neu.edu/cs2510sp22/assignment6.html) |
| [17](https://course.ccs.neu.edu/cs2510sp22/lecture17.html), [18](https://course.ccs.neu.edu/cs2510sp22/lecture18.html), [19](https://course.ccs.neu.edu/cs2510sp22/lecture19.html) | [Laboratorio 7](https://course.ccs.neu.edu/cs2510sp22/lab7.html) | [Tarea 7](https://course.ccs.neu.edu/cs2510sp22/assignment7.html) |
| [20](https://course.ccs.neu.edu/cs2510sp22/lecture20.html), [21](https://course.ccs.neu.edu/cs2510sp22/lecture21.html), [22](https://course.ccs.neu.edu/cs2510sp22/lecture22.html) | [Laboratorio 8](https://course.ccs.neu.edu/cs2510sp22/lab8.html) | [Tarea 8](https://course.ccs.neu.edu/cs2510sp22/assignment8.html) |
| [23](https://course.ccs.neu.edu/cs2510sp22/lecture23.html), [24](https://course.ccs.neu.edu/cs2510sp22/lecture24.html), [25](https://course.ccs.neu.edu/cs2510sp22/lecture25.html) | [Laboratorio 9](https://course.ccs.neu.edu/cs2510sp22/lab9.html) | [Tarea 9, parte 1](https://course.ccs.neu.edu/cs2510sp22/assignment9.html) |
| [26](https://course.ccs.neu.edu/cs2510sp22/lecture26.html), [27](https://course.ccs.neu.edu/cs2510sp22/lecture27.html), [30](https://course.ccs.neu.edu/cs2510sp22/lecture30.html) | [Laboratorio 10](https://course.ccs.neu.edu/cs2510sp22/lab10.html) | [Tarea 9, parte 2](https://course.ccs.neu.edu/cs2510sp22/assignment9.html) |
| [28](https://course.ccs.neu.edu/cs2510sp22/lecture28.html), [29](https://course.ccs.neu.edu/cs2510sp22/lecture29.html) | [Laboratorio 11](https://course.ccs.neu.edu/cs2510sp22/lab11.html) | - |
| [31](https://course.ccs.neu.edu/cs2510sp22/lecture31.html), [32](https://course.ccs.neu.edu/cs2510sp22/lecture32.html) | [Laboratorio 12](https://course.ccs.neu.edu/cs2510sp22/lab12.html) | [Tarea 10, parte 1](https://course.ccs.neu.edu/cs2510sp22/assignment10.html) |
| [34](https://course.ccs.neu.edu/cs2510sp22/lecture34.html), [35](https://course.ccs.neu.edu/cs2510sp22/lecture35.html) | - | [Tarea 10, parte 2](https://course.ccs.neu.edu/cs2510sp22/assignment10.html) |

**Nota:**

- La clase 30 aparece fuera de orden. Esto coincide con el calendario original del curso.
- Puede parecer que faltan algunas clases. Si revisas el sitio web, verás que esto coincide con lo que está disponible en el sitio del curso, y todos los materiales están enlazados arriba.
- Los vídeos originales de las clases 22, 28 y 30 en el sitio web del curso no funcionan. Por ahora se indican copias archivadas en YouTube para las clases 28 y 30:
  - [Clase 28](https://youtube.com/playlist?list=PL_N7YxtCMPydJ-aBr4Ku9-q--D6vheOnp&si=XnBXaZKbBhqdUJgJ)
  - [Clase 30](https://www.youtube.com/watch?v=6WZo7sFFFlQ&list=PL_N7YxtCMPyea2YC3e-1s7SR_S3oWGjdb&index=1)
- Las tareas de arriba están ligeramente desordenadas respecto al calendario real del curso. Se hizo así para alinear mejor el material de las clases y los laboratorios con el que cubren las tareas. En el curso real, se daban a los estudiantes unos días entre aprender el material en clase y la fecha de entrega de la tarea correspondiente. Si encuentras algún error de orden, es decir, una tarea que necesita material de una clase que aparece después de ella, envía un PR (pull request) para corregir el orden.
- El calendario de arriba no sustituye al sitio web del curso. En el sitio web hay documentación esencial que no aparece en este calendario.
- Asegúrate de usar Java 11 en este curso. Usar otra versión causará problemas con las bibliotecas obligatorias que proporciona el curso.
