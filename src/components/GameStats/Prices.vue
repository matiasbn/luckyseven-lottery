<template>
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
</template>

<script>
import Web3 from 'web3';
import { mapState } from 'vuex';


export default {
  filters: {
    transformWei(wei) {
      const web3 = new Web3();
      return web3.utils.fromWei(wei, 'ether');
    },
  },
  computed: {
    ...mapState(['game']),
  },
};
</script>
