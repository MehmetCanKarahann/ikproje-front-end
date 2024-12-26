import React from 'react'
import { IKUseSelector } from '../../store'
import NewPersonelLeaveModal from '../molecules/PersonelAdmin/NewPersonelLeaveModal';

function PersonelLeaveList() {

    const leaveList = IKUseSelector(state => state.leaveSlice.personelLeaveList);

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
                                                {leave.leaveStatus === 'PENDING' && (
                                                    <>
                                                        <button className='btn btn-warning me-2'>
                                                            <i className="fa-solid fa-pen"></i>
                                                        </button>
                                                        <button className='btn btn-danger'>
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
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
            </div>
        </div>
    )
}

export default PersonelLeaveList