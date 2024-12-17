import React from 'react'
import logo from '../../../img/logo-2-2.png'
import logo2 from '../../../img/logo3-3.png'
import logo3 from '../../../img/logo4-4.png'
import logo4 from '../../../img/logo5-5.png'
import logo5 from '../../../img/logo6-6.png'
import './LogoCarousel.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

function LogoCarousel() {

    const logoData = [
        { id: 1, src: logo, alt: 'Logo 1' },
        { id: 2, src: logo2, alt: 'Logo 2' },
        { id: 3, src: logo3, alt: 'Logo 3' },
        { id: 4, src: logo4, alt: 'Logo 4' },
        { id: 5, src: logo5, alt: 'Logo 5' },
        // Daha fazla logo ekleyebilirsiniz
    ];
    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4, 
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // Daha yavaş döngü
        cssEase: "ease-in-out", // Daha yumuşak geçiş
        pauseOnHover: true,
        arrows: true,
        centerMode: true, 
        centerPadding: "10px", 
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    centerPadding: "5px", 
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "5px",
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "0px",
                }
            }
        ]
    };
    

    return (
        <div className="logos-carousel-container">
        <h2 className="carousel-title">ORTAKLARIMIZ</h2>
        <Slider {...settings}>
            {logoData.map(logo => (
                <div key={logo.id} className="logo-slide">
                    <img src={logo.src} alt={logo.alt} className="logo-image" />
                </div>
            ))}
        </Slider>
    </div>
    )
}

export default LogoCarousel