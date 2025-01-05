import React, { useEffect } from 'react'
import SideBar from '../../components/molecules/PersonelAdmin/SideBar'
import Header from '../../components/molecules/PersonelAdmin/Header'
import ExpenseList from '../../components/organisms/PersonelAdmin/ExpenseList'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../store'
import { fetchGetPersonelExpenseList } from '../../store/feature/expenseSlice'

function ExpenseListPersonelPage() {

    const dispatch = useDispatch<IKDispatch>();

    useEffect(() => {
        dispatch(fetchGetPersonelExpenseList());
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
                            <ExpenseList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExpenseListPersonelPage