/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const Lucky7Store = artifacts.require('Lucky7Store');


module.exports = function (deployer) {
  deployer.deploy(Lucky7Store, {
    value: web3.utils.toWei('1', 'ether'),
  });
};
