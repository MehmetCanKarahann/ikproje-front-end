import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { IKDispatch, IKUseSelector } from '../../../store';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchGetPersonelProfileByToken, fetchAddAvatarToUser } from '../../../store/feature/employeeSlice';
import { userLogout } from '../../../store/feature/authSlice';
import swal from 'sweetalert';

function Header() {

    const dispatch = useDispatch<IKDispatch>();
    const profile = IKUseSelector(state => state.employeeSlice.personelProfile);
    const navigate = useNavigate();

    const [file, setFile] = useState<File | null>(null);

    //kullanıcı bilgileri getiriliyor
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(fetchGetPersonelProfileByToken());
        }
    }, [dispatch]);

    //çıkış yapma işlemi için kullanılıyor.
    const logout = async () => {
        await localStorage.removeItem('token');
        dispatch(userLogout());
        navigate('/login');
    }

    const handleChange = (evt: any) => {
        const selectedFile = evt.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = () => {
        if (file) {
            dispatch(fetchAddAvatarToUser(file)).then(data => {
                if(data.payload.code === 200) {
                    swal('Başarı!', 'Profil Resminiz Başarıyla Güncellendi', 'success').then(() => {
                        dispatch(fetchGetPersonelProfileByToken());
                    });
                }
                else{
                    swal('Hata!', data.payload.message, 'error');
                }
            });
        } else {
           swal('Hata!', 'Herhangi bir dosya seçilmedi...', 'error');
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand navbar-bg-color" >
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="navbar-nav">
                    <li className="nav-item small-screens-sidebar-link">
                        <a className="nav-link"><i className="material-icons-outlined">menu</i></a>
                    </li>
                    <li className="nav-item nav-profile dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src= {profile?.avatarUrl || ''} alt="profile image" style={{ width: 60, height: 60, borderRadius: '50%' }} />
                            <span style={{ color: 'gray' }}> {profile?.firstName} {profile?.lastName} - {profile?.companyName} </span><i className="material-icons dropdown-icon">keyboard_arrow_down</i>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a style={{ cursor: 'pointer' }} className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal2">Profil Resmi Güncelle</a>
                            <NavLink to={'/personel-profile'} className="dropdown-item" style={{ backgroundColor: 'white' }}>Profilim</NavLink>
                            <a style={{ cursor: 'pointer' }} onClick={logout} className="dropdown-item" >Log out</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a style={{ cursor: 'pointer' }} className="nav-link mt-1" id="dark-theme-toggle"><i className="material-icons-outlined" style={{ color: 'gray' }}>brightness_2</i><i className="material-icons">brightness_2</i> </a>
                    </li>

                </ul>
                <div className="modal fade bd-example-modal-lg" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <img src={file ? URL.createObjectURL(file) : ''} style={{ width: 150, height: 100 }} />
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


            </nav>
        </>
    )
}

export default Header