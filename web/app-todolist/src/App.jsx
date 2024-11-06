import { useState, useEffect } from 'react'
import './assets/input.css'
import { Header } from "./components/Header"
import { Lista } from "./components/Lista"
import { ServicesContext } from './context/servicesContext'

function App() {
  const [servicios, setServicios] = useState([])

  useEffect(()=> {
    fetch('http://localhost:1234/')
    .then(res => res.json())
    .then(data => {
        setServicios(data)
    })
  }, [servicios])


  return (
    <ServicesContext.Provider value={servicios}>
      <div className="">
        <Header />
        <Lista />
      </div>
    </ServicesContext.Provider>
  )
}

export default App