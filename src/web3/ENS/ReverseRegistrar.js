import TruffleContract from 'truffle-contract';
import ReverseRegistrarArtifact from '../../../build/contracts/ReverseRegistrar.json';

const ReverseRegistrar = (currentProvider) => {
  const ReverseRegistrarInstance = TruffleContract(ReverseRegistrarArtifact);
  ReverseRegistrarInstance.setProvider(currentProvider);
  return ReverseRegistrarInstance;
};

export default ReverseRegistrar;
