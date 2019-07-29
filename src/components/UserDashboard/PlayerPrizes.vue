<template>
  <b-container fluid>
    <b-card
      v-if="valuesReady"
      header="Your claimed prizes"
      header-tag="h2"
      no-body>
      <b-table
        :items="playerPrizes"
        :fields="fields"
        striped
        hover
        responsive
        bordered
      />
    </b-card>
    <b-card
      v-else>
      <b-spinner
        variant="success"
        label="Spinning"/>
    </b-card>
  </b-container>
</template>
<script>

import truffleContract from '@/web3/truffleContract';
import { mapState, mapGetters } from 'vuex';
import Web3 from 'web3';


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
    ...mapState('web3', {
      balance: state => state.balance,
      coinbase: state => state.coinbase,
    }),
    ...mapGetters('player', ['currentProvider']),
  },
  watch: {
    // eslint-disable-next-line consistent-return
    balance() {
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
      const web3 = new Web3();
      try {
        this.valuesReady = false;
        const playerPrizesArray = [];
        const contract = await truffleContract(this.currentProvider).deployed();
        const playerPrizes = await contract.getPastEvents('PrizeClaimed', { fromBlock: 0, filter: { owner: this.coinbase } });
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
