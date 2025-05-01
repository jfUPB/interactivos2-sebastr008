### Configuración del server 

En el servidor se configuró la asignación del host o guest al conectarse, también se configuraron los diferentes mensajes, a continuación mostraré las partes más relevantes del código

```js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);
  
  socket.emit('currentState', {
    hostExists: hostId !== null,
    isPlaying,
    currentTime
  });

  if (hostId === null) {
    hostId = socket.id;
    socket.emit('assignRole', 'host');
    console.log(`Asignado rol de host a: ${socket.id}`);
  } else {
    socket.emit('assignRole', 'guest');
    console.log(`Asignado rol de guest a: ${socket.id}`);
  }

  socket.on('togglePlay', (state) => {
    if (socket.id === hostId) {
      isPlaying = state.isPlaying;
      currentTime = state.currentTime;
      socket.broadcast.emit('playStateChanged', { isPlaying, currentTime });
      console.log(`Host cambió estado de reproducción a: ${isPlaying}`);
    }
  });

   socket.on('forceSync', (time) => {
    if (socket.id === hostId) {
      currentTime = time;
      socket.broadcast.emit('syncTime', {
        currentTime,
        isPlaying
      });
      console.log(`Host forzó sincronización a: ${currentTime}s`);
    }
  });
  

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

```

Tanto en el archivo del host como del guest, se establece la conexión al servidor y se configuran los eventos


**GUEST-SKETCH.js**
```js
socket.on('playStateChanged', (state) => {
  if (audioInitialized) {
    syncWithHost(state);
  }
  console.log('[Socket] Recibido playStateChanged:', state);
});

socket.on('currentState', (state) => {
  console.log('[Socket] Estado inicial recibido:', state);
});

socket.emit('requestSync'); // Cliente pide al host que le mande estado actualizado
```


**HOST-SKETCH.js**

```js
playButton.mousePressed(toggleSound);

function toggleSound() {
  isPlaying = !isPlaying;

  if (isPlaying) {
    soundFile.play();
  } else {
    soundFile.pause();
  }

  socket.emit('togglePlay', {
    isPlaying: isPlaying,
    currentTime: soundFile.currentTime()
  });

  console.log('[Socket] Enviado togglePlay:', isPlaying);
}

```

### Copias de las salidas de las consolas

```yaml
Servidor escuchando en http://localhost:3000
Usuario conectado: sN3jz9d9b...
Asignado rol de host a: sN3jz9d9b...
Usuario conectado: d5kGhP7M...
Asignado rol de guest a: d5kGhP7M...
Host cambió estado de reproducción a: true
Host forzó sincronización a: 12.6
```


### Flujo

Cuando alguien entra a la página, el servidor le da un rol:

Si eres el primer usuario conectado, te conviertes en el host

Si no, se convierte en un guest 

El host puede dar play o pausa a la música.

Cuando lo hace, el host envía un mensaje al servidor (togglePlay) con el estado (si está reproduciendo o no) y en qué segundo va la canción.

El servidor recibe ese mensaje y avisa a todos los guests conectados que el host cambió el estado de reproducción. Lo hace enviando el mensaje playStateChanged.

Cada guest recibe ese mensaje y se sincroniza: si el host está reproduciendo, el guest también empieza a reproducir el sonido en el mismo segundo.

El host también puede forzar una sincronización (por ejemplo, si nota que los guests están desfasados). Para eso, envía forceSync, y el servidor lo reenvía a todos los guests.

Si el host se desconecta, el servidor busca a otro usuario y lo convierte automáticamente en el nuevo host.




