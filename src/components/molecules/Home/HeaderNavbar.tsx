import React, { useEffect, useState } from 'react'
import logoLight from '../../../img/logo-4.png'
import logoDark from '../../../img/logo-dark1.png'
import './HeaderNavbar.css'
import { NavLink } from 'react-router-dom'

function HeaderNavbar() {

    const [scrolled, setScrolled] = useState(false);

     // Scroll durumunu izlemek için useEffect kullanıyoruz
     useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true); // Scroll 50px üzerindeyse
            } else {
                setScrolled(false); // Scroll yukarıdaysa
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav  className={`navbar navbar-expand-lg fixed-top header-navbar ${
            scrolled ? 'scrolled' : ''
        }`} >
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={scrolled ? logoDark : logoLight}  className='navbar-logo ' />
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