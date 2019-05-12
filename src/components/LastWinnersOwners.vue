<template>
    <div>
        <h1>Last winners</h1>
        <h2>First prize owner</h2>
        <h3>{{ firstPrize }}</h3>
        <h2>Second prize owner</h2>
        <h3>{{ secondPrize }}</h3>
        <h2>Third prize owner</h2>
        <h3>{{ thirdPrize }}</h3>
    </div>
</template>

<script>
export default {
  computed: {
    firstPrize() {
      return this.$store.state.lastWinnersOwners.firstPrizeOwner;
    },
    secondPrize() {
      return this.$store.state.lastWinnersOwners.secondPrizeOwner;
    },
    thirdPrize() {
      return this.$store.state.lastWinnersOwners.thirdPrizeOwner;
    },
  },
};
</script>

<style scoped>

</style>
