<template>
	<v-app>
		<v-main>
			<div v-for="dispositivo in lista_dispositivos" :key="dispositivo.id">
				<v-card class="mx-auto mt-4" width="500">
					<v-list>
						<v-list-item>
							<v-list-item-icon>
								<v-icon>mdi-devices</v-icon>
							</v-list-item-icon>

							<v-list-item-title>{{ dispositivo.nombre }}</v-list-item-title>
						</v-list-item>

						<v-list-group no-action sub-group>
							<template v-slot:activator>
								<v-list-item-content>
									<v-list-item-title>Opciones</v-list-item-title>
								</v-list-item-content>
							</template>

							<v-list-item
								@click="clickOpcionDispositivo(dispositivo, opcion)"
								v-for="opcion in opciones_dispositivo"
								:key="opcion.id"
								link
							>
								<v-list-item-title v-text="opcion.titulo"></v-list-item-title>

								<v-list-item-icon>
									<v-icon v-text="opcion.icon"></v-icon>
								</v-list-item-icon>
							</v-list-item>
						</v-list-group>
					</v-list>
				</v-card>
			</div>
			<v-row justify="center">
				<v-dialog v-model="eliminar" persistent max-width="380">
					<v-card>
						<v-card-title class="headline">
							Desea eliminar el dispositivo?
						</v-card-title>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="green darken-1" text @click="clickEliminar(false)">
								Cancelar
							</v-btn>
							<v-btn color="green darken-1" text @click="clickEliminar(true)">
								Aceptar
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-row>
			<v-fab-transition>
				<v-btn color="black" dark absolute top right fab @click="agregarNuevoDispositivo()">
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</v-fab-transition>
		</v-main>
	</v-app>
</template>

<script>
import dataApi from '@/services/api-data';

export default {
	name: 'home',

	components: {},
	data: () => ({
		lista_dispositivos: [],
		idUsuario: 0,
		opciones_dispositivo: [
			{ titulo: 'Ingresar', icon: 'mdi-arrow-right-bold-box', ruta: 'dispositivo' },
			{ titulo: 'Editar', icon: 'mdi-pencil', ruta: 'editar' },
			{ titulo: 'Eliminar', icon: 'mdi-delete', ruta: 'eliminar' },
			{ titulo: 'Información', icon: 'mdi-information', ruta: 'informacion' },
		],
		eliminar: false,
	}),

	created() {
		this.idUsuario = this.$route.params.idUsuario;
	},
	mounted() {
		this.getUserInformation(this.idUsuario);
	},

	methods: {
		getUserInformation(idUsuario) {
			dataApi
				.getDispositivos(idUsuario)
				.then((res) => {
					console.log(res.data);
					if (res.data) {
						this.lista_dispositivos = res.data;
					} else {
						alert('No se encontraron dispositivos');
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		clickOpcionDispositivo(dispositivo, opcion) {
			console.log(opcion.ruta);
			if (opcion.ruta != 'eliminar') {
				this.$router.push({
					name: opcion.ruta,
					params: { idDispositivo: dispositivo.idDispositivo, dispositivo },
				});
			} else {
				this.eliminar = true;
			}
			console.log(dispositivo);
		},
		agregarNuevoDispositivo() {
			this.$router.push({
				name: 'agregar',
				params: { idUsuario: this.idUsuario },
			});
		},
		clickEliminar(eliminar) {
			if (eliminar) {
				console.log('eliminar');
				this.eliminar = false;
			} else {
				console.log('NO eliminar');
				this.eliminar = false;
			}
		},
	},
};
</script>
