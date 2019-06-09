/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import Vuex from 'vuex';
import getWeb3 from '@/web3/getWeb3';
import truffleContract from '@/web3/truffleContract';
import orderBy from 'lodash.orderby';
import Web3 from 'web3';

Vue.use(Vuex);
const web3 = new Web3(window.web3.currentProvider);

export const store = new Vuex.Store({
  getters: {
    lastPurchasedTicket: state => state.player.lastPurchasedTicket,
    lastNumber1: state => state.player.lastNumber1,
    lastNumber2: state => state.player.lastNumber2,
    lucky7Ticket: state => state.player.lucky7Ticket,
    ticketReceived: state => state.player.ticketReceived,
    firstNumberReceived: state => state.player.firstNumberReceived,
    secondNumberReceived: state => state.player.secondNumberReceived,
    lucky7Numbers: (state) => {
      let lucky7Numbers = state.lucky7Numbers;
      lucky7Numbers = orderBy(lucky7Numbers, 'difference', 'asc');
      let prizeCounter = 0;
      lucky7Numbers.forEach((row, index) => {
        if (parseInt(row.difference, 10) !== 0) {
          const currentPrize = String((parseFloat(state.web3.contractBalance * 0.7 * (7 - prizeCounter), 10)) / 28);
          lucky7Numbers[index].prize = `${web3.utils.fromWei(currentPrize, 'ether')} ETH`;
          prizeCounter += 1;
        }
      });
      lucky7Numbers = orderBy(lucky7Numbers, 'number', 'asc');
      return state.lucky7Numbers;
    },
  },
  actions: {
    async ticketGenerated({ commit }) {
      console.log(commit);
    },
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
      const coinbase = await web3.eth.getCoinbase();
      const lucky7NumbersPromises = [];
      const lucky7TicketsValuePromises = [];
      const lucky7TicketsOwnerPromises = [];
      const lucky7TicketsDiffPromises = [];
      for (let i = 0; i < numberOfLucky7Numbers; i += 1) {
        lucky7NumbersPromises.push(truffleContractInstance.lucky7NumbersArray(i));
        lucky7TicketsValuePromises.push(truffleContractInstance.lucky7TicketValue(i));
        lucky7TicketsOwnerPromises.push(truffleContractInstance.lucky7TicketOwner(i));
        lucky7TicketsDiffPromises.push(truffleContractInstance.lucky7TicketDifference(i));
      }
      const lucky7NumbersValues = await Promise.all(lucky7NumbersPromises);
      const lucky7TicketsValues = await Promise.all(lucky7TicketsValuePromises);
      const lucky7TicketsOwners = await Promise.all(lucky7TicketsOwnerPromises);
      const lucky7TicketsDiffs = await Promise.all(lucky7TicketsDiffPromises);
      const lucky7Numbers = [];
      const lucky7Tickets = [];
      for (let i = 0; i < numberOfLucky7Numbers; i += 1) {
        lucky7Numbers[i] = parseInt(lucky7NumbersValues[i].ticketValue, 10);
        lucky7Tickets[i] = {
          ticket: parseInt(lucky7TicketsValues[i], 10),
          owner: lucky7TicketsOwners[i],
          difference: lucky7TicketsDiffs[i],
        };
      }
      const valuesPromises = [
        truffleContractInstance.generateTicketPrice(),
        truffleContractInstance.sellTicketPrice(),
        truffleContractInstance.userValues(coinbase),
        truffleContractInstance.pendingWithdrawals(coinbase),
      ];

      const values = await Promise.all(valuesPromises);
      const payload = {
        lucky7Numbers,
        lucky7Tickets,
        generateTicketPrice: values[0],
        sellTicketPrice: values[1],
        userValues: values[2],
        currentPrize: values[3],
      };
      commit('retrieveGameInfoInstance', payload);
    },
    async parameterReceived({ commit }, payload) {
      commit('parameterReceived', payload);
    },
    async askForValues({ commit }, payload) {
      commit('askForValues', payload);
    },
  },
  mutations: {
    askForValues(state, payload) {
      switch (payload) {
        case 'generateTicket':
          state.player.firstNumberReceived = false;
          state.player.secondNumberReceived = false;
          break;
        case 'purchaseRandomTicket':
          state.player.ticketReceived = false;
          state.player.firstNumberReceived = false;
          state.player.secondNumberReceived = false;
          break;
        case 'purchaseGeneratedTicket':
          state.player.ticketReceived = false;
          break;
        default:
          break;
      }
    },
    parameterReceived(state, payload) {
      const { type, value } = payload;
      switch (type) {
        case 'mu':
          state.player.lastNumber1 = value;
          state.player.firstNumberReceived = true;
          break;
        case 'i':
          state.player.lastNumber2 = value;
          state.player.secondNumberReceived = true;
          break;
        case 'ticket':
          state.player.lastPurchasedTicket = value;
          state.player.ticketReceived = true;
          break;
        default:
          break;
      }
    },
    registerWeb3Instance(state, payload) {
      const { networkId, coinbase, balance, isConnected, contractInstance, contractAddress, contractBalance } = payload;
      state.web3.networkId = networkId;
      state.web3.coinbase = coinbase;
      state.web3.balance = balance;
      state.web3.isConnected = isConnected;
      state.web3.contractInstance = contractInstance;
      state.web3.contractAddress = contractAddress;
      state.web3.contractBalance = contractBalance;
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
        userValues,
        currentPrize,
      } = payload;
      lucky7Tickets.forEach((lucky7Ticket, index) => {
        const row = {
          prize: lucky7Ticket.prize,
          ticket: lucky7Ticket.ticket,
          owner: lucky7Ticket.owner,
          difference: lucky7Ticket.difference,
          number: lucky7Numbers[index],
        };
        state.lucky7Numbers.push(row);
      });
      state.game.generateTicketPrice = generateTicketPrice;
      state.game.purchaseTicketPrice = sellTicketPrice;
      state.player.lastPurchasedTicket = userValues.ticketValue;
      state.player.lastNumber1 = userValues.mu;
      state.player.lastNumber2 = userValues.i;
      state.player.currentPrize = currentPrize;
    },
  },
  state: {
    web3: {
      networkId: null,
      coinbase: null,
      balance: '0',
      isConnected: false,
      contractInstance: null,
      contractAddress: '0',
      contractBalance: '0',
    },
    player: {
      currentPrize: 0,
      lastPurchasedTicket: 0,
      lastNumber1: 0,
      lastNumber2: 0,
      isLucky7Ticket: false,
      firstNumberReceived: true,
      secondNumberReceived: true,
      ticketReceived: true,
    },
    game: {
      generateTicketPrice: '0',
      purchaseTicketPrice: '0',
      ticketsSelled: 0,
      ticketsGenerated: 0,
    },
    lucky7Numbers: [],
  },
});
