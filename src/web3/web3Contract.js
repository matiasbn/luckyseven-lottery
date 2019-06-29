import Web3 from 'web3';
import Lucky7Artifact from '../../build/contracts/Lucky7Store.json';

const web3 = new Web3();

const web3Contract = async (currentProvider) => {
  const abi = Lucky7Artifact.abi;
  const networkID = await web3.eth.net.getId();
  const address = networkID.address;
  const web3Instance = new Web3(currentProvider);
  const contractInstance = web3Instance.eth.Contract(abi, address);
  return contractInstance;
};

export default web3Contract;
