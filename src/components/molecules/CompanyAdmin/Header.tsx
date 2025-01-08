import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { IKDispatch, IKUseSelector } from '../../../store';
import { NavLink, useNavigate } from 'react-router-dom';
import { userLogout } from '../../../store/feature/authSlice';
import './Header.css';
import swal from 'sweetalert';
import { fetchAddLogoToCompany, fetchGetCompanyManagerProfileByToken } from '../../../store/feature/companyManagerSlice';
import { fetchCreateComment } from '../../../store/feature/commentSlice';
import { toast, ToastContainer } from 'react-toastify';

function Header() {


    const dispatch = useDispatch<IKDispatch>();
    const profile = IKUseSelector(state => state.companyManagement.companyManagementProfile);
    const navigate = useNavigate();

    const [file, setFile] = useState<File | null>(null);

    const dropdownRef = useRef<HTMLLIElement>(null); //açılır menü hatasını çözmek için yazıldı.

    //kullanıcı bilgileri getiriliyor
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(fetchGetCompanyManagerProfileByToken());
        }
    }, [dispatch]);

    const logout = async () => {
        await localStorage.removeItem('token');
        dispatch(userLogout());
        navigate('/login');
    }

    //dropdown menü açmak için yazıldı.
    const toggleDropdown = () => {
        if (dropdownRef.current) {
            const dropdown = new (window as any).bootstrap.Dropdown(dropdownRef.current);
            dropdown.toggle();
        }
    };

    const closeDropdown = () => {
        if (dropdownRef.current) {
            const dropdown = new (window as any).bootstrap.Dropdown(dropdownRef.current);
            dropdown.hide();
        }
    };

    const handleChange = (evt: any) => {
        const selectedFile = evt.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    //resim kaydetme
    const handleSubmit = () => {
        if (file) {
            dispatch(fetchAddLogoToCompany(file)).then(data => {
                if (data.payload.code === 200) {
                    swal('Başarı!', 'Profil Resminiz Başarıyla Güncellendi', 'success').then(() => {
                        dispatch(fetchGetCompanyManagerProfileByToken());
                    });
                }
                else {
                    swal('Hata!', data.payload.message, 'error');
                }
            });
        } else {
            swal('Hata!', 'Herhangi bir dosya seçilmedi...', 'error');
        }
    }

  

    return (
        <>
           <nav className="navbar navbar-expand navbar-bg-color">
                <ul className="navbar-nav">
                    <li className="nav-item nav-profile dropdown" ref={dropdownRef}>
                        <a 
                            className="nav-link dropdown-toggle" 
                            onClick={toggleDropdown} 
                            role="button"
                            aria-expanded="false"
                        >
                            <img
                                src={profile?.companyLogoUrl || ''}
                                alt="profile"
                                style={{ width: 60, height: 60, borderRadius: '50%' }}
                            />
                            <span style={{ color: 'gray' }}>
                                {profile?.firstName} {profile?.lastName} - {profile?.companyName}
                            </span>
                            <i className="material-icons dropdown-icon">keyboard_arrow_down</i>
                        </a>
                        <div className="dropdown-menu" style={{width: 250}}>
                            <a 
                                style={{ cursor: 'pointer' }} 
                                className="dropdown-item x-item" 
                                data-bs-toggle="modal" 
                                data-bs-target="#uploadProfileModal"
                                onClick={closeDropdown}
                            >
                                Profil Resmi Güncelle
                            </a>
                            <NavLink 
                                to={'/company-management-profile'} 
                                className="dropdown-item"
                            >
                                Profilim
                            </NavLink>
                            
                            <a 
                                style={{ cursor: 'pointer' }} 
                                onClick={logout} 
                                className=" dropdown-item"
                            >
                                Çıkış Yap
                            </a>
                            
                        </div>
                    </li>
                </ul>
                <ul className='navbar-nav ms-auto' >
                    <li className='nav-item'>
                        <NavLink to="/comment-list"  style={{fontFamily: 'Lato'}} > Görüşlerinizi Bizimle Paylaşın</NavLink>
                    </li>
                </ul>
            </nav>
            <div className="modal fade bd-example-modal-lg" id="uploadProfileModal" aria-labelledby="uploadProfileModal" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Profil Resmi Güncelle</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>
                            <hr style={{ border: '1px black solid' }} />
                            <div className="modal-body">

                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <label className="form-label ms-3">Profil Resminiz:</label>
                                        <input onChange={handleChange} type="file" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <img src={file ? URL.createObjectURL(file) : 'https://lh4.googleusercontent.com/proxy/kX0otYkzacbwl936L9VnavuyJ7pX7mzAaJTVGOysJBK1HY2F8PrjfIEb-uXhsi6vwKajxYE3KkPbmrw'} alt="" style={{ width: 150, height: 100 }} />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
              
        </>
    )
}

export default Header