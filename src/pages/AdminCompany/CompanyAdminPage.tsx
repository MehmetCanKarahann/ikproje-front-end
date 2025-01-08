import React, { useEffect } from 'react'
import SideBar from '../../components/molecules/CompanyAdmin/SideBar'
import Header from '../../components/molecules/CompanyAdmin/Header'
import Dashboard from '../../components/molecules/CompanyAdmin/Dashboard'
import DashboardCalendar from '../../components/molecules/Admin/DashboardCalendar'
import PersonelUpcomingBirthdayList from '../../components/organisms/PersonelUpcomingBirthdayList'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../store'
import { fetchGetUpcomingBirthdays } from '../../store/feature/companyManagerSlice'


function CompanyAdminPage() {

  const dispatch = useDispatch<IKDispatch>();

  useEffect(() => {
    dispatch(fetchGetUpcomingBirthdays());
  }, [])

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
          <div className="page-content">


            <div className="row stats-row mt-3">

              <div className='col-lg-4 col-md-12' >
                <div className='card card-transparent stats-card'>
                  <div className="card-body">
                    <div className='stats-info'>
                      <h5 className='card-title ms-5'>20</h5>
                      <br />
                      <p className='stats-text ms-5'>Personel Sayısı</p>
                    </div>
                    <div className='stats-icon change-success'>
                      <i className='material-icons'>group</i>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-lg-4 col-md-12' >
                <div className='card card-transparent stats-card'>
                  <div className="card-body">
                    <div className='stats-info'>
                      <h5 className='card-title ms-5'>5</h5>
                      <br />
                      <p className='stats-text ms-5'>Yıllık İzine Ayrılmış Personel Sayısı</p>
                    </div>
                    <div className='stats-icon change-success'>
                      <i className='material-icons'>person</i>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-lg-4 col-md-12' >
                <div className='card card-transparent stats-card'>
                  <div className="card-body">
                    <div className='stats-info'>
                      <h5 className='card-title ms-5'>5</h5>
                      <br />
                      <p className='stats-text ms-5'>Vardiya Sayısı</p>
                    </div>
                    <div className='stats-icon change-success'>
                      <i className='material-icons'>work_history</i>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/**İstatistikler */}
            <div className="row">
              <Dashboard />
            </div>

            <div className="row mt-5">
              <div className="col-6">
                <h3 className='text-center mb-4 text-primary'>Resmi Tatiller</h3>
                <DashboardCalendar />
              </div>
              <div className="col-6">
              <h4 className='text-center mb-4 text-primary'>Doğum Günü Yaklaşan Personel Listesi</h4>
                  <PersonelUpcomingBirthdayList />
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default CompanyAdminPage