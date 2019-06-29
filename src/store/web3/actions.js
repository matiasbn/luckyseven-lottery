/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */

import Web3 from 'web3';
import truffleContract from '@/web3/truffleContract';


export const listenEvents = async ({ commit, state, rootState }) => {
  const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
  // To avoid double events where important, it stores the transaction hashes and checks if it is repeated
  const eventsTransactionHash = {
    newTicketReceived: null,
  };
  // Player events
  truffleContractInstance
    .allEvents({ filter: { owner: state.coinbase }, fromBlock: 'latest' })
    .on('data', (event) => {
      switch (event.event) {
        case 'GeneratedParametersReceived':
          commit('player/generatedParametersReceived', { returnValues: event.returnValues, rootState }, { root: true });
          break;
        case 'NewTicketReceived':
          if (eventsTransactionHash.newTicketReceived !== event.transactionHash) {
            eventsTransactionHash.newTicketReceived = event.transactionHash;
            commit('player/newTicketReceived', { returnValues: event.returnValues, rootState }, { root: true });
          }
          break;
        default:
          break;
      }
    })
    .on('error', console.error);
  // Game events
  truffleContractInstance
    .allEvents({ fromBlock: 'latest' })
    .on('data', (event) => {
      switch (event.event) {
        case 'NewLucky7Ticket':
          commit('game/newLucky7Ticket', { returnValues: event.returnValues, rootState }, { root: true });
          break;
        case 'BalanceUpdated':
          commit('web3/balanceUpdated', event.returnValues.balance, { root: true });
          break;
        case 'Lucky7NumberInserted':
          commit('game/lucky7NumberInserted', event.returnValues, { root: true });
          break;
        case 'RandomTicketSelled':
          commit('game/statsUpdated', event.returnValues, { root: true });
          break;
        case 'GeneratedTicket':
          commit('game/statsUpdated', event.returnValues, { root: true });
          break;
        case 'GeneratedTicketSelled':
          commit('game/statsUpdated', event.returnValues, { root: true });
          break;
        case 'SettingNumbersChanged':
          commit('game/settingNumbersChanged', event.returnValues, { root: true });
          break;
        case 'NewGameStarted':
          commit('game/newGameStarted', event.returnValues, { root: true });
          break;
        default:
          break;
      }
    })
    .on('error', console.error);
};
export const registerWeb3 = async ({ commit }) => {
  try {
    if (window.ethereum) {
      const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
      await window.ethereum.enable();
      const web3 = new Web3(window.web3.currentProvider);
      const networkID = await web3.eth.net.getId();
      const coinbase = await web3.eth.getCoinbase();
      web3.eth.defaultAccount = coinbase;
      const balance = await web3.eth.getBalance(coinbase);
      const contractBalance = await web3.eth.getBalance(truffleContractInstance.address);
      const currentState = {
        networkID,
        coinbase,
        balance,
        contractBalance,
        isConnected: await web3.eth.net.isListening(),
      };
      commit('registerWeb3Instance', currentState);
    }
  } catch (e) {
    console.log(e);
  }
};
export const pollWeb3 = ({ commit }, payload) => {
  commit('pollWeb3Instance', payload);
};
