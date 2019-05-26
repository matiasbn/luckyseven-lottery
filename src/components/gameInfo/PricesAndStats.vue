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
        {{ generateTicketPrice }} ETH
      </b-card-text>
      <b-card-text>
        Purchase ticket:
        {{ purchaseTicketPrice }} ETH
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { NETWORKS } from '@/web3/constants/networks';

export default {
  computed: {
    generateTicketPrice() {
      return this.$store.state.game.generateTicketPrice;
    },
    purchaseTicketPrice() {
      return this.$store.state.game.purchaseTicketPrice;
    },
    ticketsSelled() {
      return this.$store.state.game.ticketsSelled;
    },
    ticketsGenerated() {
      return this.$store.state.game.ticketsGenerated;
    },
    network() {
      const networkId = this.$store.state.web3.networkId;
      return NETWORKS[networkId];
    },
  },
};
</script>

<style scoped>
  .card{
    text-align:center;
  }
</style>
