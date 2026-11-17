## Proyecto 1B

### todo el mérito es de [palladian](https://github.com/palladian1)

### Instalación en Linux

* Asegúrate de tener una cadena de herramientas de compilación compatible; si usas Linux, gcc debería funcionar perfectamente.
* Instala qemu-system-x86 (puede llamarse qemu-system-i386 o qemu-system-x86_64; ten en cuenta que en algunas distribuciones el paquete `qemu` no es el correcto).
* Instala Perl.
* Instala gawk.
* Instala expect.
* Crea un directorio src/ en el mismo directorio que el script de pruebas del proyecto.
* Clona el repositorio de xv6 de GitHub y copia el código fuente en tu directorio src/.
* Dentro de src/, ejecuta `make qemu-nox` para comprobar si xv6 funciona. Sal de xv6 con `Ctrl-a x`; si lo olvidas, también puedes matar el proceso de qemu. Conviene revisar `top` o `htop` para asegurarte de que qemu ya no se está ejecutando; a veces sigue funcionando después de salir y consume muchos recursos.
* Modifica el Makefile para fijar `CPUS := 1`.
* Vuelve a ejecutar `make qemu-nox` para comprobar que xv6 sigue funcionando.

### Instrucciones

* Tu tarea es crear una nueva llamada al sistema para xv6, `getreadcount()`, que devuelva el número de llamadas al sistema `read` que se han producido hasta ese momento. Ten en cuenta que el recuento debe ser global, no por proceso.

### Enfoque sugerido

* Descarga el PDF del código fuente de xv6 (allí está mejor organizado que en el código que descargaste). Lee el índice para entender cómo se numeran las hojas, las páginas y las líneas. Después echa un vistazo a las referencias cruzadas que vienen a continuación, para saber cómo encontrar partes del código si lo necesitas.
* Echa un vistazo (muy) rápido a las partes del código fuente de xv6 que aparecen en el índice bajo `processes` y `system calls`, y también a `usys.S` en la sección `user-level`. No te preocupes todavía por entenderlas; solo necesitas ver dónde está cada archivo en el PDF para poder seguir después el vídeo de la sesión de discusión, ya que el código del profesor tiene una estructura de directorios distinta de la que tendrá el tuyo.
* Mira el vídeo de la sesión de discusión 2 sobre el proyecto P1B y síguelo con tu copia en PDF del código de xv6. Anótala a medida que el profesor explica qué hace cada parte.
* Lee la sección de contexto enlazada en la página de GitHub del proyecto y ve anotando el PDF del código de xv6.
* Lee el PDF de xv6 una vez más, esta vez para entender en términos generales las secciones `processes` y `system calls`, además de `usys.S` y `user.h` (NOTA: este último no está incluido en el PDF de xv6, así que tendrás que mirarlo en el código que descargaste). No te preocupes por entender hasta la última línea de código; solo asegúrate de saber dónde se definen las llamadas al sistema, cómo se invocan, etc.
* Modifica el código fuente de xv6 para añadir la nueva llamada al sistema `getreadcount()`. Tendrás que modificar varios archivos; te sugiero marcar tus cambios con `// OSTEP project` para encontrarlos fácilmente después al depurar.
* Hay otro sitio donde tendrás que añadir código, que no está incluido en el PDF de xv6: `user.h`.
* Cuando termines, ejecuta el script de pruebas. La prueba 1 ejecuta una función que hace varias llamadas a `read` y después llama a `getreadcount`. Para que tu código funcione, debes llevar correctamente la cuenta del número total de llamadas a `read` que hacen todos los procesos.
* Si tu código pasa la prueba 1, ¡enhorabuena! Por ahora has terminado. No te preocupes por la prueba 2 hasta que hayas visto las clases sobre concurrencia.
* Si tu código no pasó la prueba 1, puedes comparar la salida esperada en `tests/1.out` con la salida real de tu prueba en `tests-out/1.out`. También puedes mirar `tests-out/1.err` para buscar mensajes de error.
* También puedes probar tu código arrancando xv6 en tu terminal con `make qemu-nox`. Escribe `ls` para ver todos los archivos; deberías ver `test_1` y `test_2`. Ejecuta la prueba 1 con `./test_1` para ver qué imprime; puedes compararlo a mano con la salida esperada.
* Una vez que hayas visto las clases sobre hilos, concurrencia y cerrojos (*locks*): la prueba 2 comprueba si tu implementación de `getreadcount` es segura frente a hilos (*thread-safe*). Probablemente antes no lo era, así que para corregirlo tendrás que añadir un cerrojo. Después puedes volver a ejecutar el script de pruebas y comprobar que tu código ya pasa las dos pruebas.
