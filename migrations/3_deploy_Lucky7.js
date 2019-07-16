/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const Lucky7Store = artifacts.require('Lucky7Store');
const Lucky7Library = artifacts.require('Lucky7Library');
const Lighthouse = artifacts.require('Lighthouse');

module.exports = function (deployer, network) {
  deployer.deploy(Lucky7Library);
  deployer.link(Lucky7Library, Lucky7Store);

  if (network === 'rinkeby') {

    var lighthouseAddress = '0x613D2159db9ca2fBB15670286900aD6c1C79cC9a';

    deployer.deploy(Lucky7Store, lighthouseAddress, false, {
      value: web3.utils.toWei('1', 'ether'),
    });
    
  } else {

    deployer.deploy(Lighthouse).then(function () {
      return deployer.deploy(Lucky7Store, Lighthouse.address, true, {
        value: web3.utils.toWei('1', 'ether'),
      });
    })

  }
};
