<template>
  <div id="app">
    <Top/>
    <Cover/>
    <GameInfo/>
  </div>
</template>

<script>
import Top from './components/Top.vue';
import Cover from './components/Cover.vue';
import GameInfo from './components/GameInfo.vue';

export default {
  name: 'app',
  components: {
    Top,
    Cover,
    GameInfo,
  },
};
</script>

<style scoped>
</style>
