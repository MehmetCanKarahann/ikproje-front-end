import React from 'react'

interface IStepFourProps{
    companyName: string
    companyPhone: string
    companyIndustry: string
    foundationDate: string
    setCompanyName: (value: string) => void;
    setFoundationDate: (value: string) => void;
    setCompanyPhone: (value: string) => void;
    setCompanyIndustry: (value: string) => void;
    handlePrevious: () => void;
    handleNext: () => void;
}

function Step4(props: IStepFourProps) {

    const {companyName,companyPhone,companyIndustry,setCompanyName, setFoundationDate, setCompanyPhone, setCompanyIndustry, handlePrevious, handleNext, foundationDate} = props;

    return (
        <>
            <div className="logo-box"><a href="#" className="logo-text">Şirket Bilgileriniz</a></div>
            <div className="form-group">
                <input type="text" className="form-control" value={companyName} onChange={evt => { setCompanyName(evt.target.value) }} placeholder="Şirket Adı" style={{ fontSize: '18px' }} />
            </div>

            <div className="form-group">
                <label
                    className="form-label"
                    style={{
                        fontSize: '16px',
                        marginLeft: '15px',
                        color: 'gray',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                    Şirket Kuruluş Tarihi
                </label>
                <input type="date" className="form-control" value={foundationDate} onChange={evt => (setFoundationDate(evt.target.value))} placeholder="Şirket Kuruluş Tarihi" style={{ fontSize: '18px' }} />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" value={companyPhone} onChange={evt => { setCompanyPhone(evt.target.value) }} placeholder="Şirket Telefon Numarası" style={{ fontSize: '18px' }} />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" value={companyIndustry} onChange={evt => { setCompanyIndustry(evt.target.value) }} placeholder="Sektör Giriniz" style={{ fontSize: '18px' }} />
            </div>

            <div className="row">
                <div className="col-6 text-center">
                    <button className="btn btn-secondary btn-block btn-submit" style={{ fontSize: '17px' }} onClick={handlePrevious}> Geri </button>
                </div>
                <div className="col-6">
                    <button type="submit" className="btn btn-primary btn-block btn-submit " style={{ width: '300px', fontSize: '17px' }} onClick={handleNext}>İleri</button>

                </div>
            </div>
        </>
    )
}

export default Step4