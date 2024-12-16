import React from 'react'
import NavbarMenu from '../../components/molecules/Admin/NavbarMenu'
import './AdminPage.css'
import SideBarMenu from '../../components/molecules/Admin/SideBarMenu'

function AdminPage() {
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

        </>
    )
}

export default AdminPage

{/** 
İçerik oluşturmak için başlangıç div
 <div className="content-wrapper"></div>
 */}