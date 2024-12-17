import React from 'react'
import logo from '../../../img/logo-dark1.png'

function Footer() {
    return (

        <div className='row bg-success-subtle  mt-5 pt-5' >
            {/* Logo Bölümü */}
            <div className='col-md-7 mb-3'>
                <img src={logo} alt='Logo' style={{ width: 150, marginLeft: '15%' }} />
                
            </div>

            {/* Hızlı Linkler Bölümü */}
            <div className='col-md-2 mb-3'>
                <h5 style={{color: 'black'}}> Hızlı Linkler</h5>
                <ul className='list-unstyled'>
                    <li><a href='#' className='text-decoration-none' style={{color: 'gray'}}>Ana Sayfa</a></li>
                    <li><a href='#' className='text-decoration-none' style={{color: 'gray'}}>Hakkımızda</a></li>
                    <li><a href='#' className='text-decoration-none' style={{color: 'gray'}}>Hizmetler</a></li>
                    <li><a href='#' className='text-decoration-none' style={{color: 'gray'}}>İletişim</a></li>
                </ul>
            </div>

            {/* İletişim Bilgileri Bölümü */}
            <div className='col-md-3 mb-3'>
                <h5 style={{color: 'black'}}>İletişim</h5>
                <p>
                    <i className='fa fa-map-marker-alt me-2'></i> Adres: İstanbul, Türkiye
                </p>
                <p>
                    <i className='fa fa-phone me-2'></i> Telefon: +90 555 555 55 55
                </p>
                <p>
                    <i className='fa fa-envelope me-2'></i> Email: info@ornek.com
                </p>
            </div>
        </div>
    
  )
}

export default Footer