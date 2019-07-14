import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    agree: false,
  },
  getters: {

  },
  mutations: {
    SET_ISLOGIN: (state, data) => {
      state.isLogin = data;
    },
    SET_AGREE: (state, data) => {
      state.agree = data;
    },
  },
  actions: {

  }
})
