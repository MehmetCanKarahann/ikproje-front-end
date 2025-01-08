import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../../store'
import { IPersonelNewLeaveRequest } from '../../../models/IPersonelNewLeaveRequest';
import { fetchCreateNewLeaveRequest, fetchGetPersonelRequestLeaveList } from '../../../store/feature/leaveSlice';
import swal from 'sweetalert';

function NewPersonelLeaveModal() {

    const dispatch = useDispatch<IKDispatch>();

    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    


    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        console.log(formattedDate);
        
        setStartDate(formattedDate);
        setEndDate(formattedDate);
    }, []);

    const submit = () => {
        
        const token = localStorage.getItem('token') || '';

        const leave: IPersonelNewLeaveRequest = {
            token: token,
            description: description,
            startDate: startDate,
            endDate: endDate,
            leaveType: leaveType
        }
   
        

        dispatch(fetchCreateNewLeaveRequest(leave)).then(data => {
            if(data.payload.code === 200){
                swal('Başarı!', 'Yeni İzin Talebi Oluşturma İşlemi Başarılı', 'success').then(() => {
                    dispatch(fetchGetPersonelRequestLeaveList());
                    
                    setDescription('');
                    setLeaveType('');
                })
            }
            else {
                swal('Hata!', data.payload.message, 'error');
            }
        })
       

    }


    return (
        <>
            <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#newPersonelLeaveModal">Yeni İzin Talebi Oluştur</button>
            <div className="modal fade bd-example-modal-xl" id="newPersonelLeaveModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Yeni İzin Talebi</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <hr style={{ border: '1px black solid' }} />
                        <div className="modal-body">

                            <div className="col mb-4 mt-5 text-start">
                                <label className='ms-4'>İzin Türü: <span style={{color: 'red'}}> *</span></label>
                                <select className='form-select mb-3 p-3' onChange={evt => { setLeaveType(evt.target.value) }} value={leaveType} style={{ borderRadius: '30px', color: 'gray', fontWeight: 'bold' }}>
                                    <option selected value=''>İzin Türünü Seçiniz</option>
                                    <option value='YILLIK_IZIN'>Yıllık İzin</option>
                                    <option value='EVLILIK_IZNI'>Evlilik İzini</option>
                                    <option value='DOGUM_IZNI'>Doğum İzini</option>
                                    <option value='UCRETSIZ_IZIN'>Ücresiz İzin</option>
                                    <option value='DIGER'>Diğer</option>
                                </select>
                            </div>
                            <div className="col mb-4  text-start">
                                <label className='ms-4'>Başlangıç Tarihi: <span style={{color: 'red'}}> *</span></label>
                                <input type="date" className='form-control' onChange={evt => { setStartDate(evt.target.value) }} min={new Date().toISOString().split('T')[0]} value={startDate} />
                            </div>
                            <div className="col mb-4  text-start">
                                <label className='ms-4'>Bitiş Tarihi: <span style={{color: 'red'}}> *</span></label>
                                <input type="date" className='form-control' onChange={evt => { setEndDate(evt.target.value) }} value={endDate} />
                            </div>
                            <div className="col mb-4 text-start">
                                <label className='ms-4'>Açıklama: <span style={{color: 'red'}}> *</span></label>
                                <textarea className='form-control' onChange={evt => { setDescription(evt.target.value) }} value={description}></textarea>
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
export default NewPersonelLeaveModal