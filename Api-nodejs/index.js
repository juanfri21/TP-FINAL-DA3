var express = require('express');
var cors = require('cors');
var app = express();
var PORT = 3000;
app.use(express.json());

var corsConfig = { origin: '*', optionesSucessStatus: 200 };
app.use(cors(corsConfig));

app.listen(PORT, function (req, res) {
	console.log('API Funcionando ');
});
