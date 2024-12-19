import React from 'react'

function ResetPassword() {
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
                        <div className="col-lg-12" style={{ marginLeft: '18%' }}>
                            <div className="auth-form">
                                <div className="row">
                                    <div className="card" style={{ width: '720px' }}>
                                        <div className="card-body">
                                            <div className="logo-box"><a href="#" className="logo-text">Şifrenizi Sıfırlayın</a></div>
                                            <div className="form-group">
                                                <input type="password" className="form-control"  placeholder="Şifreniz" style={{ fontSize: '18px' }} />
                                            </div>
                                            <div className="form-group mb-5">
                                                <input type="password" className="form-control"  placeholder="Şifre Yeniden" style={{ fontSize: '18px' }} />
                                            </div>
                                            <div className="col mb-5">
                                                <button type="submit" className="btn btn-primary btn-block btn-submit" style={{ width: '550px', fontSize: '17px', marginLeft: '15px' }} >Kaydet</button>
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

export default ResetPassword