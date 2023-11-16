// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract EventManagement {
    // website owner public address
    address payable serviceProviderWallet;

    // percentage cut given to service provider
    uint middlemanCutPercentage = 20; // 20% cut given to middleman

    // counter to keep track of total events
    uint256 totalEvents = 0;

    // Struct to represent event information
    struct Event {
        uint256 id;
        string img_url;
        string title;
        string description;
        bool is_active;
        uint256 ticket_price;
        uint256 datetime;
        address payable organizer; // Organizer's wallet address
        address[] participants; // List of addresses of people who bought tickets
    }

    // ===================== EVENTS =====================

    // Mapping to store events by their ID
    mapping(uint256 => Event) public events;

    // Event to notify when a new event is added
    event EventAdded(uint256 eventId);
    
    // Event to notify when any event is updated
    event EventUpdated(uint256 eventId);

    // Event to notify when the service provider gets his cut
    event EventCutGivenToServiceProvider(uint256 eventId, uint256 amount);

    // Event to notify when a payment is received
    event PaymentReceived(uint256 eventId, address payer, uint256 amount);

    // ===================== MODIFIERS =====================

    // Modifier to check if the event is still active based on datetime
    modifier onlyActiveEvent(uint256 _eventId) {
        require(events[_eventId].is_active, "Event is not active");
        require(block.timestamp < events[_eventId].datetime, "Event datetime has passed");
        _;
    }

    // ===================== METHODS =====================

    // constructor
    constructor() {
        //set the deployer as the service provider
        serviceProviderWallet = payable(msg.sender); 

        // Event storage newEvent = events[0];
        // newEvent.id = 0;
        // newEvent.img_url = "https://trufflesuite.com/assets/logo.png";
        // newEvent.title = "Web3 Service Start";
        // newEvent.description = "Commemoration Event";
        // newEvent.is_active = false;
        // newEvent.ticket_price = 0;
        // newEvent.organizer = payable(msg.sender);
        // newEvent.datetime = getTodayUnixTimestamp();

        // emit EventAdded(0);
    }

    // Solidity code to get today's datetime in Unix timestamp format
    function getTodayUnixTimestamp() public view returns (uint256) {
        // Get the current timestamp in seconds
        return block.timestamp;
    }

    function getServiceProviderWallet() 
        external 
        view
        returns (
            address payable
        )
    {
        return serviceProviderWallet;
    }

    // Function to check and update the status of events
    function updateEventStatus(uint256 _eventId) external onlyActiveEvent(_eventId) {
        events[_eventId].is_active = false;
    }

    // Function to add a new event
    function addEvent(
        uint256 _id,
        string calldata _img_url,
        string calldata _title,
        string calldata _description,
        bool _is_active,
        uint256 _ticket_price,
        uint256 _datetime,
        address payable _organizer
    ) external {
        require(_organizer != address(0), "Invalid event organizer address");

        Event storage newEvent = events[_id];
        newEvent.id = _id;
        newEvent.img_url = _img_url;
        newEvent.title = _title;
        newEvent.description = _description;
        newEvent.is_active = _is_active;
        newEvent.ticket_price = _ticket_price;
        newEvent.organizer = _organizer;
        newEvent.datetime = _datetime;

        totalEvents++;

        emit EventAdded(_id);
    }

    // get latest event id
    function getLatestEventId()
        external
        view
        returns (
            uint256 _id
        )
    {
        return totalEvents;
    }

    // get next available event id
    function getNextAvailableEventId()
        external
        view
        returns (
            uint256 _id
        )
    {
        return totalEvents + 1;
    }

    // Function to get event details by ID
    function getEventDetails(uint256 _id)
        external
        view
        returns (
            string memory img_url,
            string memory title,
            string memory description,
            bool is_active,
            uint256 ticket_price,
            uint256 datetime,
            address payable organizer
        )
    {
        Event storage queriedEvent = events[_id];
        return (
            queriedEvent.img_url,
            queriedEvent.title,
            queriedEvent.description,
            queriedEvent.is_active,
            queriedEvent.ticket_price,
            queriedEvent.datetime,
            queriedEvent.organizer
        );
    }

    // Function to update event details
    function updateEvent(
        uint256 _id,
        string calldata _img_url,
        string calldata _title,
        string calldata _description,
        bool _is_active,
        uint256 _ticket_price,
        uint256 _datetime
    ) external {
        Event storage updatedEvent = events[_id];
        updatedEvent.img_url = _img_url;
        updatedEvent.title = _title;
        updatedEvent.description = _description;
        updatedEvent.is_active = _is_active;
        updatedEvent.ticket_price = _ticket_price;
        updatedEvent.datetime = _datetime;

        emit EventUpdated(_id);
    }

    // updates the percentage cut of the middleman
    function updateMiddlemanFee(
        uint _percentage
    ) internal {
        middlemanCutPercentage = _percentage;
    }

    // Function to allow users to pay for a specific event
    function payForEvent(
        uint256 _eventId
    ) external payable {
        Event storage paidEvent = events[_eventId];
        require(paidEvent.is_active, "Event is not active");
        require(msg.value == paidEvent.ticket_price, "Incorrect payment amount");
        // FIXME: learn how to implement this check correctly 
        // require(msg.sender == paidEvent.organizer, "Event organizer cannot join their own event.");
        
        // Deduct funds from sender
        address customerPublicAddress = msg.sender;

        // calculate the percentage share on the submitted amount
        uint256 organizerCut = calculateOrganizerFee(msg.value);
        uint256 serviceProviderCut = calculateMiddlemanFee(msg.value);

        // Transfer funds to the organizer
        paidEvent.organizer.transfer(organizerCut);

        // Emit event to notify payment received
        emit PaymentReceived(_eventId, paidEvent.organizer, organizerCut);

        // Transfer funds to the service provider
        serviceProviderWallet.transfer(serviceProviderCut);

        // create an event for giving service provider his cut
        emit EventCutGivenToServiceProvider(_eventId, serviceProviderCut);

        // Add the participant to the list
        paidEvent.participants.push(customerPublicAddress);
    }

    // ===================== HELPERS =====================

    // calculates middle man's fee
    function calculateMiddlemanFee(uint payment_amount) internal  
        view 
        returns (uint) 
    {
        return payment_amount / (100 / middlemanCutPercentage);
    }

    // calculate event organizer's fee
    function calculateOrganizerFee(uint payment_amount) internal  
        view 
        returns (uint) 
    {
        uint middlemanFee = calculateMiddlemanFee(payment_amount);
        return payment_amount - middlemanFee;
    }

    // get account's current balance
    function getAccountBalance(address _account) public
        view 
        returns (uint) 
    {
        return _account.balance;
    } 
}
