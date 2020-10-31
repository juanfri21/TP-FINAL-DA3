<template>
	<v-container>
		<div class="pb-2 pt-2">
			<v-row>
				<v-col cols="auto" class="mr-6 ml-auto" >
					<v-alert
						:type="agregado_state.color"
						dense
						width="350"
						elevation="5"
						:value="agregado_state.estado"
					>
						{{ agregado_state.mensaje }}
					</v-alert>
				</v-col>
			</v-row>
		</div>
		<h1>Editar dispositivo</h1>
		<div class="pl-2 pr-2">
			<form>
				<v-text-field
					v-model="nombre"
					:error-messages="nameErrors"
					label="Nombre"
					required
					@input="$v.nombre.$touch()"
					@blur="$v.nombre.$touch()"
				></v-text-field>
				<v-text-field v-model="uuid" label="uuid" disabled></v-text-field>
				<v-text-field v-model="ubicacion" label="Ubicacion"></v-text-field>
				<v-text-field v-model="descripcion" label="Descripcion"></v-text-field>
				<v-btn class="mr-4" @click="submit">
					Guardar
				</v-btn>
				<v-btn @click="$router.go(-1)">
					Cancelar
				</v-btn>
			</form>
		</div>
	</v-container>
</template>

<script>
const { validationMixin } = require('vuelidate');
import { required, minLength } from 'vuelidate/lib/validators';
import dataApi from '@/services/api-data';

export default {
	mixins: [validationMixin],
	name: 'editar',

	validations: {
		nombre: { required, minLength: minLength(1) },
	},
	created() {
		this.dispositivo_info = this.$route.params.dispositivo;
		this.nombre = this.dispositivo_info.nombre;
		this.uuid = this.dispositivo_info.uuid;
		this.ubicacion = this.dispositivo_info.ubicacion;
		this.descripcion = this.dispositivo_info.descripcion;
	},

	mounted() {},

	data: () => ({
		nombre: '',
		uuid: '',
		ubicacion: '',
		descripcion: '',
		error: [],
		dispositivo_info: {},
		agregado_state: {
			estado: false,
			mensaje: 'Dispositivo actualizado correctamente.',
			color: 'success',
		},
	}),

	computed: {
		nameErrors() {
			const errors = [];
			if (!this.$v.nombre.$dirty) return errors;
			(!this.$v.nombre.minLength || !this.$v.nombre.required) && errors.push('Debe ingresar un nombre');
			// !this.$v.nombre.required && errors.push('El uuid es requerido');
			return errors;
		},
	},

	methods: {
		submit() {
			this.$v.$touch();
			if (!this.$v.$anyError) {
				console.log('insert db');
				dataApi
					.actualizarDispositivo({
						nombre: this.nombre,
						uuid: this.uuid,
						ubicacion: this.ubicacion,
						descripcion: this.descripcion,
						idDispositivo: this.dispositivo_info.idDispositivo,
					})
					.then(() => {
						this.agregado_state.color = 'success';
						this.agregado_state.mensaje = 'Dispositivo actualizado correctamente.';
						this.agregado_state.estado = true;
						setTimeout(() => {
							this.agregado_state.estado = false;
						}, 2000);
					})
					.catch((error) => {
						this.agregado_state.color = 'error';
						this.agregado_state.mensaje = 'No se pudo actualizar el dispositivo.';
						this.agregado_state.estado = true;
						setTimeout(() => {
							this.agregado_state.estado = false;
						}, 2000);
						console.log(error);
						// this.showProgressLoadingOff();
						// this.error = true;
					});
			}
		},
	},
};
</script>
