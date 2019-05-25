import Web3 from 'web3';
import util from 'util';
import { store } from '../store/store';

const web3 = new Web3(window.web3.currentProvider);

const getAsyncBalance = util.promisify(web3.eth.getBalance);
const getAsyncCoinbase = util.promisify(web3.eth.getCoinbase);

const pollWeb3 = () => {
  setInterval(async () => {
    try {
      if (web3 && store.state.web3.isConnected) {
        const { coinbase, balance } = store.state.web3;
        const web3Coinbase = await getAsyncCoinbase();
        const web3Balance = parseInt(await getAsyncBalance(web3.eth.coinbase), 10);
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
  }, 500);
};

export default pollWeb3;
