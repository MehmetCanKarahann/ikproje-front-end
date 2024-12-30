import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { IKDispatch } from '../../../store';
import { INewShiftRequest } from '../../../models/INewShiftRequest';
import { fetchGetAllShiftsByCompanyId, fetchNewShift } from '../../../store/feature/shiftSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewShiftModal() {

    const dispatch = useDispatch<IKDispatch>();

    const [name, SetName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const submit = () => {

        const token = localStorage.getItem('token') || '';

        const newShift: INewShiftRequest = {
            token: token,
            name: name,
            startTime: startTime,
            endTime: endTime
        }

        dispatch(fetchNewShift(newShift)).then(data => {
            if (data.payload.code === 200) {
                toast.success("Vardiya Oluşturma İşleminiz Başarılı!", {
                    position: "top-right"
                });
                dispatch(fetchGetAllShiftsByCompanyId());
            }
        })

    }


    return (
        <>
            <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#newShiftModal">Yeni Vardiya Ekle</button>
            <ToastContainer />
            <div className="modal fade bd-example-modal-xl" id="newShiftModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Yeni Vardiya Ekleme</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <hr style={{ border: '1px black solid' }} />
                        <div className="modal-body">

                            <div className="col mb-4 mt-5 text-start">
                                <label className='ms-4'>Vardiya Adı: </label>
                                <input type="text" className='form-control' onChange={evt => { SetName(evt.target.value) }} />
                            </div>
                            <div className="col mb-4  text-start">
                                <label className='ms-4'>Başlangıç Zamanı: </label>
                                <input type="text" className='form-control' onChange={evt => { setStartTime(evt.target.value) }} />

                            </div>
                            <div className="col mb-4  text-start">
                                <label className='ms-4'>Bitiş Zamanı: </label>
                                <input type="text" className='form-control' onChange={evt => { setEndTime(evt.target.value) }} />

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

export default NewShiftModal