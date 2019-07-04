const ENS = artifacts.require("@ensdomains/ens/ENSRegistry");
const PublicResolver = artifacts.require("@ensdomains/resolver/PublicResolver");

module.exports = function(deployer, network, accounts) {
  // Registry
  deployer.deploy(ENS)
  // Resolver
  .then(function(ensInstance) {
    return deployer.deploy(PublicResolver, ensInstance.address);
  })
};