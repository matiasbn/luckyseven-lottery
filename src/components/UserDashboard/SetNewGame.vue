<template>
  <b-card
    header= "Start new game"
    header-tag="h2">
    <b-card-text>
      Set a new game and win a prize of {{ newGameSettedPrize | toEther }} ether. <br>
      This action would be available when a total pot of {{ expectedPrize | toEther }} ether is reached and
      {{ expectedGameTime | formatTime }} have elapsed since last prizes delivery.
    </b-card-text>
    <b-button
      v-if="buttonsEnabled"
      :disabled="!potReached || !timeReached || game.settings.storeEnabled"
      variant="success"
      @click="setNewGame">Start new game</b-button>
    <b-spinner
      v-else
      variant="success"
      label="Spinning"/>
  </b-card>
</template>

<script>
/* eslint-disable max-len */
import truffleContract from '@/web3/truffleContract';
import { mapState, mapGetters } from 'vuex';
import transactions from '@/web3/transactions';
import Web3 from 'web3';
import prettyMilliseconds from 'pretty-ms';

const web3 = new Web3();

export default {
  filters: {
    toEther(weiBalance) {
      return web3.utils.fromWei(weiBalance, 'ether');
    },
    formatTime(seconds) {
      return prettyMilliseconds(seconds * 1000, { verbose: true });
    },
  },
  data() {
    return {
      contractOwner: '',
      coinbase: '',
      buttonsEnabled: true,
      newGameSettedPrize: '0',
      newLucky7NumberPrize: '0',
      expectedPrize: '0',
      expectedGameTime: 0,
      lastDelivery: 0,
      currentPot: '0',
      potReached: false,
      timeReached: false,
    };
  },
  computed: {
    ...mapState(['game']),
    ...mapState({
      gameID: state => state.game.settings.gameID,
      waitingLucky7Number: state => state.game.waitingLucky7Number,
    }),
    ...mapGetters('player', ['currentProvider']),
    setTitle() {
      return this.isAdmin ? 'Admin dashboard' : 'User dashboard';
    },
  },
  watch: {
    gameID() {
      this.retrieveGameInformation();
    },
  },
  async created() {
    this.retrieveGameInformation();
  },
  async mounted() {
    this.retrieveGameInformation();
  },
  methods: {
    refreshInformation() {
      return 'Current pot and next delivery, according to blockchain data, so you can set new game when is available';
    },
    async retrieveGameInformation() {
      const contractInstance = await truffleContract(this.currentProvider).deployed();
      this.contractOwner = await contractInstance.owner();
      this.coinbase = this.$store.state.web3.coinbase;
      this.newGameSettedPrize = await contractInstance.newGameSettedPrize();
      this.newLucky7NumberPrize = await contractInstance.newLucky7NumberPrize();
      this.expectedPrize = await contractInstance.expectedPrize();
      this.expectedGameTime = (await contractInstance.expectedGameTime()).toNumber();
      this.lastDelivery = (await contractInstance.lastDelivery()).toNumber();
      this.validateDelivery = await contractInstance.validateDelivery();
      this.currentPot = this.validateDelivery['0'];
      this.potReached = this.validateDelivery['1'];
      this.timeReached = this.validateDelivery['2'];
    },
    async setNewGame() {
      try {
        this.buttonsEnabled = false;
        await transactions.setNewGame(this.$store.state);
        this.buttonsEnabled = true;
      } catch (e) {
        this.buttonsEnabled = true;
        console.log(e);
      }
    },
    async generateLucky7Number() {
      try {
        this.buttonsEnabled = false;
        this.$store.state.game.waitingLucky7Number = true;
        await transactions.generateLucky7Number(this.$store.state);
        this.buttonsEnabled = true;
      } catch (e) {
        this.$store.state.game.waitingLucky7Number = false;
        this.buttonsEnabled = true;
        console.log(e);
      }
    },
  },
};
</script>

