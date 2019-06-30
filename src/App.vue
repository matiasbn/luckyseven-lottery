<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>
<script>

import Header from '@/views/Header';

export default {
  name: 'App',
  components: {
    Header,
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
