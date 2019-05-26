<template>
  <b-card
    header="Ticket Store"
    header-tag="h1"
    class="ticket-store"
    header-bg-variant="warning"
    header-text-variant="white"
  >
    <b-row>
      <b-col>
        <b-card
          header="Try your luck!"
          header-tag="h2"
          fluid
        >
          <b-row>
            <b-col>
              <p>
                Generate a ticket for a lower price than purchasing it!. <br>
              </p>
              <b-button
                v-b-popover.hover="generatePrice"
                title="Price"
                variant="warning"
              >
                Generate Ticket
              </b-button>
            </b-col>
            <b-col>
              <p>
                Buy your generated ticket to win the prize instantly!
              </p>
              <b-button
                v-b-popover.hover="purchasePrice"
                title="Price"
                variant="warning"
              >
                Buy Ticket
              </b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p>
                Or, if you feel lucky, you can purchase your ticket directly!.
              </p>
              <b-button
                v-b-popover.hover="purchasePrice"
                title="Price"
                variant="warning"
              >
                Give me a random ticket!
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          header="Generated/Purchased ticket"
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
import { mapState } from 'vuex';

export default {
  filters: {
    isLucky7Ticket(lucky7Ticket) {
      if (lucky7Ticket) {
        return 'Yes!, Congratulations';
      }
      return 'No, best luck for the next game';
    },
  },
  data() {
    return {
      generatePrice: `${this.$store.state.game.generateTicketPrice} ETH`,
      purchasePrice: `${this.$store.state.game.purchaseTicketPrice} ETH`,
    };
  },
  computed: {
    ...mapState({
      lastGeneratedTicket: state => state.player.lastGeneratedTicket,
      lastGeneratedNumber1: state => state.player.lastGeneratedNumber1,
      lastGeneratedNumber2: state => state.player.lastGeneratedNumber2,
      lucky7Ticket: state => state.player.lucky7Ticket,
      generateTicketPrice: state => state.game.generateTicketPrice,
      purchaseTicketPrice: state => state.game.purchaseTicketPrice,
    }),
  },
};
</script>

<style>
  .ticket-store {
    text-align:center;
  }
  .btn {
    margin:5px;
  }
  .card-text{
    margin:0;
  }
  .col{
    border:1px yellow;
  }
</style>
