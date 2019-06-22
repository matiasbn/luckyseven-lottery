import Web3 from 'web3';
import { store } from '../store/index';

const web3 = new Web3(window.web3.currentProvider);

const pollWeb3 = () => {
  setInterval(async () => {
    try {
      if (web3 && store.state.web3.isConnected) {
        const { coinbase, balance } = store.state.web3;
        const web3Coinbase = await web3.eth.getCoinbase();
        const web3Balance = await web3.eth.getBalance(web3Coinbase);
        if (web3Coinbase !== coinbase || web3Balance !== balance) {
          store.dispatch('pollWeb3', {
            coinbase: web3Coinbase,
            balance: web3Balance,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, 2000);
};

export default pollWeb3;
