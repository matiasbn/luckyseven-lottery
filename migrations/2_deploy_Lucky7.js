/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const Lucky7Admin = artifacts.require('Lucky7Admin');
const Lucky7TicketFactory = artifacts.require('Lucky7TicketFactory');
const Lucky7Storage = artifacts.require('Lucky7Storage');
const Lucky7Library = artifacts.require('Lucky7Library');
const Lucky7Store = artifacts.require('Lucky7Store');
// var Lucky7Ballot= artifacts.require("Lucky7Ballot");

// Contract addresses
let Lucky7AdminAddress;
let Lucky7StorageAddress;

module.exports = function (deployer) {
  deployer.deploy(Lucky7Library);
  deployer.link(Lucky7Library, Lucky7TicketFactory);
  deployer.link(Lucky7Library, Lucky7Store);
  deployer.deploy(Lucky7Storage)
    .then(() => deployer.deploy(Lucky7Admin))
    .then(() => deployer.deploy(Lucky7TicketFactory, Lucky7Admin.address, Lucky7Storage.address, {
      value: web3.toWei(1, 'ether'),
    }))
    .then(() => deployer.deploy(Lucky7Store, Lucky7Admin.address, Lucky7Storage.address, Lucky7TicketFactory.address, {
      value: web3.toWei(1, 'ether'),
    }));
};
