import TruffleContract from 'truffle-contract';
import Lucky7Artifact from '../../build/contracts/Lucky7Store.json';

const truffleContract = (currentProvider) => {
  const truffleContractInstance = TruffleContract(Lucky7Artifact);
  truffleContractInstance.setProvider(currentProvider);
  return truffleContractInstance;
};

export default truffleContract;
