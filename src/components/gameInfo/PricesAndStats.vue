<template>
  <div>
    <b-card
      header="Game stats"
      header-tag="h2"
      title="Current network"
      header-bg-variant="warning"
      header-text-variant="white"
    >
      <b-card-text>{{ network }}</b-card-text>
    </b-card>
    <b-card
      title="Tickets stats"
      header-bg-variant="warning"
      header-text-variant="white"
    >
      <b-card-text>
        Tickets selled:
        {{ ticketsSelled }}
      </b-card-text>
      <b-card-text>
        Tickets generated:
        {{ ticketsGenerated }}
      </b-card-text>
    </b-card>
    <b-card title="Prices">
      <b-card-text>
        Generate ticket:
        {{ generateTicketPrice | transformWei }} ETH
      </b-card-text>
      <b-card-text>
        Purchase ticket:
        {{ purchaseTicketPrice | transformWei }} ETH
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import Web3 from 'web3';
import { NETWORKS } from '@/web3/constants/networks';
import { mapState } from 'vuex';

const web3 = new Web3();
export default {
  filters: {
    transformWei(wei) {
      return web3.utils.fromWei(wei, 'ether');
    },
  },
  computed: {
    ...mapState({
      generateTicketPrice: state => state.game.generateTicketPrice,
      purchaseTicketPrice: state => state.game.purchaseTicketPrice,
      ticketsSelled: state => state.game.ticketsSelled,
      ticketsGenerated: state => state.game.ticketsGenerated,
      network: (state) => {
        if (state.web3.networkId > 5777) {
          return 'Local network';
        }
        return NETWORKS[state.web3.networkId];
      },
    }),
  },
};
</script>

<style scoped>
  .card{
    text-align:center;
  }
</style>
