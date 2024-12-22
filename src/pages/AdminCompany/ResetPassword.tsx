import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../store'
import { useNavigate, useSearchParams } from 'react-router-dom';
import swal from 'sweetalert';
import { fetchResetPassword } from '../../store/feature/authSlice';

function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch<IKDispatch>();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');


    const submit = async () => {
        if (!password || !rePassword) {
            swal('Lütfen tüm alanları doldurun.','','error');
            return;
        }

        if (password !== rePassword) {
            swal('Şifreler eşleşmiyor.','','error');
            return;
        }

        try {
            const response = await dispatch(fetchResetPassword({ token: token || '', password, rePassword })).unwrap();
            if (response.success) {
                swal('Başarı', 'Şifreniz başarıyla değiştirildi.', 'success').then(() => {
                    navigate('/login'); 
                });
            } else {
                swal(response.message || 'Bir hata oluştu.','','error');
            }
        } catch (err) {
            console.error(err);
            swal('Şifre sıfırlama sırasında bir hata oluştu.','','error');
        }
    };

    return (
        <div className="auth-page sign-in">
            <div className="connect-container align-content-stretch d-flex flex-wrap">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12" style={{ marginLeft: '18%' }}>
                            <div className="auth-form">
                                <div className="row">
                                    <div className="card" style={{ width: '720px' }}>
                                        <div className="card-body">
                                            <div className="logo-box"><a href="#" className="logo-text">Şifrenizi Sıfırlayın</a></div>                                          
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Yeni Şifre" style={{ fontSize: '18px' }} value={password} onChange={(e) => setPassword(e.target.value)}/>
                                            </div>
                                            <div className="form-group mb-5">
                                                <input type="password" className="form-control" placeholder="Şifreyi Tekrar Girin" style={{ fontSize: '18px' }} value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>
                                            </div>
                                            <div className="col mb-5">
                                                <button type="submit" className="btn btn-primary btn-block btn-submit" style={{ width: '550px', fontSize: '17px', marginLeft: '15px' }} onClick={submit}>
                                                    Kaydet
                                                </button>
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
    );
}

export default ResetPassword