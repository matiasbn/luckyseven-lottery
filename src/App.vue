<template>
  <div id="app">
    <PrizesInformation/>
    <TicketStore/>
    <Lucky7Tickets/>
    <PlayerInformation/>
    <GameInformation/>
    <LastWinnersOwners/>
    <LastWinnersDifferences/>
    <LastWinnersPrizes/>
  </div>
</template>

<script>
import PrizesInformation from './components/PrizesInformation.vue';
import TicketStore from './components/TicketStore.vue';
import Lucky7Tickets from './components/Lucky7Tickets.vue';
import PlayerInformation from './components/PlayerInformation.vue';
import GameInformation from './components/GameInformation.vue';
import LastWinnersOwners from './components/LastWinnersOwners.vue';
import LastWinnersDifferences from './components/LastWinnersDifferences.vue';
import LastWinnersPrizes from './components/LastWinnersPrizes.vue';
import { store } from './store/store';

export default {
  name: 'app',
  store,
  components: {
    PrizesInformation,
    TicketStore,
    Lucky7Tickets,
    PlayerInformation,
    GameInformation,
    LastWinnersOwners,
    LastWinnersDifferences,
    LastWinnersPrizes,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
