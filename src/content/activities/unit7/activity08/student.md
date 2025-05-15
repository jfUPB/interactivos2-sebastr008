## Planeación documentación final

Los textos clave que planeo reutilizar y adaptas son de la unidad 5, concretamente las actividades 2,3 y 4 que fueron en dónde consolidé completamente el concepto, la narrativa, antes, durante y después de la experiencia y la síntesis del proyecto. Tengo que adaptar algunos textos ya que hubieron cosas que finalmente no llegaron al prototipo, pero considero que son una buena base para la documentación final.

##### IPO Resumido

Para mostrar mi IPO primeramente le tengo que explicar a la persona que son datos simulados, es decir, la posición de la bolita simula la posición de la persona dentro de la discoteca, luego le mostraria este cuadro

| Input            | Método involucrado      | Rango/Valores                | Comportamiento esperado                                                                 |
|------------------|--------------------------|------------------------------|-----------------------------------------------------------------------------------------|
| `posX`           | `mouseDragged()`         | [0, width]                   | Determina qué banda del ecualizador (lows, mids, highs) se activa                      |
| `posY`           | `mouseDragged()`         | [0, height]                  | Modifica la ganancia de la banda seleccionada, en un rango de -12 a +12 dB             |
| `mousePressed()` | `mousePressed()`         | Posición del cursor          | Activa el arrastre si se presiona dentro del área de la esfera                         |
| `mouseReleased()`| `mouseReleased()`        | -                            | Finaliza el arrastre                                                                    |
| Click en canvas  | `toggleSound()`          | click                        | Inicia la reproducción de sonido                                                        |

Y luego le mostraría este código simplificado que muestra como se están modificando las bandas

```js
if (dragging) {
  posX = constrain(mouseX, 0, width);
  posY = constrain(mouseY, 0, height);

  eqBandIndex = map(posX, 0, width, 0, 3);
  gain = map(posY, height, 0, -12, 12);
  applyEQ(eqBandIndex, gain);
}
```

El aspecto clave que se debe de mostrar en el video es como la interacción del usuario modifica la música que está escuchando, así que en el video haré una pequeña demostración sobre como la posición del usuario ecualiza la música.

El usuario para poder replicar mi proyecto deberá de tener instalado node.js que se puede bajar de internet, una vez descargado es tan sencillo como clonar mi repositorio, abrir un cmd, entrar en la carpeta y escribir npm start para empezar un servidor y poder disfrutar de la experiencia.


