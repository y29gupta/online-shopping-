import React from 'react'
// import Header from './header/Header'
import Footer from './footer/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from './header/Navbar'
import ModelForm from './model/ModelForm'



function NavbarLayout() {

  return (
    <>
      
        <Navbar/>
        <main style={{minHeight:"71vh"}}>
        <Outlet />
       
        <ModelForm/>
        </main>
        <Footer/>
    </>
  )
}

export default NavbarLayout