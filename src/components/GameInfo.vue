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
};
</script>

<style>
  .row {
    margin:20px;
  }
</style>
