var express = require('express');
var moment = require('moment');

var routerMetrica = express.Router();
var pool = require('../../mysql');

//Espera recibir por parámetro un id de dispositivo y devuelve su última medición
routerMetrica.get('/ultimosDatos/:idDispositivo/:tipo/:cantidad', function (req, res) {
	pool.query(
		`SELECT s.nombre,ubicacion,conectado,unidad, m.valor,fecha FROM Sensores as s JOIN Metricas as m WHERE s.idDispositivo=? and s.tipo=? and s.conectado=1 order by fecha desc LIMIT `+req.params.cantidad, 
		[req.params.idDispositivo,req.params.tipo],
		function (err, result, fields) {
			if (err) {
				res.send(err).status(400);
				return;
			}
			res.send(result);
		}
	);
});
//SELECT s.*, m.* FROM Sensores as s JOIN Metricas as m ON (s.uuidSensor=s.uuidSensor) WHERE s.idDispositivo=2 AND s.tipo='actuador' and s.conectado=1  
//ORDER BY `m`.`fecha` DESC
routerMetrica.get('/actuador/:idDispositivo/:tipo/:cantidad', function (req, res) {
	pool.query(
		`SELECT s.nombre,ubicacion,conectado,unidad, m.valor,fecha FROM Sensores as s JOIN Metricas as m WHERE s.idDispositivo=? and s.tipo=? and s.conectado=1 LIMIT `+req.params.cantidad, 
		[req.params.idDispositivo,req.params.tipo],
		function (err, result, fields) {
			if (err) {
				res.send(err).status(400);
				return;
			}
			res.send(result);
		}
	);
});

// routerMetrica.get('/ultimosDatos', function (req, res) {
// 	pool.query(
// 		'Insert into Metricas (fecha,valor,idSensor) values (?,?,?)',
// 		[req.body.fecha, req.body.valor, req.body.idSensor],
// 		function (err, result, fields) {
// 			if (err) {
// 				res.send(err).status(400);
// 				return;
// 			}
// 			res.send(result);
// 		}
// 	);
// });

routerMetrica.get('/:uuidSensor/:tipo/:cantidad', function (req, res) {
	console.log(req.params.uuidSensor);
	let fechas=[]
	pool.query(
		`SELECT s.nombre,ubicacion,conectado,unidad, m.valor,fecha FROM Sensores as s JOIN Metricas as m WHERE s.tipo=? and s.uuidSensor=? and m.uuidSensor=? order by fecha desc LIMIT `+req.params.cantidad,
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

// routerMetrica.get('/:idDispositivo/:idSensor/:tipo/:cantidad', function (req, res) {
// 	console.log(req.params);
// 	pool.query(

// 		`SELECT s.nombre,ubicacion,conectado,unidad, m.valor,fecha FROM Sensores as s JOIN Metricas as m WHERE s.tipo=? and s.uuidSensor=? and m.uuidSensor=? and s.idDispositivo=? order by fecha desc LIMIT `+req.params.cantidad,
// 		[req.params.tipo, req.params.idSensor, req.params.idSensor, req.params.idDispositivo],
// 		function (err, result, fields) {
// 			if (err) {
// 				res.send(err).status(400);
// 				return;
// 			}
// 			console.log(result);
// 			res.send(result);
// 		}
// 	);
// });

//Espera recibir por parámetro un id de dispositivo y un valor de medición y lo inserta en base de datos.
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
