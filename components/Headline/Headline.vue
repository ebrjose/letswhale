<template>
  <div class="counter-wrap">
    <v-container>
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
      loaded: false,
    }
  },
  mounted() {
    this.loaded = true
  },
}
</script>
