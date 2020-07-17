# Chainlink External Adapter for Binance Smart Chain

This adapter is built to fulfill Chainlink oracle requests.

## Configuration

The adapter uses the following environment variables:

- `URL`: A URL to a JSON-RPC (HTTP RPC) node on Binance Smart Chain
- `PRIVATE_KEY`: The private key to sign transactions with. Must have fulfillment permissions on the Oracle contract.

## Input Params

- `address` or `bscAddress`: The oracle contract to fulfill the request on
- `dataPrefix` or `dataPrefix`: The data prefix in the request
- `functionSelector` or `bscFunctionSelector`: The fulfillment function selector
- `result` or `value`: The value to fulfill the request with

## Output

```json
{
    "jobRunID": "test123",
    "data": {
        "result": "0x560d6081e276e1c3c1e58aba722ab2848315442a196fcc89a13baa8bc7e34a78"
    },
    "result": "0x560d6081e276e1c3c1e58aba722ab2848315442a196fcc89a13baa8bc7e34a78",
    "statusCode": 200
}
```
