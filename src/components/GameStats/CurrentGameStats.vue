<template>
  <div>
    <b-card-group deck>
      <b-card
        header="Current Network"
        header-tag="h2"
      >
        <b-card-text>{{ network }}</b-card-text>
      </b-card>
      <b-card
        header="Tickets stats"
        header-tag="h2"
      >
        <b-card-text>
          Random tickets selled:
          {{ randomTicketsCounter }}
        </b-card-text>
        <b-card-text>
          Generated tickets selled:
          {{ generatedTicketsSelledCounter }}
        </b-card-text>
        <b-card-text>
          Generated tickets:
          {{ generatedTicketsCounter }}
        </b-card-text>
      </b-card>
      <b-card
        header="Prices"
        header-tag="h2">
        <b-card-text>
          Generate ticket:
          {{ generateTicketPrice | transformWei }} ETH
        </b-card-text>
        <b-card-text>
          Purchase ticket:
          {{ purchaseTicketPrice | transformWei }} ETH
        </b-card-text>
      </b-card>
      <b-card
        header="Current Game ID"
        header-tag="h2">
        <b-card-text>
          {{ gameID }}
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import Web3 from 'web3';
import { mapState } from 'vuex';


const web3 = new Web3();
export default {
  filters: {
    transformWei(wei) {
      return web3.utils.fromWei(wei, 'ether');
    },
  },
  computed: {
    ...mapState(['game']),
  },
};
</script>

<style scoped>
    .card{
      text-align: center;
      margin: 20px;
    }
  </style>

