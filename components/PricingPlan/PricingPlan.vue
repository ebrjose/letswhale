<template>
  <div class="root">
    <div class="decoration">
      <svg fill="#cccccc">
        <use xlink:href="/images/saas/deco-med-bg.svg#main" />
      </svg>
    </div>
    <v-container :class="{ fixed: isDesktop }">
      <div class="item">
        <title-main align="center">
          <strong>
            {{ $t('saasLanding.pricing_title') }}
          </strong>
        </title-main>
      </div>
      <p class="subtitle use-text-subtitle2 text-center">
        {{ $t('saasLanding.pricing_subtitle') }}
      </p>
      <div class="pricing-wrap">
        <u-animate-container>
          <u-animate
            :offset="-10"
            name="fadeInUpShort"
            delay="0.2s"
            duration="0.4s"
            class="item"
          >
            <pricing-card
              title="OUR PLAN"
              title2="LARGE CAPITALS"
              info="An example PAID NETWORK guarantees an allocation in the new projects being launched on their platform if you own 75.000 of the PAID token, that could mean half a million dollars just to be allowed an allocation in the IDOs."
              desc="Only people with a large capital can get guaranteed access to new tokens on Launchpads, but not anymore."
              type="basic"
            />
          </u-animate>
          <u-animate
            :offset="-10"
            name="fadeInUpShort"
            delay="0.4s"
            duration="0.4s"
            class="item"
          >
            <pricing-card
              title="Joined we can do it."
              title2="> 1.6 BNB"
              info="To get whitelisted in new projects are almost imposible for an average investor. With this site we want to make it possible for the average person that don't have that kind of money to spend to also be able to enter the premarket allocation. We have space for 700 people with a minimum deposit of 1.6 BNB. With that money we will enter the biggest launchpads with the best new projects and distribute the earnings to all holders/investors, according to the percentage of the initial deposits."
              desc="The crypto collected will be used to get early access to the best ICO's and IDO'S"
              type="value"
            />
          </u-animate>
        </u-animate-container>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import './pricing-plan-style.scss';
</style>

<script>
import Title from '../Title'
import PricingCard from '../Cards/Pricing'

const featureList = {
  basic: ['Nam sollicitudin dignissim', 'Cras convallis lacus', 'Quisque ut metus'],
  best: [
    'Nam sollicitudin dignissim',
    'Cras convallis lacus',
    'Quisque ut metus',
    'Vivamus sit amet',
    'Cras convallis lacus orci',
  ],
  pro: [
    'Nam sollicitudin dignissim',
    'Cras convallis lacus',
    'Nulla lobortis nunc',
    'Vitae scelerisque',
    'Duis sed augue',
  ],
  enterprise: [
    'Nam sollicitudin dignissim',
    'Pellentesque ac bibendum ',
    'Vestibulum consequat',
    'Donec commodo',
    'Duis tristique metus',
  ],
}

export default {
  components: {
    'title-main': Title,
    PricingCard,
  },
  data() {
    return {
      feature: featureList,
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
