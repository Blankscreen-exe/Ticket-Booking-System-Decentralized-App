# Ticket Booking System Decentralized App

The Ticket Booking System DApp is a decentralized application built on blockchain technology to provide a secure, transparent, and efficient ticket booking experience. By leveraging the power of smart contracts, this system eliminates intermediaries and ensures that all transactions are tamper-proof and verifiable.

## Technologies

Blockchain dependencies:

- solidity `^0.8.11`
- truffle `^5.11.5`

Frontend dependencies:

 - web3 `^4.2.2`
 - metamask `2.0.0`
 - vite `^4.4.5`

## Installation

###For frontend

```sh
cd ticketing_system
npm i
npm run dev
```

### For blockchain

Compile (`npm run compile`):

This compiles your Solidity smart contracts into ABI and bytecode, making them ready for deployment.

Migrate (`npm run migrate`):

This deploys your compiled smart contracts to the blockchain or a test network. It runs the migration scripts sequentially.

Test (`npm run test`):

Run tests to ensure your contracts behave as expected.

Deploy (`npm run deploy`):

This is typically the final step, and it's unclear how it's different from migrate in your setup. If deploy involves deploying to a production network (e.g., mainnet), it might follow migrate.
