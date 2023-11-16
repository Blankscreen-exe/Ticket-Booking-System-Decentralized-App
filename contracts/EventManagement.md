# EventManagement Smart Contract Documentation

## Overview

The `EventManagement` smart contract facilitates the management of events, including creation, payment processing, and status updates. It is designed to be used by a website owner to organize and monetize events. The smart contract allows event organizers to create and manage events, and users can pay for event tickets.

## Table of Contents

- [EventManagement Smart Contract Documentation](#eventmanagement-smart-contract-documentation)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Contract Owner and Middleman](#contract-owner-and-middleman)
  - [Event Structure](#event-structure)
  - [Events](#events)
    - [Adding Events](#adding-events)
    - [Getting Latest Event ID](#getting-latest-event-id)
    - [Getting Next Available Event ID](#getting-next-available-event-id)
    - [Getting Event Details](#getting-event-details)
    - [Getting Event Participant's List](#getting-event-participants-list)
    - [Updating Event Details](#updating-event-details)
    - [Updating Event Status](#updating-event-status)
  - [Paying for Events](#paying-for-events)
  - [Modifiers](#modifiers)
  - [Internal Helpers](#internal-helpers)
  - [Conclusion](#conclusion)

## Contract Owner and Middleman

- **Service Provider Wallet:** The contract is initialized with a service provider's wallet address. This address receives a percentage cut from each event payment as a service fee.

- **Middleman Cut Percentage:** The percentage cut given to the middleman (service provider) is set to 20% by default. This can be updated by calling the `updateMiddlemanFee` function.

## Event Structure

- **Event Struct:**
  - `id`: Unique identifier for the event.
  - `img_url`: URL of the event image.
  - `title`: Title of the event.
  - `description`: Description of the event.
  - `is_active`: Flag indicating whether the event is active.
  - `ticket_price`: Price of the event ticket.
  - `datetime`: Timestamp of the event.
  - `organizer`: Wallet address of the event organizer.
  - `participants`: List of addresses of people who bought tickets for the event.

## Events

### Adding Events

- **Function:** `addEvent`
- **Parameters:**
  - `_id`: Event ID.
  - `_img_url`: URL of the event image.
  - `_title`: Title of the event.
  - `_description`: Description of the event.
  - `_is_active`: Flag indicating whether the event is active.
  - `_ticket_price`: Price of the event ticket.
  - `_datetime`: Timestamp of the event.
  - `_organizer`: Wallet address of the event organizer.
- **Description:** Adds a new event with the specified details.

### Getting Latest Event ID

- **Function:** `getLatestEventId`
- **Returns:**
  - `_id`: Latest event ID.
- **Description:** Returns the latest event ID that has been added.

### Getting Next Available Event ID

- **Function:** `getNextAvailableEventId`
- **Returns:**
  - `_id`: Next available event ID.
- **Description:** Returns the next available event ID for adding a new event.

### Getting Event Details

- **Function:** `getEventDetails`
- **Parameters:**
  - `_id`: Event ID.
- **Returns:**
  - `img_url`: URL of the event image.
  - `title`: Title of the event.
  - `description`: Description of the event.
  - `is_active`: Flag indicating whether the event is active.
  - `ticket_price`: Price of the event ticket.
  - `datetime`: Timestamp of the event.
  - `organizer`: Wallet address of the event organizer.
  - `participants[]`: List of public addresses of the participants.
- **Description:** Returns details of the specified event.

### Getting Event Participant's List

- **Function:** `getEventParticipants`
- **Parameters:** 
  - `_eventId`
- **Returns:**
  - `participants[]`: List of public addresses of the participants.
- **Description:** Returns a list of public wallet addresses of the participant's wallet.

### Updating Event Details

- **Function:** `updateEvent`
- **Parameters:**
  - `_id`: Event ID.
  - `_img_url`: Updated URL of the event image.
  - `_title`: Updated title of the event.
  - `_description`: Updated description of the event.
  - `_is_active`: Updated flag indicating whether the event is active.
  - `_ticket_price`: Updated price of the event ticket.
  - `_datetime`: Updated timestamp of the event.
- **Description:** Updates the details of the specified event.

### Updating Event Status

- **Function:** `updateEventStatus`
- **Parameters:**
  - `_eventId`: Event ID.
- **Description:** Updates the status of the specified event. Automatically marks an event as inactive if its datetime has passed.

## Paying for Events

- **Function:** `payForEvent`
- **Parameters:**
  - `_eventId`: Event ID.
- **Description:** Allows users to pay for a specific event. The payment is distributed to the organizer, middleman, and contract owner based on predefined percentages. The participant's address is added to the event's list of participants.

## Modifiers

- **`onlyActiveEvent` Modifier:**
  - **Description:** Ensures that the event is still active and its datetime has not passed before executing a function.

## Internal Helpers

- **`calculateMiddlemanFee` Function:**
  - **Parameters:**
    - `payment_amount`: Amount to calculate the fee from.
  - **Returns:**
    - `uint`: Calculated middleman fee.
  - **Description:** Calculates the middleman's fee based on the specified payment amount.

- **`calculateOrganizerFee` Function:**
  - **Parameters:**
    - `payment_amount`: Amount to calculate the fee from.
  - **Returns:**
    - `uint`: Calculated organizer fee.
  - **Description:** Calculates the organizer's fee based on the specified payment amount.

- **`getAccountBalance` Function:**
  - **Parameters:**
    - `_account`: Target account's address.
  - **Returns:**
    - `uint`: Current balance of the specified account.
  - **Description:** Returns the current balance of the specified account.

## Conclusion

The `EventManagement` smart contract provides a flexible and secure solution for managing events and handling payments. Event organizers can easily create, update, and monitor events, while participants can securely pay for event tickets. The contract is designed to be transparent and easily integrated into various applications requiring event management functionality.