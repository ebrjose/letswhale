<template>
  <div>
    <div class="main-wrap">
      <main-header />
      <div class="container-wrap">
        <section id="home">
          <banner />
        </section>

        <section class="mt-5">
          <company-logo />
        </section>

        <section :class="!isMobile && 'space-top-short'">
          <headline />
        </section>

        <section id="earnings"  style="padding-top:50px">
          <feature />
        </section>

        <section id="plan" style="padding-top:50px">
          <pricing-plan />
        </section>

        <section id="last" style="padding-top:50px">
          <last />
        </section>

        <section id="next" style="padding-top:150px">
          <next />
        </section>

      </div>
      <section id="footer">
        <footer-with-deco />
      </section>
      <hidden point="mdDown">
        <page-nav />
      </hidden>
    </div>
  </div>
</template>


<script>
import Header from '~/components/Header'
import Hidden from '~/components/Hidden'
import PageNav from '~/components/PageNav'
import Banner from '~/components/Banner'
import CompanyLogo from '~/components/CompanyLogo'
import Headline from '~/components/Headline'
import Feature from '~/components/Feature'
import Last from '~/components/Last'
import Next from '~/components/Next'
import PricingPlan from '~/components/PricingPlan'
// import Faq from '~/components/Faq'
// import NewsEvent from '~/components/NewsEvent'
import FooterWithDeco from '~/components/Footer/FooterWithDeco'
// import Notification from '~/components/Notification'
import brand from '~/static/text/brand'

export default {
  components: {
    'main-header': Header,
    Banner,
    CompanyLogo,
    Headline,
    Feature,
    Last,
    Next,
    FooterWithDeco,
    PageNav,
    Hidden,
    PricingPlan,
  },
  computed: {
    isTablet() {
      return this.$mq === 'mdDown' || this.$mq === 'smDown' || this.$mq === 'xsDown' // eslint-disable-line
    },
    isMobile() {
      return this.$mq === 'smDown' || this.$mq === 'xsDown'
    },
  },
  head() {
    return {
      title: brand.saas.title,
    }
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/styles';

@function section-margin($margin) {
  @return $margin * 20;
}
.main-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  @include palette-text-primary;
  .theme--dark & {
    background-color: $dark-background-default;
  }
  .theme--light & {
    background-color: $light-background-paper;
  }
}
.space-bottom {
  margin-bottom: section-margin($spacing1);
  @include breakpoints-down(sm) {
    margin-bottom: section-margin(6px);
  }
}
.space-bottom-testi {
  @include breakpoints-up(md) {
    margin-bottom: section-margin($spacing1);
  }
}
.space-bottom-short {
  margin-bottom: section-margin($spacing1 / 2);
}
.space-top {
  margin-top: section-margin($spacing1);
  @include breakpoints-down(sm) {
    margin-top: section-margin(6px);
  }
}
.space-top-short {
  margin-top: section-margin($spacing1 / 2);
}
.container-wrap {
  margin-top: -40px;
  > section {
    position: relative;
  }
}
</style>
