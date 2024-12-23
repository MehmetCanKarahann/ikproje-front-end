import React from 'react';
import { NavLink } from 'react-router-dom';
import { IKUseSelector } from '../../../store';
import './SideBar.css'


function SideBar() {
    const profile = IKUseSelector(state => state.companyManagement.companyManagementProfile);

    return (
        <>
            <div className="logo-box">
                <NavLink to={'/companyadmin'} className="logo-text">
                    HR Manage
                </NavLink>
                <a id="sidebar-close"><i className="material-icons">close</i></a>
                <a style={{ cursor: 'pointer' }} id="sidebar-state">
                    <i className="material-icons">adjust</i>
                    <i className="material-icons compact-sidebar-icon">panorama_fish_eye</i>
                </a>
            </div>
            <div className="page-sidebar-inner slimscroll">
                <ul className="accordion-menu">
                    <li>
                        <NavLink
                            to="/companyadmin"
                            className={({ isActive }) => isActive ? 'active-page' : ''}
                        >
                            <i className="material-icons-outlined">home</i>Anasayfa
                        </NavLink>
                    </li>

                    {profile?.userRole === 'COMPANY_MANAGER' ? (
                        <>
                            <li className="sidebar-title">Personel Yönetimi</li>
                            <li>
                                <NavLink
                                    to="/company-personel-list"
                                    className={({ isActive }) => isActive ? 'active-page' : ''}
                                >
                                    <i className="material-icons-outlined">group</i>Personel Listesi
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/company-personel-state-list" className={({ isActive }) => isActive ? 'active-page' : ''}>
                                    <i className="material-icons-outlined">person</i>Personel Durum Listesi
                                </NavLink>
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
                    ) : (
                        <>
                            <li className="sidebar-title">İzin Yönetimi</li>
                            <li>
                                <NavLink to="/izin-listesi">
                                    <i className="material-icons-outlined">list</i>İzin Listesi
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/izin-talebi">
                                    <i className="material-icons-outlined">add</i>İzin Talebi
                                </NavLink>
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
                    )}
                </ul>
            </div>
        </>
    );
}

export default SideBar;
