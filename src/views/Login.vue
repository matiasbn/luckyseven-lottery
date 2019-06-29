<template>
  <div>
    <b-card
      header="Choose your preferred login method"
      header-tag="h1"
      align="center">
      <b-card-group deck>
        <b-card
          header="uPort"
          header-tag="h1">
          <b-card-text
            text-tag="h4">
            To login with uPort you should pick your preferred network
          </b-card-text>
          <b-form-select
            v-model="selected"
            :options="options"
            size="lg"
            @change="$store.commit('player/selectNetwork', selected)"
          />
          <br> <br>
          <b-button
            :disabled="loading === true"
            size="lg"
            class="my-2 my-sm-0"
            type="submit"
            @click="login('uport')">
            <img
              src="@/assets/uport-logo.svg"
              width="25"
              height="25" > &nbsp;|&nbsp;
            <span v-if="loading === false">Log in with uPort</span>
            <b-spinner
              v-if="loading === true"
              variant="success"
              small />
          </b-button>
        </b-card>
        <b-card
          header="Metamask"
          header-tag="h1">
          <b-card-text
            text-tag="h4">
            If you choose Metamask, you can choose your preferred network from the Metamask panel
          </b-card-text>
          <b-button
            :disabled="loading === true"
            size="lg"
            class="my-2 my-sm-0"
            type="submit"
            @click="login('metamask')">
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
        </b-card>
      </b-card-group>
      <br><br>
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
export default {
  data() {
    return {
      loading: false,
      showNetworks: false,
      selected: { id: '0x7', rpcUrl: 'https://fbfeea33.ngrok.io' },
      options: [
        {
          value: { id: '0x7', rpcUrl: 'https://fbfeea33.ngrok.io' },
          text: 'Local Network',
        },
        {
          value: { id: '0x4', rpcUrl: 'https://rinkeby.infura.io' },
          text: 'Rinkeby',
        },
      ],
    };
  },
  mounted() {
    this.$store.commit('player/selectNetwork', this.selected);
  },
  methods: {
    async login(method) {
      try {
        this.loading = true;
        if (method === 'uport') {
          await this.$store.dispatch('player/uportLogin');
          this.loading = false;
          this.$router.push('/lottery');
        } else {
          // await this.$store.dispatch('metamaskLogin');
          this.loading = false;
          this.$router.push('/lottery');
        }
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },
    cancel() {
      this.$router.push('/');
    },
  },
};
</script>
