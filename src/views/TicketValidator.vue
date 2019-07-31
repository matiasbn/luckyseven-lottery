<template>
  <b-container class="intro">
    <b-col>
      <h1 class="page-title">Ticket Validator</h1>
      <h3 class ="intro-text">
        You can check your generated and purchased ticket with the corresponding
        buttons. <br>
        Here you simulate the call to Wolfram Alpha API through Provable. <br>
        You can enter two 'random numbers' and you'll see the string resulting of
        concatenating them with the parameters already setted on the contracts. <br>
        Default parameters are setted to: <br>
        b = 1, n = 8, p = 10000 and j = 10. <br><br>
      </h3> <br>

      <b-row>
        <b-col cols="4">
          <b-card
            header="Oracles numbers"
            header-text-variant="white"
            header-tag="header"
            header-bg-variant="dark"
            footer="Select your 'random' numbers"
            footer-tag="footer"
            footer-bg-variant="success"
            footer-border-variant="dark"
            style="max-width: 20rem;"
          >
            <b-card-text>
              <b-row>
                <b-col cols="2">
                  <b-img
                    :src="require('../assets/rhombus-transparent-icon.png')"
                    height="40px"/>
                </b-col>
                <b-col cols="10">
                  <b-form-input
                    v-model="firstNumber"
                    placeholder="First number"
                    @input="checkNumber"/>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="2">
                  <b-img
                    :src="require('../assets/oraclize-transparent-icon.png')"
                    height="40px"/>
                </b-col>
                <b-col cols="10">
                  <b-form-input
                    v-model="secondNumber"
                    placeholder="Second number"
                    @input="checkNumber"/>
                </b-col>
              </b-row>
            </b-card-text>

            <b-col>
              <b-button
                variant="success"
                size="sm"
                @click="checkGeneratedTicket">
                Check generated ticket.
              </b-button>
            </b-col>
            <b-col>
              <b-button
                variant="success"
                size="sm"
                @click="checkPurchasedTicket">
                Check purchased ticket.
              </b-button>
            </b-col>
          </b-card>
        </b-col>
        <b-col cols="8">
          <b-card
            header="Wolfram API call"
            header-text-variant="white"
            header-tag="header"
            header-bg-variant="dark"
            footer="This is called by Provable"
            footer-tag="footer"
            footer-bg-variant="success"
            footer-border-variant="dark"
          >
            <b-card-text style="font-size: 20px">
              <b-row>
                <b-col>
                  <h3 class ="intro-text">&mu; generator result:</h3>
                  R({{ b }} , {{ n }} , {{ firstNumber || "&mu;" }} , {{ p }} ,
                  {{ secondNumber || "i" }} , {{ j }}) = <br>
                  <div v-if="validQuery">
                    <p >
                      {{ prngResult }}
                    </p>
                  </div>
                </b-col>
                <b-col>
                  <h3 class ="intro-text">Wolfram Alpha query:</h3>
                  <div v-if="validQuery">
                    <a
                      :href="wolframQueryToApi"
                      target="_blank">Validate on wolframalpha.com </a>
                    <br>
                  </div>
                </b-col>
              </b-row>
              <b-row v-if="validQuery">
                <b-col>
                  <h3 class ="intro-text">String to query Wolfram Alpha through Provable:</h3>
                  <p>
                    {{ wolframQuery }}
                  </p>
                </b-col>
              </b-row>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col>
          <h3 class="paper-text">
            You can read more about the &mu; generator on
            <a :href="paperLink">this paper</a>, which is stored on IPFS.
          </h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h3 class="paper-text">
            You can read the story about how i discovered it on
            <a :href="mediumLink">this article</a> i wrote on Medium celebrating 2 years since i discovered it.
          </h3>
        </b-col>
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import muGenerator from '../helpers/muGenerator';

export default {
  data() {
    return {
      firstNumber: null,
      secondNumber: null,
      b: 1,
      n: 8,
      p: 10000,
      j: 10,
      wolframQueryToApi: null,
      wolframQuery: null,
      prngResult: null,
      firstNumberSaved: null,
      secondNumberSaved: null,
      paperLink: 'https://ipfs.globalupload.io/Qmek8hc3pFkRtGkaSwh5EbnApqHdpcoPqVFScbzQUMnePs',
      mediumLink: 'https://medium.com/@matias.barriosn/how-i-realized-as-an-adult-that-ive-been-studying-number-theory-since-i-was-a-kid-a8b49ea57a87',
    };
  },
  computed: {
    validQuery() {
      return this.firstNumber === this.firstNumberSaved && this.secondNumber === this.secondNumberSaved && this.firstNumber !== null && this.secondNumber !== null;
    },
  },
  watch: {
    firstNumber() {
      this.checkNumber();
    },
    secondNumber() {
      this.checkNumber();
    },
  },
  methods: {
    checkNumber() {
      // (mod((1/(10^8-9430))*10^10000,10^(10+4868))-mod((1/(10^8-9430))*10^10000,10^(4868)))/10^4868
      this.firstNumberSaved = this.firstNumber;
      this.secondNumberSaved = this.secondNumber;
      const wolframQuery = `(mod((1/(10^${this.n}-${this.firstNumber}))*10^${this.p},10^(10+${this.secondNumber}))-mod((1/(10^${this.n}-${this.firstNumber}))*10^${this.p},10^(${this.secondNumber})))/10^${this.secondNumber}`;
      this.wolframQuery = wolframQuery;
      this.wolframQueryToApi = wolframQuery.replace('/', '%2F');
      this.wolframQueryToApi = this.wolframQueryToApi.replace('^', '%5E');
      this.wolframQueryToApi = this.wolframQueryToApi.replace('+', '%2B');
      this.wolframQueryToApi = `https://www.wolframalpha.com/input/?i=${this.wolframQueryToApi}`;
      const parameters = { b: this.b, n: this.n, mu: this.firstNumber, p: this.p, i: this.secondNumber, j: this.j };
      this.prngResult = (muGenerator(parameters)).toString();
      console.log(this.prngResult);
      console.log(this.wolframQueryToApi);
    },
    checkPurchasedTicket() {
      this.firstNumber = this.$store.state.player.purchasedTicket.number1;
      this.secondNumber = this.$store.state.player.purchasedTicket.number2;
      this.checkNumber();
    },
    checkGeneratedTicket() {
      this.firstNumber = this.$store.state.player.generatedTicket.number1;
      this.secondNumber = this.$store.state.player.generatedTicket.number2;
      this.checkNumber();
    },
  },
};
</script>

<style>

</style>

