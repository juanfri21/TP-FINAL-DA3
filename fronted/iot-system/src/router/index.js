import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routerOptions = [
    { path: '/:idUsuario', name: 'home', meta: { showBreadcrumb: true } },
    { path: '/dispositivo/:idDispositivo', name: 'dispositivo', meta: { showBreadcrumb: true } },
	{ path: '/editar/:idDispositivo', name: 'editar', meta: { showBreadcrumb: true } },
	{ path: '/informacion/:idDispositivo', name: 'informacion', meta: { showBreadcrumb: true } },
    
	//   { path: '/error', name: 'Error' },
	// { path: '*', redirect: { name: 'Measurements' } },
];

const routes = routerOptions.map((r) => {
	return {
		...r,
		component: () => import(`@/views/${r.name}/index.vue`),
	};
});

const router = new Router({
    routes,
    mode: 'history'
});

export default router;
