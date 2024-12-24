import React from 'react'
import { IKDispatch, IKUseSelector } from '../../store';
import { IPersonelUpdateStateRequest } from '../../models/IPersonelUpdateStateRequest';
import { useDispatch } from 'react-redux';
import { fetchGetPersonelList, fetchUpdatePersonelState } from '../../store/feature/companyManagerSlice';
import swal from 'sweetalert';
import './PersonelStateList.css';

function PersonelStateList() {

    const PersonelList = IKUseSelector(state => state.companyManagement.companyPersonelList);

    const dispatch = useDispatch<IKDispatch>();

    const passivePersonelState = (personelId: number) => {

        const token = localStorage.getItem('token') || '';

        const personel: IPersonelUpdateStateRequest = {
            token: token,
            personelId: personelId,
            stateToChange: 'PASSIVE'
        }

        swal({
            title: "Personelin Durumunu Pasif Yapmak istiyor Musunuz?",
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
                    dispatch(fetchUpdatePersonelState(personel)).then(() => {
                        dispatch(fetchGetPersonelList());
                    });
                    swal("Personelin Durumu Başarılı Bir Şekilde Pasif Edildi!", { icon: "success" });
                }
            });
    }

    const activePersonelState = (personelId: number) => {

        const token = localStorage.getItem('token') || '';

        const personel: IPersonelUpdateStateRequest = {
            token: token,
            personelId: personelId,
            stateToChange: 'ACTIVE'
        }

        swal({
            title: "Personelin Durumunu Aktif Yapmak istiyor Musunuz?",
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
                    dispatch(fetchUpdatePersonelState(personel)).then(() => {
                        dispatch(fetchGetPersonelList());
                    });
                    swal("Personelin Durumu Başarılı Bir Şekilde Aktif Edildi!", { icon: "success" });
                }
            });

    }

    return (
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    <h5>Personel Listesi </h5>
                </div>
                <div className="card-body table-responsive p-0 mb-5">
                    <table className="table text-nowrap text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ad</th>
                                <th>Soyad</th>
                                <th>Doğum Tarihi</th>
                                <th>İşe Alınma Tarihi</th>
                                <th>Departman</th>
                                <th>Durum</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                PersonelList.map((personel, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{personel.id}</td>
                                            <td>{personel.firstName}</td>
                                            <td>{personel.lastName}</td>
                                            <td>{personel.birthDate}</td>
                                            <td>{personel.hireDate}</td>
                                            <td>{personel.departmentType}</td>
                                            <td>{personel.state}</td>
                                            <td>
                                                {
                                                    personel.state === 'ACTIVE' && <button className='btn btn-danger' onClick={() => passivePersonelState(personel.id)}>
                                                        Pasif Yap
                                                    </button>

                                                }
                                                {
                                                    personel.state === 'PASSIVE' && <button className='btn btn-success me-2' onClick={() => activePersonelState(personel.id)}>
                                                        Aktif Et
                                                    </button>
                                                }

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

export default PersonelStateList