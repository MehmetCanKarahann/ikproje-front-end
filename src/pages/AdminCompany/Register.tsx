import React, { useEffect, useRef, useState } from 'react'
import { IRegisterRequest } from '../../models/IRegisterRequest';
import { useDispatch } from 'react-redux';
import { IKDispatch } from '../../store';
import { fecthRegister } from '../../store/feature/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './Register.css'
import Step1 from '../../components/molecules/RegisterCardSteps/Step1';
import Step2 from '../../components/molecules/RegisterCardSteps/Step2';
import Step3 from '../../components/molecules/RegisterCardSteps/Step3';
import Step4 from '../../components/molecules/RegisterCardSteps/Step4';
import Step5 from '../../components/molecules/RegisterCardSteps/Step5';
import Step6 from '../../components/molecules/RegisterCardSteps/Step6';

function Register() {


    const dispatch = useDispatch<IKDispatch>();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [phone, setPhone] = useState('');
    const [tcNo, setTcNo] = useState('');
    const [sgkNo, setSgkNo] = useState('');
    const [salary, setSalary] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [gender, setGender] = useState('');
    const [departmentType, setDepartmentType] = useState('HR');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [aptNumber, setAptNumber] = useState('');
    const [companyRegion, setCompanyRegion] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [companyDistrict, setCompanyDistrict] = useState('');
    const [companyNeighborhood, setCompanyNeighborhood] = useState('');
    const [companyStreet, setCompanyStreet] = useState('');
    const [companyPostalCode, setCompanyPostalCode] = useState('');
    const [companyAptNumber, setCompanyAptNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [email, setEmail] = useState('');
    const [foundationDate, setFoundationDate] = useState('');
    const [companyIndustry, setCompanyIndustry] = useState('');
    const [membershipType, setMembershipType] = useState('');

    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [animationClass, setAnimationClass] = useState('');

    const handleNext = () => {
        setAnimationClass('slide-out');
        setTimeout(() => {
            setStep((prev) => prev + 1);
            setAnimationClass('slide-in');
        }, 500); 
    };

    const handlePrevious = () => {
        setAnimationClass('slide-out');
        setTimeout(() => {
            setStep((prev) => prev - 1);
            setAnimationClass('slide-in');
        }, 500);
    };

    //Kard ileri geri geçişlerinde animasyonu ayarlar.
    useEffect(() => {
        const timer = setTimeout(() => setAnimationClass('active'), 50);
        return () => clearTimeout(timer);
    }, [step]);

    //Kaydetme işlemi
    const registerHandle = () => {

        //sunucudan istenen parametreleri burada doldurdum ve fetch işlemi ile sunucuya gönderdim.
        const register: IRegisterRequest = {
            firstName: firstName,
            lastName: lastName,
            password: password,
            rePassword: rePassword,
            phone: phone,
            hireDate: hireDate,
            gender: gender,
            tcNo: tcNo,
            sgkNo: sgkNo,
            salary: parseFloat(salary),
            departmmentType: departmentType,
            birthDate: birthDate,
            region: region,
            city: city,
            district: district,
            neighborhood: neighborhood,
            street: street,
            postalCode: postalCode,
            aptNumber: aptNumber,
            companyRegion: companyRegion,
            companyCity: companyCity,
            companyDistrict: companyDistrict,
            companyNeighborhood: companyNeighborhood,
            companyStreet: companyStreet,
            companyPostalCode: companyPostalCode,
            companyAptNumber: companyAptNumber,
            companyName: companyName,
            companyPhone: companyPhone,
            email: email,
            foundationDate: foundationDate,
            companyIndustry: companyIndustry,
            membershipType: membershipType
        }

        dispatch(fecthRegister(register)).then(data => {
            if (data.payload.code === 200)
                swal({
                    title: '🎉 Kayıt İşlemi Başarılı!',
                    text: '\nÜyeliğinizi aktif hale getirmek için lütfen şirket e-posta adresinize gönderilen aktivasyon linkine tıklayın.',
                    icon: 'success',
                    buttons: {
                        confirm: {
                            text: 'Tamam',
                            className: 'swal-button',
                        },
                    },
                    content: {
                        element: 'p',
                        attributes: {
                            style: 'text-align: center; font-size: 17px; line-height: 1.8; color: #555;',
                        },
                    },
                }).then(() => {
                    navigate('/login'); 
                });
            else {
                swal('Hata', data.payload.message, 'error');
            }
        });

        

    }

    //Bugünün tarihini atar.
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        setBirthDate(formattedDate);
        setFoundationDate(formattedDate);
        setHireDate(formattedDate);
    }, []);

    return (
        <div className="auth-page sign-in">
            <div className='loader'>
                <div className='spinner-grow text-primary' role='status'>
                    <span className='sr-only'>Loading...</span>
                </div>
            </div>
            <div className="connect-container align-content-stretch d-flex flex-wrap">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="auth-form">
                                <div className="row">

                                    <div className="row">
                                        <div className="col-6">

                                            <div className={`card ${animationClass}`} style={{ width: '720px' }}>
                                                <div className="card-body">
                                                    {step === 1 && (
                                                        <>
                                                            <Step1
                                                            firstName={firstName}
                                                            lastName={lastName}
                                                            phone={phone}
                                                            gender={gender}
                                                                setFirstName={setFirstName}
                                                                setLastName={setLastName}
                                                                birthDate={birthDate}
                                                                setBirthDate={setBirthDate}
                                                                setPhone={setPhone}
                                                                setGender={setGender}
                                                                handleNext={handleNext} />
                                                        </>
                                                    )}
                                                    {step === 2 && (
                                                        <>
                                                            <Step2 
                                                            tcNo={tcNo}
                                                            sgkNo={sgkNo}
                                                            departmentType={departmentType}
                                                            salary={salary}
                                                            setTcNo={setTcNo} 
                                                            setSgkNo={setSgkNo} 
                                                            setDepartmentType={setDepartmentType} 
                                                            setSalary={setSalary} 
                                                            handlePrevious={handlePrevious} 
                                                            handleNext={handleNext} />
                                                        </>
                                                    )}
                                                    {step === 3 && (
                                                        <>
                                                            <Step3 
                                                            region={region}
                                                            city={city}
                                                            district={district}
                                                            neighborhood={neighborhood}
                                                            street={street}
                                                            aptNumber={aptNumber}
                                                            postalCode={postalCode}
                                                            setRegion={setRegion} 
                                                            setCity={setCity} 
                                                            setDistrict={setDistrict} 
                                                            setNeighborhood={setNeighborhood} 
                                                            setStreet={setStreet} 
                                                            setAptNumber={setAptNumber} 
                                                            setPostalCode={setPostalCode} 
                                                            handlePrevious={handlePrevious} 
                                                            handleNext={handleNext} />
                                                        </>
                                                    )}
                                                    {step === 4 && (
                                                        <>
                                                            <Step4 
                                                            companyName={companyName}
                                                            companyPhone={companyPhone}
                                                            companyIndustry={companyIndustry}
                                                            setCompanyName={setCompanyName} 
                                                            setCompanyPhone={setCompanyPhone} 
                                                            setCompanyIndustry={setCompanyIndustry} 
                                                            setFoundationDate={setFoundationDate} 
                                                            foundationDate={foundationDate} 
                                                            handlePrevious={handlePrevious} 
                                                            handleNext={handleNext} />
                                                        </>
                                                    )}
                                                    {step === 5 && (
                                                        <>
                                                            <Step5 
                                                            CompanyRegion={companyRegion}
                                                            CompanyCity={companyCity}
                                                            CompanyDistrict={companyDistrict}
                                                            CompanyNeighborhood={companyNeighborhood}
                                                            CompanyStreet={companyStreet}
                                                            CompanyAptNumber={companyAptNumber}
                                                            CompanyPostalCode={companyPostalCode}
                                                            setCompanyRegion={setCompanyRegion} 
                                                            setCompanyCity={setCompanyCity} 
                                                            setCompanyDistrict={setCompanyDistrict} 
                                                            setCompanyNeighborhood={setCompanyNeighborhood} 
                                                            setCompanyStreet={setCompanyStreet} 
                                                            setCompanyAptNumber={setCompanyAptNumber} 
                                                            setCompanyPostalCode={setCompanyPostalCode} 
                                                            handlePrevious={handlePrevious} 
                                                            handleNext={handleNext} />
                                                        </>
                                                    )}
                                                    {step === 6 && (
                                                        <>
                                                            <Step6 
                                                            email={email}
                                                            password={password}
                                                            rePassword={rePassword}
                                                            membershipType = {membershipType}
                                                            setEmail={setEmail} 
                                                            setPassword={setPassword} 
                                                            setRePassword={setRePassword} 
                                                            setMembershipType={setMembershipType}
                                                            handlePrevious={handlePrevious} 
                                                            registerHandle={registerHandle} />
                                                        </>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-none d-lg-block d-xl-block">
                            <div className="auth-image"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register