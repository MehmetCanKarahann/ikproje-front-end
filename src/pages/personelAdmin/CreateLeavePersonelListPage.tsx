import React, { useEffect } from 'react'
import Header from '../../components/molecules/PersonelAdmin/Header'
import SideBar from '../../components/molecules/PersonelAdmin/SideBar'
import PersonelLeaveList from '../../components/organisms/PersonelLeaveList'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../store'
import { fetchGetPersonelRequestLeaveList } from '../../store/feature/leaveSlice'

function CreateLeavePersonelListPage() {

  const dispatch = useDispatch<IKDispatch>();

   useEffect(() => {
          dispatch(fetchGetPersonelRequestLeaveList());
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
            <div className="row">
              <PersonelLeaveList />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default CreateLeavePersonelListPage