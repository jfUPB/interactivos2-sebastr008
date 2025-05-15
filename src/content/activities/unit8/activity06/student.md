# Introducción

Auralis es una experiencia sonora inmersiva donde cada participante influye activamente en la música a través de su movimiento en el espacio. La silent disco se transforma en una composición viva, donde la "vibra" única de cada persona es capturada y traducida en tiempo real, creando una conexión íntima entre cuerpo, sonido y entorno. 

---
# Concepto

Dentro de esta Silent Disco cada persona evoca una vibra totalmente única que se ve reflejada en la música que estás escuchando, aparte el entorno en el que se encuentran también tiene su propia "aura". La forma en la que se mueve la gente, la energía que transmiten y la manera en la que interactúan con el espacio crea una experiencia única para cada persona ya que aquí no hay una única canción, hay tantas versiones como personas en la pista, porque cada quien vibra de manera distinta.

El DJ pondrá una base musical, pero cada persona la transformará con su vibra y el aura del lugar en el que se encuentre. La energía del espacio influirá en el sonido, creando pistas únicas que reflejan la conexión entre el individuo y su entorno. Así, la música se convierte en una experiencia viva y en constante evolución.

---

# Narrativa

Dicen que hay un sitio al que no se llega por accidente. No aparece en mapas ni responde a coordenadas, pero quienes han estado ahí aseguran que, una vez que entras, no vuelves a escuchar la música de la misma manera.

Todos coinciden en que no es solo un club, ni una discoteca, ni un lugar común. Es un espacio vivo, un organismo hecho de sonido y movimiento, donde las vibraciones no están en la pista, sino en la forma en que cada persona ocupa el espacio.

No hay dos personas que lo perciban igual. Cada cuerpo, cada paso, cada instante deja una huella distinta. No porque la música cambie, sino porque se revela de forma distinta en cada rincón. Para algunos, los graves resuenan más profundo cerca de los bordes. Para otros, los agudos brillan solo cuando cruzan el centro. El mismo track, infinitas versiones perceptibles, modeladas solo por la posición de quien lo habita.

Dicen que cuando entras por primera vez, no lo notas. Al principio, solo parece una pista de baile envuelta en luces tenues, con un DJ que marca el compás. Pero si prestas atención, te das cuenta de que el sonido no es igual en cada lugar. Se pliega a la arquitectura, se adapta a tu cercanía, y cada esquina guarda una textura distinta.

Algunos cuentan que el aire parece reaccionar cuando te mueves. Que hay zonas donde la música se vuelve más íntima, otras donde se expande. Que si te detienes, la atmósfera se estabiliza, como si te invitara a quedarte. No porque te lea, sino porque te ubica.

Otros dicen que el lugar no cambia, pero sí cómo lo escuchas. Que tu posición activa una ecualización única. Que al moverte, redescubres el mismo track, una y otra vez, sin que este cambie en absoluto.

Pero nadie ha encontrado un patrón definitivo. Porque el lugar no es el mismo dos veces. No es solo un sitio donde se baila; es un sitio donde se explora. Y cada persona, sin saberlo, deja una huella espacial —un mapa invisible de frecuencias vividas.

Y cuando sales, ya no eres el mismo. La música sigue contigo, aunque el mundo exterior parezca menos profundo, más plano. Y en algún rincón de tu memoria, te preguntas si, al cambiar de lugar, sigues reconfigurando la canción.

--- 

# ¿Cómo se simulará esto?

Esta simulación se llevara a cabo en una aplicación utilizando p5.js (una libreria para crear aplicaciones), en donde encontrarás 2 tipos de usuarios que son: Host y Guest

**Host:**

Este usuario tendrá el control de la música, podrá escoger, reproducir, parar y sincronizar la música (como el DJ de una fiesta)

**Guest**

Este usuario cumplirá el rol de persona que está dentro de la discoteca bailando, en dónde la bolita representa la persona y el cuadrado representa la discoteca. La bolita se puede arrastrar con el mouse simulando el movimiento de la persona dentro de la discoteca, haciendo así que la música cambie según la posición de esta.

---

# Diseño IPO

En esta instalación sonora, el participante puede modificar el audio en tiempo real mediante la interacción con una esfera en la pantalla. Esta esfera controla un **ecualizador de tres bandas** (graves, medios y agudos) que altera la forma en que se percibe la música.

## Controles

- ### Movimiento horizontal (`posX`)  
  Al arrastrar la esfera de izquierda a derecha, se elige qué banda del ecualizador se está controlando:  
  - Izquierda → **Graves (low)**  
  - Centro → **Medios (mid)**  
  - Derecha → **Agudos (high)**  

- ### Movimiento vertical (`posY`)  
  Al mover la esfera hacia arriba o hacia abajo, se ajusta la **ganancia** (volumen) de la banda seleccionada.  
  - Arriba → se **aumenta** la ganancia (hasta +12 dB)  
  - Abajo → se **reduce** la ganancia (hasta -12 dB)

Estos cambios se aplican de forma continua mientras la esfera se arrastra, permitiendo al usuario "moldear" el sonido según su posición.

## Interacción

- `mousePressed()`: Si el clic se hace dentro del área de la esfera, se activa el modo de arrastre.  
- `mouseDragged()`: Actualiza `posX` y `posY`, y recalcula en tiempo real la banda activa y su ganancia.  
- `mouseReleased()`: Finaliza el arrastre.  
- **Click en canvas**: Si el sonido aún no está reproduciéndose, lo inicia.

## Visualización

En pantalla se muestra:

- Qué banda del ecualizador estás controlando.
- Un mensaje de **“tap to play”** si la música aún no se ha activado.

---

# Proceso 

## 1. Asignación de roles

Cuando un usuario se conecta, el sistema determina si hay un host (anfitrión) activo.  
- Si no lo hay, el primer usuario se convierte en host.  
- Todos los demás serán guests (invitados).

Esto establece la jerarquía para el control de reproducción.

---

## 2. Sincronización de la música

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

## 3. Ecualización individual

Una vez que la canción se reproduce, cada guest tiene la capacidad de personalizar cómo la escucha, sin afectar a los demás.

Esto se logra con un ecualizador local de tres bandas (graves, medios y agudos).  
La interfaz gráfica (una bolita arrastrable) determina:
- qué banda modificar (posición horizontal),
- cuánto subir o bajar esa frecuencia (posición vertical).

Este control ajusta un parámetro llamado *ganancia* en tiempo real, solo para ese usuario.

# Video demostrativo

https://github.com/user-attachments/assets/f2e01700-8624-4953-bdad-fa3bd28da339


# Tutorial

## Prerrequisitos para replicar el proyecto

- node.js (obligatorio)
- Cuenta GitHub
- GitHub desktop (opcional, mejor por su fácilidad al clonar repositorios)
- Navegador web moderno

---
## Paso a paso para instalar node.js

Para poder replicar exitosamente este proyecto debes entrar a la página oficial y descargar su instalador. Debes de asegurarte de descargar el instalador correcto (si tu PC es de 32 bits descarga el instalador x86 y si es de 64 bits descarga el de x64)

Para poder saber la arquitectura de tu PC es tan sencillo como darle click derecho al icono de windows en tu barra de tareas, luego le das a sistema  y fijarse en donde dice "Tipo de sistema" ahí te dira de cuantos bits es tu PC

---

## Clonar el respositorio 


### Clonar con GitHub Desktop (RECOMENDADO PARA PRINCIPIANTES)

1. **Abrir GitHub Desktop**  
Ejecuta la aplicación GitHub Desktop en tu computadora.

2. **Iniciar sesión**  
Si no has iniciado sesión, hazlo con tu cuenta de GitHub.

3. **Clonar un repositorio**  
- Haz clic en **File > Clone Repository**.  
- Selecciona la pestaña **URL**.  
- Pega la URL HTTPS del repositorio (ejemplo: `https://github.com/usuario/repositorio.git`).  
- Elige la carpeta local donde quieres guardar el proyecto.  
- Haz clic en **Clone**.

4. **Listo**  
El repositorio se descargará y aparecerá en GitHub Desktop listo para usarse.

---

### Clonar con Git Bash (NO RECOMENDADO PARA PRINCIPIANTES

1. **Abrir Git Bash**  
   En tu computadora, busca y abre la aplicación **Git Bash**.

2. **Navegar a la carpeta donde quieres clonar**  
   Usa el comando `cd` para ir a la carpeta deseada.  
   Por ejemplo, para ir a Documentos:  

```bash
cd ~/Documents
```

3. **Copiar la URL del repositorio**  
Ve al repositorio en GitHub y copia la URL HTTPS (algo como `https://github.com/usuario/repositorio.git`).

4. **Clonar el repositorio**  
En Git Bash, escribe:  

```bash
git clone https://github.com/usuario/repositorio.git
```

Reemplaza la URL con la que copiaste.

5. **Entrar a la carpeta del repositorio**  

```bash
cd repositorio
```


6. **Listo**  
Ahora tienes el proyecto en tu máquina para trabajar.


### Consejos

- Asegúrate de tener Git instalado para usar Git Bash.  
- Con GitHub Desktop no necesitas usar comandos; todo es gráfico.  
- En ambos casos, puedes abrir la carpeta del proyecto con tu editor de código favorito para empezar a trabajar.

## Iniciando el proyecto

Para poder iniciar la aplicación exitosamente, primeramente debes de abrir una Consola de Comandos (CMD), esto lo puedes hacer desde el menú de Windows y escribiendo CMD.

Una vez lo hayas encontrado, le das click derecho y luego le das donde dice ejecutar como administrador

Te pedirá que le des permisos y le das en aceptar.

Luego tendrás que ir a la carpeta en donde está el proyecto, para eso puedes usar

```cmd
cd "Ruta de la carpeta"
```
Una vez estés dentro de la carpeta, para poder iniciar la apliación deberás escribir lo siguiente

```cmd
npm start
```

Y le das enter.

Una vez le des enter te saldrá un mensaje parecido a esto 

```cmd
> audio-collaboration@1.0.0 start
> node server.js

Servidor escuchando en http://localhost:3000
```

Esa dirección URL es en donde estará la aplicación. 

Felicidades! Ahora tienes corriendo la aplicación, el primer usuario que entre será el host y se encargará de elegir, reproducir, pausar y sincronizar la música, si abres una pestaña nueva en el navegador y pones la misma dirección URL entrarás como GUEST y podrás ecualizar la música a tu gusto moviendo la bolita.

---

# Tecnologías usadas

- p5.js
- p5.sound
- socket.io
- node.js + Express

---

# Síntesis

"Auralis" es una silent disco en dónde la música se adapta al movimiento de cada persona, reflejando su vibra única y transformando esta misma en tiempo real. No hay una pista fija, sino una composición en constante cambio donde cada paso y posición dentro del lugar influyen en lo que se escucha. Al final de la experiencia, cada participante recibe una representación visual de su vibra mediante una onda que se moldea según los movimientos y zonas recorridas, mostrando la huella que dejó en la música y el espacio
