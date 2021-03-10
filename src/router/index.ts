import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../pages/home/Home.vue';
import Blog from '../pages/blog/index.vue';
import Lab from '../pages/lab/index.vue';
import Writer from '../pages/Writer.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
    },
    {
        path: '/blog',
        name: 'Blog',
        component: Blog
    },
    {
        path: '/lab',
        name: 'Lab',
        component: Lab
    },
    {
        path: '/writer',
        name: 'Writer',
        component: Writer
        // 需要返回promise
        // component: () => require('../pages/Writer')
    }
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
