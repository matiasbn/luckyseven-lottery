<template>
  <div>
    <b-card
      title="Past Games"
      header-tag="h1"
      header-bg-variant="warning"
      header-text-variant="white">
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

export default {
  data() {
    return {
      fields: [
        { key: 'lucky7Number', label: 'Lucky7Number' },
        { key: 'ticketValue', label: 'Lucky7Ticket' },
        {
          key: 'difference', label: 'Difference', sortable: true, sort: true, center: true,
        },
        { key: 'owner', label: 'Owner' },
        { key: 'prize', label: 'Prize' },
        { key: 'gameID', label: 'Game ID' },
      ],
      valuesReady: true,
    };
  },
  computed: {
    ...mapGetters(['lucky7PastGames']),
  },
  beforeCreate() {
    this.$store.dispatch('updatePastGames');
  },
};
</script>

<style scoped>
  .card{
    text-align: center;
  }
</style>
