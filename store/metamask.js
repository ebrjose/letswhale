import { CHAINID, ETHEREUM_CHAIN } from './constants'
import { dec2weihex, weihex2dec } from '~/assets/utils/number'
import detectEthereumProvider from '@metamask/detect-provider'

export const state = () => ({
  account: null,
  chainId: null,
  balance: null,
  totalSent: null,
  isMetaMask: false,
})

export const getters = {
  account(state) {
    return state.account
  },
  accountShorted(state) {
    return `${state.account.substr(0, 6)}...${state.account.substr(-4)}`
  },
  loggedIn(state) {
    return !!state.account
  },
  humanBalance(state) {
    return state.balance ? weihex2dec(state.balance).toFixed(4) : 0
  },
  wrongNetwork(state) {
    return state.chainId !== CHAINID
  },
  totalInvested(state) {
    return !!state.totalSent ? state.totalSent.toFixed(2) : 0
  },
  showDialog(state) {
    return state.isMetaMask === false
  },
}

export const mutations = {
  SET_ACCOUNT(state, account) {
    state.account = account
    state.chainId = CHAINID
    localStorage.setItem('account', account)
    localStorage.setItem('chainId', state.chainId)
  },
  SET_CHAINID(state, chainId) {
    state.chainId = chainId
  },
  CLEAR_DATA(state) {
    state.account = null
    state.balance = null
    state.totalSent = null
    localStorage.removeItem('account')
    localStorage.removeItem('chainId')
  },
  SET_BALANCE(state, balance) {
    state.balance = balance
  },
  SET_TOTAL_INVESTED(state, totalSent) {
    state.totalSent = totalSent
  },
  SET_IS_METAMASK(state, value) {
    state.isMetaMask = value
  },
}

export const actions = {
  async connectWallet({ dispatch, commit }) {
    if (typeof window.ethereum !== 'undefined') {
      if (parseInt(ethereum.chainId, 16) === CHAINID) {
        dispatch('getAccount')
      } else {
        const provider = await dispatch('getProvider')
        if (provider.isMetaMask) {
          commit('SET_IS_METAMASK', true)
          dispatch('changeEthereumChain')
        } else {
          // Add Binance Network to MetaMask
          commit('SET_IS_METAMASK', false)
        }
      }
    } else {
      alert('Please install MetaMask first - https://metamask.io/')
      console.log('Metamask is not installed')
    }
  },
  disconnectWallet({ commit, dispatch }) {
    commit('CLEAR_DATA')
    dispatch('setNetwork')
  },
  async getAccount({ commit, dispatch }) {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    commit('SET_ACCOUNT', account)
    dispatch('getWalletBalance')
    dispatch('getInvestedAmount')
  },
  changeEthereumChain({ dispatch }) {
    ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [ETHEREUM_CHAIN[CHAINID]],
      })
      .then(() => {
        dispatch('getAccount')
      })
      .catch(error => console.log(error))
  },
  async getWalletBalance({ state, commit }) {
    const account = state.account
    const balance = await ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
    commit('SET_BALANCE', balance)
    return balance
  },
  async getInvestedAmount({ state, commit }) {
    const account = state.account
    const { data } = await this.$axios.get(`/api/transactions/sent/${account}`)
    commit('SET_TOTAL_INVESTED', data.totalSent)
    return data.totalSent
  },
  async getProvider() {
    const provider = await detectEthereumProvider()
    return provider
  },
  async setNetwork({ commit }) {
    const chainId = parseInt(ethereum.chainId, 16)
    commit('SET_CHAINID', chainId)
  },
}
