### Error o comportamiento inesperado

Un error que tenía mi aplicación y lo logré era que si la bolita estaba muy pegada a un borde del ecualizador, esta no modificaba los valores del ecualizador y aparte este problema desembocaba en otro ya que si la bolita no cambiaba valores del ecualizador al mover la bola para otro lado, la aplicación tardaba unos segundos en volver a reaccionar

Para solucionarlo menos mal bastó con leer un poco la parte en dónde estaban las restricciones de la bolita en el ecualizador.

El código antes de solucionar el error estaba así

```js
  currentBand = p.floor(p.map(posX, 0, p.width, 0, eqBandNames.length, true));
  currentGain = p.map(posY, p.height, 0, -12, 12, true);
```

Y para corregirlo lo que hice fue:

```js
  const sectionWidth = p.width / eqBandNames.length;
  currentBand = p.constrain(Math.floor(posX / sectionWidth), 0, eqBandNames.length - 1);
  currentGain = p.map(posY, p.height, 0, -12, 12, true);
```
Lo que hace esto es:

Divide el canvas en secciones iguales según la cantidad de bandas, después
calcula directamente en qué sección está la bolita y 
asegura que el índice nunca exceda el rango válido usando "p.constrain"

### Refinamiento estético 

Refinamientos estéticos con respecto a la versión anterior si hice bastantes, añadí botones, cuadrículas, y una especie de barra que muestra el progreso de la canción, como es bastante código solo mostraré el mini reproductor

```js
  if (audioInitialized && soundFile && soundFile.isLoaded()) {
      let currentTime = isPlaying ? soundFile.currentTime() : 0;
      let totalTime = soundFile.duration();
      
      p.textSize(12);
      p.text(`Tiempo: ${formatTime(currentTime)} / ${formatTime(totalTime)}`, p.width/2, 120);
      
      // Dibujar barra de progreso
      p.noStroke();
      p.fill(50);
      p.rect(50, 135, p.width - 100, 5, 5);
      
      if (totalTime > 0) {
        p.fill(29, 185, 84); // Color Spotify verde
        let progressWidth = p.map(currentTime, 0, totalTime, 0, p.width - 100);
        p.rect(50, 135, progressWidth, 5, 5);
      }
    }
```
