<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <Store/>
      </b-col>
      <b-col>
        <LastGeneratedTicket/>
      </b-col>
      <b-col>
        <LastPurchasedTicket/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <CurrentGame/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Web3 from 'web3';
import { mapState, mapMutations, mapGetters } from 'vuex';
import CurrentGame from '@/components/Lottery/CurrentGame';
import Store from '@/components/Lottery/Store';
import LastGeneratedTicket from '@/components/Lottery/LastGeneratedTicket';
import LastPurchasedTicket from '@/components/Lottery/LastPurchasedTicket';

export default {
  components: {
    CurrentGame,
    Store,
    LastGeneratedTicket,
    LastPurchasedTicket,
  },
  computed: {
    ...mapState({
      account: state => state.web3.coinbase,
      balance: state => state.web3.balance,
      isConnected: state => state.web3.isConnected,
      sessionProvider: state => state.player.session.provider,
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
