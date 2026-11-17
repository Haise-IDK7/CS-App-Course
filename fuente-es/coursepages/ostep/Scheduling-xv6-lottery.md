## todo el mérito es de [palladian](https://github.com/palladian1)

### Consejos generales

* Lee el capítulo 9 del libro OSTEP y mira el vídeo de la sesión de discusión 5. Los planificadores por lotería no se tratan en las clases, así que para este proyecto tienes que leer el libro sí o sí.

* En general, no puedes usar funciones de la biblioteca estándar de C dentro del núcleo, porque el núcleo tiene que inicializarse antes de poder ejecutar binarios de biblioteca.

* El núcleo de xv6 tiene una «versión de núcleo» de `printf`; recibe un argumento entero adicional que le indica si debe imprimir en `stdout` o en `stderr`. Ten en cuenta que solo admite cadenas de formato básicas como `"%d"` y no otras más complejas como `"%6.3g"`; puedes resolverlo añadiendo espacios a mano. También tiene otra función parecida, `cprintf`.

* Si quieres usar otras funciones de biblioteca que no están disponibles dentro del núcleo (generadores de números pseudoaleatorios), puedes ver cómo están implementadas en el libro de P.J. Plauger, The Standard C Library, e implementarlas tú mismo.

  ### Implementación

  * Tendrás que modificar los mismos archivos que en el proyecto 1b para añadir las dos nuevas llamadas al sistema.
  * Para entender cómo se crean los procesos, recuerda que empiezan en el estado `EMBRYO` antes de pasar a `RUNNABLE`; tendrás que encontrar dónde ocurre eso.
  * Las llamadas al sistema siempre tienen argumentos de tipo `void`, así que fíjate en cómo llamadas al sistema como `kill` y `read` consiguen sortear esa limitación y obtener argumentos (como enteros y punteros) desde el espacio de usuario. Puede que tengas que retroceder unos pasos en la cadena de llamadas que las ejecuta.
  * Asegúrate de incluir `types.h` y `defs.h` allí donde necesites acceder a código de otras partes del núcleo.
  * Para crear el comando `ps` de xv6, fíjate en cómo están implementados `cat`, `ls` y `ln`. Asegúrate de modificar el Makefile para que incluya el código fuente de tu comando `ps`.


## ¡A continuación hay spoilers!

### Recorrido por la solución

- Empieza con una copia limpia del código fuente de `xv6`.

- `argint` y `argptr` son funciones importantes. Las llamadas al sistema (`syscall`) no reciben argumentos, pero en realidad, desde el código de usuario, quieres pasarles argumentos.

- La forma de hacerlo es esta: el núcleo llama a la `syscall`, por ejemplo `sys_kill()`, sin argumentos; después `sys_kill` usa `argint()` para obtener los argumentos de la pila de llamadas y se los pasa a una función `kill(int pid)`.

- Más abajo verás un montón de declaraciones de funciones `extern int sys_whatever`; eso significa que estas funciones están definidas en otro archivo y se traen desde allí como punteros a función.

- Y estas funciones `sys_whatever` son básicamente envoltorios de la `syscall` real, que no lleva el `sys_` al principio. Así que tienes que añadir `sys_settickets` y `sys_getpinfo` a esa lista de declaraciones de funciones.

- Después hay un arreglo de punteros a función; usa esa forma antigua de C de inicializar arreglos en la que puedes escribir `int arr[] = { [0] 5, [1] 7}`.

- Y los nombres entre corchetes, `SYS_fork`, etc., están definidos como macros del preprocesador en otro archivo de cabecera, `syscall.h`.

- Así que tienes que añadir dos entradas más al arreglo, con punteros a función a `sys_settickets` y `sys_getpinfo`, y después definir `SYS_settickets` y `SYS_getpinfo` en el archivo de cabecera correspondiente.

- Todas estas funciones envoltorio `sys_` están definidas en `sysproc.c`.

- Así que ahí tienes que crear `int sys_settickets(void)` e `int sys_getpinfo(void)`.

- La función `settickets` real necesitará un argumento entero, así que tienes que usar `argint` para tomarlo de la pila de llamadas y pasárselo a `settickets`; del mismo modo, `getpinfo` necesitará un puntero, así que usarás `argptr`.

- Además, hay una condición adicional en el `if` de `sys_settickets`; se debe a que no está permitido usar un número de boletos menor que 1.

- Después hay algo de código ensamblador que tiene que ejecutarse para cada llamada al sistema; por suerte, es una macro ya escrita, así que no tienes que escribir nada de ensamblador. Está en `usys.S`.

- Así que solo tienes que añadir dos líneas al final para crear las macros `SYSCALL(settickets)` y `SYSCALL(getpinfo)`.

