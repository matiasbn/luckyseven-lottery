<template>
  <div>
    <b-card
      title="Your account"
      header="Player stats"
    >
      <b-card-text>{{ account }}</b-card-text>
    </b-card>

    <b-card title="Your current prize">
      <b-card-text>{{ currentPrize }}</b-card-text>
      <b-button variant="outline-primary">
        Claim your prize!
      </b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  computed: {
    account() {
      return this.$store.state.player.account;
    },
    currentPrize() {
      return this.$store.state.player.currentPrize;
    },
  },
};
</script>

<style scoped></style>
