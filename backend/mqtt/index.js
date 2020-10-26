/**
 topics:
 mediciones: { u: string, h: number, t: number } 
 actuadores: { u: string, a: boolean}
 config: { u: string, c: number, m: string}
 * 
 */
var mqtt = require('mqtt');
var moment = require('moment');

var pool = require('../mysql');

var mqtt_url = process.env.URL || 'mqtt://mosquitto_broker';
var topic_mediciones = process.env.TOPIC_MEDICIONES || 'mediciones';
var topic_actuadores = process.env.TOPIC_ACTUADORES || 'actuadores_api';
var topic_config = process.env.TOPIC_CONFIGURACION || 'config';

var client = mqtt.connect(mqtt_url, { clientId: 'server' });

client.on('connect', function () {
	console.log('cliente mqtt conectado');
	client.subscribe([topic_mediciones, topic_actuadores], { qos: 1 });
});
client.on('message', function (topic, message, packet) {
	var data = JSON.parse(message.toString());
	console.log('mensaje');
	console.log(data);
	console.log(topic);

	// client.publish("SERIAL_1/actuador", 'Hello mqtt')
	data.forEach((element) => {
		pushDataBase(topic, element);
	});
});

function pushDataBase(topic, data) {
	// TODO: agregar timezone en la tabla de dispositivos
	let current_datetime = moment().utcOffset('-0300').format('YYYY-MM-DD HH:mm:ss');
	console.log(data);
	switch (topic) {
		case topic_mediciones:
			console.log('insert medicion');
			pool.query('Insert into Metricas(fecha,valor,uuidSensor) values (?,?,?)', [
				current_datetime,
				data.v, // valor
				data.u, // uuidSensor
				function (err, result, fields) {
					if (err) {
						console.log(err);
						return;
					}
					console.log(result);
				},
			]);
			// pool.query('Insert into Metricas(fecha,valor,uuidSensor) values (?,?,?)', [
			// 	current_datetime,
			// 	data[1].v,
			// 	data[1].u,
			// 	function (err, result, fields) {
			// 		if (err) {
			// 			console.log(err);
			// 			return;
			// 		}
			// 		console.log(result);
			// 	},
			// ]);
			break;
		case topic_actuadores:
			console.log('insert actuador');
			pool.query('Insert into Metricas(fecha,valor,uuidSensor) values (?,?,?)', [
				current_datetime,
				data.v, // valor
				data.u, // uuidSensor
				function (err, result, fields) {
					if (err) {
						console.log(err);
						return;
					}
					console.log(result);
				},
			]);
			break;
		case topic_config:
			break;
		default:
			break;
	}
}

//handle errors
client.on('error', function (error) {
	console.log('No se pudo conectar ' + error);
	// process.exit(1);
	client.end();
});

module.exports = client;
