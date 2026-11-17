## Proyecto 2A
### todo el mérito es de [Palladian](https://github.com/palladian1/)

- [x] Modo interactivo
- [x] Modo por lotes
- [x] exit
- [x] cd
- [x] path
- [x] Redirección
- [x] Comandos en paralelo

### Consejos

* Mira el video de la sesión de discusión 3 sobre la shell de Unix.
* Lee el capítulo 5 del libro OSTEP.
* Empieza implementando una shell que haga una sola cosa: mostrar el indicador (*prompt*) y salir cuando escribas `exit`. Después añade `cd` y luego `path`. A continuación implementa la capacidad de ejecutar comandos con `execv`; después añade el modo por lotes, luego la redirección y, por último, los comandos en paralelo.
* Todos los scripts de prueba usan el modo por lotes y la redirección, así que, hasta que los tengas hechos, tendrás que probar tu shell a mano.
* Cuando implementes el comando `path`, asegúrate de poder manejar tanto rutas absolutas como relativas (es decir, tanto `path tests` como `path /usr/bin`).
* Es complicado acertar con los errores, así que añade mensajes de error donde parezca razonable, ejecuta los scripts de prueba y modifica tu código hasta que informes de errores exactamente cuando corresponde. Si estás ejecutando la prueba `i`, puedes mirar `tests/i.err` y `tests/i.rc` para ver cuántos errores debería generar tu shell y compararlos con `tests-out/i.err` y `tests-out/i.rc`.
* Si tienes problemas con la prueba 3, en la que se espera algo como `ls: cannot access ...` y tu shell muestra `/bin/ls: cannot access ...` o `/usr/bin/ls: cannot access ...`, prueba a modificar la variable de entorno $PATH para que empiece por `/bin`. Si eso no funciona, modifica `tests/3.err` para que coincida con la salida que da tu sistema. No puedes cambiar la salida de tu sistema sin tocar la implementación de `ls` o de `execv`, así que puedes saltarte esta prueba siempre que funcione en lo esencial.
* Tuve que editar `/tests/3.pre` para que usara `/bin/ls`, por cómo está configurado mi sistema, para pasar todas las pruebas. Como alternativa, puedes añadir `export PATH="/bin:$PATH"` a tu archivo `.profile` o `.bashrc`.

### Trampas y errores comunes en la gestión de memoria

* En esta tarea es muy fácil crear punteros a variables de la pila que dejarán de existir cuando salgan de su ámbito, lo que provoca un fallo de segmentación. Asegúrate de que, si haces que un puntero apunte a una cadena, esa cadena esté reservada en el montón (*heap*) y no en la pila (*stack*).

* Dicho esto, si usas una cadena de la pila, puedes copiarla en una cadena reservada en el montón con `strcpy()`, `strncpy()`, `strcat()` y `strncat()`.

* Usa `strcpy()` y `strcat()` solo con cadenas de tamaño fijo, y asegúrate de que el búfer en el que copias tenga espacio suficiente para la cadena más un carácter adicional para `\0`.

* Con `strncpy()` y `strncat()`, asegúrate de que `n` sea lo bastante grande para que quepa el terminador `\0`, o añádelo a mano.

* Cuidado con usar memoria después de liberarla (*use-after-free*), sobre todo en la implementación de `path`.

* Asegúrate de liberar las cadenas que obtienes de `getline()` y `strdup()`, pero cuidado con las liberaciones dobles (*double free*); por ejemplo, no liberes una subcadena de una cadena que ya liberaste.

* Evita la función de la biblioteca de C `strtok()`; no es segura frente a hilos. Usa `strsep()` en su lugar.

* Cuando uses `strsep()`, guarda una copia del puntero original a la cadena para poder liberarla después, porque `strsep()` modifica el puntero; si más adelante liberas ese puntero modificado, corromperás la tabla de páginas.

* Después de llamar a `strsep(&buf, delim)`, comprueba si `buf` es `NULL` antes de desreferenciarlo.
* Buena práctica general en C: si reservas memoria para una estructura de datos dentro de una función, deberías liberarla en esa misma función. Si reservas memoria en una función dedicada `create_xxx`, deberías tener la función `destroy_xxx` correspondiente. Así siempre reservas y liberas memoria al mismo nivel de funciones, lo que facilita evitar errores de memoria.
* Después de cada llamada a `malloc`, `calloc` o `realloc`, comprueba si el resultado es `NULL`.
* Usa `calloc` en lugar de `malloc` si estás creando un arreglo de punteros, para no crear punteros a valores basura.
* En `update_path` tuve que resolver el problema de que la mayoría de las pruebas hacen `path /bin /usr/bin`, pero una de ellas hacía `path tests`. Así que simplemente supuse que, si la ruta empieza con una barra, es una ruta absoluta y hay que copiarla tal cual; si no, es una ruta relativa y hay que añadir ./ al principio.
