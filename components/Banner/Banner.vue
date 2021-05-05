<template>
  <div class="root">
    <v-dialog
      v-model="dialog"
      max-width="690"
    >
      <v-card class="video-popup">
        <v-card-title class="headline">
          <h2 class="title">
            {{ $t('saasLanding.banner_title') }}
            <v-btn icon @click="handleVideoClose()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </h2>
        </v-card-title>
        <div class="text-center" v-if="yt.use">
          <youtube
            :video-id="videoId"
            :player-vars="playerVars"
            :width= "640"
            :height="360"
            ref="youtube"
          />
        </div>
      </v-card>
    </v-dialog>
    <div class="decoration">
      <svg class="left-deco">
        <use xlink:href="/images/saas/deco-bg-left.svg#main" />
      </svg>
      <svg class="right-deco">
        <use xlink:href="/images/saas/deco-bg-right.svg#main" />
      </svg>
    </div>
    <v-container :class="{ fixed: isDesktop, 'container-wrap':true }">
      <v-row>
        <v-col cols="12" md="6">
          <div class="text">
            <h3 class="use-text-title">
              {{ $t('saasLanding.banner_title') }}
              <strong>
                {{ $t('saasLanding.banner_titlestrong') }}
              </strong>
            </h3>
            <p class="use-text-subtitle">
              {{ $t('saasLanding.banner_subtitle') }}
            </p>
            <div class="btn-area">
              <v-btn
                text
                class="play-btn"
                @click="handleVideoOpen()"
              >
                <span class="icon">
                  <i class="ion-ios-play-outline" />
                </span>
                {{ $t('saasLanding.banner_btn_nexticos') }}
              </v-btn>
              <v-btn
              to="/deposit"
                color="secondary"
                large
              >
                {{ $t('saasLanding.banner_btn_getstarted') }}
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="illustration">
            <Rocket />
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div class="deco">
      <hidden point="mdDown">
        <div :class="{ hide: hide }" class="deco-inner">
          <div class="wave wave-one" />
          <div class="wave wave-two" />
        </div>
      </hidden>
      <div class="wave wave-cover" />
    </div>
  </div>
</template>
<script>
import youtube from '~/youtube'
import imgAPI from '~/static/images/imgAPI'
import link from '~/static/text/link'
import Hidden from '../Hidden'
import Rocket from '~/components/Rocket'
export default {
  components: {
    Hidden,
    Rocket,
  },
  data() {
    return {
      videoId: 'KxZAdEGpYAw',
      hide: false,
      link: link,
      imgAPI: imgAPI,
      dialog: false,
      player: null,
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        showinfo: 1,
        mute: 0,
        origin: 'https://localhost:8008',
      },
      yt: youtube,
    }
  },
  methods: {
    handleVideoOpen() {
      if (!this.yt.use) {
        return false
      }
      this.dialog = true
      setTimeout(() => {
        this.player = this.$refs.youtube.player
        this.player.playVideo()
      }, 100)
    },
    handleVideoClose() {
      this.dialog = false
      this.player.pauseVideo()
    },
  },
  computed: {
    isDesktop() {
      const lgUp = this.$store.state.breakpoints.lgUp
      return lgUp.indexOf(this.$mq) > -1
    },
  },
}
</script>

<style lang="scss" scoped>
@import './banner-style.scss';
</style>
