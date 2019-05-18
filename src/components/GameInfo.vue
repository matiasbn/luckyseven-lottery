<template>
  <b-container fluid>
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
import LastTickets from './GameInfo/LastTickets';
import Lucky7Tickets from './GameInfo/Lucky7Tickets';
import PlayerStats from './GameInfo/PlayerStats';
import PricesAndStats from './GameInfo/PricesAndStats';
import TicketStore from './GameInfo/TicketStore';

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
