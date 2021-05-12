<template>
  <div class="page-wrap">
    <v-snackbar
      :timeout="4000"
      top
      right
      v-model="snackbar"
      class="notification"
    >
      <div class="action">
        Deposit Sent
      </div>
      <v-btn
        text
        icon
        @click="snackbar = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <hidden point="mdUp">
      <div class="logo logo-header">
        <nuxt-link :to="routeLink.saas.home">
          <img :src="logo" alt="logo">
          <span>
            {{ brand.saas.projectName }}
          </span>
        </nuxt-link>
      </div>
    </hidden>

    <v-container class="inner-wrap max-md">
      <v-btn
        :to="routeLink.saas.home"
        icon
        class="backtohome"
      >
        <i class="ion-ios-home-outline" />
        <i class="ion-ios-arrow-thin-left" />
      </v-btn>
      <div class="decoration">
        <svg class="left-deco">
          <use xlink:href="/images/saas/deco-bg-left.svg#main" />
        </svg>
        <svg class="right-deco">
          <use xlink:href="/images/saas/deco-bg-right.svg#main" />
        </svg>
      </div>
      <v-card class="form-box fragment-fadeUp">
        <div class="full-form-wrap">

          <h3 class="use-text-title title-contact pb-3 text-center">
            {{ $t('common.contact_title2') }}
          </h3>
          <p class="desc use-text-subtitle2 text-center">
            {{ $t('common.contact_subtitle') }}
          </p>


          <div v-if="loggedIn && !wrongNetwork" class="form">
            <v-form
              ref="form"
              v-model="valid"
            >
              <v-row class="spacing6">
                <v-col cols="12" sm="6" class="px-6">
                  <v-text-field
                    class="input light"
                    :value="humanBalance"
                    label="Total Balance"
                    color="white"
                    suffix="BNB"
                    readonly
                    filled
                  />
                </v-col>
                <v-col cols="12" sm="6" class="px-6">
                  <v-text-field
                    v-model="amount"
                    :rules="amountRules"
                    class="input light"
                    label="Investment Amount"
                    color="white"
                    suffix="BNB"
                    filled
                    autofocus
                    required
                  />
                </v-col>
              </v-row>
              <div class="btn-area flex">
                <div class="form-control-label">
                  <v-checkbox
                    v-model="checkbox"
                    color="secondary"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    :label="$t('common.form_terms')"
                    class="white-label"
                    required
                  />

                </div>
                <v-btn
                  :block="isMobile"
                  color="secondary"
                  @click="validate"
                  large
                >
                  MAKE A DEPOSIT
                </v-btn>
              </div>
            </v-form>
          </div>
          <div v-else>
            <metamask class="metamask" />
          </div>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import './form-style.scss';
@import '../Title/title-style.scss';
.metamask {
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 100px;
}
</style>

<script>
import logo from '~/static/images/saas-logo.png'
import brand from '~/static/text/brand'
import link from '~/static/text/link'
import Hidden from '../Hidden'
import Metamask from '~/components/Metamask'

import { mapGetters, mapActions } from 'vuex'
import { dec2weihex } from '~/assets/utils/number'

export default {
  layout: 'default',
  components: {
    Hidden,
    Metamask,
  },
  data() {
    return {
      valid: true,
      snackbar: false,
      amountRules: [
        v => !!v || 'Amount is required',
        v => /^[0-9]+(\.[0-9]{1,4})?$/.test(v) || 'Amount must be have a valid format e.g. 1.234',
        v => v > 1.5 || 'The minimum investment is 1.5 BNB',
      ],
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      checkbox: false,
      logo: logo,
      brand: brand,
      routeLink: link,
      account: this.$store.state.metamask.account,
      amount: null,
    }
  },
  computed: {
    ...mapGetters('metamask', ['humanBalance', 'loggedIn', 'wrongNetwork']),
    isMobile() {
      const smDown = this.$store.state.breakpoints.smDown
      return smDown.indexOf(this.$mq) > -1
    },
  },
  methods: {
    ...mapActions('metamask', ['connectWallet', 'fetchWalletBalance', 'getInvestedAmount']),
    async sendTransaction() {
      const params = {
        from: this.$store.state.metamask.account,
        to: '0xc6e675854dce5bc61c7b7af049f0d28f99d34a84',
        // from: '0x7e9a738F691049fDD0B737F5E8155D22CA5C54aA',
        // gas: '0x5208', // 30400
        // gasPrice: '0x0', // 10000000000000
        value: dec2weihex(this.amount), // 6250000000000000000 wei -> HEX
        // data: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee',
      }
      try {
        const transaction = await ethereum.request({
          method: 'eth_sendTransaction',
          params: [params],
        })

        const dataTransaction = {
          accountHash: params.from,
          transactionHash: transaction,
          amountHex: params.value,
          amountDec: this.amount,
        }
        this.$axios.post('/api/transactions', dataTransaction).then(({ data }) => {
          this.getInvestedAmount()
          this.fetchWalletBalance()
          this.$router.push('/')
          this.snackbar = true
        })
      } catch (error) {
        console.log('sendTransaction -> error', error)
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.sendTransaction()
      }
    },
  },
}
</script>
