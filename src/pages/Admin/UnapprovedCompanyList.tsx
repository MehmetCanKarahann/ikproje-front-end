import React, { useEffect, useState } from 'react'
import NavbarMenu from '../../components/molecules/Admin/NavbarMenu'
import SideBarMenu from '../../components/molecules/Admin/SideBarMenu'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../store'
import {  fetchGetUnapprovedCompanies } from '../../store/feature/adminSlice'
import CompanyList from '../../components/organisms/admin/CompanyList'



function UnapprovedCompanyList() {

    const dispatch = useDispatch<IKDispatch>();
    useEffect(() => {
        dispatch(fetchGetUnapprovedCompanies());
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
                    <CompanyList />
                </section>
            </div>

           
        </>
    )
}


export default UnapprovedCompanyList