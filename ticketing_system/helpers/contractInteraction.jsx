// TODO: get web3 from redux
// TODO: get current account details from redux
// TODO: load contract address from redux

import Web3 from 'web3';
import EventManagementContract from './EventManagementContract.json'; // Replace with the actual path to your contract ABI file

const web3 = new Web3('http://localhost:8545'); // Replace with your Ethereum node URL
const contractAddress = '0x1234567890123456789012345678901234567890'; // Replace with your deployed contract address


const eventManagementContract = new web3.eth.Contract(
    EventManagementContract.abi,
    contractAddress
  );
  
// function to get the service provider's wallet address
const getServiceProviderWallet = async () => {
    try {
        const serviceProviderWallet = await eventManagementContract.methods.getServiceProviderWallet().call();
        console.log('Service Provider Wallet:', serviceProviderWallet);
    } catch (error) {
        console.error('Error:', error);
    }
};

// function to add a new event
const addEvent = async (
    eventId, 
    img_url, 
    title, 
    description, 
    ticketCount, 
    is_active, 
    ticket_price, 
    eventEndTime, 
    organizer, 
    from, 
    gas
) => {
    try {
        await eventManagementContract.methods.addEvent(
            eventId,
            img_url,
            title,
            description,
            ticketCount,
            is_active,
            ticket_price,
            eventEndTime,
            organizer
        ).send({ from, gas }); // Replace with the sender's Ethereum address

        console.log('Event added successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
};

const updateEventStatus = async (eventId) => {
    try {
        await eventManagementContract.methods.updateEventStatus(eventId);
    } catch (e) {
        throw e;
    }
}

const getLatestEventId = async () => {
    let eventId = await eventManagementContract.methods.getLatestEventId();
    return eventId;
}

const getNextAvailableEventId = async () => {
    let eventId = await eventManagementContract.methods.getNextAvailableEventId();
    return eventId;
}

const getEventDetails = async (eventId) => {
    let eventDetails = eventManagementContract.methods.getEventDetails(eventId);
}

const updateEvent = async (eventId, imgUrl, title, description, isActive, ticketPrice, eventStartTime, eventEndTime) => {
    eventManagementContract.methods.updateEvent(eventId, imgUrl, title, description, isActive, ticketPrice, eventStartTime, eventEndTime);
}

const addTickets = async (eventId, ticketsToAdd) => {
    eventManagementContract.methods.addTickets(eventId, ticketsToAdd);
}

const payForEvent = async (eventId) => {
    eventManagementContract.methods.payForEvent(eventId);
}