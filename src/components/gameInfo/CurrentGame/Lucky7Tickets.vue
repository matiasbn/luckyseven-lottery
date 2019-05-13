<template>
  <div>
    <b-table
      striped
      hover
      :responsive="responsive"
      bordered
      :items="lucky7Tickets"
      :fields="fields"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: [
        { key: 'number', headerTitle: 'Lucky7Number' },
        { key: 'ticket', headerTitle: 'Lucky7Ticket' },
        {
          key: 'difference', headerTitle: 'Difference', sort: true, sortable: true, center: true,
        },
        { key: 'owner', headerTitle: 'Owner' },
        { key: 'prize', headerTitle: 'Prize' },
      ],
    };
  },
  computed: {
    lucky7Tickets() {
      return [
        {
          ticket: this.$store.state.lucky7Numbers[1 - 1].ticket,
          owner: this.$store.state.lucky7Numbers[1 - 1].owner,
          prize: this.$store.state.lucky7Numbers[1 - 1].prize,
          difference: this.$store.state.lucky7Numbers[1 - 1].difference,
          number: this.$store.state.lucky7Numbers[1 - 1].number,
        },
        {
          ticket: this.$store.state.lucky7Numbers[2 - 1].ticket,
          owner: this.$store.state.lucky7Numbers[2 - 1].owner,
          prize: this.$store.state.lucky7Numbers[2 - 1].prize,
          difference: this.$store.state.lucky7Numbers[2 - 1].difference,
          number: this.$store.state.lucky7Numbers[2 - 1].number,
        },
        {
          ticket: this.$store.state.lucky7Numbers[3 - 1].ticket,
          owner: this.$store.state.lucky7Numbers[3 - 1].owner,
          prize: this.$store.state.lucky7Numbers[3 - 1].prize,
          difference: this.$store.state.lucky7Numbers[3 - 1].difference,
          number: this.$store.state.lucky7Numbers[3 - 1].number,
        },
        {
          ticket: this.$store.state.lucky7Numbers[4 - 1].ticket,
          owner: this.$store.state.lucky7Numbers[4 - 1].owner,
          prize: this.$store.state.lucky7Numbers[4 - 1].prize,
          difference: this.$store.state.lucky7Numbers[4 - 1].difference,
          number: this.$store.state.lucky7Numbers[4 - 1].number,
        },
        {
          ticket: this.$store.state.lucky7Numbers[5 - 1].ticket,
          owner: this.$store.state.lucky7Numbers[5 - 1].owner,
          prize: this.$store.state.lucky7Numbers[5 - 1].prize,
          difference: this.$store.state.lucky7Numbers[5 - 1].difference,
          number: this.$store.state.lucky7Numbers[5 - 1].number,
        },
        {
          ticket: this.$store.state.lucky7Numbers[6 - 1].ticket,
          owner: this.$store.state.lucky7Numbers[6 - 1].owner,
          prize: this.$store.state.lucky7Numbers[6 - 1].prize,
          difference: this.$store.state.lucky7Numbers[6 - 1].difference,
          number: this.$store.state.lucky7Numbers[6 - 1].number,
        },
        {
          ticket: this.$store.state.lucky7Numbers[7 - 1].ticket,
          owner: this.$store.state.lucky7Numbers[7 - 1].owner,
          prize: this.$store.state.lucky7Numbers[7 - 1].prize,
          difference: this.$store.state.lucky7Numbers[7 - 1].difference,
          number: this.$store.state.lucky7Numbers[7 - 1].number,
        },
      ];
    },
  },
};
</script>
<style scoped>

</style>
