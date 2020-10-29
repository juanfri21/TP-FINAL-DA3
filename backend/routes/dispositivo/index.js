var express = require('express');
var routerDispositivo = express.Router();
var pool = require('../../mysql');

//Devuelve un array de dispositivos
routerDispositivo.get('/', function (req, res) {
	console.log('api disp');
	pool.query('Select * from Dispositivos', function (err, result, fields) {
		if (err) {
			res.send(err).status(400);
			return;
		}
		res.send(result);
	});
});

// obtengo lista de dispositivo de un usuario
routerDispositivo.get('/:idUsuario', function (req, res) {
	pool.query('Select * from Dispositivos where idUsuario=?', [req.params.idUsuario], function (
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

// agrego dispositivo
routerDispositivo.post('/agregar', function (req, res) {
	console.log(req.body);
	pool.query(
		'INSERT INTO Dispositivos (uuid, nombre,ubicacion,conectado,fecha_creacion,fecha_actualizacion,descripcion,idUsuario) values (?,?,?,?,?,?,?,?)',
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

// UPDATE `Dispositivos` SET `conectado` = '0' WHERE `Dispositivos`.`idDispositivo` = 2;
routerDispositivo.put('/eliminar/', function (req, res) {
	console.log(req.body)
	pool.query('UPDATE Dispositivos SET conectado=0 WHERE Dispositivos.idDispositivo=?', [req.body.idDispositivo], function (
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

module.exports = routerDispositivo;
