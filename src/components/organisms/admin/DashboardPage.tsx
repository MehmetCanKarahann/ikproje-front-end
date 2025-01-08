import React from 'react'
import { IKUseSelector } from '../../../store'
import DashboardCalendar from '../../molecules/Admin/DashboardCalendar';
import DashboardCompanyList from '../../molecules/Admin/DashboardCompanyList';

function DashboardPage() {

    const companyCount = IKUseSelector(state => state.admin.companyCount);
    const employeeCount = IKUseSelector(state => state.admin.employeeCount);

    return (
        <div className='container-fluid ' style={{ backgroundColor: 'white' }}>
            <div className="row mt-5 justify-content-center">
                <div className="col-lg-3 col-6 mt-3">

                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3> {companyCount} </h3>

                            <p style={{ color: 'white', fontWeight: 'bold' }}>Şirket Sayısı</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-bag"></i>
                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-6 mt-3">
                    <div className="small-box bg-warning ms-2">
                        <div className="inner">
                            <h3 style={{ color: 'white' }}> {employeeCount} </h3>

                            <p style={{ color: 'white', fontWeight: 'bold' }}>Personel Sayısı</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-bag"></i>
                        </div>

                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-6">
                    <h5 className='text-center'>Resmi Tatiller</h5>
                    <DashboardCalendar />
                </div>
                <div className="col-6">
                    <DashboardCompanyList />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage