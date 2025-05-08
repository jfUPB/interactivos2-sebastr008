### Describe brevemente la estructura de carpetas que creaste y por qué la elegiste.

La estructura de carpetas que tengo, es tomada del ejemplo que vimos en las anteriores unidades a continuación adjuntaré una imágen de los archivos y carpetas de mi proyecto.

![image](https://github.com/user-attachments/assets/54a6d87d-7646-467c-b930-e87cc1aaa04e)

Use esta estructura porque fue la que me quedó más clara y con la que siento que queda mejor ordenado todo.

Mi proyecto tiene 2 sketch.js, uno que es el host (encargado de reproducir, sincronizar y pausar la música) y otro que es el guest (encargado de modificar la música que escucha)

### Muestra el código inicial de tu index.html (solo la sección <head> con los enlaces a librerías es suficiente).

```html

  
  <script src="/socket.io/socket.io.js"></script>
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/addons/p5.sound.min.js"></script>

```

Las librerias que importé fueron las de p5, socket.io y p5.sound.

Ahora a continuación mostraré el setup y el draw de mi sketch.js. El proyecto ya está casi que terminado, por eso es que hay bastantes cosas, aparte, tuve que usar 2 sketchs, uno para el host (el dj que pone play a la música) y otro para el guest (el que modifica la musica)

**GUEST-SKETCH**
```js

p.setup = function() {
    let cnv = p.createCanvas(400, 400);
    cnv.parent('canvasContainer');
    
    // Crear un div para mensajes de estado
    statusDiv = p.createDiv('Esperando al host...');
    statusDiv.parent('canvasContainer');
    statusDiv.class('status-message');
    
    // Botón para inicializar audio en iOS
    playButton = p.createButton('Iniciar Audio');
    playButton.parent('canvasContainer');
    playButton.mousePressed(initAudio);
    playButton.class('play-button');
    
    // Inicializar posición de la bolita en el centro
    posX = p.width / 2;
    posY = p.height / 2;
    
    // Configurar el ecualizador para este invitado
    eq = new p5.EQ(eqBandNames.length);
    soundFile.disconnect();
    eq.process(soundFile);
    
    // Escuchar eventos del socket
    socket.on('playStateChanged', (state) => {
      // Solo sincronizar si el audio ya está inicializado
      if (audioInitialized) {
        syncWithHost(state);
      } else {
        // Guardar el estado para sincronizar cuando se inicialice
        statusDiv.html('⚠️ Presiona "Iniciar Audio" para escuchar');
        isPlaying = state.isPlaying;
      }
    });
    
    socket.on('syncTime', (state) => {
      if (audioInitialized) {
        syncWithHost(state);
      }
    });
    
    // Verificar el estado actual al cargar
    socket.on('currentState', (state) => {
      if (state.isPlaying) {
        isPlaying = state.isPlaying;
        if (!audioInitialized) {
          statusDiv.html('⚠️ Presiona "Iniciar Audio" para escuchar la música');
        }
      }
    });
  };

```

```js
p.draw = function() {
 p.background(30);
    
    // Título
    p.textAlign(p.CENTER);
    p.textSize(24);
    p.fill(255);
    p.text('GUEST', p.width/2, 40);
    
    // Instrucciones
    p.textSize(14);
    p.fill(255);
    p.text('Arrastra la bolita para modificar TU sonido', p.width/2, 70);
    
    // Mostrar estado de reproducción
    p.textSize(16);
    if (!audioInitialized) {
      p.fill(255, 100, 100);
      p.text('Audio no inicializado - Presiona el botón', p.width/2, 95);
    } else {
      p.fill(255);
      p.text(isPlaying ? 'Reproduciendo' : 'Esperando al host...', p.width/2, 95);
    }
    
    // Mostrar tiempo de reproducción
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
    
    // Calcular banda y valor del ecualizador basado en la posición
    currentBand = p.floor(p.map(posX, 0, p.width, 0, eqBandNames.length, true));
    currentGain = p.map(posY, p.height, 0, -12, 12, true);
    
    // Mostrar información de la banda actual
    p.fill(255, 40, 255);
    p.textSize(22);
    p.text(eqBandNames[currentBand], p.width/2, 170);
    
    // Mostrar valor del gain
    p.textSize(16);
    p.fill(255);
    p.text(p.nfc(currentGain, 1) + ' dB', p.width/2, 195);
    
    // Dibujar líneas de referencia
    drawReferenceLines();
    
    // Dibujar la bolita
    p.fill(100, 150, 255);
    p.ellipse(posX, posY, 50, 50);
    
    // Actualizar el ecualizador según la posición de la bolita
    if (audioInitialized) {
      updateEQ();
    }
  };

```

**HOST-SKETCH**


```js
p.setup = function() {
    let cnv = p.createCanvas(400, 400);
    cnv.parent('canvasContainer');
    
    // Crear el ecualizador (el host no modificará el sonido global)
    eq = new p5.EQ(eqBandNames.length);
    soundFile.disconnect();
    eq.process(soundFile);
    
    // Botones de control
    let controlsDiv = p.createDiv();
    controlsDiv.parent('canvasContainer');
    controlsDiv.class('controls');
    
    playButton = p.createButton('Reproducir');
    playButton.parent(controlsDiv);
    playButton.mousePressed(toggleSound);
    
    syncButton = p.createButton('Sincronizar Clientes');
    syncButton.parent(controlsDiv);
    syncButton.mousePressed(syncClients);
    
    // Estilo del canvas
    p.background(30);
    p.textAlign(p.CENTER);
    p.textSize(16);
    p.fill(255);
    p.text('HOST: Controla la reproducción global', p.width/2, 50);
    
    // Configurar su propio ecualizador para el host
    setupHostEQ();
    
    // Actualizar la interfaz
    updateDisplay();
    
    // Configurar timer para actualizar el tiempo de reproducción
    setInterval(() => {
      if (isPlaying && soundFile.isPlaying()) {
        socket.emit('updateTime', soundFile.currentTime());
      }
    }, 1000);
  };
```

```js
 p.draw = function() {
    p.background(30);
    
    // Dibujar título
    p.textSize(24);
    p.fill(255);
    p.text('HOST', p.width/2, 40);
    
    // Mostrar estado actual
    p.textSize(16);
    p.text(isPlaying ? 'Reproduciendo' : 'Pausado', p.width/2, 70);
    
    // Mostrar tiempo actual
    if (soundFile && soundFile.isLoaded()) {
      let currentTime = isPlaying ? soundFile.currentTime() : 0;
      let totalTime = soundFile.duration();
      
      p.textSize(14);
      p.text(`Tiempo: ${formatTime(currentTime)} / ${formatTime(totalTime)}`, p.width/2, 100);
      
      // Dibujar barra de progreso
      p.noStroke();
      p.fill(50);
      p.rect(50, 120, p.width - 100, 10, 5);
      
      if (totalTime > 0) {
        p.fill(29, 185, 84); // Color Spotify verde
        let progressWidth = p.map(currentTime, 0, totalTime, 0, p.width - 100);
        p.rect(50, 120, progressWidth, 10, 5);
      }
    }
    
    // Visualizar niveles de EQ del host
    drawEQLevels();
  };
```

**PACKAGE.JSON**

```json
{
    "name": "audio-collaboration",
    "version": "1.0.0",
    "description": "Aplicación colaborativa de audio con p5.js y Socket.IO",
    "main": "server.js",
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js"
    },
    "dependencies": {
      "express": "^4.18.2",
      "socket.io": "^4.6.1"
    },
    "devDependencies": {
      "nodemon": "^2.0.22"
    }
  }
```

El código del server.js es un poco largo así que mejor lo subo después al repo.

El index.html funciona correctamente




