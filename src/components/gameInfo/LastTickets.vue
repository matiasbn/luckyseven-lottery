<template>
  <div>
    <b-card
      header="Your tickets"
      header-tag="h2"
      title="Last Purchased Ticket"
    >
      <b-card-text>
        {{ lastPurchasedTicket }}
      </b-card-text>
    </b-card>
    <b-card title="Lucky7Ticket?">
      <b-card-text>
        {{ lucky7Ticket | isLucky7Ticket }}
      </b-card-text>
    </b-card>
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
    lastPurchasedTicket() {
      return this.$store.state.player.lastPurchasedTicket;
    },
    lastGeneratedTicket() {
      return this.$store.state.player.lastGeneratedTicket;
    },
    lucky7Ticket() {
      return this.$store.state.player.lucky7Ticket;
    },
  },
};
</script>
<style>
  .card{
    text-align:center;
  }
</style>
