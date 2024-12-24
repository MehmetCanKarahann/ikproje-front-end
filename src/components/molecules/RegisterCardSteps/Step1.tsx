import React, { useEffect } from 'react'

interface IStepOneProps{
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    phone: string;
    setPhone: (value: string) => void;
    birthDate: string;
    setBirthDate: (value: string) => void;
    gender: string;
    setGender: (value: string) => void;
    handleNext: () => void;
}

function Step1(props: IStepOneProps) {

    const {firstName,lastName,phone,gender,setFirstName, setLastName, setPhone, setBirthDate, setGender,handleNext, birthDate} = props;

    return (
        <>
            <div className="logo-box"><a href="#" className="logo-text">Hesabınızı Oluşturmaya Başlayın</a></div>
            <div className="mb-3">
                <input type="text" className="form-control" value={firstName} onChange={evt => { setFirstName(evt.target.value) }} placeholder="Adınız" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" value={lastName} onChange={evt => { setLastName(evt.target.value) }} placeholder="Soyadınız" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <select className='form-select mb-3 p-3' value={gender} onChange={evt => { setGender(evt.target.value)  }} style={{borderRadius: '30px', fontSize: '17px', color: 'gray', fontWeight: 'bold'}}>
                    <option selected>Cinsiyetinizi Seçiniz</option>
                    <option value='FEMALE'>Kadın</option>
                    <option value='MALE'>Erkek</option>
                </select>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" value={phone} onChange={evt => { setPhone(evt.target.value) }} placeholder="Telefon Numaranız" style={{ fontSize: '18px' }} />
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
                    Doğum Tarihi
                </label>
                <input type="date" className="form-control" onChange={evt => { setBirthDate(evt.target.value) }} value={birthDate} placeholder="Doğum Tarihiniz" style={{ fontSize: '18px' }} />
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-submit " style={{ width: '300px', fontSize: '17px', marginLeft: '200px' }} onClick={handleNext}>İleri</button>

        </>
    )
}

export default Step1