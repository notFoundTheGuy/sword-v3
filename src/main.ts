import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

require('./common/style/index.less');

createApp(App)
	.use(store)
	.use(router)
	.mount('#app');
