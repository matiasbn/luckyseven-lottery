<template>
  <b-container fluid>
    <b-card
      v-if="lucky7GameInfoReady"
      header="Current game"
      header-tag="h1"
      no-body
    >
      <b-table
        :fields="fields"
        :items="lucky7GameInfo"
        striped
        hover
        bordered
        responsive
      />
    </b-card>
    <b-card
      v-else
    >
      <b-spinner
        variant="success"
        label="Spinning"
        size="lg"
        class="spinner"/>
    </b-card>
  </b-container>
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
  .spinner{
    text-align: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    justify-content: center;
    align-content: center;
    margin-bottom: 0%;
    }
</style>
