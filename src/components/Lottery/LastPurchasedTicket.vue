<template>
  <b-card
    header="Last Purchased ticket"
    header-tag="h2"
    title="Lucky7Ticket?"
  >
    <b-card-text v-if="player.purchasedTicket.received">
      {{ isLucky7Ticket }}
    </b-card-text>
    <b-spinner
      v-else
      variant="success"
      label="Spinning"/>
    <b-list-group fluid>

      <b-list-group-item>
        <h6>
          Position:
          <b-badge
            v-if="player.purchasedTicket.received"
            style="font-size:15px"
            variant="success"
            pill
          >{{ currentGameTicket ? player.purchasedTicket.position : 0 }}
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
            v-if="player.purchasedTicket.received"
            style="font-size:15px"
            variant="success"
            pill
          >{{ currentGameTicket ? player.purchasedTicket.difference : 0 }}
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
            v-if="player.purchasedTicket.received"
            style="font-size:15px"
            variant="success"
            pill
          >{{ currentGameTicket ? player.purchasedTicket.ticketValue : 0 }}
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
            v-if="player.purchasedTicket.received"
            style="font-size:15px"
            variant="success"
            pill
          >{{ currentGameTicket ? player.purchasedTicket.number1 : 0 }}
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
            v-if="player.purchasedTicket.received"
            style="font-size:15px"
            variant="success"
            pill
          >{{ currentGameTicket ? player.purchasedTicket.number2 : 0 }}
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
import { mapState, mapMutations, mapGetters } from 'vuex';
import truffleContract from '@/web3/truffleContract';

export default {
  computed: {
    ...mapState('game', {
      game: state => state,
      lucky7GameInfo: state => state.lucky7GameInfo,
      lucky7GameInfoReady: state => state.lucky7GameInfoReady,
    }),
    ...mapState(['player', 'web3']),
    ...mapGetters('player', ['currentProvider']),
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
      const contract = await truffleContract(this.currentProvider).deployed();
      const pastPurchaseParameters = await contract.getPastEvents('NewTicketReceived', { fromBlock: 0, filter: { owner: this.web3.coinbase } });
      if (pastPurchaseParameters.length) {
        const { ticketValue, mu, i, ticketID, owner, gameID } = pastPurchaseParameters[`${pastPurchaseParameters.length - 1}`].returnValues;
        const payload = { ticketValue, mu, i, ticketID, owner, gameID, lucky7GameInfo: this.lucky7GameInfo };
        this.recoverPurchasedParameters(payload);
      }
    },
  },
  methods: {
    ...mapMutations('player', ['recoverPurchasedParameters']),
  },
};
</script>
