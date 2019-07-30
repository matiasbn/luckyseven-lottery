<template>
  <b-container
    class="intro">
    <h1 class="page-title">How Lucky7 works</h1>
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
            img-width="700px"
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
          You can use the 'Ticket Validator' to test custom values of the &mu; generator,
          or to check if your tickets values are right.
        </h3>
      </div>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      paperLink: 'https://ipfs.globalupload.io/Qmek8hc3pFkRtGkaSwh5EbnApqHdpcoPqVFScbzQUMnePs',
    };
  },
};
</script>

<style>
</style>
