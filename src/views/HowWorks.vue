<template>
  <b-container
    class="intro">
    <h1 class="page-title">How Lucky7 works</h1>
    <h4 class="game-rules-separator">General review</h4>
    <h3 class ="intro-text">
      The game consist on buying a ticket which is the closest amongst
      all tickets to 1 of 7 numbers called Lucky7Numbers. <br>
      The closest you are to a Lucky7Number, the bigger the price
      you are going to win, but only if you are the closest one to
      that particular Lucky7Number. <br>
      Once certain pot and certain date are reached,
      the prizes can be delivered by any player, which will get a
      prize for this action. <br>
      Then, is necessary to set the new game.
      This action is performed by any player, and they will get a prize for
      this action too. <br>
    </h3> <br>
    <div
      class="intro">
      <div>
        <h4 class="game-rules-separator">Login in</h4>
        <b-card-group deck>
          <b-card
            :img-src="require('../assets/rules-uport-logo.jpg')"
            img-alt="Card image"
            img-top>
            <b-card-text>
              You can login with uPort. If you do, you have
              to sign 2 times, one to accept disclosing information about you and second to
              disclose you 'uPort ethereum address'.
            </b-card-text>
          </b-card>

          <b-card
            :img-src="require('../assets/rules-metamask-logo.jpg')"
            img-alt="Card image"
            img-bottom>
            <b-card-text>
              Or you can login with Metamask. If you do, you would be asked to
              accept to connect the Lucky7 dApp with your Metamask account.
            </b-card-text>
          </b-card>
        </b-card-group>
      </div>
      <br>
      <div>
        <h4 class="game-rules-separator">Playing the game</h4>

        <h3 class ="intro-text">
          You can either buy a random ticket or generate a ticket until you
          have a winner ticket, called Lucky7Ticket. To do so, you have to go to the
          Lottery section.
        </h3>
      </div>

      <div class="mt-4">
        <b-card
          :img-src="require('../assets/rules-wait-results.png')"
          img-alt="Card image"
          img-left
          img-height="auto"
          class="mb-3">
          <b-card-text>
            You can generate a ticket for a lower price than purchasing it.
            You can generate all the tickets you want, and once it is a Lucky7Ticket
            you would be able to buy it. <br>
            Or you can directly buy a random ticket if you feel lucky. <br>
            Either you generate or you purchase a ticket, you
            have to wait for the necessary transactions to be executed. <br>
            This is, generation of first and second random numbers from Rhombus and
            Provable Oracles, generate the ticket and check if the incoming
            ticket is or not a Lucky7Ticket.
          </b-card-text>
        </b-card>

        <b-card
          :img-src="require('../assets/rules-check-results.png')"
          img-alt="Card image"
          img-right
          img-height="400px">
          <b-card-text>
            Once the results are ready, and depending on if you generated or purchased a ticket,
            you'll have a chart like the example on the right. <br>
            First box specifies if the result is or not a Lucky7Ticket. In case it was purchased,
            then you'll own it already. <br>
            If it was generated, and if is a Lucky7Ticket, then a button
            will appear and you'll be able to buy the ticket. <br>
            The rest of the boxes is information about your ticket. <br>
            First one is the 'position' of your ticket amongst the Lucky7Numbers.
            For the example given the position is 4, so the closest Lucky7Number
            is the 4th of the table that would be present on bottom of 'Lottery' section. <br>
            Second box is the difference between your ticket and the Lucky7Number
            on the 'Position' box. <br>
            Third is the value of your ticket. <br>
            Fourth and fifth are the values of the numbers coming from Rhombus
            (First Number) and Provable (Second Number) Oracles.

          </b-card-text>
        </b-card>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      activeStep: 0,
      showSocial: false,
      isAnimated: true,
      hasNavigation: true,
      isStepsClickable: false,
      isProfileSuccess: false,
    };
  },
};
</script>
