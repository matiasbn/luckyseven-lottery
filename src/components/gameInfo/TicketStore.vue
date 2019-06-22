<template>
  <b-card
    header="Ticket Store"
    header-tag="h1"
    class="ticket-store"
    header-bg-variant="warning"
    header-text-variant="white"
  >
    <b-card-group deck>

      <b-col>
        <b-card
          header="Try your luck!"
          header-tag="h2"
          fluid
        >
          <b-row>
            <b-col>
              <p>
                Generate a ticket for a lower price than purchasing it! If the ticket
                generated is a Lucky7Ticket you'll have the option to buy it. <br>
              </p>
              <b-button
                v-b-popover.hover="generatePrice"
                v-if="purchasedTicketReceived && generatedTicketReceived && buttonsEnabled"
                :disabled="settingLucky7Numbers"
                size="lg"
                title="Price"
                variant="warning"
                @click="generateTicket"
              >
                Generate Ticket
              </b-button>
              <b-spinner
                v-else
                variant="warning"
                label="Spinning"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p>
                Or, if you feel lucky, you can purchase your ticket directly!.
              </p>
              <b-button
                v-b-popover.hover="purchasePrice"
                v-if="purchasedTicketReceived && generatedTicketReceived && buttonsEnabled"
                :disabled="settingLucky7Numbers"
                size="lg"
                title="Price"
                variant="warning"
                @click="purchaseRandomTicket"
              >
                Give me a random ticket!
              </b-button>
              <b-spinner
                v-else
                variant="warning"
                label="Spinning"/>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          header="Last Generated ticket"
          header-tag="h2"
          title="Ticket value"
        >
          <b-card-text
            v-if="firstGenerateNumberReceived && secondGenerateNumberReceived">
            {{ checkGeneratedTicket.lastGeneratedTicket||0 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>

        </b-card>

        <b-card title="First number">
          <b-card-text
            v-if="firstGenerateNumberReceived">
            {{ checkGeneratedTicket.lastNumberGenerated1||0 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>

        <b-card title="Second number">
          <b-card-text
            v-if="secondGenerateNumberReceived">
            {{ checkGeneratedTicket.lastNumberGenerated2||0 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>

        <b-card title="Difference">
          <b-card-text
            v-if="generatedTicketReceived">
            {{ checkGeneratedTicket.generatedDifference||0 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>

        <b-card title="Position">
          <b-card-text
            v-if="generatedTicketReceived">
            {{ checkGeneratedTicket.generatedPosition||0 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>

        <b-card title="Lucky7Ticket?">
          <b-card-text
            v-if="isLucky7TicketGenerated && !ticketOwned && ticketGeneratedNotZero">
            <p>
              Yes! What are you waiting? Buy it!
            </p>
            <b-button
              v-b-popover.hover="purchasePrice"
              :disabled="!generatedTicketReceived"
              title="Price"
              variant="warning"
              @click="purchaseGeneratedTicket"
            >
              Buy Ticket
            </b-button>
          </b-card-text>
          <b-card-text v-else-if="ticketOwned && ticketGeneratedNotZero">
            <p>
              You already own this ticket
            </p>
          </b-card-text>
          <b-card-text v-else-if="!isLucky7TicketGenerated && ticketGeneratedNotZero">
            No, try again!.
          </b-card-text>
          <b-card-text v-else>
            No tickets generated yet.
          </b-card-text>
        </b-card>
      </b-col>

      <b-col>
        <b-card
          header="Last Purchased ticket"
          header-tag="h2"
          title="Ticket value"
        >
          <b-card-text
            v-if="purchasedTicketReceived && generatedTicketReceived">
            {{ checkPurchasedTicket.lastPurchasedTicket || 0 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>

        <b-card title="First number">
          <b-card-text
            v-if="firstPurchaseNumberReceived">
            {{ checkPurchasedTicket.lastNumberPurchased1 || 0 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>

        <b-card title="Second number">
          <b-card-text
            v-if="secondPurchaseNumberReceived">
            {{ checkPurchasedTicket.lastNumberPurchased2 || 0 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>

        <b-card title="Difference">
          <b-card-text
            v-if="purchasedTicketReceived">
            {{ checkPurchasedTicket.purchasedDifference || 0 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>

        <b-card title="Position">
          <b-card-text
            v-if="purchasedTicketReceived">
            {{ checkPurchasedTicket.purchasedPosition || 0 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>

        <b-card title="Lucky7Ticket?">
          <b-card-text v-if="purchasedTicketReceived">
            {{ isLucky7TicketPurchased | checkLucky7Ticket }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>

      </b-col>
    </b-card-group>
  </b-card>
</template>
<script>
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable vue/no-side-effects-in-computed-properties */

import { mapGetters } from 'vuex';
import Web3 from 'web3';

import truffleContract from '@/web3/truffleContract';

const web3 = new Web3();

export default {
  filters: {
    checkLucky7Ticket(lucky7Ticket) {
      return lucky7Ticket ? 'Yes!, Congratulations!' : 'No, try again!';
    },
    checkCurrentGame(ticket, ticketGameID, gameID) {
      return ticketGameID === gameID ? ticket : '0';
    },
  },
  data() {
    return {
      generatedDifference: '0',
      generatedPosition: '0',
      purchasedDifference: '0',
      purchasedPosition: '0',
      isLucky7TicketPurchased: false,
      isLucky7TicketGenerated: false,
      currentGameTicket: true,
    };
  },
  computed: {
    ...mapGetters([
      'lastGeneratedTicketGameID',
      'settingLucky7Numbers',
      'lucky7GameInfo',
      'account',
      'purchaseTicketPrice',
      'generateTicketPrice',
      'lastPurchasedTicket',
      'lastGeneratedTicket',
      'lastNumberGenerated1',
      'lastNumberGenerated2',
      'lastNumberPurchased1',
      'lastNumberPurchased2',
      'lastPurchasedTicketGameID',
      'lucky7Ticket',
      'gameID',
      'purchasedTicketReceived',
      'generatedTicketReceived',
      'firstGenerateNumberReceived',
      'secondGenerateNumberReceived',
      'firstPurchaseNumberReceived',
      'secondPurchaseNumberReceived',
    ]),
    ticketOwned() {
      return String(this.lastGeneratedTicket) === String(this.lastPurchasedTicket);
    },
    ticketGeneratedNotZero() {
      return String(this.lastGeneratedTicket) !== '0';
    },
    ticketPurchasedNotZero() {
      return String(this.lastPurchasedTicket) !== '0';
    },
    buttonsEnabled() {
      return this.firstGenerateNumberReceived
      && this.secondGenerateNumberReceived
      && this.firstPurchaseNumberReceived
      && this.secondPurchaseNumberReceived
      && this.purchasedTicketReceived
      && this.generatedTicketReceived;
    },
    checkPurchasedTicket() {
      return String(this.lastPurchasedTicketGameID) === String(this.gameID) ? {
        lastPurchasedTicket: this.lastPurchasedTicket,
        lastNumberPurchased1: this.lastNumberPurchased1,
        lastNumberPurchased2: this.lastNumberPurchased2,
        purchasedDifference: this.purchasedDifference,
        purchasedPosition: this.purchasedPosition,
      } : '0';
    },
    checkGeneratedTicket() {
      return String(this.lastGeneratedTicketGameID) === String(this.gameID) ? {
        lastGeneratedTicket: this.lastGeneratedTicket,
        lastNumberGenerated1: this.lastNumberGenerated1,
        lastNumberGenerated2: this.lastNumberGenerated2,
        generatedDifference: this.generatedDifference,
        generatedPosition: this.generatedPosition,
      } : '0';
    },
  },
  updated() {
    this.checkLucky7TicketGenerated();
    this.checkLucky7TicketPurchased();
  },
  created() {
    this.checkLucky7TicketGenerated();
    this.checkLucky7TicketPurchased();
  },
  methods: {
    async generateTicket() {
      try {
        const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
        await truffleContractInstance.generateRandomTicket({
          from: this.account,
          value: parseInt(this.generateTicketPrice, 10),
        });
        this.$store.dispatch('askForValues', 'generateTicket');
      } catch (e) {
        console.log(e);
      }
    },
    async purchaseGeneratedTicket() {
      try {
        const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
        await truffleContractInstance.sellGeneratedTicket({
          from: this.account,
          value: parseInt(this.purchaseTicketPrice, 10),
        });
        this.$store.dispatch('askForValues', 'purchaseGeneratedTicket');
      } catch (e) {
        console.log(e);
      }
    },
    async purchaseRandomTicket() {
      try {
        const truffleContractInstance = await truffleContract(window.web3.currentProvider).deployed();
        await truffleContractInstance.sellRandomTicket({
          from: this.account,
          value: parseInt(this.purchaseTicketPrice, 10),
        });
        this.$store.dispatch('askForValues', 'purchaseRandomTicket');
      } catch (e) {
        console.log(e);
      }
    },
    generatePrice() {
      const price = this.$store.state.game.generateTicketPrice;
      return `${web3.utils.fromWei(price, 'ether')} ETH + fees`;
    },
    purchasePrice() {
      const price = this.$store.state.game.purchaseTicketPrice;
      return `${web3.utils.fromWei(price, 'ether')} ETH + fees`;
    },
    checkLucky7TicketPurchased() {
      const lucky7GameInfo = this.lucky7GameInfo;
      if (this.lastPurchasedTicket === '0') return false;
      if (this.settingLucky7Numbers) return false;
      for (let i = 0; i < 7; i += 1) {
        if (lucky7GameInfo[i] === undefined) return false;
      }
      const lastPurchasedTicket = this.lastPurchasedTicket;
      let difference = 0;
      let position = 0;
      if (lastPurchasedTicket < lucky7GameInfo[0].number) {
        difference = lucky7GameInfo[0].number - lastPurchasedTicket;
      } else if (lastPurchasedTicket > lucky7GameInfo[6].number) {
        difference = lastPurchasedTicket - lucky7GameInfo[6].number;
        position = 6;
      } else {
        while (lastPurchasedTicket > lucky7GameInfo[position].number) {
          position += 1;
        }
        if (lastPurchasedTicket === lucky7GameInfo[position].number) {
          difference = 0;
        } else {
          const upperDifference = lucky7GameInfo[position].number - lastPurchasedTicket;
          const lowerDifference = lastPurchasedTicket - lucky7GameInfo[position - 1].number;
          if (upperDifference > lowerDifference) {
            position -= 1;
            difference = lowerDifference;
          } else {
            difference = upperDifference;
          }
        }
      }
      this.purchasedDifference = Math.abs(difference);
      this.purchasedPosition = position + 1;
      if ((lucky7GameInfo[position].owner === '0x0000000000000000000000000000000000000000')
      || difference < lucky7GameInfo[position].difference
      || (lucky7GameInfo[position].owner).toUpperCase() === this.account.toUpperCase()) {
        this.isLucky7TicketPurchased = true;
      } else {
        this.isLucky7TicketPurchased = false;
      }
    },
    checkLucky7TicketGenerated() {
      const lucky7GameInfo = this.lucky7GameInfo;
      if (this.lastGeneratedTicket === '0') return false;
      if (this.settingLucky7Numbers) return false;
      for (let i = 0; i < 7; i += 1) {
        if (lucky7GameInfo[i] === undefined) return false;
      }
      const lastGeneratedTicket = this.lastGeneratedTicket;
      if (String(lastGeneratedTicket) === '0') return false;
      let difference = 0;
      let position = 0;
      if (lastGeneratedTicket < lucky7GameInfo[0].number) {
        difference = lucky7GameInfo[0].number - lastGeneratedTicket;
      } else if (lastGeneratedTicket > lucky7GameInfo[6].number) {
        difference = lastGeneratedTicket - lucky7GameInfo[6].number;
        position = 6;
      } else {
        while (lastGeneratedTicket > lucky7GameInfo[position].number) {
          position += 1;
        }
        if (lastGeneratedTicket === lucky7GameInfo[position].number) {
          difference = 0;
        } else {
          const upperDifference = lucky7GameInfo[position].number - lastGeneratedTicket;
          const lowerDifference = lastGeneratedTicket - lucky7GameInfo[position - 1].number;
          if (upperDifference > lowerDifference) {
            position -= 1;
            difference = lowerDifference;
          } else {
            difference = upperDifference;
          }
        }
      }
      this.generatedDifference = Math.abs(difference);
      this.generatedPosition = position + 1;
      if ((lucky7GameInfo[position].owner === '0x0000000000000000000000000000000000000000'
      || difference < lucky7GameInfo[position].difference)
      && (lucky7GameInfo[position].owner).toUpperCase() !== this.account.toUpperCase()) {
        this.isLucky7TicketGenerated = true;
      } else {
        this.isLucky7TicketGenerated = false;
      }
    },
  },
};
</script>

<style>
  .ticket-store {
    text-align:center;
    margin: 10px;
  }
  .btn {
    margin:5px;
  }
  .card-text{
    margin:0;
  }
  .col{
    border:1px yellow;
  }
</style>
