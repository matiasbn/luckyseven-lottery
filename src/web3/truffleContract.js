import TruffleContract from 'truffle-contract';
import Lucky7Artifact from '../../build/contracts/Lucky7Store.json';
import Lucky7ArtifactHelper from '../../build/contracts/Lucky7StoreHelper.json';

const truffleContract = (currentProvider) => {
  const artifact = currentProvider.networkVersion === '7' ? Lucky7ArtifactHelper : Lucky7Artifact;
  const truffleContractInstance = TruffleContract(artifact);
  truffleContractInstance.setProvider(currentProvider);
  return truffleContractInstance;
};

export default truffleContract;
