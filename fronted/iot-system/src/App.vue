<template>
	<v-app>
		<v-main>
			<v-app-bar color="#5852f2" dark short>
				<v-toolbar-title class="pl-1">Iot System</v-toolbar-title>
			</v-app-bar>

			<router-view></router-view>

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
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',

	components: {},
	data: () => ({
		icons_footer: ['mdi-home', 'mdi-email', 'mdi-linkedin', 'mdi-github'],
		idUsuario: 1,
	}),

	created() {
		this.$router.push({
			name: 'home',
			params: { idUsuario: this.idUsuario },
		});
	},
};
</script>
