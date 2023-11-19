import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import AddEventForm from './components/AddEventForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
      {/* <AddEventForm/> */}
    </>
  )
}

export default App