- Última parte de las `syscalls`: tienes que declararlas en un archivo de cabecera para que el código de usuario pueda llamarlas. Eso está en `user.h`.

- `struct pstat` se definirá propiamente en `pstat.h`, pero también tienes que declararla en `user.h` para que el código de usuario no dé error al encontrarla.

- Básicamente, todo código de usuario que use `syscalls` o funciones de la biblioteca estándar de C (en realidad, de `xv6`) tendrá que incluir `user.h`.

- Hasta aquí, eso es todo lo que hay que hacer en el sistema operativo para las dos llamadas al sistema; ahora solo falta implementarlas de verdad con las funciones normales `settickets` y `getpinfo`, y después implementar el planificador y el programa `ps`.

- `pstat.h` no es para el planificador, sino para el programa `ps`, que funcionará de forma parecida al `ps` de Linux. `pstat.h` solo sirve para definir `struct pstat`; no tiene un archivo `.c` asociado.

- El planificador funcionará asignando por defecto 1 boleto a cada proceso cuando se crea; después, los procesos pueden fijar sus propios boletos con la llamada al sistema `settickets`.

- Así que primero tenemos que asegurarnos de que cada proceso lleve la cuenta de sus boletos; después, asignarle 1 boleto por defecto al crearlo; y después, escribir `settickets`.

- Lo primero está en `proc.h`: los procesos se representan con un `struct proc`, así que añadimos un nuevo miembro `int tickets`.

- El miembro `int ticks` es para `ps`; volveré a eso más adelante.

- Otra cosa que conviene observar en `proc.h` es el `enum procstate`: ahí puedes ver todos los estados posibles de un proceso. `EMBRYO` significa que el proceso se está creando; así que lo que hice fue buscar `EMBRYO` con `grep` para encontrar dónde se crea el proceso y fijar ahí los boletos por defecto en 1. Resulta que está en `proc.c`.

- Dentro de `proc.c` hay una función, `allocproc`, que inicializa un proceso.

- Hay una tabla de procesos llamada `ptable`, y `allocproc` la recorre para encontrar un proceso sin usar.

- Cuando lo encuentra, pasa a crearlo; ahí añadí `p->tickets = 1;`.

- El siguiente cambio es para cumplir uno de los requisitos: los procesos hijos deben heredar el número de boletos de su proceso padre.

- Los procesos hijos se crean con `fork`, que está en el mismo archivo.

- En `fork`, `curproc` es el proceso actual y `np` es el proceso nuevo.

- Así que puse `np->tickets = curproc->tickets`.

- El planificador tiene que generar un número pseudoaleatorio y después recorrer la tabla de procesos con un contador inicializado a 0, sumándole el número de boletos de cada proceso. Cuando el contador supera el número pseudoaleatorio, se detiene y ejecuta ese proceso.

- Acabé consultando The Standard C Library de P.J. Plauger, que es básicamente un libro enorme con todo el código fuente de la biblioteca de C, comentado. Está bastante bien; aunque no sé si hoy se sigue escribiendo así, porque el libro es de los años 80.

- Así que simplemente implementé las funciones `rand` y `srand` de C. `srand` fija una semilla aleatoria (no tan aleatoria, como verás después) y `rand` la convierte en un entero pseudoaleatorio.

- Ahí hay bastante magia de tipos, con conversiones de un lado a otro entre enteros y enteros sin signo; es para evitar el desbordamiento de enteros con signo, que provoca comportamiento indefinido. El desbordamiento de enteros sin signo, en cambio, no es problema.

- Solo hice un cambio para que fuera más rápido: escribir `& 32767` en lugar de `% 32768`.

- Verás la semilla «aleatoria» que usé: el número de `ticks`, que creo que cuenta las interrupciones del temporizador ocurridas hasta el momento.

- Lo cual no es aleatorio en absoluto, ya que la primera vez que se ejecuta este programa valdrá 0, después 1, después 2, etc.

- Hay algunas líneas que cuentan `ticks`; eran para `ps`, no para el planificador.

- El cambio principal para convertirlo en un planificador por lotería es la variable contador.

- Y añadir un bucle `for` para contar el número total de boletos repartidos.

- Al final de este archivo está la implementación de `settickets` y `getpinfo`.

- Después de inicializar `counter` y `totaltickets`, hay un bucle `for` que cuenta el número total de boletos que se han repartido entre los procesos.

- Después obtenemos el boleto ganador.

- Veamos primero el código fuente original. Primero se adquiere el cerrojo (*lock*), que se libera al final de todo. Pero entre medias hay un bucle `for` que recorre todos los procesos de `ptable`.

