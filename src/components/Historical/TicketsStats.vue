<template>
  <b-card
    header="Tickets stats (since first game)"
    header-tag="h4"
  >
    <b-card-text>
      Random tickets selled:
      {{ game.stats.randomTickets }}
    </b-card-text>
    <b-card-text>
      Generated tickets selled:
      {{ game.stats.generatedTicketsSelled }}
    </b-card-text>
    <b-card-text>
      Generated tickets:
      {{ game.stats.generatedTickets }}
    </b-card-text>
  </b-card>
</template>

<script>
import { mapState } from 'vuex';


export default {
  computed: {
    ...mapState(['game']),
  },
};
</script>

