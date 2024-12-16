import React from 'react'

interface IStepSixProps {
    companyEmail: string
    companyPassword: string
    companyRePassword: string
    setCompanyEmail: (value: string) => void;
    setCompanyPassword: (value: string) => void;
    setCompanyRePassword: (value: string) => void;
    handlePrevious: () => void;
    registerHandle: () => void;
}

function Step6(props: IStepSixProps) {

    const {companyEmail,companyPassword,companyRePassword,setCompanyEmail, setCompanyPassword, setCompanyRePassword, handlePrevious, registerHandle} = props;

    return (
        <>
            <div className="logo-box"><a href="#" className="logo-text">Üyelik Bilgileriniz</a></div>
            <div className="form-group">
                <input type="email" className="form-control" value={companyEmail} onChange={evt => { setCompanyEmail(evt.target.value) }} placeholder="Şirket Email Adresi" style={{ fontSize: '18px' }} />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" value={companyPassword} onChange={evt => { setCompanyPassword(evt.target.value) }} placeholder="Şifreniz" style={{ fontSize: '18px' }} />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" value={companyRePassword} onChange={evt => { setCompanyRePassword(evt.target.value) }} placeholder="Şifre Yeniden" style={{ fontSize: '18px' }} />
            </div>
            <select className="form-select mb-3 p-3"  style={{ height: '60px', borderRadius: '30px', fontSize: '17px', color: 'gray', fontWeight: 'bold' }} aria-label="Default select example">
                <option selected>Ne Kadar Süre Üye Olmak İstiyorsunuz?</option>
                <option value="3">3 Ay</option>
                <option value="6">6 Ay</option>
                <option value="1">1 Yıl</option>
            </select>
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