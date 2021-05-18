<template>
  <div>
    <div class="item last">
      <title-main align="center px-5">
        <span>
          NEXT ICOs TO BE LAUCHED
        </span>
      </title-main>
      <div class="tab">
        <v-row class="spacing6">
          <v-col
            v-if="!isMobile"
            class="pa-6"
            md="1"
            cols="12"
          />
          <v-col md="10" cols="12" class="pa-6">
            <v-tabs
              v-model="tab"
              class="tabs"
              color="primary"
              centered
            >
              <v-tabs-slider color="primary" />
              <v-tab class="tab-label" href="#tab-1">Cere Network</v-tab>
              <v-tab class="tab-label" href="#tab-2">ECO</v-tab>
              <v-tab class="tab-label" href="#tab-3">Enso Finance</v-tab>
              <v-tab-item value="tab-1">
                <div class="tab-content">
                  <section>
                    <h6 class="text-center use-text-subtitle2">
                      <p class="px-5">
                        Cere’s DDC platform is the “next-gen Snowflake”. It establishes a more secure first-party data foundation in the cloud by using
                        blockchain identity and data encryption to onboard and segment individual consumer data.
                      </p>
                      <p class="px-5">
                        Cere makes data directly accessible in near real-time by all business units, partners/vendors, and machine-learning processes. This in turn enables secure and private data collaborations through Cere’s Open Data Marketplace (ODM) which is free from traditional vendor lock-ins.
                      </p>
                    </h6>
                    <div class="illustration-center">
                      <figure class="figure screen">
                        <img src="/images/nextcoins/CereNetwork.jpg" alt="screen" />
                      </figure>
                    </div>
                  </section>
                </div>
              </v-tab-item>
              <v-tab-item value="tab-2">
                <div class="tab-content">
                  <section>
                    <h6 class="text-center use-text-subtitle2">
                      <p class="px-5">
                        Eco is one simple balance that lets you spend, send, save and make money at the same time. Join the 170,000+ people ready for Smart Money.
                      </p>
                      <p class="px-5">
                        Eco is not a checking account because you earn 2.5% on your balance (and up to 5% when you refer friends).
                        Eco is not a credit card because every time you spend at your favorite merchants you get 5% back.
                      </p>
                      <p class="px-5">
                        It replaces both with rewards that seem too good to be true (but actually aren’t).
                      </p>
                    </h6>
                    <div class="illustration-center">
                      <figure class="figure screen">
                        <img src="/images/nextcoins/Eco.jpg" alt="screen" />
                      </figure>
                    </div>
                  </section>
                </div>
              </v-tab-item>
              <v-tab-item value="tab-3">
                <div class="tab-content">
                  <section>
                    <h6 class="text-center use-text-subtitle2">
                      <p class="px-5">
                        Discover and create open defi strategies.
                        Create social metastrategies with batch asset purchasing, yield farming, liquidity mining,
                        tolerance band rebalancing, restructuring, flash swaps, collateralization, and arbitrage.
                      </p>
                    </h6>
                    <div class="illustration-center">
                      <figure class="figure screen">
                        <img src="/images/nextcoins/EnsoFinance.jpg" alt="screen" />
                      </figure>
                    </div>
                  </section>
                </div>
              </v-tab-item>
            </v-tabs>
            <!-- <parallax-large /> -->
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../Feature/feature-style.scss';
</style>

<script>
import Title from '../Title'
export default {
  components: {
    'title-main': Title,
  },
  data() {
    return {
      tab: null,
    }
  },
  computed: {
    isMobile() {
      const smDown = this.$store.state.breakpoints.smDown
      return smDown.indexOf(this.$mq) > -1
    },
  },
}
</script>
