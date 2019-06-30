/* eslint-disable import/prefer-default-export */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default */

import truffleContract from '@/web3/truffleContract';
import currentProvider from '@/store/player/getters';


export const getGameSettings = async ({ commit, rootState }) => {
  const truffleContractInstance = await truffleContract(currentProvider(rootState.player)).deployed();
  const valuesPromises = [
    truffleContractInstance.getPastEvents('GameParameters', { fromBlock: 0 }),
    truffleContractInstance.settingLucky7Numbers(),
    truffleContractInstance.gameID(),
  ];
  const values = await Promise.all(valuesPromises);
  const gameParameters = values[0]['0'].returnValues;
  const settingLucky7Numbers = values[1];
  const gameID = values[2];
  const contractBalance = values[3];
  const b = gameParameters.b;
  const n = gameParameters.n;
  const p = gameParameters.p;
  const j = gameParameters.j;
  const numberOfLucky7Numbers = parseInt(gameParameters.numberOfLucky7Numbers, 10);
  const purchaseTicketPrice = gameParameters.purchaseTicketPrice;
  const generateTicketPrice = gameParameters.generateTicketPrice;
  const lucky7NumbersPromises = [];
  const lucky7TicketsValuePromises = [];
  const lucky7TicketsOwnerPromises = [];
  const lucky7TicketsDiffPromises = [];
  for (let i = 0; i < numberOfLucky7Numbers; i += 1) {
    lucky7NumbersPromises.push(truffleContractInstance.lucky7NumbersArray(i));
    lucky7TicketsValuePromises.push(truffleContractInstance.lucky7TicketValue(i));
    lucky7TicketsOwnerPromises.push(truffleContractInstance.lucky7TicketOwner(i));
    lucky7TicketsDiffPromises.push(truffleContractInstance.lucky7TicketDifference(i));
  }
  const lucky7NumbersValues = await Promise.all(lucky7NumbersPromises);
  const lucky7TicketsValues = await Promise.all(lucky7TicketsValuePromises);
  const lucky7TicketsOwners = await Promise.all(lucky7TicketsOwnerPromises);
  const lucky7TicketsDiffs = await Promise.all(lucky7TicketsDiffPromises);
  const lucky7Numbers = [];
  const lucky7Tickets = [];
  for (let i = 0; i < numberOfLucky7Numbers; i += 1) {
    lucky7Numbers[i] = parseInt(lucky7NumbersValues[i].ticketValue, 10);
    lucky7Tickets[i] = {
      ticket: parseInt(lucky7TicketsValues[i], 10),
      owner: lucky7TicketsOwners[i],
      difference: parseInt(lucky7TicketsDiffs[i], 10),
    };
  }

  const payload = {
    lucky7Numbers,
    lucky7Tickets,
    generateTicketPrice,
    purchaseTicketPrice,
    b,
    n,
    p,
    j,
    settingLucky7Numbers,
    gameID,
    contractBalance,
    rootState,
  };

  commit('getGameSettings', payload);
};
