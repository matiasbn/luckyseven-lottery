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
  @import url('https://fonts.googleapis.com/css?family=Cinzel|Monoton&display=swap');
  html{
    display:inline-block;
    box-sizing:content-box !important;
    padding-top: 50px;
  }
  body{
    background-color: rgb(24,24,29);
  }
  .card{
    font-family: 'Cinzel', serif !important;
    border-color:rgba(255, 255, 0, 0.473) !important;
    text-align: center;
  }
  .card-header{
    background-color: #343a40 !important;
    color: white;
    font-family: 'Cinzel', serif !important;
    border-color:rgba(255, 255, 0, 0.473) !important;
  }
  .card-body{
    background-color: black;
    color: rgba(255, 255, 0, 0.473);
    font-family: 'Cinzel', serif !important;
    border-color:rgba(255, 255, 0, 0.473) !important;
    border-width: 1px;
  }
  .list-group-item{
    background-color: black;
    color: rgba(255, 255, 0, 0.473);
    font-family: 'Cinzel', serif !important;
    border-color:rgba(255, 255, 0, 0.473);
  }
  .modal-content{
    background-color: black;
    color: rgba(255, 255, 0, 0.473);
    font-size: 12px;
    font-family: 'Cinzel', serif !important;
    border-color:rgba(255, 255, 0, 0.473) !important;
  }
  th{
    background-color: black;
    color: rgba(255, 255, 0, 0.473);
    font-size: 12px;
    font-family: 'Cinzel', serif !important;
    font-weight: bold;
    border-color:rgba(255, 255, 0, 0.473) !important;
  }
  td{
    background-color: black;
    color: rgba(255, 255, 0, 0.473);
    font-family: 'Cinzel', serif !important;
    font-size: 12px;
    font-weight: bold;
    border-color:rgba(255, 255, 0, 0.473) !important;
  }
  .lottery-element{
    margin: 20px;
  }
  .table{
    margin-bottom: 0px !important;
  }
  h4.game-rules-separator{
    font-size: 3rem !important;
    color:rgba(255, 255, 0, 0.473);
    font-family: 'Cinzel', serif !important;
    text-align: center;
  }
</style>
