<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="success"
      fixed="top">
      <b-navbar-brand to="/">Lucky7</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"/>

      <b-collapse
        id="nav-collapse"
        is-nav>
        <b-navbar-nav>
          <b-nav-item to="/rules">Rules</b-nav-item>
          <b-nav-item to="/prng">How numbers are generated</b-nav-item>
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
              class="my-2 my-sm-0"
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
