import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../store'
import { useNavigate } from 'react-router-dom';
import { fetchForgotPasswordByEmail } from '../../store/feature/userSlice';
import swal from 'sweetalert';

function ForgotPassword() {

    const dispatch = useDispatch<IKDispatch>();

    const [forgotEmail, setForgotEmail] = useState('');

    const [isForgotEmailEmpty, setIsForgotEmailEmpty] = useState(false);

    const navigate = useNavigate();

    const submit = () => {
        setIsForgotEmailEmpty(forgotEmail === '');

        if(forgotEmail !== ''){

            dispatch(fetchForgotPasswordByEmail(forgotEmail)).then(data => {
                if(data.payload.code === 200){
                    swal('Başarı', 'Şifre sıfırlama linkiniz mail adresinize gönderilmiştir.', 'success').then(() => {
                        navigate('/login'); 
                    });
                }
                else {
                    swal('Hata', data.payload.message, 'error');
                }
            })

        }
    }

    return (
        <div className="auth-page sign-in">
            <div className='loader'>
                <div className='spinner-grow text-primary' role='status'>
                    <span className='sr-only'>Loading...</span>
                </div>
            </div>
            <div className="connect-container align-content-stretch d-flex flex-wrap">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12" style={{marginLeft: '18%'}}>
                            <div className="auth-form">
                                <div className="row">
                                    <div className="card" style={{ width: '720px' }}>
                                        <div className="card-body">
                                            <div className="logo-box"><a href="#" className="logo-text">Şifrenizi Sıfırlamak İçin Eposta Adresinizi Giriniz</a></div>
                                            {
                                                isForgotEmailEmpty
                                                    ? <div className="form-group mb-5">
                                                        <input type="email" className="form-control" onChange={evt => {setForgotEmail(evt.target.value)}} placeholder="Email Adresiniz" style={{ fontSize: '18px', borderColor: 'red' }} />
                                                    </div>
                                                    : <div className="form-group mb-5">
                                                        <input type="email" className="form-control" onChange={evt => {setForgotEmail(evt.target.value)}} placeholder="Email Adresiniz" style={{ fontSize: '18px' }} />
                                                    </div>
                                            }

                                            <div className="col">
                                                <button type="submit" className="btn btn-primary btn-block btn-submit" onClick={submit} style={{ width: '550px', fontSize: '17px', marginLeft: '15px' }} >Gönder</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword