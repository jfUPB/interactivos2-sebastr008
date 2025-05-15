#### Lista de inputs

|   Fuente   | Tipo de dato |              Rango             |
|:----------:|:------------:|:------------------------------:|
| Posición X | Decimal      | *depende del tamaño del canva* |
| Posición Y | Decimal      | *depende del tamaño del canva* |

Ambos inputs serán simulados mediante una bola (que será el usuario en la vida real) en p5.js en la cual se conseguirá su posición en el canvas (discoteca) para saber que efecto ponerle a la música.

El comportamiento que requiero es una respuesta directa con la bolita que estará en el canvas, esto lo hago para poder hacer todo tipo de pruebas (movimiento lento, rápido, pausado etc.) y poder escuchar diferentes resultados.

| Input (Variable) | Método(s) que lo usan             | Comportamiento Esperado                                                                 |
|------------------|-----------------------------------|------------------------------------------------------------------------------------------|
| Posicion X           | draw(), mouseDragged()        | Determina la **banda del ecualizador** que se va a controlar (`lows`, `mids`, `highs`). |
| Posicion Y          | draw(), mouseDragged()        | Determina la **ganancia** de la banda seleccionada. Más arriba = mayor ganancia.        |
| mouseX         | mousePressed(), mouseDragged()  | Verifica si el mouse está presionando sobre la bola azul y permite arrastrarla.         |
| mouseY         | mousePressed(), mouseDragged()  | Igual que `mouseX`, permite mover verticalmente la bola azul                           |
| dragging       | mousePressed(), mouseDragged(), mouseReleased() | Controla si se está arrastrando la bola                         |
| eqBandIndex    | draw()                          | Calculado a partir de `posX`, selecciona la banda que se va a modificar                |
| gainValue      | draw()                          | Calculado a partir de `posY`, determina cuánto se amplifica o atenúa la banda          |


PROTOTIPO

https://editor.p5js.org/sebastr008/sketches/Yqz3kgCp6