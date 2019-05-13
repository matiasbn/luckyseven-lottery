<template>
  <b-card
    title="Try your luck"
    header="Ticket Store"
  >
    <b-button-group vertical>
      <b-button variant="outline-primary">
        Generate Ticket
      </b-button>
      <b-button variant="outline-primary">
        Buy Ticket
      </b-button>
      <b-button variant="outline-primary">
        I'm feeling lucky!
      </b-button>
    </b-button-group>
  </b-card>
</template>
<script>
export default {
  filters: {
    isLucky7Ticket(lucky7Ticket) {
      if (lucky7Ticket) {
        return 'Yes!, Congratulations';
      }
      return 'No, best luck for the next game';
    },
  },
  computed: {
    lastGeneratedTicket() {
      return this.$store.state.player.lastGeneratedTicket;
    },
    lucky7Ticket() {
      return this.$store.state.player.lucky7Ticket;
    },
  },
};
</script>
      <style scoped>
        .title{
          text-align: center;
        }
      </style>
