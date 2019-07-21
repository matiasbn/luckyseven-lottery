import TruffleContract from 'truffle-contract';
import FIFSRegistrarArtifact from '../../../build/contracts/FIFSRegistrar.json';

const FIFSRegistrar = (currentProvider) => {
  const FIFSRegistrarInstance = TruffleContract(FIFSRegistrarArtifact);
  FIFSRegistrarInstance.setProvider(currentProvider);
  return FIFSRegistrarInstance;
};

export default FIFSRegistrar;
