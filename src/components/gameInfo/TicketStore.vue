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
                v-if="purchasedTicketReceived && generatedTicketReceived"
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
                v-if="purchasedTicketReceived && generatedTicketReceived"
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
            {{ lastGeneratedTicket }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>

        </b-card>
        <b-card title="First number">
          <b-card-text
            v-if="firstGenerateNumberReceived">
            {{ lastNumberGenerated1 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>
        <b-card title="Second number">
          <b-card-text
            v-if="secondGenerateNumberReceived">
            {{ lastNumberGenerated2 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>
        <b-card title="Lucky7Ticket?">
          <b-card-text v-if="checkLucky7TicketGenerated && !ticketAlreadyPurchased">
            <p>
              Yes! What are you waiting? Buy it!
            </p>
            <b-button
              v-b-popover.hover="purchasePrice"
              title="Price"
              variant="warning"
              @click="purchaseGeneratedTicket"
            >
              Buy Ticket
            </b-button>
          </b-card-text>
          <b-card-text v-else-if="ticketAlreadyPurchased">
            <p>
              You already own this ticket
            </p>
          </b-card-text>
          <b-card-text v-else>
            No, better luck for the next time.
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
            {{ lastPurchasedTicket }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>

        </b-card>
        <b-card title="First number">
          <b-card-text
            v-if="firstPurchaseNumberReceived">
            {{ lastNumberPurchased1 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>
        <b-card title="Second number">
          <b-card-text
            v-if="secondPurchaseNumberReceived">
            {{ lastNumberPurchased2 }}
          </b-card-text>
          <b-spinner
            v-else
            variant="warning"
            label="Spinning"/>
        </b-card>
        <b-card title="Lucky7Ticket?">
          <b-card-text>
            {{ isLucky7Ticket | checkLucky7TicketPurchased }}
          </b-card-text>
        </b-card>
      </b-col>
    </b-card-group>
  </b-card>
</template>
<script>
/* eslint-disable max-len */
/* eslint-disable vue/no-side-effects-in-computed-properties */

import { mapGetters } from 'vuex';
import Web3 from 'web3';

import truffleContract from '@/web3/truffleContract';

const web3 = new Web3();

export default {
  filters: {
    checkLucky7TicketPurchased(lucky7Ticket) {
      if (lucky7Ticket) {
        return 'Yes!, Congratulations!';
      }
      return 'No, better luck for the next game';
    },
  },
  data() {
    return {
      contract: null,
      generatedDifference: '0',
      generatedPosition: '0',
    };
  },
  computed: {
    ...mapGetters([
      'settingLucky7Numbers',
      'lucky7GameInfo',
      'isLucky7Ticket',
      'account',
      'purchaseTicketPrice',
      'generateTicketPrice',
      'lastPurchasedTicket',
      'lastGeneratedTicket',
      'lastNumberGenerated1',
      'lastNumberGenerated2',
      'lastNumberPurchased1',
      'lastNumberPurchased2',
      'lucky7Ticket',
      'purchasedTicketReceived',
      'generatedTicketReceived',
      'firstGenerateNumberReceived',
      'secondGenerateNumberReceived',
      'firstPurchaseNumberReceived',
      'secondPurchaseNumberReceived',
    ]),
    checkLucky7TicketGenerated() {
      const lucky7GameInfo = this.lucky7GameInfo;
      for (let i = 0; i < 7; i += 1) {
        if (lucky7GameInfo[i] === undefined) return false;
      }
      const lastGeneratedTicket = this.lastGeneratedTicket;
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
      this.generatedDifference = difference;
      this.generatedPosition = position;
      if ((lucky7GameInfo[position].owner === '0x0000000000000000000000000000000000000000') || difference < lucky7GameInfo[position].difference) {
        return true;
      }
      return false;
    },
    ticketAlreadyPurchased() {
      return String(this.lastGeneratedTicket) === String(this.lastPurchasedTicket);
    },
  },
  async beforeCreate() {
    this.contract = await truffleContract(window.web3.currentProvider).deployed();
  },
  methods: {
    async generateTicket() {
      try {
        await this.contract.generateRandomTicket({
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
        await this.contract.sellGeneratedTicket({
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
        await this.contract.sellRandomTicket({
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
      return `${web3.utils.fromWei(price, 'ether')} ETH`;
    },
    purchasePrice() {
      const price = this.$store.state.game.purchaseTicketPrice;
      return `${web3.utils.fromWei(price, 'ether')} ETH`;
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
