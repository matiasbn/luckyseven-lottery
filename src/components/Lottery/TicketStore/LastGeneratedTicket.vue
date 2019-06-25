<template>
  <div>
    <b-card
      header="Last Generated ticket"
      header-tag="h2"
      title="Ticket value"
    >
      <b-card-text
        v-if="player.generatedTicket.received">
        {{ currentGameTicket ? player.generatedTicket.ticketValue : 0 }}
      </b-card-text>
      <b-spinner
        v-else
        variant="success"
        label="Spinning"/>

    </b-card>

    <b-card title="First number">
      <b-card-text
        v-if="player.generatedTicket.received">
        {{ currentGameTicket ? player.generatedTicket.number1 : 0 }}
      </b-card-text>
      <b-spinner
        v-else
        variant="success"
        label="Spinning"/>
    </b-card>

    <b-card title="Second number">
      <b-card-text
        v-if="player.generatedTicket.received">
        {{ currentGameTicket ? player.generatedTicket.number2 : 0 }}
      </b-card-text>
      <b-spinner
        v-else
        variant="success"
        label="Spinning"/>
    </b-card>

    <b-card title="Difference">
      <b-card-text
        v-if="player.generatedTicket.received">
        {{ currentGameTicket ? player.generatedTicket.difference : 0 }}
      </b-card-text>
      <b-spinner
        v-else
        variant="success"
        label="Spinning"/>
    </b-card>

    <b-card title="Position">
      <b-card-text
        v-if="player.generatedTicket.received">
        {{ currentGameTicket ? player.generatedTicket.position : 0 }}
      </b-card-text>
      <b-spinner
        v-else
        variant="success"
        label="Spinning"/>
    </b-card>

    <b-card title="Lucky7Ticket?">
      <b-card-text
        v-if="ticketIsLucky7Ticket && currentGameTicket">
        <p>
          Yes! What are you waiting? Buy it!
        </p>
        <b-button
          v-b-popover.hover="purchasePrice"
          :disabled="!player.generatedTicket.received"
          title="Price"
          variant="success"
          @click="purchaseGeneratedTicket"
        >
          Buy Ticket
        </b-button>
      </b-card-text>
      <b-card-text v-else-if="ticketIsAlreadyOwned && currentGameTicket">
        <p>
          You already own this ticket
        </p>
      </b-card-text>
      <b-card-text v-else-if="notLucky7Ticket && currentGameTicket">
        No, try again!.
      </b-card-text>
      <b-card-text v-else>
        No tickets generated yet.
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
/* eslint-disable max-len */
import truffleContract from '@/web3/truffleContract';
import { mapState } from 'vuex';
import Web3 from 'web3';

const web3 = new Web3();

export default {
  computed: {
    ...mapState(['game', 'player', 'lucky7GameInfo', 'web3', 'lucky7GameInfoReady']),
    currentGameTicket() {
      return String(this.game.settings.gameID) === String(this.player.generatedTicket.gameID);
    },
    ticketIsLucky7Ticket() {
      if (this.lucky7GameInfo[this.player.generatedTicket.position - 1] !== undefined) {
        return this.player.generatedTicket.lucky7Ticket
            && this.player.generatedTicket.ticketValue !== '0'
            && String(this.player.generatedTicket.ticketValue) !== String(this.lucky7GameInfo[this.player.generatedTicket.position - 1].ticketValue);
      }
      return false;
    },
    ticketIsAlreadyOwned() {
      if (this.lucky7GameInfo[this.player.generatedTicket.position - 1] !== undefined) {
        return (this.lucky7GameInfo[this.player.generatedTicket.position - 1].owner).toUpperCase() === (this.web3.coinbase).toUpperCase()
            && this.player.generatedTicket.ticketValue !== '0'
            && String(this.player.generatedTicket.ticketValue) === String(this.lucky7GameInfo[this.player.generatedTicket.position - 1].ticketValue);
      }
      return false;
    },
    notLucky7Ticket() {
      return !this.player.generatedTicket.lucky7Ticket
            && this.player.generatedTicket.ticketValue !== '0';
    },
  },
  watch: {
    async lucky7GameInfoReady() {
      const contract = await truffleContract(window.web3.currentProvider).deployed();
      const pastGenerateParameters = await contract.getPastEvents('GeneratedParametersReceived', { fromBlock: 0, filter: { owner: this.web3.coinbase } });
      if (pastGenerateParameters.length) {
        const { mu, i, gameID } = pastGenerateParameters[`${pastGenerateParameters.length - 1}`].returnValues;
        const payload = { mu, i, gameID };
        this.$store.dispatch('recoverGeneratedParameters', payload);
      }
    },
  },
  methods: {
    async purchaseGeneratedTicket() {
      try {
        const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
        this.$store.state.player.generatedTicket.received = false;
        this.$store.state.player.purchasedTicket.received = false;
        await truffleContractInstance.sellGeneratedTicket({
          from: this.web3.coinbase,
          value: parseInt(this.game.prices.purchase, 10),
        });
      } catch (e) {
        console.log(e);
        this.$store.state.player.generatedTicket.received = false;
        this.$store.state.player.purchasedTicket.received = false;
      }
    },
    purchasePrice() {
      return `${web3.utils.fromWei(this.game.prices.purchase, 'ether')} ETH + fees`;
    },
  },
};
</script>
