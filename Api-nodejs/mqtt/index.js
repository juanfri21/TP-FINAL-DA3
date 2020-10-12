/**
 topics:
 mediciones: { id: number, h: number, t: number } 
 actuadores: { id: number, a: boolean}
 config: { id:number, c: number}
 * 
 */
var mqtt = require('mqtt');
var mqtt_url = process.env.URL || 'mqtt://localhost:1883';
var topic = process.env.TOPIC || 'test';
var topic_mediciones = process.env.TOPIC_MEDICIONES || 'mediciones';
var topic_actuadores = process.env.TOPIC_ACTUADORES || 'actuadores';
var topic_config = process.env.TOPIC_CONFIGURACION || 'config';

var client = mqtt.connect(mqtt_url, { clientId: 'server' });

client.on('connect', function () {
	console.log('conectado');
	client.subscribe([topic_mediciones, topic_actuadores], { qos: 1 });
});
client.on('message', function (topic, message, packet) {
	var obj = JSON.parse(message.toString());
	console.log(obj);
	console.log(packet);
	console.log(topic);
});

//handle errors
client.on('error', function (error) {
	console.log('No se pudo conectar' + error);
	// process.exit(1);
	// client.end()
});
