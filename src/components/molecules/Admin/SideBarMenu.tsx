import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../../img/HR_Manage_Logo.png'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../../store'
import { userAdminLogout } from '../../../store/feature/adminSlice'

function SideBarMenu() {

    const dispatch = useDispatch<IKDispatch>();
    const navigate = useNavigate();

    const logOut = async() => {
        await localStorage.removeItem('adminToken');
        dispatch(userAdminLogout());
        navigate('/adminlogin');
    }

  return (
    <>
        <NavLink to={'/admin'} className="brand-link d-flex align-items-center"  style={{ textDecoration: 'none' }}>
                <img
                    src={logo}
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3 text-center"
                    style={{ opacity: .8, marginRight: '10px'}}
                />
                <div className="d-flex flex-column">
                    <span className="brand-text font-weight-light" style={{fontSize: '18px'}}>Admin Paneli</span>
                </div>
            </NavLink>


            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex align-items-center">
                    <div className="image" style={{ marginRight: '10px' }}>
                        <img src={"/dist/img/user2-160x160.jpg"} className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info d-flex flex-column">
                        <span className="d-block" style={{ color: 'white', fontSize: '16px' }}>Hoşgeldiniz!</span>
                        <span className="d-block" style={{ color: 'white' }}> </span>
                    </div>
                </div>

                <div className="row ">
                    <div className='d-grid'>
                        <button className='btn btn-outline-success' onClick={logOut} style={{fontSize: '17px'}}>Çıkış Yap</button>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                        <li className="nav-item ">
                            <a  className="nav-link">
                                <i className="fa-solid fa-list fa-sm"></i>
                                <p className='ms-2' style={{fontSize: '15px'}}>
                                    Şirket Listesi
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a  className="nav-link ">
                                <i className="fa-solid fa-clipboard-list fa-sm" ></i>
                                <p className='ms-2' style={{fontSize: '15px'}}>
                                    Tanımlamalar
                                </p>
                            </a>
                        </li>
                    </ul>
                </nav>

            </div>
    </>
  )
}

export default SideBarMenu