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

{/* <form action="/" method="post" style="display:flex; gap:10px;">
  <input type="email" id="email" name="email" placeholder="Email Address" style="border:1px solid black; border-radius:30px; color: black">
  <input type="submit" value="Subscribe">
</form> */}