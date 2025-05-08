
#### Síntesis

Auralis es una silent disco interactiva donde la música se transforma en tiempo real según el movimiento y la vibra única de cada persona y del espacio que la rodea.

#### Inputs detallados

| Input            | Método involucrado      | Rango/Valores                | Comportamiento esperado                                                                 |
|------------------|--------------------------|------------------------------|-----------------------------------------------------------------------------------------|
| `posX`           | `mouseDragged()`         | [0, width]                   | Determina qué banda del ecualizador (lows, mids, highs) se activa                      |
| `posY`           | `mouseDragged()`         | [0, height]                  | Modifica la ganancia de la banda seleccionada, en un rango de -12 a +12 dB             |
| `mousePressed()` | `mousePressed()`         | Posición del cursor          | Activa el arrastre si se presiona dentro del área de la esfera                         |
| `mouseReleased()`| `mouseReleased()`        | -                            | Finaliza el arrastre                                                                    |
| Click en canvas  | `toggleSound()`          | click                        | Inicia la reproducción de sonido                                                        |

### Processing


1. Se carga un archivo de sonido y se pasa por un ecualizador de tres bandas.
2. El usuario puede arrastrar una esfera blanca sobre el lienzo.
3. La posición horizontal (`posX`) define cuál de las bandas se controla (low, mid, high).
4. La posición vertical (`posY`) ajusta la ganancia de dicha banda, con valores de -12 a +12 dB.
5. El filtro se actualiza en tiempo real, permitiendo manipular el sonido mientras se arrastra.

### Código simplificado

```js
if (dragging) {
  posX = constrain(mouseX, 0, width);
  posY = constrain(mouseY, 0, height);

  eqBandIndex = map(posX, 0, width, 0, 3);
  gain = map(posY, height, 0, -12, 12);
  applyEQ(eqBandIndex, gain);
}
```

### Outputs

Banda afectada del ecualizador (lows, mids, highs) cambia dinámicamente con posX.

Ganancia de esa banda se ajusta dinámicamente con posY.

El sonido se filtra en tiempo real según la posición de la esfera.

En pantalla, se muestra visualmente qué banda está activa.

Si el sonido no está en reproducción, se muestra la indicación "tap to play".


