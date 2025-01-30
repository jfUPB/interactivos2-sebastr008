##### Ejemplo #1 

URL: https://openprocessing.org/sketch/2338928

Este código crea particulas a partir de la clase Particles, luego de crearlas las conecta con una linea creando así una cuadrícula, el codigo implementa fenónemonos físicos con el mouse al presionarlo y moverlo simulando una tela o cortina.

Las modificaciones que le hice al codigo fue simplemente cambiar algunos valores de las variables que se encargan de controlar la rigidez de la tela y el espacio que hay entre cuadro y cuadro

###### Valores originales

```js
let cloth;
let gravity;
let spacing = 20;
let cols, rows;
let stiffness = 0.28;
let damping = 0.95;  
let cutting = false;
let grabbedParticle = null;  
```

Las variables que modifiqué fueron "spacing" y "damping". La variable spacing se encarga de controlar cuanto espacio hay entre cuadros, entre más bajo sea este valor, más cuadros se van a tener que procesar.

La variable damping se encarga de controlar que tanto rebota la tela al cortarla o al moverla.


###### Ejemplo 2

URL: https://openprocessing.org/sketch/1469411

Este codigo genera un patrón artístico interesante generando lineas en sitios y angulos completamente diferentes, luego la funcion drawLineByPoint es la que se encarga de hacer que las lineas se vean distorsionadas y borrosas.

En este código quise que en vez de que las trazadas solo fueran negras, quise que cada vez que se ejecute el codigo las lineas salgan de colores completamente aleatorios, esto lo hice añadiendo variables de hue, saturation, brightness y alpha, luego hice que estas variables tomaran valores completamente aleatorios y así ya las lineas tienen colores completamente aleatorios

