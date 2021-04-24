<template>
  <div class="counter-wrap">
    <v-container>
      <div class="text-center" style="font-size: 19.2px">
          To get whitelisted in projects like AIOZ or Cardstarter was really imposible for an average investor. As an example PAID NETWORK guarantees an allocation in the new projects being launched on their platform if you own 75 000 of the PAID token. That could mean half a million dollars just to be allowed an allocation in the IDO's. With this site we want to make it possible for the average person that don't have that kind of money to spend to also be able to enter the premarket allocation. We have space for 700 people with a minimum deposit of 1000USD. With that money we will enter the biggest launchpads with the best new projects and distribute the earnings to all holders/investors, according to the percentage of the initial deposits.
      </div>
      <v-row
        justify="center"
        align="center"
        class="counter-inner spacing6"
      >
        <v-col md="8" class="pa-6">
          <p class="mb-0 pt-5 text-center">
            We will accept only the first 700 deposits and close the registration, all the money gathered will be
            used to get access to VIP premarket allocations that are only permitted to big capitals.
            All the earnings will be distributed according to the initial deposit percentage.
          </p>
        </v-col>
        <v-col md="4" class="pa-6">
          <div class="counter-item">
            <div class="text">
              <h3 class="use-text-title ">
                <span
                  v-if="loaded"
                  v-countUp:onWindowScroll.once="{
                    watchedElId: 'watched_counter',
                    startValue: 0,
                    endValue: 1000,
                    options: { duration: 1 }
                  }"
                /> BUSD
              </h3>
              <p class="use-text-subtitle">
                <v-icon>mdi-cash-multiple</v-icon>
                {{ $t('saasLanding.headline_deposit') }}
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import 'counter-style.scss';
</style>

<script>
export default {
  data() {
    return {
      loaded: false
    }
  },
  mounted() {
    this.loaded = true
  }
}
</script>
