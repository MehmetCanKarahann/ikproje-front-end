import React from 'react'

interface IStepThreeProps {
    region: string,
    city: string,
    district: string,
    neighborhood: string,
    street: string,
    aptNumber: string,
    postalCode: string
    setRegion: (value: string) => void;
    setCity: (value: string) => void;
    setDistrict: (value: string) => void;
    setNeighborhood: (value: string) => void;
    setStreet: (value: string) => void;
    setAptNumber: (value: string) => void;
    setPostalCode: (value: string) => void;
    handlePrevious: () => void;
    handleNext: () => void;
}

function Step3(props: IStepThreeProps) {

    const {region,city,district,neighborhood,street,aptNumber,postalCode,setRegion, setCity, setDistrict, setNeighborhood, setStreet, setAptNumber, setPostalCode, handlePrevious, handleNext} = props;

    return (
        <>
            <div className="logo-box"><a href="#" className="logo-text">Adres Bilgileriniz</a></div>
            <div className="mb-3">
                <input type="text" className="form-control" value={region} onChange={evt => (setRegion(evt.target.value))} placeholder="Ülke" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" value={city} onChange={evt => (setCity(evt.target.value))} placeholder="İl" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" value={district} onChange={evt => (setDistrict(evt.target.value))} placeholder="İlçe" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" value={neighborhood} onChange={evt => (setNeighborhood(evt.target.value))} placeholder="Mahalle" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" value={street} onChange={evt => (setStreet(evt.target.value))} placeholder="Cadde/Sokak" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" value={aptNumber} onChange={evt => (setAptNumber(evt.target.value))} placeholder="Apartman No" style={{ fontSize: '18px' }} />
            </div>

            <div className="mb-3">
                <input type="text" className="form-control" value={postalCode} onChange={evt => (setPostalCode(evt.target.value))} placeholder="Posta Kodu" style={{ fontSize: '18px' }} />
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

export default Step3