<template>
  <div class="main-wrap">
    <page-header />
    <div class="container-wrap">
      <page-banner title="Transaction History"/>

      <section class="page-content">
        <transaction-history />
      </section>

      <footer-with-deco />
    </div>
  </div>
</template>
<script>
import PageHeader from '~/components/PageHeader'
import PageBanner from '~/components/PageBanner'
import FooterWithDeco from '~/components/Footer/FooterWithDeco'
import TransactionHistory from '~/components/TransactionHistory'

export default {
  components: {
    PageHeader,
    PageBanner,
    FooterWithDeco,
    TransactionHistory,
  },
}
</script>
<style lang="scss">
.page-content {
  background: white;
  padding: spacing(5, 0, 5);
  min-height: 20vh;
}
</style>
