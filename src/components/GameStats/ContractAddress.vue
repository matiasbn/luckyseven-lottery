<template>
  <b-card
    header="Contract Address"
    header-tag="h4">
    <b-card-text>
      <vth-blockie
        :string="contractAddress"
        round /> {{ contractAddress }}
    </b-card-text>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import truffleContract from '@/web3/truffleContract';

export default {
  data() {
    return {
      contractAddress: null,
    };
  },
  computed: {
    ...mapGetters('player', ['currentProvider']),
  },
  async beforeMount() {
    const contract = await truffleContract(this.currentProvider).deployed();
    this.contractAddress = contract.address;
  },
};
</script>
