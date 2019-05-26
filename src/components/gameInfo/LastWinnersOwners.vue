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
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      firstPrize: state => state.lastWinnersOwners.firstPrizeOwner,
      secondPrize: state => state.lastWinnersOwners.secondPrizeOwner,
      thirdPrize: state => state.lastWinnersOwners.thirdPrizeOwner,
    }),
  },
};
</script>

<style scoped>

</style>
