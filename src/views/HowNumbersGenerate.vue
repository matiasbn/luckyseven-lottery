<template>
  <b-container
    fluid
    class="intro">
    <b-jumbotron
      header="How numbers are generated"
      class="intro">
      <h4 class="game-rules-separator">About &mu; generator</h4>
      <h3 class ="intro-text">
        As told, Lucky7 uses a pseudo-random number generator (PRNG) called &mu; (mu)
        generator. <br>
        It uses two random numbers and 'hashes' them, so the numbers generation on Lucky7 can't
        be biased, and disincentives the numbers to be tampered, because only 1 number
        from entropy source is not enough to know the output of the PRNG.<br>
        &mu; generator is used both to generate Lucky7Numbers and Lukcy7Tickets, and
        the number generation flow is like this:
      </h3> <br>
    </b-jumbotron>
    <h4 class="game-rules-separator">Numbers generation flow</h4>
    <h3 class ="intro-text">
      There are two number generation flows, generating and purchasing a
      ticket, but one includes the other.
    </h3> <br>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-card
            :img-src="require('../assets/prng-rhombus-logo.png')"
            img-alt="Card image"
            img-left
            img-height="100px"
            class="mb-3">
            <b-card-text>
              The first number is called from Rhombus oracle, both
              for generate or purchase a ticket.
            </b-card-text>
          </b-card>
          <b-card
            :img-src="require('../assets/prng-oraclize-logo.png')"
            img-alt="Card image"
            img-right
            img-height="100px"
            class="mb-3">
            <b-card-text>
              The second number is called from Provable oracle. Again,
              this step is both for purchase or generate a ticket.
            </b-card-text>
          </b-card>
          <b-card
            :img-src="require('../assets/algorithm.png')"
            img-alt="Card image"
            img-left
            img-height="100px"
            class="mb-3">
            <b-card-text>
              If the player purchased the ticket, both numbers are used to formulate
              a string representing the &mu; generator. <br>
              In case the player generated the ticket, both numbers are saved until
              he purchase the generated ticket, then the flows continues as it was purchased.
            </b-card-text>
          </b-card>
          <b-card
            :img-src="require('../assets/prng-wolfram-logo.png')"
            img-alt="Card image"
            img-right
            img-height="100px"
            class="mb-3">
            <b-card-text>
              The string formulated on the previous step is called through Provable
              oracle to Wolfram Alpha API.
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <h4
      class="game-rules-separator"
      style="margin-top: 20px">Ticket generation equation</h4>
    <h3 class ="intro-text">
      &mu; generator is based on a simple equation, which result on a decimal number, which is
      multiplied by a power of 10 and cutted through modulo operation and divisions.
      Demonstrations and explanations can be found on the paper of &mu; generator that you can
      find on this <a :href="paperLink">link</a> (stored on IPFS) . <br>
      Importance of this step, is that users can easily verify the authenticity of them numbers
      using the numbers they received and the PRNG on Wolfram.
    </h3> <br>

    <b-row>
      <div class="mt-4">
        <b-col>
          <b-card
            :img-src="require('../assets/prng-formula-1.png')"
            img-alt="Card image"
            img-height="100px"
            img-right
            class="mb-3">
            <b-card-text>
              This is the basic equation of &mu; generator. This is where
              the random number is generated.
              Rest of the steps are focused on 'cut' part of this number.
            </b-card-text>
          </b-card>
          <b-card
            :img-src="require('../assets/prng-formula-2.png')"
            img-alt="Card image"
            img-left
            img-height="100px"
            class="mb-3">
            <b-card-text>
              Previous equation can be confusing, but is a simple division.
              As shown on the image on the left, the division can be
              transformed to previous equation.
            </b-card-text>
          </b-card>
          <b-card
            :img-src="require('../assets/prng-formula-3.png')"
            img-alt="Card image"
            img-right
            img-height="200px"
            class="mb-3">
            <b-card-text>
              This is the result of previous division. <br>
              As you can see, every 7 digits (n on equation), a power of 7 appears (&mu; on equation).
              There's a point where numbers 'overlaps' one on another, called maximum entropy
              point. This entropy point is explained on the paper.
            </b-card-text>
          </b-card>
          <b-card
            :img-src="require('../assets/prng-formula-4.png')"
            img-alt="Card image"
            img-left
            img-height="100px"
            class="mb-3">
            <b-card-text>
              We can cut wherever we want on the previous named number and consider
              it a ' pseudo-random number'. Parameters of this equations are explained on the
              paper, but the parameters used with the random numbers of the oracles
              are &mu; (Provable) and i (Rhombus).
            </b-card-text>
          </b-card>
          <b-card
            :img-src="require('../assets/prng-formula-solidity.png')"
            img-alt="Card image"
            img-right
            img-height="200px"
            class="mb-3">
            <b-card-text>
              Particularly, the R function of previous equation is the one written to call
              Wolfram Api through provable. <br>
              To do so, a function on a smart contract is on
              charge of concatenating the numbers incoming from both Oracles and equationte
              the necessary call to Wolfram through Provable.
            </b-card-text>
          </b-card>
        </b-col>
        <h4
          class="game-rules-separator"
          style="margin-top: 20px">Ticket generation simulator</h4>
        <h3 class ="intro-text">
          Here you can simulate the call to Wolfram Alpha API through Provable. <br>
          Enter two 'random numbers' and you'll see the string resulting of
          concatenating them and the parameters already setted on the contracts. <br>
          Default parameters are setted to: <br>
          b = 1, n = 8, p = 10000 and j = 10. <br><br>
        </h3>
      </div>
    </b-row>

    <b-container>
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
                    placeholder="First number"/>
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
                    placeholder="Second number"/>
                </b-col>
              </b-row>
            </b-card-text>
            <b-button
              variant="success"
              size="sm"
              @click="callWolframQuery">
              Click to call to Wolfram
            </b-button>
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
                  <h3 class ="intro-text">String to query Wolfram Alpha by Provable:</h3>
                  <p>
                    {{ wolframQuery }}
                  </p>
                </b-col>
              </b-row>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

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
    };
  },
  computed: {
    validQuery() {
      return this.firstNumber === this.firstNumberSaved && this.secondNumber === this.secondNumberSaved && this.firstNumber !== null && this.secondNumber !== null;
    },
  },
  methods: {
    callWolframQuery() {
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
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Cinzel|Monoton&display=swap');
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
    .display-3{
        font-size: 6rem !important;
        font-family: 'Monoton', cursive !important;
    }
    .game-rules-separator{
        font-size: 3rem !important;
        font-family: 'Cinzel', serif !important;
    }
    .cards-1{
      color:rgb(0,175,59);
    }
    .card-title{
      font-family: 'Cinzel', serif !important;
    }
    .card-header{
      font-family: 'Cinzel', serif !important;
    }
    .card-footer{
      font-family: 'Cinzel', serif !important;
      color: rgba(255, 255, 0, 0.7);
    }
    .card-body{
      background-color:black;
      color:rgba(255, 255, 0, 0.411);
    }
    .card{
      border-color:rgba(255, 255, 0, 0.411);
      border: 0;
    }
    .intro-text{
      font-family: 'Cinzel', serif !important;
    }
    .card-text{
      font-family: 'Cinzel', serif !important;
    }
    .jumbotron{
      margin-bottom: 0;
      border-radius: 0;
    }
</style>
