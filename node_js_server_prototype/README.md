## Installation
Run `npm i` to install dependencies. Make sure that you have Node.js installed locally.

## Usage
Run `node server.js` to initiate a HTTP REST REPL prototype. UI is currently no available, you need to manually send a `POST` request to `localhost:3000/repl` with `Content-type` header of `application/x-www-form-urlencoded`. The params of the `POST` request should be:

`command`: input that you wish to be evaluated
`language`: language of choice ('ruby', 'js')

Run `node websocket.js` to initiate a WebSocket REPL prototype. Navigate to `localhost:3000` to test.