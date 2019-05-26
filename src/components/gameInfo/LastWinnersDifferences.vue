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
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      firstPrize: state => state.lastWinnersDifferences.firstPrizeDifference,
      secondPrize: state => state.lastWinnersDifferences.secondPrizeDifference,
      third: state => state.lastWinnersDifferences.thirdDifference,
    }),
  },
};
</script>

<style scoped>

</style>
