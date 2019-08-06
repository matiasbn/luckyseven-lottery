<template>
  <div>
    <b-jumbotron
      header="Lucky7"
      lead = "A fully decentralized lottery"
      lead-tag="h1"
      class="intro-image"/>
    <b-container>
      <br>
      <h4 class="intro game-rules-separator">About Lucky7</h4>
      <h5 class ="intro intro-text">
        Buy a random ticket, or generate tickets for a lower price until
        you get a winner ticket!. <br>
        Lucky7 is designed to let users participate on a lottery,
        fully decentralized and bias-resistant. <br>
        But to achieve decentralization on a lottery based on
        Blockchain requires to face 2 problems. <br>
        First, gambling on blockhain depends heavily on Oracles as entropy sources. <br>
        They 'decide' on a random fashion the 'winning numbers' that are
        going to be used during the game. <br>
        How can we be sure that those numbers are not biased or tampered?. <br>
        It is necessary to have more than one entropy source to achieve decentralization. <br>
        It is necessary to decentralize the responsability of delivering prices too because, <br>
        How can we be sure that the prices for the lottery winners were delivered when they had to? <br>
        Lucky7 tackles this problems using 3 principles:
      </h5> <br>
      <b-card-group
        deck
        class="cards-1">
        <b-card
          :img-src="require('../assets/oraclize-rhombus.jpg')"
          title="Multiple entropy sources"
          title-tag="h1"
          img-alt="Image"
          img-top>
          <b-card-text>
            Lucky7 use 2 entropy sources to fulfill the decentralized objective.
            Particularly it uses Provable and Rhombus oracles to fetch
            random numbers and calculate game parameters which require randomness.
          </b-card-text>
        </b-card>

        <b-card
          :img-src="require('../assets/algorithm.png')"
          title="Numeric hash"
          title-tag="h1"
          img-alt="Image"
          img-top>
          <b-card-text>
            <p>Lucky7 uses an algorithm called &mu; generator to
            generate numbers. It ease of implementation is
            ideal to formulate a call to WolframAlpha API through
            Provable oracle. Both the parameters used by
            &mu; generator and the API call to Wolfram would be
            registered permanently on chain as 'proof of authenticity'.
            </p>
          </b-card-text>
        </b-card>

        <b-card
          :img-src="require('../assets/crowdwise.jpg')"
          title="Crowd wise logic"
          title-tag="h1"
          img-alt="Image"
          img-top>
          <b-card-text>
            Once the contract are deployed, every action depends on the players.
            From triggering prize delivering to setting up new games. All this actions are
            previously written and supervised on smart contracts,
            and those who trigger them are going
            to be compensated with properly prizes.
          </b-card-text>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>
