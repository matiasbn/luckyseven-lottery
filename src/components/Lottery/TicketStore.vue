<template>
  <b-container
    fluid
    class="ticket-store">
    <b-row>
      <b-col cols="4">
        <Store/>
      </b-col>
      <b-col cols="4">
        <LastGeneratedTicket/>
      </b-col>
      <b-col cols="4">
        <LastPurchasedTicket/>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import Store from './TicketStore/Store';
import LastGeneratedTicket from './TicketStore/LastGeneratedTicket';
import LastPurchasedTicket from './TicketStore/LastPurchasedTicket';


export default {
  components: {
    Store,
    LastGeneratedTicket,
    LastPurchasedTicket,
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
</style>
