<template>
  <b-container>
    <h4 class="game-rules-separator">Choose your preferred login method</h4>
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
          class="my-2 my-sm-0 uport-botton"
          type="submit"
          @click="uportLogin">
          <img
            src="@/assets/uport-logo.svg"
            width="40"
            height="40" > &nbsp;|&nbsp;
          <span v-if="loading === false">Log in with uPort</span>
          <b-spinner
            v-if="loading === true"
            variant="success"
            small />
        </b-button>
      </b-card>
      <b-card
        header="MetaMask"
        header-tag="h1">
        <b-card-text
          text-tag="h4">
          You can choose your preferred network from the MetaMask panel
        </b-card-text>
        <b-button
          :disabled="loading === true"
          size="lg"
          class="my-2 my-sm-0"
          type="submit"
          @click="metamaskLogin">
          <img
            src="@/assets/metamask-big.png"
            width="40"
            height="40" > &nbsp;|&nbsp;
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
    <!-- MetaMask Modal -->
    <b-modal
      ref="metamask-modal"
      hide-footer
      title="MetaMask not detected">
      <div class="d-block text-center">
        <h3>Download the MetaMask extension clicking on the next button</h3>
      </div>
      <b-button
        class="mt-2"
        variant="success"
        block
        @click="gotToMetaMaskWebpage">Go to MetaMask
        <img
          src="@/assets/metamask-big.png"
          width="25"
          height="25"> webpage</b-button>
      <b-button
        class="mt-3"
        variant="success"
        block
        @click="hideModal">Close</b-button>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      showNetworks: false,
      selected: { id: '0x7', rpcUrl: 'https://a34b3fbf.ngrok.io' },
      options: [
        {
          value: { id: '0x7', rpcUrl: 'https://a34b3fbf.ngrok.io' },
          text: 'Local Network',
        },
        {
          value: { id: '0x4', rpcUrl: 'https://rinkeby.infura.io/v3/dc466345ecf2426d9bd6458046dce39f' },
          text: 'Rinkeby',
        },
      ],
    };
  },
  mounted() {
    this.$store.commit('player/selectNetwork', this.selected);
  },
  methods: {
    async uportLogin() {
      try {
        this.loading = true;
        await this.$store.dispatch('player/uportLogin');
        this.loading = false;
        this.$router.push('/lottery');
      } catch (e) {
        this.loading = false;
      }
    },
    async metamaskLogin() {
      try {
        this.loading = true;
        await this.$store.dispatch('player/metamaskLogin');
        this.loading = false;
        this.$router.push('/lottery');
      } catch (e) {
        console.log(e);
        this.showModal();
        this.loading = false;
      }
    },
    cancel() {
      this.$router.push('/');
    },
    showModal() {
      this.$refs['metamask-modal'].show();
    },
    hideModal() {
      this.$refs['metamask-modal'].hide();
    },
    gotToMetaMaskWebpage() {
      window.location = 'https://www.metamask.io';
    },
  },
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Cinzel|Monoton&display=swap');
  body{
    background-color: rgb(24,24,29);
    /* background-color: black; */
  }
  .card{
    font-family: 'Cinzel', serif !important;
    border-color:rgba(253, 253, 132, 0.411);
  }
  .card-header{
    background-color: black;
    color: rgba(253, 253, 132, 0.411);
    font-family: 'Cinzel', serif !important;
    border-color:rgba(253, 253, 132, 0.411);
  }
  .card-body{
    background-color: black;
    color: rgba(253, 253, 132, 0.411);
    font-family: 'Cinzel', serif !important;
    border-color:rgba(253, 253, 132, 0.411);
  }
  .modal-content{
    background-color: black;
    color: rgba(253, 253, 132, 0.411);
    font-size: 12px;
    font-family: 'Cinzel', serif !important;
    border-color:rgba(253, 253, 132, 0.411);
  }
  .display-3{
      font-size: 10rem !important;
      font-family: 'Monoton', cursive !important;
  }

  .game-rules-separator{
      font-size: 4rem !important;
      font-family: 'Cinzel', serif !important;
  }

  .card-text{
    font-family: 'Cinzel', serif !important;
  }
  .jumbotron{
    margin-bottom: 0;
    border-radius: 0;
  }
  .uport-botton{
    background-color: rgb(119,83,221);
    border-color: rgb(119,83,221);
  }
  .intro-text{
      font-family: 'Cinzel', serif !important;
  }
  .intro{
        text-align: center;
        background-color: rgb(24,24,29);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        color: rgba(255, 255, 0, 0.411);
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        border: 0px !important;
        background-origin: padding-box;
    }
</style>
