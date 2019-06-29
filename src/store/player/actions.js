/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */

import { Connect } from 'uport-connect';
import Web3 from 'web3';

// export const metamaskLogin = async ({ commit }) => {
//   const result = await getWeb3();
//   console.log(result);
//   commit('registerWeb3Instance', result);
// };

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
