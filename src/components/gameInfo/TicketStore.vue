<template>
  <div class>
    <div class="row">
      <h1 class="row">
        Ticket Store
      </h1>
    </div>
    <div class="row">
      <div class="col">
        <h2>
          Last Generated Ticket
        </h2>
        <h3>
          {{ lastGeneratedTicket }}
        </h3>
      </div>
      <div class="col">
        <h2>Last Purchased Ticket</h2>
        <h3>{{ lastPurchasedTicket }}</h3>
      </div>
      <div class="col">
        <h2>Lucky7Ticket?</h2>
        <h3>{{ lucky7Ticket | isLucky7Ticket }}</h3>
      </div>
      <div class="col">
        <h1>Try your luck!</h1>
        <button>Generate Ticket</button>
        <button>Buy Ticket</button>
        <button>I'm feeling lucky!</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  filters: {
    isLucky7Ticket(lucky7Ticket) {
      if (lucky7Ticket) {
        return 'Yes!, Congratulations';
      }
      return 'No, best luck for the next game';
    },
  },
  computed: {
    lastGeneratedTicket() {
      return this.$store.state.player.lastGeneratedTicket;
    },
    lastPurchasedTicket() {
      return this.$store.state.player.lastPurchasedTicket;
    },
    lucky7Ticket() {
      return this.$store.state.player.lucky7Ticket;
    },
  },
};
</script>
<style scoped>
  .title{
    text-align: center;
  }
</style>
