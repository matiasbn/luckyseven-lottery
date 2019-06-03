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
import pollWeb3 from '@/web3/pollWeb3';
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
  beforeCreate() {
    this.$store.dispatch('registerWeb3');
    this.$store.dispatch('retrieveGameInformation');
    pollWeb3();
  },
  // beforeMount() {
  //   this.$store.dispatch('eventListener');
  // },
};
</script>

<style>
  .row {
    margin:20px;
  }
</style>
