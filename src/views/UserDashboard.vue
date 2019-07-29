<template>
  <b-container fluid>
    <br>
    <AdminView/>
    <PlayerStats/>
    <PlayerTickets/>
    <br>
    <PlayerPrizes/>
  </b-container>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */

import truffleContract from '@/web3/truffleContract';
import AdminView from '@/components/UserDashboard/AdminView';
import PlayerStats from '@/components/UserDashboard/PlayerStats';
import PlayerTickets from '@/components/UserDashboard/PlayerTickets';
import PlayerPrizes from '@/components/UserDashboard/PlayerPrizes';
import { mapGetters } from 'vuex';

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
  },
  async updated() {
    const contractInstance = await truffleContract(this.currentProvider).deployed();
    this.contractOwner = await contractInstance.owner();
  },
};
</script>

<style>
    .card{
      text-align: center;
    }
</style>
