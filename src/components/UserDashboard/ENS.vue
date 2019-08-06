<template>
  <b-card
    v-if="ensName === account && sessionProvider === 'metamask'"
    header="Ethereum Name Service"
    header-tag="h2"
    border-variant="success">

    Your address is not registered on ENS. <br> Click the button to register it.
    <b-button
      variant="success"
      @click="$bvModal.show('modal-scoped')">Register your name</b-button>

    <b-modal
      id="modal-scoped"
      title="Register your name on ENS!">
      <template
        slot="modal-header"
        slot-scope="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>Register your name on ENS!</h5>
      </template>

      <template
        slot="default"
        slot-scope="{ hide }">
        <p>Write your name to proceed to check if the name is available</p>
        <b-form-input
          v-if="!checkingOnENS"
          v-model="name"
          :state="nameAvailable"
          placeholder="Enter your name"
        />
        <div
          v-else
          class="d-flex justify-content-center mb-3">
          <b-spinner
            variant="success"
            label="Spinning"/>
        </div>
        <b-form-text
          v-if="name!==''"
          id="input-formatter-help">
          {{ name }}.win
        </b-form-text>
        <p v-if="name !== '' && !checkingOnENS && nameAvailable === null">
          Click <b-button
            variant="success"
            size="sm"
            @click="checkNameOnENS">here</b-button> to check if the name is available
        </p>
        <div v-else-if="name!=='' && !checkingOnENS && nameAvailable === true">
          <div v-if="!registeringOnENS">
            <p >
              This name is available, let's register it!
            </p>
          </div>
          <div
            v-else
            class="d-flex justify-content-center mb-3">
            <b-spinner
              variant="success"
              label="Spinning"/>
          </div>
        </div>
        <p v-else-if="name!=='' && !checkingOnENS && nameAvailable === false">
          This name is not available, try another
        </p>
        <p v-else-if="name!=='' && !checkingOnENS && nameAvailable === false">
          This name is not available, try another
        </p>

        <!-- Alerts -->

        <b-alert
          :show="showRegistered"
          dismissible
          fade
          variant="success"
          @dismissed="showRegistered=false">
          Name successfully registered on ENS Registry.
        </b-alert>

        <b-alert
          :show="showResolverSetted"
          dismissible
          fade
          variant="success"
          @dismissed="showResolverSetted=false">
          Resolver setted for registered name.
        </b-alert>

        <b-alert
          :show="showAddressSavedOnResolver"
          dismissible
          fade
          variant="success"
          @dismissed="showAddressSavedOnResolver=false">
          Address setted on resolver.
        </b-alert>

        <b-alert
          :show="showRegisteredOnReverseRegistrar"
          dismissible
          fade
          variant="success"
          @dismissed="showRegisteredOnReverseRegistrar=false">
          Address registered on reverse registrar.
        </b-alert>

      </template>

      <template
        slot="modal-footer"
        slot-scope="{ ok, cancel, hide }">
        <b v-if="nameAvailable">Click ok to register your name</b>
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button
          v-if="nameAvailable"
          size="sm"
          variant="success"
          @click="registerENSName">
          OK
        </b-button>
        <b-button
          v-if="!nameRegistered"
          size="sm"
          variant="danger"
          @click="cancel()">
          Cancel
        </b-button>
        <b-button
          v-else
          size="sm"
          variant="success"
          @click="cancel()">
          Back to the game
        </b-button>
      </template>

    </b-modal>
  </b-card>
  <b-card
    v-else-if="sessionProvider === 'metamask'"
    header="Ethereum Name Service"
    header-tag="h2">
    <b-button
      variant="success"
      @click="$bvModal.show('modal-scoped2')">Reverse/Forward lookup</b-button>

    <b-modal
      id="modal-scoped2"
      title="Register your name on ENS!">
      <template
        slot="modal-header"
        slot-scope="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>ENS forward and reverse lookup</h5>
      </template>

      <template
        slot="default"
        slot-scope="{ hide }">
        <p>Enter a name to find it address.
          <b-button
            v-if="lookupName!=''"
            variant="success"
            size="sm"
            @click="nameLookup">Start forward lookup</b-button></p>
        <b-form-input
          v-if="!checkingOnENS"
          v-model="lookupName"
          :state="addressFound"
          placeholder="Enter a name"
        />
        <b-alert
          :show="showAddressLookup"
          dismissible
          fade
          variant="success"
          @dismissed="showAddressLookup=false">
          Lookup result: {{ addressLookupResult }}.
        </b-alert>
        <br>
        <p>Enter an address to find it name <b-button
          v-if="lookupAddress!=''"
          variant="success"
          size="sm"
          @click="addressLookup">Start reverse lookup</b-button></p>
        <b-form-input
          v-model="lookupAddress"
          :state="nameFound"
          placeholder="Enter an address"
        />
        <b-alert
          :show="showNameLookup"
          dismissible
          fade
          variant="success"
          @dismissed="showNameLookup=false">
          Lookup result: {{ nameLookupResult }}.
        </b-alert>

      </template>

      <template
        slot="modal-footer"
        slot-scope="{ ok, cancel, hide }">
        <b v-if="nameAvailable">Click ok to register your name</b>
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button
          v-if="false"
          size="sm"
          variant="success"
          @click="registerENSName">
          OK
        </b-button>
        <b-button
          size="sm"
          variant="danger"
          @click="cancel()">
          Cancel
        </b-button>
      </template>

    </b-modal>
  </b-card>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable max-len */
import Web3 from 'web3';
import A2A from 'a2a';
import nameHash from 'eth-ens-namehash';
import { mapState, mapGetters } from 'vuex';
import FIFSRegistrar from '@/web3/ENS/FIFSRegistrar';
import ENSRegistry from '@/web3/ENS/ENSRegistry';
import ReverseRegistrar from '@/web3/ENS/ReverseRegistrar';
import PublicResolver from '@/web3/ENS/PublicResolver';

const web3 = new Web3();

export default {
  filters: {
  },
  data() {
    return {
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
      sessionProvider: state => state.player.session.provider,
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
    async account() {
      this.refreshENS();
    },
    name() {
      if (this.nameLength !== this.name.length) {
        this.nameAvailable = null;
      }
    },
  },
  async created() {
    this.refreshENS();
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
    async refreshENS() {
      try {
        this.loadingName = true;
        const publicResolverInstance = await PublicResolver(this.currentProvider).deployed();
        const name = await publicResolverInstance.name(this.reverseNode, { from: this.account });
        this.ensName = name !== '' ? `${name}.win` : this.account;
        this.loadingName = false;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
