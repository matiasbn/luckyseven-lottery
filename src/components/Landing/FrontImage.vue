<template>
  <div>
    <b-jumbotron
      header="Lucky7"
      lead="Fully decentralized lottery based on Ethereum Blockchain"
      class="headimage">
      <b-button
        pill
        variant="warning"
        @click="$router.push('/rules')">Checkout the rules!</b-button>
    </b-jumbotron>
  </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Monoton|Press+Start+2P&display=swap');
    .headimage{
        border: 0px !important;
        text-align: center;
        background-image: url("../../assets/header.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        color: white;
        height: 1000px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        margin-bottom: 0%;
    }
    .display-3{
        font-size: 7rem !important;
        font-family: 'Monoton', cursive !important;
    }
    .lead{
        font-size: 1.5rem;
        font-family: 'Press Start 2P', cursive;
    }
</style>
