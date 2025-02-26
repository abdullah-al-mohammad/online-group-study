import React from 'react'
import Navbar from '../../shared/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../../shared/Footer/Footer'

const Main = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Main