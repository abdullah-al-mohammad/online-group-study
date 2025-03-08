import React from 'react'
import Navbar from '../../shared/Navbar/Navbar'
import { Outlet, useLocation } from 'react-router'
import Footer from '../../shared/Footer/Footer'

const Main = () => {
  const location = useLocation()
  const noHeaderandFooter = location.pathname.includes('/login') || location.pathname.includes('/signup')
  return (
    <div>
      {noHeaderandFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noHeaderandFooter || <Footer></Footer>}
    </div>
  )
}

export default Main