<template>
  <div>
    <b-card
      header="Player stats"
      header-tag="h2"
      title="Your account"
      header-bg-variant="warning"
      header-text-variant="white"
    >
      <b-card-text>{{ account }}</b-card-text>
    </b-card>
    <b-card
      title="Your balance"
      header-bg-variant="warning"
      header-text-variant="white"
    >
      <b-card-text>{{ balance | transformBalance }} ETH</b-card-text>
    </b-card>
    <b-card title="Your current prize">
      <b-card-text>{{ currentPrize }}</b-card-text>
      <b-button variant="success">
        Claim your prize now!
      </b-button>
    </b-card>
  </div>
</template>

<script>
import Web3 from 'web3';
import { mapState } from 'vuex';

export default {
  filters: {
    transformBalance(balance) {
      const web3 = new Web3();
      return web3.utils.fromWei(balance, 'ether');
    },
  },
  computed: {
    ...mapState({
      account: state => state.web3.coinbase,
      balance: state => state.web3.balance,
      currentPrize: state => state.web3.currentPrize,
    }),
  },
};
</script>

<style scoped>
  .card{
    text-align:center;
  }
</style>
