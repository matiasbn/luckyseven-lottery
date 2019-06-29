/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import muGenerator from '@/helpers/muGenerator';
import checkLucky7Ticket from '@/helpers/checkLucky7Ticket';
import BigNumber from 'bignumber.js';

export const uportLogin = (state, payload) => {
  state.session.credentials = payload;
  state.session.provider = 'uport';
  state.session.isLoggedIn = true;
};

export const uportLogout = (state) => {
  state.session.credentials = null;
  state.session.provider = '';
  state.session.isLoggedIn = false;
};

export const selectNetwork = (state, payload) => {
  state.session.selectedNetwork.networkID = payload.id;
  state.session.selectedNetwork.rpcUrl = payload.rpcUrl;
};
export const recoverPurchasedParameters = (state, payload) => {
  state.purchasedTicket.ticketValue = payload.ticketValue;
  state.purchasedTicket.number1 = payload.mu;
  state.purchasedTicket.number2 = payload.i;
  state.purchasedTicket.ticketID = payload.ticketID;
  state.purchasedTicket.gameID = payload.gameID;
  const value = { ticket: state.purchasedTicket.ticketValue, grantType: 'recoverPurchased' };
  const { difference, position, lucky7Ticket } = checkLucky7Ticket(payload.lucky7GameInfo, value);
  state.purchasedTicket.lucky7Ticket = lucky7Ticket;
  state.purchasedTicket.difference = difference;
  state.purchasedTicket.position = position + 1;
};
export const recoverGeneratedParameters = (state, payload) => {
  state.generatedTicket.number1 = payload.mu;
  state.generatedTicket.number2 = payload.i;
  state.generatedTicket.gameID = payload.gameID;
  const parameters = {
    mu: payload.mu,
    i: payload.i,
    b: payload.b,
    p: payload.p,
    n: payload.n,
    j: payload.j,
  };
  const generatedTicket = muGenerator(parameters);
  const value = { ticket: generatedTicket, grantType: 'recoverGenerated' };
  const { difference, position, lucky7Ticket } = checkLucky7Ticket(payload.lucky7GameInfo, value);
  state.generatedTicket.ticketValue = generatedTicket;
  state.generatedTicket.difference = difference;
  state.generatedTicket.position = position + 1;
  state.generatedTicket.lucky7Ticket = lucky7Ticket;
};
export const generatedParametersReceived = (state, payload) => {
  const { returnValues, rootState } = payload;
  state.generatedTicket.number1 = returnValues.mu;
  state.generatedTicket.number2 = returnValues.i;
  state.generatedTicket.received = true;
  state.generatedTicket.gameID = returnValues.gameID;
  const parameters = {
    mu: returnValues.mu,
    i: returnValues.i,
    b: rootState.game.settings.b,
    p: rootState.game.settings.p,
    n: rootState.game.settings.n,
    j: rootState.game.settings.j,
  };
  const generatedTicket = muGenerator(parameters);
  const value = { ticket: generatedTicket, grantType: 'generatedTicket' };
  const { difference, position, lucky7Ticket } = checkLucky7Ticket(rootState.game.lucky7GameInfo, value);
  state.generatedTicket.ticketValue = generatedTicket;
  state.generatedTicket.difference = difference;
  state.generatedTicket.position = position + 1;
  state.generatedTicket.lucky7Ticket = lucky7Ticket;
};
export const newTicketReceived = (state, payload) => {
  const { returnValues, rootState } = payload;
  state.purchasedTicket.ticketValue = returnValues.ticketValue;
  state.purchasedTicket.number1 = returnValues.mu;
  state.purchasedTicket.number2 = returnValues.i;
  state.purchasedTicket.ticketID = returnValues.ticketID;
  state.purchasedTicket.gameID = returnValues.gameID;
  state.purchasedTicket.received = true;
  state.generatedTicket.received = true;
  const value = { ticket: BigNumber(state.purchasedTicket.ticketValue), grantType: 'newTicketReceived' };
  const { difference, position, lucky7Ticket } = checkLucky7Ticket(rootState.game.lucky7GameInfo, value);
  state.purchasedTicket.lucky7Ticket = lucky7Ticket;
  state.purchasedTicket.difference = difference;
  state.purchasedTicket.position = position + 1;
};
