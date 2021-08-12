export const CHAINID = process.env.CHAIN_ID

export const ETHEREUM_CHAIN = {
  56: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  97: {
    chainId: '0x61',
    chainName: 'Smart Chain - Testnet',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
}

export const CONTRACT_ADDRESS = {
  56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  97: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee',
}

export const WALLET_ACCOUNT = process.env.WALLET_ACCOUNT
export const MINIMUM_INVESTMENT = process.env.MINIMUM_INVESTMENT || 1000
export const MAXIMUM_INVESTMENT = process.env.MAXIMUM_INVESTMENT || 10000
