import React from 'react'
import { IKUseSelector } from '../../../store'

function DashboardCompanyList() {

    const companyList = IKUseSelector(state => state.admin.dashboardCompanyList);

    console.log(companyList);
    

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="card">
                    <div className="card-header">
                     <h5 className='ms-3'>Üyeliği Bitmek Üzere Olan Şirketler</h5>
                        
                    </div>
                    <div className="card-body table-responsive p-0 mb-5">
                        <table className="table text-nowrap text-center">
                            <thead >
                                <tr>
                                    <th>ID</th>
                                    <th>Şirket Adı</th>
                                    <th>Kuruluş Tarihi</th>
                                    <th>Telefon</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    companyList.map((company, index) => {
                                        return (
                                            <tr key={index}>
                                                <td> {company.id} </td>
                                                <td> {company.name} </td>
                                                <td> {company.foundationDate} </td>
                                                <td> {company.phone} </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCompanyList