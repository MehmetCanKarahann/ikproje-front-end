import React from 'react'

interface IStepFiveProps{
    CompanyRegion: string
    CompanyCity: string
    CompanyDistrict: string
    CompanyNeighborhood: string
    CompanyStreet: string
    CompanyAptNumber: string
    CompanyPostalCode: string
    setCompanyRegion: (value: string) => void;
    setCompanyCity: (value: string) => void;
    setCompanyDistrict: (value: string) => void;
    setCompanyNeighborhood: (value: string) => void;
    setCompanyStreet: (value: string) => void;
    setCompanyAptNumber: (value: string) => void;
    setCompanyPostalCode: (value: string) => void;
    handlePrevious: () => void;
    handleNext: () => void;
}

function Step5(props: IStepFiveProps) {

    const {CompanyRegion,CompanyCity,CompanyDistrict,CompanyNeighborhood,CompanyStreet,CompanyPostalCode,CompanyAptNumber,setCompanyRegion, setCompanyCity, setCompanyDistrict, setCompanyNeighborhood, setCompanyStreet, setCompanyAptNumber, setCompanyPostalCode, handleNext, handlePrevious} = props;

    return (
        <>
            <div className="logo-box"><a href="#" className="logo-text">Şirket Adres Bilgileriniz</a></div>
            <div className="mb-3">
                <input type="text" className="form-control" value={CompanyRegion} onChange={evt => { setCompanyRegion(evt.target.value) }} placeholder="Ülke" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" value={CompanyCity} onChange={evt => { setCompanyCity(evt.target.value) }} placeholder="İl" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" value={CompanyDistrict} onChange={evt => { setCompanyDistrict(evt.target.value) }} placeholder="İlçe" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" value={CompanyNeighborhood} onChange={evt => { setCompanyNeighborhood(evt.target.value) }} placeholder="Mahalle" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" value={CompanyStreet} onChange={evt => { setCompanyStreet(evt.target.value) }} placeholder="Cadde/Sokak" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" value={CompanyAptNumber} onChange={evt => { setCompanyAptNumber(evt.target.value) }} placeholder="Kapı No" style={{ fontSize: '18px' }} />
            </div>

            <div className="mb-3">
                <input type="text" className="form-control" value={CompanyPostalCode} onChange={evt => { setCompanyPostalCode(evt.target.value) }} placeholder="Posta Kodu" style={{ fontSize: '18px' }} />
            </div>
            <div className="row">
                <div className="col-6 text-center">
                    <button className="btn btn-secondary btn-block btn-submit" style={{ fontSize: '17px' }} onClick={handlePrevious}>Geri</button>

                </div>
                <div className="col-6">
                    <button type="submit" className="btn btn-primary btn-block btn-submit " style={{ width: '300px', fontSize: '17px' }} onClick={handleNext}>İleri</button>

                </div>
            </div>
        </>
    )
}

export default Step5