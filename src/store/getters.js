/* eslint-disable max-len */
import { NETWORKS } from '@/web3/constants/networks';

export default {
  network: (state) => {
    if (state.web3.networkId > 5777) {
      return 'Local network';
    }
    return NETWORKS[state.web3.networkId];
  },

};
