import React, { useEffect } from 'react'
import SideBar from '../../components/molecules/CompanyAdmin/SideBar'
import Header from '../../components/molecules/CompanyAdmin/Header'
import ShiftList from '../../components/organisms/ShiftList'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../store'
import { fetchGetAllShiftsByCompanyId } from '../../store/feature/shiftSlice'

function ShiftManagementPage() {

    const dispatch = useDispatch<IKDispatch>();

    useEffect(() => {
        dispatch(fetchGetAllShiftsByCompanyId());
    }, []);

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
            <div className="row">
                <ShiftList />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ShiftManagementPage