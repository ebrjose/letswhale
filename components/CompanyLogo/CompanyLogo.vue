<template>
  <v-container class="fixed-width">
    <div class="root company-logo">
      <h4 class="logo-title">Support</h4>
      <!-- <v-tooltip v-for="(logo, index) in logos" :key="index">
        <template v-slot:activator="{ on, attrs }">
          <img
            :src="logo.image"
            :alt="'logo' + index"
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <span>
          asd
        </span>
      </v-tooltip> -->
      <v-menu
        v-for="(logo, index) in logos" :key="index"
        open-on-hover
        bottom
        offset-y
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <img
            :src="logo.image"
            :alt="logo.network"
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <v-card max-width="500">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  :src="logo.image"
                  :alt="logo.network"
                >
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="title">
                  <span>{{ logo.network }}</span>
                  <v-btn icon :href="logo.link" target="_blank" color="cyan">
                    <v-icon>mdi-open-in-new</v-icon>
                  </v-btn>
                </v-list-item-title>
                <v-list-item-subtitle>[{{ logo.token }}]</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>
          <v-list>
            <v-list-item>
              <p>
                <strong>TOKEN:</strong>
                <v-chip v-for="(tag,idx) in logo.tags.split(',')" :key="idx" class="mr-1 mb-1" small :class="getColor()"><small>{{ tag }}</small></v-chip>
              </p>
            </v-list-item>
            <v-list-item>
              <p class="caption font-weight-light">{{ logo.description }}</p>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
@import './logo-style.scss';
</style>

<script>
export default {
  data() {
    return {
      logos: [
        {
          network: 'PAID Network',
          token: 'PAID',
          image: '/images/logos2/paid2.png',
          tags: 'ETHEREUM, DEFI, LAUNCHPAD, STAKING, GOVERNANCE, POLKASTARTER',
          description:
            'PAID Network is an ecosystem DAPP that leverages blockchain technology to deliver DeFi powered SMART agreements.',
          link: 'https://paidnetwork.com',
        },
        {
          network: 'Polkastarter',
          token: 'POLS',
          image: '/images/logos2/polkastarter2.jpg',
          tags: 'ETHEREUM, BINANCE, DEFI, LAUNCHPAD, POLKADOT, ECOSYSTEM',
          description:
            'Polkastarter is a DEX built for cross-chain token pools and auctions, enabling projects to raise capital on Polkadot.',
          link: 'https://www.polkastarter.com',
        },
        {
          network: 'Cardstarter',
          token: 'CARDS',
          image: '/images/logos2/cardstarter.png',
          tags: 'ETHEREUM, BLOCKCHAIN SERVICE',
          description:
            'CardStarter is a decentralized accelerator and swapping platform, connecting early stage Cardano innovators with our community of donors.',
          link: 'https://www.cardstarter.io',
        },
        {
          network: 'DuckDaoDime',
          token: 'DDIM',
          image: '/images/logos2/duckdao2.png',
          tags: 'ETHEREUM, DEFI',
          description: 'DuckDAO is the first seed crypto startup community accelerator.',
          link: 'https://duckdao.io',
        },
        {
          network: 'BSCPAD',
          token: 'BSCPAD',
          image: '/images/logos2/bscpad2.png',
          tags: 'BINANCE, BLOCKCHAIN SERVICE, LAUNCHPAD, BSCPAD',
          description: 'BSCPAD is the first launch pad dedicated to launching projects on the Binance Smart Chain.',
          link: 'https://bscpad.com',
        },
        {
          network: 'TrustSwap',
          token: 'SWAP',
          image: '/images/logos2/trustswap.jpg',
          tags: 'ETHEREUM, EXCHANGE TOKEN, AMM, LAUNCHPAD',
          description:
            'Trustswap is an easy way for you and anyone in the world to make safe cryptocurrency transactions together.',
          link: 'https://trustswap.org',
        },
      ],
      colors: ['red', 'purple', 'deep-purple', 'indigo', 'blue', 'green', 'light-green', 'lime', 'yellow', 'orange'],
    }
  },
  methods: {
    getColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)] + ' lighten-4'
    },
  },
}
</script>
