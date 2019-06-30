/* eslint-disable import/prefer-default-export */
import { Connect } from 'uport-connect';

export const currentProvider = (state) => {
  if (state.session.provider === 'metamask') {
    return window.web3.currentProvider;
  }
  const uport = new Connect('LuckySeven', {
    network: {
      id: state.session.selectedNetwork.networkID,
      rpcUrl: state.session.selectedNetwork.rpcUrl,
    },
  });
  return uport.getProvider();
};

export default currentProvider;
