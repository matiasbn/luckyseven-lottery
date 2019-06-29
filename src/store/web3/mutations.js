export const registerWeb3Instance = (state, payload) => {
  const {
    networkID,
    coinbase,
    balance,
    contractBalance,
    isConnected } = payload;
  state.networkID = networkID;
  state.coinbase = coinbase;
  state.balance = balance;
  state.contractBalance = contractBalance;
  state.isConnected = isConnected;
};
export const pollWeb3Instance = (state, payload) => {
  state.coinbase = payload.coinbase;
  state.balance = payload.balance;
};
export const registerProvider = (state, payload) => {
  state.currentProvider = payload;
};
export const balanceUpdated = (state, payload) => {
  state.contractBalance = payload;
};
