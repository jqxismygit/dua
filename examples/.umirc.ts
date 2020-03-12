import { defineConfig } from 'umi';

export default defineConfig({
  dva: {
    immer: true,
  },
  routes: [{ path: '/', component: '@/pages/index' }],
});
