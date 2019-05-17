<template>
  <div id="app">
    <Navbar />
    <GameInfo />
  </div>
</template>

<script>
import GameInfo from './components/GameInfo.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    GameInfo,
    Navbar,
  },
};
</script>

<style scoped>
</style>
