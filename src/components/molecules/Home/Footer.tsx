import React from 'react'
import logo from '../../../img/logo.png'

function Footer() {
    return (

        <div className='row bg-success-subtle  mt-5 pt-5' >
            {/* Logo Bölümü */}
            <div className='col-md-7 mb-3'>
                <img src={logo} alt='Logo' style={{ width: 150, marginLeft: '15%' }} />
                <p className='' style={{marginLeft: '14%'}}>
                    Şirketinizin kısa açıklaması burada yer alabilir. Misyon ve vizyon cümlelerinizi yazabilirsiniz.
                </p>
            </div>

            {/* Hızlı Linkler Bölümü */}
            <div className='col-md-2 mb-3'>
                <h5>Hızlı Linkler</h5>
                <ul className='list-unstyled'>
                    <li><a href='#' className='text-white text-decoration-none' style={{color: 'black'}}>Ana Sayfa</a></li>
                    <li><a href='#' className='text-white text-decoration-none'>Hakkımızda</a></li>
                    <li><a href='#' className='text-white text-decoration-none'>Hizmetler</a></li>
                    <li><a href='#' className='text-white text-decoration-none'>İletişim</a></li>
                </ul>
            </div>

            {/* İletişim Bilgileri Bölümü */}
            <div className='col-md-3 mb-3'>
                <h5>İletişim</h5>
                <p>
                    <i className='fa fa-map-marker-alt'></i> Adres: İstanbul, Türkiye
                </p>
                <p>
                    <i className='fa fa-phone'></i> Telefon: +90 555 555 55 55
                </p>
                <p>
                    <i className='fa fa-envelope'></i> Email: info@ornek.com
                </p>
            </div>
        </div>
    
  )
}

export default Footer