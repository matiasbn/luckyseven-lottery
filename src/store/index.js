/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import state from './state';
import mutations from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
  getters,
  actions,
  mutations,
  state,
});
