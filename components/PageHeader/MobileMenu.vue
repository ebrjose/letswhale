<template>
  <div class="mobile-nav">
    <div
      :class="{ 'menu-open': open }"
      class="menu"
    >
      <v-list
        dense
        tag="nav"
      >
        <v-list-item
          to="/investment"
          :style="{ animationDuration: navMenu.length * 0.15 + 's' }"
          link
        >
          <v-list-item-content>
            <v-list-item-title class="menu-list">
              {{ $t('saasLanding.header_deposit') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './header-style';
</style>

<script>
import navMenu from './menu'
import link from '~/static/text/link'

export default {
  data() {
    return {
      link: link,
      navMenu: navMenu,
    }
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
