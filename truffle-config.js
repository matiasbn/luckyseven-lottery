var HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()
module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545, // Using ganache as development network
            gas: 79000000,
            network_id: "7",
        },
        rinkeby: {
            provider: function() {
              return new HDWalletProvider(process.env.MNEMONIC, process.env.RINKEBY_INFURA_PROVIDER)
            },
            gas: 6900000,
            network_id: "4",
        },
        ropsten: {
            provider: function() {
              return new HDWalletProvider(process.env.MNEMONIC, process.env.ROPSTEN_INFURA_PROVIDER)
            },
            gas: 6900000,
            network_id: "3",
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
  };