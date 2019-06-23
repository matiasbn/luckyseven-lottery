<template>
  <div>
    <CurrentGameStats/>
    <TicketsStats/>
    <PastGames/>
  </div>
</template>

<script>
import CurrentGameStats from './GameStats/CurrentGameStats';
import TicketsStats from './GameStats/TicketsStats';
import PastGames from './GameStats/PastGames';

export default {
  components: {
    CurrentGameStats,
    TicketsStats,
    PastGames,
  },
};
</script>

<style scoped>
  .card{
    text-align: center;
    margin: 20px;
  }
</style>
