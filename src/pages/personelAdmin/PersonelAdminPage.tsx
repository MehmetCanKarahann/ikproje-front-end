import React, { useEffect } from 'react'
import SideBar from '../../components/molecules/PersonelAdmin/SideBar'
import Header from '../../components/molecules/PersonelAdmin/Header'
import DashboardCalendar from '../../components/molecules/Admin/DashboardCalendar'
import { useDispatch } from 'react-redux'
import { IKDispatch, IKUseSelector } from '../../store'
import { fetchGetActiveShiftDetails } from '../../store/feature/userShiftSlice'
import PersonelShiftAndBreakList from '../../components/organisms/PersonelShiftAndBreakList'
import DashboardShiftCalendar from '../../components/molecules/PersonelAdmin/DashboardShiftCalendar'
import { fecthGetRemainingAnnualLeaveDays, fetchUsedLeaveDays } from '../../store/feature/leaveSlice'

function PersonelAdminPage() {

  const dispatch = useDispatch<IKDispatch>();

  const useLeavedCount = IKUseSelector(state => state.leaveSlice.personelUsedLeaveDays);

  const leaveDayCount = IKUseSelector(state => state.leaveSlice.personelLeaveDays);
 
  

  useEffect(() => {
    dispatch(fetchGetActiveShiftDetails())
    dispatch(fetchUsedLeaveDays());
    dispatch(fecthGetRemainingAnnualLeaveDays());
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
                      <h5 className='card-title ms-5'>{useLeavedCount}</h5>
                      <br />
                      <p className='stats-text ms-5'>Kullanılan Yıllık İzin Günü Sayısı</p>
                    </div>
                    <div className='stats-icon change-success'>
                      <i className='material-icons'>calendar_month</i>
                    </div>
                  </div>
                </div>
              </div>


              <div className='col-lg-4 col-md-12' >
                <div className='card card-transparent stats-card'>
                  <div className="card-body">
                    <div className='stats-info'>
                      <h5 className='card-title ms-5'> {leaveDayCount} </h5>
                      <br />
                      <p className='stats-text ms-5'>Kalan Yıllık İzin Günü Sayısı</p>
                    </div>
                    <div className='stats-icon change-success'>
                      <i className='material-icons'>perm_contact_calendar</i>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="row mt-5">
              <div className="col-6">
                <h3 className='text-center mb-4 text-primary'>Resmi Tatiller</h3>
                <DashboardCalendar />
              </div>

              <div className="col-6">
                <div className="row">
                <h3 className='text-center text-primary'>Vardiya ve Mola Takvimi</h3>

                  <DashboardShiftCalendar />

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default PersonelAdminPage