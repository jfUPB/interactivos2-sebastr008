### Estructura de la documentación

- Título
- Concepto y narrativa
- ¿Como se simulará esto?
- Diseño IPO
- Video demostrativo
- Tutorial 
- Tecnologías usadas
- Síntesis

### Textos clave

#### Concepto:

Dentro de esta Silent Disco cada persona evoca una vibra totalmente única que se ve reflejada en la música que estás escuchando, aparte el entorno en el que se encuentran también tiene su propia "aura". La forma en la que se mueve la gente, la energía que transmiten y la manera en la que interactúan con el espacio crea una experiencia única para cada persona ya que aquí no hay una única canción, hay tantas versiones como personas en la pista, porque cada quien vibra de manera distinta.

El DJ pondrá una base musical, pero cada persona la transformará con su vibra y el aura del lugar en el que se encuentre. La energía del espacio influirá en el sonido, creando pistas únicas que reflejan la conexión entre el individuo y su entorno. Así, la música se convierte en una experiencia viva y en constante evolución.


#### Narrativa (necesario adaptarla un poco):

Dicen que hay un sitio al que no se llega por accidente. No aparece en mapas ni responde a coordenadas, pero quienes han estado ahí aseguran que, una vez que entras, no vuelves a escuchar la música de la misma manera.

Todos coinciden en que no es solo un club, ni una discoteca, ni un lugar común. Es un espacio vivo, un organismo hecho de sonido y movimiento, de vibraciones que se entrelazan y cambian con cada persona que cruza su puerta.

No hay dos personas que lo perciban igual. Cada cuerpo, cada paso, cada pensamiento deja una marca distinta en el aire. Para algunos, la música se convierte en un pulso acelerado que sigue el ritmo de su energía incontrolable. Para otros, el sonido se expande y se vuelve etéreo, como si el espacio les diera un respiro. Y hay quienes sienten que la melodía apenas los roza, como si el lugar estuviera esperando que se abran por completo.

Dicen que cuando entras por primera vez, no lo notas. Al principio, solo parece una pista de baile envuelta en luces tenues, con un DJ que marca el compás. Pero si prestas atención, te das cuenta de que la música no sigue un patrón predecible. No es igual en cada rincón. Se pliega a los cuerpos, se nutre de ellos. Hay lugares donde la melodía se estira, otras donde desaparece por completo.

Algunos cuentan que el suelo parece recordar tus pasos. Que el aire vibra distinto cuando cierras los ojos y dejas que el ritmo te guíe. Que si te quedas quieto el tiempo suficiente, el espacio empieza a susurrarte, a revelarte su historia a través de frecuencias ocultas.

Otros dicen que el lugar responde a tu estado de ánimo, que proyecta tu energía en forma de sonido. Que si llegas con dudas, la música se fragmenta en ecos dispersos; si te abandonas a la experiencia, todo se alinea y te envuelve.

Pero nadie ha encontrado un patrón definitivo. Porque el lugar no es el mismo dos veces. No es solo un sitio donde se baila; es un lugar donde se escucha, donde cada persona, sin saberlo, deja una huella invisible, una vibración única que se suma a la memoria de las paredes.

Y cuando sales, ya no eres el mismo. La música sigue contigo, aunque el mundo exterior parezca menos resonante, más estático. Y en algún rincón de tu mente, te preguntas si, al moverte, sigues dejando un eco en aquel lugar que nunca deja de latir.

#### Síntesis

"Auralis" es una silent disco en dónde la música se adapta al movimiento de cada persona, reflejando su vibra única y transformando esta misma en tiempo real. No hay una pista fija, sino una composición en constante cambio donde cada paso y posición dentro del lugar influyen en lo que se escucha. Al final de la experiencia, cada participante recibe una representación visual de su vibra mediante una onda que se moldea según los movimientos y zonas recorridas, mostrando la huella que dejó en la música y el espacio


#### IPO


##### Inputs detallados

| Input            | Método involucrado      | Rango/Valores                | Comportamiento esperado                                                                 |
|------------------|--------------------------|------------------------------|-----------------------------------------------------------------------------------------|
| `posX`           | `mouseDragged()`         | [0, width]                   | Determina qué banda del ecualizador (lows, mids, highs) se activa                      |
| `posY`           | `mouseDragged()`         | [0, height]                  | Modifica la ganancia de la banda seleccionada, en un rango de -12 a +12 dB             |
| `mousePressed()` | `mousePressed()`         | Posición del cursor          | Activa el arrastre si se presiona dentro del área de la esfera                         |
| `mouseReleased()`| `mouseReleased()`        | -                            | Finaliza el arrastre                                                                    |
| Click en canvas  | `toggleSound()`          | click                        | Inicia la reproducción de sonido                                                        |

##### Processing


1. Se carga un archivo de sonido y se pasa por un ecualizador de tres bandas.
2. El usuario puede arrastrar una esfera blanca sobre el lienzo.
3. La posición horizontal (`posX`) define cuál de las bandas se controla (low, mid, high).
4. La posición vertical (`posY`) ajusta la ganancia de dicha banda, con valores de -12 a +12 dB.
5. El filtro se actualiza en tiempo real, permitiendo manipular el sonido mientras se arrastra.

##### Código simplificado

```js
if (dragging) {
  posX = constrain(mouseX, 0, width);
  posY = constrain(mouseY, 0, height);

  eqBandIndex = map(posX, 0, width, 0, 3);
  gain = map(posY, height, 0, -12, 12);
  applyEQ(eqBandIndex, gain);
}
```

##### Outputs

Banda afectada del ecualizador (lows, mids, highs) cambia dinámicamente con posX.

Ganancia de esa banda se ajusta dinámicamente con posY.

El sonido se filtra en tiempo real según la posición de la esfera.



En pantalla, se muestra visualmente qué banda está activa.

Si el sonido no está en reproducción, se muestra la indicación "tap to play".
