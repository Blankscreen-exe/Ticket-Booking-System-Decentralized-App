import { useState } from 'react'
import './App.css'

import Home from './components/Home'
// import AddEventForm from './components/AddEventForm'
import EventForm from './components/EventForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
      <EventForm/>
      {/* <AddEventForm/> */}
    </>
  )
}

export default App
