<template>
	<v-container>
		<v-row>
			<v-col>
				<div class="pb-2 ml-5">
					<v-btn elevation="5" dark small @click="$router.go(-1)">Atras</v-btn>
				</div>
				<v-banner v-if="!showProgress" :elevation="elevation">
					<div align="left">
						<h3 class="mb-1" align="left">
							{{ dispositivo_info.nombre }} - {{ dispositivo_info.ubicacion }}
						</h3>
					</div>
				</v-banner>
				<v-banner v-if="!showProgress && !posee_sensores" :elevation="elevation">
					<div align="left">
						<h3 align="left">No se encontraron datos del dispositivo.</h3>
					</div>
				</v-banner>
				<v-banner v-if="!showProgress && posee_sensores" :elevation="elevation">
					<div align="left">
						<v-row>
							<h3 class="ml-4 mr-4">{{ nombre_actuador }}</h3>
							<v-btn elevation="5" dark small @click="publish">{{
								this.estado_actuador
							}}</v-btn>
							<v-btn class="ml-4" elevation="5" dark small @click="actualizarDatos"
								>Actualizar</v-btn
							>
						</v-row>
					</div>
				</v-banner>

				<div v-if="showProgress" class="mt-16" align="center">
					<v-progress-circular
						size="90"
						width="5"
						color="#5852f2"
						indeterminate
					></v-progress-circular>
				</div>
				<div v-if="posee_sensores">
					<div v-for="plot in plotData" :key="plot.id" class=" mt-4">
						<v-banner :elevation="elevation" v-if="!showProgress && !error">
							<plot
								:key="plot.id"
								:id="plot.id"
								:traces="plot.data"
								:layout="plot.layout"
							></plot>
						</v-banner>
					</div>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import dataApi from '@/services/api-data';
import moment from 'moment';
import Plot from '@/components/Plot';

export default {
	components: {
		Plot,
	},
	data: () => ({
		dispositivo_info: {},
		mediciones_sensores: [],
		fechas: [],
		lista_sensores: [],
		actuador: [],
		elevation: 0,
		showProgress: false,
		error: false,
		estado_actuador: '',
		posee_sensores: false,
		nombre_actuador: '',
	}),

	created() {
		this.dispositivo_info = this.$route.params.dispositivo;
		this.getListaSensores();
		this.showProgressLoadingOn();
	},
	mounted() {},
	methods: {
		getListaSensores() {
			this.error = false;

			dataApi
				.listaSensores(this.dispositivo_info.idDispositivo)
				.then((res) => {
					this.mediciones_sensores = [];
					if (res.data[0]) {
						this.lista_sensores = [...res.data];
						let sensores = [...this.lista_sensores.filter((e) => e.tipo === 'sensor')];

						this.getUltimosDatos(sensores, 20);
					} else {
						this.posee_sensores = false;
					}
				})
				.catch((error) => {
					console.log(error);
					this.showProgressLoadingOff();
					this.error = true;
				});
		},
		getUltimosDatos(sensores, cantidad) {
			// console.log(uuidSensor, tipo, cantidad);
			dataApi
				.ultimosDatos(sensores, cantidad)
				.then((res) => {
					if (res.data[0]) {
						this.posee_sensores = true;

						this.mediciones_sensores = [...res.data];
						let actuador = this.lista_sensores.filter((e) => e.tipo === 'actuador');
						console.log(actuador);
						this.nombre_actuador = actuador[0].nombre;
						// this.showProgressLoadingOff();
						dataApi
							.estadoActuador(actuador[0].uuidSensor, 1)
							.then((res) => {
								this.actuador = [...res.data];
								this.estado_actuador = this.actuador[0].valor ? 'Apagar' : 'Encender';
								this.$mqtt.subscribe('ws/actuador', { qos: 1 });
								// this.showProgressLoadingOff();
							})
							.catch((error) => {
								console.log(error);
								this.showProgressLoadingOff();
								this.error = true;
							});
					} else {
						this.posee_sensores = false;
					}
				})
				.catch((error) => {
					console.log(error);
					this.showProgressLoadingOff();
					this.error = true;
				});
		},
		showProgressLoadingOn() {
			this.showProgress = true;
			setTimeout(() => {
				this.showProgressLoadingOff();
			}, 1500);
		},
		showProgressLoadingOff() {
			this.showProgress = false;
		},
		publish() {
			console.log('publish');
			this.$mqtt.publish(
				`${this.dispositivo_info.uuid}/actuador`,
				this.estado_actuador === 'Encender' ? '1' : '0'
			);
		},
		actualizarDatos() {
			let sensores = [...this.lista_sensores.filter((e) => e.tipo === 'sensor')];

			this.getUltimosDatos(sensores, 20);
		},
	},
	mqtt: {
		'ws/actuador'(data, topic) {
			console.log(topic + ': ' + String.fromCharCode.apply(null, data));
			this.estado_actuador = this.estado_actuador === 'Encender' ? 'Apagar' : 'Encender';
		},
	},

	computed: {
		plotData() {
			return this.groupDataLayout.map((item, index) => {
				return {
					id: 'grupo' + index,
					name: 'grupo' + index,
					data: item.data,
					layout: item.layout,
				};
			});
		},
		groupDataLayout() {
			// let traces = [];
			let layout_list = [];
			let data_graph_list = [];
			let trace_1 = [];
			let trace_2 = [];

			trace_1.push({
				y: this.mediciones_sensores
					.filter((sen) => sen.uuidSensor == this.lista_sensores[0].uuidSensor)
					.map(function(item) {
						return item.valor;
					}),
				x: this.mediciones_sensores
					.filter((sen) => sen.uuidSensor == this.lista_sensores[0].uuidSensor)
					.map(function(item) {
						return moment(item.fecha)
							.parseZone()
							.format('YYYY-MM-DD HH:mm:ss');
					}),
				mode: 'lines+markers',
			});

			trace_2.push({
				y: this.mediciones_sensores
					.filter((sen) => sen.uuidSensor == this.lista_sensores[1].uuidSensor)
					.map(function(item) {
						return item.valor;
					}),
				x: this.mediciones_sensores
					.filter((sen) => sen.uuidSensor == this.lista_sensores[1].uuidSensor)
					.map(function(item) {
						return moment(item.fecha)
							.parseZone()
							.format('YYYY-MM-DD HH:mm:ss');
					}),
				mode: 'lines+markers',
			});
			var layout1 = {
				title: 'Sensor de Humedad',
				yaxis: {
					title: 'Humedad',
				},
			};
			var layout2 = {
				title: 'Sensor de Temperatura',
				yaxis: {
					title: 'Temperatura',
				},
			};

			data_graph_list.push(trace_1);
			data_graph_list.push(trace_2);

			layout_list.push(layout1);
			layout_list.push(layout2);

			return data_graph_list.map(function(item, index) {
				return {
					data: item,
					layout: layout_list[index],
					id: 'grupo' + index,
					name: 'grupo' + index,
				};
			});
		},
	},
};
</script>
