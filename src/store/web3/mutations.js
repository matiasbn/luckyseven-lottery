export const registerWeb3Instance = (state, payload) => {
  const {
    coinbase,
    balance,
    contractAddress,
    contractBalance,
    currentProvider,
    networkID,
    isConnected } = payload;
  state.coinbase = coinbase;
  state.balance = balance;
  state.contractAddress = contractAddress;
  state.contractBalance = contractBalance;
  state.currentProvider = currentProvider;
  state.networkID = networkID;
  state.isConnected = isConnected;
};
export const pollWeb3 = (state, payload) => {
  state.coinbase = payload.coinbase;
  state.balance = payload.balance;
  state.currentProvider = payload.currentProvider;
};
export const registerProvider = (state, payload) => {
  state.currentProvider = payload;
};
export const balanceUpdated = (state, payload) => {
  state.contractBalance = payload;
};
