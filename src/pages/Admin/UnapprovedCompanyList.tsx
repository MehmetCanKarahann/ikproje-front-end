import React, { useEffect, useState } from 'react'
import NavbarMenu from '../../components/molecules/Admin/NavbarMenu'
import SideBarMenu from '../../components/molecules/Admin/SideBarMenu'
import { useDispatch } from 'react-redux'
import { IKDispatch, IKUseSelector } from '../../store'
import { fetchApproveAccount, fetchGetUnapprovedCompanies, fetchRejectAccount } from '../../store/feature/adminSlice'
import swal from 'sweetalert'

function UnapprovedCompanyList() {

    const dispatch = useDispatch<IKDispatch>();
    const companyList = IKUseSelector(state => state.admin.unapprovedCompanyList);

    const [userId, setUserId] = useState(0);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [rejectionMessage, setRejectionMessage] = useState('');

    useEffect(() => {
        dispatch(fetchGetUnapprovedCompanies());
    }, [])

    const handleConfirmAccount = () => {

        dispatch(fetchApproveAccount({ userId: userId, confirmationMessage: confirmationMessage })).then(data => {
            if (data.payload.code === 200) {
                swal('Başarı!', 'Şirket Hesabı Başarılı Şekilde Onaylanmıştır.', 'success').then(() => {
                    dispatch(fetchGetUnapprovedCompanies());
                });
            }
            else {
                swal('Hata!', data.payload.message, 'error');
            }
        })
    }

    const handleRejectAccount = () => {
        dispatch(fetchRejectAccount({ userId: userId, rejectionMessage: rejectionMessage })).then(data => {
            if (data.payload.code === 200) {
                swal('Başarı!', 'Şirket Hesabı Başarılı Şekilde Reddedilmiştir.', 'success').then(() => {
                    dispatch(fetchGetUnapprovedCompanies());
                });
            }
            else {
                swal('Hata!', data.payload.message, 'error');
            }
        })
    }


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
                                <div className="card-body table-responsive p-0 mb-5">
                                    <table id="example1" className="table  text-nowrap text-center">
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
                                                            <td>
                                                                <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setUserId(companyList[index].id) }}>
                                                                    <i className="fa-solid fa-check"></i>
                                                                </button>
                                                                <button className='btn btn-danger ms-2' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { setUserId(companyList[index].id) }}>
                                                                    <i className="fa-solid fa-xmark"></i>

                                                                </button>
                                                            </td>
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

            <div className="modal fade bd-example-modal-lg" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Şirket Hesabını Onayla</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <hr style={{ border: '1px black solid' }} />
                        <div className="modal-body">
                            <div className="row mt-4 mb-5">
                                <label className='form-label'>Açıklama:</label>
                                <textarea className='form-control' onChange={evt => { setConfirmationMessage(evt.target.value) }}></textarea>
                            </div>
                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleConfirmAccount} >Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade bd-example-modal-lg" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Şirket Hesabını Reddet</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <hr style={{ border: '1px black solid' }} />
                        <div className="modal-body">
                            <div className="row mt-4 mb-5">
                                <label className='form-label'>Açıklama:</label>
                                <textarea className='form-control' onChange={evt => { setRejectionMessage(evt.target.value) }}></textarea>
                            </div>
                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleRejectAccount} >Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default UnapprovedCompanyList