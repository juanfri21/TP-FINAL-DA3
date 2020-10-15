var express = require('express');
var routerDispositivo = express.Router();
var pool = require('../../mysql');

//Devuelve un array de dispositivos
routerDispositivo.get('/', function (req, res) {
    console.log('api disp')
	pool.query('Select * from Dispositivos', function (err, result, fields) {
		if (err) {
			res.send(err).status(400);
			return;
		}
		res.send(result);
	});
});

routerDispositivo.get('/:idDispositivo', function (req, res) {
	pool.query('Select * from Dispositivos where dispositivoId=?', [req.params.idDispositivo], function (
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

// routerLogRiegos.post('/agregar', function (req, res) {
// 	pool.query(

// 		'INSERT INTO Dispositivos (nombre,uuid,ubicacion,conectado,fecha_creacion,fecha_actualizacion,electrovalvulaId) values (?,?,?,?,?,?,?)',
// 		[req.body.nombre, req.body.uuid, req.body.ubicacion, req.body.conectado, req.body.fecha_creacion, req.body.fecha_actualizacion, req.body.electrovalvulaId],
// 		function (err, result, fields) {
// 			if (err) {
// 				res.send(err).status(400);
// 				return;
// 			}
// 			res.send(result);
// 		}
// 	);
// });

module.exports = routerDispositivo;
