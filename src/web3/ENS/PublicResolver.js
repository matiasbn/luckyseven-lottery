import TruffleContract from 'truffle-contract';
import PublicResolverArtifact from '../../../build/contracts/PublicResolver.json';

const PublicResolver = (currentProvider) => {
  const PublicResolverInstance = TruffleContract(PublicResolverArtifact);
  PublicResolverInstance.setProvider(currentProvider);
  return PublicResolverInstance;
};

export default PublicResolver;
