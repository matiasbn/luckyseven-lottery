# Lucky7

A fully decentralized lottery.

## Disclaimer

All the links used on this README are pointing to data stored on IPFS (with exception of repositories or author
specific content).

## About the project

Lucky7 is a fully decentralized builded on Ethereum blockchain.

It is designed to let player control all important actions, like prize delivering or setting new games.


It uses Provable and RHombus to ask for random numbers which operates as paramaters of a Pseudo-Random Number Generator (PRNG), execute the PRNG offchain and store the result on chain.


Lucky7 Lottery is simple. There are going to be 7 numbers, which are the Lucky7Numbers. Once they're setted, the players have two options; to buy a random Ticket or to generate a random Ticket. 


Buying a random Ticket means the user accepts the result whatever it is, paying for it a fee of 0.01 ETH, but registering the ticket as purchased. 

Generate a random Ticket means the user generates the parameters of the PRNG but without registering the Ticket as purchased, paying 0.005 ETH for this action. Advantage of this is that players can "choose" them tickets, and once they get a winner ticket, they can pay the 0.01 ETH fee to register the Ticket as purchased. 

Anyway, in both cases the result is going to be random, but the user can choose spending less money with the trade-off of having to pay extra to mark the Ticket as purchased.

Once a Ticket is marked as Purchased, the contracts compares the value of the Ticket with the Lucky7Numbers, i.e. obtains the difference in absolut value between the Ticket and the closest Lucky7Number to it, and if this Ticket is the closest to that  Lucky7Number amongst all existing Tickets, then the Ticket is now a Lucky7Ticket.

There are two pots. First, 30% of the total prize goes for the Lucky7 wallet to keep the game alive and with support. The other 70% is distributed to the owners of Lucky7Tickets like:

1.- First Prize is 7/28 of the prize.
2.- Second Prize is 6/28 of the prize.
2.- Third Prize is 5/28 of the prize.
2.- Fourth Prize is 4/28 of the prize.
2.- Fifth Prize is 3/28 of the prize.
2.- Sixth Prize is 2/28 of the prize.
2.- Seventh Prize is 1/28 of the prize.

Once certain amount of tickets are generated and purchased, and certain date is reached, then any user can trigger
the action to deliver prizes and setup the game again.

The balance of the contract is going to increase in the way more players purchase/generates tickets.

### Prerequisites

