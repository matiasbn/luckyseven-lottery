/* eslint-disable max-len */
import { Connect } from 'uport-connect';
import truffleContract from '@/web3/truffleContract';
import player from '@/store/player/state';
import Lucky7Store from '../../build/contracts/Lucky7Store.json';


const generateTicket = async (state) => {
  if (state.player.session.provider === 'metamask') {
    const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
    await truffleContractInstance.generateRandomTicket({
      from: state.web3.coinbase,
      value: parseInt(state.game.prices.generate, 10),
    });
  } else {
    // const uport = state.player.session.uportInstance;
    // const uport = new Connect('LuckySevenLottery', {
    //   network: {
    //     id: state.player.session.selectedNetwork.networkID,
    //     rpcUrl: state.player.session.selectedNetwork.rpcUrl,
    //   },
    // });
    // console.log(uport);
    // const networkID = parseInt(state.player.session.selectedNetwork.networkID, 16);
    // const contract = uport
    //   .contract(Lucky7Store.abi)
    //   .at(Lucky7Store.networks[`${networkID}`].address);
    // contract.generateRandomTicket({
    //   from: state.web3.coinbase,
    //   value: parseInt(state.game.prices.generate, 10),
    //   gas: 7000000,
    // }, 'generateTicket');
    // const transaction = await uport.onResponse('generateTicket');
    // console.log(transaction);
    const truffleContractInstance = await truffleContract(state.player.session.uportProvider).deployed();
    console.log(truffleContractInstance);
    const transaction = await truffleContractInstance.generateRandomTicket({
      from: state.web3.coinbase,
      value: parseInt(state.game.prices.generate, 10),
    });
    console.log(transaction);
    // console.log('Using uPort');
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
    await state.player.session.uportContract.generateRandomTicket({
      from: state.web3.coinbase,
      to: state.web3.contractAddress,
      value: parseInt(state.game.prices.generate, 10),
    }, 'generateRandomTicket');
    const transaction = await uport.onResponse('generateRandomTicket');
    console.log(transaction);
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
