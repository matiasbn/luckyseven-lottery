var HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()
module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545, // Using ganache as development network
            network_id: "*",
        },
        rinkeby: {
            provider: function() {
              return new HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_PROVIDER)
            //   return new HDWalletProvider(mnemonic, infura)
            },
            gas: 6900000,
            network_id: "4",
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
  };