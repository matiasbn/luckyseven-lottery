<template>
  <b-card
    header="Ticket Store"
    header-tag="h1"
    class="ticket-store"
    header-bg-variant="warning"
    header-text-variant="white"
  >
    <b-card-group deck>

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
          header="Last Generated ticket"
          header-tag="h2"
          title="Ticket value"
        >
          <b-card-text
            v-if="ticketReceived">
            {{ lastPurchasedTicket }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>

        </b-card>
        <b-card title="First number">
          <b-card-text
            v-if="firstNumberReceived">
            {{ lastNumberPurchased1 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>
        <b-card title="Second number">
          <b-card-text
            v-if="secondNumberReceived">
            {{ lastNumberPurchased2 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>
        <b-card title="Lucky7Ticket?">
          <b-card-text>
            {{ isLucky7Ticket | checkLucky7Ticket }}
          </b-card-text>
        </b-card>
      </b-col>

      <b-col>
        <b-card
          header="Last Purchased ticket"
          header-tag="h2"
          title="Ticket value"
        >
          <b-card-text
            v-if="ticketReceived">
            {{ lastPurchasedTicket }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>

        </b-card>
        <b-card title="First number">
          <b-card-text
            v-if="firstNumberReceived">
            {{ lastNumberGenerated1 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>
        <b-card title="Second number">
          <b-card-text
            v-if="secondNumberReceived">
            {{ lastNumberGenerated2 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>
        <b-card title="Lucky7Ticket?">
          <b-card-text>
            {{ isLucky7Ticket | checkLucky7Ticket }}
          </b-card-text>
        </b-card>
      </b-col>
    </b-card-group>
  </b-card>
</template>
<script>
/* eslint-disable max-len */
import { mapGetters } from 'vuex';
import Web3 from 'web3';

import truffleContract from '@/web3/truffleContract';

const web3 = new Web3();

export default {
  filters: {
    checkLucky7Ticket(lucky7Ticket) {
      if (lucky7Ticket) {
        return 'Yes!, Congratulations!';
      }
      return 'No, best luck for the next game';
    },

  },
  data() {
    return {
      contract: null,
    };
  },
  computed: {
    ...mapGetters([
      'isLucky7Ticket',
      'account',
      'purchaseTicketPrice',
      'generateTicketPrice',
      'lastPurchasedTicket',
      'lastNumberGenerated1',
      'lastNumberGenerated2',
      'lastNumberPurchased1',
      'lastNumberPurchased2',
      'lucky7Ticket',
      'ticketReceived',
      'firstNumberReceived',
      'secondNumberReceived',
    ]),
  },
  async beforeCreate() {
    this.contract = await truffleContract(window.web3.currentProvider).deployed();
  },
  methods: {
    async generateTicket() {
      try {
        await this.contract.generateRandomTicket({
          from: this.account,
          value: parseInt(this.generateTicketPrice, 10),
        });
        this.$store.dispatch('askForValues', 'generateTicket');
      } catch (e) {
        console.log(e);
      }
    },
    async purchaseGeneratedTicket() {
      try {
        await this.contract.sellGeneratedTicket({
          from: this.account,
          value: parseInt(this.purchaseTicketPrice, 10),
        });
        this.$store.dispatch('askForValues', 'purchaseGeneratedTicket');
      } catch (e) {
        console.log(e);
      }
    },
    async purchaseRandomTicket() {
      try {
        await this.contract.sellRandomTicket({
          from: this.account,
          value: parseInt(this.purchaseTicketPrice, 10),
        });
        this.$store.dispatch('askForValues', 'purchaseRandomTicket');
      } catch (e) {
        console.log(e);
      }
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
