<template>
  <v-btn
    color="secondary"
    large
    @click="sendTransaction()"
  >
    {{ $t('saasLanding.banner_btn_getstarted') }}
  </v-btn>
</template>
<script>
export default {
  data() {
    return {
      link: 'link'
    }
  },
  methods: {
    sendTransaction() {
      ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: '0x7e9a738F691049fDD0B737F5E8155D22CA5C54aA',
              to: '0xc6E675854dCE5BC61C7B7aF049F0D28F99D34a84',
              // gas: '0x76c0', // 30400
              // gasPrice: '0x9184e72a000', // 10000000000000
              value: '0x2B5D23F37449A200', // 6250000000000000000 wei -> HEX
              data: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee'
            }
          ]
        })
        .then(result => {
          console.log('sendTransaction -> result', result)
        })
        .catch(error => {
          console.log('sendTransaction -> error', error)
        })
    }
  }
}
</script>
