/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import Vuex from 'vuex';
import game from './game';
import player from './player';
import web3 from './web3';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    game,
    player,
    web3,
  },
});
