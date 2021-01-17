import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/canvas',
    name: 'Canvas',
    component: () => import('../views/Canvas.vue'),
  },
  {
    path: '/dom',
    name: 'Dom',
    component: () => import('../views/Dom.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;