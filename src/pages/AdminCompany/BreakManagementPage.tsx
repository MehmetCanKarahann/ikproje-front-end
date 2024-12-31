import React, { useEffect } from 'react'
import SideBar from '../../components/molecules/CompanyAdmin/SideBar'
import Header from '../../components/molecules/CompanyAdmin/Header'
import BreakList from '../../components/organisms/BreakList'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../store'
import { fetchGetAllBreak } from '../../store/feature/breakSlice'

function BreakManagementPage() {

    const dispatch = useDispatch<IKDispatch>();

    useEffect(() => {
        dispatch(fetchGetAllBreak())
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
                           <BreakList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BreakManagementPage