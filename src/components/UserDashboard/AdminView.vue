<template>
  <b-card-group deck>

    <b-card
      v-if="isAdmin"
      :footer="adminFooter"
      header= "Set Lucky7Numbers"
      header-tag="h2">
      <b-card-text>
        Sets a list of predefined Lucky7Numbers and enables the game to sell tickets.
        This option exists only for test purposes and would be deleted from
        the smart contracts once the dApp is deployed to Main-net.
      </b-card-text>
      <b-button
        v-if="buttonsEnabled"
        :disabled="!game.settings.storeEnabled"
        variant="success"
        @click="setLucky7Numbers">Set Lucky7Numbers</b-button>
      <b-spinner
        v-else
        variant="success"
        label="Spinning"/>
    </b-card>

    <b-card
      v-if="isAdmin"
      :footer="adminFooter"
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

  </b-card-group>
</template>

<script>
/* eslint-disable max-len */
import truffleContract from '@/web3/truffleContract';
import { mapState, mapGetters } from 'vuex';
import transactions from '@/web3/transactions';

export default {
  data() {
    return {
      adminFooter: '(For testing purposes) If you can see this option, is because you current account is the contract owner',
      contractOwner: '',
      coinbase: '',
      buttonsEnabled: true,
    };
  },
  computed: {
    ...mapState(['game']),
    ...mapGetters('player', ['currentProvider']),
    setTitle() {
      return this.isAdmin ? 'Admin dashboard' : 'User dashboard';
    },
    isAdmin() {
      return String(this.$store.state.web3.coinbase).toUpperCase() === String(this.contractOwner).toUpperCase();
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
    async setLucky7Numbers() {
      try {
        this.buttonsEnabled = false;
        await transactions.setLucky7Numbers(this.$store.state);
        this.buttonsEnabled = true;
      } catch (e) {
        this.buttonsEnabled = true;
        console.log(e);
      }
    },
  },
};
</script>
