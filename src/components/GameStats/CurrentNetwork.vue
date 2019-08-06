<template>
  <b-card
    header="Current Network"
    header-tag="h4"
  >
    <b-card-text>{{ network }}</b-card-text>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('web3', ['network']),
  },
};
</script>
