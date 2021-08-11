<template>
  <div class="d-flex">
    <fragment v-if="loggedIn && !isWrongNetwork">
      <div class="wallet-data">
        <div class="label">
          Balance:
          <span class="amount">{{ humanBusdBalance }} BUSD</span>
        </div>
        <div class="label">
          Invested:
          <span class="amount">{{ totalInvested }} BUSD</span>
        </div>
      </div>
      <v-menu  offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            class="text-lowercase teal--text text--accent-3 font-weight-bold"
          >
            <span class=""><v-icon>mdi-wallet</v-icon></span>
            <span class="d-none d-sm-flex"> {{ accountShorted }} </span>
          </v-btn>
        </template>
        <v-list dense class="text-center">
          <v-list-item link to="/transaction-history">
            <v-list-item-title>Transaction History</v-list-item-title>
          </v-list-item>
          <v-list-item link  @click="disconnectWallet()">
            <v-list-item-title>Disconnect</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </fragment>
    <fragment v-else>
      <template v-if="isWrongNetwork">
        <v-btn color="primary" @click="connectWallet" class="mr-1 red--text text--accent-2 font-weight-bold">
          <v-icon>mdi-alert-octagon-outline</v-icon> &nbsp; &nbsp;
          SWITCH NETWORK
        </v-btn>
      </template>
      <template v-else>
        <v-btn color="primary" @click="connectWallet" class="mr-1 amber--text text--accent-4 font-weight-bold">
          CONNECT WALLET
        </v-btn>
      </template>
    </fragment>
    <!-- <dialog-metamask /> -->
  </div>
</template>
<style lang="scss" scoped>
.wallet-data {
  color: white;
  padding: 0 25px 0 15px;
  background: rgba($color: #000000, $alpha: 0.2);
  border-radius: 36px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-right: -25px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  .label {
    padding: 0 10px;
    &:first-child {
      border-right: 1px solid #aaa;
    }
  }
  .amount {
    font-weight: bold;
  }
}
</style>
<script>
import Hidden from '@/components/Hidden'
// import DialogMetamask from '~/components/DialogMetamask'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Hidden,
    // DialogMetamask,
  },
  computed: {
    ...mapGetters('metamask', ['humanBusdBalance', 'loggedIn', 'accountShorted', 'isWrongNetwork', 'totalInvested']),
    isMobile() {
      const smDown = this.$store.state.breakpoints.smDown
      return smDown.indexOf(this.$mq) > -1
    },
  },
  methods: {
    ...mapActions('metamask', ['connectWallet', 'disconnectWallet']),
  },
}
</script>
