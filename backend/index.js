var express = require('express');
var cors = require('cors');
var client=require("./mqtt");
var app = express();
var PORT = 3000;
var routerDispositivo = require('./routes/dispositivo');
var routerMedicion = require('./routes/medicion');
var routerUsuario = require('./routes/usuario');
var routerSensor = require('./routes/sensor');

app.use(express.json());

var corsConfig = { origin: '*', optionesSucessStatus: 200 };
app.use(cors(corsConfig));

app.use('/api/dispositivo', routerDispositivo);
app.use('/api/medicion', routerMedicion);
app.use('/api/usuario', routerUsuario);
app.use('/api/sensor', routerSensor);


app.listen(PORT, function (req, res) {
	console.log('API Funcionando ');
});
