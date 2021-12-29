# CoinMarket

Coin market is a basic local service REST API application for getting information about cryptocurrencies and their values in USD.
U can use it to get current coins and their values, or to see their value in a specific point in time.

# Requirements

This application requires the following modules to be installed:
* node.js
* typescript and tsc
** requires you to run "npm install" before running the application to install all dependencies
  
# Running the application

* npm run start     - to create a clean build and start the node application
* npm run start:dev - to start the application using the ts-node-dev tool that automatically restarts the node process when a file is modified 

# API routes
if youre using Postman you can find all routes and tests in the ./postman_collection/CoinMarket.postman_collection.json
if not all API routes can be found in ./src/components/coinMarket/router.ts
