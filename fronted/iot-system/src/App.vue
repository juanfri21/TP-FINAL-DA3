<template>
	<v-app>
		<v-main>
			<v-app-bar color="#5852f2" dark short>
				<v-toolbar-title class="pl-1">Iot System</v-toolbar-title>
			</v-app-bar>

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
								@click="clickOpcionDispositivo(title)"
								v-for="([title, icon], i) in opciones_dispositivo"
								:key="i"
								link
							>
								<v-list-item-title v-text="title"></v-list-item-title>

								<v-list-item-icon>
									<v-icon v-text="icon"></v-icon>
								</v-list-item-icon>
							</v-list-item>
						</v-list-group>
					</v-list>
				</v-card>
			</div>

			<v-footer fixed padless>
				<v-card flat tile width="100%" color="#5852f2" class="text-center">
					<v-card-text>
						<v-btn v-for="icon in icons_footer" :key="icon" class="mx-4" icon>
							<v-icon size="24px">
								{{ icon }}
							</v-icon>
						</v-btn>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-text class="white--text">
						{{ new Date().getFullYear() }} — <strong>Juan Francisco Tentor</strong>
					</v-card-text>
				</v-card>
			</v-footer>

			<!-- <v-row class="text-center">
				<router-view></router-view>
			</v-row> -->
		</v-main>
	</v-app>
</template>

<script>
import dataApi from '@/services/api-data';

export default {
	name: 'App',

	components: {},
	data: () => ({
		opciones_dispositivo: [
			['Ingresar', 'mdi-arrow-right-bold-box'],
			['Editar', 'mdi-pencil'],
			['Eliminar', 'mdi-delete'],
			['Información', 'mdi-information'],
		],
		lista_dispositivos: [],
		icons_footer: ['mdi-home', 'mdi-email', 'mdi-linkedin', 'mdi-github'],
		id_usuario: 1,
	}),

	created() {
		this.getUserInformation();
	},

	methods: {
		getUserInformation() {
			dataApi
				.getDispositivos(this.id_usuario)
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
		clickOpcionDispositivo(title) {
			alert(title);
		},
	},
};
</script>
