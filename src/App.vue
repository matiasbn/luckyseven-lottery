<template>
  <div id="app">
    <b-card-group deck>
      <GameInfo />
    </b-card-group>
  </div>
</template>

<script>
import GameInfo from './components/GameInfo.vue';

export default {
  name: 'App',
  components: {
    GameInfo,
  },
};
</script>

<style scoped>
</style>
