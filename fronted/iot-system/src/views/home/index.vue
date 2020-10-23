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
								@click="clickOpcionDispositivo(dispositivo)"
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
		clickOpcionDispositivo(dispositivo) {
			this.$router.push({
				name: 'dispositivo',
				params: { idDispositivo: dispositivo.idDispositivo, dispositivo },
			});
			console.log(dispositivo);
		},
	},
};
</script>
