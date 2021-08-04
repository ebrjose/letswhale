
<template>
  <v-container class="mb-5">
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :sort-by="['createdAt']"
      :sort-desc="true"
      class="elevation-1"
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
            <v-btn text small color="secondary" :href="`${explorerUrl}/tx/${item.transactionHash}`" target="_blank"  v-bind="attrs" v-on="on">
              {{ item.transactionHash | shortToken }}
            </v-btn>
          </template>
          <span>{{ item.transactionHash }}</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.createdAt`]={item}>
        <div>
          {{ item.createdAt | dateToLocale }}
        </div>
      </template>
      <template v-slot:[`item.accountHash`]={item}>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text small color="orange darken-2" :href="`${explorerUrl}/address/${item.accountHash}`" target="_blank"  v-bind="attrs" v-on="on">
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
        <strong>
          {{ item.amountDec | toDecimal }}
        </strong>
      </template>
      <template v-slot:[`item.status`]={item}>
        <div>
            <v-icon v-if="item.status === 'pending'"> mdi-timelapse </v-icon>
            <v-icon v-if="item.status === 'success'" color="green"> mdi-check-circle-outline </v-icon>
            <v-icon v-if="item.status === 'error'" color="red">mdi-alert-circle-outline</v-icon>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'

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
      items: [],
    }
  },
  mounted() {
    this.getHistory()
  },
  computed: {
    explorerUrl() {
      return this.$store.state.metamask.blockExplorerUrl
    },
    account() {
      return this.$store.state.metamask.account
    },
  },
  methods: {
    ...mapActions('metamask', ['transactionHistory']),

    async getHistory() {
      const { history } = await this.transactionHistory()
      this.items = history
    },
  },
  watch: {
    account() {
      this.getHistory()
    },
  },
}
</script>
