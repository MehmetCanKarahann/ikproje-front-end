import React, { useEffect, useState } from 'react'
import SideBar from '../../components/molecules/CompanyAdmin/SideBar'
import Header from '../../components/molecules/CompanyAdmin/Header'
import { useDispatch } from 'react-redux';
import { IKDispatch, IKUseSelector } from '../../store';
import { ICompanyManagerUpdateRequest } from '../../models/ICompanyManagerUpdateRequest';
import { log } from 'console';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { fetchGetCompanyManagerProfileByToken, fetchUpdateCompanyManagerProfile } from '../../store/feature/companyManagerSlice';
import { isAction } from '@reduxjs/toolkit';

function CompanyManagementProfile() {


    const [isReadOnly, setIsReadOnly] = useState(true);

    const [id, setId] = useState(0);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tcNo, setTcNo] = useState('');
    const [sgkNo, setSgkNo] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [departmentType, setDepartmentType] = useState('');

    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [neighbourhood, setNeighbourhood] = useState('');
    const [street, setStreet] = useState('');
    const [aptNumber, setAptNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const [companyName, setCompanyName] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyFoundationDate, setCompanyFoundationDate] = useState('');
    const [companyIndustry, setCompanyIndustry] = useState('');

    const [companyRegion, setCompanyRegion] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [companyDistrict, setCompanyDistrict] = useState('');
    const [companyNeighbourhood, setCompanyNeighbourhood] = useState('');
    const [companyStreet, setCompanyStreet] = useState('');
    const [companyAptNumber, setCompanyAptNumber] = useState('');
    const [companyPostalCode, setCompanyPostalCode] = useState('');


    //şirket yöneticisinin tüm bilgilerinin getirildiği kısım
    const dispatch = useDispatch<IKDispatch>();
    useEffect(() => {
        dispatch(fetchGetCompanyManagerProfileByToken());
    }, [dispatch]);


    const managementProfile = IKUseSelector(state => state.companyManagement.companyManagementProfile);
    const navigate = useNavigate();


    useEffect(() => {
        if (managementProfile) {
            setId(managementProfile.id || 0);
            setFirstName(managementProfile.firstName || '');
            setLastName(managementProfile.lastName || '');
            setEmail(managementProfile.email || '');
            setTcNo(managementProfile.tcNo || '');
            setSgkNo(managementProfile.sgkNo || '');
            setBirthDate(managementProfile.birthDate || '');
            setPhone(managementProfile.phone || '');
            setHireDate(managementProfile.hireDate || '');
            setDepartmentType(managementProfile.userDepartmentType || '');

            setRegion(managementProfile.region || '');
            setCity(managementProfile.city || '');
            setDistrict(managementProfile.district || '');
            setNeighbourhood(managementProfile.neighbourhood || '');
            setStreet(managementProfile.street || '');
            setPostalCode(managementProfile.postalCode || '');
            setAptNumber(managementProfile.aptNumber || '');

            setCompanyName(managementProfile.companyName || '');
            setCompanyPhone(managementProfile.companyPhone || '');
            setCompanyFoundationDate(managementProfile.companyFoundationDate || '');
            setCompanyIndustry(managementProfile.companyIndustry || '');

            setCompanyRegion(managementProfile.companyRegion || '');
            setCompanyCity(managementProfile.companyCity || '');
            setCompanyDistrict(managementProfile.companyDistrict || '');
            setCompanyNeighbourhood(managementProfile.companyNeighbourhood || '');
            setCompanyStreet(managementProfile.companyStreet || '');
            setCompanyAptNumber(managementProfile.companyAptNumber || '');
            setCompanyPostalCode(managementProfile.companyPostalCode || '');

        }
    }, [managementProfile]);

    const submit = () => {

        const token = localStorage.getItem('token') || '';

        const updateModel: ICompanyManagerUpdateRequest = {
            id: id,
            token: token,
            firstName: firstName,
            lastName: lastName,
            email: email,
            tcNo: tcNo,
            sgkNo: sgkNo,
            phone: phone,
            birthdate: birthdate,
            hireDate: hireDate,
            departmentType: departmentType,

            region: region,
            city: city,
            district: district,
            neighbourhood: neighbourhood,
            street: street,
            postalCode: postalCode,
            aptNumber: aptNumber,

            companyName: companyName,
            companyPhone: companyPhone,
            companyFoundationDate: companyFoundationDate,
            companyIndustry: companyIndustry,

            companyRegion: companyRegion,
            companyCity: companyCity,
            companyDistrict: companyDistrict,
            companyNeighbourhood: companyNeighbourhood,
            companyStreet: companyStreet,
            companyPostalCode: companyPostalCode,
            companyAptNumber: companyAptNumber,

        }


        dispatch(fetchUpdateCompanyManagerProfile(updateModel)).then(data => {
            if (data.payload.code === 200) {
                swal('Başarılı!', 'Bilgileriniz başarılı şekilde güncellendi', 'success').then(() => {
                    navigate('/company-management-profile');
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
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <h5 className='ms-3'>Kişisel Bilgileriniz</h5>
                                    </div>
                                    <div className="col-6 text-end mb-2">
                                        <button className='btn btn-warning' onClick={handleEditClick}>Güncelle</button>
                                        <button className='btn btn-success ms-2' onClick={submit} >Kaydet</button>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label ms-3">Adınız:</label>
                                    <input readOnly type="text" className="form-control" onChange={evt => setFirstName(evt.target.value)} value={firstName} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label ms-3">Soyadınız:</label>
                                    <input readOnly type="text" className="form-control" onChange={evt => setLastName(evt.target.value)} value={lastName} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Doğum Tarihiniz:</label>
                                    <input readOnly type="date" className="form-control" onChange={evt => setBirthDate(evt.target.value)} value={birthdate} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label ms-3">Email Adresiniz:</label>
                                    <input readOnly type="email" className="form-control" onChange={evt => setEmail(evt.target.value)} value={email} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label ms-3">TC Kimlik Numaranız:</label>
                                    <input readOnly type="text" className="form-control" onChange={evt => setTcNo(evt.target.value)} value={tcNo} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label ms-3">Sgk Numaranız:</label>
                                    <input readOnly type="text" className="form-control" onChange={evt => setSgkNo(evt.target.value)} value={sgkNo} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Telefon Numaranız:</label>
                                    <input readOnly={isReadOnly} type="tel" className="form-control" onChange={evt => setPhone(evt.target.value)} value={phone} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">İşe Alınma Tarihiniz:</label>
                                    <input readOnly type="date" className="form-control" onChange={evt => setHireDate(evt.target.value)} value={hireDate} />
                                </div>
                                <div className="col-6">
                                    <label className='form-label ms-3'>Departman Türü: </label>
                                    <select disabled={isReadOnly}  className="form-select mb-3 p-3" onChange={evt => setDepartmentType(evt.target.value)} value={departmentType} style={{borderRadius: '20px'}} aria-label="Default select example">
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

                                <div className="row mt-5">
                                    <h5 className='ms-3'>Adres Bilgileriniz</h5>
                                    <hr />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Ülke:</label>
                                    <input readOnly={isReadOnly} type="text" onChange={evt => setRegion(evt.target.value)} value={region} className="form-control" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">İl:</label>
                                    <input readOnly={isReadOnly} type="text" onChange={evt => setCity(evt.target.value)} value={city} className="form-control" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">İlçe:</label>
                                    <input readOnly={isReadOnly} type="text" onChange={evt => setDistrict(evt.target.value)} value={district} className="form-control" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Mahalle:</label>
                                    <input readOnly={isReadOnly} type="text" onChange={evt => setNeighbourhood(evt.target.value)} value={neighbourhood} className="form-control" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Cadde/Sokak:</label>
                                    <input readOnly={isReadOnly} type="text" onChange={evt => setStreet(evt.target.value)} value={street} className="form-control" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Kapı No:</label>
                                    <input readOnly={isReadOnly} type="text" onChange={evt => setAptNumber(evt.target.value)} value={aptNumber} className="form-control" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Posta Kodu:</label>
                                    <input readOnly={isReadOnly} type="text" onChange={evt => setPostalCode(evt.target.value)} value={postalCode} className="form-control" />
                                </div>

                                <div className="row mt-5">
                                    <h5 className='ms-3'>Şirket Bilgileriniz</h5>
                                    <hr />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Şirket Adı:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setCompanyName(evt.target.value)} value={companyName} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Şirket Telefon Numarası:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setCompanyPhone(evt.target.value)} value={companyPhone} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Şirket Kuruluş Tarihiniz:</label>
                                    <input readOnly type="date" className="form-control" onChange={evt => setCompanyFoundationDate(evt.target.value)} value={companyFoundationDate} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Sektör:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setCompanyIndustry(evt.target.value)} value={companyIndustry} />
                                </div>

                                <div className="row mt-5">
                                    <h5 className='ms-3'>Şirket Adres Bilgileriniz</h5>
                                    <hr />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Ülke:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setCompanyRegion(evt.target.value)} value={companyRegion} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">İl:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setCompanyCity(evt.target.value)} value={companyCity} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">İlçe:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setCompanyDistrict(evt.target.value)} value={companyDistrict} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Mahalle:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setCompanyNeighbourhood(evt.target.value)} value={companyNeighbourhood} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Cadde/Sokak:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setCompanyStreet(evt.target.value)} value={companyStreet} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Kapı No:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setCompanyAptNumber(evt.target.value)} value={companyAptNumber} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Posta Kodu:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setCompanyPostalCode(evt.target.value)} value={companyPostalCode} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanyManagementProfile