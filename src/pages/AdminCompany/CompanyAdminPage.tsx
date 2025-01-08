import React, { useEffect } from 'react'
import SideBar from '../../components/molecules/CompanyAdmin/SideBar'
import Header from '../../components/molecules/CompanyAdmin/Header'
import Dashboard from '../../components/molecules/CompanyAdmin/Dashboard'
import DashboardCalendar from '../../components/molecules/Admin/DashboardCalendar'
import PersonelUpcomingBirthdayList from '../../components/organisms/PersonelUpcomingBirthdayList'
import { useDispatch, useSelector } from 'react-redux'
import { IKDispatch, IKUseSelector } from '../../store'
import { fetchGetCharts, fetchGetUpcomingBirthdays } from '../../store/feature/companyManagerSlice'


function CompanyAdminPage() {

  const dispatch = useDispatch<IKDispatch>();

  const charts = IKUseSelector(state=>state.companyManagement.chartList);
  /*
  interface IDashBoard {
  departments: [string],
  employeeCounts: [number],
  genderDistribution:[number]
}
  */
  const departments = charts ?charts.departments.map(department=>{
    return department[0]; //departman ismi
  }) : [];
  const employeeCounts = charts ? charts.departments.map(department=>{
    return department[1];// departmanda çalışan sayısı
  }) : [];
  const erkekKadin = charts ? charts.genderDistribution.map(personel=>{
    return personel[1];
  }) : [];
  console.log("departments: "+departments)
  console.log("departman çalışan sayısı: "+employeeCounts)
  console.log("erkek-kadın: "+erkekKadin)


  console.log("charts: ",charts);

  useEffect(() => {
    dispatch(fetchGetUpcomingBirthdays());
    dispatch(fetchGetCharts());

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
                      <h5 className='card-title ms-5'>{charts?.totalPersonelCount}</h5>
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
                      <h5 className='card-title ms-5'>{charts?.personalOnLeaveCount}</h5>
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
                      <h5 className='card-title ms-5'>{charts?.totalShiftCount}</h5>
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
            {
              charts ?
           
            <div className="row">
              <Dashboard 
              departments={departments}
              employeeCounts={employeeCounts}
              genderDistribution={erkekKadin}
              />
            </div>
              :
              null

            }

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