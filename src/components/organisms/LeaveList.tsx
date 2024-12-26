import React, { useState } from 'react'
import { IKDispatch, IKUseSelector } from '../../store'
import swal from 'sweetalert';
import './LeaveList.css'
import { useDispatch } from 'react-redux';
import { fetchApproveLeaveRequest, fetchGetLeaveRequest, fetchRejectLeaveRequest } from '../../store/feature/leaveSlice';

function LeaveList() {

    const leaveList = IKUseSelector(state => state.leaveSlice.leaveList);

    const dispatch = useDispatch<IKDispatch>();

    const [rejectionMessage, setRejectionMessage] = useState('');
    const [isRejectionMessageEmpty, setIsRejectionMessageEmpty] = useState(false);
    const [selectedLeaveId, setSelectedLeaveId] = useState<number | null>(null);

    const approveLeave = (leaveId: number) => {

        swal({
            title: "Personelin İzin Talebini Onaylamak İstiyor Musunuz ?",
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
            .then((ok) => {
                if (ok) {
                    dispatch(fetchApproveLeaveRequest({ leaveId: leaveId })).then(() => {
                        swal('Başarı!', 'Personel İzin Talebi Başarılı Şekilde Onaylandı', 'success').then(() => {
                            dispatch(fetchGetLeaveRequest());
                        });
                    })

                }
            });

    }

    const handleRejectLeaveId = (leaveId: number) => {
        setSelectedLeaveId(leaveId);
        setIsRejectionMessageEmpty(false);
        setRejectionMessage('');
    }

    const handleRejectleave = () => {
        setIsRejectionMessageEmpty(rejectionMessage === '')

        if (rejectionMessage !== '' && selectedLeaveId) {
            dispatch(fetchRejectLeaveRequest({ leaveId: selectedLeaveId, rejectionMessage: rejectionMessage })).then(data => {
                if (data.payload.code === 200) {
                    swal('Başarı!', 'Personelin İzin Talebi Başarılı Şekilde Reddedilmiştir.', 'success').then(() => {
                        dispatch(fetchGetLeaveRequest());

                    });
                }
                else {
                    swal('Hata!', data.payload.message, 'error');
                }
            })
        }


    }


    return (
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <h5>İzin İstekleri Listesi</h5>
                    </div>
                </div>
                <div className="card-body table-responsive p-0 mb-5">
                    <table className="table text-nowrap text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Personel Ad Soyad</th>
                                <th>İzin Türü</th>
                                <th>Başlangıç Tarihi</th>
                                <th>Bitiş Tarihi</th>
                                <th>Açıklama</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaveList.map((leave, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td> {leave.id} </td>
                                                <td> {leave.personelFirstName} {leave.personelLastName} </td>
                                                <td> {leave.leaveType} </td>
                                                <td> {leave.startDate} </td>
                                                <td> {leave.endDate} </td>
                                                <td> {leave.description} </td>
                                                <td>
                                                    <button className='btn btn-success me-2' onClick={() => approveLeave(leave.id)}>
                                                        Onayla
                                                    </button>
                                                    <button className='btn btn-danger'  data-bs-toggle="modal" data-bs-target="#rejectLeaveModal"  onClick={() => handleRejectLeaveId(leave.id)}>
                                                        Reddet
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal fade bd-example-modal-lg" id="rejectLeaveModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="rejectLeaveModal">İzin Talebini Reddet</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <hr style={{ border: '1px black solid' }} />
                        <div className="modal-body">
                            <div className="row mt-4 mb-5">
                                <label className='form-label'>Açıklama: <span style={{ color: 'red' }}> *</span></label>
                                <textarea className='form-control' onChange={evt => { setRejectionMessage(evt.target.value) }}></textarea>
                            </div>
                            {
                                isRejectionMessageEmpty
                                && <div className='alert alert-warning'>Lütfen *  İle İşaretli Alanları Boş Bırakmayınız...</div>

                            }
                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleRejectleave} >Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaveList