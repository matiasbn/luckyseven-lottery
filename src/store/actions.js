/* eslint-disable no-case-declarations */
/* eslint-disable max-len */

import getWeb3 from '@/web3/getWeb3';
import truffleContract from '@/web3/truffleContract';
import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);

export default {
  recoverPurchasedParameters({ commit }, payload) {
    commit('recoverPurchasedParameters', payload);
  },
  recoverGeneratedParameters({ commit }, payload) {
    commit('recoverGeneratedParameters', payload);
  },
  async listenEvents({ commit }, payload) {
    const account = payload;
    const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
    // User events
    truffleContractInstance
      .allEvents({ filter: { owner: account }, fromBlock: 'latest' })
      .on('data', (event) => {
        switch (event.event) {
          case 'GeneratedParametersReceived':
            commit('generatedParametersReceived', event.returnValues);
            break;
          case 'NewTicketReceived':
            commit('newTicketReceived', event.returnValues);
            break;
          default:
            break;
        }
      })
      .on('error', console.error);
    // General events
    truffleContractInstance
      .allEvents({ fromBlock: 'latest' })
      .on('data', (event) => {
        switch (event.event) {
          case 'NewLucky7Ticket':
            commit('newLucky7Ticket', event.returnValues);
            break;
          case 'BalanceUpdated':
            commit('balanceUpdated', event.returnValues.balance);
            break;
          case 'Lucky7NumberInserted':
            commit('lucky7NumberInserted', event.returnValues);
            break;
          case 'RandomTicketSelled':
            commit('statsUpdated', event.returnValues);
            break;
          case 'GeneratedTicket':
            commit('statsUpdated', event.returnValues);
            break;
          case 'GeneratedTicketSelled':
            commit('statsUpdated', event.returnValues);
            break;
          case 'SettingNumbersChanged':
            commit('settingNumbersChanged', event.returnValues);
            break;
          case 'NewGameStarted':
            commit('newGameStarted', event.returnValues);
            break;
          default:
            break;
        }
      })
      .on('error', console.error);
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
  async getGameSettings({ commit }) {
    const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
    const valuesPromises = [
      truffleContractInstance.getPastEvents('GameParameters', { fromBlock: 0 }),
      truffleContractInstance.settingLucky7Numbers(),
      truffleContractInstance.gameID(),
      web3.eth.getBalance(truffleContractInstance.address),
    ];
    const values = await Promise.all(valuesPromises);
    const gameParameters = values[0]['0'].returnValues;
    const settingLucky7Numbers = values[1];
    const gameID = values[2];
    const contractBalance = values[3];
    const b = gameParameters.b;
    const n = gameParameters.n;
    const p = gameParameters.p;
    const j = gameParameters.j;
    const numberOfLucky7Numbers = parseInt(gameParameters.numberOfLucky7Numbers, 10);
    const purchaseTicketPrice = gameParameters.purchaseTicketPrice;
    const generateTicketPrice = gameParameters.generateTicketPrice;
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
        difference: parseInt(lucky7TicketsDiffs[i], 10),
      };
    }

    const payload = {
      lucky7Numbers, lucky7Tickets, generateTicketPrice, purchaseTicketPrice, b, n, p, j, settingLucky7Numbers, gameID, contractBalance,
    };

    commit('getGameSettings', payload);
  },
  parameterReceived({ commit }, payload) {
    commit('parameterReceived', payload);
  },
};
