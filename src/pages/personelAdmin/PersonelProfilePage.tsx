import React, { useEffect, useState } from 'react'
import SideBar from '../../components/molecules/PersonelAdmin/SideBar'
import Header from '../../components/molecules/PersonelAdmin/Header'
import { useDispatch } from 'react-redux';
import { IKDispatch, IKUseSelector } from '../../store';
import { IUpdatePersonelProfileRequest } from '../../models/IUpdatePersonelProfileRequest';
import { fetchUpdatePersonelProfile } from '../../store/feature/employeeSlice';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function PersonelProfilePage() {

    const dispatch = useDispatch<IKDispatch>();
    const [isReadOnly, setIsReadOnly] = useState(true);

    const [id, setId] = useState(0);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tcNo, setTcNo] = useState('');
    const [sgkNo, setSgkNo] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [departmentType, setDepartmentType] = useState('');

    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [neighbourhood, setNeighbourhood] = useState('');
    const [street, setStreet] = useState('');
    const [aptNumber, setAptNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const personelProfile = IKUseSelector(state => state.employeeSlice.personelProfile);

    
    
    
    const navigate = useNavigate();

    useEffect(() => {

        if(personelProfile){
            setId(personelProfile.id || 0);
            setFirstName(personelProfile.firstName || '');
            setLastName(personelProfile.lastName || '');
            setEmail(personelProfile.email || '');
            setTcNo(personelProfile.tcNo || '');
            setSgkNo(personelProfile.sgkNo || '');
            setBirthDate(personelProfile.birthDate || '');
            setHireDate(personelProfile.hireDate || '');
            setPhone(personelProfile.phone || '');
            setAvatarUrl(personelProfile.avatarUrl || '');
            setDepartmentType(personelProfile.departmentType || '');

            setRegion(personelProfile.region || '');
            setCity(personelProfile.city || '');
            setDistrict(personelProfile.district || '');
            setNeighbourhood(personelProfile.neighbourhood || '');
            setStreet(personelProfile.street || '');
            setPostalCode(personelProfile.postalCode || '');
            setAptNumber(personelProfile.aptNumber || '');
        }
    }, [personelProfile]);

    const submit = () => {

        const token = localStorage.getItem('token') || '';

        const personel: IUpdatePersonelProfileRequest = {
            token: token,
            id: id,
            firstName: firstName,
            lastName: lastName,
            tcNo: tcNo,
            sgkNo: sgkNo,
            phone: phone,
            birthDate: birthdate,
            hireDate: hireDate,
            avatarUrl: avatarUrl,
            email: email,
            departmentType: departmentType,
            region: region,
            city: city,
            district: district,
            neighbourhood: neighbourhood,
            street: street,
            aptNumber: aptNumber,
            postalCode: postalCode
        }

        dispatch(fetchUpdatePersonelProfile(personel)).then(data => {
            if (data.payload.code === 200) {
                swal('Başarılı!', 'Bilgileriniz başarılı şekilde güncellendi', 'success').then(() => {
                    navigate('/personeladmin');
                });
            }
            else {
                swal('Hata!', data.payload.message, 'error');
            }
        });
    }

    const handleEditClick = () => {
        setIsReadOnly(false);
    };


    return (
        <>
            <div className='loader'>
                <div className='spinner-grow text-primary' role='status'>
                    <span className='sr-only'>Loading...</span>
                </div>
            </div>
            <div className="connect-container align-content-stretch d-flex flex-wrap">
                <div className="page-sidebar">
                    <SideBar />
                </div>
                <div className="page-container">
                    <div className="page-header" >
                        <Header />
                    </div>
                    <div className="page-content">
                        <div className="container-fluid bg-white p-4" >
                            <div className="row g-4">
                                <div className="row mt-4">
                                    <div className="col-6">
                                        <h5 className='ms-3'>Kişisel Bilgileriniz</h5>
                                    </div>
                                    <div className="col-6 text-end mb-2">
                                        <button className='btn btn-warning' onClick={handleEditClick} >Güncelle</button>
                                        <button className='btn btn-success ms-2' onClick={submit} >Kaydet</button>
                                    </div>
                                    <hr />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label ms-3">Adınız:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => { setFirstName(evt.target.value) }} value={firstName} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label ms-3">Soyadınız:</label>
                                    <input readOnly type="text" className="form-control" onChange={evt => { setLastName(evt.target.value) }} value={lastName} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Doğum Tarihiniz:</label>
                                    <input readOnly={isReadOnly} type="date" className="form-control" onChange={evt => { setBirthDate(evt.target.value) }} value={birthdate} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Telefon Numaranız:</label>
                                    <input readOnly={isReadOnly} type="tel" className="form-control" onChange={evt => { setPhone(evt.target.value) }} value={phone}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label ms-3">TC Kimlik Numaranız:</label>
                                    <input readOnly type="text" className="form-control" onChange={evt => setTcNo(evt.target.value)} value={tcNo} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label ms-3">Sgk Numaranız:</label>
                                    <input readOnly type="text" className="form-control" onChange={evt => { setSgkNo(evt.target.value) }} value={sgkNo} />
                                </div>
                                <div className="col-6">
                                    <label className='form-label ms-3'>Departman Türü: </label>
                                    <select disabled className="form-select mb-3 p-3" onChange={evt => { setDepartmentType(evt.target.value) }} value={departmentType} style={{ borderRadius: '20px' }} aria-label="Default select example">
                                        <option value="" disabled>Çalıştığınız Departmanı Seçiniz</option>
                                        <option value="HR">HR</option>
                                        <option value="FINANCE">FINANCE</option>
                                        <option value="IT">IT</option>
                                        <option value="SALES">SALES</option>
                                        <option value="MARKETING">MARKETING</option>
                                        <option value="ENGINEERING">ENGINEERING</option>
                                        <option value="RESEARCH">RESEARCH</option>
                                        <option value="CUSTOMER_SERVICE">CUSTOMER_SERVICE</option>
                                        <option value="LEGAL">LEGAL</option>
                                        <option value="OPERATIONS">OPERATIONS</option>
                                        <option value="PROCUREMENT">PROCUREMENT</option>
                                        <option value="LOGISTICS">LOGISTICS</option>
                                        <option value="DESIGN">DESIGN</option>
                                        <option value="ADMINISTRATION">ADMINISTRATION</option>
                                        <option value="SECURITY">SECURITY</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">İşe Giriş Tarihiniz:</label>
                                    <input readOnly type="date" className="form-control" onChange={evt => { setHireDate(evt.target.value) }} value={hireDate} />
                                </div>
                                <div className="row mt-5">
                                    <h5 className='ms-3'>Adres Bilgileriniz</h5>
                                    <hr />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Ülke:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => { setRegion(evt.target.value) }} value={region} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-4">İl:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => { setCity(evt.target.value) }} value={city} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">İlçe:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => { setDistrict(evt.target.value) }} value={district} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Mahalle:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => { setNeighbourhood(evt.target.value) }} value={neighbourhood} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Cadde/Sokak:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => { setStreet(evt.target.value) }} value={street} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Kapı No:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => { setAptNumber(evt.target.value) }} value={aptNumber} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Posta Kodu:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => { setPostalCode(evt.target.value) }} value={postalCode} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonelProfilePage