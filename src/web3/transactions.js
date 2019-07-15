/* eslint-disable max-len */
// import { Connect } from 'uport-connect';
import truffleContract from '@/web3/truffleContract';
// import Lucky7Store from '../../build/contracts/Lucky7Store.json';


const generateTicket = async (state) => {
  const provider = state.player.session.provider === 'metamask' ? window.web3.currentProvider : state.player.session.uportProvider;
  const truffleContractInstance = await truffleContract(provider).deployed();
  await truffleContractInstance.generateRandomTicket({
    from: state.web3.coinbase,
    value: parseInt(state.game.prices.generate, 10),
  });
};

const purchaseRandomTicket = async (state) => {
  const provider = state.player.session.provider === 'metamask' ? window.web3.currentProvider : state.player.session.uportProvider;
  const truffleContractInstance = await truffleContract(provider).deployed();
  await truffleContractInstance.sellRandomTicket({
    from: state.web3.coinbase,
    value: parseInt(state.game.prices.purchase, 10),
  });
};

const purchaseGeneratedTicket = async (state) => {
  const provider = state.player.session.provider === 'metamask' ? window.web3.currentProvider : state.player.session.uportProvider;
  const truffleContractInstance = await truffleContract(provider).deployed();
  await truffleContractInstance.sellGeneratedTicket({
    from: state.web3.coinbase,
    value: parseInt(state.game.prices.purchase, 10),
  });
};

const claimPrize = async (state) => {
  const provider = state.player.session.provider === 'metamask' ? window.web3.currentProvider : state.player.session.uportProvider;
  const truffleContractInstance = await truffleContract(provider).deployed();
  await truffleContractInstance.withdraw({
    from: state.web3.coinbase,
  });
};

const setNewGame = async (state) => {
  const provider = state.player.session.provider === 'metamask' ? window.web3.currentProvider : state.player.session.uportProvider;
  const truffleContractInstance = await truffleContract(provider).deployed();
  await truffleContractInstance.setNewGame({ from: state.web3.coinbase });
};

const setLucky7Numbers = async (state) => {
  const values = [1293812983, 2139812893, 3237182731, 4224567890, 5224567890, 6123819273, 7939871237];
  const provider = state.player.session.provider === 'metamask' ? window.web3.currentProvider : state.player.session.uportProvider;
  const truffleContractInstance = await truffleContract(provider).deployed();
  await truffleContractInstance.insertLucky7Numbers(values, { from: state.web3.coinbase });
};

export default {
  generateTicket,
  purchaseRandomTicket,
  purchaseGeneratedTicket,
  claimPrize,
  setNewGame,
  setLucky7Numbers,
};
