#### ¿Qué es p5LiveMedia?

Según lo que entendí en el video acerca de p5LiveMedia es que aprovecha las características del WebRTC (en dónde puedes transmitir esa "multimedia" directamente entre navegadores en tiempo real mediante una conexión peer to peer sin necesidad de que haya un servidor de por medio) y lo usa como base para poder transmitir videos y audio en tiempo real.


#### ¿Qué posibilidades ofrece p5LiveMedia?

Las posibilidades que nos ofrece este "plugin" básicamente todo lo que hemos venido hablando en este curso. Por ejemplo hacer eventos en vivo con cambios de imágenes en tiempo real, usar controles remotos para manejar ciertos parametros en eventos en vivo, etc. 

Mientras se puedan manipular y modificar datos en tiempo real, las posibilidades casi que son infinitas y eso me gusta bastante. Igual, en la página de github dice que por el momento solo es capaz de manejar datos "string" así que por el momento solo se puede manipular imagen y audio con este plugin.


#### Ejemplos revisados:

Los ejemplos que revisé fueron: 
- [Basic Audio/Video Example (video overlayed)](https://editor.p5js.org/shawn/sketches/2AXFd9TLV)
- [Data Only](https://editor.p5js.org/shawn/sketches/w83C-S6DU)
- [Video on Canvas example](https://editor.p5js.org/shawn/sketches/U396jFtFT)

A primera vista no entendí nada del código así que le pregunté a ChatGPT que me explicara más o menos como funcionaba este plugin.

Creo que ya entiendo como funciona la transmisión de datos para los 3 tipos, CANVAS, DATA y CAPTURE

Para **CANVAS**

Al crear una instacia de p5LiveMedia con 'CANVAS' todo el contenido del canvas se captura como un stream de imágenes

```js
let myCanvas = createCanvas(400, 400);
let p5l = new p5LiveMedia(this, "CANVAS", myCanvas, "RoomID");
```

Para que la conexión sea exitosa los 2 deben de estar en la misma RoomID 

Ahora que tenemos claro como se envía, miremos como recibe información.

Esto lo hace mediante el método .on Cuando p5LiveMedia recibe información ejecuta el evento 'stream' y si hay una función conectada a este evento, esta se ejecutará automáticamente.

```js
p5l.on('stream', gotStream); // Se vincula la función gotStream con el evento stream)
```

Luego en la función gotStream se encarga de obtener el canvas del otro.

```js
function gotStream(stream, id) {
  otherCanvas = stream; // stream es el canvas remoto
  print("Recibiendo canvas de: " + id);
}
```


Para **DATA**

Para este tipo, tenemos que enviar nosotros los datos, pero en esencia es lo mismo. Simplemente debemos de guardar los datos en una variable, y enviarlos como un string

```js
let p5l = new p5LiveMedia(this, "DATA", null, "RoomID");

function mousePressed() {
  let dataToSend = {x: mouseX, y: mouseY}; //Almacena los datos
  p5l.send(JSON.stringify(dataToSend)); // Los envía
}
```

Ahora para recibirlos, es totalmente igual al CANVAS donde se usa el gotData igual pero aquí hay que parsear la información que llega.

```js
p5l.on('data', gotData);

function gotData(data, id) {
  let d = JSON.parse(data);
  print(id + " envió: ", d);
  x = d.x;
  y = d.y;
}
```

Y para **CAPTURE** 

Básicamente es lo mismo que todo lo anterior solo que con esto solo capturas video y sonidos de tu micrófono para que los transmitas a otros clientes.








