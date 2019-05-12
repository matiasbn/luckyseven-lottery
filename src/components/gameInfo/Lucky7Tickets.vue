<template>
  <div>
    <h1>Lucky7Tickets</h1>
    <h3>First Lucky7Ticket: {{ prize1 }}</h3>
    <h3>Second Lucky7Ticket: {{ prize2 }}</h3>
    <h3>Third Lucky7Ticket: {{ prize3 }}</h3>
    <h3>Fourth Lucky7Ticket: {{ prize4 }}</h3>
    <h3>Fifth Lucky7Ticket: {{ prize5 }}</h3>
    <h3>Sixth Lucky7Ticket: {{ prize6 }}</h3>
    <h3>Seventh Lucky7Ticket: {{ prize7 }}</h3>
  </div>
</template>
<script>
export default {
  computed: {
    prize1() {
      return this.$store.state.prize1.ticket;
    },
    prize2() {
      return this.$store.state.prize2.ticket;
    },
    prize3() {
      return this.$store.state.prize3.ticket;
    },
    prize4() {
      return this.$store.state.prize4.ticket;
    },
    prize5() {
      return this.$store.state.prize5.ticket;
    },
    prize6() {
      return this.$store.state.prize6.ticket;
    },
    prize7() {
      return this.$store.state.prize7.ticket;
    },
  },
};
</script>
<style scoped>

</style>
