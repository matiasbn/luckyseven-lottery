<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <AdminSetLucky7Numbers/>
      </b-col>
      <b-col>
        <AdminStartNewGame/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <SetLucky7Number/>
      </b-col>
      <b-col>
        <SetNewGame/>
      </b-col>
      <b-col>
        <DeliveryInfo/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <UserAccount/>
      </b-col>
      <b-col>
        <ENS/>
      </b-col>
      <b-col>
        <UserBalance/>
      </b-col>
      <b-col>
        <AvailablePrize/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <PlayerTickets/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <PlayerPrizes/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */

import truffleContract from '@/web3/truffleContract';
import SetLucky7Number from '@/components/UserDashboard/SetLucky7Number';
import SetNewGame from '@/components/UserDashboard/SetNewGame';
import DeliveryInfo from '@/components/UserDashboard/DeliveryInfo';
import UserAccount from '@/components/UserDashboard/UserAccount';
import ENS from '@/components/UserDashboard/ENS';
import AdminSetLucky7Numbers from '@/components/UserDashboard/AdminSetLucky7Numbers';
import AdminStartNewGame from '@/components/UserDashboard/AdminStartNewGame';
import UserBalance from '@/components/UserDashboard/UserBalance';
import AvailablePrize from '@/components/UserDashboard/AvailablePrize';
import PlayerTickets from '@/components/UserDashboard/PlayerTickets';
import PlayerPrizes from '@/components/UserDashboard/PlayerPrizes';
import { mapGetters } from 'vuex';

export default {
  components: {
    AdminSetLucky7Numbers,
    AdminStartNewGame,
    UserBalance,
    AvailablePrize,
    PlayerTickets,
    PlayerPrizes,
    SetLucky7Number,
    SetNewGame,
    DeliveryInfo,
    UserAccount,
    ENS,
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
