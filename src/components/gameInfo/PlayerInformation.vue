<template>
  <b-card-group>
    <PlayerState />
    <LastTickets />
  </b-card-group>
</template>

<script>
import LastTickets from './PlayerInformation/LastTickets.vue';
import PlayerState from './PlayerInformation/PlayerState.vue';

export default {
  components: {
    LastTickets,
    PlayerState,
  },
};
</script>

<style>
</style>
