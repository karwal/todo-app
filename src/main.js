import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueMaterial from 'vue-material';
import VeeValidate from 'vee-validate';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vuex from 'vuex'

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VeeValidate);
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')