- En concreto, solo recorre los procesos en estado `RUNNABLE`; si un proceso no está `RUNNABLE`, hace `continue` y pasa al siguiente. (Esto corresponde al mecanismo de planificación por turno rotatorio, *round-robin*, que ya viene en el código).

- Entonces cambia al primer proceso `RUNNABLE` que encuentra; es decir, pasa a ejecutarlo.

- Primero, `c` representa la CPU actual, así que indica a la CPU actual que ejecute el proceso encontrado con `c->proc = p;`.

- Después llama a la función `switchuvm(p)`, que prepara el espacio de direcciones de memoria virtual de `p`. Luego pone el estado del proceso en `RUNNING`.

- Y en `swtch` ocurre la magia: intercambia el contenido de los registros del sistema operativo y del planificador por el contenido de los registros del proceso `p`, que estaba guardado en memoria.

- En cuanto se ejecuta `swtch`, la CPU sigue ejecutando instrucciones, pero ahora son las instrucciones del proceso. Así que esta función del planificador se queda detenida ahí.

- Tarde o temprano, cuando salta una interrupción del temporizador, el procesador hace otra llamada a `swtch`, pero con los argumentos invertidos, para cargar desde memoria en los registros de la CPU el contenido de los registros del planificador y guardar el de los registros del proceso. En ese momento, la ejecución continúa exactamente en este punto.

- Ahora `switchkvm` prepara el espacio de direcciones de memoria virtual del núcleo.

- Estas 5 líneas son el cambio de contexto:

  ```c
  c->proc = p;
  switchuvm(p);
  p->state = RUNNING;

  swtch(&(c->scheduler), p->context);
  switchkvm();
  ```

- Después pasamos a la siguiente iteración del bucle `for` interno, que encuentra el siguiente proceso `RUNNABLE` y repite.

- Solo cuando se han ejecutado todos los procesos `RUNNABLE` salimos del bucle `for` interno y liberamos el cerrojo.

- El código fuente original tiene esta estructura (esto es pseudocódigo):

  ```python
  while (1) {
    iterate over processes:
      if not runnable:
        continue
      run it
  ```

- El código nuevo tiene esta estructura (esto es pseudocódigo):

  ```python
  while (1) {
    count the total tickets allotted to all processes // one for loop here
    get the winning ticket number
    iterate over processes: // another for loop here
      if not runnable:
        continue
      add its tickets to counter
      if counter <= winning ticket number:
        continue
      run it
  ```

  (Nota de la traducción: el pseudocódigo se deja como en el original. En español dice: mientras sea cierto, contar el total de boletos asignados a todos los procesos con un primer bucle; obtener el número del boleto ganador; recorrer los procesos con otro bucle; si un proceso no es ejecutable, pasar al siguiente; sumar sus boletos al contador; si el contador es menor o igual que el número ganador, pasar al siguiente; si no, ejecutarlo).

- Ignoramos los boletos de los procesos que no están en estado RUNNABLE.

- Los boletos no están numerados; cada proceso tiene simplemente una cantidad de boletos, y vamos contando hasta superar `n` boletos, donde `n` es el número ganador.

- Por ejemplo, si el proceso A tiene 5 boletos, el B tiene 7 y el C tiene 2: si el número ganador es 3, se ejecuta A; si es 8, se ejecuta B; si es 12, se ejecuta C.

- Un número ganador entre 0 y 4 corresponde a A, entre 5 y 11 a B, y entre 12 y 13 a C.

- `settickets` es bastante sencilla: adquieres un cerrojo, fijas los boletos del proceso y liberas el cerrojo.

- `getpinfo` funciona básicamente así:

- `p` es un puntero a un `struct pstat`, tal como se define en `pstat.h`. Cada uno de sus miembros es un arreglo con una entrada por proceso.

- Comprueba si es un puntero nulo.

- Recorre la tabla de procesos y asigna a `proc_i` el i-ésimo proceso.

- Asigna a la i-ésima entrada de cada miembro de `p` el valor correspondiente a este proceso.

- Una última pieza de contabilidad: tenemos que añadir en `defs.h` las declaraciones de `struct pstat` y de las llamadas al sistema `settickets` y `getpinfo`.

- El último archivo es `ps.c`, que implementa el programa `ps`, parecido al `ps` de Linux. Simplemente llama a `getpinfo` para rellenar un `struct pstat` y después imprime la información de cada proceso en uso.

- Después solo tienes que modificar el Makefile para incluir `ps.c` en la compilación, ¡y listo!

- Ah, y por esto necesitábamos los `ticks` en el planificador: `ps` imprime cuánto tiempo se ha ejecutado cada proceso.

- Así que hay que medir el número de `ticks` durante los que realmente se ejecutó.

- POR ÚLTIMO, ejecuta `make qemu` en el directorio `/src` para asegurarte de que todo funciona.
