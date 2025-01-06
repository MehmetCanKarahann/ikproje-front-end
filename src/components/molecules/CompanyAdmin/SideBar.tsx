import React from 'react';
import { NavLink } from 'react-router-dom';
import { IKUseSelector } from '../../../store';
import './SideBar.css'


function SideBar() {
  

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
                    {/* <li>
                        <a><i className="material-icons">playlist_add_circle</i>Özlük Belgesi Ekle</a>
                    </li> */}
                    <li>
                        <NavLink to="/leave-list"  className={({ isActive }) => isActive ? 'active-page' : ''}>
                            <i className="material-icons-outlined">rule</i>İzin Yönetimi
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/personel-expense-list"  className={({ isActive }) => isActive ? 'active-page' : ''}>
                            <i className="material-icons-outlined">receipt_long</i>Harcama Yönetimi
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/personel-asset-list" className={({ isActive }) => isActive ? 'active-page' : ''}>
                            <i className="material-icons">view_list</i> Zimmet Yönetimi
                        </NavLink>
                    </li>

                    <li className="sidebar-title">
                        Vardiya Yönetimi
                    </li>
                    <li>
                        <NavLink to="/shift-list" className={({ isActive }) => isActive ? 'active-page' : ''}>
                            <i className="material-icons">save</i>Vardiya Yönetimi
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/personel-shift-list" className={({ isActive }) => isActive ? 'active-page' : ''}>
                            <i className="material-icons">list</i>Personel Vardiya Listesi
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/personel-break-list" className={({ isActive }) => isActive ? 'active-page' : ''}>
                            <i className="material-icons">free_breakfast</i>Mola Yönetimi
                        </NavLink>
                    </li>

                </ul>
            </div>
        </>
    );
}

export default SideBar;
