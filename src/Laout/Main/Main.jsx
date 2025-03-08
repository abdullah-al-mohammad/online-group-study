import React from 'react'
import Navbar from '../../shared/Navbar/Navbar'
import { Outlet, useLocation } from 'react-router'
import Footer from '../../shared/Footer/Footer'

const Main = () => {
  const location = useLocation()
<<<<<<< HEAD
  const noHeaderandFooter = location.pathname.includes('/login') || location.pathname.includes('/signup')
  return (
    <div>
      {noHeaderandFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noHeaderandFooter || <Footer></Footer>}
=======
  const noHeaderFooter = location.pathname.includes("login") || location.pathname.includes("signup")
  return (
    <div>
        {noHeaderFooter || <Navbar></Navbar>}
        <Outlet></Outlet>
        {noHeaderFooter || <Footer></Footer>}
>>>>>>> ba801ef19bf00a4b6c47a49a24b64d9f4b281c8d
    </div>
  )
}

export default Main