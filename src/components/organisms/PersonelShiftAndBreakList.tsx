import React from 'react'
import { IKUseSelector } from '../../store'

function PersonelShiftAndBreakList() {

    const shiftList = IKUseSelector(state => state.userShiftSlice.personelShiftAndBreakList);
    
    console.log(shiftList);
    

    return (
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    <h5>Personel Vardiya ve Mola Listesi</h5>
                </div>
                <div className="card-body table-responsive p-0 mb-5">
                    <table className="table text-nowrap text-center">
                        <thead>
                            <tr>
                                <th>Ad</th>
                                <th>Başlangıç Tarihi</th>
                                <th>Bitiş Tarihi</th>
                                <th>Başlagıç Saati</th>
                                <th>Bitiş Saati</th>
                            </tr>
                        </thead>
                        <tbody>
                         {
                            shiftList.map((shift,index) => {
                                return (
                                    <tr key={index}>
                                        <td> {shift.shiftName} </td>
                                        <td> {shift.startDate} </td>
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

export default PersonelShiftAndBreakList