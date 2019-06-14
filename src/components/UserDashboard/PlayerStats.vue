<template>
  <div>
    <b-card-group deck>
      <b-card
        header="Your account"
        header-tag="h2"
      >
        <b-card-text text-tag="h4">{{ account }}</b-card-text>
      </b-card>
      <b-card
        header="Your balance"
        header-tag="h2"
      >
        <b-card-text text-tag="h4">{{ balance | transformBalance }} ETH</b-card-text>
      </b-card>
      <b-card
        header="Your current prize"
        header-tag="h2">
        <b-card-text text-tag="h4">{{ currentPrize.amount | transformBalance }} ETH</b-card-text>
        <b-button
          variant="success"
          @click="claimPrize">
          Claim your prize now!
        </b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable max-len */
import Web3 from 'web3';
import { mapState } from 'vuex';
import truffleContract from '../../web3/truffleContract';


export default {
  filters: {
    transformBalance(balance) {
      const web3 = new Web3();
      let stringBalance = String(parseInt(balance, 10));
      if (isNaN(balance)) {
        stringBalance = '0';
      }
      return parseFloat(web3.utils.fromWei(stringBalance, 'ether'), 10).toFixed(4);
    },
  },
  computed: {
    ...mapState({
      account: state => state.web3.coinbase,
      balance: state => state.web3.balance,
      currentPrize: state => state.player.currentPrize,
    }),
  },
  methods: {
    async claimPrize() {
      try {
        const contractInstance = await truffleContract(window.web3.currentProvider).deployed();
        await contractInstance.withdraw({ from: this.$store.state.web3.coinbase });
      } catch (e) {
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
