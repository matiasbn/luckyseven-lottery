<template>
  <div>
    <b-card
      header="Your tickets"
      header-tag="h2"
      title="Last Purchased Ticket"
      header-bg-variant="warning"
      header-text-variant="white"
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

import { mapState } from 'vuex';

export default {
  filters: {
    isLucky7Ticket(lucky7Ticket) {
      if (lucky7Ticket) {
        return 'Yes!, Congratulations!';
      }
      return 'No, best luck for the next game';
    },
  },
  computed: {
    ...mapState({
      lastPurchasedTicket: state => state.player.lastPurchasedTicket,
      lastGeneratedTicket: state => state.player.lastGeneratedTicket,
      lucky7Ticket: state => state.player.lucky7Ticket,
    }),
  },
};
</script>
<style>
  .card{
    text-align:center;
  }
</style>
