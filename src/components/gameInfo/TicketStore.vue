<template>
  <b-card
    header="Ticket Store"
    header-tag="h1"
    class="ticket-store"
  >
    <b-row>
      <b-col>
        <b-card
          header="Try your luck!"
          header-tag="h2"
        >
          <b-button
            pill
            variant="warning"
          >
            Generate Ticket
          </b-button>
          <b-button
            pill
            variant="warning"
          >
            Buy Ticket
          </b-button>
          <b-button
            pill
            variant="warning"
          >
            Give me a random ticket!
          </b-button>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          header="Generated ticket"
          header-tag="h2"
          title="Ticket value"
        >
          <b-card-text>
            {{ lastGeneratedTicket }}
          </b-card-text>
        </b-card>
        <b-card title="First number">
          <b-card-text>
            {{ lastGeneratedNumber1 }}
          </b-card-text>
        </b-card>
        <b-card title="Second number">
          <b-card-text>
            {{ lastGeneratedNumber2 }}
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
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
    lastGeneratedNumber1() {
      return this.$store.state.player.lastGeneratedNumber1;
    },
    lastGeneratedNumber2() {
      return this.$store.state.player.lastGeneratedNumber2;
    },
    lucky7Ticket() {
      return this.$store.state.player.lucky7Ticket;
    },
  },
};
</script>

<style scoped>
  .ticket-store {
    text-align:center;
  }
  .btn {
    margin:5px;
  }
</style>
