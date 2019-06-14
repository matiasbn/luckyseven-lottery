/* eslint-disable max-len */

import getWeb3 from '@/web3/getWeb3';
import Web3 from 'web3';
import truffleContract from '../web3/truffleContract';

const web3 = new Web3(window.web3.currentProvider);
export default {
  async listenEvents({ commit }, payload) {
    const account = payload;
    const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
    truffleContractInstance
      .NewMuReceived({ owner: account, fromBlock: 'latest' }, (error, event) => {
        if (!error) {
          const payloadEvent = {
            value: event.returnValues.muParameter,
            type: 'mu',
          };
          commit('parameterReceived', payloadEvent);
        }
      });
    truffleContractInstance
      .NewIReceived({ owner: account, fromBlock: 'latest' }, (error, event) => {
        if (!error) {
          const payloadEvent = {
            value: event.returnValues.iParameter,
            type: 'i',
          };
          commit('parameterReceived', payloadEvent);
        }
      });
    truffleContractInstance
      .NewTicketReceived({ owner: account, fromBlock: 'latest' }, (error, event) => {
        if (!error) {
          const payloadEvent = {
            value: event.returnValues.newTicket,
            type: 'ticket',
          };
          commit('parameterReceived', payloadEvent);
        }
      });
    truffleContractInstance
      .NewLucky7Ticket({ owner: account, fromBlock: 'latest' }, (error, event) => {
        if (!error) {
          commit('newLucky7Ticket', event.returnValues);
        }
      });
    truffleContractInstance
      .BalanceUpdated((error, event) => {
        if (!error) {
          commit('balanceUpdated', event.returnValues.balance);
        }
      });
    truffleContractInstance
      .Lucky7NumberInserted((error, event) => {
        if (!error) {
          commit('lucky7NumberInserted', event.returnValues);
        }
      });
    truffleContractInstance
      .RandomTicketSelled((error, event) => {
        if (!error) {
          commit('statsUpdated', event.returnValues);
        }
      });
    truffleContractInstance
      .GeneratedTicket((error, event) => {
        if (!error) {
          commit('statsUpdated', event.returnValues);
        }
      });
    truffleContractInstance
      .GeneratedTicketSelled((error, event) => {
        if (!error) {
          commit('statsUpdated', event.returnValues);
        }
      });
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
    ];

    const contractAddress = truffleContractInstance.address;
    const contractBalance = await web3.eth.getBalance(contractAddress);
    const values = await Promise.all(valuesPromises);
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
