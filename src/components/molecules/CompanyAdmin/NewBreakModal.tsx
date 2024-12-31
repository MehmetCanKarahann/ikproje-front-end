import React, { useState } from 'react'
import { IKDispatch, IKUseSelector } from '../../../store';
import { INewBreakRequest } from '../../../models/INewBreakRequest';
import { useDispatch } from 'react-redux';
import { fetchCreateBreak, fetchGetAllBreak } from '../../../store/feature/breakSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewBreakModal() {

    const shiftList = IKUseSelector(state => state.shiftSlice.shiftList);

    const [shiftId, setShiftId] = useState(0);
    const [breakName, setBreakName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    //seçilen vardiyanın id değerini setler.
    const handleShiftChange = (evt: any) => {
        setShiftId(evt.target.value);
    }

    const dispatch = useDispatch<IKDispatch>();

    const submit = () => {

        const token = localStorage.getItem('token') || '';

        const breakModel: INewBreakRequest = {
            token: token,
            shiftId: shiftId,
            name: breakName,
            startTime: startTime,
            endTime: endTime
        }

        dispatch(fetchCreateBreak(breakModel)).then(data => {
            if (data.payload.code === 200) {
                toast.success("Mola Oluşturma İşleminiz Başarılı!", {
                    position: "top-right"
                });
                dispatch(fetchGetAllBreak())

            }
        })

    }

    return (
        <>
            <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#newBreakModal">Yeni Mola Ekle</button>
            <ToastContainer />

            <div className="modal fade bd-example-modal-xl" id="newBreakModal" aria-labelledby="exampleModalLabel" >
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="newBreakModal">Mola Oluştur</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <hr style={{ border: '1px black solid' }} />
                        <div className="modal-body">

                            <div className="col mb-4 mt-5 text-start">
                                <label className='ms-4'>Vardiya Adı: </label>
                                <select className='form-select mb-2 p-3 mt-2' onChange={handleShiftChange} style={{ borderRadius: '30px' }}>
                                    <option value="">Vardiya Seçin</option>
                                    {shiftList.map(shift => (
                                        <option key={shift.id} value={shift.id} >
                                            {shift.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col mb-4 text-start">

                                <label className='ms-4'>Mola Adı: </label>
                                <input type="text" className='form-control' onChange={evt => { setBreakName(evt.target.value) }} />
                            </div>
                            <div className="col mb-4 text-start">
                                <label className='ms-4'>Başlangıç Zamanı: </label>
                                <input type="text" className='form-control' onChange={evt => { setStartTime(evt.target.value) }} />
                            </div>
                            <div className="col mb-4 text-start">
                                <label className='ms-4'>Bitiş Zamanı: </label>
                                <input type="text" className='form-control' onChange={evt => { setEndTime(evt.target.value) }} />
                            </div>
                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={submit} >Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewBreakModal