<template>
  <div>
    <v-menu v-if="loggedIn" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          class="text-lowercase teal--text text--accent-3 font-weight-bold"
        >
          {{ accountShorted }}
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item>
          <v-list-item-content class="text-center" @click="disconnectWallet">
            <v-list-item-title>Disconnect</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn v-else color="primary" @click="connectWallet" class="mr-1 amber--text text--accent-4 font-weight-bold">
      {{ $t('saasLanding.connect_wallet') }}
    </v-btn>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  created() {
    // Metamask
    if (process.browser) {
      const metamaskAccount = localStorage.getItem('account')
      const chainId = localStorage.getItem('chainId')
      if (metamaskAccount && chainId === 56) {
        this.$store.commit('metamask/SET_ACCOUNT', metamaskAccount)
        this.$store.commit('metamask/SET_CHAINID', chainId)
      } else {
        this.connectWallet()
      }
    }
  },
  computed: {
    ...mapGetters('metamask', ['loggedIn', 'accountShorted'])
  },
  methods: {
    ...mapActions('metamask', ['connectWallet', 'disconnectWallet'])
  }
}
</script>
