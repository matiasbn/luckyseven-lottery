<template>
  <div id="app">
    <Navbar />
    <Header />
    <GameInfo />
  </div>
</template>
<script>

import GameInfo from './components/GameInfo';
import Navbar from './components/Navbar';
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    GameInfo,
    Navbar,
    Header,
  },
};
</script>

<style scoped>
</style>
