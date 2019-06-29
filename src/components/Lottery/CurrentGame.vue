<template>
  <b-card
    header="Current game"
    header-tag="h1"
    header-bg-variant="success"
    header-text-variant="white"
  >
    <b-table
      v-if="lucky7GameInfoReady"
      :fields="fields"
      :items="lucky7GameInfo"
      striped
      hover
      responsive
      bordered
    />
    <b-spinner
      v-else
      variant="success"
      label="Spinning"/>
  </b-card>
</template>
<script>
/* eslint-disable max-len */

import { mapState } from 'vuex';

export default {
  data() {
    return {
      fields: [
        { key: 'position', label: 'Position' },
        { key: 'number', label: 'Lucky7Number' },
        { key: 'ticketValue', label: 'Lucky7Ticket' },
        {
          key: 'difference', label: 'Difference', sortable: true, sort: true, center: true,
        },
        { key: 'owner', label: 'Owner' },
        { key: 'prize', label: 'Prize' },
      ],
    };
  },
  computed: {
    ...mapState('game', {
      lucky7GameInfo: state => state.lucky7GameInfo,
      lucky7GameInfoReady: state => state.lucky7GameInfoReady,
    }),
  },
};
</script>
<style scoped>
  .card{
    text-align: center;
  }
</style>
