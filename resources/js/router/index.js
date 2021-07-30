import Vue from 'vue';
import VueRouter from 'vue-router';
import { EventModuleRoutes } from '../modules/event/utils/router'

Vue.use(VueRouter);

const routes = [
  {
    name: 'AppLayout',
    path: '/',
    redirect: '/events',
    component: () => import(/* webpackChunkName: 'applayout' */ '../components/layouts/AppLayout'),
    children: [
      ...EventModuleRoutes,
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.MIX_APP_URL,
  routes
});

export default router;