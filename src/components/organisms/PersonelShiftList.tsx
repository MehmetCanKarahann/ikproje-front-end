import React, { useEffect, useState } from 'react'
import { IKDispatch, IKUseSelector } from '../../store'
import NewPersonelAssignShiftModal from '../molecules/CompanyAdmin/NewPersonelAssignToShiftModal';
import { useDispatch } from 'react-redux';
import { fetchGetPersonelListByCompanyId } from '../../store/feature/userShiftSlice';
import { fetchGetAllShiftsByCompanyId } from '../../store/feature/shiftSlice';
import { IBreakSummaryResponse } from '../../models/IBreakSummaryResponse';

function PersonelShiftList() {

    const shiftList = IKUseSelector(state => state.userShiftSlice.personelShiftList);


    const [breakList, setBreaks] = useState<any>(null);
    console.log(breakList);

    const dispatch = useDispatch<IKDispatch>();

    useEffect(() => {
        dispatch(fetchGetPersonelListByCompanyId())
        dispatch(fetchGetAllShiftsByCompanyId())
    }, [])

    return (
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <h5 className='mt-2'>Personel Vardiya ve Mola Listesi</h5>
                        </div>
                        <div className="col-6 text-end">
                            <NewPersonelAssignShiftModal />
                        </div>
                    </div>
                </div>
                <div className="card-body table-responsive p-0 mb-5">
                    <table className="table text-nowrap text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Vardiya Adı</th>
                                <th>Personel Ad Soyad</th>
                                <th>Başlangıç Zamanı</th>
                                <th>Bitiş Zamanı</th>
                                <th> İşlemler </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                shiftList.map((shift, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> {shift.id} </td>
                                            <td> {shift.shiftName} </td>
                                            <td> {shift.personelName}  {shift.personelSurname} </td>
                                            <td> {shift.startDate} </td>
                                            <td> {shift.endDate} </td>
                                            <td>
                                                <button className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#personelBreakInfoModal"onClick={() => { setBreaks(shiftList[index].breaks || []) }}>
                                                    {/* <i className="fa-solid fa-info"></i> */} Mola Göster
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="modal fade bd-example-modal-lg" id="personelBreakInfoModal" aria-labelledby="personelBreakInfoModal" aria-hidden="true">
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="personelBreakInfoModal">Personel Mola Bilgileri</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>
                            <hr style={{ border: '1px black solid' }} />
                            <div className="modal-body">

                                <div className="card">
                                    <div className="card-body table-responsive p-0 mb-5">
                                        <table className="table text-nowrap text-center">
                                            <thead>
                                                <tr>
                                                    <th>Mola Adı</th>
                                                    <th>Başlangıç Zamanı</th>
                                                    <th>Bitiş Zamanı</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {breakList && breakList.length > 0 ? (
                                                    breakList.map((breaks: IBreakSummaryResponse, index: number) => (
                                                        <tr key={index}>
                                                            <td>{breaks.breakName}</td>
                                                            <td>{breaks.breakStartTime.substring(0, 5)}</td>
                                                            <td>{breaks.breakEndTime.substring(0, 5)}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={3}>Mola bilgisi bulunamadı</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
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

export default PersonelShiftList