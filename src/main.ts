import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// v-md-editor
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
VueMarkdownEditor.use(vuepressTheme);

let app = createApp(App);
app.use(store)
	.use(router)
	.use(VueMarkdownEditor)
	.mount('#app');

// 样式入口
require('./common/style/index.less');

// 全局配置
app.config.performance = true;
import axios from './axios';
import qs from 'qs';
app.config.globalProperties.$post = axios.post;
app.config.globalProperties.$get = axios.get;
app.config.globalProperties.$qs = qs;
import { notification } from "ant-design-vue";
app.config.globalProperties.$notify = notification;

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$post: any;
		$get: any;
		$qs: any;
        $notify: any;
	}
}

// 全局组件
import Icon from '@c/Icon.vue';
app.component('Icon', Icon);

// ant-design
import { Button, Select } from "ant-design-vue";
app.component('AButton', Button);
app.component('ASelect', Select);
