import { useState } from 'react'
import Sidenav from './components/Sidenav'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Home  from './pages/Home';
import  Doctor from './pages/Doctor'
import  Patient from './pages/Patient'
import  Appointment from './pages/Appointment'
import  Dashboard  from './pages/Dashboard'


//import './App.css'

function App() {

  return (
    <>
      {/* <Sidenav/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/patient' exact element={<Patient/>}></Route>
          <Route path='/doctor' exact element={<Doctor/>}></Route>
          <Route path='/appointment' exact element={<Appointment/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
