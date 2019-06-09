<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>
<script>

import pollWeb3 from '@/web3/pollWeb3';
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    Header,
  },
  beforeCreate() {
    this.$store.dispatch('registerWeb3');
    this.$store.dispatch('retrieveGameInformation');
    pollWeb3();
  },
  beforeMount() {
    this.$store.dispatch('listenEvents', this.$store.state.web3.coinbase);
  },
};
</script>

<style>
  html{
    display:inline-block;
    box-sizing:content-box !important;
    padding-top: 50px;
  }
</style>
