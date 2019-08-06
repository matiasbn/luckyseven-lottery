<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <CurrentNetwork/>
      </b-col>
      <b-col>
        <ContractBalance/>
      </b-col>
      <b-col>
        <GameID/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <ContractAddress/>
      </b-col>
      <b-col>
        <Prices/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import CurrentNetwork from '@/components/GameStats/CurrentNetwork';
import ContractBalance from '@/components/GameStats/ContractBalance';
import GameID from '@/components/GameStats/GameID';
import ContractAddress from '@/components/GameStats/ContractAddress';
import Prices from '@/components/GameStats/Prices';

export default {
  components: {
    CurrentNetwork,
    ContractBalance,
    GameID,
    ContractAddress,
    Prices,
  },
};
</script>
