import { CHAINID, ETHEREUM_CHAIN, WALLET_ACCOUNT } from './constants'
import { weihex2dec } from '~/assets/utils/number'
import detectEthereumProvider from '@metamask/detect-provider'

import { web3js, getERC20TokenContract } from '~/assets/utils/web3'

// function isValidBalance(balance) {
//   return balance / 10 ** 18 >= MINIMUM_INVESTMENT
// }

export const state = () => ({
  account: null,
  chainId: null,
  balance: null,
  totalSent: null,
  isMetaMask: false,
  walletAccount: WALLET_ACCOUNT,
  busdBalance: null,
  busdContractAddress: null,
  busdDecimals: 18,
  blockExplorerUrl: null,
  transactionHistory: [],
  tvl: {},
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
  humanBusdBalance(state) {
    return state.busdBalance ? (state.busdBalance / 10 ** state.busdDecimals).toFixed(2) : 0
  },
  isWrongNetwork(state) {
    return parseInt(state.chainId) !== parseInt(CHAINID)
  },
  totalInvested(state) {
    return state.totalSent ? state.totalSent.toFixed(2) : 0
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
    state.blockExplorerUrl = ETHEREUM_CHAIN[chainId].blockExplorerUrls[0]
    state.busdContractAddress = ETHEREUM_CHAIN[chainId].busdContractAddress
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
  SET_BUSD_BALANCE(state, balance) {
    state.busdBalance = balance
  },
  SET_TOTAL_INVESTED(state, totalSent) {
    state.totalSent = totalSent
  },
  SET_IS_METAMASK(state, value) {
    state.isMetaMask = value
  },
  SET_TRANSACTION_HISTORY(state, value) {
    state.transactionHistory = value
  },
  SET_TVL(state, value) {
    state.tvl = value
  },
}

export const actions = {
  async connectWallet({ dispatch, commit }) {
    if (typeof window.ethereum !== 'undefined') {
      if (parseInt(window.ethereum.chainId, 16) === parseInt(CHAINID)) {
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
    dispatch('setBrowserChainId')
  },
  async getAccount({ commit, dispatch }) {
    if (parseInt(window.ethereum.chainId, 16) === parseInt(CHAINID)) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = accounts[0]
      commit('SET_ACCOUNT', account)
      dispatch('getWalletBalance')
      dispatch('getInvestedAmount')
      dispatch('fetchTransactionHistory')
    }
  },
  changeEthereumChain({ dispatch }) {
    window.ethereum
      .request({ method: 'wallet_addEthereumChain', params: [ETHEREUM_CHAIN[CHAINID]] })
      .then(() => {
        dispatch('getAccount')
      })
      .catch(error => console.log(error))
  },
  async getWalletBalance({ dispatch }) {
    return await dispatch('getBUSDTokenBalance')
  },
  async getBNBTokenBalance({ state, commit }) {
    const account = state.account
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [account, 'latest'],
    })
    commit('SET_BALANCE', balance)
    return balance
  },
  async getBUSDTokenBalance({ state, commit }) {
    const minABI = [
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
      },
      { constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint8' }], type: 'function' },
    ]

    const contract = new web3js.eth.Contract(minABI, state.busdContractAddress)
    const balance = await contract.methods.balanceOf(state.account).call((error, balance) => balance)
    commit('SET_BUSD_BALANCE', balance)
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
  async setBrowserChainId({ commit }) {
    const chainId = parseInt(window.ethereum.chainId, 16)
    commit('SET_CHAINID', chainId)
  },
  async fetchWalletBalance({ state, dispatch }) {
    const oldBalance = state.busdBalance
    const newBalance = await dispatch('getWalletBalance')
    if (newBalance === oldBalance) {
      setTimeout(function() {
        dispatch('fetchWalletBalance')
      }, 5000)
    }
  },
  async sendBUSDTransaction({ state, dispatch }, decimalAmount) {
    // const balance = await dispatch('getWalletBalance')
    // if (!isValidBalance(balance)) {
    //   alert(`Your wallet balance must be greater than "${MINIMUM_INVESTMENT} BUSD"`)
    //   return
    // }

    const account = state.account
    const toAddress = state.walletAccount
    const busdDecimals = state.busdDecimals
    const tokenContractAddress = state.busdContractAddress

    const amount = web3js.utils.toBN(decimalAmount)
    const decimals = web3js.utils.toBN(busdDecimals)
    const sendValue = amount.mul(web3js.utils.toBN(10).pow(decimals))
    const tokenContract = getERC20TokenContract(tokenContractAddress)

    // https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html#

    return new Promise((resolve, reject) => {
      let transactionHash
      tokenContract.methods
        .transfer(toAddress, sendValue)
        .send({ from: account })
        .on('transactionHash', function(hash) {
          transactionHash = hash
          const dataTransaction = {
            accountHash: account,
            transactionHash: hash,
            token: 'BUSD',
            amountDec: decimalAmount,
          }
          resolve(dataTransaction)
        })
        .on('confirmation', function(confirmationNumber, receipt) {
          if (confirmationNumber === 1) {
            dispatch('confirmTransaction', { transactionHash, receipt })
          }
        })
        .on('error', function(error) {
          reject(error)
        })
    })
  },
  async confirmTransaction({ dispatch }, { transactionHash, receipt }) {
    try {
      await this.$axios.put(`/api/transactions/${transactionHash}`, receipt)
      await dispatch('getInvestedAmount')
      await dispatch('fetchWalletBalance')
      await dispatch('fetchTransactionHistory')
    } catch (error) {
      throw error
    }
  },
  async fetchTransactionHistory({ state, commit }) {
    try {
      const account = state.account
      const { data } = await this.$axios.get(`/api/transactions/history/${account}`)
      const { history } = data
      commit('SET_TRANSACTION_HISTORY', history)
      return history
    } catch (error) {
      throw error
    }
  },
  async getTVL({ commit }) {
    try {
      const { data } = await this.$axios.get('/api/transactions')
      commit('SET_TVL', data.data)
      return data.data
    } catch (error) {
      throw error
    }
  },
}
