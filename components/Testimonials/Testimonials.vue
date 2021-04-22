<template>
<div class="root">
  <v-container :class="{ fixed: isDesktop }">
    <v-row class="spacing6">
      <v-col md="7" cols="12" class="px-6">
        <div class="slider-wrap">
          <hidden point="smDown">
            <div class="decoration">
              <svg width="900px" height="618px" viewBox="0 0 900 618" version="1.1">
                <defs>
                  <linearGradient x1="78.2441494%" y1="65.8737759%" x2="10.5892887%" y2="33.8596367%" id="linearGradient-1">
                    <stop :stop-color="$vuetify.theme.themes.light.primarydark" offset="0%" />
                    <stop :stop-color="$vuetify.theme.themes.light.primary" offset="100%" />
                  </linearGradient>
                </defs>
                <g stroke="none" stroke-width="0" fill="none" fill-rule="evenodd">
                  <path d="M442.972909,617.331576 C569.290851,617.331576 618.618612,525.937324 804.142458,549.304771 C989.666303,572.672218 872.7227,109.743835 732.652282,54.307977 C592.581863,-1.12788075 538.308155,61.549598 304.148084,8.36113994 C69.9880137,-44.8273182 0,167.6782 0,308.489881 C0,450.379879 177.014996,617.331576 442.972909,617.331576 Z" id="Oval" fill="url(#linearGradient-1)" />
                </g>
              </svg>
            </div>
          </hidden>
          <h3
            :class="[isMobile ? 'text-center' : 'text-left']"
            class="testi-title use-text-title2">
            {{ $t('saasLanding.testi_title') }}
            <br />
            <strong>
              {{ $t('saasLanding.testi_titlestrong') }}
            </strong>
          </h3>
          <v-icon class="icon">mdi-format-quote-close</v-icon>
          <div v-if="loaded" class="carousel">
            <slick
              ref="slider"
              :options="slickOptions"
              @afterChange="handleAfterChange"
            >
              <div
                v-for="(item, index) in testiContent"
                class="item"
                :key="index"
              >
                <div class="inner">
                  <div class="profile">
                    <v-avatar class="avatar">
                      <img :src="item.avatar" :alt="item.name" />
                    </v-avatar>
                    <h6 class="name">
                      {{ item.name }}
                      <span>
                        {{ item.title }}
                      </span>
                    </h6>
                  </div>
                  <div class="align-self-center">
                    <p v-for="(txt, idx) in item.text" :key="idx" class="use-text-paragraph">
                      {{ txt }}
                    </p>
                  </div>
                </div>
              </div>
            </slick>
          </div>
        </div>
      </v-col>
      <v-col md="5" cols="12" class="use-hidden-sm-down px-6">
        <hidden point="smDown">
          <div class="logo-wrap">
              <div
                v-for="(item, index) in testiContent"
                :key="index"
                class="figure-btn"
              >
                <v-btn
                  @click="gotoSlide(index)"
                  text
                  :class="{ active: currentSlide === index }"
                >
                  <img
                    :src="item.logo"
                    :alt="'logo' + index"
                    :key="index"
                  >
                </v-btn>
              </div>
          </div>
        </hidden>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<style lang="scss" scoped>
@import './testi-style.scss';
</style>

<script>
import Hidden from '../Hidden'
import colors from 'vuetify/lib/util/colors'

const palette = {
  violeta: {
    primary: colors.purple.base, // primary main
    primarylight: colors.purple.lighten4, // primary light
    primarydark: colors.purple.darken3, // primary dark
    secondary: colors.lightGreen.base, // secondary main
    secondarylight: colors.lightGreen.lighten4, // secondary light
    secondarydark: colors.lightGreen.darken3, // secondary dark
    anchor: colors.purple.base // link
  }
}

const theme = {
  ...palette.violeta
}

