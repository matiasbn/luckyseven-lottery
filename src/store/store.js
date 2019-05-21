/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import Vuex from 'vuex';
import getWeb3 from '../util/getWeb3';

Vue.use(Vuex);

export const store = new Vuex.Store({
  actions: {
    registerWeb3({ commit }) {
      console.log('registerWeb3 Action being executed');
      getWeb3.then((result) => {
        console.log('committing result to registerWeb3Instance mutation');
        commit('registerWeb3Instance', result);
      }).catch((e) => {
        console.log('error in action registerWeb3', e);
      });
    },
  },
  mutations: {
    registerWeb3Instance(state, payload) {
      console.log(payload);
      console.log('registerWeb3instance Mutation being executed', payload);
      const result = payload;
      const web3Copy = state.web3;
      web3Copy.coinbase = result.coinbase;
      web3Copy.networkId = result.networkId;
      web3Copy.balance = result.balance;
      web3Copy.isInjected = result.injectedWeb3;
      web3Copy.web3Instance = result.web3;
      state.web3 = web3Copy;
    },
  },
  state: {
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null,
    },
    contractInstance: null,
    totalPrize: 10.6125128931,
    lucky7Numbers: [
      {
        prize: 10.6125128931,
        ticket: 1982378913,
        owner: 12313,
        difference: 1,
        place: 1,
        number: 7,
      },
      {
        prize: 10.6125128931,
        ticket: 1982378913,
        owner: 12313,
        difference: 2,
        place: 1,
        number: 7,
      },
      {
        prize: 10.6125128931,
        ticket: 1982378913,
        owner: 12313,
        difference: 3,
        place: 1,
        number: 7,
      },
      {
        prize: 10.6125128931,
        ticket: 1982378913,
        owner: 12313,
        difference: 4,
        place: 1,
        number: 7,
      },
      {
        prize: 10.6125128931,
        ticket: 1982378913,
        owner: 12313,
        difference: 5,
        place: 1,
        number: 7,
      },
      {
        prize: 10.6125128931,
        ticket: 1982378913,
        owner: 12313,
        difference: 6,
        place: 1,
        number: 7,
      },
      {
        prize: 10.6125128931,
        ticket: 1982378913,
        owner: 12313,
        difference: 7,
        place: 1,
        number: 7,
      },
    ],
    player: {
      account: 77,
      tokens: 10,
      currentPrize: 100,
      lastPurchasedTicket: 122109,
      lastPurchasedNumber1: 122,
      lastPurchasedNumber2: 307,
      lastGeneratedTicket: 11238,
      lastGeneratedNumber1: 222,
      lastGeneratedNumber2: 333,
      isLucky7Ticket: false,
    },
    game: {
      generateTicketPrice: 12,
      purchaseTicketPrice: 19,
      ticketsSelled: 7,
      ticketsGenerated: 200,
    },
    lastWinners: {
      owners: [100, 100, 100],
      differences: [1, 2, 3],
      prizes: [100, 100, 100],

    },
  },
});
