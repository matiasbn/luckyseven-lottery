/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */

import { Connect } from 'uport-connect';
import Web3 from 'web3';
import truffleContract from '@/web3/truffleContract';
import Lucky7Store from '../../../build/contracts/Lucky7Store.json';

const mnid = require('mnid');

export const metamaskLogin = ({ commit, dispatch }) => new Promise(async (resolve, reject) => {
  try {
    const currentState = {
      coinbase: null,
      balance: null,
      contractAddress: null,
      contractBalance: null,
      networkID: null,
      isConnected: null,
      sessionProvider: null,
    };
    if (window.ethereum !== null) {
      const truffleContractInstance = await truffleContract(window.ethereum).deployed();
      const web3 = new Web3(window.ethereum);
      currentState.coinbase = (await window.ethereum.enable())[0];
      currentState.networkID = window.ethereum.networkVersion;
      currentState.balance = await web3.eth.getBalance(currentState.coinbase);
      currentState.contractAddress = truffleContractInstance.address;
      currentState.contractBalance = await web3.eth.getBalance(truffleContractInstance.address);
      currentState.isConnected = await web3.eth.net.isListening();
      currentState.sessionProvider = 'metamask';
      commit('metamaskLogin');
      commit('web3/registerWeb3Instance', currentState, { root: true });
      dispatch('game/getGameSettings', null, { root: true });
      dispatch('web3/listenEvents', null, { root: true });
      resolve();
    } else if (window.web3 !== null) {
      const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
      const web3 = new Web3(window.web3.currentProvider);
      currentState.networkID = await web3.eth.net.getId();
      currentState.coinbase = await web3.eth.getCoinbase();
      currentState.balance = await web3.eth.getBalance(currentState.coinbase);
      currentState.contractBalance = await web3.eth.getBalance(truffleContractInstance.address);
      currentState.isConnected = await web3.eth.net.isListening();
      commit('web3/registerWeb3Instance', currentState, { root: true });
      dispatch('game/getGameSettings', null, { root: true });
      dispatch('web3/listenEvents', null, { root: true });
      resolve();
    } else {
      // MetaMask not installed
      reject();
    }
  } catch (e) {
    reject(e);
  }
});

export const uportLogin = async ({ commit, state, dispatch }) => {
  try {
    const uport = new Connect('LuckySevenLottery', {
      network: {
        id: state.session.selectedNetwork.networkID,
        rpcUrl: state.session.selectedNetwork.rpcUrl,
      },
    });
    uport.loadState();
    if (uport.state && uport.did) {
      const web3 = new Web3(state.session.selectedNetwork.rpcUrl);
      const networkID = parseInt(state.session.selectedNetwork.networkID, 16);
      const coinbase = web3.utils.toChecksumAddress(uport.state.address);
      const currentState = {
        coinbase,
        balance: await web3.eth.getBalance(coinbase),
        networkID: await web3.eth.net.getId(),
        contractAddress: Lucky7Store.networks[`${networkID}`].address,
        contractBalance: await web3.eth.getBalance(Lucky7Store.networks[`${networkID}`].address),
        isConnected: await web3.eth.net.isListening(),
        sessionProvider: 'uport',
      };
      commit('uportLogin', {
        web3Provider: web3.currentProvider,
        uportProvider: uport.getProvider(),
      });
      commit('web3/registerWeb3Instance', currentState, { root: true });
    } else {
      uport.requestDisclosure(
        {
          rpc: state.session.selectedNetwork.rpcUrl,
          notifications: true,
        },
      );
      const response = await uport.onResponse('disclosureReq');
      const uportProvider = await uport.getProvider();
      const uportWeb3 = new Web3(uportProvider);
      // const coun
      // const coinbase = (mnid.decode(response.payload.mnid)).address;
      const coinbase = await uportWeb3.eth.getCoinbase();
      const web3 = new Web3(state.session.selectedNetwork.rpcUrl);
      const networkID = parseInt(state.session.selectedNetwork.networkID, 16);
      const currentState = {
        coinbase,
        balance: await web3.eth.getBalance(coinbase),
        networkID: await web3.eth.net.getId(),
        contractAddress: Lucky7Store.networks[`${networkID}`].address,
        contractBalance: await web3.eth.getBalance(Lucky7Store.networks[`${networkID}`].address),
        isConnected: await web3.eth.net.isListening(),
        sessionProvider: 'uport',
      };
      commit('web3/registerWeb3Instance', currentState, { root: true });
      commit('uportLogin', {
        web3Provider: web3.currentProvider,
        uportProvider,
        uportInstance: uport,
      });
      // const networkID = parseInt(state.session.selectedNetwork.networkID, 16);
      // const contract = uport.contract(Lucky7Store.abi).at(Lucky7Store.networks[`${networkID}`].address);
      // console.log(web3.utils.toWei('0.02'));
      // contract.generateRandomTicket({
      //   from: coinbase,
      //   to: Lucky7Store.networks[`${networkID}`].address,
      //   value: web3.utils.toWei('0.02'),
      //   gas: 7000000,
      // }, 'generateTicket');
      // const transaction = await uport.onResponse('generateTicket');
      // console.log(transaction);
      // const truffleContractInstance = await truffleContract(uportProvider).deployed();
      // const cosa = await truffleContractInstance.generateRandomTicket({
      //   from: coinbase,
      //   to: Lucky7Store.networks['7'].address,
      //   value: 1 * 1.0e18,
      //   // value: rootState.game.prices.generate,
      // });
      // console.log(cosa);
      // commit('web3/registerWeb3Instance', currentState, { root: true });
    }
    dispatch('game/getGameSettings', null, { root: true });
    dispatch('web3/listenEvents', null, { root: true });
  } catch (e) {
    console.log(e);
    throw Error(e.message);
  }
};

export const uportLogout = ({ commit }) => {
  const uport = new Connect('LuckySeven');
  uport.logout();
  commit('uportLogout');
};
