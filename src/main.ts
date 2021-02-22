import { createApp, defineComponent } from 'vue';
// import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

require('./common/style/index.less');

let app = createApp(App);

app.use(store)
	.use(router)
	.mount('#app');

app.config.performance = true;

// 全局配置
import axios from 'axios';
app.config.globalProperties.$post = axios.post;
app.config.globalProperties.$get = axios.get;
declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$post: any;
		$get: any;
	}
}
