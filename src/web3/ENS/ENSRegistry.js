import TruffleContract from 'truffle-contract';
import ENSRegistryArtifact from '../../../build/contracts/ENSRegistry.json';

const ENSRegistry = (currentProvider) => {
  const ensRegistryInstance = TruffleContract(ENSRegistryArtifact);
  ensRegistryInstance.setProvider(currentProvider);
  return ensRegistryInstance;
};

export default ENSRegistry;
