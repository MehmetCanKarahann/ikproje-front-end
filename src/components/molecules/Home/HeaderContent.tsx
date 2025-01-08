import React from 'react'
import img from '../../../img/human-resources1.png'
import './HeaderContent.css'
import dashboard from '../../../img/dashboard.png'

function HeaderContent() {
    return (
        <div className='container banner-container'>

            <div className="row">
                <div className="col-8 mt-5">
                    <h1 style={{ color: 'white' }} >İnsan Kaynakları Yönetimi Hiç bu kadar kolay olmamıştı!</h1>
                    <br />
                    <h5 style={{ color: 'white' }} >Şirketinizi ve çalışanlarınızı tek bir platformda yönetin, tüm operasyonlarınızı dijitalleştirin. </h5>

                </div>
                <div className="col-4">
                    <div className="image-container">
                        <img src={img} alt="Resim" className="x-image" />
                    </div>
                </div>

            </div>
        
        </div>
    )
}

export default HeaderContent