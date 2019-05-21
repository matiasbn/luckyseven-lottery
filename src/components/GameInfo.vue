<template>
  <div
    class="main-container">
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
  </div>
</template>

<script>
import LastTickets from './GameInfo/LastTickets';
import Lucky7Tickets from './GameInfo/Lucky7Tickets';
import PlayerStats from './GameInfo/PlayerStats';
import PricesAndStats from './GameInfo/PricesAndStats';
import TicketStore from './GameInfo/TicketStore';
import pollWeb3 from '../util/pollWeb3';

export default {
  components: {
    LastTickets,
    Lucky7Tickets,
    PlayerStats,
    PricesAndStats,
    TicketStore,
  },
  beforeCreate() {
    console.log('registerWeb3 Action dispatched');
    this.$store.dispatch('registerWeb3');
    pollWeb3();
  },
};
</script>

<style>
  .row {
    margin:20px;
  }
</style>
