// TODO: get web3 from redux
// TODO: get current account details from redux
// TODO: load contract address from redux

import Web3 from 'web3';
import EventManagementContract from './EventManagementContract.json'; // Replace with the actual path to your contract ABI file

const web3 = new Web3('http://localhost:8545'); // Replace with .env value
const contractAddress = '0x1234567890123456789012345678901234567890'; // Replace with .env value (related deployed contract address)


const eventManagementContract = new web3.eth.Contract(
    EventManagementContract.abi,
    contractAddress
  );
  
// function to get the service provider's wallet address
export const getServiceProviderWallet = async () => {
    const serviceProviderWallet = await eventManagementContract.methods.getServiceProviderWallet().call();
    console.log('Service Provider Wallet:', serviceProviderWallet);
    return serviceProviderWallet;
};

// function to add a new event
export const addEvent = async ( 
    imgUrl, 
    title, 
    description, 
    ticketCount, 
    isActive, 
    ticketPrice, 
    eventStartTime, 
    eventEndTime, 
    organizer
) => {
    // get the latest event Id from the smart contract
    let eventId = await getNextAvailableEventId();

    // REVIEW: had a problem with using too many arguments for the addEvent() function therefore I'm calling update function as well which will add a eventStartDate to the event profile.
    // create an event profile and register it to smart contract
    await eventManagementContract.methods.addEvent({
        eventId,
        imgUrl,
        title,
        description,
        ticketCount,
        isActive,
        ticketPrice,
        eventEndTime: convertDateToTimestamp(eventEndTime),
        organizer
    })
    .estimateGas({
        from: walletAddress,
        value: valueInWei,
    })
    .then(async (gasEstimate) => {
        console.log('Gas Estimate:', gasEstimate);
        
        await eventManagementContract.methods.addEvent({
            eventId,
            imgUrl,
            title,
            description,
            ticketCount,
            isActive,
            ticketPrice,
            eventEndTime: convertDateToTimestamp(eventEndTime),
            organizer
        })
        .send({ 
            organizer, 
            gas: gasEstimate 
        }) 
        .on('confirmation', async function (confirmationNumber, receipt) {
            // Confirmation callback
            console.log('Confirmation Number:', confirmationNumber);
            console.log('Receipt:', receipt);

            await eventManagementContract.methods.setEventStartTime({
                eventId, 
                eventStartTime: convertDateToTimestamp(eventStartTime), 
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                console.log('Confirmation Number:', confirmationNumber);
                console.log('Receipt:', receipt);
            })
            .on('error', function (error, receipt) {
                console.error('Error:', error);
                console.log('Receipt:', receipt);
                return false;
            });
        })
        .on('error', function (error, receipt) {
            // Error callback
            console.error('Error:', error);
            console.log('Receipt:', receipt);
            return false;
        });
    })

    console.log('Event added successfully!');

    return eventId;
};

export const updateEventStatus = async (eventId) => {
    await eventManagementContract.methods.updateEventStatus({eventId})
    .on('confirmation', function (confirmationNumber, receipt) {
        console.log('Confirmation Number:', confirmationNumber);
        console.log('Receipt:', receipt);
    })
    .on('error', function (error, receipt) {
        console.error('Error:', error);
        console.log('Receipt:', receipt);
        return false;
    });
}

export const getLatestEventId = async () => {
    let eventId = await eventManagementContract.methods.getLatestEventId()
    .on('error', function (error, receipt) {
        // Error callback
        console.error('Error:', error);
        console.log('Receipt:', receipt);
        return false;
    });
    return eventId;
}

export const getNextAvailableEventId = async () => {
    let eventId = await eventManagementContract.methods.getNextAvailableEventId()
    .on('error', function (error, receipt) {
        // Error callback
        console.error('Error:', error);
        console.log('Receipt:', receipt);
        return false;
    });
    return eventId;
}

export const getEventDetails = async (eventId) => {
    let eventDetails = eventManagementContract.methods.getEventDetails(eventId)
    .on('error', function (error, receipt) {
        // Error callback
        console.error('Error:', error);
        console.log('Receipt:', receipt);
        return false;
    });
    return eventDetails;
}

export const updateEvent = async (eventId, imgUrl, title, description, isActive, ticketPrice, eventStartTime, eventEndTime) => {
    eventManagementContract.methods.updateEvent({
        eventId, 
        imgUrl, 
        title, 
        description, 
        isActive, 
        ticketPrice, 
        eventStartTime: convertDateToTimestamp(eventStartTime), 
        eventEndTime: convertDateToTimestamp(eventEndTime)
    })
    .on('error', function (error, receipt) {
        // Error callback
        console.error('Error:', error);
        console.log('Receipt:', receipt);

        return false;
    });

    return true;
}

export const addTickets = async (eventId, ticketsToAdd) => {
    eventManagementContract.methods.addTickets({
        eventId, 
        ticketsToAdd
    })
    .on('error', function (error, receipt) {
        // Error callback
        console.error('Error:', error);
        console.log('Receipt:', receipt);
        return false;
    });
    return true;
}

export const payForEvent = async (eventId, walletAddress, valueInWei) => {
    // use wallet account with it
    eventManagementContract.methods.payForEvent({eventId})
    .estimateGas({
        from: walletAddress,
        value: valueInWei,
    })
    .then((gasEstimate) => {
        console.log('Gas Estimate:', gasEstimate);

        // Send transaction
        eventManagementContract.methods.payForEvent(eventId)
            .send({
                from: walletAddress,
                value: valueInWei,
                gas: gasEstimate,
            })
            .on('transactionHash', function (hash) {
                // Transaction hash callback
                console.log('Transaction Hash:', hash);
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                console.log('Confirmation Number:', confirmationNumber);
                console.log('Receipt:', receipt);
            })
            .on('error', function (error, receipt) {
                console.error('Error:', error);
                console.log('Receipt:', receipt);

                return false;
            });
        });
    return true;
}
