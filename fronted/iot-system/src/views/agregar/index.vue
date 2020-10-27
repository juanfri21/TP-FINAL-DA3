<template>
	<v-container>
		<div class="pb-2 pt-2">
			<v-btn elevation="5" dark small @click="$router.go(-1)">Atras</v-btn>
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
					v-model="UUID"
					:error-messages="emailErrors"
					:counter="8"
					label="UUID*"
					required
					@input="$v.UUID.$touch()"
					@blur="$v.UUID.$touch()"
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

export default {
	mixins: [validationMixin],
	name: 'agregar',

	validations: {
		nombre: { required },
		UUID: { required, maxLength: maxLength(8), minLength: minLength(8) },
	},
	created() {
		this.idUsuario = this.$route.params.idUsuario;
		console.log(this.idUsuario);
	},

	mounted() {},

	data: () => ({
		nombre: '',
		UUID: '',
		ubicacion: '',
		descripcion: '',
		idUsuario: '',
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
			if (!this.$v.UUID.$dirty) return errors;
			(!this.$v.UUID.maxLength || !this.$v.UUID.minLength) &&
				errors.push('El UUID debe tener 8 caracteres');
			!this.$v.UUID.required && errors.push('El UUID es requerido');
			return errors;
		},
	},

	methods: {
		submit() {
			this.$v.$touch();
			if (this.$v.$anyError) {
				console.log('error');
			} else {
				console.log('insert db');
			}
		},
	},
};
</script>
