<template>
  <div>
    <b-card
      header="Choose your preferred login method"
      header-tag="h1"
      align="center">
      <b-button
        :disabled="loading === true"
        size="lg"
        class="my-2 my-sm-0"
        type="submit"
        @click="login(uport)">
        <img
          src="@/assets/uport-logo.svg"
          width="25"
          height="25" > &nbsp;|&nbsp;
        <span v-if="loading === false">Log in with uPort</span>
        <b-spinner
          v-if="loading === true"
          variant="success"
          small />
      </b-button> <br><br>
      <b-button
        :disabled="loading === true"
        size="lg"
        class="my-2 my-sm-0"
        type="submit"
        @click="login(metamask)">
        <img
          src="@/assets/metamask-logo.png"
          width="25"
          height="25" > &nbsp;|&nbsp;
        <span v-if="loading === false">Log in with Metamask</span>
        <b-spinner
          v-if="loading === true"
          variant="success"
          small />
      </b-button> <br><br>
      <b-button
        variant="success"
        size="lg"
        @click="cancel">
        Cancel
      </b-button>

    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      network: state => state.web3.network,
    }),
  },
  methods: {
    async login(method) {
      console.log(method);
      try {
        this.loading = true;
        await this.$store.dispatch('auth/USER_LOGIN', this.network);
        this.loading = false;
        this.$router.push('/profile');
      } catch (e) {
        this.$root.$emit('alert', {
          countdown: 5,
          color: 'danger',
          message: e.message,
        });
        console.log(e);
      }
    },
    cancel() {
      this.$router.push('/');
    },
  },
};
</script>
