import React, { useEffect } from 'react'
import SideBar from '../../components/molecules/CompanyAdmin/SideBar'
import Header from '../../components/molecules/CompanyAdmin/Header'
import PersonelShiftList from '../../components/organisms/PersonelShiftList'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../store'
import { fetchGetPersonelListByCompanyId, fetchGetPersonelShiftList } from '../../store/feature/userShiftSlice'

function PersonelAssignShiftListPage() {

    const dispatch = useDispatch<IKDispatch>();

    useEffect(() => {
       dispatch(fetchGetPersonelShiftList());
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
                            <PersonelShiftList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonelAssignShiftListPage