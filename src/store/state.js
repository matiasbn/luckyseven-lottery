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
    lastNumberGenerated1: 0,
    lastNumberGenerated2: 0,
    lastNumberPurchased1: 0,
    lastNumberPurchased2: 0,
    isLucky7Ticket: false,
    firstNumberReceived: true,
    secondNumberReceived: true,
    ticketReceived: true,
  },
  game: {
    generateTicketPrice: '0',
    purchaseTicketPrice: '0',
    randomTicketsSelled: 0,
    generatedTickets: 0,
    generatedTicketsSelled: 0,
  },
  lucky7GameInfo: [],
  lucky7PastGames: [],
};
