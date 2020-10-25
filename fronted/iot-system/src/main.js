import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import DatetimePicker from 'vuetify-datetime-picker';

import router from './router';

Vue.use(DatetimePicker);

Vue.config.productionTip = false;

new Vue({
	vuetify,
	DatetimePicker,
	router,
	render: (h) => h(App),
}).$mount('#app');
