import { CHAINID, ETHEREUM_CHAIN, WALLET_ACCOUNT, MINIMUM_INVESTMENT } from './constants'
import { dec2weihex, weihex2dec } from '~/assets/utils/number'
import detectEthereumProvider from '@metamask/detect-provider'

import { web3js, getERC20TokenContract } from '~/assets/utils/web3'

function isValidBalance(balance) {
  return balance / 10 ** 18 >= MINIMUM_INVESTMENT
}

export const state = () => ({
  account: null,
  chainId: null,
  balance: null,
  totalSent: null,
  isMetaMask: false,
  walletAccount: WALLET_ACCOUNT,
  busdBalance: null,
  busdContractAddress: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee',
  busdDecimals: 18,
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
  SET_BUSD_BALANCE(state, balance) {
    state.busdBalance = balance
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
    const balance = await ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
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
  async setNetwork({ commit }) {
    const chainId = parseInt(ethereum.chainId, 16)
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
    const balance = await dispatch('getWalletBalance')
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
      tokenContract.methods
        .transfer(toAddress, sendValue)
        .send({
          from: account,
        })
        .on('transactionHash', function(hash) {
          console.log('.on -> hash', hash)
          const dataTransaction = {
            accountHash: account,
            transactionHash: hash,
            amountHex: 'BUSD',
            amountDec: decimalAmount,
          }
          resolve(dataTransaction)
        })
        .on('receipt', function(receipt) {
          console.log('.on -> receipt', receipt)
        })
        .on('error', function(error) {
          console.log('.on -> error', error)
          reject(error)
        })
    })
  },
  // async sendTransaction() {
  //   const params = {
  //     from: this.$store.state.metamask.account,
  //     to: this.$store.state.metamask.walletAccount, // from: '0x7e9a738F691049fDD0B737F5E8155D22CA5C54aA',
  //     // gas: '0x5208', // 30400
  //     // gasPrice: '0x0', // 10000000000000
  //     value: dec2weihex(this.amount),
  //   } // 6250000000000000000 wei -> HEX
  //   // data: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee', BUSD token
  //   try {
  //     const transaction = await ethereum.request({ method: 'eth_sendTransaction', params: [params] })

  //     const dataTransaction = {
  //       accountHash: params.from,
  //       transactionHash: transaction,
  //       amountHex: params.value,
  //       amountDec: this.amount,
  //     }
  //     this.$axios.post('/api/transactions', dataTransaction).then(({ data }) => {
  //       this.getInvestedAmount()
  //       this.fetchWalletBalance()
  //       this.$router.push('/')
  //       this.snackbar = true
  //     })
  //   } catch (error) {
  //     console.log('sendTransaction -> error', error)
  //   }
  // },
}
