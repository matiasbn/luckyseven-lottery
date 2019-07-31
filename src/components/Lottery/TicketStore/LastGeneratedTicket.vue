<template>
  <b-card
    header="Last Generated ticket"
    header-tag="h2"
    no-body
  >
    <b-card
      title="Lucky7Ticket?"
      class="lucky7-ticket">
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

    <b-list-group fluid>
      <b-list-group-item>
        <h6>
          Position:
          <b-badge
            v-if="player.generatedTicket.received"
            style="font-size:15px"
            variant="success"
            pill
          >{{ currentGameTicket ? player.generatedTicket.position : 0 }}
          </b-badge>
          <b-spinner
            v-else
            variant="success"
            label="Spinning"/>
        </h6>
      </b-list-group-item>

      <b-list-group-item>
        <h6>
          Difference:
          <b-badge
            v-if="player.generatedTicket.received"
            style="font-size:15px"
            variant="success"
            pill
          >{{ currentGameTicket ? player.generatedTicket.difference : 0 }}
          </b-badge>
          <b-spinner
            v-else
            variant="success"
            label="Spinning"/>
        </h6>
      </b-list-group-item>

      <b-list-group-item>
        <h6>
          Ticket value:
          <b-badge
            v-if="player.generatedTicket.received"
            style="font-size:15px"
            variant="success"
            pill
          >{{ currentGameTicket ? player.generatedTicket.ticketValue : 0 }}
          </b-badge>
          <b-spinner
            v-else
            variant="success"
            label="Spinning"/>
        </h6>
      </b-list-group-item>
      <b-list-group-item>
        <h6>
          First number:
          <b-badge
            v-if="player.generatedTicket.received"
            style="font-size:15px"
            variant="success"
            pill
          >{{ currentGameTicket ? player.generatedTicket.number1 : 0 }}
          </b-badge>
          <b-spinner
            v-else
            variant="success"
            label="Spinning"/>
        </h6>
      </b-list-group-item>

      <b-list-group-item>
        <h6>
          Second Number:
          <b-badge
            v-if="player.generatedTicket.received"
            style="font-size:15px"
            variant="success"
            pill
          >{{ currentGameTicket ? player.generatedTicket.number2 : 0 }}
          </b-badge>
          <b-spinner
            v-else
            variant="success"
            label="Spinning"/>
        </h6>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>
<script>
/* eslint-disable max-len */
import truffleContract from '@/web3/truffleContract';
import transactions from '@/web3/transactions';
import { mapState, mapMutations, mapGetters } from 'vuex';
import Web3 from 'web3';


export default {
  computed: {
    ...mapState('game', {
      lucky7GameInfo: state => state.lucky7GameInfo,
      lucky7GameInfoReady: state => state.lucky7GameInfoReady,
      b: state => state.settings.b,
      n: state => state.settings.n,
      p: state => state.settings.p,
      j: state => state.settings.j,
      storeEnabled: state => state.settings.storeEnabled,
    }),
    ...mapState(['player', 'web3', 'game']),
    ...mapGetters('player', ['currentProvider']),
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
      const contract = await truffleContract(this.currentProvider).deployed();
      const pastGenerateParameters = await contract.getPastEvents('GeneratedParametersReceived', { fromBlock: 0, filter: { owner: this.web3.coinbase } });
      if (pastGenerateParameters.length) {
        const { mu, i, gameID } = pastGenerateParameters[`${pastGenerateParameters.length - 1}`].returnValues;
        const payload = { mu, i, gameID, b: this.b, n: this.n, p: this.p, j: this.j, lucky7GameInfo: this.lucky7GameInfo };
        this.recoverGeneratedParameters(payload);
      }
    },
  },
  methods: {
    ...mapMutations('player', ['recoverGeneratedParameters']),
    async purchaseGeneratedTicket() {
      try {
        this.$store.state.player.generatedTicket.received = false;
        this.$store.state.player.purchasedTicket.received = false;
        await transactions.purchaseGeneratedTicket(this.$store.state);
      } catch (e) {
        console.log(e);
        this.$store.state.player.generatedTicket.received = true;
        this.$store.state.player.purchasedTicket.received = true;
      }
    },
    purchasePrice() {
      const web3 = new Web3();
      return `${web3.utils.fromWei(this.game.prices.purchase, 'ether')} ETH + fees`;
    },
  },
};
</script>
