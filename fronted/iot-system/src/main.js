import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import DatetimePicker from 'vuetify-datetime-picker';
import VueMqtt from 'vue-mqtt';

import router from './router';

Vue.use(DatetimePicker);
Vue.use(VueMqtt, 'ws://localhost:9001', {clientId: 'WebClient-' + parseInt(Math.random() * 100000)})

Vue.config.productionTip = false;

new Vue({
	vuetify,
	DatetimePicker,
	router,
	VueMqtt,
	render: (h) => h(App),
}).$mount('#app');
