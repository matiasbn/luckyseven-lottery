<template>
  <div>
    <b-card
      title="Last Purchased Ticket"
      header="Last Tickets"
    >
      <b-card-text>
        {{ lastPurchasedTicket }}
      </b-card-text>
    </b-card>
    <b-card title="Last Generated Ticket">
      <b-card-text>
        {{ lastGeneratedTicket }}
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
</style>
