<template>
  <b-card
    v-if="valuesReady"
    header="Tickets stats per game"
    header-tag="h2"
    no-body>

    <b-table
      :items="ticketsStats"
      :fields="fields"
      striped
      hover
      responsive
      bordered
    />
  </b-card>
  <b-card
    v-else >
    <b-spinner
      variant="success"
      label="Spinning"/>
  </b-card>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
import truffleContract from '@/web3/truffleContract';
import { mapState, mapMutations, mapGetters } from 'vuex';


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
    ...mapGetters('player', ['currentProvider']),
  },
  asyncComputed: {
    async ticketsStats() {
      this.valuesReady = false;
      const contract = await truffleContract(this.currentProvider).deployed();
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
      const payload = { randomTicketsCounter, generatedTicketsCounter, generatedTicketsSelledCounter };
      this.updateTicketStats(payload);
      this.valuesReady = true;
      return stats;
    },
  },
  methods: {
    ...mapMutations('game', ['updateTicketStats']),
  },
};
</script>
