import React from 'react'
import HeaderNavbar from '../components/molecules/HeaderNavbar'
import './HomePage.css'


function HomePage() {

    return (
        <>
            <div className='container-fluid'>
                <HeaderNavbar />
            </div>
            
            <div className='custom-green-banner'>
                <h1 style={{ color: 'white' }} className='text-center'>Deneme</h1>
            </div>
        </>
    )
}

export default HomePage