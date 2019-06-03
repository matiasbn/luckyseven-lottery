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
                @click="generateTicket"
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
                @click="purchaseGeneratedTicket"
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
                @click="purchaseRandomTicket"
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
import truffleContract from '@/web3/truffleContract';
import Web3 from 'web3';

const web3 = new Web3();
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
    ...mapState({
      lastGeneratedTicket: state => state.player.lastGeneratedTicket,
      lastGeneratedNumber1: state => state.player.lastGeneratedNumber1,
      lastGeneratedNumber2: state => state.player.lastGeneratedNumber2,
      lucky7Ticket: state => state.player.lucky7Ticket,
      generateTicketPrice: state => state.game.generateTicketPrice,
      purchaseTicketPrice: state => state.game.purchaseTicketPrice,
    }),
  },
  methods: {
    async generateTicket() {
      const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
      const price = this.$store.state.game.generateTicketPrice;
      const account = this.$store.state.web3.coinbase;
      await truffleContractInstance.generateRandomTicket({
        from: account,
        value: parseInt(price, 10),
      });
    },
    async purchaseGeneratedTicket() {
      const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
      const price = this.$store.state.game.purchaseTicketPrice;
      const account = this.$store.state.web3.coinbase;
      await truffleContractInstance.sellGeneratedTicket({
        from: account,
        value: parseInt(price, 10),
      });
    },
    async purchaseRandomTicket() {
      const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
      const price = this.$store.state.game.purchaseTicketPrice;
      const account = this.$store.state.web3.coinbase;
      await truffleContractInstance.sellRandomTicket({
        from: account,
        value: parseInt(price, 10),
      });
    },
    generatePrice() {
      const price = this.$store.state.game.generateTicketPrice;
      return `${web3.utils.fromWei(price, 'ether')} ETH`;
    },
    purchasePrice() {
      const price = this.$store.state.game.purchaseTicketPrice;
      return `${web3.utils.fromWei(price, 'ether')} ETH`;
    },
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
