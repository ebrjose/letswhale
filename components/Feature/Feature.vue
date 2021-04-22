<template>
  <div class="root">
    <div class="decoration">
      <svg class="wave">
        <use xlink:href="/images/saas/deco-bg.svg#main" />
      </svg>
    </div>
    <v-container :class="{ fixed: isDesktop }">
      <div class="item">
        <u-animate-container>
          <v-row :class="[isMobile ? 'column-reverse' : 'row']">
            <v-col cols="12" md="6">
              <div class="illustration-left">
                <section class="parallax-wrap" v-if="loaded">
                  <parallax
                    :speed-factor="isMobile ? 0 : 0.15"
                    :section-height="isMobile ? 0 : 400"
                    direction="up"
                  >
                    <div class="viewport">
                      <figure class="figure screen">
                        <!-- <img :src="imgAPI.saas[0]" alt="screen" /> -->
                        <img src="https://miro.medium.com/max/2400/1*2dTkU5AO-R0wM-mQx8j1Ug.gif" alt="screen">
                      </figure>
                    </div>
                  </parallax>
                </section>
                <section
                  class="parallax-wrap"
                  v-if="loaded && !isMobile"
                >
                  <parallax
                    :speed-factor="isMobile ? 0 : 0.15"
                    :section-height="100"
                    direction="down"
                  >
                    <div class="viewport">
                      <figure class="figure graphic">
                        <img src="/images/stat1.jpg" alt="illustration" />
                      </figure>
                    </div>
                  </parallax>
                </section>
                <!-- <parallax-medium /> -->
              </div>
            </v-col>
            <v-col md="6" cols="12">
              <u-animate
                :offset="-100"
                name="fadeInLeftShort"
                delay="0.5s"
                duration="0.5s"
              >
                <div class="desc">
                  <title-main :align="isMobile ? 'center' : 'left'">
                    <span>
                      {{ $t('saasLanding.feature_title1') }}
                      <strong>
                        {{ $t('saasLanding.feature_titlestrong1') }}
                      </strong>
                    </span>
                  </title-main>
                  <h6 class="use-text-subtitle2" :class="[isMobile ? 'text-center' : 'text-left']">
                    <p v-html=" $t('saasLanding.feature_desc1_1')" />
                    <p>{{ $t('saasLanding.feature_desc1_2') }}</p>
                    <p><strong>{{ $t('saasLanding.feature_desc1_3') }}</strong></p>
                  </h6>
                  <v-btn color="primary" large class="btn">
                    {{ $t('saasLanding.banner_btn_getstarted') }}
                  </v-btn>
                </div>
              </u-animate>
            </v-col>
          </v-row>
        </u-animate-container>
      </div>

      <div class="item">
        <v-row>
          <v-col md="6" cols="12">
            <u-animate-container>
              <u-animate
                :offset="10"
                name="fadeInRightShort"
                delay="0.5s"
                duration="0.5s"
              >
                <div class="desc">
                  <title-main :align="isMobile ? 'center' : 'right'">
                    <span>
                      {{ $t('saasLanding.feature_title2') }}
                      <strong>
                        {{ $t('saasLanding.feature_titlestrong2') }}
                      </strong>
                    </span>
                  </title-main>
                  <h6 class="use-text-subtitle2" :class="[isMobile ? 'text-center' : 'text-right']">
                    {{ $t('saasLanding.feature_desc2') }}
                  </h6>
                  <div :class="[isMobile ? 'text-center' : 'text-right']">
                    <v-btn color="primary" large class="btn">
                      {{ $t('saasLanding.banner_btn_getstarted') }}
                    </v-btn>
                  </div>
                </div>
              </u-animate>
            </u-animate-container>
          </v-col>
          <v-col md="6" cols="12">
            <div class="illustration-right">
              <section class="parallax-wrap" v-if="loaded">
                <parallax
                  :speed-factor="isMobile ? 0 : 0.15"
                  :section-height="isMobile ? 0 : 300"
                  direction="up"
                >
                  <div class="viewport">
                    <figure class="figure screen">
                      <img src="/images/BigCapitals.png" alt="screen" />
                    </figure>
                  </div>
                </parallax>
              </section>
              <section
                class="parallax-wrap"
                v-if="loaded && !isMobile"
              >
                <parallax
                  :speed-factor="isMobile ? 0 : 0.15"
                  :section-height="100"
                  direction="down"
                >
                  <div class="viewport">
                    <figure class="graphic">
                      <img src="/images/SilverTray.png" alt="illustration" />
                    </figure>
                  </div>
                </parallax>
              </section>
              <!-- <parallax-medium /> -->
            </div>
          </v-col>
        </v-row>
      </div>
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
                        Ispolink is novel cross-chain platform for hiring developers powered by Binance Smart Chain and
                        Polygon’s layer 2 technology, we use blockchain for searching leading talents with internal AI-powered
                        algorithms. Our interoperable blockchain ecosystem enable scalable decentralized payments and multiple
                        in-platform token utilities which have been designed to tap in on the huge talent pool within the
                        blockchain space.
                      </h6>
                      <div class="illustration-center">
                        <figure class="figure screen">
                          <img :src="imgAPI.saas[4]" alt="screen" />
                        </figure>
                      </div>
                    </section>
                  </div>
                </v-tab-item>
                <v-tab-item value="tab-2">
                  <div class="tab-content">
                    <section>
                      <h6 class="text-center use-text-subtitle2">
                        <p>
                          BlockBank is powered by our platform's utility token called BANK. Users are able to gain access to our
                          credit card rewards program, use our advanced AI assistant, increase their APY % and earn interest on
                          their tokens by staking BANK in their non-custodial BlockBank cryptocurrency wallet.
                        </p>
                        <p>
                          By employing state-of-the-art technological solutions, our multi-purpose platform offers our users a
                          convenient digital banking experience bridging the gap between CeFi and DeFi.
                        </p>
                      </h6>
                      <div class="illustration-center">
                        <figure class="figure screen">
                          <img :src="imgAPI.saas[5]" alt="screen" />
                        </figure>
                      </div>
                    </section>
                  </div>
                </v-tab-item>
                <v-tab-item value="tab-3">
                  <div class="tab-content">
                    <section>
                      <h6 class="text-center use-text-subtitle2">
                        <p>
                          Charli3 is the first decentralized oracle being built on Cardano. This allows Charli3 to have all the
                          benefits of existing successful oracle protocols, while having the flexibility of a much more agile
                          blockchain backbone.
                        </p>
                      </h6>
                      <div class="illustration-center">
                        <figure class="figure screen">
                          <img :src="imgAPI.saas[6]" alt="screen" />
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
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import './feature-style.scss';
</style>

<script>
import Parallax from 'vue-parallaxy'
import imgAPI from '~/static/images/imgAPI'
import ParallaxMedium from '../Parallax/Medium'
import ParallaxLarge from '../Parallax/Large'
import Title from '../Title'

export default {
  components: {
    Parallax,
    ParallaxMedium,
    ParallaxLarge,
    'title-main': Title
  },
  data() {
    return {
      tab: null,
      imgAPI: imgAPI,
      loaded: false
    }
  },
  mounted() {
    this.loaded = true
  },
  computed: {
    isDesktop() {
      const lgUp = this.$store.state.breakpoints.lgUp
      return lgUp.indexOf(this.$mq) > -1
    },
    isMobile() {
      const smDown = this.$store.state.breakpoints.smDown
      return smDown.indexOf(this.$mq) > -1
    }
  }
}
</script>
