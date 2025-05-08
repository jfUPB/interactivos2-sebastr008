### Lógica principal del proceso

Claramente no está todo el código completo pero aquí es dónde se modifica la ganancia de las frecuencias del ecualizador, lo que hace que suene diferente dependiendo de donde este la bola.

```js
function updateEQ() {
  for (let i = 0; i < eqBandNames.length; i++) {
    if (i === currentBand) {
      eq.bands[i].gain(currentGain);
      console.log(`[PROCESO] Aplicando gain a ${eqBandNames[i]}: ${currentGain.toFixed(1)} dB`);
    }
  }
}

```

Luego la lógica se activa desde el draw constantemente:

```js
if (audioInitialized) {
  updateEQ();
}

```


### Generación de datos simulados

La simulación de los inputs están en el guest-skecth.js en dónde se tiene en cuenta la posición de la bola modificada por el mouse. 

```js
p.mousePressed = function() {
    let d = p.dist(p.mouseX, p.mouseY, posX, posY);
    if (d < 25) {
      dragging = true;
    }
  };

  p.mouseDragged = function() {
    if (dragging) {
      posX = p.constrain(p.mouseX, 0, p.width);
      posY = p.constrain(p.mouseY, 0, p.height);
    }
  };

  p.mouseReleased = function() {
    dragging = false;
  };

```

Luego posX y posY se usan para modificar la frecuencia y la ganancia del ecualizador

```js
currentBand = p.floor(p.map(posX, 0, p.width, 0, eqBandNames.length, true));
currentGain = p.map(posY, p.height, 0, -12, 12, true);

console.log(`[SIM] Banda: ${eqBandNames[currentBand]}, Gain: ${currentGain.toFixed(1)} dB`);

```

### Algunos console.logs

Se usaron console.log() para comprobar que los datos simulados se están generando correctamente y que el proceso los está usando para modificar el sonido:

```js
console.log(`[SIM] Banda: ${eqBandNames[currentBand]}, Gain: ${currentGain.toFixed(1)} dB`);
console.log(`[PROCESO] Aplicando gain a ${eqBandNames[i]}: ${currentGain.toFixed(1)} dB`);

```



