import React from 'react'
import logo from '../../../img/logo-dark1.png'

function Footer() {
    return (

        <div className='row bg-success-subtle  mt-5 pt-5' >
            {/* Logo Bölümü */}
            <div className='col-md-7 mb-3'>
                <img src={logo} alt='Logo' style={{ width: 150, marginLeft: '15%' }} />
                
            </div>

        

            {/* İletişim Bilgileri Bölümü */}
            <div className='col-md-3 mb-3'>
                <h5 style={{color: 'black'}}>İletişim</h5>
                <p>
                    <i className='fa fa-map-marker-alt me-2'></i> Adres: İstanbul, Türkiye
                </p>
                <p>
                    <i className='fa fa-phone me-2'></i> Telefon: +90 224 123 45 67
                </p>
                <p>
                    <i className='fa fa-envelope me-2'></i> Email: info@example.com
                </p>
            </div>
        </div>
    
  )
}

export default Footer