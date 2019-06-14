<template>
  <div>
    <PricesAndStats/>
    <b-card
      header="Past Games"
      header-tag="h2">
      <b-table
        :items="lucky7PastGames"
        :fields="fields"
        striped
        hover
        responsive
        bordered
      />
    </b-card>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import PricesAndStats from './GameStats/PricesAndStats';

export default {
  components: {
    PricesAndStats,
  },
  data() {
    return {
      fields: [
        { key: 'lucky7Number', label: 'Lucky7Number' },
        { key: 'ticketValue', label: 'Lucky7Ticket' },
        {
          key: 'difference', label: 'Difference', sortable: true,
        },
        { key: 'owner', label: 'Owner' },
        { key: 'prize', label: 'Prize', sortable: true },
        { key: 'gameID', label: 'Game ID', sort: true, sortable: true },
      ],
      valuesReady: true,
    };
  },
  computed: {
    ...mapGetters(['lucky7PastGames']),
  },

};
</script>

<style scoped>
  .card{
    text-align: center;
    margin: 20px;
  }
</style>
