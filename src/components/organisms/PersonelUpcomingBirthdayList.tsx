import React from 'react'
import { IKUseSelector } from '../../store'

function PersonelUpcomingBirthdayList() {

    const birthdayList = IKUseSelector(state => state.companyManagement.personelBirthdayList);

    console.log(birthdayList);
    

    return (
        <div className='col'>
            <div className="card">
                <div className="card-body table-responsive p-0 mb-5">
                    <table className="table text-nowrap text-center">
                        <thead>
                            <tr>
                                <th>Personel Adı ve Soyadı</th>
                                <th>Departman Adı</th>
                                <th>Doğum Tarihi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                birthdayList.map((personel, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> {personel.firstName} {personel.lastName} </td>
                                            <td> {personel.departmentType} </td>
                                            <td> {personel.birthDate} </td>
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

export default PersonelUpcomingBirthdayList