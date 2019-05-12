<template>
  <div>
    <h1>Last winners differences</h1>
    <h2>First prize difference</h2>
    <h3>{{ firstPrize }}</h3>
    <h2>Second prize difference</h2>
    <h3>{{ secondPrize }}</h3>
    <h2>Third prize difference</h2>
    <h3>{{ thirdPrize }}</h3>
  </div>
</template>

<script>
export default {
  computed: {
    firstPrize() {
      return this.$store.state.lastWinnersDifferences.firstPrizeDifference;
    },
    secondPrize() {
      return this.$store.state.lastWinnersDifferences.secondPrizeDifference;
    },
    thirdPrize() {
      return this.$store.state.lastWinnersDifferences.thirdPrizeDifference;
    },
  },
};
</script>

<style scoped>

</style>
