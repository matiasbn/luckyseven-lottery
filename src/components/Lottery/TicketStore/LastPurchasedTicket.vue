<template>
  <div>
    <b-card
      header="Last Purchased ticket"
      header-tag="h2"
      title="Ticket value"
    >
      <b-card-text
        v-if="player.purchasedTicket.received">
        {{ currentGameTicket ? player.purchasedTicket.ticketValue : 0 }}
      </b-card-text>
      <b-spinner
        v-else
        variant="success"
        label="Spinning"/>
    </b-card>

    <b-card title="First number">
      <b-card-text
        v-if="player.purchasedTicket.received">
        {{ currentGameTicket ? player.purchasedTicket.number1 : 0 }}
      </b-card-text>
      <b-spinner
        v-else
        variant="success"
        label="Spinning"/>
    </b-card>

    <b-card title="Second number">
      <b-card-text
        v-if="player.purchasedTicket.received">
        {{ currentGameTicket ? player.purchasedTicket.number2 : 0 }}
      </b-card-text>
      <b-spinner
        v-else
        variant="success"
        label="Spinning"/>
    </b-card>

    <b-card title="Difference">
      <b-card-text
        v-if="player.purchasedTicket.received">
        {{ currentGameTicket ? player.purchasedTicket.difference : 0 }}
      </b-card-text>
      <b-spinner
        v-else
        variant="success"
        label="Spinning"/>
    </b-card>

    <b-card title="Position">
      <b-card-text
        v-if="player.purchasedTicket.received">
        {{ currentGameTicket ? player.purchasedTicket.position : 0 }}
      </b-card-text>
      <b-spinner
        v-else
        variant="success"
        label="Spinning"/>
    </b-card>

    <b-card title="Lucky7Ticket?">
      <b-card-text v-if="player.purchasedTicket.received">
        {{ isLucky7Ticket }}
      </b-card-text>
      <b-spinner
        v-else
        variant="success"
        label="Spinning"/>
    </b-card>
  </div>
</template>

<script>
/* eslint-disable max-len */
import { mapState } from 'vuex';
import truffleContract from '@/web3/truffleContract';

export default {
  computed: {
    ...mapState(['player', 'game', 'web3', 'lucky7GameInfo', 'lucky7GameInfoReady']),
    currentGameTicket() {
      return String(this.game.settings.gameID) === String(this.player.purchasedTicket.gameID);
    },
    isLucky7Ticket() {
      if (this.player.purchasedTicket.lucky7Ticket) {
        return 'Yes!, Congratulations!';
      } if (this.player.purchasedTicket.ticketValue !== 0
            && String(this.player.purchasedTicket.gameID) === String(this.game.settings.gameID)) {
        return 'No, keep trying!';
      }
      return "You don't own any ticket yet";
    },
  },
  watch: {
    async lucky7GameInfoReady() {
      const contract = await truffleContract(window.web3.currentProvider).deployed();
      const pastPurchaseParameters = await contract.getPastEvents('NewTicketReceived', { fromBlock: 0, filter: { owner: this.web3.coinbase } });
      if (pastPurchaseParameters.length) {
        const { ticketValue, mu, i, ticketID, owner, gameID } = pastPurchaseParameters[`${pastPurchaseParameters.length - 1}`].returnValues;
        const payload = { ticketValue, mu, i, ticketID, owner, gameID };
        this.$store.dispatch('recoverPurchasedParameters', payload);
      }
    },
  },
};
</script>
