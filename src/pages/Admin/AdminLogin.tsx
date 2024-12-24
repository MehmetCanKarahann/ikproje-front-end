import React, { useState } from 'react'
import logo from '../../img/HR_Manage_Logo.png'
import './AdminLogin.css'
import { useDispatch } from 'react-redux';
import { IKDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import { fetchAdminLogin } from '../../store/feature/adminSlice';
import { IAdminLoginRequest } from '../../models/IAdminLoginRequest';
import swal from 'sweetalert';

function AdminLogin() {

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

    const loginModel: IAdminLoginRequest = {
      email: email,
      password: password
    }

    if (email !== '' || password !== '') {
      dispatch(fetchAdminLogin(loginModel)).then(data => {
        if (data.payload.code === 200) {
            navigate('/admin');
        }
      })
    }
  }

  //showPassword state değişkeninin durumunu günceller.
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }


  return (
    <div className='container' id='login-content'>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 login-body" style={{ border: '1px solid gray', borderRadius: '20px', marginTop: '90px' }}>
          <div className="text-center mt-5 mb-5" >
            <img src={logo} width={150} height={150} style={{ borderRadius: '100%' }} />
            <h6 className='mt-2 text-center login-header' >Admin Paneline Giriş Yap</h6>
          </div>
          {
            isEmailEmpty
              ? <div className="mb-4">
                <input type="text" style={{ borderColor: 'red' }} onChange={evt => { setEmail(evt.target.value) }} className='form-control input-color' placeholder='Email Adresinizi Giriniz...' />
              </div>
              : <div className="mb-4">
                <input type="text" onChange={evt => { setEmail(evt.target.value) }} className='form-control input-color' placeholder='Email Adresinizi Giriniz...' />
              </div>
          }
          {
            isPasswordEmpty
              ? <div className="mb-4" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'}  style={{ paddingRight: '50px', flex: 1, fontSize: '15px', borderColor: 'red' }} onChange={evt => setPassword(evt.target.value)} className='form-control input-color' placeholder='Şifrenizi Giriniz...' />
                <button type="button" onClick={togglePasswordVisibility}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      marginLeft: '-40px'
                  }}
                >
                  {showPassword ? (
                    <i className="material-icons">visibility</i> // Şifre gizliyse
                  ) : (
                    <i className="material-icons">visibility_off</i> // Şifre gösteriliyorsa
                  )}
                </button>
              </div>
              : <div className="mb-4" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} onChange={evt => setPassword(evt.target.value)} className='form-control input-color' placeholder='Şifrenizi Giriniz...' style={{ paddingRight: '50px', flex: 1, fontSize: '15px'}}/>
                <button type="button" onClick={togglePasswordVisibility}
                   style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: '-40px'
                }}
                >
                  {showPassword ? (
                    <i className="material-icons">visibility</i> // Şifre gizliyse
                  ) : (
                    <i className="material-icons">visibility_off</i> // Şifre gösteriliyorsa
                  )}
                </button>
              </div>
          }


          <div className="mb-4">
            <div className="col text-center">
              <button className='btn btn-outline-dark' onClick={Login} style={{ width: '170px', height: '50px' }}>Giriş Yap</button>
            </div>
          </div>

        </div>
        <div className="col-3"></div>
      </div>
    </div>
  )
}

export default AdminLogin