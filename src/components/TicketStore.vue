<template>
  <div>
    <h1>Ticket Store</h1>
    <h2>Generated Ticket</h2>
    <h3>{{ lastGeneratedTicket }}</h3>
    <button>Generate Ticket</button>
    <button>Buy Ticket Ticket</button>
    <h2>Purchase Random Ticket</h2>
    <button>I'm feeling lucky!</button>
    <h2>Last Purchased Ticket</h2>
    <h3>{{ lastPurchasedTicket }}</h3>
    <h2>Lucky7Ticket?</h2>
    <h3>{{ lucky7Ticket | isLucky7Ticket }}</h3>
  </div>
</template>
<script>
export default {
  filters: {
    isLucky7Ticket(lucky7Ticket) {
      if (lucky7Ticket) {
        return 'Yes!, Congratulations';
      }
      return 'No, best luck for the next game';
    },
  },
  computed: {
    lastGeneratedTicket() {
      return this.$store.state.currentPlayer.lastGeneratedTicket;
    },
    lastPurchasedTicket() {
      return this.$store.state.currentPlayer.lastPurchasedTicket;
    },
    lucky7Ticket() {
      return this.$store.state.currentPlayer.lucky7Ticket;
    },
  },
};
</script>
<style scoped>

</style>
