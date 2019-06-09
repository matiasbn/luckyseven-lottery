export default{
  askForValues(state, payload) {
    switch (payload) {
      case 'generateTicket':
        state.player.firstNumberReceived = false;
        state.player.secondNumberReceived = false;
        break;
      case 'purchaseRandomTicket':
        state.player.ticketReceived = false;
        state.player.firstNumberReceived = false;
        state.player.secondNumberReceived = false;
        break;
      case 'purchaseGeneratedTicket':
        state.player.ticketReceived = false;
        break;
      default:
        break;
    }
  },
  parameterReceived(state, payload) {
    const { type, value } = payload;
    switch (type) {
      case 'mu':
        state.player.lastNumber1 = value;
        state.player.firstNumberReceived = true;
        break;
      case 'i':
        state.player.lastNumber2 = value;
        state.player.secondNumberReceived = true;
        break;
      case 'ticket':
        state.player.lastPurchasedTicket = value;
        state.player.ticketReceived = true;
        break;
      default:
        break;
    }
  },
  newLucky7Ticket(state, payload) {
    console.log(payload);
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
      isConnected,
      contractInstance,
      contractAddress,
      contractBalance } = payload;
    state.web3.networkId = networkId;
    state.web3.coinbase = coinbase;
    state.web3.balance = balance;
    state.web3.isConnected = isConnected;
    state.web3.contractInstance = contractInstance;
    state.web3.contractAddress = contractAddress;
    state.web3.contractBalance = contractBalance;
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
    state.player.lastPurchasedTicket = userValues.ticketValue;
    state.player.lastNumber1 = userValues.mu;
    state.player.lastNumber2 = userValues.i;
    state.player.currentPrize = currentPrize;
  },
};
