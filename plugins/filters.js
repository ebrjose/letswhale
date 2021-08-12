import Vue from 'vue'

Vue.filter('dateToLocale', val =>
  new Date(val).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
)

Vue.filter('toDecimal', val => (val / 1).toFixed(2))

Vue.filter('shortToken', val => val.substr(0, 30) + '...')

Vue.filter('toLocaleNumber', val => (Math.round(val * 100) / 100).toLocaleString())