[NPM](https://github.com/npm/cli), to install the next packages.

[Ethereum-bridge](https://github.com/oraclize/ethereum-bridge), for testing Provable on local net.

[Truffle Framework](https://github.com/trufflesuite/truffle), for, well, everything related with Ethereum development, and

[NodeJS](https://github.com/nodejs/node) to run some scripts that will help you work easier.

[Ganache-CLI](https://github.com/trufflesuite/ganache-cli) to generate a local blockchain to complete the sandbox. I've been using it with Ganache-GUI but gave me some troubles with Metamask. IMPORTANT!!!-> TESTED WITH ganache-cli v6.4.5
 
[Metamask](https://metamask.io/) to interact with the dApp.

[ngrok](https://ngrok.com/) to expose localhost to the 'internet'. Used to setup uPort on local blockchain (Ganache).

### Installing
Install the prerequisites:
```
npm install -g ethereum-bridge
npm install -g ganache-cli
npm install -g truffle
npm install -g ngrok
```

### Running the project

#### Script to generate aliases

ProTip: copy and paste the next on your terminal. this will create 4 'aliases' that you'll use 
along the use of this project.

1.- newgan: To delete and create a folder called ganache_cli_data. This folder would be used as backup
of your current ganache setting. Useful to not re-deploy ethereum-bridge every time you shut-off ganache-cli,
and any other setup you'll like to not lose.

2.- gancli: Starts ganache-cli with a series of features, like a deterministic mnemonic, increased eth initial balance
(for testing), increase gas limit and a network id (necessary to use uPort). The deterministic mnemonics is useful to keep a setup on your Metamask extension.

3.- newethbridge: generates a new ethereum-bridge setup to use when ganache-cli is 'resetted'.

4.- ethbridge: loads previous setup of ethereum-bridge with some features necessary to keep working on the project
without problems.

You can copy every line and paste them on your terminal to create the temporary shortcuts.

```
alias newgan='rm -rf ganache-cli-data && mkdir ganache-cli-data'
alias gancli='ganache-cli -dm 'YOUR_MNEMONIC_HERE' --db='./ganache-cli-data/' -i 0x7 -l 79000000 -e 10000'
alias newethbridge='ethereum-bridge -a 1 --dev'
alias ethbridge='ethereum-bridge -a 1 --dev --oar 'OAR_ADDRESS''
```

First, start by running ganache-cli with newgan to create the db directory and then gancli to start the local blockchain.
Then, use newethbridge to create the new ethereum-bridge.
Finally start a ngrok instance by running:
```
ngrok http 8545
```

Using 8545 suppossing that you are using ganache-cli on port 8545.

Two things: first, complete the gancli alias with your mnemonic where it says YOUR_MNEMONIC_HERE. Second, on the ethbridge alias you have to complete with the OAR to where is deployed the respective Provable contracts. This will appear once you run newethbridge this way:
```
$ newethbridge
Please wait...
[2018-08-27T21:19:29.650Z] INFO you are running ethereum-bridge -version: 0.6.1
[2018-08-27T21:19:29.654Z] INFO saving logs to: ./bridge.log
[2018-08-27T21:19:29.656Z] INFO using active mode
[2018-08-27T21:19:29.656Z] INFO Connecting to eth node http://localhost:8545
[2018-08-27T21:19:31.241Z] INFO connected to node type EthereumJSTestRPC/v2.2.0/ethereum-js
[2018-08-27T21:19:32.048Z] WARN Using 0xffcf8fdee72ac11b5c542428b35eef5769c409f0 to query contracts on your blockchain, make sure it is unlocked and do not use the same address to deploy your contracts
[2018-08-27T21:19:32.282Z] INFO deploying the oraclize connector contract...
[2018-08-27T21:19:42.982Z] INFO connector deployed to: 0xd3aa556287afe63102e5797bfddd2a1e8dbb3ea5
[2018-08-27T21:19:43.181Z] INFO deploying the address resolver with a deterministic address...
[2018-08-27T21:20:05.272Z] INFO address resolver (OAR) deployed to: 0x6f485c8bf6fc43ea212e93bbf8ce046c7f1cb475
[2018-08-27T21:20:05.273Z] INFO updating connector pricing...
[2018-08-27T21:20:16.736Z] INFO successfully deployed all contracts
[2018-08-27T21:20:16.750Z] INFO instance configuration file savedto /Users/matiasbarrios/Desktop/Proyecto Consensys/luckyseven/ethereum-bridge/config/instance/oracle_instance_20180827T182016.json

Please add this line to your contract constructor:

OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);

[2018-08-27T21:20:16.765Z] WARN re-org block listen is disabled while using TestRPC
[2018-08-27T21:20:16.766Z] WARN if you are running a test suit with Truffle and TestRPC or your chain is reset often please use the--dev mode
[2018-08-27T21:20:16.766Z] INFO Listening @ 0xd3aa556287afe63102e5797bfddd2a1e8dbb3ea5 (Oraclize Connector)

```
As told, copy the next line:
```
OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
```
To the Lucky7TicketFactory.sol constructor . Just by copying the address inside the OraclizeAddrResolverI() is sufficient.
Second, use the same address to complete your ethbridge alias.
The contract is in the contracts directory. Save the file.

At this point you have to be running three services: ganache-cli, ethereum-bridge and ngrok.

Now you can deploy the contracts.

Go to a new command line, and while you're on the project root path run:
```
$ truffle console

truffle(development)> migrate

Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x1b990fe6a71e4ed7430dbfdac0ca754b81aab9a199ec2a797c749546f3c9e0ab
  Migrations: 0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab
Saving artifacts...
```
Once you did that start the webpack-dev-server on another command line with:

```
npm run dev
```
And you'll be ready to start.

Rest of explanations and details can be found on the project video.

That's it!

## Project video.


## Running the tests

To run the test, use the settings given on the 'alias' section.

You can run the tests by running:

```
truffle test
```

That's it!, test takes time but all of them can be completed with some patience. Here an example of how much time they 
take to complete:

![tests time](https://ipfs.globalupload.io/QmbeiRuxKitFw794tHbsuumGqzzPuCKT7FRkSRkhhAFEBi) 

## Libraries

The contracts use the SafeMath contract of the OpenZeppelin project to avoid Integer Underflow/Overflow problems. Particularly, it is used on the checkForLucky7Ticket function of the Lucky7TicketFactory contract to add and substract values.

Project uses a customized library called Lucky7Library which have only 1 function, which wasn't tested because of it
simplicity. This function is isolated because, as the only function name says, is a bad way to generate random numbers
because is based on block number, but is designed to test Rhombus contract on local blockchain.

## Ticket validator

Project have a 'Ticket validator' section. Use it to validate your generated and purchased tickets or to check custom numbers. 
![ticket validator](https://ipfs.globalupload.io/QmUe78WJnnKsY4qJz4RHqqXG9pMzsmPB5hbui1bWYT5bf1) 

## Testnet

The project can be  deployed to Rinkeby and Ropsten testnets.

The project includes sample-env file, which you have to complete with information about infura provider and your
mnemonic. Remember to change it name to .env, which is ignored by git on .gitignore, so don't worry about disclosing your private key.

To deploy to testnet, you have to run 

```
truffle deploy --network PREFERRED_NETWORK
```

where preferred network is the name, of course, of the testnet to prefer to deploy.

## mu generator

This project uses a pseudo-random number generator (PRNG) designed by me. You can read about it on it paper on this
[link](https://ipfs.globalupload.io/Qmek8hc3pFkRtGkaSwh5EbnApqHdpcoPqVFScbzQUMnePs)

## The story behind the PRNG

I wrote an article on [Medium](https://medium.com/@matias.barriosn/how-i-realized-as-an-adult-that-ive-been-studying-number-theory-since-i-was-a-kid-a8b49ea57a87) about how i formulated the PRNG. Read it and give me some claps.

## Live demo

You can see a long version of demo on this [link](https://www.youtube.com/playlist?list=PL0jTQI3lb8xH46hz-w6Y5l6AB7dhrxs-0), which is a playlist.

You ca see the short version too in this [link]{https://www.youtube.com/watch?v=Arn1l70lY_Q}.

## Authors

* **Matías Barrios** 
