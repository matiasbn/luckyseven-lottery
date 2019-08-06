export default {
  ensName: '',
  prizeAmount: '0',
  prizeGameID: '0',
  session: {
    isLoggedIn: false,
    provider: 'metamask',
    web3Provider: null,
    credentials: null,
    selectedNetwork: {
      networkID: null,
      rpcUrl: '',
    },
    uportContract: null,
    uportProvider: null,
  },
  purchasedTicket: {
    ticketValue: '0',
    number1: '0',
    number2: '0',
    position: '0',
    difference: '0',
    received: true,
    lucky7Ticket: false,
    gameID: '0',
    ticketID: '0',
  },
  generatedTicket: {
    ticketValue: '0',
    number1: '0',
    number2: '0',
    position: 1,
    difference: 0,
    received: true,
    lucky7Ticket: false,
    gameID: '0',
  },
};

