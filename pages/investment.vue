<template>
  <div>
    <deposit />
  </div>
</template>

<script>
import Deposit from '~/components/Forms/Deposit'
import brand from '~/static/text/brand'

export default {
  components: {
    Deposit,
  },
  head() {
    return {
      title: brand.saas.name + ' - Investment',
    }
  },
}
</script>
