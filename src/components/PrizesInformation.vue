<template>
  <div>
    <h1>Prizes Information</h1>
    <h2>Total prize</h2>
    <h3>{{ totalPrize | roundDecimal }}</h3>
    <h2>Prizes</h2>
    <h3>First Prize: {{ prize1 | roundDecimal }}</h3>
    <h3>Second Prize: {{ prize2 | roundDecimal }}</h3>
    <h3>Third Prize: {{ prize3 | roundDecimal }}</h3>
    <h3>Fourth Prize: {{ prize4 | roundDecimal }}</h3>
    <h3>Fifth Prize: {{ prize5 | roundDecimal }}</h3>
    <h3>Sixth Prize: {{ prize6 | roundDecimal }}</h3>
    <h3>Seventh Prize: {{ prize7 | roundDecimal }}</h3>
  </div>
</template>

<script>


export default {
  filters: {
    roundDecimal(input) {
      return input.toFixed(2);
    },
  },
  computed: {
    totalPrize() {
      return this.$store.state.totalPrize;
    },
    prize1() {
      return this.$store.state.prize1.amount;
    },
    prize2() {
      return this.$store.state.prize2.amount;
    },
    prize3() {
      return this.$store.state.prize3.amount;
    },
    prize4() {
      return this.$store.state.prize4.amount;
    },
    prize5() {
      return this.$store.state.prize5.amount;
    },
    prize6() {
      return this.$store.state.prize6.amount;
    },
    prize7() {
      return this.$store.state.prize7.amount;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
