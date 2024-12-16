import React from 'react'
import logo from '../../../img/logo-4.png'
import './HeaderNavbar.css'
import { NavLink } from 'react-router-dom'

function HeaderNavbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-green fixed-top " >
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="" className='navbar-logo ' />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Anasayfa</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" >Hakkımızda</a>
                        </li>
                        <li className="nav-item me-2">
                            <a className="nav-link" href="#">İletişim</a>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/register"} className="btn btn-light custom-btn-filled">Kayıt Ol</NavLink>
                        </li>
                        <li className="nav-item ms-2">
                            <NavLink to={'/login'} className="btn btn-outline-light custom-btn-outlined" >Giriş Yap</NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default HeaderNavbar