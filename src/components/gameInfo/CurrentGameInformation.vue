<template>
    <div>
        <h1>Game information</h1>
        <h2>Generate ticket prize</h2>
        <h3>{{ generateTicketPrice }}</h3>
        <h2>Sell ticket prize</h2>
        <h3>{{ sellTicketPrice }}</h3>
        <h2>Tickets selled</h2>
        <h3>{{ ticketsSelled }}</h3>
        <h2>Tickets generated</h2>
        <h3>{{ ticketsGenerated }}</h3>
    </div>
</template>

<script>
export default {
  computed: {
    generateTicketPrice() {
      return this.$store.state.game.generateTicketPrice;
    },
    sellTicketPrice() {
      return this.$store.state.game.sellTicketPrice;
    },
    ticketsSelled() {
      return this.$store.state.game.ticketsSelled;
    },
    ticketsGenerated() {
      return this.$store.state.game.ticketsGenerated;
    },
  },
};
</script>

<style scoped>

</style>
