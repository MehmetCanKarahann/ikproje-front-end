import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { IKDispatch, IKUseSelector } from '../../../store'
import { userLogout } from '../../../store/feature/authSlice';
import state from 'sweetalert/typings/modules/state';

function SideBar() {

    const profile = IKUseSelector(state => state.companyManagement.companyManagementProfile);


    return (
        <>
            <div className="logo-box"><NavLink to={'/companyadmin'} className="logo-text">HR Manage</NavLink><a id="sidebar-close"><i className="material-icons">close</i></a> <a style={{ cursor: 'pointer' }} id="sidebar-state"><i className="material-icons">adjust</i><i className="material-icons compact-sidebar-icon">panorama_fish_eye</i></a></div>
            <div className="page-sidebar-inner slimscroll">
                <ul className="accordion-menu">
                    <li className="active-page">
                        <NavLink to={'/companyadmin'} className="active"><i className="material-icons-outlined">home</i>Anasayfa</NavLink>
                    </li>


                    {
                        profile?.userRole === 'COMPANY_MANAGER' ?
                            <>
                                <li className="sidebar-title">
                                    Personel Yönetimi
                                </li>
                                <li>
                                    <a><i className="material-icons-outlined">group</i>Personel Listesi</a>
                                </li>
                                <li>
                                    <a><i className="material-icons-outlined">person</i>Personel Durum Güncelle</a>
                                </li>
                                <li>
                                    <a><i className="material-icons">playlist_add_circle</i>Özlük Belgesi Ekle</a>
                                </li>
                                <li>
                                    <a><i className="material-icons-outlined">rule</i>İzin Yönetimi</a>
                                </li>
                                <li>
                                    <a><i className="material-icons-outlined">receipt_long</i>Harcama Yönetimi</a>
                                </li>
                                <li>
                                    <a><i className="material-icons">view_list</i>Zimmet Listesi</a>
                                </li>
                            </>
                            : <>
                                <li className="sidebar-title">
                                   İzin Yönetimi
                                </li>
                                <li>
                                    <a><i className="material-icons-outlined">list</i>İzin Listesi</a>
                                </li>
                                <li>
                                    <a><i className="material-icons-outlined">add</i>İzin Talebi</a>
                                </li>
                                <li className="sidebar-title">
                                   Zimmet Yönetimi
                                </li>
                                <li>
                                    <a><i className="material-icons-outlined">list</i>Zimmet Listesi</a>
                                </li>
                                <li className="sidebar-title">
                                   Harcama Yönetimi
                                </li>
                                <li>
                                    <a><i className="material-icons-outlined">list</i>Harcama Listesi</a>
                                </li>
                            </>

                    }
                    {
                        profile?.userRole === 'COMPANY_MANAGER' &&
                            <>
                                <li className="sidebar-title">
                                    Vardiya Yönetimi
                                </li>
                                <li>
                                    <a><i className="material-icons">save</i>Vardiya Yönetimi</a>
                                </li>
                                <li>
                                    <a><i className="material-icons">list</i>Personel Vardiya Listesi</a>
                                </li>
                                <li>
                                    <a><i className="material-icons">free_breakfast</i>Mola Yönetimi</a>
                                </li>
                                <li>
                                    <a><i className="material-icons">fact_check</i>Personel Mola Listesi</a>
                                </li>
                            </>
                    }



                </ul>
            </div>
        </>
    )
}

export default SideBar