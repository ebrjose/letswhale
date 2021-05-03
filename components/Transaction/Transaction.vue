<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <v-card>
        <v-toolbar color="secondary" dark > Deposit the Funds </v-toolbar>
        <v-card-title class="headline">
          Balance: {{ balanceDecimal }} BNB
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="ammount"
            color="secondary"
            label="Amount"
            placeholder="0.0"
            outlined
            suffix="BNB"
            type="number"
            :autofocus="true"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="closeDialog()"> Close </v-btn>
          <v-btn color="secondary darken-1" @click="sendTransaction()"> Send </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      color="secondary"
      large
      @click="openDialog()"
    >
      {{ $t('saasLanding.banner_btn_getstarted') }}
    </v-btn>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { dec2weihex, weihex2dec } from '~/assets/utils/number'
export default {
  data() {
    return {
      dialog: false,
      balance: null,
      ammount: null,
    }
  },
  computed: {
    balanceDecimal() {
      return this.balance?.toFixed(4)
    },
  },
  methods: {
    ...mapActions('metamask', ['getWalletBalance']),
    sendTransaction() {
      if (this.ammount / 1 > this.balance) {
        alert('ammount error')
        return
      }

      ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: this.$store.state.metamask.account,
              to: '0xc6e675854dce5bc61c7b7af049f0d28f99d34a84',
              // from: '0x7e9a738F691049fDD0B737F5E8155D22CA5C54aA',
              // gas: '0x5208', // 30400
              // gasPrice: '0x0', // 10000000000000
              value: dec2weihex(this.ammount), // 6250000000000000000 wei -> HEX
              // data: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee'
            },
          ],
        })
        .then(result => {
          console.log('sendTransaction -> result', result)
        })
        .catch(error => {
          console.log('sendTransaction -> error', error)
        })
    },
    async openDialog() {
      const weiHexBalance = await this.getWalletBalance()
      this.balance = weihex2dec(weiHexBalance)
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
  },
}
</script>
