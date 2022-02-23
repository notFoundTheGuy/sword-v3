import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/home/index.vue";
import Blog from "../pages/blog/index.vue";
import BlogManage from "../pages/blog/manage.vue";
import Lab from "../pages/lab/index.vue";
import Writer from "../pages/Writer.vue";
import About from "../pages/About.vue";

import painter from "../pages/lab/painter/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/blog",
    name: "BlogIndex",
    component: Blog,
  },
  {
    path: "/blog/:id",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/blog/manage",
    name: "BlogManage",
    component: BlogManage,
  },
  {
    path: "/lab",
    name: "Lab",
    component: Lab,
    children: [
      {
        path: "",
        redirect: "/lab/painter",
      },
      {
        path: "painter",
        name: "painter",
        component: painter,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/writer",
    name: "Writer",
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
