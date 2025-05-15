#### ¿Cómo se comunican los clientes con el servidor?

Los clientes se comunican mediante la bilbioteca Socket.IO

```js
// En el cliente (sketch.js)
socket = io();
```
En esta línea, el cliente establece la conexión con el servidor Socket.IO. Una vez conectado, puede enviar y recibir mensajes

Para subir imágenes desde un dispositivo, la aplicación usa HTTP/Express en dónde el cliente hace una petición POST que el servidor luego se encargará de manejar

```js
//Sketch.js
// En el cliente (sketch.js)
fetch('/upload', {
  method: 'POST',
  body: formData
})
```

```js
server.js
app.post('/upload', upload.single('image'), (req, res) => {
  // Procesar la carga del archivo
  // Responder al cliente
});
```

#### ¿Cómo se comunican los clientes entre sí?

Los clientes no se comunican directamente entre sí, hay un servidor que sirve como intermediario. Cuando un cliente envía una imagen, esta primero se envía al servidor y ya el servidor se encarga de envíarsela a los demás clientes. Para evitar que la imagen le llegue al mismo cliente que la envió, el servidor incluye el ID del remitente.

```js
// En server.js
socket.broadcast.emit('receive-image', {
  dataUrl: imageData.dataUrl,
  senderId: socket.id  // Identificador del remitente
});
```

También el método *socket.broadcast.emit* es muy importante ya que con este evitamos enviar el mensaje al mismo cliente.

Ya en el lado del cliente, para evitar que salgan como imágenes recividas las propias simplemente verifica que el ID no sea el mismo suyo.

```js
// En sketch.js
socket.on('receive-image', (imageData) => {
  // Solo mostrar si no soy el remitente
  if (imageData.senderId !== socket.id) {
    addReceivedImage(imageData.dataUrl);
  }
});
```



#### ¿Qué tipo de mensajes se envían?

La aplicación envía eventos Socket.IO. Esta aplicación usa 3 tipos de eventos

- 'send-image' : Este mensaje lo envía el cliente al servidor cuando alguien comparte una imagen
- 'recieve-image' : Este mensaje lo envía el servidor a los clientes cuando alguien comparte una imagen capturada (de la misma cámara)
- 'new-image' : Este mensaje lo envía el servidor a los clientes cuando alguien sube un archivo de imagen

#### ¿Qué tipo de datos se envían?

Las imagenes desde la cámara son convertidas a base64 lo cual permite enviar la imagen como texto, facilitando mucho su envío.

```js
capturedImage.canvas.toDataURL('image/jpeg')
```

Para los archivos subidos desde un dispositivo se usa FormData.
```js
const formData = new FormData();
formData.append('image', uploadedImage);
formData.append('clientId', socket.id);
```

Aparte también se envían metadatos como el ID del remitente.

#### ¿Que tipo de eventos se generan?

- Eventos básicos en la interfaz del usuario (botones y seleccion de archivos):

```js
document.getElementById('captureBtn').addEventListener('click', () => {
  // Capturar imagen
});

document.getElementById('fileInput').addEventListener('change', handleFileSelect);
```
- Los eventos Socket.IO: 'connect' y 'disconnect' son para verificar cuando un cliente se conecta y se desconecta los demás eventos son los mencionados anteriormente.

#### ¿Cómo es el flujo de datos entre los clientes y el servidor?

**Para imágenes desde la cámara**

1. El cliente captura la imagen de la cámara usando p5.js
   
```js
capturedImage = myCamera.get();
```
2. La imagen se convierte a base64 (dataURL)

```js
capturedImage.canvas.toDataURL('image/jpeg')
```

3. Se envía este DataURL al servidor a través de Socket.IO.
```js
socket.emit('send-image', { dataUrl });
```
4. El servidor recibe la imagen y la reenvía a todos los demás clientes.
```js
socket.broadcast.emit('receive-image', { dataUrl, senderId });
```
5. Los otros clientes reciben la imagen y la muestran en su interfaz.

```js
addReceivedImage(imageData.dataUrl);
```

**Para archivos de imagen (por el camino HTTP):**

1. El usuario selecciona un archivo de imagen que se valida y previsualiza.
```js
handleFileSelect(event);
```
2. Se crea un FormData con la imagen y el ID del cliente.
```js
formData.append('image', uploadedImage);
formData.append('clientId', socket.id);
```
3. El cliente envía el archivo al servidor mediante una petición POST.
```js
fetch('/upload', { method: 'POST', body: formData })
```
4. El servidor guarda la imagen en el directorio /uploads.


5. El servidor notifica a todos los clientes sobre la nueva imagen.

```js
io.sockets.emit('new-image', { imagePath, senderId });
```
6. Los otros clientes cargan la imagen
```js
addReceivedImageFromServer(data.imagePath);
```

#### ¿Como es el flujo de datos entre los clientes?

Para imágenes de cámara:

El Cliente A captura y envía una imagen al servidor como DataURL

El servidor usa socket.broadcast.emit() para enviar la imagen a todos excepto al Cliente A

Los clientes receptores verifican que no son el remitente (comparando IDs) y muestran la imagen

Para archivos de imagen:

El Cliente A sube un archivo al servidor mediante HTTP

El servidor almacena el archivo y emite un evento new-image con la ruta

Los clientes receptores verifican que no son el remitente y cargan la imagen desde la URL
