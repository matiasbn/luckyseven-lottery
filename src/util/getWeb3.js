/* eslint-disable no-param-reassign */
import Web3 from 'web3';
import util from 'util';

const web3 = new Web3(window.web3.currentProvider);
const getAsyncBalance = util.promisify(web3.eth.getBalance);
const getAsyncCoinbase = util.promisify(web3.eth.getCoinbase);

const getWeb3 = new Promise(async (resolve, reject) => {
  try {
    const networkId = web3.version.network;
    const coinbase = await getAsyncCoinbase();
    const balance = parseInt(await getAsyncBalance(coinbase), 10);
    const currentState = {
      networkId,
      coinbase,
      balance,
      isConnected: web3.isConnected(),
    };
    resolve(currentState);
  } catch (e) {
    console.log(e);
    reject(e);
  }
});

export default getWeb3;
