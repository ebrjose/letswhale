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
        <i class="mdi mdi-home" />
        <i class="mdi mdi-arrow-left" />
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
            Part of the funds will be used to buy launchpad tokens, so we get VIP access to IDOs, and the rest of the funds we will invest in the IDOs. All the earnings will be distributed evenly based on the percentage of your deposits.
          </p>
          <p class="desc use-text-subtitle2 text-center">
            Seven percent of the earnings will be used to pay the wallet management <strong>(no investment funds will be used to pay the wallet management).</strong>
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
                    :value="humanBusdBalance"
                    label="Total Balance"
                    color="white"
                    suffix="BUSD"
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
                    suffix="BUSD"
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

import { MINIMUM_INVESTMENT, MAXIMUM_INVESTMENT } from '~/store/constants'

import { mapGetters, mapActions } from 'vuex'

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
        // v => /^[0-9]{4,5}$/.test(v) || 'Amount must be have a valid format e.g. 1234',
        // v => v >= MINIMUM_INVESTMENT || 'The minimum investment is 1000 BUSD',
        // v => v <= MAXIMUM_INVESTMENT || 'The maximum investment is 10000 BUSD',
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
    ...mapGetters('metamask', ['humanBusdBalance', 'loggedIn', 'wrongNetwork']),
    isMobile() {
      const smDown = this.$store.state.breakpoints.smDown
      return smDown.indexOf(this.$mq) > -1
    },
  },
  methods: {
    ...mapActions('metamask', ['connectWallet', 'fetchWalletBalance', 'getInvestedAmount', 'sendBUSDTransaction']),
    sendTransaction() {
      this.sendBUSDTransaction(this.amount)
        .then(dataTransaction => {
          this.$axios.post('/api/transactions', dataTransaction).then(({ data }) => {
            this.getInvestedAmount()
            this.fetchWalletBalance()
            this.$router.push('/')
            this.snackbar = true
          })
        })
        .catch(error => {
          console.log('sendTransaction -> error', error)
        })
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.sendTransaction()
      }
    },
  },
}
</script>
