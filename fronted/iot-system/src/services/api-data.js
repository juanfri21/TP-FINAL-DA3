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
// -- API mediciones
// -- -----------------------------------------------------

// dataApi.getLastData = (station_id, data_group, time_period) => {
// 	const path_request = `/medicion/${station_id}/${data_group}/last/${time_period}`;

// 	return iotSystemApi.get(`${path_request}`, options);
// };

export default dataApi;
