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
        <Store/>
      </b-col>
      <b-col>
        <LastGeneratedTicket/>
      </b-col>
      <b-col>
        <LastPurchasedTicket/>
      </b-col>
    </b-card-group>
  </b-card>
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
  .col{
    border:1px yellow;
  }
</style>
