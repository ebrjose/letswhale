<template>
  <div class="footer-deco">
    <!-- <div class="decoration">
      <svg class="left-deco">
        <use xlink:href="/images/saas/deco-bg-left.svg#main" />
      </svg>
      <svg class="right-deco">
        <use xlink:href="/images/saas/deco-bg-right.svg#main" />
      </svg>
    </div> -->
    <div class="action">
      <h4 class="use-text-title2">
        {{ $t('saasLanding.footer_waiting') }}
      </h4>
      <v-btn to="/deposit" color="secondary" large>
        {{ $t('saasLanding.banner_btn_getstarted') }}
      </v-btn>
    </div>
    <div style="height:150px"></div>
    <!-- <footer-main /> -->
  </div>
</template>

<style lang="scss" scoped>
@import './footer-style.scss';
</style>

<script>
import Footer from './Footer'

export default {
  components: {
    'footer-main': Footer,
  },
}
</script>
