<template>
  <b-container fluid>
    <b-row>
      <b-col cols="8">
        <TicketsStatsPerGame/>
      </b-col>
      <b-col>
        <TicketsStats/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <PastGames/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TicketsStatsPerGame from '@/components/Historical/TicketsStatsPerGame';
import TicketsStats from '@/components/Historical/TicketsStats';
import PastGames from '@/components/Historical/PastGames';

export default {
  components: {
    TicketsStats,
    TicketsStatsPerGame,
    PastGames,
  },
};
</script>
