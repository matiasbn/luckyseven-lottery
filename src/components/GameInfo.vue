<template>
  <div class="container">
    <div class="row">
      <PlayerInformation />
      <TicketStore />
    </div>
    <div class="row">
      <CurrentGame />
    </div>
  </div>
</template>

<script>
import PlayerInformation from './GameInfo/PlayerInformation.vue';
import TicketStore from './GameInfo/TicketStore.vue';
import CurrentGame from './GameInfo/CurrentGame.vue';

export default {
  components: {
    PlayerInformation,
    TicketStore,
    CurrentGame,
  },
};
</script>

<style>
</style>
