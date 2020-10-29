import iotSystemApi from './iotSystem-api';

const dataApi = {};

// -- -----------------------------------------------------
// -- API dispositivos
// -- -----------------------------------------------------

dataApi.getDispositivos = (user_id) => {
	const path_request = `/dispositivo/${user_id}`;
	return iotSystemApi.get(`${path_request}`);
};

dataApi.agregarDispositivo = (dispositivo) => {
	const path_request = `/dispositivo/agregar`;
	return iotSystemApi.post(`${path_request}`, dispositivo);
};

dataApi.actualizarDispositivo = (dispositivo) => {
	const path_request = `/dispositivo/actualizar`;
	return iotSystemApi.put(`${path_request}`, dispositivo);
};

dataApi.eliminarDispositivo = (idDispositivo) => {
	const path_request = `/dispositivo/eliminar`;
	return iotSystemApi.put(`${path_request}`, { idDispositivo: idDispositivo });
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

dataApi.ultimosDatos = (sensores, cantidad) => {
	const path_request = `/medicion/ultimosDatos`;

	return iotSystemApi.post(`${path_request}`, { sensores: sensores, cantidad: cantidad });
};

dataApi.estadoActuador = (uuidSensor, cantidad) => {
	const path_request = `/medicion/actuador`;

	return iotSystemApi.post(`${path_request}`, { uuidSensor: uuidSensor, cantidad: cantidad });
};

export default dataApi;
