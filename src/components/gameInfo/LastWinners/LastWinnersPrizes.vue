<template>
  <div>
    <h1>Last winners Prizes</h1>
    <h2>First prize Prize</h2>
    <h3>{{ firstPrize }}</h3>
    <h2>Second prize Prize</h2>
    <h3>{{ secondPrize }}</h3>
    <h2>Third prize Prize</h2>
    <h3>{{ thirdPrize }}</h3>
  </div>
</template>

<script>
export default {
  computed: {
    firstPrize() {
      return this.$store.state.lastWinnersPrizes.firstPrize;
    },
    secondPrize() {
      return this.$store.state.lastWinnersPrizes.secondPrize;
    },
    thirdPrize() {
      return this.$store.state.lastWinnersPrizes.thirdPrize;
    },
  },
};
</script>

<style scoped>

</style>
