
<template>
  <v-container style="z-index: 81">
    <v-data-table
      :headers="headers"
      :items="transactionHistory"
      :items-per-page="10"
      :sort-by="['createdAt']"
      :sort-desc="true"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }"
    >
      <template v-slot:[`item.transactionHash`]={item}>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text small color="secondary" :href="`${blockExplorerUrl}/tx/${item.transactionHash}`" target="_blank"  v-bind="attrs" v-on="on">
              {{ item.transactionHash | shortToken }}
            </v-btn>
          </template>
          <span>{{ item.transactionHash }}</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.createdAt`]={item}>
        <div :class="{ 'font-weight-bold': item.status === 'success',  'grey--text' : item.status === 'error'}">
          {{ item.createdAt | dateToLocale }}
        </div>
      </template>
      <template v-slot:[`item.accountHash`]={item}>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text small color="orange darken-2" :href="`${blockExplorerUrl}/address/${item.accountHash}`" target="_blank"  v-bind="attrs" v-on="on">
              {{ item.accountHash | shortToken }}
            </v-btn>
          </template>
          <span>{{ item.accountHash }}</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.token`]={item}>
        <v-btn text small color="primary">
          {{ item.token }}
        </v-btn>
      </template>
      <template v-slot:[`item.amountDec`]={item}>
        <div :class="{ 'font-weight-bold': item.status === 'success',  'grey--text' : item.status === 'error'}"> {{ item.amountDec | toDecimal }} </div>
      </template>
      <template v-slot:[`item.status`]={item}>
        <div>
            <v-progress-circular v-if="item.status === 'pending'" size="20" width="2" indeterminate color="primary" />
            <v-icon v-if="item.status === 'success'" color="green"> mdi-check-circle-outline </v-icon>
            <v-icon v-if="item.status === 'error'" color="red">mdi-alert-circle-outline</v-icon>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      headers: [
        {
          text: 'Txn Hash',
          value: 'transactionHash',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Date',
          value: 'createdAt',
          align: 'end',
        },
        {
          text: 'From',
          value: 'accountHash',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Coin',
          value: 'token',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Amount',
          value: 'amountDec',
          align: 'end',
        },
        {
          text: 'Status',
          value: 'status',
          align: 'center',
        },
      ],
    }
  },
  mounted() {
    this.fetchTransactionHistory()
  },
  computed: {
    ...mapState('metamask', ['transactionHistory', 'blockExplorerUrl', 'account']),
  },
  methods: {
    ...mapActions('metamask', ['fetchTransactionHistory']),
  },
  watch: {
    account() {
      this.fetchTransactionHistory()
    },
  },
}
</script>
