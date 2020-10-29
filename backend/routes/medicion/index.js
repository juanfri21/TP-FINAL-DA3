var express = require('express');
var moment = require('moment');

var routerMetrica = express.Router();
var pool = require('../../mysql');

routerMetrica.post('/ultimosDatos', function (req, res) {
	pool.query(
		`SELECT * FROM Metricas WHERE (uuidSensor=?) OR (uuidSensor=?) ORDER BY fecha DESC limit ` +
			req.body.cantidad,
		[req.body.sensores[0].uuidSensor, req.body.sensores[1].uuidSensor],
		function (err, result, fields) {
			if (err) {
				res.send(err).status(400);
				return;
			}
			res.send(result);
		}
	);
});

routerMetrica.post('/actuador', function (req, res) {
	pool.query(
		`SELECT * FROM Metricas WHERE uuidSensor=? ORDER BY fecha DESC limit ` + req.body.cantidad,
		[req.body.uuidSensor],
		function (err, result, fields) {
			if (err) {
				res.send(err).status(400);
				return;
			}
			res.send(result);
		}
	);
});

routerMetrica.get('/:uuidSensor/:tipo/:cantidad', function (req, res) {
	let fechas = [];
	pool.query(
		`SELECT s.nombre,ubicacion,conectado,unidad, m.valor,fecha FROM Sensores as s JOIN Metricas as m WHERE s.tipo=? and s.uuidSensor=? and m.uuidSensor=? order by fecha desc LIMIT ` +
			req.params.cantidad,
		[req.params.tipo, req.params.uuidSensor, req.params.uuidSensor],
		function (err, result, fields) {
			if (err) {
				res.send(err).status(400);
				return;
			}
			res.send(result);
		}
	);
});

routerMetrica.post('/agregar', function (req, res) {
	pool.query(
		'Insert into Metricas (fecha,valor,idSensor) values (?,?,?)',
		[req.body.fecha, req.body.valor, req.body.idSensor],
		function (err, result, fields) {
			if (err) {
				res.send(err).status(400);
				return;
			}
			res.send(result);
		}
	);
});

module.exports = routerMetrica;
