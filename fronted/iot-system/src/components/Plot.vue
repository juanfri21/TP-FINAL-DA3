<template>
	<v-container class="pa-0">
		<v-col cols="12" sm="12" md="12" class="pa-0">
			<div :id="id"></div>
		</v-col>
	</v-container>
</template>

<script>
import plotly from 'plotly.js';

export default {
	name: 'Plot',

	props: {
		id: {
			type: String,
			required: true,
		},
		traces: {
			type: Array,
			required: true,
		},
		layout: {
			type: Object,
			required: true,
		}
	},

	data: () => ({
	}),

	mounted() {
		plotly.newPlot(this.id, this.traces, this.layout, { responsive: true, displaylogo: false }); //displaylogo: false displayModeBar: false
	},

	watch: {
		traces(newValue) {
			plotly.newPlot(this.id, newValue, this.layout, { responsive: true, displaylogo: false });
		},
	},
};
</script>

<style>
.container {
	max-width: none;
	padding-top: 0;
}
</style>
