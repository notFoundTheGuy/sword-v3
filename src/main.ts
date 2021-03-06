import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './common/axios';
import qs from 'qs';

// v-md-editor
import VueMarkdownEditor from '@kangc/v-md-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import './common/style/markdown.less';
VueMarkdownEditor.use(vuepressTheme);
VMdPreview.use(vuepressTheme);

let app = createApp(App);

// 全局组件-- 组件注册需要写在mount之前
import Icon from '@c/Icon.vue';
app.component('Icon', Icon);
// ant-design
import { Button, Select, Space, Menu, Popconfirm, notification } from 'ant-design-vue';
app.component('AButton', Button);
app.component('ASelect', Select);
app.component('ASelectOption', Select.Option);
app.component('ASpace', Space);
app.component('AMenu', Menu);
app.component('ASubMenu', Menu.SubMenu);
app.component('AMenuItem', Menu.Item);
app.component('APopconfirm', Popconfirm);

app.use(store)
	.use(router)
	.use(VueMarkdownEditor)
	.use(VMdPreview)
	.mount('#app');

// 样式入口
require('./common/style/index.less');

// 全局配置
app.config.performance = true;
app.config.globalProperties.$post = axios.post;
app.config.globalProperties.$get = axios.get;
app.config.globalProperties.$qs = qs;
app.config.globalProperties.$notify = notification;

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$post: any;
		$get: any;
		$qs: any;
		$notify: any;
	}
}
