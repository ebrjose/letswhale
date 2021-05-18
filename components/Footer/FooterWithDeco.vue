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
      <v-btn to="/investment" color="secondary" large>
        {{ $t('saasLanding.banner_btn_getstarted') }}
      </v-btn>
    </div>
    <v-container class="mt-12">
      <div class="socmed">
        <a href="https://twitter.com/LetsWhale"
          target="_blank">
          <img src="/images/social/twitter-48.png" class="icon" alt="Twitter">
          <span>Twitter</span>
        </a>
        <a href="https://t.me/LetsWhale"
          target="_blank"
        >
          <img src="/images/social/telegram-48.png" class="icon" alt="Telegram">
          <span>Telegram</span>
        </a>
        <a href="https://medium.com/@letswhale"
          target="_blank"
        >
          <img src="/images/social/medium-48.png" class="icon" alt="Medium">
          <span>Medium</span>
        </a>
      </div>
    </v-container>
    <v-container>
      <div class="text-disclaimer">
          <strong>DISCLAIMER: </strong> Past performance is not an indication of, nor an assurance of future performance of any system
          or method as markets can change. No assurance can be given that any system or method will
          continue to perform similarly in the future.  If you have any doubts about crypto-investings
          or method offered here you should first consult your own financial advisor.
      </div>
    </v-container>
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
