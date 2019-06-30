/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import has from 'lodash.has';
import lucky7PrizesInfo from '@/helpers/lucky7PrizesInfo';

export const newGameStarted = (state, payload) => {
  state.settings.gameID = payload.gameID;
  for (let i = 0; i < 7; i += 1) {
    const row = {
      prize: '0',
      ticket: '0',
      owner: '0x0000000000000000000000000000000000000000',
      difference: '0',
      number: '0',
      position: i + 1,
    };
    state.lucky7GameInfo[i] = row;
  }
};
export const settingNumbersChanged = (state, payload) => {
  state.settings.storeEnabled = payload.settingLucky7Numbers;
};
export const statsUpdated = (state, payload) => {
  if (has(payload, 'randomTicketCounter')) {
    state.randomTicketsSelled = payload.randomTicketCounter;
  } else if (has(payload, 'generatedTicketCounter')) {
    state.generatedTickets = payload.generatedTicketCounter;
  } else {
    state.generatedTicketsSelled = payload.selledGeneratedTicketCounter;
  }
};
export const lucky7NumberInserted = (state, payload) => {
  const { value, index } = payload;
  state.lucky7GameInfo[index].number = value;
};
export const newLucky7Ticket = (state, payload) => {
  const { returnValues, rootState } = payload;
  const { difference, index, owner, ticketValue } = returnValues;
  state.lucky7GameInfo[index].difference = difference;
  state.lucky7GameInfo[index].owner = owner;
  state.lucky7GameInfo[index].ticketValue = String(ticketValue);
  state.lucky7GameInfo = lucky7PrizesInfo(rootState.game.lucky7GameInfo, rootState.web3.contractBalance);
};
export const getGameSettings = (state, payload) => {
  const {
    lucky7Numbers, lucky7Tickets, generateTicketPrice, purchaseTicketPrice, b, n, p, j, settingLucky7Numbers, gameID, rootState,
  } = payload;
  lucky7Tickets.forEach((lucky7Ticket, index) => {
    const row = {
      prize: lucky7Ticket.prize,
      ticketValue: String(lucky7Ticket.ticket),
      owner: lucky7Ticket.owner,
      difference: lucky7Ticket.difference,
      number: lucky7Numbers[index],
      position: index + 1,
    };
    state.lucky7GameInfo[index] = row;
  });
  state.lucky7GameInfo = lucky7PrizesInfo(state.lucky7GameInfo, rootState.web3.contractBalance);
  state.lucky7GameInfoReady = true;
  state.prices.generate = generateTicketPrice;
  state.prices.purchase = purchaseTicketPrice;
  state.settings.b = b;
  state.settings.n = n;
  state.settings.p = p;
  state.settings.j = j;
  state.settings.storeEnabled = settingLucky7Numbers;
  state.settings.gameID = gameID;
};

export const updateTicketStats = (state, payload) => {
  state.stats.randomTickets = payload.randomTicketsCounter;
  state.stats.generatedTickets = payload.generatedTicketsCounter;
  state.stats.generatedTicketsSelled = payload.generatedTicketsSelledCounter;
};

