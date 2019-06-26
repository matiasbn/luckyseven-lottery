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
import CurrentGame from '@/components/Lottery/CurrentGame';
import TicketStore from '@/components/Lottery/TicketStore';

export default {
  components: {
    CurrentGame,
    TicketStore,
  },
  beforeCreate() {
    this.$store.dispatch('getGameSettings');
  },
};
</script>

<style>
  .row {
    margin:20px;
  }
</style>
