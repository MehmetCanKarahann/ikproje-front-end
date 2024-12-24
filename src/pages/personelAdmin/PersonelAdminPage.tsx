import React from 'react'
import SideBar from '../../components/molecules/PersonelAdmin/SideBar'
import Header from '../../components/molecules/PersonelAdmin/Header'

function PersonelAdminPage() {

    

  return (
    <>
         <div className='loader'>
        <div className='spinner-grow text-primary' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>

      <div className="connect-container align-content-stretch d-flex flex-wrap">
        <div className="page-sidebar">
          <SideBar />
        </div>
        <div className="page-container">
          <div className="page-header" >
            <Header />
          </div>
          
        </div>
      </div>

    </>
  )
}

export default PersonelAdminPage