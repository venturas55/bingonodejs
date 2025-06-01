import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
import cartones from '../data/cartones.js';

const socketConfig = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
    secure: true
  });

  io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado: ", socket.id);

    // Handle game events
    socket.on('bolas', handleBolas(socket));
    socket.on('cartonPedido', handleCartonPedido(socket));
    socket.on('lineaSolicitada', handleLineaSolicitada(socket));
    socket.on('bingoSolicitado', handleBingoSolicitado(socket));
    socket.on('lineaCantada', handleLineaCantada(socket));
  });

  return io;
};

// Event handlers
const handleBolas = (socket) => (data) => {
  console.log(">" + data.bolas);
  socket.broadcast.emit("bola2", data);
};

const handleCartonPedido = (socket) => (id) => {
  try {
    const ref = Math.floor(Math.random() * (cartones.length - 1)) + 1;
    console.log("envio carton " + cartones[ref] + " a socket.id: " + id);
    socket.emit("cartonEnviado", { 'referencia': ref, 'numeros': cartones[ref] });
  } catch (error) {
    console.error('Error handling cartonPedido:', error);
    socket.emit('error', 'Error al obtener cartón');
  }
};

const handleLineaSolicitada = (socket) => (data) => {
  console.log(">" + data);
  socket.broadcast.emit("lineaSolicitada", data);
};

const handleBingoSolicitado = (socket) => (data) => {
  console.log(">" + data);
  socket.broadcast.emit("bingoSolicitado", data);
};

const handleLineaCantada = (socket) => (data) => {
  socket.broadcast.emit("lineaCantada", data);
};

export default socketConfig;
