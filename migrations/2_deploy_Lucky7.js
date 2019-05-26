/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const Lucky7Admin = artifacts.require('Lucky7Admin');
const Lucky7TicketFactory = artifacts.require('Lucky7TicketFactory');
const Lucky7Ballot = artifacts.require('Lucky7Ballot');
const Lucky7Store = artifacts.require('Lucky7Store');
const Lucky7FrontEndFunctions = artifacts.require('Lucky7FrontEndFunctions');

// const owner = web3.eth.accounts[0]

module.exports = function (deployer) {
  deployer.deploy(Lucky7FrontEndFunctions, {
    value: web3.toWei(1, 'ether'),
  });
};
