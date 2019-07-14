import Vue from 'vue';
import App from './App.vue';
import './style/index.scss'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router';
import store from './store';
import $http from './api';

Vue.use(Element)
Vue.prototype.$http = $http;

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.path == '/login' || to.path == '/register' || to.path == '/find') {
//     next();
//   } else {
//       if (store.state.isLogin) {
//         if (!to.name) {
//           next('/home/parkList')
//         } else {
//           next();
//         }
//       } else {
//         next('/login');
//       }
//   }
// })

Vue.config.productionTip = false

new Vue({
  router,
  store, 
  render: h => h(App)
}).$mount('#app')
