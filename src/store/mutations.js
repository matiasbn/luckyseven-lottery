/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import Web3 from 'web3';
import has from 'lodash.has';

const web3 = new Web3();

export default{
  settingNumbersChanged(state, payload) {
    state.game.settingLucky7Numbers = payload.settingLucky7Numbers;
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
  updatePastGames(state, payload) {
    payload.forEach((ticket, index) => {
      const pastTicket = {
        lucky7Number: parseInt(ticket.lucky7Number, 10),
        ticketValue: parseInt(ticket.ticketValue, 10),
        difference: parseInt(ticket.difference, 10),
        owner: ticket.owner,
        prize: `${web3.utils.fromWei(ticket.prize, 'ether')} ETH`,
        gameID: parseInt(ticket.gameID, 10),
      };
      state.lucky7PastGames[index] = pastTicket;
    });
  },
  balanceUpdated(state, payload) {
    state.web3.contractBalance = payload;
  },
  askForValues(state, payload) {
    switch (payload) {
      case 'generateTicket':
        state.player.firstGenerateNumberReceived = false;
        state.player.secondGenerateNumberReceived = false;
        break;
      case 'purchaseRandomTicket':
        state.player.purchasedTicketReceived = false;
        state.player.firstPurchaseNumberReceived = false;
        state.player.secondPurchaseNumberReceived = false;
        break;
      case 'purchaseGeneratedTicket':
        state.player.generatedTicketReceived = false;
        break;
      default:
        break;
    }
  },
  parameterReceived(state, payload) {
    const { type, value } = payload;
    switch (type) {
      case 'mu':
        state.player.lastNumberPurchased1 = state.player.purchasedTicketReceived ? state.player.lastNumberPurchased1 : value;
        state.player.lastNumberGenerated1 = state.player.generatedTicketReceived ? state.player.lastNumberGenerated1 : value;
        state.player.firstGenerateNumberReceived = true;
        state.player.firstPurchaseNumberReceived = true;
        state.player.generatedTicketReceived = state.player.secondGenerateNumberReceived;
        break;
      case 'i':
        state.player.lastNumberPurchased2 = state.player.purchasedTicketReceived ? state.player.lastNumberPurchased2 : value;
        state.player.lastNumberGenerated2 = state.player.generatedTicketReceived ? state.player.lastNumberGenerated2 : value;
        state.player.secondGenerateNumberReceived = true;
        state.player.secondPurchaseNumberReceived = true;
        state.player.generatedTicketReceived = state.player.firstGenerateNumberReceived;
        break;
      case 'ticket':
        state.player.lastPurchasedTicket = value;
        state.player.purchasedTicketReceived = true;
        break;
      default:
        break;
    }
  },
  newLucky7Ticket(state, payload) {
    const { difference, index, _owner, ticketValue } = payload;
    state.lucky7GameInfo[index].difference = difference;
    state.lucky7GameInfo[index].owner = _owner;
    state.lucky7GameInfo[index].ticket = ticketValue;
    if (_owner.toUpperCase() === state.web3.coinbase.toUpperCase()) {
      state.player.isLucky7Ticket = true;
    }
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
  retrieveGameInfoInstance(state, payload) {
    const {
      lucky7Numbers,
      lucky7Tickets,
      generateTicketPrice,
      sellTicketPrice,
      userValues,
      currentPrize,
      prizeGameID,
      contractAddress,
      contractBalance,
      userTicketsCounter,
      lastPurchasedTicketID,
      lastPurchasedTicket,
      b,
      n,
      p,
      j,
      settingLucky7Numbers,
    } = payload;
    lucky7Tickets.forEach((lucky7Ticket, index) => {
      const row = {
        prize: lucky7Ticket.prize,
        ticket: lucky7Ticket.ticket,
        owner: lucky7Ticket.owner,
        difference: lucky7Ticket.difference,
        number: lucky7Numbers[index],
      };
      state.lucky7GameInfo.push(row);
    });
    state.game.generateTicketPrice = generateTicketPrice;
    state.game.purchaseTicketPrice = sellTicketPrice;
    state.game.b = b;
    state.game.n = n;
    state.game.p = p;
    state.game.j = j;
    state.game.settingLucky7Numbers = settingLucky7Numbers;
    state.player.lastPurchasedTicketID = lastPurchasedTicketID;
    state.player.lastPurchasedTicket = lastPurchasedTicket.ticketValue || '0';
    state.player.lastNumberPurchased1 = lastPurchasedTicket.mu || '0';
    state.player.lastNumberPurchased2 = lastPurchasedTicket.i || '0';
    state.player.lastNumberGenerated1 = userValues.mu || '0';
    state.player.lastNumberGenerated2 = userValues.i || '0';
    state.player.currentPrize = currentPrize;
    state.player.prizeGameID = prizeGameID;
    state.player.userTicketsCounter = userTicketsCounter;
    state.web3.contractAddress = contractAddress;
    state.web3.contractBalance = contractBalance;
  },
};
