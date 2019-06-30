/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import { NETWORKS } from '@/web3/constants/networks';

export const network = (state) => {
  if (state.networkID > 5777) {
    return 'Local network';
  }
  return NETWORKS[state.networkID];
};

