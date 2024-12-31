import React, { useEffect } from 'react'
import NewBreakModal from '../molecules/CompanyAdmin/NewBreakModal'
import { useDispatch } from 'react-redux'
import { IKDispatch, IKUseSelector } from '../../store'
import { fetchGetAllShiftsByCompanyId } from '../../store/feature/shiftSlice';

function BreakList() {

    const dispatch = useDispatch<IKDispatch>();

    const breakList = IKUseSelector(state => state.breakSlice.breakList);

    useEffect(() => {
         dispatch(fetchGetAllShiftsByCompanyId())
    }, []);

    return (
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <h5 className='mt-2'>Mola Listesi</h5>

                        </div>
                        <div className="col-6 text-end">
                            <NewBreakModal />
                        </div>
                    </div>
                </div>
                <div className="card-body table-responsive p-0 mb-5">
                    <table className="table text-nowrap text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Vardiya Adı</th>
                                <th>Mola Adı</th>
                                <th>Mola Başlangıç Zamanı</th>
                                <th>Mola Bitiş Zamanı</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                breakList.map((breaks, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> {breaks.id} </td>
                                            <td> {breaks.shiftName} </td>
                                            <td> {breaks.name} </td>
                                            <td> {breaks.startTime} </td>
                                            <td> {breaks.endTime} </td>
                                            <td>
                                                <button className='btn btn-warning me-2'>
                                                    <i className="fa-solid fa-pen"></i>
                                                </button>
                                                <button className='btn btn-danger'>
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
    )
}

export default BreakList