<template>
  <b-card-group deck>
    <b-card
      header="Your claimed prizes"
      header-tag="h2">
      <b-table
        v-if="valuesReady"
        :items="playerPrizes"
        :fields="fields"
        striped
        hover
        responsive
        bordered
      />
      <b-spinner
        v-else
        variant="success"
        label="Spinning"/>
    </b-card>
  </b-card-group>
</template>
<script>

import truffleContract from '@/web3/truffleContract';
import { mapState } from 'vuex';
import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);

export default {
  data() {
    return {
      fields: [
        { key: 'gameID', label: 'Game ID' },
        { key: 'prize', label: 'Prize' },
        { key: 'transactionHash', label: 'Transaction Hash' },
      ],
      valuesReady: true,
      playerPrizes: [],
    };
  },
  computed: {
    ...mapState({
      balance: state => state.web3.balance,
      coinbase: state => state.web3.coinbase,
    }),
  },
  watch: {
    // eslint-disable-next-line consistent-return
    async balance() {
      this.refreshPrizes();
    },
    async coinbase() {
      this.refreshPrizes();
    },
  },
  // eslint-disable-next-line consistent-return
  async created() {
    this.refreshPrizes();
  },
  methods: {
    // eslint-disable-next-line consistent-return
    async refreshPrizes() {
      try {
        this.valuesReady = false;
        const playerPrizesArray = [];
        const contract = await truffleContract(window.web3.currentProvider).deployed();
        const playerPrizes = await contract.getPastEvents('PrizeClaimed', { fromBlock: 0, filter: { owner: window.web3.currentProvider.selectedAddress } });
        playerPrizes.forEach((lucky7Prize) => {
          const prize = lucky7Prize.returnValues;
          const row = {
            gameID: prize.gameID,
            prize: `${web3.utils.fromWei(prize.amount, 'ether')} ETH`,
            transactionHash: lucky7Prize.transactionHash,
          };
          playerPrizesArray.push(row);
        });
        this.valuesReady = true;
        this.playerPrizes = playerPrizesArray;
      } catch (e) {
        this.valuesReady = true;
        console.log(e);
        return [];
      }
    },
  },
};
</script>
