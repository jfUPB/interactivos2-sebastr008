// Archivo: public/sketch.js
let captureCanvas;
let capturedImage = null;
let uploadedImage = null;
let myCamera;
let socket;

function setup() {
  // Conectar con Socket.io
  socket = io();
  
  // Crear canvas para la cámara
  captureCanvas = createCanvas(320, 240);
  captureCanvas.parent('cameraCanvas');
  
  // Inicializar la cámara
  myCamera = createCapture(VIDEO);
  myCamera.size(320, 240);
  myCamera.hide();
  
  // Botón para capturar foto
  document.getElementById('captureBtn').addEventListener('click', () => {
    capturedImage = myCamera.get();
    document.getElementById('sendCapturedBtn').disabled = false;
  });
  
  // Botón para enviar foto capturada
  document.getElementById('sendCapturedBtn').addEventListener('click', () => {
    if (capturedImage) {
      sendImageToServer(capturedImage.canvas.toDataURL('image/jpeg'));
    }
  });
  
  // Input para subir archivo
  document.getElementById('fileInput').addEventListener('change', handleFileSelect);
  
  // Botón para enviar archivo
  document.getElementById('sendFileBtn').addEventListener('click', () => {
    if (uploadedImage) {
      const formData = new FormData();
      formData.append('image', uploadedImage);
      formData.append('clientId', socket.id);
      
      fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log('Imagen subida:', data);
        // Reiniciar el input de archivo
        document.getElementById('fileInput').value = '';
        document.getElementById('sendFileBtn').disabled = true;
        document.getElementById('previewContainer').innerHTML = '';
      })
      .catch(error => {
        console.error('Error al subir la imagen:', error);
      });
    }
  });
  
  // Escuchar evento de nuevas imágenes
  socket.on('receive-image', (imageData) => {
    // Solo mostrar si no soy el remitente
    if (imageData.senderId !== socket.id) {
      addReceivedImage(imageData.dataUrl);
    }
  });
  
  socket.on('new-image', (data) => {
    // Solo mostrar si no soy el remitente
    if (data.senderId !== socket.id) {
      addReceivedImageFromServer(data.imagePath);
    }
  });
}

function draw() {
  background(220);
  
  // Mostrar el video de la cámara en el canvas
  if (myCamera && myCamera.loadedmetadata) {
    image(myCamera, 0, 0, width, height);
  }
  
  // Mostrar la imagen capturada cuando esté disponible
  if (capturedImage) {
    image(capturedImage, 0, 0, width, height);
  }
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file && file.type.match('image.*')) {
    uploadedImage = file;
    document.getElementById('sendFileBtn').disabled = false;
    
    // Mostrar vista previa
    const reader = new FileReader();
    reader.onload = function(e) {
      const previewContainer = document.getElementById('previewContainer');
      previewContainer.innerHTML = '';
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '100%';
      img.style.maxHeight = '200px';
      img.style.marginTop = '10px';
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}

function sendImageToServer(dataUrl) {
  socket.emit('send-image', { dataUrl });
  document.getElementById('sendCapturedBtn').disabled = true;
}

function addReceivedImage(dataUrl) {
  const receivedImages = document.getElementById('receivedImages');
  const img = document.createElement('img');
  img.src = dataUrl;
  img.style.maxWidth = '300px';
  img.style.maxHeight = '300px';
  receivedImages.prepend(img);
}

function addReceivedImageFromServer(imagePath) {
  const receivedImages = document.getElementById('receivedImages');
  const img = document.createElement('img');
  img.src = imagePath;
  img.style.maxWidth = '300px';
  img.style.maxHeight = '300px';
  receivedImages.prepend(img);
}