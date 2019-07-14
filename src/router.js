import Vue from 'vue'
import Router from 'vue-router'

import StoreOnline from '@/views/StoreOnline'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/storeOnline',
      compontent: StoreOnline
    },
    {
      path: '/storeOnline',
      name: '/storeOnline',
      component: StoreOnline
    }
  ]
})
