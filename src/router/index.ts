import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../pages/home/index.vue';
import Blog from '../pages/blog/index.vue';
import BlogManage from '../pages/blog/manage.vue';
import Lab from '../pages/lab/index.vue';
import Writer from '../pages/Writer.vue';
import About from '../pages/About.vue';

import Painter from '../pages/lab/painter/index.vue';
import Lottery from '../pages/lab/lottery/index.vue';
import Grant from '../pages/lab/grant/index.vue';
import Recorder from '../pages/lab/recorder/index.vue';
import ChatGPT from '../pages/lab/chatGPT/index.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/blog',
		name: 'BlogIndex',
		component: Blog,
	},
	{
		path: '/blog/:id',
		name: 'Blog',
		component: Blog,
	},
	{
		path: '/blog/manage',
		name: 'BlogManage',
		component: BlogManage,
	},
	{
		path: '/lab',
		name: 'Lab',
		component: Lab,
		children: [
			{
				path: '',
				redirect: '/lab/painter',
			},
			{
				path: 'painter',
				name: 'painter',
				component: Painter,
			},
			{
				path: 'lottery',
				name: 'lottery',
				component: Lottery,
			},
			{
				path: 'recorder',
				name: 'recorder',
				component: Recorder,
			},
			{
				path: 'grant',
				name: 'grant',
				component: Grant,
			},
      {
        path: 'chatGPT',
        name: 'chatGPT',
        component: ChatGPT,
      }
		],
	},
	{
		path: '/about',
		name: 'About',
		component: About,
	},
	{
		path: '/writer',
		name: 'Writer',
		component: Writer,
		// 需要返回promise
		// component: () => require('../pages/Writer')
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
