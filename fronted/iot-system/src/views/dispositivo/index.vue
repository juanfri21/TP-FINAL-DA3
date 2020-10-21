<template>
	<v-container>
		<v-row>
			<v-col cols="10">
				<v-banner class="mr-2">
					<div align="left">
						<h3 align="left">Datos de estacion</h3>
						
					</div>
				</v-banner>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
// import dataApi from '@/services/api-data';

export default {

    data: () => ({
        // dispositivo_info:{}
    }),

    created() {
        console.log(this.$route.params)
		// this.dispositivo_info = this.$route.params.idDispositivo;
	},
}
</script>