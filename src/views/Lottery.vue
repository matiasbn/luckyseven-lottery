<template>
  <div
    class="main-container">
    <b-row>
      <b-col>
        <TicketStore />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <CurrentGame />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Web3 from 'web3';
import { mapState, mapMutations, mapGetters } from 'vuex';
import CurrentGame from '@/components/Lottery/CurrentGame';
import TicketStore from '@/components/Lottery/TicketStore';

export default {
  components: {
    CurrentGame,
    TicketStore,
  },
  computed: {
    ...mapState({
      account: state => state.web3.coinbase,
      balance: state => state.web3.balance,
      isConnected: state => state.web3.isConnected,
    }),
    ...mapGetters('player', ['currentProvider']),
  },
  beforeCreate() {

  },
  async mounted() {
    // To detect changes on MetaMask accounts
    if (this.sessionProvider === 'metamask') {
      const web3 = new Web3(this.currentProvider);
      setInterval(async () => {
        try {
          if (web3 && this.isConnected) {
            const web3Coinbase = await web3.eth.getCoinbase();
            const web3Balance = await web3.eth.getBalance(web3Coinbase);
            if (web3Coinbase !== this.account || web3Balance !== this.balance) {
              this.pollWeb3({
                coinbase: web3Coinbase,
                balance: web3Balance,
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      }, 2000);
    }
  },
  methods: {
    ...mapMutations('web3', ['pollWeb3']),
  },
};
</script>

<style>
  .row {
    margin:20px;
  }
</style>
