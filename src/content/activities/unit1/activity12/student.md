URL: https://editor.p5js.org/sebastr008/sketches/FrGhoX3nD

En esta actividad tuve que investigar bastantes cosas, ya que no tenía ningún conocimiento previo sobre como modificar los pixeles de una imagen en p5.js

##### Cargar imagen 
Primeramente se debe de crear una variable en donde se almacenará la imagen. Luego con la funcion preload se carga la imagen con la función loadImage

```js
let img; 

function preload() {
  img = loadImage('WLR.png'); 
}
```

Luego en la función draw se puede mostrar la imagen simplemente con la función image

##### Modificación de pixeles

La modificación de pixeles se hace mediante el array que se crea al usar la función loadPixels(), el array en cuestión es img.pixels[]

En mi ejemplo lo que hice fue mover los pixeles hacia la derecha intercalando las filas. Para eso tuve que crear un array nuevo donde se guardaran primero todas las posiciones de los pixeles de la imagen actual.

```js
for (let y = 0; y < img.height; y += 4) { // Intercala las filas
    let row = [];  // Array donde se guardaran los pixeles

    // Guarda la fila de píxeles
    for (let x = 0; x < img.width; x++) {
      let index = (y * img.width + x) * 4;
      row.push([
        img.pixels[index],     // R
        img.pixels[index + 1], // G
        img.pixels[index + 2], // B
        img.pixels[index + 3]  // A
      ]);
    }
```

Una vez guardados los pixeles en el array mío, vamos a modificar esos valores con la función unshift y pop 

```js
let shiftAmount = int(random(1, 10)); 
      for (let i = 0; i < shiftAmount; i++) {
        row.unshift(row.pop());
        }
```


Y ahora simplemente los valores nuevos que quedaron en el array mío los pasamos al array que creo la función loadPixels() y así ya se actualizaría la posición de los pixeles en la imagen como tal 

```js
for (let x = 0; x < img.width; x++) {
      let index = (y * img.width + x) * 4;
      img.pixels[index] = row[x][0];
      img.pixels[index + 1] = row[x][1];
      img.pixels[index + 2] = row[x][2];
      img.pixels[index + 3] = row[x][3];
    }
  }
```

Por último usamos la función updatePixels() para que ya la imagen muestre los valores actualizados.

