import React, { useEffect } from 'react'
import SideBar from '../../components/molecules/CompanyAdmin/SideBar'
import Header from '../../components/molecules/CompanyAdmin/Header'
import PersonelExpenseList from '../../components/organisms/PersonelExpenseList'
import { IKDispatch, IKUseSelector } from '../../store'
import { useDispatch } from 'react-redux'
import { fetchGetPersonelExpenseRequest } from '../../store/feature/expenseSlice'

function PersonelExpenseListPage() {

   const dispatch = useDispatch<IKDispatch>();

   useEffect(() => {
        dispatch(fetchGetPersonelExpenseRequest());
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
                        <PersonelExpenseList />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonelExpenseListPage