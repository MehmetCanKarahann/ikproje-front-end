import React, { useEffect, useState } from 'react'
import SideBar from '../../components/molecules/CompanyAdmin/SideBar'
import Header from '../../components/molecules/CompanyAdmin/Header'
import { useDispatch } from 'react-redux';
import { IKDispatch, IKUseSelector } from '../../store';
import { fetchGetCompanyManagerProfileByToken } from '../../store/feature/userSlice';

function CompanyManagementProfile() {

   
    const [isReadOnly, setIsReadOnly] = useState(true);


    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tcNo, setTcNo] = useState('');
    const [sgkNo, setSgkNo] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [telNo, setTelNo] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyRegion, setCompanyRegion] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [companyDistrict, setCompanyDistrict] = useState('');
    const [companyNeighbourhood, setCompanyNeighbourhood] = useState('');
    const [companyStreet, setCompanyStreet] = useState('');
    const [companyAptNumber, setCompanyAptNumber] = useState('');
    const [companyPostalCode, setCompanyPostalCode] = useState('');

    const submit = () => {
        
    }

    //şirket yöneticisinin tüm bilgilerinin getirildiği kısım
    const dispatch = useDispatch<IKDispatch>();
    useEffect(() => {
        dispatch(fetchGetCompanyManagerProfileByToken());
    }, [dispatch]);

    
    const managementProfile = IKUseSelector(state => state.user.companyManagementProfile);

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
                                        <h5 className='ms-3 mt-2'>Üyelik Bilgileriniz</h5>
                                    </div>
                                    <div className="col-6 text-end mb-2">
                                        <button className='btn btn-warning' onClick={handleEditClick}>Güncelle</button>
                                        <button className='btn btn-success ms-2'>Kaydet</button>
                                    </div>
                                    <hr />
                                </div>
                                
                               
                                <div className="col-6">
                                    <label className="form-label ms-3">Email Adresiniz:</label>
                                    <input readOnly={isReadOnly} type="email" className="form-control" placeholder={managementProfile?.email}/>
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Şifreniz:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control"  />
                                </div>
                                <div className="row mt-5">
                                    <h5 className='ms-3'>Kişisel Bilgileriniz</h5>
                                    <hr />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label ms-3">Adınız:</label>
                                    <input readOnly type="text" className="form-control"  placeholder={managementProfile?.firstName}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label ms-3">Soyadınız:</label>
                                    <input readOnly type="text" className="form-control"  placeholder={managementProfile?.lastName} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label ms-3">TC Kimlik Numaranız:</label>
                                    <input readOnly type="text" className="form-control" placeholder={managementProfile?.tcNo}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label ms-3">Sgk Numaranız:</label>
                                    <input readOnly type="text" className="form-control" placeholder={managementProfile?.sgkNo} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Doğum Tarihiniz:</label>
                                    <input readOnly type="date" className="form-control" value={managementProfile?.birthDate} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Telefon Numaranız:</label>
                                    <input readOnly={isReadOnly} type="tel" className="form-control" placeholder={managementProfile?.phone}/>
                                </div>


                                <div className="row mt-5">
                                    <h5 className='ms-3'>Şirket Bilgileriniz</h5>
                                    <hr />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Şirket Adı:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" placeholder={managementProfile?.companyName}/>
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Ülke:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" placeholder={managementProfile?.companyRegion}/>
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">İl:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" placeholder={managementProfile?.companyCity} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">İlçe:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" placeholder={managementProfile?.companyDistrict} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Mahalle:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" placeholder={managementProfile?.companyNeighbourhood}/>
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Cadde/Sokak:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" placeholder={managementProfile?.companyStreet} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Kapı No:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" placeholder={managementProfile?.companyAptNumber} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label ms-3">Posta Kodu:</label>
                                    <input readOnly={isReadOnly} type="text" className="form-control" placeholder={managementProfile?.companyPostalCode} />
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