<template>
  <b-card
    header="Current game"
    header-tag="h1"
    header-bg-variant="warning"
    header-text-variant="white"
  >
    <b-table
      :items="lucky7Tickets"
      :fields="fields"
      striped
      hover
      responsive
      bordered
    />
  </b-card>
</template>
<script>
export default {
  data() {
    return {
      fields: [
        { key: 'number', label: 'Lucky7Number' },
        { key: 'ticket', label: 'Lucky7Ticket' },
        {
          key: 'difference', label: 'Difference', sort: true, center: true,
        },
        { key: 'owner', label: 'Owner' },
        { key: 'prize', label: 'Prize' },
      ],
    };
  },
  computed: {
    lucky7Tickets() {
      return [
        {
          ticket: this.$store.state.lucky7Numbers[0].ticket,
          owner: this.$store.state.lucky7Numbers[0].owner,
          prize: this.$store.state.lucky7Numbers[0].prize,
          difference: this.$store.state.lucky7Numbers[0].difference,
          number: this.$store.state.lucky7Numbers[0].number,
        },
        {
          ticket: this.$store.state.lucky7Numbers[1].ticket,
          owner: this.$store.state.lucky7Numbers[1].owner,
          prize: this.$store.state.lucky7Numbers[1].prize,
          difference: this.$store.state.lucky7Numbers[1].difference,
          number: this.$store.state.lucky7Numbers[1].number,
        },
        {
          ticket: this.$store.state.lucky7Numbers[2].ticket,
          owner: this.$store.state.lucky7Numbers[2].owner,
          prize: this.$store.state.lucky7Numbers[2].prize,
          difference: this.$store.state.lucky7Numbers[2].difference,
          number: this.$store.state.lucky7Numbers[2].number,
        },
        {
          ticket: this.$store.state.lucky7Numbers[3].ticket,
          owner: this.$store.state.lucky7Numbers[3].owner,
          prize: this.$store.state.lucky7Numbers[3].prize,
          difference: this.$store.state.lucky7Numbers[3].difference,
          number: this.$store.state.lucky7Numbers[3].number,
        },
        {
          ticket: this.$store.state.lucky7Numbers[4].ticket,
          owner: this.$store.state.lucky7Numbers[4].owner,
          prize: this.$store.state.lucky7Numbers[4].prize,
          difference: this.$store.state.lucky7Numbers[4].difference,
          number: this.$store.state.lucky7Numbers[4].number,
        },
        {
          ticket: this.$store.state.lucky7Numbers[5].ticket,
          owner: this.$store.state.lucky7Numbers[5].owner,
          prize: this.$store.state.lucky7Numbers[5].prize,
          difference: this.$store.state.lucky7Numbers[5].difference,
          number: this.$store.state.lucky7Numbers[5].number,
        },
        {
          ticket: this.$store.state.lucky7Numbers[6].ticket,
          owner: this.$store.state.lucky7Numbers[6].owner,
          prize: this.$store.state.lucky7Numbers[6].prize,
          difference: this.$store.state.lucky7Numbers[6].difference,
          number: this.$store.state.lucky7Numbers[6].number,
        },
      ];
    },
  },
};
</script>
<style scoped>
  .card{
    text-align: center;
  }
</style>
