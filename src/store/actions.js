/* eslint-disable no-case-declarations */
/* eslint-disable max-len */

import getWeb3 from '@/web3/getWeb3';
import Web3 from 'web3';
import truffleContract from '../web3/truffleContract';

const web3 = new Web3(window.web3.currentProvider);

export default {
  async listenEvents({ commit }, payload) {
    const account = payload;
    const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
    // User events
    truffleContractInstance
      .allEvents({ filter: { owner: account }, fromBlock: 'latest' })
      .on('data', (event) => {
        switch (event.event) {
          case 'ParametersReceived':
            const parameters = {
              value: event.returnValues,
              type: 'parameters',
            };
            commit('parameterReceived', parameters);
            break;
          case 'NewTicketReceived':
            const newTicket = {
              value: event.returnValues.newTicket,
              type: 'ticket',
            };
            commit('parameterReceived', newTicket);
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
        difference: parseInt(lucky7TicketsDiffs[i], 10),
      };
    }
    const valuesPromises = [
      truffleContractInstance.generateTicketPrice(),
      truffleContractInstance.sellTicketPrice(),
      truffleContractInstance.userValues(coinbase),
      truffleContractInstance.pendingWithdrawals(coinbase),
      truffleContractInstance.b(),
      truffleContractInstance.n(),
      truffleContractInstance.p(),
      truffleContractInstance.j(),
      truffleContractInstance.settingLucky7Numbers(),
      truffleContractInstance.gameID(),
    ];

    const contractAddress = truffleContractInstance.address;
    const contractBalance = await web3.eth.getBalance(contractAddress);
    const values = await Promise.all(valuesPromises);
    const lastPurchasedTicketID = await truffleContractInstance.userLastPurchasedTicket(coinbase);
    const ticketsArrayLength = await truffleContractInstance.ticketsArrayLength();
    let lastPurchasedTicket;
    if (ticketsArrayLength.toNumber() !== 0) {
      lastPurchasedTicket = await truffleContractInstance.ticketsArray(lastPurchasedTicketID);
      if ((lastPurchasedTicket.owner.toUpperCase()) !== coinbase.toUpperCase()) {
        lastPurchasedTicket = '0';
      }
    } else {
      lastPurchasedTicket = '0';
    }
    const payload = {
      lucky7Numbers,
      lucky7Tickets,
      generateTicketPrice: values[0],
      sellTicketPrice: values[1],
      userValues: values[2],
      currentPrize: values[3],
      prizeGameID: values[3].gameID.toNumber(),
      contractAddress,
      contractBalance,
      lastPurchasedTicket,
      b: values[4],
      n: values[5],
      p: values[6],
      j: values[7],
      settingLucky7Numbers: values[8],
      gameID: values[9],
    };
    commit('retrieveGameInfoInstance', payload);
  },
  parameterReceived({ commit }, payload) {
    commit('parameterReceived', payload);
  },
  askForValues({ commit }, payload) {
    commit('askForValues', payload);
  },
  async updatePastGames({ commit }) {
    const contractInstance = await truffleContract(window.web3.currentProvider).deployed();
    const counter = (await contractInstance.initialLucky7TicketPosition()).toNumber();
    const lucky7TicketsPromises = [];
    for (let i = 0; i < counter; i += 1) {
      lucky7TicketsPromises.push(contractInstance.lucky7TicketsArray(i));
    }
    const lucky7TicketsArray = await Promise.all(lucky7TicketsPromises);
    commit('updatePastGames', lucky7TicketsArray);
  },
};
