<template>
  <div>
    <b-card-group deck>
      <b-card
        header="Your account"
        header-tag="h2"
      >
        <b-card-text text-tag="h4">
          {{ account }}
        </b-card-text>
      </b-card>
      <b-card
        header="Your balance"
        header-tag="h2"
      >
        <b-card-text text-tag="h4">
          {{ balance | transformBalance }} ETH
        </b-card-text>
      </b-card>
      <b-card
        header="Your current prize"
        header-tag="h2">
        <b-card-text
          v-if="withdrawReady"
          text-tag="h4">
          {{ currentPrize |transformBalance }} ETH <br><br>
          <b-button
            :disabled="!currentGamePrize"
            variant="success"
            @click="claimPrize">
            Claim your prize now!
          </b-button>
        </b-card-text>
        <b-spinner
          v-else
          variant="success"
          label="Spinning"/>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable max-len */
import Web3 from 'web3';
import { mapState } from 'vuex';
import truffleContract from '@/web3/truffleContract';

const web3 = new Web3();

export default {
  filters: {
    transformBalance(balance) {
      let stringBalance = String(parseInt(balance, 10));
      if (isNaN(balance)) {
        stringBalance = '0';
      }
      return parseFloat(web3.utils.fromWei(stringBalance, 'ether'), 10).toFixed(4);
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
      prizeAmount: state => state.player.prizeAmount,
      prizeGameID: state => state.player.prizeGameID,
      gameID: state => state.game.settings.gameID,
    }),
  },
  watch: {
    async gameID() {
      this.refreshCurrentPrize();
    },
    async account() {
      this.refreshCurrentPrize();
    },
  },
  async created() {
    this.refreshCurrentPrize();
  },
  async mounted() {
    this.refreshCurrentPrize();
  },
  methods: {
    async claimPrize() {
      try {
        const contractInstance = await truffleContract(window.web3.currentProvider).deployed();
        this.withdrawReady = false;
        await contractInstance.withdraw({ from: this.$store.state.web3.coinbase });
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
        const contractInstance = await truffleContract(window.web3.currentProvider).deployed();
        this.withdrawReady = false;
        const currentPrize = await contractInstance.pendingWithdrawals(window.web3.currentProvider.selectedAddress);
        const gameID = await contractInstance.gameID();
        this.currentGamePrize = (currentPrize.gameID.toNumber() + 1 === gameID.toNumber()) && (currentPrize.amount.toString() !== '0');
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

<style scoped>
  .card{
    text-align:center;
    margin: 20px;
  }
</style>
