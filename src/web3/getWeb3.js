/* eslint-disable no-param-reassign */
import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);

const getWeb3 = new Promise(async (resolve, reject) => {
  try {
    const networkId = await web3.eth.net.getId();
    const coinbase = await web3.eth.getCoinbase();
    const balance = await web3.eth.getBalance(coinbase);
    const currentState = {
      networkId,
      coinbase,
      balance,
      isConnected: await web3.eth.net.isListening(),
    };
    resolve(currentState);
  } catch (e) {
    console.log(e);
    reject(e);
  }
});

export default getWeb3;
