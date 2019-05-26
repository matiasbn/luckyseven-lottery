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
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      firstPrize: state => state.lastWinnersPrizes.firstPrize,
      secondPrize: state => state.lastWinnersPrizes.secondPrize,
      thirdPrize: state => state.lastWinnersPrizes.firstPrize,
    }),
  },
};
</script>

<style scoped>

</style>
