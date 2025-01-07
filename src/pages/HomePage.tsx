import React, { useEffect } from 'react'
import HeaderNavbar from '../components/molecules/Home/HeaderNavbar'
import './HomePage.css'
import HeaderContent from '../components/molecules/Home/HeaderContent'
import LogoCarousel from '../components/molecules/Home/LogoCarousel'
import ApplicationContent from '../components/molecules/Home/ApplicationContent'
import CommentCarouselContent from '../components/molecules/Home/CommentCarouselContent'
import img from '../img/bg.png'
import Footer from '../components/molecules/Home/Footer'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../store'
import { fetchGetComments } from '../store/feature/commentSlice'
import { fetchGetCompanyLogos } from '../store/feature/companySlice'


function HomePage() {

    const dispatch = useDispatch<IKDispatch>();

    useEffect(() => {
        dispatch(fetchGetCompanyLogos());
    }, []);

    return (
        <>
            <div className='container-fluid'>
                <HeaderNavbar />
            </div>

            <div className='custom-green-banner'>
                <HeaderContent />
            </div>

            {/** Logoların bulunduğu kısım */}
            <div className="container">
                <div className="row" style={{ marginTop: '100px' }}>
                    <LogoCarousel />
                </div>
            </div>

            {/**Uygulamalar Kısmı */}
            <div className="container">
                <ApplicationContent />
            </div>

            {/**Kullanıcı Yorumları Kısmı */}
            <div className="container">

                <div className="row mt-5" style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
                 
                    <div className="background-blur"></div>

                   
                    <div className="content">
                        <CommentCarouselContent />
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <Footer />
            </div>
        </>
    )
}

export default HomePage