<template>
  <div>
    <b-card
      :header="setTitle"
      header-tag="h2">
      <AdminView/>
      <PlayerStats/>
      <PlayerTickets/>
      <PlayerPrizes/>
    </b-card>
  </div>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */

import truffleContract from '@/web3/truffleContract';
import AdminView from './UserDashboard/AdminView';
import PlayerStats from './UserDashboard/PlayerStats';
import PlayerTickets from './UserDashboard/PlayerTickets';
import PlayerPrizes from './UserDashboard/PlayerPrizes';

export default {
  components: {
    AdminView,
    PlayerStats,
    PlayerTickets,
    PlayerPrizes,
  },
  data() {
    return {
      contractOwner: '0',
    };
  },
  computed: {
    setTitle() {
      return this.isAdmin ? 'Admin dashboard' : 'User dashboard';
    },
    isAdmin() {
      return String(this.$store.state.web3.coinbase).toUpperCase() === String(this.contractOwner).toUpperCase();
    },
  },
  async beforeCreate() {
    const contractInstance = await truffleContract(window.web3.currentProvider).deployed();
    this.contractOwner = await contractInstance.owner();
  },
  async updated() {
    const contractInstance = await truffleContract(window.web3.currentProvider).deployed();
    this.contractOwner = await contractInstance.owner();
  },
};
</script>

<style>
    .card{
      text-align: center;
    }
</style>
