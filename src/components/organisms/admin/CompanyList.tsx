import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IKDispatch, IKUseSelector } from '../../../store';
import { fetchApproveAccount, fetchGetUnapprovedCompanies, fetchRejectAccount } from '../../../store/feature/adminSlice';
import swal from 'sweetalert';

function CompanyList() {
    const dispatch = useDispatch<IKDispatch>();
    const companyList = IKUseSelector(state => state.admin.unapprovedCompanyList);

    const [userId, setUserId] = useState(0);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [rejectionMessage, setRejectionMessage] = useState('');
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');


    const handleConfirmAccount = () => {
        if (confirmationMessage.trim() === '') {
            setErrorMessage('Açıklama kısmı boş bırakılamaz.');
            return;
        }
        setErrorMessage('');  // Hata yoksa mesajı sıfırla
        dispatch(fetchApproveAccount({ userId, confirmationMessage })).then(data => {
            if (data.payload.code === 200) {
                swal('Başarı!', 'Şirket Hesabı Başarılı Şekilde Onaylanmıştır.', 'success').then(() => {
                    dispatch(fetchGetUnapprovedCompanies());
                    setConfirmationMessage('');
                    setShowApproveModal(false);
                });
            } else {
                swal('Hata!', data.payload.message, 'error');
            }
        });
    };

    const handleRejectAccount = () => {
        if (rejectionMessage !== '') {
            dispatch(fetchRejectAccount({ userId, rejectionMessage })).then(data => {
                if (data.payload.code === 200) {
                    swal('Başarı!', 'Şirket Hesabı Başarılı Şekilde Reddedilmiştir.', 'success').then(() => {
                        dispatch(fetchGetUnapprovedCompanies());
                        setShowRejectModal(false);  // Modal kapat
                    });
                } else {
                    swal('Hata!', data.payload.message, 'error');
                }
            });
        }
        else {

        }
    };

    return (
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mt-4">Onaylanmamış Şirketler Listesi</h5>
                    </div>
                    <div className="card-body table-responsive p-0 mb-5">
                        <table className="table text-nowrap text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Ad</th>
                                    <th>Soyad</th>
                                    <th>Telefon Numarası</th>
                                    <th>Email Adresi</th>
                                    <th>Şirket Adı</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companyList.map((company, index) => (
                                    <tr key={index}>
                                        <td>{company.id}</td>
                                        <td>{company.firstName}</td>
                                        <td>{company.lastName}</td>
                                        <td>{company.phone}</td>
                                        <td>{company.email}</td>
                                        <td>{company.companyName}</td>
                                        <td>
                                            <button className='btn btn-success' onClick={() => { 
                                                setUserId(company.id);
                                                setShowApproveModal(true); 
                                            }}>
                                                Onayla
                                            </button>
                                            <button className='btn btn-danger ms-2' onClick={() => { 
                                                setUserId(company.id);
                                                setShowRejectModal(true); 
                                            }}>
                                                Reddet
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Onay Modal */}
                {showApproveModal && (
                    <div className="modal-backdrop fade show"></div>
                )}
                <div className={`modal fade ${showApproveModal ? 'show d-block' : ''}`} tabIndex={-1} role="dialog">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Şirket Hesabını Onayla</h5>
                                <button type="button" className="btn-close" onClick={() => setShowApproveModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <label>Açıklama:</label>
                                <textarea   className={`form-control ${errorMessage ? 'is-invalid' : ''}`}   onChange={e => { setConfirmationMessage(e.target.value);  setErrorMessage('');  // Kullanıcı yazdıkça hata mesajını temizle
        }} value={confirmationMessage}></textarea>
         {errorMessage && (
        <div className="invalid-feedback">
            {errorMessage}
        </div>
    )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={handleConfirmAccount}>Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reddet Modal */}
                {showRejectModal && (
                    <div className="modal-backdrop fade show"></div>
                )}
                <div className={`modal fade ${showRejectModal ? 'show d-block' : ''}`} tabIndex={-1} role="dialog">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Şirket Hesabını Reddet</h5>
                                <button type="button" className="btn-close" onClick={() => setShowRejectModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <label>Açıklama:</label>
                                <textarea className="form-control" onChange={e => setRejectionMessage(e.target.value)}></textarea>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={handleRejectAccount}>Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyList;
