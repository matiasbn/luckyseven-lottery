/* eslint-disable no-undef */
/* eslint-disable func-names */
const Migrations = artifacts.require('../contracts/Migrations.sol');

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
