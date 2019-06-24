<template>
  <b-card
    header="Tickets stats per game"
    header-tag="h2">
    <b-table
      v-if="valuesReady"
      :items="ticketsStats"
      :fields="fields"
      striped
      hover
      responsive
      bordered
    />
    <b-spinner
      v-else
      variant="warning"
      label="Spinning"/>

  </b-card>
</template>

<script>
/* eslint-disable no-await-in-loop */
import truffleContract from '@/web3/truffleContract';
import { mapState } from 'vuex';


export default {
  data() {
    return {
      fields: [
        { key: 'gameID', label: 'Game ID' },
        { key: 'randomTickets', label: 'Random Tickets Selled' },
        { key: 'generatedTickets', label: 'Generated Tickets' },
        { key: 'generatedTicketsSelled', label: 'Generated Tickets Selled' },
      ],
      valuesReady: false,
    };
  },
  computed: {
    ...mapState(['game']),
  },
  asyncComputed: {
    async ticketsStats() {
      this.valuesReady = false;
      const contract = await truffleContract(window.web3.currentProvider).deployed();
      const gameID = await contract.gameID();
      const stats = [];
      let randomTickets;
      let generatedTickets;
      let generatedTicketsSelled;
      let randomTicketsCounter = 0;
      let generatedTicketsCounter = 0;
      let generatedTicketsSelledCounter = 0;
      for (let currentGame = 0; currentGame <= gameID; currentGame += 1) {
        randomTickets = (await contract.getPastEvents('RandomTicketSelled', { filter: { gameID: currentGame }, fromBlock: 0 })).length;
        generatedTickets = (await contract.getPastEvents('GeneratedTicket', { filter: { gameID: currentGame }, fromBlock: 0 })).length;
        generatedTicketsSelled = (await contract.getPastEvents('GeneratedTicketSelled', { filter: { gameID: currentGame }, fromBlock: 0 })).length;
        randomTicketsCounter += randomTickets;
        generatedTicketsCounter += generatedTickets;
        generatedTicketsSelledCounter += generatedTicketsSelled;
        const result = {
          gameID: currentGame,
          randomTickets,
          generatedTickets,
          generatedTicketsSelled,
        };
        stats.push(result);
      }
      this.$store.state.game.stats.randomTickets = randomTicketsCounter;
      this.$store.state.game.stats.generatedTickets = generatedTicketsCounter;
      this.$store.state.game.stats.generatedTicketsSelled = generatedTicketsSelledCounter;
      this.valuesReady = true;
      return stats;
    },
  },
};
</script>
