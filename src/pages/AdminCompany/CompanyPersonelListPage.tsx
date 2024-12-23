import React, { useEffect } from 'react'
import SideBar from '../../components/molecules/CompanyAdmin/SideBar'
import Header from '../../components/molecules/CompanyAdmin/Header'
import PersonelList from '../../components/organisms/PersonelList'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../store'
import { fetchGetPersonelList } from '../../store/feature/companyManagerSlice'

function CompanyPersonelListPage() {

    const dispatch = useDispatch<IKDispatch>();

    useEffect(() => {
        dispatch(fetchGetPersonelList());
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
                            <PersonelList />
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default CompanyPersonelListPage