/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import has from 'lodash.has';
import muGenerator from '@/helpers/muGenerator';
import checkLucky7Ticket from '@/helpers/checkLucky7Ticket';
import lucky7PrizesInfo from '@/helpers/lucky7PrizesInfo';
import BigNumber from 'bignumber.js';

export default{
  newGameStarted(state, payload) {
    state.game.settings.gameID = payload.gameID;
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
  },
  settingNumbersChanged(state, payload) {
    state.game.settings.storeEnabled = payload.settingLucky7Numbers;
  },
  statsUpdated(state, payload) {
    if (has(payload, 'randomTicketCounter')) {
      state.game.randomTicketsSelled = payload.randomTicketCounter;
    } else if (has(payload, 'generatedTicketCounter')) {
      state.game.generatedTickets = payload.generatedTicketCounter;
    } else {
      state.game.generatedTicketsSelled = payload.selledGeneratedTicketCounter;
    }
  },
  lucky7NumberInserted(state, payload) {
    const { value, index } = payload;
    state.lucky7GameInfo[index].number = value;
  },
  balanceUpdated(state, payload) {
    state.web3.contractBalance = payload;
  },
  recoverPurchasedParameters(state, payload) {
    state.player.purchasedTicket.ticketValue = payload.ticketValue;
    state.player.purchasedTicket.number1 = payload.mu;
    state.player.purchasedTicket.number2 = payload.i;
    state.player.purchasedTicket.ticketID = payload.ticketID;
    state.player.purchasedTicket.gameID = payload.gameID;
    const value = { ticket: state.player.purchasedTicket.ticketValue, grantType: 'recoverPurchased' };
    const { difference, position, lucky7Ticket } = checkLucky7Ticket(state, value);
    state.player.purchasedTicket.lucky7Ticket = lucky7Ticket;
    state.player.purchasedTicket.difference = difference;
    state.player.purchasedTicket.position = position + 1;
  },
  recoverGeneratedParameters(state, payload) {
    state.player.generatedTicket.number1 = payload.mu;
    state.player.generatedTicket.number2 = payload.i;
    state.player.generatedTicket.gameID = payload.gameID;
    const parameters = {
      mu: payload.mu,
      i: payload.i,
      b: state.game.settings.b,
      p: state.game.settings.p,
      n: state.game.settings.n,
      j: state.game.settings.j,
    };
    const generatedTicket = muGenerator(parameters);
    const value = { ticket: generatedTicket, grantType: 'recoverGenerated' };
    const { difference, position, lucky7Ticket } = checkLucky7Ticket(state, value);
    state.player.generatedTicket.ticketValue = generatedTicket;
    state.player.generatedTicket.difference = difference;
    state.player.generatedTicket.position = position + 1;
    state.player.generatedTicket.lucky7Ticket = lucky7Ticket;
  },
  generatedParametersReceived(state, payload) {
    state.player.generatedTicket.number1 = payload.mu;
    state.player.generatedTicket.number2 = payload.i;
    state.player.generatedTicket.received = true;
    state.player.generatedTicket.gameID = payload.gameID;
    const parameters = {
      mu: payload.mu,
      i: payload.i,
      b: state.game.settings.b,
      p: state.game.settings.p,
      n: state.game.settings.n,
      j: state.game.settings.j,
    };
    const generatedTicket = muGenerator(parameters);
    const value = { ticket: generatedTicket, grantType: 'generatedTicket' };
    const { difference, position, lucky7Ticket } = checkLucky7Ticket(state, value);
    state.player.generatedTicket.ticketValue = generatedTicket;
    state.player.generatedTicket.difference = difference;
    state.player.generatedTicket.position = position + 1;
    state.player.generatedTicket.lucky7Ticket = lucky7Ticket;
  },
  newTicketReceived(state, payload) {
    state.player.purchasedTicket.ticketValue = payload.ticketValue;
    state.player.purchasedTicket.number1 = payload.mu;
    state.player.purchasedTicket.number2 = payload.i;
    state.player.purchasedTicket.ticketID = payload.ticketID;
    state.player.purchasedTicket.gameID = payload.gameID;
    state.player.purchasedTicket.received = true;
    state.player.generatedTicket.received = true;
    const value = { ticket: BigNumber(state.player.purchasedTicket.ticketValue) };
    const { difference, position, lucky7Ticket } = checkLucky7Ticket(state, value);
    state.player.purchasedTicket.lucky7Ticket = lucky7Ticket;
    state.player.purchasedTicket.difference = difference;
    state.player.purchasedTicket.position = position + 1;
  },
  newLucky7Ticket(state, payload) {
    const { difference, index, owner, ticketValue } = payload;
    state.lucky7GameInfo[index].difference = difference;
    state.lucky7GameInfo[index].owner = owner;
    state.lucky7GameInfo[index].ticketValue = String(ticketValue);
    if (owner.toUpperCase() === state.web3.coinbase.toUpperCase()) {
      state.player.purchasedTicket.position = Number(index) + 1;
      state.player.purchasedTicket.difference = difference;
      state.player.purchasedTicket.lucky7Ticket = true;
    }
    state.lucky7GameInfo = lucky7PrizesInfo(state);
  },
  registerWeb3Instance(state, payload) {
    const {
      networkId,
      coinbase,
      balance,
      isConnected } = payload;
    state.web3.networkId = networkId;
    state.web3.coinbase = coinbase;
    state.web3.balance = balance;
    state.web3.isConnected = isConnected;
  },
  pollWeb3Instance(state, payload) {
    state.web3.coinbase = payload.coinbase;
    state.web3.balance = payload.balance;
  },
  getGameSettings(state, payload) {
    const {
      lucky7Numbers, lucky7Tickets, generateTicketPrice, purchaseTicketPrice, b, n, p, j, settingLucky7Numbers, gameID, contractBalance,
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
    state.web3.contractBalance = contractBalance;
    state.lucky7GameInfo = lucky7PrizesInfo(state);
    state.lucky7GameInfoReady = true;
    state.game.prices.generate = generateTicketPrice;
    state.game.prices.purchase = purchaseTicketPrice;
    state.game.settings.b = b;
    state.game.settings.n = n;
    state.game.settings.p = p;
    state.game.settings.j = j;
    state.game.settings.storeEnabled = settingLucky7Numbers;
    state.game.settings.gameID = gameID;
  },
};
