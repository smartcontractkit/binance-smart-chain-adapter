const { web3 } = require('web3')
const { ethers } = require('ethers')
const { Requester, Validator } = require('@chainlink/external-adapter')
const provider = new ethers.providers.JsonRpcProvider(process.env.URL)
const privateKey = process.env.PRIVATE_KEY
const wallet = new ethers.Wallet(privateKey, provider)

const oracleAbi = [
  'function fulfillOracleRequest(bytes32 _requestId, uint256 _payment, address _callbackAddress, bytes4 _callbackFunctionId, uint256 _expiration, bytes32 _data) returns (bool)'
]

const convert = (input, type) => {
  switch (type) {
    case 'bytes32':
      return web3.utils.padRight(input, 32)
    case 'uint256':
      return web3.utils.numberToHex(input)
    case 'bytes4':
      return web3.utils.padLeft(input, 4)
    case 'address':
      return web3.utils.toChecksumAddress(input)
  }

  return input
}

const sendFulfillment = async (address, requestId, payment, callbackAddress, callbackFunctionId, expiration, data) => {
  const contract = new ethers.Contract(address, oracleAbi, wallet)
  return await contract.functions.fulfillOracleRequest(
    convert(requestId, 'bytes32'),
    convert(payment, 'uint256'),
    convert(callbackAddress, 'address'),
    convert(callbackFunctionId, 'bytes4'),
    convert(expiration, 'uint256'),
    data
  )
}

const customParams = {
  address: ['address', 'exAddr'],
  request_id: ['request_id', 'requestId'],
  payment: true,
  callback_address: ['callback_address', 'callbackAddress'],
  callback_function_id: ['callback_function_id', 'callbackFunctionId'],
  expiration: ['expiration', 'exp'],
  value: ['result', 'value']
}

const createRequest = (input, callback) => {
  const validator = new Validator(callback, input, customParams)
  const jobRunID = validator.validated.id
  const address = validator.validated.data.address
  const requestId = validator.validated.data.request_id
  const payment = validator.validated.data.payment
  const callbackAddress = validator.validated.data.callback_address
  const callbackFunctionId = validator.validated.data.callback_function_id
  const expiration = validator.validated.data.expiration
  const value = validator.validated.data.value

  const _handleResponse = tx => {
    const response = {
      data: { result: tx.hash },
      result: tx.hash,
      status: 200
    }
    callback(response.status, Requester.success(jobRunID, response))
  }

  const _handleError = err => {
    callback(500, Requester.errored(jobRunID, err))
  }

  sendFulfillment(address, requestId, payment, callbackAddress, callbackFunctionId, expiration, value)
    .then(_handleResponse)
    .catch(_handleError)
}

module.exports = { createRequest: createRequest }
