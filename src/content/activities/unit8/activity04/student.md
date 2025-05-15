### Introducción

Auralis es una experiencia sonora inmersiva donde cada participante influye activamente en la música a través de su movimiento en el espacio. La silent disco se transforma en una composición viva, donde la "vibra" única de cada persona es capturada y traducida en tiempo real, creando una conexión íntima entre cuerpo, sonido y entorno. 

### Concepto

Dentro de esta Silent Disco cada persona evoca una vibra totalmente única que se ve reflejada en la música que estás escuchando, aparte el entorno en el que se encuentran también tiene su propia "aura". La forma en la que se mueve la gente, la energía que transmiten y la manera en la que interactúan con el espacio crea una experiencia única para cada persona ya que aquí no hay una única canción, hay tantas versiones como personas en la pista, porque cada quien vibra de manera distinta.

El DJ pondrá una base musical, pero cada persona la transformará con su vibra y el aura del lugar en el que se encuentre. La energía del espacio influirá en el sonido, creando pistas únicas que reflejan la conexión entre el individuo y su entorno. Así, la música se convierte en una experiencia viva y en constante evolución.

### Narrativa

Dicen que hay un sitio al que no se llega por accidente. No aparece en mapas ni responde a coordenadas, pero quienes han estado ahí aseguran que, una vez que entras, no vuelves a escuchar la música de la misma manera.

Todos coinciden en que no es solo un club, ni una discoteca, ni un lugar común. Es un espacio vivo, un organismo hecho de sonido y movimiento, donde las vibraciones no están en la pista, sino en la forma en que cada persona ocupa el espacio.

No hay dos personas que lo perciban igual. Cada cuerpo, cada paso, cada instante deja una huella distinta. No porque la música cambie, sino porque se revela de forma distinta en cada rincón. Para algunos, los graves resuenan más profundo cerca de los bordes. Para otros, los agudos brillan solo cuando cruzan el centro. El mismo track, infinitas versiones perceptibles, modeladas solo por la posición de quien lo habita.

Dicen que cuando entras por primera vez, no lo notas. Al principio, solo parece una pista de baile envuelta en luces tenues, con un DJ que marca el compás. Pero si prestas atención, te das cuenta de que el sonido no es igual en cada lugar. Se pliega a la arquitectura, se adapta a tu cercanía, y cada esquina guarda una textura distinta.

Algunos cuentan que el aire parece reaccionar cuando te mueves. Que hay zonas donde la música se vuelve más íntima, otras donde se expande. Que si te detienes, la atmósfera se estabiliza, como si te invitara a quedarte. No porque te lea, sino porque te ubica.

Otros dicen que el lugar no cambia, pero sí cómo lo escuchas. Que tu posición activa una ecualización única. Que al moverte, redescubres el mismo track, una y otra vez, sin que este cambie en absoluto.

Pero nadie ha encontrado un patrón definitivo. Porque el lugar no es el mismo dos veces. No es solo un sitio donde se baila; es un sitio donde se explora. Y cada persona, sin saberlo, deja una huella espacial —un mapa invisible de frecuencias vividas.

Y cuando sales, ya no eres el mismo. La música sigue contigo, aunque el mundo exterior parezca menos profundo, más plano. Y en algún rincón de tu memoria, te preguntas si, al cambiar de lugar, sigues reconfigurando la canción.

### Diseño IPO

Ten en cuenta que los datos son SIMULADOS, es decir, la bolita simula tu posición en la discoteca

En esta instalación sonora, el participante puede modificar el audio en tiempo real mediante la interacción con una esfera en la pantalla. Esta esfera controla un **ecualizador de tres bandas** (graves, medios y agudos) que altera la forma en que se percibe la música.

#### Controles

- **Movimiento horizontal (`posX`)**  
  Al arrastrar la esfera de izquierda a derecha, se elige qué banda del ecualizador se está controlando:  
  - Izquierda → **Graves (low)**  
  - Centro → **Medios (mid)**  
  - Derecha → **Agudos (high)**  

- **Movimiento vertical (`posY`)**  
  Al mover la esfera hacia arriba o hacia abajo, se ajusta la **ganancia** (volumen) de la banda seleccionada.  
  - Arriba → se **aumenta** la ganancia (hasta +12 dB)  
  - Abajo → se **reduce** la ganancia (hasta -12 dB)

Estos cambios se aplican de forma continua mientras la esfera se arrastra, permitiendo al usuario "moldear" el sonido según su posición.

#### Interacción

- `mousePressed()`: Si el clic se hace dentro del área de la esfera, se activa el modo de arrastre.  
- `mouseDragged()`: Actualiza `posX` y `posY`, y recalcula en tiempo real la banda activa y su ganancia.  
- `mouseReleased()`: Finaliza el arrastre.  
- **Click en canvas**: Si el sonido aún no está reproduciéndose, lo inicia.

#### Visualización

En pantalla se muestra:

- Qué banda del ecualizador estás controlando.
- Un mensaje de **“tap to play”** si la música aún no se ha activado.

---

### Proceso 

#### 1. Asignación de roles

Cuando un usuario se conecta, el sistema determina si hay un host (anfitrión) activo.  
- Si no lo hay, el primer usuario se convierte en host.  
- Todos los demás serán guests (invitados).

Esto establece la jerarquía para el control de reproducción.

---

#### 2. Sincronización de la música

El host es el único que controla la reproducción real (play, pause, salto).  
Cada cierto tiempo, el host transmite a los demás:
- si la música está reproduciéndose o pausada,
- el tiempo exacto donde va la canción.

Los guests reciben ese estado y sincronizan su propia reproducción local.  
Si están desincronizados por más de un segundo, saltan al tiempo correcto.

```js
if (Math.abs(currentTime - targetTime) > 1) {
  jumpTo(targetTime); // sincroniza
}
```

---

#### 3. Ecualización individual

Una vez que la canción se reproduce, cada guest tiene la capacidad de personalizar cómo la escucha, sin afectar a los demás.

Esto se logra con un ecualizador local de tres bandas (graves, medios y agudos).  
La interfaz gráfica (una bolita arrastrable) determina:
- qué banda modificar (posición horizontal),
- cuánto subir o bajar esa frecuencia (posición vertical).

Este control ajusta un parámetro llamado *ganancia* en tiempo real, solo para ese usuario.







