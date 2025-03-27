// Archivo: server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración para guardar las imágenes subidas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `img-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para procesar la carga de imágenes
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    const imagePath = `/uploads/${req.file.filename}`;
    const clientId = req.body.clientId;
    
    // Emitir evento a todos los clientes excepto al remitente
    if (clientId) {
      // Usar broadcast.to para enviar a todos excepto al remitente
      io.sockets.emit('new-image', { 
        imagePath,
        senderId: clientId // Enviamos el ID del remitente para que el cliente pueda filtrar
      });
    } else {
      // Fallback: si no hay ID, emitimos a todos
      io.emit('new-image', { imagePath });
    }
    
    res.json({ success: true, imagePath });
  } else {
    res.status(400).json({ success: false, message: 'No se pudo subir la imagen' });
  }
});

// Gestión de conexiones Socket.io
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  
  // Manejar evento cuando un cliente envía una imagen en base64
  socket.on('send-image', (imageData) => {
    // Reenviar la imagen SOLO a todos los demás clientes (no al remitente)
    socket.broadcast.emit('receive-image', {
      dataUrl: imageData.dataUrl,
      senderId: socket.id
    });
  });
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});