const CHAINID = 56

export const state = () => ({
  account: null,
  chainId: null
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
  }
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
    state.chainId = null
    localStorage.removeItem('account')
    localStorage.removeItem('chainId')
  }
}

export const actions = {
  connectWallet({ dispatch, commit }) {
    if (typeof window.ethereum !== 'undefined') {
      if (parseInt(ethereum.chainId, 16) === CHAINID) {
        dispatch('getAccount')
      } else {
        alert('Binance Smart Chain error')
      }
    } else {
      console.log('Metamask is not installed')
    }
  },
  disconnectWallet({ commit }) {
    commit('CLEAR_DATA')
  },
  async getAccount({ commit }) {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    commit('SET_ACCOUNT', account)
  }
}
