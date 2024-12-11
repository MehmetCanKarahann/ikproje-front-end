import React from 'react'

interface IStepSixProps {
    companyEmail: string
    password: string
    rePassword: string
    setCompanyEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setRePassword: (value: string) => void;
    handlePrevious: () => void;
    registerHandle: () => void;
}

function Step6(props: IStepSixProps) {

    const {companyEmail,password,rePassword,setCompanyEmail, setPassword, setRePassword, handlePrevious, registerHandle} = props;

    return (
        <>
            <div className="logo-box"><a href="#" className="logo-text">Üyelik Bilgileriniz</a></div>
            <div className="form-group">
                <input type="email" className="form-control" value={companyEmail} onChange={evt => { setCompanyEmail(evt.target.value) }} placeholder="Şirket Email Adresi" style={{ fontSize: '18px' }} />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" value={password} onChange={evt => { setPassword(evt.target.value) }} placeholder="Şifreniz" style={{ fontSize: '18px' }} />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" value={rePassword} onChange={evt => { setRePassword(evt.target.value) }} placeholder="Şifre Yeniden" style={{ fontSize: '18px' }} />
            </div>
            <div className="row">
                <div className="col-6 text-center">
                    <button className="btn btn-secondary btn-block btn-submit" style={{ fontSize: '17px' }} onClick={handlePrevious}>Geri</button>

                </div>
                <div className="col-6">
                    <button type="submit" className="btn btn-primary btn-block btn-submit " style={{ width: '300px', fontSize: '17px' }} onClick={registerHandle} >Kaydet</button>
                </div>
            </div>
        </>
    )
}

export default Step6