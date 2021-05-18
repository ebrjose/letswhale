<template>
  <v-card
    :class="type"
    class="pricing"
  >
    <div class="title-card">
      <p>{{ title }}</p>
      <h4 class="display-1">
        {{ title2 }}
      </h4>
    </div>
    <div class="info-text">
      {{ info }}
    </div>
    <div class="btn-area">
      <p class="desc">{{ desc }}</p>
      <v-btn
        :color="type === 'basic' ? 'secondary' : 'primary'"
        class="button"
        large
        to="/investment"
      >
        GET STARTED
      </v-btn>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
@import './cards-style.scss';
</style>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    title2: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: '',
    },
  },
}
</script>
