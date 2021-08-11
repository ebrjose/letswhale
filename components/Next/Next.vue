<template>
  <div>
    <div class="item last">
      <title-main align="center px-5">
        <span>
          Launchpad's token bargains
        </span>
      </title-main>
      <div class="tab">
        <v-container>
          <p class="pb-10 text-center use-text-subtitle2">
            Now it’s the best time to buy launchpad tokens, you alone can buy lot of these tokens and wait a few months to go up with the price, but only a WHALE can buy the enough tokens to have priority access in ICO and IDO projects, and have more than 100x profits.
          </p>
        </v-container>
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
              <v-tab class="tab-label" href="#tab-1">DAO Maker (DAO)</v-tab>
              <v-tab class="tab-label" href="#tab-2">Trustswap (SWAP)</v-tab>
              <v-tab class="tab-label" href="#tab-3">Cardstarter (CARDS)</v-tab>
              <v-tab-item value="tab-1">
                <div class="tab-content">
                  <section>
                    <h6 class="text-center use-text-subtitle2">
                      <p class="px-5">
                        DAO Maker creates growth technologies and funding frameworks for startups, while simultaneously reducing risks for investors
                      </p>
                      <p class="px-5">
                        DAO Maker is the growth solutions provider and blockchain project launchpad behind some of this year’s most successful projects — including Orion Protocol, My Neighbor Alice, LaunchX and DAFI Protocol.
                      </p>
                    </h6>
                    <div class="illustration-center">
                      <figure class="figure screen">
                        <img src="/images/nextcoins/DaoMaker.png" alt="screen" />
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
                        In traditional finance, venture capital firms get priority access to early-stage startups. Because of this exclusivity, the general public gets stuck buying in later at higher prices creating an unfair situation.
                      </p>
                      <p class="px-5">
                        With TrustSwap, you become the VC and gain priority-access to early stage crypto startups. By staking SWAP, you get guaranteed access. The more SWAP you stake, the larger allocation you receive.
                      </p>
                    </h6>
                    <div class="illustration-center">
                      <figure class="figure screen">
                        <img src="/images/nextcoins/TrustSwap.png" alt="screen" />
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
                        CardStarter is a decentralized accelerator and swapping platform, connecting early stage Cardano innovators with our community of donors.
                      </p>
                      <p class="px-5">
                        $CARDS token holders who qualify for our tiered system are guaranteed varied allocation to early sales of projects launching through our platform.
                        Each project that launches through our platform will contribute to our insurance treasury, providing donors in our community a sense of financial protection against potential project failure.
                      </p>
                    </h6>
                    <div class="illustration-center">
                      <figure class="figure screen">
                        <img src="/images/nextcoins/Cardstarter.png" alt="screen" />
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
