import React, { useState } from 'react'
import { IKDispatch, IKUseSelector } from '../../store'
import NewShiftModal from '../molecules/CompanyAdmin/NewShiftModal';
import { IUpdateShiftRequest } from '../../models/IUpdateShiftRequest';
import { useDispatch } from 'react-redux';
import { fetchDeleteShift, fetchGetAllShiftsByCompanyId, fetchUpdateShift } from '../../store/feature/shiftSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import './ShiftList.css';

function ShiftList() {

    const shiftList = IKUseSelector(state => state.shiftSlice.shiftList);

    const dispatch = useDispatch<IKDispatch>();

    const [shiftId, setShiftId] = useState(0);
    const [name, SetName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');


    const submit = () => {

        const token = localStorage.getItem('token') || '';

        const updateShiftModel: IUpdateShiftRequest = {
            token: token,
            shiftId: shiftId,
            name: name,
            startTime: startTime,
            endTime: endTime
        }

        dispatch(fetchUpdateShift(updateShiftModel)).then(data => {
            if (data.payload.code === 200) {
                toast.success("Vardiya Başarılı Şekilde Güncellendi!", {
                    position: "top-right"
                });
                dispatch(fetchGetAllShiftsByCompanyId());
            }
        })


    }

    const shiftDelete = (shiftId: number) => {
        swal({
            title: "Vardiyayı Silmek istiyor Musunuz?",
            icon: "warning",
            buttons: {
                cancel: {
                    text: 'Hayır',
                    value: false,
                    visible: true,
                    className: 'swal-button-cancel'
                },
                confirm: {
                    text: 'Evet',
                    value: true,
                    visible: true,
                    className: 'swal-button-confirm'
                },
            }
        })
        .then((willDelete) => {
                if (willDelete) {
                    dispatch(fetchDeleteShift({ shiftId: shiftId })).then(data => {
                        if (data.payload.code === 200) {
                            toast.success("Vardiya Başarılı Şekilde Silindi. !", {
                                position: "top-right"
                            });
                            dispatch(fetchGetAllShiftsByCompanyId());
                        }
                        else {
                            toast.warning(data.payload.message, {
                                position: "top-right"
                            });
                        }
                    })
                }
            });
    }

    return (
        <>
            <div className="col">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h5 className='mt-2'>Vardiya Listesi</h5>
                            </div>
                            <div className="col-6 text-end">
                                <NewShiftModal />
                            </div>
                         

                        </div>
                    </div>
                    <div className="card-body table-responsive p-0 mb-5">
                        <table className="table text-nowrap text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Vardiya Adı</th>
                                    <th>Başlangıç Zamanı</th>
                                    <th>Bitiş Zamanı</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    shiftList.map((shift, index) => {
                                        
                                        return (
                                            
                                            <tr key={index}>
                                                <td> {shift.id} </td>
                                                <td> {shift.name} </td>
                                                <td> {shift.startTime} </td>
                                                <td> {shift.endTime} </td>
                                                <td>
                                                    <button className='btn btn-warning me-2' data-bs-toggle="modal" data-bs-target="#updateShiftModal" onClick={() => {
                                                        setShiftId(shiftList[index].id)
                                                        SetName(shiftList[index].name)
                                                        setStartTime(shiftList[index].startTime)
                                                        setEndTime(shiftList[index].endTime)
                                                    }}>
                                                        <i className="fa-solid fa-pen"></i>
                                                    </button>
                                                    <button className='btn btn-danger' onClick={() => {
                                                        shiftDelete(shiftList[index].id)
                                                    }}>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="modal fade bd-example-modal-xl" id="updateShiftModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <input type="text" className='form-control' onChange={evt => { SetName(evt.target.value) }} value={name} />
                            </div>
                            <div className="col mb-4  text-start">
                                <label className='ms-4'>Başlangıç Zamanı: </label>
                                <input type="text" className='form-control' onChange={evt => { setStartTime(evt.target.value) }} value={startTime} />

                            </div>
                            <div className="col mb-4  text-start">
                                <label className='ms-4'>Bitiş Zamanı: </label>
                                <input type="text" className='form-control' onChange={evt => { setEndTime(evt.target.value) }} value={endTime} />

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

export default ShiftList