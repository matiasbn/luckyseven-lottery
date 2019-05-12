<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col">
                <TicketStore/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <PrizesInformation/>
            </div>
            <div class="col">
                <PlayerInformation/>
            </div>
            <div class="col">
                <CurrentGameInformation/>
            </div>
            <div class="col">
                <LastWinnersOwners/>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <Lucky7Tickets/>
        </div>
        <div class="col">
            <LastWinnersPrizes/>
        </div>
        <div class="col">
            <LastWinnersDifferences/>
        </div>
    </div>
</div>
</template>

<script>
import PrizesInformation from './gameInfo/PrizesInformation.vue';
import TicketStore from './gameInfo/TicketStore.vue';
import Lucky7Tickets from './gameInfo/Lucky7Tickets.vue';
import PlayerInformation from './gameInfo/PlayerInformation.vue';
import CurrentGameInformation from './gameInfo/CurrentGameInformation.vue';
import LastWinnersOwners from './gameInfo/LastWinnersOwners.vue';
import LastWinnersDifferences from './gameInfo/LastWinnersDifferences.vue';
import LastWinnersPrizes from './gameInfo/LastWinnersPrizes.vue';

export default {
  name: 'gameInfo',
  components: {
    PrizesInformation,
    TicketStore,
    Lucky7Tickets,
    PlayerInformation,
    CurrentGameInformation,
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
