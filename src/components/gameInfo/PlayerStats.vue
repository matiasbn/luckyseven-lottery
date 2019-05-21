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
      <b-card-text>{{ balance }}</b-card-text>
    </b-card>
    <b-card title="Your current prize">
      <b-card-text>{{ currentPrize }}</b-card-text>
      <b-button variant="success">
        Claim your prize!
      </b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  computed: {
    account() {
      return this.$store.state.web3.coinbase;
    },
    balance() {
      return this.$store.state.web3.balance;
    },
    currentPrize() {
      return this.$store.state.player.currentPrize;
    },
  },
};
</script>

<style scoped>
  .card{
    text-align:center;
  }
</style>
