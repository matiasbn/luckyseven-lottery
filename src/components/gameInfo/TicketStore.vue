<template>
  <b-card-group>
    <PricesAndStats />
    <Store />
  </b-card-group>
</template>
<script>
import Store from './TicketStore/Store.vue';
import PricesAndStats from './TicketStore/PricesAndStats.vue';

export default {
  components: {
    Store,
    PricesAndStats,
  },
};
</script>
