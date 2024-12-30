import React, { useEffect } from 'react'
import { IKDispatch, IKUseSelector } from '../../store'
import NewPersonelAssignShiftModal from '../molecules/CompanyAdmin/NewPersonelAssignToShiftModal';
import { useDispatch } from 'react-redux';
import { fetchGetPersonelListByCompanyId } from '../../store/feature/userShiftSlice';
import { fetchGetAllShiftsByCompanyId } from '../../store/feature/shiftSlice';

function PersonelShiftList() {
  
    const shiftList = IKUseSelector(state => state.userShiftSlice.personelShiftList);
    console.log(shiftList);
    
    
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
                            <h5 className='mt-2'>Personel Vardiya Listesi</h5>
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

export default PersonelShiftList