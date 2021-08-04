<template>
  <div class="root-banner">
    <div class="decoration">
      <svg class="left-deco">
        <use xlink:href="/images/saas/deco-bg-left.svg#main" />
      </svg>
      <svg class="right-deco">
        <use xlink:href="/images/saas/deco-bg-right.svg#main" />
      </svg>
    </div>
    <v-container>
      <div class="text">
        <h3 class="use-text-title">
          {{ title }}
        </h3>
      </div>
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
import imgAPI from '~/static/images/imgAPI'
import link from '~/static/text/link'
import Hidden from '../Hidden'

import Particle from '~/components/Animations/Particle'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    Hidden,
    Particle,
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
      navOffset: 20,
    }
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
@import './page-banner-style.scss';
</style>
