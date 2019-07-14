/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default */

import truffleContract from '@/web3/truffleContract';
import currentProvider from '@/store/player/getters';
import Web3 from 'web3';

export const listenEvents = async ({ commit, state, rootState }) => {
  const truffleContractInstance = await truffleContract(currentProvider(rootState.player)).deployed();
  // To avoid double events where important, it stores the transaction hashes and checks if it is repeated
  const eventsTransactionHash = {
    newTicketReceived: null,
  };
  // Player events
  truffleContractInstance
    .allEvents({ /* filter: { owner: state.coinbase }, */ fromBlock: 'latest' })
    .on('data', (event) => {
      console.log(event);
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
