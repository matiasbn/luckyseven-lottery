/* eslint-disable max-len */
import orderBy from 'lodash.orderby';
import Web3 from 'web3';
import { NETWORKS } from '@/web3/constants/networks';
import BigNumber from 'bignumber.js';

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
  b: state => state.game.b,
  n: state => state.game.n,
  p: state => state.game.p,
  j: state => state.game.j,
  gameID: state => state.game.gameID,
  purchaseTicketPrice: state => state.game.purchaseTicketPrice,
  settingLucky7Numbers: state => state.game.settingLucky7Numbers,
  generateTicketPrice: state => state.game.generateTicketPrice,
  lastTicketGameID: state => state.player.lastTicketGameID,
  lucky7PastGames: state => state.lucky7PastGames,
  lastPurchasedTicket: state => state.player.lastPurchasedTicket,
  lastNumberGenerated1: state => state.player.lastNumberGenerated1,
  lastNumberGenerated2: state => state.player.lastNumberGenerated2,
  lastNumberPurchased1: state => state.player.lastNumberPurchased1,
  lastNumberPurchased2: state => state.player.lastNumberPurchased2,
  lucky7Ticket: state => state.player.lucky7Ticket,
  isLucky7Ticket: state => state.player.isLucky7Ticket,
  purchasedTicketReceived: state => state.player.purchasedTicketReceived,
  generatedTicketReceived: state => state.player.generatedTicketReceived,
  firstGenerateNumberReceived: state => state.player.firstGenerateNumberReceived,
  secondGenerateNumberReceived: state => state.player.secondGenerateNumberReceived,
  firstPurchaseNumberReceived: state => state.player.firstPurchaseNumberReceived,
  secondPurchaseNumberReceived: state => state.player.secondPurchaseNumberReceived,
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
  lastGeneratedTicket: (state) => {
    const mu = BigNumber(state.player.lastNumberGenerated1);
    const i = BigNumber(state.player.lastNumberGenerated2);
    const b = BigNumber(state.game.b);
    const n = BigNumber(state.game.n);
    const p = BigNumber(state.game.p);
    const j = BigNumber(state.game.j);
    const ten = BigNumber(10);
    const tenPowerN = ten.exponentiatedBy(n);
    const tenPowerP = ten.exponentiatedBy(p);
    const M = tenPowerN.minus(mu);
    const P = b.multipliedBy(tenPowerP).dividedBy(M).precision(10000);
    const tenPowerIJ = ten.exponentiatedBy(i.plus(j));
    const tenPowerI = ten.exponentiatedBy(i);
    const numerator1 = P.modulo(tenPowerIJ);
    const numerator2 = P.modulo(tenPowerI);
    const numeratorTotal = numerator1.minus(numerator2);
    const R = numeratorTotal.dividedBy(tenPowerI);
    return R;
  },
};
