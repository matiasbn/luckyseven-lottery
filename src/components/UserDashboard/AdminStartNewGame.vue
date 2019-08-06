<template>
  <b-card
    v-if="isAdmin && isLocalBlockchain"
    :footer="adminFooter"
    footer-bg-variant="success"
    header= "Start new game"
    header-tag="h2">
    <b-card-text>
      Push this button to start a new game.
      Doing this, Lucky7Numbers are going to be setted to 0, the prizes would be delivered,
      and Lucky7Tickets would be saved on blokchain.
    </b-card-text>
    <b-button
      v-if="buttonsEnabled"
      :disabled="game.settings.storeEnabled"
      variant="success"
      @click="setNewGame">Start new game</b-button>
    <b-spinner
      v-else
      variant="success"
      label="Spinning"/>
  </b-card>

</template>

<script>
/* eslint-disable max-len */
import truffleContract from '@/web3/truffleContract';
import { mapState, mapGetters } from 'vuex';
import transactions from '@/web3/transactions';

export default {
  data() {
    return {
      adminFooter: 'If you can see this widget, is because you current account is the contract owner and Lucky7 is running on local blockchain',
      contractOwner: '',
      coinbase: '',
      buttonsEnabled: true,
    };
  },
  computed: {
    ...mapState(['game']),
    ...mapGetters('player', ['currentProvider']),
    isAdmin() {
      return String(this.$store.state.web3.coinbase).toUpperCase() === String(this.contractOwner).toUpperCase();
    },
    isLocalBlockchain() {
      return this.currentProvider.networkVersion === '7';
    },
  },
  async created() {
    const contractInstance = await truffleContract(this.currentProvider).deployed();
    this.contractOwner = await contractInstance.owner();
    this.coinbase = this.$store.state.web3.coinbase;
  },
  async updated() {
    const contractInstance = await truffleContract(this.currentProvider).deployed();
    this.contractOwner = await contractInstance.owner();
    this.coinbase = this.$store.state.web3.coinbase;
  },
  methods: {
    async setNewGame() {
      try {
        this.buttonsEnabled = false;
        await transactions.setNewGame(this.$store.state);
        this.buttonsEnabled = true;
      } catch (e) {
        this.buttonsEnabled = true;
        console.log(e);
      }
    },
  },
};
</script>
