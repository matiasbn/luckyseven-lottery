<template>
  <b-card
    header="Current game"
    header-tag="h1"
    header-bg-variant="warning"
    header-text-variant="white"
  >
    <b-table
      :items="lucky7GameInfo"
      :fields="fields"
      striped
      hover
      responsive
      bordered
    />
  </b-card>
</template>
<script>
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
    ...mapState(['lucky7GameInfo']),
  },
};
</script>
<style scoped>
  .card{
    text-align: center;
  }
</style>
