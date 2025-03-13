##### Divisón Espacial Recursiva (BSP)

Funciona dividiendo un espacio en regiones más pequeñas de manera recursiva, como si cortaras una hoja de papel en mitades, luego esas mitades en otras más pequeñas, y así sucesivamente. Se usa en la generación de niveles en videojuegos y también en la optimización de gráficos, permitiendo que los motores de juego manejen mejor los entornos complejos.

###### Ejemplos

- DOOM y Quake usaron BSP para estructurar mapas y hacer que el motor gráfico solo renderizara lo necesario.
- Juegos roguelike como Spelunky o Enter the Gungeon utilizan BSP para generar mazmorras con habitaciones bien conectadas.

###### Potencial

- Mejora el rendimiento al dividir los niveles en secciones que pueden cargarse o ignorarse según sea necesario.
- Permite generar mundos más dinámicos con caminos alternativos y secretos.


##### Grafos y Gramáticas Generativas

Un grafo es como un mapa de misiones interconectadas. Cada nodo representa un evento dentro de una misión y los enlaces indican qué eventos pueden seguir después.

Ejemplo:

Un NPC te pide recuperar un objeto.

El juego elige aleatoriamente un lugar donde se encuentra el objeto, dependiendo de tu progreso en el juego, el dueño del objeto puede ser un bandido, un mago o incluso un jefe poderoso. Cuando lo devuelves, el NPC te puede dar una recompensa diferente dependiendo de si perteneces a su gremio.

Aquí, el grafo organiza las conexiones:

- Si hablas con un NPC, se activa una misión.

- Si ya has hecho una misión similar, el juego busca otro NPC.

- Si ya derrotaste al jefe en esa cueva, el juego elige otra ubicación.

Las gramáticas generativas son un conjunto de reglas que se aplican para generar textos, nombres y diálogos.

Ejemplo:
Si hablas con un posadero en Skyrim y pides trabajo, el juego genera un diálogo como:

"Escuché que en [ubicación] hay problemas con [enemigo]. Si te encargas, te pagaré con [recompensa]."

###### Ejemplo:

En Skyrim, hay un sistema llamado Radiant Story que genera misiones secundarias dinámicamente. No están escritas una por una, sino que se generan con reglas y conexiones entre eventos, usando grafos y gramáticas generativas.

##### Potencial:

- Permite generar contenido dinámico y variado sin necesidad de escribirlo manualmente.
- Crea experiencias únicas para cada jugador, haciendo que el mundo se sienta más vivo.
- Se puede aplicar en narrativa, diseño de niveles, generación de misiones e incluso música.

#### Wave Function Collapse (WFC)

WFC es un algoritmo que genera contenido basado en restricciones, similar a un sudoku: cada celda de una cuadrícula puede tomar ciertos valores, pero debe respetar patrones de sus vecinos. Se usa en la generación de texturas, mapas y estructuras, garantizando que el resultado sea coherente y variado.

##### Ejemplos:

- Normalmente se usa en arte generativo para crear patrones visuales sin repeticiones obvias.
- Caves of Qud aplica WFC para crear mapas únicos y consistentes en cada partida.

##### Potencial:

- Permite la generación de mundos de juego sin errores estructurales.
- Puede aplicarse a diseño de texturas, arquitectura procedural y narrativa basada en restricciones.
- Facilita la creación de entornos complejos sin necesidad de predefinir cada detalle manualmente.
