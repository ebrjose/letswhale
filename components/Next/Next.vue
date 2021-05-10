<template>
  <div>
    <div class="item last">
      <title-main align="center">
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
              <v-tab class="tab-label" href="#tab-1">Ispolink</v-tab>
              <v-tab class="tab-label" href="#tab-2">blockbank</v-tab>
              <v-tab class="tab-label" href="#tab-3">charli3</v-tab>
              <v-tab-item value="tab-1">
                <div class="tab-content">
                  <section>
                    <h6 class="text-center use-text-subtitle2">
                      <p class="px-5">
                        Ispolink is novel cross-chain platform for hiring developers powered by Binance Smart Chain and
                        Polygon’s layer 2 technology, we use blockchain for searching leading talents with internal AI-powered
                        algorithms. Our interoperable blockchain ecosystem enable scalable decentralized payments and multiple
                        in-platform token utilities which have been designed to tap in on the huge talent pool within the
                        blockchain space.
                      </p>
                    </h6>
                    <div class="illustration-center">
                      <figure class="figure screen">
                        <img src="/images/nextcoins/ipsolink_web.jpg" alt="screen" />
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
                        BlockBank is powered by our platform's utility token called BANK. Users are able to gain access to our
                        credit card rewards program, use our advanced AI assistant, increase their APY % and earn interest on
                        their tokens by staking BANK in their non-custodial BlockBank cryptocurrency wallet.
                      </p>
                      <p class="px-5">
                        By employing state-of-the-art technological solutions, our multi-purpose platform offers our users a
                        convenient digital banking experience bridging the gap between CeFi and DeFi.
                      </p>
                    </h6>
                    <div class="illustration-center">
                      <figure class="figure screen">
                        <img src="/images/nextcoins/blockbank_web.jpg" alt="screen" />
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
                        Charli3 is the first decentralized oracle being built on Cardano. This allows Charli3 to have all the
                        benefits of existing successful oracle protocols, while having the flexibility of a much more agile
                        blockchain backbone.
                      </p>
                    </h6>
                    <div class="illustration-center">
                      <figure class="figure screen">
                        <img src="/images/nextcoins/charli3_web.jpg" alt="screen" />
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
