<template>
  <div class="main-image">
    <b-img
      :src="require('../../assets/header.jpg')"
      fluid
      class="front-image"
    />
    <h1 class="front-title">hola</h1>
  </div>
</template>

<script>
export default {

};
</script>

<style>
  .front-image{
    position:block;
  }
  .front-title{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate( -50%, -50% );
    text-align: center;
    color: white;
    font-weight: bold;
  }
</style>
