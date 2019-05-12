<template>
  <div>
    <h1>Player information</h1>
    <h2>Your account</h2>
    <h3>{{ account }}</h3>
    <h2>Your current prize</h2>
    <h3>{{ currentPrize }}</h3>
    <button>Claim your prize!</button>
  </div>
</template>

<script>
export default {
  computed: {
    account() {
      return this.$store.state.player.account;
    },
    tokens() {
      return this.$store.state.player.tokens;
    },
    currentPrize() {
      return this.$store.state.player.currentPrize;
    },
  },
};
</script>

<style scoped></style>
