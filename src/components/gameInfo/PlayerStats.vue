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
      <b-card-text>{{ currentPrize | transformBalance }} ETH</b-card-text>
      <b-button
        variant="success"
        @click="claimPrize">
        Claim your prize now!
      </b-button>
    </b-card>
  </div>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable max-len */
import Web3 from 'web3';
import { mapState } from 'vuex';

export default {
  filters: {
    transformBalance(balance) {
      const web3 = new Web3();
      return parseFloat(web3.utils.fromWei(balance, 'ether'), 10).toFixed(4);
    },
  },
  computed: {
    ...mapState({
      account: state => state.web3.coinbase,
      balance: state => state.web3.balance,
      currentPrize: state => state.player.currentPrize,
    }),
  },
  methods: {
    async claimPrize() {
      await this.$store.state.web3.contractInstance.withdraw({ from: this.$store.state.web3.coinbase });
    },
  },
};
</script>

<style scoped>
  .card{
    text-align:center;
  }
</style>
