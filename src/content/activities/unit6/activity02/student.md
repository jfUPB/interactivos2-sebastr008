### Inputs

Actualmente estoy simulando la posición del usuario en un canvas de p5.js con una bolita, la posición "x" y "y" en el canvas de la bolita simula la posición del usuario en la discoteca.

También haré que se pueda controlar remotamente con otro cliente; justo igual al ejemplo del profesor empezando el curso.

ELos inputs están conectados con el storytelling ya que cada dependiendo de donde estás posicionado dentro de la discoteca, habrá un efecto diferente, creando así un sonido único cada vez que te mueves, que es lo que básicamente nos cuenta el storytelling

|   Fuente   | Tipo de dato |              Rango             |
|:----------:|:------------:|:------------------------------:|
| Posición X | Decimal      | *depende del tamaño del canva* |
| Posición Y | Decimal      | *depende del tamaño del canva* |


### Processing

Una vez teniendo los datos del input (posición en el canvas de la bola) estos datos se tomarán y la posición "x" de la bola determinará la banda que se va a modificar del ecualizador y la posición "y" modificara la ganancia de esa banda.

También el algoritmo detectará si 2 bolitas están cerca, esto se puede hacer con un radio de proximidad en dónde si la diferencia de los valores de la posición es menor a 10, la música se escuchará un poco más fuerte y también con un poco de reverberación).

Esto motiva a las personas a que se muevan para generar diferentes modificaciones a la canción principal que esté sonando.

### Outputs

El output principal será sonoro, en dónde la ganancia de las frecuencias de la pista principal se modificarán en tiempo real según por dónde se mueva el usuario. También se le aplicará un efecto de reverberación y aumentará el volumen si 2 usuarios están muy cerca

Al modificar la posición del usuario, el algoritmo se encarga de tomar esa nueva posición y modifica las frecuencias para que finalmente el usuario pueda escuchar la música modificada por el mismo.







