<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>
<script>

import pollWeb3 from '@/web3/pollWeb3';
import Header from '@/views/Header';

export default {
  name: 'App',
  components: {
    Header,
  },
  beforeCreate() {
    this.$store.dispatch('web3/registerWeb3');
    pollWeb3();
  },
  beforeMount() {
    this.$store.dispatch('web3/listenEvents');
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
