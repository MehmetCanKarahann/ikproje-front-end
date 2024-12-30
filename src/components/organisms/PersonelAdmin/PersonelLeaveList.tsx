import React, { useEffect, useState } from 'react'
import { IKDispatch, IKUseSelector } from '../../../store'
import NewPersonelLeaveModal from '../../molecules/PersonelAdmin/NewPersonelLeaveModal';
import { IUpdatePersonelLeaveRequest } from '../../../models/IUpdatePersonelLeaveRequest';
import { useDispatch } from 'react-redux';
import { fetcDeleteLeaveRequest, fetchGetPersonelRequestLeaveList, fetchUpdateLeaveRequest } from '../../../store/feature/leaveSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';


function PersonelLeaveList() {



    const leaveList = IKUseSelector(state => state.leaveSlice.personelLeaveList);

    const dispatch = useDispatch<IKDispatch>();

    const [leaveId, setLeaveId] = useState(0);
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');



    //izin bilgileri buraya setleniyor.
    const [selectedLeave, setSelectedLeave] = useState<any>(null);


    //info butonuna basıldığında izinle ilgili bilgiler buraya geliyor.
    const handleOpenModal = (leave: any) => {
        setSelectedLeave(leave);
    }

    const submit = () => {

        const token = localStorage.getItem('token') || '';

        const leave: IUpdatePersonelLeaveRequest = {
            leaveId: leaveId,
            token: token,
            leaveType: leaveType,
            startDate: startDate,
            endDate: endDate,
            description: description
        }

        dispatch(fetchUpdateLeaveRequest(leave)).then(data => {
            if (data.payload.code === 200) {
                toast.success("İzin Talebiniz Başarılı Şekilde Güncellendi. !", {
                    position: "top-right"
                });
                dispatch(fetchGetPersonelRequestLeaveList());
            }
            else {
                toast.warning(data.payload.message, {
                    position: "top-right"
                });
            }
        })


    }

    const leaveDelete = (leaveId: number) => {
        swal({
            title: "İzin Talebini Silmek istiyor Musunuz?",
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
                    dispatch(fetcDeleteLeaveRequest({ leaveId: leaveId })).then(data => {
                        if (data.payload.code === 200) {
                            toast.success("İzin Talebiniz Başarılı Şekilde Silindi. !", {
                                position: "top-right"
                            });
                            dispatch(fetchGetPersonelRequestLeaveList());
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
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <h5 className='mt-2'>İzin Talep Listesi</h5>
                        </div>
                        <div className="col-6 text-end">
                            <NewPersonelLeaveModal />
                        </div>
                        <ToastContainer />
                    </div>
                </div>
                <div className="card-body table-responsive p-0 mb-5">
                    
                    <table className='table text-nowrap text-center'>
                        <thead>
                            <tr>
                                <td>id</td>
                                <td>İzin Türü</td>
                                <td>Açıklama</td>
                                <td>Başlangıç Tarihi</td>
                                <td>Bitiş Tarihi</td>
                                <td>Durum</td>
                                <td>İşlemler</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaveList.map((leave, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{leave.id}</td>
                                            <td>{leave.leaveType}</td>
                                            <td> {leave.description} </td>
                                            <td> {leave.startDate} </td>
                                            <td> {leave.endDate} </td>
                                            <td> {leave.leaveStatus} </td>
                                            <td>
                                                {leave.leaveStatus === 'PENDING' ? (
                                                    <>

                                                        <button className='btn btn-warning me-2' data-bs-toggle="modal" data-bs-target="#rejectLeaveUpdateModal" onClick={() => {
                                                            setLeaveId(leaveList[index].id);
                                                            setLeaveType(leaveList[index].leaveType);
                                                            setStartDate(leaveList[index].startDate);
                                                            setEndDate(leaveList[index].endDate);
                                                            setDescription(leaveList[index].description);
                                                        }}>
                                                            <i className="fa-solid fa-pen"></i>
                                                        </button>
                                                        <button className='btn btn-danger' onClick={() => {
                                                            leaveDelete(leaveList[index].id);
                                                        }}>
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </>
                                                ) : leave.leaveStatus === 'REJECTED' ? (
                                                    <>
                                                        <button className='btn btn-secondary me-2' data-bs-toggle="modal" data-bs-target="#rejectLeaveInfoModal" onClick={() => handleOpenModal(leave)} >
                                                            <i className="fa-solid fa-info"></i>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className='btn btn-outline-primary'>Onaylı</button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className="modal fade bd-example-modal-lg" id="rejectLeaveUpdateModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="rejectLeaveModal">İzin Talebini Güncelle</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>
                            <hr style={{ border: '1px black solid' }} />
                            <div className="modal-body">
                                <div className="row mt-4 mb-5">
                                    <label className='form-label'>İzin Türü: </label>
                                    <select className="form-select mb-3 p-3" onChange={evt => { setLeaveType(evt.target.value) }} value={leaveType} style={{ borderRadius: '20px' }} aria-label="Default select example">
                                        <option value="YILLIK_IZIN">Yıllık İzin</option>
                                        <option value="EVLILIK_IZNI">Evlilik İzni</option>
                                        <option value="DOGUM_IZNI">Doğum İzni</option>
                                        <option value="UCRETSIZ_IZIN">Ücretsiz İzin</option>
                                        <option value="DIGER">Diğer</option>
                                    </select>
                                </div>
                                <div className="row mt-4 mb-5">
                                    <label className='form-label'>Başlangıç Tarihi: </label>
                                    <input type='date' className='form-control' onChange={evt => { setStartDate(evt.target.value) }} value={startDate}></input>
                                </div>
                                <div className="row mt-4 mb-5">
                                    <label className='form-label'>Bitiş Tarihi: </label>
                                    <input type='date' className='form-control' onChange={evt => { setEndDate(evt.target.value) }} value={endDate}></input>
                                </div>
                                <div className="row mt-4 mb-5">
                                    <label className='form-label'>Açıklama: </label>
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

                <div className="modal fade bd-example-modal-lg" id="rejectLeaveInfoModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="rejectLeaveModal">İzin Talebini Reddedilme Bilgileri</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>
                            <hr style={{ border: '1px black solid' }} />
                            <div className="modal-body">
                                <div className="row mt-4 mb-5">
                                    <label className='form-label'>Yönetici Adı: </label>
                                    <input readOnly type='text' className='form-control' value={selectedLeave?.managerName || ''}  ></input>
                                </div>
                                <div className="row mt-4 mb-5">
                                    <label className='form-label'>Yanıtlama Tarihi: </label>
                                    <input readOnly type='text' className='form-control' value={selectedLeave?.statusDate || ''} ></input>
                                </div>
                                <div className="row mt-4 mb-5">
                                    <label className='form-label'>Açıklama: </label>
                                    <textarea readOnly className='form-control' value={selectedLeave?.rejectResponse || ''} ></textarea>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonelLeaveList