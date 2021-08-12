<template>
  <v-container>
    <v-row justify="center" align="center" class="text-center tvl-text">
      <v-col cols="12" sm="3">
        <v-card class="pa-10" flat rounded>
          <h3 class="title font-weight-bold">Total Investors</h3>
          <h4 class="display-2 font-weight-bold mt-10" id="totalInvestors">
            {{ tvl.total_investors }}
          </h4>
        </v-card>
      </v-col>
      <v-col cols="12" sm="5">
        <v-card class="pa-10" flat rounded>
          <h3 class="title font-weight-bold">Total Value Locked (TVL)</h3>
          <h4 class="display-2 font-weight-bold mt-10" id="tvlCounter">
            {{  (Math.round(tvl.total_tvl * 100) / 100).toLocaleString() }}
            BUSD
          </h4>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      tvl: {
        total_investors: 0,
        total_tvl: 0,
      },
    }
  },
  mounted() {
    this.loaded = true
    this.getTVL()
  },
  methods: {
    async getTVL() {
      const { data } = await this.$axios.get('/api/transactions')
      this.tvl = data.data
    },
  },
}
</script>

<style lang="scss">
.tvl-text {
  h4 {
    .theme--dark & {
      color: $palette-primary-light;
    }
    .theme--light & {
      color: $palette-primary-main;
    }
  }
}
</style>
