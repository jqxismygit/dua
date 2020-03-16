import { defineConfig } from 'umi';

export default defineConfig({
  dva: {
    immer: true,
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/basic',
      routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: '@/pages/index' },
        { path: '/example', component: '@/pages/example' },
        { path: '/example2', component: '@/pages/example2' },
      ],
    },
  ],
});
