var express = require('express');
var routerSensores = express.Router();
var pool = require('../../mysql');

//Devuelve un array de dispositivos
routerSensores.get('/', function (req, res) {
	console.log('api disp');
	pool.query('Select * from Sensores', function (err, result, fields) {
		if (err) {
			res.send(err).status(400);
			return;
		}
		res.send(result);
	});
});

routerSensores.get('/:idDispositivo', function (req, res) {
	pool.query('Select * from Sensores where idDispositivo=?', [req.params.idDispositivo], function (
		err,
		result,
		fields
	) {
		if (err) {
			res.send(err).status(400);
			return;
		}
		res.send(result);
	});
});

routerSensores.post('/agregar', function (req, res) {
	console.log(req.body);
	pool.query(
		'INSERT INTO Sensores (uuid, nombre,ubicacion,conectado,fecha_creacion,fecha_actualizacion,descripcion,idUsuario) values (?,?,?,?,?,?,?,?)',
		[
			req.body.uuid,
			req.body.nombre,
			req.body.ubicacion,
			req.body.conectado,
			req.body.fecha_creacion,
			req.body.fecha_actualizacion,
			req.body.descripcion,
			req.body.idUsuario,
		],
		function (err, result, fields) {
			if (err) {
				res.send(err).status(400);
				return;
			}
			res.send(result);
		}
	);
});

module.exports = routerSensores;
