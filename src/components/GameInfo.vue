<template>
  <div
    class="main-container">
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
import CurrentGame from './GameInfo/CurrentGame';
import TicketStore from './GameInfo/TicketStore';

export default {
  components: {
    CurrentGame,
    TicketStore,
  },
};
</script>

<style>
  .row {
    margin:20px;
  }
</style>
