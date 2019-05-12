import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
// import Web3 from 'web3';
import App from './App.vue';
import { store } from './store/store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
