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
    prize1: {
      amount: 10.6125128931,
      ticket: 1982378913,
      owner: 12313,
    },
    prize2: {
      amount: 10.6125128931,
      ticket: 1982378913,
      owner: 12313,
    },
    prize3: {
      amount: 10.6125128931,
      ticket: 1982378913,
      owner: 12313,
    },
    prize4: {
      amount: 10.6125128931,
      ticket: 1982378913,
      owner: 12313,
    },
    prize5: {
      amount: 10.6125128931,
      ticket: 1982378913,
      owner: 12313,
    },
    prize6: {
      amount: 10.6125128931,
      ticket: 1982378913,
      owner: 12313,
    },
    prize7: {
      amount: 10.6125128931,
      ticket: 1982378913,
      owner: 12313,
    },
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
    lastWinnersOwners: {
      firstPrizeOwner: 100,
      secondPrizeOwner: 100,
      thirdPrizeOwner: 100,
    },
    lastWinnersDifferences: {
      firstPrizeDifference: 1,
      secondPrizeDifference: 2,
      thirdPrizeDifference: 3,
    },
    lastWinnersPrizes: {
      firstPrize: 100,
      secondPrize: 100,
      thirdPrize: 100,
    },
  },
});
