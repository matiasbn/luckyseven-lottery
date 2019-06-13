<template>
  <div>
    <b-card
      :title="setTitle"/>
    <b-card-group deck>

      <b-card
        v-if="isAdmin"
        :footer="adminFooter"
        header= "Set Lucky7Numbers (for testing purposes)"
        header-tag="h2">
        <b-card-text>
          Sets a list of predefined Lucky7Numbers and enables the game to sell tickets.
          This option exists only for test purposes and would be deleted from
          the smart contracts once the dApp is deployed to Main-net.
        </b-card-text>
        <b-button
          variant="success"
          @click="setLucky7Numbers">Set Lucky7Numbers</b-button>
      </b-card>

      <b-card
        v-if="isAdmin"
        :footer="adminFooter"
        header= "Start new game (for testing purposes)"
        header-tag="h2">
        <b-card-text>
          Push this button to start a new game.
          Doing this, Lucky7Numbers are going to be setted to 0, the prizes would be delivered,
          and Lucky7Tickets would be saved on blokchain.
        </b-card-text>
        <b-button
          variant="success"
          @click="setNewGame">Start new game</b-button>
      </b-card>

    </b-card-group>
  </div>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */

import { mapGetters } from 'vuex';
import truffleContract from '../web3/truffleContract';

export default {
  data() {
    return {
      adminFooter: 'If you can see this option, is because you current account is the contract owner',
      contractInstance: null,
      contractOwner: '',
      coinbase: '',
    };
  },
  computed: {
    ...mapGetters(['isAdmin']),
    setTitle() {
      return this.isAdmin ? 'Admin dashboard' : 'User dashboard';
    },
    isAdmin() {
      return String(this.$store.state.web3.coinbase).toUpperCase() === String(this.contractOwner).toUpperCase();
    },
  },
  async beforeCreate() {
    const contractInstance = await truffleContract(window.web3.currentProvider).deployed();
    this.contractInstance = contractInstance;
    this.contractOwner = await contractInstance.owner();
    this.coinbase = this.$store.state.web3.coinbase;
  },
  methods: {
    async setNewGame() {
      await this.contractInstance.setNewGame({ from: this.coinbase });
    },
    async setLucky7Numbers() {
      const values = [1293812983, 2139812893, 3237182731, 4224567890, 5224567890, 6123819273, 7939871237];
      await this.contractInstance.insertLucky7Numbers(values, { from: this.coinbase });
    },
  },
};
</script>
