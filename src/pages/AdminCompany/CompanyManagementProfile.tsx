import React, { useEffect, useState } from 'react'
import SideBar from '../../components/molecules/CompanyAdmin/SideBar'
import Header from '../../components/molecules/CompanyAdmin/Header'
import { useDispatch } from 'react-redux';
import { IKDispatch, IKUseSelector } from '../../store';
import { fetchGetCompanyManagerProfileByToken, fetchUpdateCompanyManagerProfile } from '../../store/feature/userSlice';
import { ICompanyManagerUpdateRequest } from '../../models/ICompanyManagerUpdateRequest';
import { log } from 'console';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

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
    const [companyName, setCompanyName] = useState('');
    const [region, setRegion] = useState('');
    const [companyRegion, setCompanyRegion] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [companyDistrict, setCompanyDistrict] = useState('');
    const [companyNeighbourhood, setCompanyNeighbourhood] = useState('');
    const [companyStreet, setCompanyStreet] = useState('');
    const [companyAptNumber, setCompanyAptNumber] = useState('');
    const [companyPostalCode, setCompanyPostalCode] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');


   
    //şirket yöneticisinin tüm bilgilerinin getirildiği kısım
    const dispatch = useDispatch<IKDispatch>();
    useEffect(() => {
        dispatch(fetchGetCompanyManagerProfileByToken());
    }, [dispatch]);

    
    const managementProfile = IKUseSelector(state => state.user.companyManagementProfile);
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
            setCompanyName(managementProfile.companyName || '');
            setRegion(managementProfile.region || '');
            setCompanyRegion(managementProfile.companyRegion || '');
            setCompanyCity(managementProfile.companyCity || '');
            setCompanyDistrict(managementProfile.companyDistrict || '');
            setCompanyNeighbourhood(managementProfile.companyNeighbourhood || '');
            setCompanyStreet(managementProfile.companyStreet || '');
            setCompanyAptNumber(managementProfile.companyAptNumber || '');
            setCompanyPostalCode(managementProfile.companyPostalCode || '');
            setCompanyPhone(managementProfile.companyPhone || '');
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
            companyName: companyName,
            companyRegion: companyRegion,
            companyCity: companyCity,
            companyDistrict: companyDistrict,
            companyNeighbourhood: companyNeighbourhood,
            companyStreet: companyStreet,
            companyPostalCode: companyPostalCode,
            companyAptNumber: companyAptNumber,
            companyPhone: companyPhone
        }

        console.log(updateModel);

        dispatch(fetchUpdateCompanyManagerProfile(updateModel)).then(data => {
            if(data.payload.code === 200) {
                swal('Başarılı!', 'Bilgileriniz başarılı şekilde güncellendi', 'success').then(() => {
                    navigate('/company-management-profile');
                });
            }
            else{
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
                                    <input readOnly type="text" className="form-control" onChange={evt => setFirstName(evt.target.value)}  value={firstName}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label ms-3">Soyadınız:</label>
                                    <input readOnly type="text" className="form-control" onChange={evt => setLastName(evt.target.value) } value={lastName} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label ms-3">TC Kimlik Numaranız:</label>
                                    <input readOnly type="text" className="form-control" onChange={evt => setTcNo(evt.target.value)} value={tcNo}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label ms-3">Sgk Numaranız:</label>
                                    <input readOnly type="text" className="form-control" onChange={evt => setSgkNo(evt.target.value)} value={sgkNo} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Doğum Tarihiniz:</label>
                                    <input readOnly type="date" className="form-control" onChange={evt => setBirthDate(evt.target.value)} value={birthdate} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Telefon Numaranız:</label>
                                    <input readOnly={isReadOnly} type="tel" className="form-control" onChange={evt => setPhone(evt.target.value)} value={phone}/>
                                </div>


                                <div className="row mt-5">
                                    <h5 className='ms-3'>Şirket Bilgileriniz</h5>
                                    <hr />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Şirket Adı:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setCompanyName(evt.target.value)} value={companyName}/>
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Şirket Telefon Numarası:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setCompanyPhone(evt.target.value)} value={companyPhone}/>
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Ülke:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setRegion(evt.target.value)} value={region}/>
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
                                    <input readOnly={isReadOnly} type="text" className="form-control" onChange={evt => setCompanyNeighbourhood(evt.target.value)} value={companyNeighbourhood}/>
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