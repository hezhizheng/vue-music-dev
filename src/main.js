import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';


import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';


// Vue.config.productionTip = false;
//开启debug模式
Vue.config.debug = true;

Vue.use(MintUI);
Vue.use(VueRouter);
Vue.use(VueResource);

import musicHeader from './components/Header.vue';
import musicSearch from './components/Search.vue';

// 创建一个路由器实例
// 并且配置路由规则
const routers = new VueRouter({
  // mode: 'hash', // Hash History Abstract
  // base: __dirname,
  routes: [
    {
      path: '/',
      component: musicHeader,
    },
    {
      path: '/search',
      component: musicSearch,
    },
  ],
});

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   render: h => h(App)
// });
//
// // 记得要通过 router 配置参数注入路由，
// // 从而让整个应用都有路由功能
// const app = new Vue({
//   router
// }).$mount('#app')

const app = new Vue({
  router: routers,
  render: h => h(App),
}).$mount('#app');

