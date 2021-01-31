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

// app.config.globalProperties.defineComponent = defineComponent;
app.config.performance = true