const testiData = [
  {
    avatar: '/images/logos3/logo_aioz.png',
    name: 'AIOZ Network',
    title: 'AIOZ',
    logo: '/images/logos3/logo_aioz.png',
    text: [
      `AIOZ Network IDO was offered at 0.015$us on April 1st and went up to 2.65$us on April 3rd, doing a 176x for early investors. That means if you would have invested only 1000 dollars in that coin, you would have made more than one hundred and seventy-five thousand dollars, after 48 hours. `,
      `AIOZ Network is a company that offers reliable CDN to web developers based in the blockchain to make it more reliable, efficient and low cost.`
    ]
  },
  {
    avatar: '/images/logos3/logo_cardstarter.png',
    name: 'Cardstarter',
    title: 'CARDS',
    logo: '/images/logos3/logo_cardstarter.png',
    text: [
      `Cardstarter ICO was offered at 0.15$us in Round 2 on March 25th and went up to 2.62$us on April 1st, doing a 17x for early investors. That means if you would have invested only 1000 dollars in that coin, you would have made more than sixteen thousand dollars, after 48 hours, but this coin is now above 20$us meaning a 133x to all the diamond hands. `,
      `CardStarter is a decentralized accelerator and swapping platform, connecting early stage Cardano projects with investors.`
    ]
  },
  {
    avatar: '/images/logos3/logo_polkamon.jpg',
    name: 'Polkamon',
    title: 'PMON',
    logo: '/images/logos3/logo_polkamon.jpg',
    text: [
      `Polkamon ICO was offered at 0.35$us on March 1st and went up to 62.10$us on April 2nd, doing a 177x for early investors. That means if you would have invested only 1000 dollars in that coin, you would have made more than one hundred and seventy-six thousand dollars, after 48 hours. `,
      `Polkamon is a NFT project and has beautifully animated digital collectibles to buy and sell.`
    ]
  },
  {
    avatar: '/images/logos3/logo_polkadomain.png',
    name: 'Polkadomain',
    title: 'NAME',
    logo: '/images/logos3/logo_polkadomain.png',
    text: [
      `PolkaDomain ICO was offered at 0.16$us on April 16th and went up to 3.78$us on April 18th, doing a 23x for early investors. That means if you would have invested only 1000 dollars in that coin, you would have made more than twenty-two thousand dollars, after 48 hours. `,
      `Polkadomain help to connect a domain to your digital identity, using NFT technology to store a domain.`
    ]
  },
  {
    avatar: '/images/logos3/logo_yellow_road.png',
    name: 'Yellow Road',
    title: 'ROAD',
    logo: '/images/logos3/logo_yellow_road.png',
    text: [
      `Yellow Road ICO was offered at 0.2$us on April 10th and went up to 21.01$us on April 11th, doing a 105x for early investors. That means if you would have invested only 1000 dollars in that coin, you would have made hundred and four thousand dollars, after 24 hours. `,
      `Yellow Road aims to achieve that through a platform dedicated to BSC project IDOs so they get backed by a community that trusts in them. It offers a range of funding solutions from smart auctions to community building and engagement programs for new projects.`
    ]
  },
  {
    avatar: '/images/logos3/logo_splyt.jpg',
    name: 'Splyt',
    title: 'SHOPX',
    logo: '/images/logos3/logo_splyt.jpg',
    text: [
      `Splyt ICO was offered at 0.042$us on March 31th and went up to 4.73$us on March 31th, doing a 112x for early investors. That means if you would have invested only 1000 dollars in that coin, you would have made more than hundred and eleven thousand dollars, in less than 24 hours.`,
      `Splyt’s eNFT (E-commerce-Non-Fungible-Token) tokenizes off-chain products on the blockchain. This streamlines digital sales and enables lifetime product data tracking not previously possible. The eNFT empowers a transparent e-commerce ecosystem.`
    ]
  },
  {
    avatar: '/images/logos3/logo_unmarshal.png',
    name: 'Unmarshal',
    title: 'MARSH',
    logo: '/images/logos3/logo_unmarshal.png',
    text: [
      `Unmarshal ICO was offered at 0.17$us on March 30th and went up to 8.34$us on March 31th, doing a 49x for early investors. That means if you would have invested only 1000 dollars in that coin, you would have made forty-eight thousand dollars, after 24 hours. `,
      `Unmarshal is a Decentralized network of blockchain data indexers and transforming tools to power DeFi applications on any chain.`
    ]
  },
  {
    avatar: '/images/logos3/logo_blind_boxes.jpg',
    name: 'Blind Boxes',
    title: 'BLES',
    logo: '/images/logos3/logo_blind_boxes.jpg',
    text: [
      `Blind Boxes ICO was offered at 0.15$us on March 28th and went up to 9.93$us on March 28th, doing a 66x for early investors. That means if you would have invested only 1000 dollars in that coin, you would have made sixty-five thousand dollars, in less than 24 hours. `,
      `Blind Boxes offers collectors opportunities to discover new artists and own valuable limited-edition assets.`
    ]
  },
  {
    avatar: '/images/logos3/logo_a2dao.jpg',
    name: 'A2DAO',
    title: 'ATD',
    logo: '/images/logos3/logo_a2dao.jpg',
    text: [
      `A2DAO ICO was offered at 0.1$us on March 18th and went up to 10.26$us in public sale on March 28th, doing a 102X for early investors. That means if you would have invested only 1000 dollars in that coin, you would have made more than one hundred thousand dollars, after 24 hours. `,
      `A2DAO connects blockchain startups with smart money and helps cultivate community for each respective project.`
    ]
  }
]

export default {
  components: {
    Hidden,
    Slick: () => import('vue-slick')
  },
  data() {
    return {
      loaded: false,
      currentSlide: 0,
      testiContent: testiData,
      slickOptions: {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        fade: true,
        arrows: false,
        pauseOnHover: false
      }
    }
  },
  mounted() {
    this.loaded = true
    this.$vuetify.theme.themes = {
      light: {
        ...theme
      },
      dark: {
        ...theme
      }
    }
  },
  methods: {
    handleAfterChange(event, slick, currentSlide) {
      this.currentSlide = currentSlide
    },
    gotoSlide(index) {
      this.$refs.slider.goTo(index)
    }
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
