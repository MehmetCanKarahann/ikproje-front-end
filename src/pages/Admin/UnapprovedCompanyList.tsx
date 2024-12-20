import React, { useEffect } from 'react'
import NavbarMenu from '../../components/molecules/Admin/NavbarMenu'
import SideBarMenu from '../../components/molecules/Admin/SideBarMenu'
import { useDispatch } from 'react-redux'
import { IKDispatch, IKUseSelector } from '../../store'
import { fetchGetUnapprovedCompanies } from '../../store/feature/adminSlice'


function UnapprovedCompanyList() {

    const dispatch = useDispatch<IKDispatch>();
    const companyList = IKUseSelector(state => state.admin.unapprovedCompanyList);

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
                    <div className="container-fluid">
                        <div className="row mt-5">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className=" mt-4">Onaylanmamış Şirketler Listesi</h5>
                                </div>
                                <div className="card-body table-responsive p-0">
                                <table id="example1" className="table table-hover text-nowrap text-center">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Ad</th>
                                            <th>Soyad</th>
                                            <th>Telefon Numarası</th>
                                            <th>Email Adresi</th>
                                            <th>Şirket Adı</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            companyList.map((company, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{company.id}</td>
                                                        <td>{company.firstName}</td>
                                                        <td>{company.lastName}</td>
                                                        <td>{company.phone}</td>
                                                        <td>{company.email}</td>
                                                        <td>{company.companyName}</td>
                                                        <td></td>
                                                    </tr>
                                                )
                                            })
                                        }


                                    </tbody>
                                </table>
                            </div>

                            </div>
                            
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default UnapprovedCompanyList