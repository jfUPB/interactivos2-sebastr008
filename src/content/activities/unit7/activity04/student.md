**SE TOMAN LOS INPUTS**

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
}, 'canvasContainer');
```

**ESTOS INPUTS SE METEN EN UNA VARIABLE** 

```js
currentBand = p.floor(p.map(posX, 0, p.width, 0, eqBandNames.length, true));
currentGain = p.map(posY, p.height, 0, -12, 12, true);
```

**ESTAS VARIABLES MODIFICAN EL OUTPUT**

```js
function updateEQ() {
    // Solo actualizar la banda correspondiente a la posición X
    for (let i = 0; i < eqBandNames.length; i++) {
      if (i === currentBand) {
        eq.bands[i].gain(currentGain);
      }
    }
  }
```

### Imagen o GIF

Como es algo que es puramente sonoro, en clase mostraré el proyecto.

### Como el IPO se manifiesta en mi código

En el IPO que presenté en la unidad 6 decía que iba a implementar proximidad con las bolitas que estuvieran cerca, pero no lo quise implementar primero porque la reverb y otros efectos con p5 laguean demasiado el programa y no funciona bien, segundo porque no tengo tiempo de ponerme a investigar como más le puedo añadir reverb a una pista ya existente. 

De resto, todo lo que presenté en el IPO lo pude implementar correctamente


