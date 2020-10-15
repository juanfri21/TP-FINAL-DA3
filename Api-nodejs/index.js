var express = require('express');
var cors = require('cors');
var client=require("./mqtt");
var app = express();
var PORT = 3000;
//ruteo dispositivo
var routerDisp = require('./routes/dispositivo');
//ruteo mediciones
var routerMedicion = require('./routes/medicion');
app.use(express.json());

var corsConfig = { origin: '*', optionesSucessStatus: 200 };
app.use(cors(corsConfig));

app.use('/api/dispositivo', routerDisp);
app.use('/api/medicion', routerMedicion);

app.listen(PORT, function (req, res) {
	console.log('API Funcionando ');
});
