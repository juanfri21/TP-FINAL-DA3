var express = require('express');
var routerDispositivo = express.Router();
var pool = require('../../mysql');
var moment = require('moment');

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
	pool.query(
		'Select * from Dispositivos where idUsuario=? and conectado=1',
		[req.params.idUsuario],
		function (err, result, fields) {
			if (err) {
				res.send(err).status(400);
				return;
			}
			res.send(result);
		}
	);
});

// agrego dispositivo
routerDispositivo.post('/agregar', function (req, res) {
	let current_datetime = moment().utcOffset('-0300').format('YYYY-MM-DD HH:mm:ss');

	pool.query(
		'INSERT INTO Dispositivos (uuid, nombre,ubicacion,conectado,fecha_creacion,fecha_actualizacion,descripcion,idUsuario) values (?,?,?,?,?,?,?,?)',
		[
			req.body.uuid,
			req.body.nombre,
			req.body.ubicacion,
			req.body.conectado,
			current_datetime,
			current_datetime,
			req.body.descripcion,
			req.body.idUsuario,
		],
		function (err, result, fields) {
			if (err) {
				res.send(err).status(400);
				return;
			}

			let idDispositivo = result.insertId;

			pool.query(
				'INSERT INTO Sensores (uuidSensor,tipo, nombre, ubicacion, conectado, fecha_creacion, fecha_actualizacion,codigo, unidad, idDispositivo) VALUES ?',
				[
					[
						[
							`${req.body.uuid}_1`,
							'sensor',
							'Humedad',
							req.body.ubicacion,
							1,
							current_datetime,
							current_datetime,
							11,
							'%',
							idDispositivo,
						],
						[
							`${req.body.uuid}_2`,
							'sensor',
							'Temperatura',
							req.body.ubicacion,
							1,
							current_datetime,
							current_datetime,
							22,
							'C',
							idDispositivo,
						],
						[
							`${req.body.uuid}_3`,
							'actuador',
							'Actuador',
							req.body.ubicacion,
							1,
							current_datetime,
							current_datetime,
							33,
							'C',
							idDispositivo,
						],
					],
				],
				function (err, result, fields) {
					if (err) {
						res.send(err).status(400);
						return;
					}
				}
			);

			res.send(result);
		}
	);
});

routerDispositivo.put('/eliminar', function (req, res) {
	let current_datetime = moment().utcOffset('-0300').format('YYYY-MM-DD HH:mm:ss');
	console.log(req.body);
	pool.query(
		'UPDATE Dispositivos SET conectado=0,fecha_actualizacion=? WHERE Dispositivos.idDispositivo=?',
		[current_datetime, req.body.idDispositivo],
		function (err, result, fields) {
			if (err) {
				res.send(err).status(400);
				return;
			}
			res.send(result);
		}
	);
});

routerDispositivo.put('/actualizar', function (req, res) {
	let current_datetime = moment().utcOffset('-0300').format('YYYY-MM-DD HH:mm:ss');
	console.log(req.body);
	pool.query(
		'UPDATE Dispositivos SET nombre=?,ubicacion=?,descripcion=?,fecha_actualizacion=? WHERE Dispositivos.idDispositivo=?',
		[req.body.nombre, req.body.ubicacion, req.body.descripcion, current_datetime, req.body.idDispositivo],
		function (err, result, fields) {
			if (err) {
				res.send(err).status(400);
				return;
			}
			res.send(result);
		}
	);
});

module.exports = routerDispositivo;
