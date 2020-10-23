var express = require('express');
var routerUsuario = express.Router();
var pool = require('../../mysql');

//Devuelve datos de usuario
routerUsuario.get('/:email', function (req, res) {
	console.log('api usuario');
	pool.query('Select * from Usuarios where email=?', [req.params.email], function (err, result, fields) {
		if (err) {
			res.send(err).status(400);
			return;
		}
		res.send(result);
	});
});

routerUsuario.get('/:idUsuario', function (req, res) {
	pool.query('Select * from Dispositivos where idUsuario=?', [req.params.idUsuario], function (
		err,
		result,
		fields
	) {
		if (err) {
			res.send(err).status(400);
			return;
		}
		res.send(result[0]);
	});
});

routerUsuario.post('/editar', function (req, res) {
	console.log(req.body);
	pool.query(
		'INSERT INTO Usuarios (nombre,contraseña,fecha_actualizacion,rol) values (?,?,?,?)',
		[req.body.nombre, req.body.contraseña, req.body.fecha_actualizacion, req.body.rol],
		function (err, result, fields) {
			if (err) {
				res.send(err).status(400);
				return;
			}
			res.send(result);
		}
	);
});

module.exports = routerUsuario;
