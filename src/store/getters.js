/* eslint-disable max-len */
import orderBy from 'lodash.orderby';
import Web3 from 'web3';
import { NETWORKS } from '@/web3/constants/networks';

const web3 = new Web3(window.web3.currentProvider);

export default {
  randomTicketsSelled: state => state.game.randomTicketsSelled,
  generatedTickets: state => state.game.generatedTickets,
  generatedTicketsSelled: state => state.game.generatedTicketsSelled,
  network: (state) => {
    if (state.web3.networkId > 5777) {
      return 'Local network';
    }
    return NETWORKS[state.web3.networkId];
  },
  account: state => state.web3.coinbase,
  purchaseTicketPrice: state => state.game.purchaseTicketPrice,
  generateTicketPrice: state => state.game.generateTicketPrice,
  lucky7PastGames: state => state.lucky7PastGames,
  lastPurchasedTicket: state => state.player.lastPurchasedTicket,
  lastNumberGenerated1: state => state.player.lastNumberGenerated1,
  lastNumberGenerated2: state => state.player.lastNumberGenerated2,
  lastNumberPurchased1: state => state.player.lastNumberPurchased1,
  lastNumberPurchased2: state => state.player.lastNumberPurchased2,
  lucky7Ticket: state => state.player.lucky7Ticket,
  isLucky7Ticket: state => state.player.isLucky7Ticket,
  ticketReceived: state => state.player.ticketReceived,
  firstNumberReceived: state => state.player.firstNumberReceived,
  secondNumberReceived: state => state.player.secondNumberReceived,
  lucky7GameInfo: (state) => {
    let lucky7GameInfo = state.lucky7GameInfo;
    lucky7GameInfo = orderBy(lucky7GameInfo, 'difference', 'asc');
    let prizeCounter = 0;
    lucky7GameInfo.forEach((row, index) => {
      if (parseInt(row.difference, 10) !== 0) {
        const currentPrize = String((parseFloat(state.web3.contractBalance * 0.7 * (7 - prizeCounter), 10)) / 28);
        lucky7GameInfo[index].prize = `${web3.utils.fromWei(currentPrize, 'ether')} ETH`;
        prizeCounter += 1;
      } else {
        lucky7GameInfo[index].prize = '0 ETH';
      }
    });
    lucky7GameInfo = orderBy(lucky7GameInfo, 'number', 'asc');
    return state.lucky7GameInfo;
  },
};
