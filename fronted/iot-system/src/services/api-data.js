import iotSystemApi from './iotSystem-api';

const dataApi = {};

// -- -----------------------------------------------------
// -- API dispositivos
// -- -----------------------------------------------------

dataApi.getDispositivos = (user_id) => {
	const path_request = `/dispositivo/${user_id}`;
	console.log(user_id)
	return iotSystemApi.get(`${path_request}`);
};

dataApi.agregarDispositivo = (dispositivo) => {
	const path_request = `/dispositivo/agregar`;
	console.log(dispositivo);
	return iotSystemApi.post(`${path_request}`, dispositivo);
};

dataApi.actualizarDispositivo = (dispositivo) => {
	const path_request = `/dispositivo/actualizar`;
	console.log(dispositivo);
	return iotSystemApi.put(`${path_request}`, dispositivo);
};

dataApi.bajaDispositivo = (idDispositivo) => {
	const path_request = `/dispositivo/baja`;
	return iotSystemApi.delete(`${path_request}`, { idDispositivo: idDispositivo });
};

dataApi.altaDispositivo = (idDispositivo) => {
	const path_request = `/dispositivo/alta`;
	return iotSystemApi.post(`${path_request}`, { idDispositivo: idDispositivo });
};

// -- -----------------------------------------------------
// -- API sensores
// -- -----------------------------------------------------

dataApi.listaSensores = (idDispositivo) => {
	const path_request = `/sensor/${idDispositivo}`;

	return iotSystemApi.get(`${path_request}`);
};

// -- -----------------------------------------------------
// -- API mediciones
// -- -----------------------------------------------------

// dataApi.ultimosDatos = (uuidSensor, tipo, cantidad) => {
// 	const path_request = `/medicion/${uuidSensor}/${tipo}/${cantidad}`;

// 	return iotSystemApi.get(`${path_request}`);
// };
dataApi.ultimosDatos = (idDispositivo, tipo, cantidad) => {
	const path_request = `/medicion/ultimosDatos/${idDispositivo}/${tipo}/${cantidad}`;

	return iotSystemApi.get(`${path_request}`);
};

dataApi.estadoActuador = (idDispositivo, tipo, cantidad) => {
	const path_request = `/medicion/actuador/${idDispositivo}/${tipo}/${cantidad}`;

	return iotSystemApi.get(`${path_request}`);
};

export default dataApi;
