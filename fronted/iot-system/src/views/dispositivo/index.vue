<template>
	<v-container>
		<v-row>
			<div class="pl-2 pr-2">
				<v-btn elevation="5" block dark small @click="$router.go(-1)">Atras</v-btn>
				<!-- <router-link to="/">Home</router-link> -->
			</div>
			<v-col>
				<v-banner v-if="!showProgress" :elevation="elevation">
					<div align="left">
						<h3 align="left">{{ dispositivo_info.nombre }} - {{ dispositivo_info.ubicacion }}</h3>
					</div>
				</v-banner>
				<v-banner v-if="!showProgress" :elevation="elevation">
					<div align="left">
						<v-row>
							<v-col cols="10"
								><h3 align="left">{{ actuador[0].nombre }}</h3></v-col
							>
							<v-col cols="2">
								<v-btn elevation="5" dark small @click="publish">{{
									this.estado_actuador
								}}</v-btn>
							</v-col>
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

				<div v-for="plot in plotData" :key="plot.id" class=" mt-4">
					<v-banner :elevation="elevation" v-if="!showProgress && !error">
						<plot :key="plot.id" :id="plot.id" :traces="plot.data" :layout="plot.layout"></plot>
					</v-banner>
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
		elevation: 5,
		showProgress: false,
		error: false,
		estado_actuador: '',
	}),

	created() {
		this.showProgressLoadingOn();

		this.dispositivo_info = this.$route.params.dispositivo;
		console.log(this.dispositivo_info)
		this.getListaSensores();
	},
	mounted() {},
	methods: {
		getListaSensores() {
			this.error = false;

			dataApi
				.listaSensores(this.dispositivo_info.idDispositivo)
				.then((res) => {
					this.mediciones_sensores = [];
					console.log(res.data);
					this.lista_sensores = [...res.data];

					this.getUltimosDatos(this.dispositivo_info.idDispositivo, 'sensor', 20);

					// console.log(this.mediciones_sensores.filter(sen=> sen.nombre == this.lista_sensores[0].nombre))
					// if (this.mediciones_sensores.length) {
					// 	this.mediciones_sensores[0].data.forEach((element) => {
					// 		this.fechas.push(moment(element.fecha).format('DD/MM/YYYY HH:mm:ss'));
					// 		console.log(this.fechas);
					// 	});
					// }
				})
				.catch((error) => {
					console.log(error);
					this.showProgressLoadingOff();
					this.error = true;
				});
		},
		getUltimosDatos(idDispositivo, tipo, cantidad) {
			// console.log(uuidSensor, tipo, cantidad);
			dataApi
				.ultimosDatos(idDispositivo, tipo, cantidad)
				.then((res) => {
					console.log(res.data);
					this.mediciones_sensores = [...res.data];
					// this.showProgressLoadingOff();
					dataApi
						.ultimosDatos(idDispositivo, 'actuador', 1)
						.then((res) => {
							this.actuador = [...res.data];
							console.log(this.actuador[0]);
							this.estado_actuador = this.actuador[0].valor ? 'Apagar' : 'Encender';
							this.$mqtt.subscribe('+/actuador', { qos: 1 });
							// this.showProgressLoadingOff();
						})
						.catch((error) => {
							console.log(error);
							this.showProgressLoadingOff();
							this.error = true;
						});
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
			// this.$mqtt.publish(`${this.dispositivo_info.uuid}/actuador`, this.actuador[0].title);
			this.$mqtt.publish(`actuadores`, JSON.stringify([{
				v: this.estado_actuador === 'Encender' ? '1' : '0',
				u: `${this.dispositivo_info.uuid}_3`,
			}]));
			this.estado_actuador = this.estado_actuador === 'Encender' ? 'Apagar' : 'Encender';
		},
	},
	mqtt: {
		'+/actuador'(data, topic) {
			console.log(topic + ': ' + String.fromCharCode.apply(null, data));
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
					.filter((sen) => sen.nombre == this.lista_sensores[0].nombre)
					.map(function(item) {
						return item.valor;
					}),
				x: this.mediciones_sensores
					.filter((sen) => sen.nombre == this.lista_sensores[0].nombre)
					.map(function(item) {
						return moment(item.fecha)
							.parseZone()
							.format('YYYY-MM-DD HH:mm:ss');
					}),
				mode: 'lines+markers',
			});

			trace_2.push({
				y: this.mediciones_sensores
					.filter((sen) => sen.nombre == this.lista_sensores[1].nombre)
					.map(function(item) {
						return item.valor;
					}),
				x: this.mediciones_sensores
					.filter((sen) => sen.nombre == this.lista_sensores[1].nombre)
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
