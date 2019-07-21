// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import Vuethereum from 'vuethereum';
import App from './App';
import { router } from './router';
import { store } from './store';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(AsyncComputed);
Vue.use(Vuethereum);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
