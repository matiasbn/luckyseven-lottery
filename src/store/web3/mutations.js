export const registerWeb3Instance = (state, payload) => {
  const {
    coinbase,
    balance,
    contractAddress,
    contractBalance,
    networkID,
    isConnected } = payload;
  state.coinbase = coinbase;
  state.balance = balance;
  state.contractAddress = contractAddress;
  state.contractBalance = contractBalance;
  state.networkID = networkID;
  state.isConnected = isConnected;
};
export const pollWeb3 = (state, payload) => {
  state.coinbase = payload.coinbase;
  state.balance = payload.balance;
};
export const balanceUpdated = (state, payload) => {
  state.contractBalance = payload;
};
