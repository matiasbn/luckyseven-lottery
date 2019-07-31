<template>
  <b-container fluid>
    <b-card-group deck>

      <b-card
        header= "Set a Lucky7Number"
        header-tag="h2">
        <b-card-text>
          Set a Lucky7Number and win a prize of {{ newLucky7NumberPrize | toEther }} ether. <br>
          This action would be available when a total pot of {{ expectedPrize | toEther }} ether is reached and
          {{ expectedGameTime | formatTime }} have elapsed since last prizes delivery.
        </b-card-text>
        <b-button
          v-if="buttonsEnabled && !waitingLucky7Number"
          :disabled="!game.settings.storeEnabled"
          variant="success"
          @click="generateLucky7Number">Set a Lucky7Number</b-button>
        <b-spinner
          v-else
          variant="success"
          label="Spinning"/>
      </b-card>

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

      <b-card
        header= "Game information"
        header-tag="h2"
        no-body>
        <b-list-group fluid>
          <b-list-group-item>
            <h6>
              Last delivery:
              <b-badge
                v-if="lastDelivery !== 0"
                style="font-size:15px"
                variant="success"
                pill
              >{{ lastDelivery | secondsToDate }}
              </b-badge>

              <b-spinner
                v-else
                variant="success"
                label="Spinning"/>
            </h6>
          </b-list-group-item>
          <b-list-group-item>
            <h6>
              Expected game time:
              <b-badge
                v-if="lastDelivery !== 0"
                style="font-size:15px"
                variant="success"
                pill
              >{{ expectedGameTime | formatTime }}
              </b-badge>

              <b-spinner
                v-else
                variant="success"
                label="Spinning"/>
            </h6>
          </b-list-group-item>
          <b-list-group-item>
            <h6>
              Next delivery:
              <b-badge
                v-if="lastDelivery !== 0"
                style="font-size:15px"
                variant="success"
                pill
              >{{ lastDelivery + expectedGameTime | secondsToDate }}
              </b-badge>

              <b-spinner
                v-else
                variant="success"
                label="Spinning"/>
            </h6>
          </b-list-group-item>
        </b-list-group>

        <b-list-group horizontal>
          <b-list-group-item class="flex-fill">
            <h6>
              Current pot:
              <b-badge
                style="font-size:15px"
                variant="success"
                pill
              >{{ currentPot | toEther }} ether
              </b-badge>
            </h6>
          </b-list-group-item>
          <b-list-group-item class="flex-fill">
            <h6>
              Expected pot:
              <b-badge
                style="font-size:15px"
                variant="success"
                pill
              >{{ expectedPrize | toEther }} ether
              </b-badge>
            </h6>
          </b-list-group-item>
          <b-list-group-item class="flex-fill">
            <h6>
              Refresh information:
              <b-button
                v-b-popover.hover="refreshInformation"
                title="What are you refreshing?"
                variant="success"
                @click="retrieveGameInformation">Refresh</b-button>
            </h6>
          </b-list-group-item>


        </b-list-group>
      </b-card>

    </b-card-group>
  </b-container>
</template>

<script>
/* eslint-disable max-len */
import truffleContract from '@/web3/truffleContract';
import { mapState, mapGetters } from 'vuex';
import transactions from '@/web3/transactions';
import Web3 from 'web3';
import prettyMilliseconds from 'pretty-ms';
import dayjs from 'dayjs';

const web3 = new Web3();

export default {
  filters: {
    toEther(weiBalance) {
      return web3.utils.fromWei(weiBalance, 'ether');
    },
    formatTime(seconds) {
      return prettyMilliseconds(seconds * 1000, { verbose: true });
    },
    secondsToDate(seconds) {
      return dayjs(new Date(seconds * 1000)).format('dddd, MMMM D YYYY, h:mm:ss a');
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

