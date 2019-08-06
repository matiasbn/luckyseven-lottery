<template>
  <b-card
    header="Game ID"
    header-tag="h4">
    <b-card-text>
      {{ game.settings.gameID }}
    </b-card-text>
  </b-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['player', 'game', 'web3']),
  },
};
</script>
