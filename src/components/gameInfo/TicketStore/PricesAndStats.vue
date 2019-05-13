<template>
  <div>
    <b-card
      title="Tickets stats"
      header="Game stats"
    >
      <b-card-text>
        Tickets selled:
        {{ ticketsSelled }}
      </b-card-text>
      <b-card-text>
        Tickets generated:
        {{ ticketsGenerated }}
      </b-card-text>
    </b-card>
    <b-card title="Prices">
      <b-card-text>
        Generate ticket prize:
        {{ generateTicketPrice }}
      </b-card-text>
      <b-card-text>
        Sell ticket prize:
        {{ sellTicketPrice }}
      </b-card-text>
    </b-card>
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
