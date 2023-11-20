# Event Management Smart Contract Documentation

## Overview

The `EventManagement` smart contract is designed to facilitate the creation, management, and participation in events on the blockchain. It allows the creation of events with various details such as title, description, ticket pricing, and more. Users can pay for event tickets, and the contract ensures proper distribution of funds to the organizer and a designated service provider (middleman). The contract is implemented in Solidity and follows the ERC-20 standard.

### SPDX-License-Identifier
```solidity
// SPDX-License-Identifier: MIT
```

This line specifies the license under which the smart contract is released. In this case, it is released under the MIT license.

### Solidity Version
```solidity
pragma solidity ^0.8.11;
```

The contract is written in Solidity, and the version specified is 0.8.11 or above.

## Contract Structure

### Service Provider Information

The smart contract maintains information about the service provider, including their wallet address, total accumulated fee, and the percentage cut they receive from each event.

```solidity
struct ServiceProviderInfo {
    address payable wallet;
    uint256 totalAccumulatedFee;
    uint256 middlemanCutPercentage;
}

ServiceProviderInfo public serviceProvider;
```

### Event Information

The smart contract defines a structure to represent event information, including details such as event ID, image URL, title, description, ticket pricing, start and end times, organizer's wallet address, and a list of participants.

```solidity
struct Event {
    uint256 id;
    string img_url;
    string title;
    string description;
    bool is_active;
    uint256 ticketCount;
    uint256 ticket_price;
    uint256 eventStartTime;
    uint256 eventEndTime;
    address payable organizer;
    address[] participants;
}
```

### Events and Event-Related Actions

The contract includes events to notify when a new event is added, updated, when the service provider receives their cut, when a payment is received, and when tickets are added.

```solidity
event EventAdded(uint256 eventId);
event EventUpdated(uint256 eventId);
event EventCutGivenToServiceProvider(uint256 eventId, uint256 amount);
event PaymentReceived(uint256 eventId, address payer, uint256 amount);
event TicketsAdded(uint256 eventId, uint ticketsAdded);
```

### Modifiers

There is a modifier `onlyActiveEvent` to ensure that certain actions can only be performed on active events based on datetime.

```solidity
modifier onlyActiveEvent(uint256 _eventId) {
    // ...
    _;
}
```

## Contract Initialization

The contract constructor sets the deployer as the initial service provider and adds a sample event with ID 0.

```solidity
constructor() {
    // ...
}

```

## External Functions

### `getServiceProviderWallet`

Returns the wallet address of the service provider.

```solidity
function getServiceProviderWallet() external view returns (address payable);
```

### `updateEventStatus`

Updates the status of an event based on its end time.

```solidity
function updateEventStatus(uint256 _eventId) external onlyActiveEvent(_eventId);
```

### `addEvent`

Adds a new event with specified details.

```solidity
function addEvent(
    uint256 _id,
    string calldata _img_url,
    // ... (other parameters)
) external;
```

### `getLatestEventId` and `getNextAvailableEventId`

Retrieve the latest or next available event ID.

```solidity
function getLatestEventId() external view returns (uint256 _id);
function getNextAvailableEventId() external view returns (uint256 _id);
```

### `getEventDetails`

Get details of an event by ID.

```solidity
function getEventDetails(uint256 _id)
    external
    view
    returns (
        string memory img_url,
        // ... (other details)
    );
```

### `updateEvent`

Update details of an existing event.

```solidity
function updateEvent(
    uint256 _id,
    string calldata _img_url,
    // ... (other parameters)
) external;
```

### `addTickets`

Add tickets to an active event.

```solidity
function addTickets(uint _eventId, uint ticketsToAdd) external onlyActiveEvent(_eventId);
```

### `payForEvent`

Allows users to pay for event tickets.

```solidity
function payForEvent(uint256 _eventId) external payable;
```

### `getServiceProviderTotalAccumulatedFee`

Returns the total accumulated fee of the service provider.

```solidity
function getServiceProviderTotalAccumulatedFee() internal view returns (uint256);
```

### Helper Functions

Various internal helper functions for calculating fees and retrieving balances.

```solidity
function calculateMiddlemanFee(uint256 payment_amount) internal view returns (uint256);
function calculateOrganizerFee(uint256 payment_amount) internal view returns (uint256);
function getAccountBalance(address _account) public view returns (uint256);
function getTodayUnixTimestamp() public view returns (uint256);
```

## Conclusion

The `EventManagement` smart contract provides a flexible and secure way to manage events on the blockchain, ensuring proper handling of funds and event details. Developers can integrate this contract into decentralized applications to facilitate event creation and participation.