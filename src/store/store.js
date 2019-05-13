/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
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
      lastGeneratedTicket: 11238,
      isLucky7Ticket: false,
    },
    game: {
      generateTicketPrice: 12,
      sellTicketPrice: 19,
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
