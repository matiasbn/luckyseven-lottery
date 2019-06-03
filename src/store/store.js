/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import Vuex from 'vuex';
import getWeb3 from '@/web3/getWeb3';
import truffleContract from '@/web3/truffleContract';

Vue.use(Vuex);

export const store = new Vuex.Store({
  actions: {
    registerWeb3({ commit }) {
      getWeb3.then((result) => {
        commit('registerWeb3Instance', result);
      }).catch((e) => {
        console.log(e);
      });
    },
    pollWeb3({ commit }, payload) {
      commit('pollWeb3Instance', payload);
    },
    async retrieveGameInformation({ commit }) {
      const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
      const numberOfLucky7Numbers = parseInt(await truffleContractInstance.numberOfLucky7Numbers(), 10);
      const lucky7Numbers = [];
      const lucky7Tickets = [];
      for (let i = 0; i < numberOfLucky7Numbers; i += 1) {
        lucky7Numbers[i] = parseInt((await truffleContractInstance.lucky7NumbersArray(i)).ticketValue, 10);
        const lucky7TicketID = parseInt(await truffleContractInstance.lucky7TicketID(i), 10);
        console.log(lucky7TicketID);
        // lucky7Tickets[i] = parseInt((await truffleContractInstance.ticketsArray(lucky7TicketID)).ticketValue);
        lucky7Tickets[i] = {
          ticket: parseInt(await truffleContractInstance.ticketsArray(lucky7TicketID), 10),
          owner: await truffleContractInstance.lucky7TicketOwner(i),
          get difference() {
            return parseInt(
              lucky7Numbers[i] - this.ticket > 0
                ? lucky7Numbers[i] - this.ticket
                : this.ticket - lucky7Numbers[i],
              10,
            );
          },
        };
        console.log(lucky7Tickets[i].ticket);
      }
      const generateTicketPrice = await truffleContractInstance.generateTicketPrice();
      const sellTicketPrice = await truffleContractInstance.sellTicketPrice();
      const userValues = await truffleContractInstance.userValues(this.state.web3.coinbase);
      const payload = { lucky7Numbers, lucky7Tickets, generateTicketPrice, sellTicketPrice, userValues };
      commit('retrieveGameInfoInstance', payload);
    },
    async eventListener({ commit }) {
      const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
      truffleContractInstance
        .CustomizedLucky7NumberInserted({}, (error, event) => {
          if (!error) {
            commit('eventEmitted', event);
          }
        });
    },
  },
  mutations: {
    registerWeb3Instance(state, payload) {
      const { networkId, coinbase, balance, isConnected } = payload;
      state.web3.networkId = networkId;
      state.web3.coinbase = coinbase;
      state.web3.balance = balance;
      state.web3.isConnected = isConnected;
    },
    pollWeb3Instance(state, payload) {
      state.web3.coinbase = payload.coinbase;
      state.web3.balance = payload.balance;
    },
    retrieveGameInfoInstance(state, payload) {
      const {
        lucky7Numbers,
        lucky7Tickets,
        generateTicketPrice,
        sellTicketPrice,
        userValues } = payload;
      lucky7Numbers.forEach((number, index) => {
        state.lucky7Numbers[index].number = number;
      });
      lucky7Tickets.forEach((lucky7Ticket, index) => {
        state.lucky7Numbers[index].ticket = lucky7Ticket.ticket;
        state.lucky7Numbers[index].owner = lucky7Ticket.owner;
        state.lucky7Numbers[index].difference = lucky7Ticket.difference;
      });
      state.game.generateTicketPrice = generateTicketPrice;
      state.game.purchaseTicketPrice = sellTicketPrice;
      state.player.lastPurchasedTicket = userValues.ticketValue;
    },
    eventEmitted(state, payload) {
      console.log(payload, state);
    },
  },
  state: {
    web3: {
      networkId: null,
      coinbase: null,
      balance: '',
      isConnected: false,
    },
    contractInstance: null,
    totalPrize: 10.6125128931,
    lucky7Numbers: [
      {
        prize: 10.6125128931,
        ticket: 123917289,
        owner: 12313,
        difference: 1,
        place: 1,
        number: 7,
      },
      {
        prize: 10.6125128931,
        ticket: 123917289,
        owner: 12313,
        difference: 2,
        place: 1,
        number: 7,
      },
      {
        prize: 10.6125128931,
        ticket: 123917289,
        owner: 12313,
        difference: 3,
        place: 1,
        number: 7,
      },
      {
        prize: 10.6125128931,
        ticket: 123917289,
        owner: 12313,
        difference: 4,
        place: 1,
        number: 7,
      },
      {
        prize: 10.6125128931,
        ticket: 123917289,
        owner: 12313,
        difference: 5,
        place: 1,
        number: 7,
      },
      {
        prize: 10.6125128931,
        ticket: 123917289,
        owner: 12313,
        difference: 6,
        place: 1,
        number: 7,
      },
      {
        prize: 10.6125128931,
        ticket: 123917289,
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
      generateTicketPrice: '',
      purchaseTicketPrice: '',
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
