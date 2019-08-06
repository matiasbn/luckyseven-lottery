<template>
  <b-card
    header="Contract Balance"
    header-tag="h4">
    <b-card-text>
      {{ ethContractBalance }} ETH
    </b-card-text>
  </b-card>
</template>

<script>
import { mapState } from 'vuex';
import Web3 from 'web3';

export default {
  computed: {
    ...mapState(['player', 'game', 'web3']),

    ethContractBalance() {
      const web3 = new Web3();
      return web3.utils.fromWei(this.web3.contractBalance, 'ether');
    },
  },
};
</script>
