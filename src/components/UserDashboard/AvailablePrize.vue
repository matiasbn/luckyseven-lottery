<template>
  <b-card
    header="Available prize"
    header-tag="h2">
    <b-card-text
      v-if="withdrawReady"
      text-tag="h4">
      {{ currentPrize |transformBalance }} ETH <br><br>
      <b-button
        :disabled="!currentGamePrize"
        variant="success"
        @click="claimPrize">
        Get your prize now!
      </b-button>
    </b-card-text>
    <b-spinner
      v-else
      variant="success"
      label="Spinning"/>
  </b-card>

</template>

<script>
/* eslint-disable max-len */
/* eslint-disable max-len */
import Web3 from 'web3';
import { mapState, mapGetters } from 'vuex';
import truffleContract from '@/web3/truffleContract';
import transactions from '@/web3/transactions';

const web3 = new Web3();

export default {
  filters: {
    transformBalance(balance) {
      return parseFloat(web3.utils.fromWei(balance, 'ether'), 10).toFixed(4);
    },
  },
  data() {
    return {
      currentPrize: '0',
      currentGamePrize: false,
      withdrawReady: true,
    };
  },
  computed: {
    ...mapState({
      account: state => state.web3.coinbase,
      balance: state => state.web3.balance,
      gameID: state => state.game.settings.gameID,
      waitingLucky7Number: state => state.game.waitingLucky7Number,
    }),
    ...mapGetters('player', ['currentProvider']),
  },
  watch: {
    async gameID() {
      this.refreshCurrentPrize();
    },
    async account() {
      this.refreshCurrentPrize();
    },
    waitingLucky7Number() {
      this.refreshCurrentPrize();
    },
  },
  async created() {
    this.refreshCurrentPrize();
  },
  methods: {
    async claimPrize() {
      try {
        this.withdrawReady = false;
        await transactions.claimPrize(this.$store.state);
        this.currentPrize = '0';
        this.currentGamePrize = false;
        this.withdrawReady = true;
      } catch (e) {
        console.log(e);
        this.withdrawReady = true;
      }
    },
    async refreshCurrentPrize() {
      try {
        const contractInstance = await truffleContract(this.currentProvider).deployed();
        this.withdrawReady = false;
        const currentPrize = await contractInstance.pendingWithdrawals(this.account);
        const gameID = await contractInstance.gameID();
        this.currentGamePrize = (currentPrize.gameID.toNumber() === gameID.toNumber()) && (currentPrize.amount.toString() !== '0');
        this.currentPrize = this.currentGamePrize ? currentPrize.amount.toString() : '0';
        this.withdrawReady = true;
      } catch (e) {
        this.withdrawReady = true;
        console.log(e);
      }
    },
  },
};
</script>

