import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavbarMenu.css'

function NavbarMenu() {
  return (
    <>
         <ul className="navbar-nav" >
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars navbar-color"></i></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <NavLink to={'/admin'}  className="nav-link navbar-color" >Ana Sayfa</NavLink>
                </li>
               
            </ul>

    </>
  )
}

export default NavbarMenu