/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */

import { Connect } from 'uport-connect';
import Web3 from 'web3';
import truffleContract from '@/web3/truffleContract';

export const metamaskLogin = ({ commit }) => new Promise(async (resolve, reject) => {
  try {
    const currentState = {
      coinbase: null,
      balance: null,
      contractAddress: null,
      contractBalance: null,
      networkID: null,
      currentProvider: null,
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
      currentState.currentProvider = window.ethereum;
      currentState.isConnected = web3.eth.net.isListening();
      currentState.sessionProvider = 'metamask';
      commit('metamaskLogin');
      commit('web3/registerWeb3Instance', currentState, { root: true });
      resolve();
    } else if (window.web3 !== null) {
      const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
      const web3 = new Web3(window.web3.currentProvider);
      currentState.networkID = await web3.eth.net.getId();
      currentState.coinbase = await web3.eth.getCoinbase();
      currentState.currentProvider = window.web3.currentProvider;
      currentState.balance = await web3.eth.getBalance(currentState.coinbase);
      currentState.contractBalance = await web3.eth.getBalance(truffleContractInstance.address);
      currentState.isConnected = web3.eth.net.isListening();
      commit('web3/registerWeb3Instance', currentState, { root: true });
      resolve();
    } else {
      // MetaMask not installed
      reject();
    }
  } catch (e) {
    reject(e);
  }
});

export const uportLogin = async ({ commit, state }) => {
  try {
    const uport = new Connect('LuckySeven', {
      network: {
        id: state.session.selectedNetwork.networkID,
        rpcUrl: state.session.selectedNetwork.rpcUrl,
      },
    });
    uport.logout();
    uport.loadState();
    if (uport.state && uport.did) {
      commit('uportLogin', uport.state);
    } else {
      uport.requestDisclosure(
        {
          requested: ['name'],
          network: {
            id: state.session.selectedNetwork.networkID,
            rpcUrl: state.session.selectedNetwork.rpcUrl,
          },
          notifications: true,
        },
        'disclosureReq',
      );
      // window.web3.currentProvider
      // window.web3.currentProvider
      const data = await uport.onResponse('disclosureReq');
      console.log(data);
      const uportProvider = uport.getProvider();
      commit('web3/registerProvider', uportProvider, { root: true });
      console.log(uportProvider);
      const w3test = new Web3(uportProvider);
      const addressTest = w3test.eth.getCoinbase();
      console.log(await addressTest);
      commit('uportLogin', data.payload);
    }
  } catch (e) {
    console.log(e);
    throw Error(e.message);
  }
};

export const uporLogout = ({ commit }) => {
  const uport = new Connect('LuckySeven');
  uport.logout();
  commit('uportLogoout');
};
