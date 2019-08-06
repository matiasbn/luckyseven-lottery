<template>
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
            v-b-popover.hover="refreshInformationToolTip"
            title="What are you refreshing?"
            variant="success"
            @click="refreshInformation">Refresh</b-button>
        </h6>
      </b-list-group-item>


    </b-list-group>
  </b-card>


</template>

<script>
/* eslint-disable max-len */
import truffleContract from '@/web3/truffleContract';
import { mapState, mapGetters } from 'vuex';
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
      expectedPrize: '0',
      expectedGameTime: 0,
      lastDelivery: 0,
      currentPot: '0',
    };
  },
  computed: {
    ...mapState(['game']),
    ...mapState({
      gameID: state => state.game.settings.gameID,
      waitingLucky7Number: state => state.game.waitingLucky7Number,
    }),
    ...mapGetters('player', ['currentProvider']),
  },
  watch: {
    gameID() {
      this.refreshInformation();
    },
  },
  async created() {
    this.refreshInformation();
  },
  async mounted() {
    this.refreshInformation();
  },
  methods: {
    refreshInformationToolTip() {
      return 'Current pot and next delivery, according to blockchain data, so you can set new game when is available';
    },
    async refreshInformation() {
      const contractInstance = await truffleContract(this.currentProvider).deployed();
      this.expectedPrize = await contractInstance.expectedPrize();
      this.expectedGameTime = (await contractInstance.expectedGameTime()).toNumber();
      this.lastDelivery = (await contractInstance.lastDelivery()).toNumber();
    },
  },
};
</script>

