El mérito es de [palladian](https://github.com/palladian1)

## Introducción a la memoria virtual de xv6

### ADVERTENCIA:

***¡El proyecto no coincide con el código fuente de xv6 disponible actualmente, que ya trae este proyecto implementado!***

[palladian](https://github.com/palladian1) localizó otra versión del código fuente de xv6 en la página de GitHub de un estudiante de la Universidad de Wisconsin. Tuvimos que editar el `Makefile` para que encontrara correctamente el ejecutable de QEMU. Añadimos `null.c` a la carpeta `user` (y editamos también el `makefile.mk` de esa carpeta), que demuestra la falta de seguridad de memoria.

Empieza con el código de [`start.zip`](https://github.com/spamegg1/reviews/raw/master/courses/OSTEP/ostep-projects/vm-xv6-intro/start.zip). Descomprímelo y ejecuta `make clean` y `make qemu-nox`. Después, dentro del sistema xv6, ejecuta `null` para ver la falta de seguridad. Si quieres comparar los resultados de `null` con el código máquina real, puedes ejecutar `objdump -d user/null.o`.

Puede que tengas que ejecutar a mano `make clean` y `make qemu-nox` cada vez que hagas un cambio en el código.
