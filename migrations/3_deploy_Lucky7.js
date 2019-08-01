/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const Lucky7Store = artifacts.require('Lucky7Store');
const Lucky7StoreHelper = artifacts.require('Lucky7StoreHelper');
const Lucky7Library = artifacts.require('Lucky7Library');
const Lighthouse = artifacts.require('Lighthouse');

module.exports = function (deployer, network) {
  deployer.deploy(Lucky7Library);
  deployer.link(Lucky7Library, Lucky7Store);
  deployer.link(Lucky7Library, Lucky7StoreHelper);

  if (network === 'rinkeby') {
    var lighthouseAddress = '0x613D2159db9ca2fBB15670286900aD6c1C79cC9a';
    deployer.deploy(Lucky7Store, lighthouseAddress, true, false, { // true = rhombus available on network
      value: web3.utils.toWei('0', 'ether'),
    });
  } else if (network === 'development') {
    deployer.deploy(Lighthouse).then(function () {
      return deployer.deploy(Lucky7StoreHelper, Lighthouse.address, false, true, {
        value: web3.utils.toWei('1', 'ether'),
      });
    })
  } else {
    deployer.deploy(Lighthouse).then(function () {
      return deployer.deploy(Lucky7Store, Lighthouse.address, false, false, {
        value: web3.utils.toWei('0', 'ether'),
      });
    })
  }

};
