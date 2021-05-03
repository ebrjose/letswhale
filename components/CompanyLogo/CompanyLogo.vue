<template>
  <v-container class="fixed-width">

    <div class="root">
      <h4 class="logo-title">Support</h4>
      <img
        v-for="(logo, index) in logos"
        :key="index"
        :src="logo"
        :alt="'logo' + index"
      >
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
@import './logo-style.scss';
</style>

<script>
export default {
  data() {
    return {
      logos: [
        '/images/logos2/paid2.png',
        '/images/logos2/polkastarter2.jpg',
        '/images/logos2/cardstarter.png',
        '/images/logos2/duckdao2.png',
        '/images/logos2/bscpad2.png',
        '/images/logos2/trustswap.jpg',
      ],
    }
  },
}
</script>
