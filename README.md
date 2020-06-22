# Chainlink External Adapter for Binance Smart Chain

This adapter is built to fulfill Chainlink oracle requests.

## Input Params

- `address` or `exAddr`: The oracle contract to fulfill the request on
- `request_id` or `requestId`: The request id
- `payment`: Payment amount
- `callback_address` or `callbackAddress`: The callback/requesting address
- `callback_function_id` or `callbackFunctionId`: The callback function id
- `expiration` or `exp`: The request expiration time
- `result` or `value`: The value to fulfill the request with

## Output

```json
{
    "jobRunID": "test123",
    "data": {
        "result": "0xb3a9e9b72b080ad60a871ff9549caf5176c00d7358680bc81aa808d680dcede0"
    },
    "result": "0xb3a9e9b72b080ad60a871ff9549caf5176c00d7358680bc81aa808d680dcede0",
    "statusCode": 200
}
```
