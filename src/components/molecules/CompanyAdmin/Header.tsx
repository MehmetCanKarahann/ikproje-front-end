import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { IKDispatch, IKUseSelector } from '../../../store';
import { NavLink, useNavigate } from 'react-router-dom';
import { userLogout } from '../../../store/feature/authSlice';
import { fetchGetProfileByToken } from '../../../store/feature/userSlice';
import './Header.css';

function Header() {

    
    const dispatch = useDispatch<IKDispatch>();
    const profile = IKUseSelector(state => state.user.profile);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(fetchGetProfileByToken()); // Kullanıcı bilgilerini yükle
        }
    }, [dispatch]);

    const logout = async () => {
        await localStorage.removeItem('token');
        dispatch(userLogout());
        navigate('/login');
    }

  return (
    <>
          <nav className="navbar navbar-expand navbar-bg-color" >
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <ul className="navbar-nav">
                            <li className="nav-item small-screens-sidebar-link">
                                <a  className="nav-link"><i className="material-icons-outlined">menu</i></a>
                            </li>
                            <li className="nav-item nav-profile dropdown">
                                <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src="../../assets/images/avatars/profile-image-1.png" alt="profile image" />
                                    <span style={{color: 'gray'}}> {profile?.firstName} {profile?.lastName} - {profile?.companyName} </span><i className="material-icons dropdown-icon">keyboard_arrow_down</i>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a style={{cursor: 'pointer'}} onClick={logout} className="dropdown-item" >Log out</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a style={{cursor: 'pointer'}} className="nav-link" id="dark-theme-toggle"><i className="material-icons-outlined" style={{color: 'gray'}}>brightness_2</i><i className="material-icons">brightness_2</i> </a>
                            </li>
                           
                        </ul>
                     
                       
                       
                    </nav>
    </>
  )
}

export default Header