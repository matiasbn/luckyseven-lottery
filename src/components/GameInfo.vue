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
        <CurrentGame />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import pollWeb3 from '@/web3/pollWeb3';
import LastTickets from './GameInfo/LastTickets';
import CurrentGame from './GameInfo/CurrentGame';
import PlayerStats from './GameInfo/PlayerStats';
import PricesAndStats from './GameInfo/PricesAndStats';
import TicketStore from './GameInfo/TicketStore';


export default {
  components: {
    LastTickets,
    CurrentGame,
    PlayerStats,
    PricesAndStats,
    TicketStore,
  },
  beforeCreate() {
    this.$store.dispatch('registerWeb3');
    this.$store.dispatch('retrieveGameInformation');
    pollWeb3();
  },
  // created() {
  //   this.$store.dispatch('ticketGenerated');
  // },
};
</script>

<style>
  .row {
    margin:20px;
  }
</style>
