const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = 'tribe bread donor regret list olive situate thrive horn affair omit drip';

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545, // Using ganache as development network
      network_id: '*',
      // gas: 75000000,
    },
    rinkeby: {
      provider() {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/29118d6e5c9947289ae6eacd1fc04ea3');
      },
      gas: 6900000,
      // gasPrice: web3.toWei("20", "gwei"),
      network_id: '4',
    },
  },
  compilers: {
    solc: {
      version: '^0.4.20',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
