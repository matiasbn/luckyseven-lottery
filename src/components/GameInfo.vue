<template>
  <b-container>
    <b-row>
      <b-col>
        <PlayerStats />
      </b-col>
      <b-col>
        <LastTickets />
      </b-col>
      <b-col>
        <PricesAndStats />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <TicketStore />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Lucky7Tickets />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LastTickets from './GameInfo/LastTickets.vue';
import Lucky7Tickets from './GameInfo/Lucky7Tickets.vue';
import PlayerStats from './GameInfo/PlayerStats.vue';
import PricesAndStats from './GameInfo/PricesAndStats.vue';
import TicketStore from './GameInfo/TicketStore.vue';

export default {
  components: {
    LastTickets,
    Lucky7Tickets,
    PlayerStats,
    PricesAndStats,
    TicketStore,
  },
};
</script>

<style>
  .row {
    margin:20px;
  }
</style>
