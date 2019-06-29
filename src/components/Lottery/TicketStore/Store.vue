<template>
  <b-card
    header="Try your luck!"
    header-tag="h2"
    fluid
  >
    <b-row>
      <b-col>
        <p>
          Generate a ticket for a lower price than purchasing it! <br> If the ticket
          generated is a Lucky7Ticket you'll have the option to buy it. <br>
        </p>
        <b-button
          v-b-popover.hover="generatePrice"
          v-if="player.purchasedTicket.received && player.generatedTicket.received"
          :disabled="game.settings.storeEnabled"
          size="lg"
          title="Price"
          variant="success"
          @click="generateTicket"
        >
          Generate Ticket
        </b-button>
        <b-spinner
          v-else
          variant="success"
          label="Spinning"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p>
          Or, if you feel lucky, you can purchase your ticket directly!.
        </p>
        <b-button
          v-b-popover.hover="purchasePrice"
          v-if="player.purchasedTicket.received && player.generatedTicket.received"
          :disabled="game.settings.storeEnabled"
          size="lg"
          title="Price"
          variant="success"
          @click="purchaseRandomTicket"
        >
          Give me a random ticket!
        </b-button>
        <b-spinner
          v-else
          variant="success"
          label="Spinning"/>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
/* eslint-disable max-len */

import Web3 from 'web3';
import { mapState } from 'vuex';
import functions from '@/web3/functions';

const web3 = new Web3();

export default {
  computed: {
    buttonsEnabled() {
      return true;
    },
    ...mapState(['game', 'player', 'web3']),

  },
  methods: {
    generatePrice() {
      return `${web3.utils.fromWei(this.game.prices.generate, 'ether')} ETH + fees`;
    },
    purchasePrice() {
      return `${web3.utils.fromWei(this.game.prices.purchase, 'ether')} ETH + fees`;
    },
    async generateTicket() {
      try {
        this.$store.state.player.generatedTicket.received = false;
        await functions.generateTicket(this.$store.state);
      } catch (e) {
        this.$store.state.player.generatedTicket.received = true;
        console.log(e);
      }
    },
    async purchaseRandomTicket() {
      try {
        this.$store.state.player.purchasedTicket.received = false;
        this.$store.state.player.purchasedTicket.lucky7Ticket = false;
        await functions.purchaseRandomTicket(this.$store.state);
      } catch (e) {
        console.log(e);
        this.$store.state.player.purchasedTicket.received = true;
        this.$store.state.player.purchasedTicket.lucky7Ticket = true;
      }
    },
  },
};
</script>
