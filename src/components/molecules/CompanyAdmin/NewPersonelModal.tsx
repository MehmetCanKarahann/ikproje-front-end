import React, { useEffect, useState } from 'react'
import { INewPersonelRequest } from '../../../models/INewPersonelRequest';
import { useDispatch } from 'react-redux';
import { IKDispatch } from '../../../store';
import { fetchAddNewPersonel, fetchGetPersonelList } from '../../../store/feature/companyManagerSlice';
import swal from 'sweetalert';

function NewPersonelModal() {

    const dispatch = useDispatch<IKDispatch>();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tcNo, setTcNo] = useState('');
    const [sgkNo, setSgkNo] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [departmentType, setDepartmentType] = useState('HR');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const submit = () => {

        const token = localStorage.getItem('token') || '';

        const newPersonel: INewPersonelRequest = {
            token: token,
            firstName: firstName,
            lastName: lastName,
            tcNo: tcNo,
            sgkNo: sgkNo,
            phone: phone,
            birthDate: birthDate,
            hireDate: hireDate,
            departmentType: departmentType,
            email: email,
            password: password,
            rePassword: rePassword
        }
        console.log(newPersonel);
        
        if(email !== '' || password !== '' || rePassword !== ''){
            dispatch(fetchAddNewPersonel(newPersonel)).then(data => {
                if(data.payload.code === 200) {
                    swal('Başarı!', 'Personel Ekleme İşlemi Başarılı', 'success').then(() => {
                        
                        dispatch(fetchGetPersonelList());
                        setFirstName('');
                        setLastName('');
                        setTcNo('');
                        setSgkNo('');
                        setPhone('');
                        setBirthDate('');
                        setHireDate('');
                        setDepartmentType('HR');
                        setEmail('');
                        setPassword('');
                        setRePassword('');
                    });
                }
            });
        
        }
     

    }

     useEffect(() => {
            const today = new Date();
            const formattedDate = today.toISOString().split("T")[0];
            setBirthDate(formattedDate);
            setHireDate(formattedDate);
        }, []);

    return (
        <>
            <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#newPersonelModal">
                Yeni Personel Ekle
            </button>
            <div className="modal fade bd-example-modal-xl" id="newPersonelModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Yeni Personel Ekle</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <hr style={{ border: '1px black solid' }} />
                        <div className="modal-body">
                            <div className="row mt-4 mb-5">
                                <div className="col-6 mb-3 text-start">
                                    <label className='ms-4'  >Ad:</label>
                                    <input type="text" className="form-control" onChange={evt => { setFirstName(evt.target.value) }} value={firstName}/>
                                </div>
                                <div className="col-6 mb-3 text-start">
                                    <label className='ms-4'>Soyad:</label>
                                    <input type="text" className="form-control" onChange={evt => { setLastName(evt.target.value) }} value={lastName} />
                                </div>
                                <div className="col-6 mb-3 text-start">
                                    <label className='ms-4'>TC Kimlik Numarası:</label>
                                    <input type="text" className="form-control" onChange={evt => { setTcNo(evt.target.value) }} value={tcNo}/>
                                </div>
                                <div className="col-6 mb-3 text-start">
                                    <label className='ms-4'>Sgk Numarası:</label>
                                    <input type="text" className="form-control" onChange={evt => { setSgkNo(evt.target.value) }} value={sgkNo} />
                                </div>
                                <div className="col-6 mb-3 text-start">
                                    <label className='ms-4'>Telefon Numarası:</label>
                                    <input type="text" className="form-control" onChange={evt => { setPhone(evt.target.value) }} value={phone} />
                                </div>
                                <div className="col-6 mb-4 text-start">
                                    <label className='ms-4'>Doğum Tarihi:</label>
                                    <input type="date" className="form-control" style={{ height: '50px' }} onChange={evt => { setBirthDate(evt.target.value) }} value={birthDate}/>
                                </div>
                                <div className="col-6 mb-4 text-start">
                                    <label className='ms-4'>İşe Giriş Tarihi:</label>
                                    <input type="date" className="form-control" style={{ height: '50px' }} onChange={evt => { setHireDate(evt.target.value) }} value={hireDate} />
                                </div>
                                <div className="col-6 mb-3 text-start">
                                    <label className='ms-4'>Departman:</label>
                                    <select className="form-select mb-3 p-3" style={{ borderRadius: '30px', color: 'gray' }} aria-label="Default select example" onChange={evt => { setDepartmentType(evt.target.value) }} value={departmentType} >
                                        <option selected>Çalıştığınız Departmanı Seçiniz</option>
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
                                <div className="col-6 mb-3 text-start">
                                    <label className='ms-4'>Email Adresi:</label>
                                    <input type="text" className="form-control" onChange={evt => { setEmail(evt.target.value) }} value={email}/>
                                </div>
                                <div className="col-6 mb-3 text-start">
                                    <label className='ms-4'>Şifre:</label>
                                    <input type="password" className="form-control" style={{ fontSize: '18px' }} onChange={evt => { setPassword(evt.target.value) }} value={password} />
                                </div>
                                <div className="col-6 text-start">
                                    <label className='ms-4'>Yeniden Şifre:</label>
                                    <input type="password" className="form-control" style={{ fontSize: '18px' }} onChange={evt => { setRePassword(evt.target.value) }} value={rePassword}/>
                                </div>
                            </div>

                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={submit} data-bs-dismiss="modal" >Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewPersonelModal