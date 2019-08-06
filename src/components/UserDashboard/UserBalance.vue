<template>
  <b-card
    header="Your balance"
    header-tag="h2"
  >
    <b-card-text text-tag="h4">
      {{ balance | transformBalance }} ETH
    </b-card-text>
  </b-card>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable max-len */
import Web3 from 'web3';
import A2A from 'a2a';
import nameHash from 'eth-ens-namehash';
import { mapState, mapGetters } from 'vuex';
import truffleContract from '@/web3/truffleContract';
import transactions from '@/web3/transactions';
import FIFSRegistrar from '@/web3/ENS/FIFSRegistrar';
import ENSRegistry from '@/web3/ENS/ENSRegistry';
import ReverseRegistrar from '@/web3/ENS/ReverseRegistrar';
import PublicResolver from '@/web3/ENS/PublicResolver';

const web3 = new Web3();

export default {
  filters: {
    transformBalance(balance) {
      return parseFloat(web3.utils.fromWei(balance, 'ether'), 10).toFixed(4);
    },
  },
  data() {
    return {
      currentPrize: '0',
      currentGamePrize: false,
      withdrawReady: true,
      name: '',
      nameLength: null,
      checkingOnENS: false,
      registeringOnENS: false,
      nameAvailable: null,
      loadingName: false,
      nameRegistered: false,
      ensName: '',
      showRegistered: false,
      showResolverSetted: false,
      showAddressSavedOnResolver: false,
      showRegisteredOnReverseRegistrar: false,
      showNameLookup: false,
      showAddressLookup: false,
      lookupName: '',
      lookupAddress: '',
      addressFound: null,
      nameFound: null,
      nameLookupResult: '',
      addressLookupResult: '',
    };
  },
  computed: {
    ...mapState({
      account: state => state.web3.coinbase,
      balance: state => state.web3.balance,
      prizeAmount: state => state.player.prizeAmount,
      prizeGameID: state => state.player.prizeGameID,
      gameID: state => state.game.settings.gameID,
      sessionProvider: state => state.player.session.provider,
      isConnected: state => state.web3.isConnected,
      waitingLucky7Number: state => state.game.waitingLucky7Number,
      lucky7GameInfo: state => state.game.lucky7GameInfo,
    }),
    ...mapGetters('player', ['currentProvider']),
    node() {
      return nameHash.hash(`${this.name}.win`);
    },
    reverseNode() {
      return nameHash.hash(`${this.account.split('x')[1]}.addr.reverse`);
    },
  },
  watch: {
    async gameID() {
      this.refreshCurrentPrize();
    },
    async account() {
      this.refreshCurrentPrize();
      this.loadingName = true;
      const publicResolverInstance = await PublicResolver(this.currentProvider).deployed();
      const name = await publicResolverInstance.name(this.reverseNode, { from: this.account });
      this.ensName = name !== '' ? `${name}.win` : this.account;
      this.loadingName = false;
    },
    name() {
      if (this.nameLength !== this.name.length) {
        this.nameAvailable = null;
      }
    },
    waitingLucky7Number() {
      this.refreshCurrentPrize();
    },
  },
  async created() {
    this.refreshCurrentPrize();
    this.loadingName = true;
    const publicResolverInstance = await PublicResolver(this.currentProvider).deployed();
    const name = await publicResolverInstance.name(this.reverseNode, { from: this.account });
    this.ensName = name !== '' ? `${name}.win` : this.account;
    this.loadingName = false;
  },
  methods: {
    async nameLookup() {
      const publicResolverInstance = await PublicResolver(this.currentProvider).deployed();
      const address = await publicResolverInstance.addr(nameHash.hash(`${this.lookupName}.win`));
      this.addressLookupResult = address;
      this.showAddressLookup = true;
    },
    async addressLookup() {
      const publicResolverInstance = await PublicResolver(this.currentProvider).deployed();
      const name = await publicResolverInstance.name(nameHash.hash(`${this.lookupAddress.split('x')[1]}.addr.reverse`));
      this.nameLookupResult = name;
      this.showNameLookup = true;
    },
    checksumAddress() {
      return web3.utils.toChecksumAddress(this.account);
    },
    async checkNameOnENS() {
      const ensRegistryInstance = await ENSRegistry(this.currentProvider).deployed();
      const storedName = this.name;
      this.nameLength = storedName.length;
      this.checkingOnENS = true;
      // eslint-disable-next-line no-unused-vars
      const [error, resolution] = await A2A(ensRegistryInstance.owner(this.node));
      this.checkingOnENS = false;
      this.name = storedName;
      if (parseInt(resolution, 16) === 0) {
        this.nameAvailable = true;
      } else {
        this.nameAvailable = false;
      }
    },
    async registerENSName() {
      this.registeringOnENS = true;
      const fifsRegistrarInstance = await FIFSRegistrar(this.currentProvider).deployed();
      const labelHash = web3.utils.sha3(this.name);
      // Register the name
      const [errorFIFS] = await A2A(fifsRegistrarInstance.register(labelHash, this.checksumAddress(), { from: this.account }));
      if (errorFIFS) {
        console.log(errorFIFS);
      } else {
        this.showRegistered = true;
        // Set the resolver
        const ensRegistryInstance = await ENSRegistry(this.currentProvider).deployed();
        const publicResolverInstance = await PublicResolver(this.currentProvider).deployed();
        let [error] = await A2A(ensRegistryInstance.setResolver(this.node, publicResolverInstance.address, { from: this.account }));
        if (error) {
          console.log(error);
        } else {
          this.showResolverSetted = true;
          // Set the address to the resolver
          [error] = await A2A(publicResolverInstance.setAddr(this.node, this.checksumAddress(), { from: this.account }));
          if (error) {
            console.log(error);
          } else {
            this.showAddressSavedOnResolver = true;
            const reverseRegistrarInstance = await ReverseRegistrar(this.currentProvider).deployed();
            [error] = await A2A(reverseRegistrarInstance.setName(this.name, { from: this.account }));
            if (error) {
              console.log(error);
            } else {
              this.showRegisteredOnReverseRegistrar = true;
              const name = await publicResolverInstance.name(this.reverseNode, { from: this.account });
              this.ensName = name !== '' ? `${name}.win` : this.account;
            }
          }
        }
      }
      this.registeringOnENS = false;
      this.nameAvailable = false;
      this.nameRegistered = true;
    },
    async claimPrize() {
      try {
        this.withdrawReady = false;
        await transactions.claimPrize(this.$store.state);
        this.currentPrize = '0';
        this.currentGamePrize = false;
        this.withdrawReady = true;
      } catch (e) {
        console.log(e);
        this.withdrawReady = true;
      }
    },
    async refreshCurrentPrize() {
      try {
        const contractInstance = await truffleContract(this.currentProvider).deployed();
        this.withdrawReady = false;
        const currentPrize = await contractInstance.pendingWithdrawals(this.account);
        const gameID = await contractInstance.gameID();
        this.currentGamePrize = (currentPrize.gameID.toNumber() === gameID.toNumber()) && (currentPrize.amount.toString() !== '0');
        this.currentPrize = this.currentGamePrize ? currentPrize.amount.toString() : '0';
        this.withdrawReady = true;
      } catch (e) {
        this.withdrawReady = true;
        console.log(e);
      }
    },
  },
};
</script>

