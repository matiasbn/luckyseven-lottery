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
    background-image: url('./assets/background.png') !important;
    /* background-color: black; */
  }
  .badge-success{
    background-color: rgb(24,24,29);
  }
  .card{
    font-family: 'Cinzel', serif !important;
    /* border-color:rgba(255, 255, 0, 0.473) !important; */
    text-align: center;
  }
  .card-body{
    background-color:black;
    color:rgba(255, 255, 0, 0.411);
    border-top-color: rgba(255, 255, 0, 0.7);
  }
  .card-footer{
    font-family: 'Cinzel', serif !important;
    color: rgba(255, 255, 0, 0.7);
  }
  .card-header{
    font-family: 'Cinzel', serif !important;
    background-color: rgb(36, 32, 32) !important;
    /* color: rgba(255, 255, 0, 0.7); */
    color: white;
  }
  .card-title{
    font-family: 'Cinzel', serif !important;
  }
  .card-text{
    font-family: 'Cinzel', serif !important;
  }
  .container-fluid{
    padding:0;
  }
  .display-3{
      font-size: 6rem !important;
      font-family: 'Monoton', cursive !important;
  }
  .game-rules-separator{
      font-size: 3rem !important;
      font-family: 'Cinzel', serif !important;
      color:rgba(255, 255, 0, 0.411);
      text-align: center;
      margin: 30px;
  }
  .intro{
      text-align: center;
      color:rgba(255, 255, 0, 0.411);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      border: 0px !important;
      background-origin: padding-box;
      padding-bottom: 0;
  }
  .intro-image{
    text-align: center;
    color: white;
    background-image: url("./assets/header.jpg") !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
    background-attachment: fixed !important;
    background-size: cover !important;
    height: 750px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    -webkit-background-size:cover;
    -moz-background-size:cover;
    -o-background-size:cover;
    background-size:cover;
  }
  .intro-text{
      font-family: 'Cinzel', serif !important;
  }
  .jumbotron{
    margin-bottom: 0;
    border-radius: 0;
    background: transparent;
    width:100% !important;
  }
  .lead{
      font-size: 1.5rem;
      font-family: 'Cinzel', serif;
      margin-bottom: 3.5rem;
  }
  .list-group-item{
    background-color: black;
    color: rgba(255, 255, 0, 0.473);
    font-family: 'Cinzel', serif !important;
    border-color:rgba(255, 255, 0, 0.473);
  }
  .login-cancel-button{
    font-family: 'Cinzel', serif !important;
  }
  .lottery-element{
    margin: 20px;
  }
  .lucky7-ticket{
    border: 0px !important;
  }
  .metamask-button{
    background-color: rgb(167, 68, 2);
    border-color: rgb(167, 68, 2);
  }
  .modal-content{
    background-color: black;
    color: rgba(253, 253, 132, 0.411);
    font-size: 12px;
    font-family: 'Cinzel', serif !important;
    border-color:rgba(253, 253, 132, 0.411);
  }
  .navbar-dark .navbar-brand{
    opacity: 0.7;
    color: rgba(253, 253, 132, 0.7) !important;
  }
  .table{
    margin-bottom: 0px !important;
  }
  th{
    background-color: rgb(44, 38, 38);
    color: rgba(255, 255, 0, 0.473);
    font-size: 15px;
    font-family: 'Cinzel', serif !important;
    font-weight: bold;
    /* border-color:rgba(255, 255, 0, 0.473) !important; */
    border-color:white !important;
    border-bottom: 0 !important;
  }
  td{
    background-color: black;
    color: rgba(255, 255, 0, 0.473);
    font-family: 'Cinzel', serif !important;
    font-size: 15px;
    font-weight: bold;
    /* border-color:rgba(255, 255, 0, 0.473) !important; */
    border-color:white !important;
  }
  .page-title{
    font-family: 'Monoton', cursive !important;
    font-size: 100px !important;
    margin-top: 30px;
    margin-bottom: 0px;
  }
  .paper-text{
    color: rgba(255, 255, 0, 0.473);
    font-size: 20px !important;
    font-family: 'Cinzel', serif !important;
    text-align: center !important;
    justify-content: center !important;
  }
  .uport-botton{
    background-color: rgb(119,83,221);
    border-color: rgb(119,83,221);
  }
</style>
