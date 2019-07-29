<template>
  <b-container fluid>
    <b-card
      v-if="valuesReady"
      header="Your Lucky7Tickets"
      header-tag="h2"
      no-body>
      <b-table
        :items="playerTickets"
        :fields="fields"
        striped
        bordered
        hover
        responsive
      />
    </b-card>
    <b-card
      v-else >
      <b-spinner
        variant="success"
        label="Spinning"/>
    </b-card>
  </b-container>
</template>
<script>

import truffleContract from '@/web3/truffleContract';
import { mapState, mapGetters } from 'vuex';
import Web3 from 'web3';

const web3 = new Web3();

export default {
  data() {
    return {
      fields: [
        { key: 'gameID', label: 'Game ID' },
        { key: 'prize', label: 'Prize' },
        { key: 'ticketValue', label: 'Ticket Value' },
        { key: 'lucky7Number', label: 'Lucky7Number' },
        { key: 'difference', label: 'Difference' },
        { key: 'number1', label: 'First Number' },
        { key: 'number2', label: 'Second Number' },
        { key: 'ticketID', label: 'Ticket ID' },
        { key: 'lucky7NumberID', label: 'Lucky7Number ID' },
      ],
      valuesReady: true,
      playerTickets: [],
    };
  },
  computed: {
    ...mapState({
      gameID: state => state.game.settings.gameID,
      account: state => state.web3.coinbase,
    }),
    ...mapGetters('player', ['currentProvider']),
  },
  watch: {
    // eslint-disable-next-line consistent-return
    async gameID() {
      this.refreshTickets();
    },
    async account() {
      this.refreshTickets();
    },
  },
  // eslint-disable-next-line consistent-return
  async mounted() {
    this.refreshTickets();
  },
  methods: {
    // eslint-disable-next-line consistent-return
    async refreshTickets() {
      try {
        this.valuesReady = false;
        const playerTicketsArray = [];
        const contract = await truffleContract(this.currentProvider).deployed();
        const playerTickets = await contract.getPastEvents('Lucky7TicketStored', { fromBlock: 0, filter: { owner: this.account } });
        playerTickets.forEach((lucky7Ticket) => {
          const ticket = lucky7Ticket.returnValues;
          const row = {
            difference: ticket.difference,
            gameID: ticket.gameID,
            number1: ticket.mu,
            number2: ticket.i,
            lucky7Number: ticket.lucky7Number,
            lucky7NumberID: ticket.lucky7NumberID,
            owner: ticket.owner,
            prize: `${web3.utils.fromWei(ticket.prize, 'ether')} ETH`,
            ticketID: ticket.ticketID,
            ticketValue: ticket.ticketValue,
          };
          playerTicketsArray.push(row);
        });
        this.valuesReady = true;
        this.playerTickets = playerTicketsArray;
      } catch (e) {
        this.valuesReady = true;
        console.log(e);
        return [];
      }
    },
  },
};
</script>
