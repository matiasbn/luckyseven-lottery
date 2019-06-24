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

const web3 = new Web3(window.web3.currentProvider);

export default {
  filters: {
    transformWei(wei) {
      return web3.utils.fromWei(wei, 'ether');
    },
  },
  computed: {
    ...mapState(['game', 'web3']),
    ...mapGetters(['network']),
    ethContractBalance() {
      return web3.utils.fromWei(this.web3.contractBalance, 'ether');
    },
  },
  async beforeMount() {
    const contract = await truffleContract(window.web3.currentProvider).deployed();
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

