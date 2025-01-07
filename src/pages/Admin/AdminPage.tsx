import React, { useEffect } from 'react'
import NavbarMenu from '../../components/molecules/Admin/NavbarMenu'
import './AdminPage.css'
import SideBarMenu from '../../components/molecules/Admin/SideBarMenu'
import DashboardPage from '../../components/organisms/admin/DashboardPage'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../store'
import { fetchGetCompaniesWithExpiringMemberships, fetchGetCompanyCount, fetchGetEmployeeCount } from '../../store/feature/adminSlice'

function AdminPage() {

    const dispatch = useDispatch<IKDispatch>();

    useEffect(() => {
        dispatch(fetchGetCompanyCount())
        dispatch(fetchGetEmployeeCount())
        dispatch(fetchGetCompaniesWithExpiringMemberships())
    }, [])

    return (
        <>
            {/** Navbar Start */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light navbar-bgcolor" >
                <NavbarMenu />
            </nav>
            {/** Navbar End */}



            {/**Menü Başlangıç */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ height: '100vh' }}>
                <SideBarMenu />
            </aside>
            {/**Menü Bitiş */}


            <div className="content-wrapper">
                <section className='content'>
                    <DashboardPage />
                </section>
            </div>

        </>
    )
}

export default AdminPage

{/** 
İçerik oluşturmak için başlangıç div
 <div className="content-wrapper"></div>
 */}