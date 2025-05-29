const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); //Para usar plantillas
const path = require('path');               //Para manejar directorios, basicamente unirlos 
const cors = require('cors');



//Initialization
const app = express();

//Settings
app.use(cors());
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({  //con esto se configura el app.engine
  defaultLayout: 'main',
  layoutDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
}));
app.set('view engine', '.hbs'); //PAra utilizar el app.engine


//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); //aceptar los datos desde los formularios sin aceptar imagenes ni nada raro
app.use(express.json()); //Para enviar y recibir jsons.

//Variables globales

app.use((req, res, next) => {

  next();
});

//Routes
app.use(require('./routes')); //busca automaticamente el archivo index.js
app.use(require('./routes/api'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting
var server = app.listen(app.get('port'), () => {
  console.log("Running on http://localhost:"+ app.get('port'));
})


//sockets.io
const SocketIO = require("socket.io");

// Configure Socket.IO with secure options
const io = SocketIO(server, {
  cors: {
    origin: "*", // or specify your specific domain
    methods: ["GET", "POST"]
  },
  secure: true
});

const cartones = [[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
//1
[[2, 25, 36, 57, 81], [4, 17, 20, 64, 86], [32, 46, 53, 68, 75]],
[[26, 34, 47, 66, 83], [12, 22, 39, 51, 87], [3, 19, 44, 55, 70]],
[[14, 28, 43, 61, 82], [8, 31, 50, 63, 77], [9, 10, 37, 72, 84]],
[[13, 21, 42, 60, 90], [18, 29, 48, 54, 71], [1, 30, 56, 65, 79]],
[[15, 24, 40, 58, 73], [27, 45, 67, 76, 89], [6, 38, 52, 69, 80]],
[[23, 41, 62, 78, 85], [5, 16, 33, 59, 88], [7, 11, 35, 49, 74]],
[[1, 14, 50, 64, 77], [21, 35, 54, 67, 80], [17, 28, 39, 40, 73]],
[[11, 20, 34, 55, 81], [2, 16, 24, 41, 62], [9, 30, 45, 68, 74]],
[[3, 27, 44, 56, 70], [6, 18, 37, 59, 83], [36, 48, 61, 76, 87]],
[[13, 42, 58, 65, 89], [15, 33, 49, 72, 86], [5, 26, 53, 69, 82]],
//11
[[12, 38, 52, 78, 85], [7, 29, 46, 75, 88], [19, 23, 57, 60, 90]],
[[4, 22, 43, 71, 84], [10, 31, 47, 63, 79], [8, 25, 32, 51, 66]],
[[8, 21, 42, 63, 75], [14, 26, 33, 50, 80], [38, 47, 56, 68, 84]],
[[18, 36, 55, 60, 87], [9, 15, 40, 59, 72], [3, 20, 49, 64, 79]],
[[12, 39, 52, 66, 83], [7, 31, 57, 74, 90], [5, 28, 45, 69, 77]],
[[1, 24, 41, 53, 73], [4, 10, 27, 35, 61], [16, 29, 46, 67, 82]],
[[2, 13, 48, 62, 81], [17, 30, 43, 70, 86], [22, 34, 54, 76, 88]],
[[6, 19, 32, 51, 85], [11, 23, 37, 65, 78], [25, 44, 58, 71, 89]],
[[14, 36, 48, 50, 61], [17, 38, 54, 72, 83], [5, 22, 46, 68, 79]],
[[16, 33, 55, 71, 80], [8, 21, 40, 77, 84], [19, 37, 65, 76, 88]], //20
//21 
[[7, 23, 41, 62, 70], [10, 32, 53, 66, 87], [13, 28, 44, 59, 89]],
[[6, 27, 43, 56, 69], [15, 30, 58, 75, 82], [2, 29, 47, 64, 90]],
[[9, 20, 45, 67, 78], [11, 34, 51, 73, 85], [4, 25, 39, 57, 74]],
[[1, 12, 24, 35, 49], [18, 31, 52, 60, 86], [3, 26, 42, 63, 81]],
[[2, 24, 40, 55, 77], [3, 18, 35, 61, 82], [10, 28, 46, 69, 79]],
[[11, 26, 42, 62, 83], [4, 31, 48, 56, 72], [20, 36, 59, 67, 84]],
[[12, 33, 44, 51, 63], [16, 39, 57, 71, 90], [1, 22, 50, 74, 87]],
[[7, 15, 34, 45, 75], [27, 49, 68, 70, 81], [6, 21, 53, 66, 89]],
[[8, 14, 37, 43, 78], [9, 17, 29, 60, 88], [23, 38, 54, 65, 85]],
[[5, 13, 41, 52, 80], [19, 30, 58, 64, 76], [25, 32, 47, 73, 86]],//30
//31
[[1, 21, 45, 60, 82], [7, 28, 32, 51, 87], [14, 38, 64, 71, 85]],
[[15, 27, 42, 59, 73], [2, 19, 46, 63, 84], [9, 20, 36, 54, 88]],
[[11, 35, 49, 77, 80], [3, 29, 52, 65, 74], [8, 33, 41, 58, 79]],
[[18, 24, 47, 50, 62], [6, 26, 31, 70, 83], [13, 37, 48, 56, 69]],
[[12, 40, 61, 76, 89], [5, 23, 39, 55, 86], [16, 25, 43, 67, 78]],
[[17, 30, 53, 72, 81], [4, 10, 44, 66, 75], [22, 34, 57, 68, 90]],//36
//37
[[2, 38, 52, 69, 79], [19, 30, 44, 71, 87], [6, 27, 53, 67, 82]],
[[3, 11, 22, 39, 57], [16, 31, 40, 62, 85], [5, 23, 45, 64, 81]],
[[10, 35, 54, 72, 86], [14, 43, 66, 74, 88], [25, 37, 47, 58, 78]],
[[1, 12, 33, 42, 76], [17, 20, 48, 59, 63], [7, 29, 51, 70, 83]],//40
//41
[[4, 26, 41, 73, 80], [15, 21, 55, 60, 84], [8, 34, 49, 56, 68]],
[[9, 18, 36, 61, 77], [13, 24, 46, 65, 90], [28, 32, 50, 75, 89]],
[[8, 34, 53, 67, 85], [10, 41, 55, 72, 89], [4, 23, 38, 45, 61]],
[[15, 29, 49, 68, 75], [13, 35, 51, 70, 83], [5, 26, 54, 63, 86]],
[[1, 17, 43, 57, 81], [21, 37, 48, 66, 87], [14, 31, 50, 62, 73]],
[[6, 25, 36, 74, 84], [3, 18, 28, 65, 77], [20, 30, 44, 60, 88]],
[[19, 33, 46, 64, 78], [7, 39, 52, 69, 82], [12, 24, 42, 59, 71]],
//48
[[16, 27, 40, 76, 90], [9, 11, 32, 56, 79], [2, 22, 47, 58, 80]],
];

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado: ", socket.id);

  socket.on('bolas', (data) => {
    console.log(">" + data.bolas);
    io.sockets.emit("bola2", data);
  });

  socket.on('cartonPedido', (id) => {
    var ref = Math.floor(Math.random() * (48 - 1)) + 1;
    console.log("envio carton " + cartones[ref] + " a socket.id: " + id)
    //io.sockets.emit("cartonEnviado2", carton);
    io.to(id).emit("cartonEnviado", { 'referencia': ref, 'numeros': cartones[ref] });
  });

  socket.on('lineaSolicitada', (data) => {
    console.log(">" + data);
    io.sockets.emit("lineaSolicitada", data);
  });

  socket.on('bingoSolicitado', (data) => {
    console.log(">" + data);
    io.sockets.emit("bingoSolicitado", data);
  })
  socket.on('lineaCantada', (data) => {
    io.sockets.emit("lineaCantada", data);
  })

});