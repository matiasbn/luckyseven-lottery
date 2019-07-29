<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="success"
      class="nav-bar-style"
      fixed="top">
      <b-navbar-brand
        class="main-button"
        to="/">Lucky7</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"/>

      <b-collapse
        id="nav-collapse"
        is-nav>
        <b-navbar-nav>
          <b-nav-item to="/howworks">How Lucky7 works</b-nav-item>
          <b-nav-item to="/prng">How the numbers are generated</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav
          class="ml-auto"
          right>
          <b-nav-item to="/lottery">Lottery</b-nav-item>
          <b-nav-item
            to="/game_stats" >
            Game stats
          </b-nav-item>
          <b-nav-item to="/user_dashboard">User</b-nav-item>
          <b-nav-item to="/">
            <b-button
              v-if="isLoggedIn && provider === 'uport'"
              size="sm"
              class="my-2 my-sm-0 uport-button"
              type="submit"
              @click="$store.dispatch('player/uportLogout',{root:true})">
              <img
                src="@/assets/uport-logo.svg"
                width="20"
                height="20" > &nbsp;|&nbsp;
              <span v-if="loading === false">Logout</span>
              <b-spinner
                v-if="loading === true"
                variant="success"
                small />
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default{
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.player.session.isLoggedIn,
      provider: state => state.player.session.provider,
    }),
  },
};
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Cinzel|Monoton&display=swap');
  .main-button{
    font-family: 'Monoton', cursive !important;
  }
  .uport-button{
    background-color: rgb(119,83,221) !important;
    border-color: rgb(119,83,221) !important;
  }
  .nav-bar-style{
    font-family: 'Cinzel', serif !important;
  }
  .navbar{
    opacity: 50%;
  }
</style>
