/* eslint-disable max-len */
import truffleContract from '@/web3/truffleContract';


const generateTicket = async (state) => {
  if (state.player.session.provider === 'metamask') {
    const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
    await truffleContractInstance.generateRandomTicket({
      from: state.web3.coinbase,
      value: parseInt(state.game.prices.generate, 10),
    });
  } else {
    // const contract = uport.contract(Lucky7Store.abi).at(Lucky7Store.networks['7'].address);
    // contract.generateRandomTicket();
    console.log('Using uPort');
  }
};

const purchaseRandomTicket = async (state) => {
  if (state.player.session.provider === 'metamask') {
    const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
    await truffleContractInstance.sellRandomTicket({
      from: state.web3.coinbase,
      value: parseInt(state.game.prices.purchase, 10),
    });
  } else {
    console.log('Using uPort');
  }
};

const purchaseGeneratedTicket = async (state) => {
  if (state.player.session.provider === 'metamask') {
    const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
    await truffleContractInstance.sellGeneratedTicket({
      from: state.web3.coinbase,
      value: parseInt(state.game.prices.purchase, 10),
    });
  } else {
    console.log('Using uPort');
  }
};

const claimPrize = async (state) => {
  if (state.player.session.provider === 'metamask') {
    const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
    await truffleContractInstance.withdraw({ from: state.web3.coinbase });
  } else {
    console.log('Using uPort');
  }
};

const setNewGame = async (state) => {
  if (state.player.session.provider === 'metamask') {
    const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
    await truffleContractInstance.setNewGame({ from: state.web3.coinbase });
  } else {
    console.log('Using uPort');
  }
};

const setLucky7Numbers = async (state) => {
  if (state.player.session.provider === 'metamask') {
    const values = [1293812983, 2139812893, 3237182731, 4224567890, 5224567890, 6123819273, 7939871237];
    const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
    await truffleContractInstance.insertLucky7Numbers(values, { from: state.web3.coinbase });
  } else {
    console.log('Using uPort');
  }
};

export default {
  generateTicket,
  purchaseRandomTicket,
  purchaseGeneratedTicket,
  claimPrize,
  setNewGame,
  setLucky7Numbers,
};
