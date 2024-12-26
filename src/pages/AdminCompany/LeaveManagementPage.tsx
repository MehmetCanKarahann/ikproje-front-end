import React, { useEffect } from 'react'
import LeaveList from '../../components/organisms/LeaveList'
import SideBar from '../../components/molecules/CompanyAdmin/SideBar'
import Header from '../../components/molecules/CompanyAdmin/Header'
import { useDispatch } from 'react-redux'
import { fetchGetLeaveRequest } from '../../store/feature/leaveSlice'
import { IKDispatch } from '../../store'

function LeaveManagementPage() {

    const dispatch = useDispatch<IKDispatch>();

    useEffect(() => {
        dispatch(fetchGetLeaveRequest());
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
                            <LeaveList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeaveManagementPage