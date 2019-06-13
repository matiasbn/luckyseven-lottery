export default {
  web3: {
    networkId: null,
    coinbase: null,
    balance: '0',
    isConnected: false,
    contractAddress: '0',
    contractBalance: '0',
  },
  player: {
    currentPrize: '0',
    prizeGameID: 0,
    lastPurchasedTicket: 0,
    lastNumber1: 0,
    lastNumber2: 0,
    isLucky7Ticket: false,
    firstNumberReceived: true,
    secondNumberReceived: true,
    ticketReceived: true,
  },
  game: {
    generateTicketPrice: '0',
    purchaseTicketPrice: '0',
    ticketsSelled: 0,
    ticketsGenerated: 0,
  },
  lucky7GameInfo: [],
  lucky7PastGames: [],
};
