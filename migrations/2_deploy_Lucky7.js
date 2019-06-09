/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const Lucky7Store = artifacts.require('Lucky7Store');

// const owner = web3.eth.accounts[0]

module.exports = function (deployer) {
  deployer.deploy(Lucky7Store, {
    value: web3.toWei(1, 'ether'),
  });
};
