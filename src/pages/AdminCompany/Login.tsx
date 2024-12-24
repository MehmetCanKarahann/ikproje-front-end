import React, { useEffect, useState } from 'react'
import img from '../../img/login.png'
import { useDispatch } from 'react-redux';
import { IKDispatch } from '../../store';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../store/feature/authSlice';
import { ILoginRequest } from '../../models/ILoginRequest';
import swal from 'sweetalert';

function Login() {

    const dispatch = useDispatch<IKDispatch>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);


    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

    const navigate = useNavigate();

    const Login = () => {
        setIsEmailEmpty(email === '');
        setIsPasswordEmpty(password === '');


        if (email !== '' || password !== '') {

            const loginModel: ILoginRequest = {
                email: email,
                password: password
            }

            dispatch(fetchLogin(loginModel)).then(data => {
                if (data.payload.code === 200){
                    navigate('/companyadmin');
                }
                  

                else {
                    swal('Hata', data.payload.message, 'error');
                }
            });
        }
    }

    //showPassword state değişkeninin durumunu günceller.
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className="auth-page sign-in ">
            <div className='loader'>
                <div className='spinner-grow text-primary' role='status'>
                    <span className='sr-only'>Loading...</span>
                </div>
            </div>
            <div className="connect-container align-content-stretch d-flex flex-wrap">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="auth-form">

                                <div className="row">
                                    <div className="card" style={{ width: '720px' }}>
                                        <div className="card-body">
                                            <div className="logo-box"><a href="#" className="logo-text">Başlamak İçin Giriş Yapın</a></div>
                                            {
                                                isEmailEmpty
                                                    ? <div className="mb-3">
                                                        <input type="email" className="form-control" onChange={evt => (setEmail(evt.target.value))} placeholder="Email Adresi" style={{ fontSize: '18px', borderColor: 'red' }} />
                                                    </div>
                                                    : <div className="mb-3">
                                                        <input type="email" className="form-control" onChange={evt => (setEmail(evt.target.value))} placeholder="Email Adresi" style={{ fontSize: '18px' }} />
                                                    </div>
                                            }
                                            {
                                                isPasswordEmpty
                                                    ? <div className="form-group mb-5" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                                        <input type={showPassword ? 'text' : 'password'} className="form-control" onChange={evt => (setPassword(evt.target.value))} placeholder="Şifreniz" style={{ paddingRight: '40px', flex: 1, fontSize: '15px', borderColor: 'red' }} />
                                                        <button type="button" onClick={togglePasswordVisibility}
                                                           style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            marginLeft: '-40px'
                                                        }}
                                                        >
                                                            {showPassword ? (
                                                                <i className="material-icons">visibility</i>
                                                            ) : (
                                                                <i className="material-icons">visibility_off</i>
                                                            )}
                                                        </button>
                                                    </div>
                                                    : <div className="form-group" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                                        <input type={showPassword ? 'text' : 'password'} className="form-control" onChange={evt => (setPassword(evt.target.value))} placeholder="Şifreniz"  style={{ paddingRight: '40px', flex: 1, fontSize: '15px' }}/>
                                                        <button type="button" onClick={togglePasswordVisibility}
                                                            style={{
                                                                background: 'transparent',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                marginLeft: '-40px'
                                                            }}
                                                        >
                                                            {showPassword ? (
                                                                <i className="material-icons">visibility</i>
                                                            ) : (
                                                                <i className="material-icons">visibility_off</i>
                                                            )}
                                                        </button>
                                                    </div>
                                            }
                                            <div className="row mb-3 me-2">
                                                <div className="col-6">

                                                </div>
                                                <div className="col-6  text-end ">
                                                    <NavLink to={'/forgotpassword'} style={{ fontSize: '18px', fontWeight: 'bold' }}>Şifremi Unuttum!</NavLink>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <button type="submit" className="btn btn-primary btn-block btn-submit " style={{ width: '550px', fontSize: '17px', marginLeft: '15px' }} onClick={Login}  > Giriş Yap</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
                            <img src={img} alt="" style={{ width: '750px', marginTop: '15%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login