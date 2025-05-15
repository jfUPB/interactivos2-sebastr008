#### Descripción de la aplicación

La aplicación hará uso de la libreria p5LiveMedia que nos ayudara a transmitir la información que queremos enviar. 

Esta aplicación está pensada para shows de Dj's en vivo en dónde las personas gracias a sensores de movimiento podrán modificar los visuales que se presentan en una pantalla.

#### ¿Cómo hace uso de p5LiveMedia?

Mediante la transmisión de datos que permite hacer p5LiveMedia podemos enviar los datos del acelerómetro para que segun la posición se muevan las particulas para un lado o para otro

#### ¿Como se relaciona con el proyecto del curso?

Se relaciona ya que es en un evento en vivo en dónde se van a modificar parámetros de las imágenes en tiempo real, aparte de que un tercero puede controlar estos visuales si es necesario.

#### Tutorial para replicar la aplicación

##### Paso 1: Importar p5LiveMedia y otras librerias necesarias

Para poder utilizar todas las ventajas que nos proporciona p5LiveMedia primero debemos de importar sus librerias a nuestro proyecto de p5.js. Para eso debemos ir a [este repositorio](https://github.com/vanevery/p5LiveMedia) y en el archivo README, en la parte superior encontraremos las librerias necesarias.

Luego debemos crear un proyecto nuevo de p5.js e importarlas en nuestro index.html

![image](https://github.com/user-attachments/assets/719fe57b-8c72-43cd-9b04-44e114005deb)

##### Paso 2: Crear nuestra room, definir que tipos de datos vamos a enviar y enviarlos.

p5LiveMedia funciona mediante "rooms" para conectar dispositivos unos con otros, también esta libreria permite la transmision de 3 tipos de "datos" en este caso, usaremos el tipo "DATA" ya que enviaremos la posición de nuestro celular.

En el setup debemos de inicializar la conexión con p5LiveMedia y especificamos lo que enviaremos, esto lo hacemos con la siguiente linea de código:

```js
 p5lm = new p5LiveMedia(this, "DATA", null, "SalaCool");
```

En la parte que dice "SalaCool" será el ID de la room que creamos y la necesitaremos más adelante para realizar la conexión entre los dispositivos

Y si queremos, podemos verificar si la conexión se hizo exitosamente con:

```js
 p5lm.on('data', () => console.log("Conectado correctamente"));
```

Luego debemos capturar los datos del acelerómetro del dispositivo que estemos usando, para eso podemos usar las funciones que ya trae p5.js que nos permite capturar esta información

```js
let accelX = rotationY; // Movimiento lateral
  let accelY = rotationX; // Movimiento adelante/atrás
```

Luego estos datos son los que enviaremos mediante p5LiveMedia con las siguientes lineas de código:

```js
 if (p5lm) {
    let dataToSend = {
      x: accelX,
      y: accelY
    };
    p5lm.send(JSON.stringify(dataToSend));
  }
}
```

En dónde básicamente verifica si se ha incializado p5LiveMedia y mediante la funcion p5lm.send envía los datos que recibirá nuestro receptor.

##### Paso 3: Recibir la información y transformarla en outputs visuales.

En otro archivo aparte, primeramente debemos volver a importar las mismas librerias que importamos en el PASO 1. Una vez realizado esto, debemos de volver a inicializar p5LiveMedia en este archivo, nuevamente lo hacemos igual
**IMPORTANTE:**  La room ID debe ser LA MISMA del anterior archivo, si no, no habrá conexión entre los dispositivos.

```js
p5lm = new p5LiveMedia(this, "DATA", null, "PerlinAcelerometro");
  p5lm.on('data', gotData);
```

Notemos que aquí añadimos algo nuevo y es el gotData, básicamente p5lm.on es una función que escucha eventos, en este caso escucha cuando llega información y dispara la función "gotData".

La función gotData, como su nombre lo dice, se encarga de recibir la información, traducirla y pasarla a variables que pueda usar el programa lo que sea que necesitemos.

Ahora en mi caso, puse a funcionar esto con particulas que se mueven dependiendo del movimiento de mi celular, no profundizaré mucho en como funciona lo de las particulas ya que no es el tema, solo profundizaré en dónde se involucre el p5LiveMedia.

Mi programa crea una clase llamada particula el cual se encarga de generar una elipse en partes aleatorias del canvas, les da una aceleración base y un offset tanto de X como de Y aleatorio.

Luego, dentro de esta clase hay 2 funciones importantes, update y setDirection las cuales voy a mostrar

```js
update() {
    // Movimiento con ruido Perlin + dirección del acelerómetro
    this.x += this.vx/2 + (noise(this.xOff) - 0.5) * this.baseSpeed ;
    this.y += this.vy/2 + (noise(this.yOff) - 0.5) * this.baseSpeed ;

    // Actualizar el ruido Perlin
    this.xOff += 0.01;
    this.yOff += 0.01;

    // Limitar dentro del canvas
    this.x = (this.x + width) % width;
    this.y = (this.y + height) % height;
  }

```

```js
setDirection(ax, ay) {
    // Aumentar el impacto del acelerómetro
    this.vx += ax ; // Más sensible al movimiento horizontal
    this.vy += ay ; // Más sensible al movimiento vertical

    // Limitar la velocidad
    this.vx = constrain(this.vx, -10, 10);
    this.vy = constrain(this.vy, -10, 10);
  }
```

La función update se encarga de actualizar todos los valores que se inicializaron anteriormente al principio de la calse y setDirection, se encarga de modificar los valores de la velocidad.

Se acuerdan de gotData? bueno aquí es cuando es importante ya que gotData lo que hace es agarrar esa información que le llega y la mete dentro de las variables accelX y accelY, luego estas variables son usadas como parámetros para la función setDirection.

```js

function gotData(data) {
  let d = JSON.parse(data);
  let accelX = float(d.x);
  let accelY = float(d.y);

  // Aplicar el movimiento de forma más notoria
  for (let p of particles) {
    p.setDirection(accelX, accelY);
  }
}
```

Y la aplicación en esencia sería eso! Voy a dejar los links del p5.js para que pruebes la aplicación. Debes de tener un dispositivo con acelerómetro para que funcione

[PARA DISPOSITIVO CON ACELERÓMETRO](https://editor.p5js.org/sebastr008/sketches/Wh8SDV6DX)

[EN DONDE SE PROYECTARÁN LAS PARTICULAS](https://editor.p5js.org/sebastr008/sketches/Dv1SOGFR0)

Ten en cuenta que primero debes de ejecutar en donde se proyectarán las particulas y luego el dispositivo que tiene el acelerómetro

have fun









