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
        {{ isLucky7Ticket | checkLucky7Ticket }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  filters: {
    checkLucky7Ticket(lucky7Ticket) {
      if (lucky7Ticket) {
        return 'Yes!, Congratulations!';
      }
      return 'No, best luck for the next game';
    },

  },
  computed: {
    ...mapGetters(['isLucky7Ticket', 'lastPurchasedTicket']),
  },
};
</script>
<style>
  .card{
    text-align:center;
  }
</style>
