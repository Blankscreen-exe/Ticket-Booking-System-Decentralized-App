import React, { useState, useEffect } from 'react'
// import './App.css'

// import Home from './components/Home'
// import AddEventForm from './components/AddEventForm'
// import EventForm from './components/EventForm'
import { getServiceProviderWallet, payForEvent, addTickets, addEvent, getNextAvailableEventId, getEventDetails, updateEvent } from '../helpers/contractInteraction'
import { appLogger } from '../helpers/common'
// import env from "react-dotenv";

import { getWeb3ForRegularBrowser } from '../helpers/web3driver'
import { providerType } from '../constants'
function App() {
  // const [count, setCount] = useState(0)
  // appLogger("env var", import.meta.env.VITE_SMART_CONTRACT_ADDRESS)

  // useEffect( () => {

    
    updateEvent(1, "imgUrl 003", "title 003", "description 003", true, 0n,  Date.now(), Date.now(), "0x555F96C0fC5019ee6b9b805269D81eE649dc7De5").then( (gotData => {
      appLogger("UPDATE EVENT", gotData)
    }))

    getNextAvailableEventId().then( (gotData) => {
      appLogger("get latest event Id", gotData)
    })

    addEvent( 
      "some img url 789", 
      "some title 789", 
      "some description 789", 
      150n, 
      true, 
      13000n, 
      Date.now(), 
      Date.now(), 
      "0x555F96C0fC5019ee6b9b805269D81eE649dc7De5"
    )
    .then( (gotData) => {
      appLogger("add event response")
      console.log(gotData)
    })


    payForEvent(1, 13000).then( (gotData) => {
      appLogger("PAY for event", gotData)
    })

    getServiceProviderWallet().then( (gotData) => {
      appLogger("SP ADDress", gotData)
    })

    getEventDetails(1).then( (gotData) => {
      appLogger("GET EVENT DETAILS", gotData)
    })
    

    // =================================================================
  //   return () => {
      
  //   }
  // }, [])
  


  return (
    <>
      <h1> === DONE === </h1>
      {/* <Home/> */}
      {/* <EventForm/> */}
      {/* <AddEventForm/> */}
    </>
  )
}

export default App
