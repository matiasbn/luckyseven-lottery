<template>
  <div id="app">
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

<style>
  html{
    display:inline-block;
    box-sizing:content-box !important;
  }
</style>
