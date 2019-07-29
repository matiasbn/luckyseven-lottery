<template>
  <b-container fluid>
    <b-card
      v-if="valuesReady"
      header="Past Games"
      header-tag="h2"
      no-body>
      <b-table
        :items="lucky7PastGames"
        :fields="fields"
        striped
        hover
        responsive
        bordered
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

import Web3 from 'web3';
import orderBy from 'lodash.orderby';
import { mapGetters } from 'vuex';
import truffleContract from '@/web3/truffleContract';


export default {
  data() {
    return {
      fields: [
        { key: 'position', label: 'Position' },
        { key: 'lucky7Number', label: 'Lucky7Number' },
        { key: 'ticketValue', label: 'Lucky7Ticket' },
        {
          key: 'difference', label: 'Difference', sortable: true,
        },
        { key: 'owner', label: 'Owner' },
        { key: 'prize', label: 'Prize', sortable: true },
        { key: 'gameID', label: 'Game ID', sort: true, sortable: true },
      ],
      valuesReady: true,
    };
  },
  computed: {
    ...mapGetters('player', ['currentProvider']),
  },
  asyncComputed: {
    async lucky7PastGames() {
      const web3 = new Web3();
      this.valuesReady = false;
      const lucky7PastGames = [];
      // eslint-disable-next-line max-len
      const contractInstance = await truffleContract(this.currentProvider).deployed();
      const counter = (await contractInstance.initialLucky7TicketPosition()).toNumber();
      const lucky7TicketsPromises = [];
      for (let i = 0; i < counter; i += 1) {
        lucky7TicketsPromises.push(contractInstance.lucky7TicketsArray(i));
      }
      const lucky7TicketsArray = orderBy(await Promise.all(lucky7TicketsPromises), ['gameID', 'lucky7NumberID'], ['desc', 'asc']);
      lucky7TicketsArray.forEach((ticket, index) => {
        const pastTicket = {
          lucky7Number: parseInt(ticket.lucky7Number, 10),
          ticketValue: parseInt(ticket.ticketValue, 10),
          difference: parseInt(ticket.difference, 10),
          owner: ticket.owner,
          prize: `${web3.utils.fromWei(ticket.prize, 'ether')} ETH`,
          gameID: parseInt(ticket.gameID, 10),
          position: ticket.lucky7NumberID.toNumber() + 1,
        };
        lucky7PastGames[index] = pastTicket;
      });
      this.valuesReady = true;
      return lucky7PastGames;
    },
  },
};
</script>
