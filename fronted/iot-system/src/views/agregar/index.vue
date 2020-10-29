<template>
	<v-container>
		<div class="pb-2 pt-2">
			<v-row>
				<v-col cols="auto" class="mr-auto">
					<v-btn elevation="5" dark small @click="$router.go(-1)">Atras</v-btn>
				</v-col>

				<v-spacer></v-spacer>
				<v-col cols="auto">
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
		<h1>Nuevo dispositivo</h1>
		<div class="pl-2 pr-2">
			<form>
				<v-text-field
					v-model="nombre"
					:error-messages="nameErrors"
					label="Nombre*"
					required
					@input="$v.nombre.$touch()"
					@blur="$v.nombre.$touch()"
				></v-text-field>
				<v-text-field
					v-model="uuid"
					:error-messages="emailErrors"
					:counter="8"
					label="uuid*"
					required
					@input="$v.uuid.$touch()"
					@blur="$v.uuid.$touch()"
				></v-text-field>
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
import { required, maxLength, minLength } from 'vuelidate/lib/validators';
import dataApi from '@/services/api-data';

export default {
	mixins: [validationMixin],
	name: 'agregar',

	validations: {
		nombre: { required },
		uuid: { required, maxLength: maxLength(8), minLength: minLength(8) },
	},
	created() {
		this.idUsuario = this.$route.params.idUsuario;
		console.log(this.idUsuario);
	},

	mounted() {},

	data: () => ({
		nombre: '',
		uuid: '',
		ubicacion: '',
		descripcion: '',
		idUsuario: '',
		agregado_state: { estado: false, mensaje: 'Dispositivo agregado correctamente.', color: 'success' },
	}),

	computed: {
		nameErrors() {
			const errors = [];
			if (!this.$v.nombre.$dirty) return errors;
			!this.$v.nombre.required && errors.push('El nombre es requerido.');
			return errors;
		},
		emailErrors() {
			const errors = [];
			if (!this.$v.uuid.$dirty) return errors;
			(!this.$v.uuid.maxLength || !this.$v.uuid.minLength) &&
				errors.push('El uuid debe tener 8 caracteres');
			!this.$v.uuid.required && errors.push('El uuid es requerido');
			return errors;
		},
	},

	methods: {
		submit() {
			this.$v.$touch();
			if (!this.$v.$anyError) {
				dataApi
					.agregarDispositivo({
						nombre: this.nombre,
						uuid: this.uuid,
						ubicacion: this.ubicacion,
						descripcion: this.descripcion,
						idUsuario: this.idUsuario,
						conectado: 1,
					})
					.then((res) => {
						console.log(res.data);
						this.resetParametros();
						this.agregado_state.color = 'success';
						this.agregado_state.mensaje = 'Dispositivo agregado correctamente.';
						this.agregado_state.estado = true;
						setTimeout(() => {
							this.agregado_state.estado = false;
						}, 2000);
					})
					.catch((error) => {
						this.agregado_state.color = 'error';
						this.agregado_state.mensaje = 'No se pudo agregar el dispositivo.';
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
		resetParametros() {
			this.$v.$reset();
			this.nombre = '';
			this.uuid = '';
			this.ubicacion = '';
			this.descripcion = '';
		},
	},
};
</script>
