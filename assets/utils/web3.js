import Web3 from 'web3'

const web3js = new Web3(Web3.givenProvider)

function getERC20TokenContract(tokenAddress) {
  const minABI = [
    {
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'balance', type: 'uint256' }],
      type: 'function',
    },
    { constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint8' }], type: 'function' },
    {
      constant: false,
      inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }],
      name: 'transfer',
      outputs: [{ name: '', type: 'bool' }],
      type: 'function',
    },
  ]

  return new web3js.eth.Contract(minABI, tokenAddress)
}

export { web3js, getERC20TokenContract }
