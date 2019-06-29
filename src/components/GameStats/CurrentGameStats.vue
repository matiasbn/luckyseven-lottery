<template>
  <b-card
    header="Game Stats"
    header-tag="h2">
    <b-card-group deck>
      <b-card
        header="Current Network"
        header-tag="h4"
      >
        <b-card-text>{{ network }}</b-card-text>
      </b-card>
      <b-card
        header="Current Game ID"
        header-tag="h4">
        <b-card-text>
          {{ game.settings.gameID }}
        </b-card-text>
      </b-card>
      <b-card
        header="Lucky7 Contract Balance"
        header-tag="h4">
        <b-card-text>
          {{ ethContractBalance }} ETH
        </b-card-text>
      </b-card>
      <b-card
        header="Lucky7 Contract Address"
        header-tag="h4">
        <b-card-text>
          {{ contractAddress }}
        </b-card-text>
      </b-card>
    </b-card-group>

    <b-card-group deck>
      <b-card
        header="Tickets stats (since first game)"
        header-tag="h4"
      >
        <b-card-text>
          Random tickets selled:
          {{ game.stats.randomTickets }}
        </b-card-text>
        <b-card-text>
          Generated tickets selled:
          {{ game.stats.generatedTicketsSelled }}
        </b-card-text>
        <b-card-text>
          Generated tickets:
          {{ game.stats.generatedTickets }}
        </b-card-text>
      </b-card>
      <b-card
        header="Prices"
        header-tag="h4">
        <b-card-text>
          Generate ticket:
          {{ game.prices.generate | transformWei }} ETH
        </b-card-text>
        <b-card-text>
          Purchase generated ticket:
          {{ game.prices.purchase | transformWei }} ETH
        </b-card-text>
        <b-card-text>
          Purchase random ticket:
          {{ game.prices.purchase | transformWei }} ETH
        </b-card-text>
      </b-card>
    </b-card-group>
  </b-card>
</template>

<script>
import Web3 from 'web3';
import { mapState, mapGetters } from 'vuex';
import truffleContract from '@/web3/truffleContract';


export default {
  filters: {
    transformWei(wei) {
      const web3 = new Web3(window.web3.currentProvider);
      return web3.utils.fromWei(wei, 'ether');
    },
  },
  data() {
    return {
      contractAddress: '0',
    };
  },
  computed: {
    ...mapState('game', {
      lucky7GameInfo: state => state.lucky7GameInfo,
      lucky7GameInfoReady: state => state.lucky7GameInfoReady,
    }),
    ...mapState(['player', 'web3', 'game']),
    ...mapGetters('web3', [
      'network',
    ]),
    ethContractBalance() {
      const web3 = new Web3();
      return web3.utils.fromWei(this.web3.contractBalance, 'ether');
    },
  },
  async mounted() {
    console.log(this.network);
    const web3 = new Web3(window.web3.currentProvider);
    const contract = await truffleContract(window.web3.currentProvider).deployed();
    this.contractAddress = contract.address;
    const gameID = await contract.gameID();
    this.$store.state.game.settings.gameID = gameID;
    const gameParameters = await contract.getPastEvents('GameParameters', { fromBlock: 0 });
    this.$store.state.game.prices.purchase = gameParameters['0'].returnValues.purchaseTicketPrice;
    this.$store.state.game.prices.generate = gameParameters['0'].returnValues.generateTicketPrice;
    const contractBalance = await web3.eth.getBalance(contract.address);
    this.$store.state.web3.contractBalance = contractBalance;
  },
};
</script>

<style scoped>
    .card{
      text-align: center;
      margin: 20px;
    }
  </style>

