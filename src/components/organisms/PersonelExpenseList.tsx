import React, { useState } from 'react'
import { IKDispatch, IKUseSelector } from '../../store';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchApproveExpense, fetchGetPersonelExpenseRequest, fetchRejectExpense } from '../../store/feature/expenseSlice';
import swal from 'sweetalert';

function PersonelExpenseList() {

    const expenseList = IKUseSelector(state => state.expenseSlice.personelExpenseList);

    const [expense, SetExpense] = useState<any>(null);

    const dispatch = useDispatch<IKDispatch>();

    //timestamp türündeki değeri tarihe çevirir.
    function formatDate(timestamp: number): string {
        const date = new Date(timestamp);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    function formatDateForInput(timestamp: number): string {
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD formatında döner
    }

    const submit = (expenseId: number) => {

        if(expenseId !== 0){
            dispatch(fetchApproveExpense({expenseId})).then(data => {
                if(data.payload.code === 200){
                    toast.success("Harcama Onaylama İşleminiz Başarılı!", {
                        position: 'top-right'
                    });
                    dispatch(fetchGetPersonelExpenseRequest())
                }
                else{
                    toast.error(data.payload.message, {
                        position: 'top-right'
                    });
                }
            })
        }
        else {
            toast.error("Kullanıcı Bulunamadı", {
                position: "top-right"
            });
        }
    }

    const rejectExpense = (expenseId: number) => {

        swal({
            title: "Harcama İşlemini Reddetmek istiyor Musunuz?",
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
            .then((ok) => {
                if (ok) {
                    dispatch(fetchRejectExpense({expenseId})).then(data => {
                        if(data.payload.code === 200){
                            toast.success("Personele Ait Harcama İşleminiz Başarılı Şekilde Reddedildi.", {
                                position: 'top-right'
                            });
                            dispatch(fetchGetPersonelExpenseRequest());
                        }
                        else {
                            toast.error(data.payload.message, {
                                position: 'top-right'
                            });
                        }
                    })
                }
            });

        
    }

    return (
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <h5 className='mt-2'>Harcama Listesi</h5>
                    </div>
                </div>
                <ToastContainer />
                <div className="card-body table-responsive p-0 mb-5">
                    <table className="table text-nowrap text-center ">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Personel Ad Soyad</th>
                                <th>Fatura</th>
                                <th>Miktar</th>
                                <th>Açıklama</th>
                                <th>Harcama Tarihi</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                expenseList.map((expense, index) => {

                                    return (
                                        <>
                                            <tr key={index}>
                                                <td> {expense.id} </td>
                                                <td> {expense.personalName} </td>
                                                <td>
                                                    <img
                                                        src={expense?.receiptUrl ? String(expense.receiptUrl) : 'https://lh4.googleusercontent.com/proxy/kX0otYkzacbwl936L9VnavuyJ7pX7mzAaJTVGOysJBK1HY2F8PrjfIEb-uXhsi6vwKajxYE3KkPbmrw'}
                                                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                    />
                                                </td>
                                                <td> {expense.amount} </td>
                                                <td>  {expense.description.length > 5
                                                        ? expense.description.slice(0, 8) + "..."
                                                        : expense.description} </td>
                                                <td> {formatDate(expense.expenseDate)} </td>
                                                <td>
                                                    <button className='btn btn-success me-2' data-bs-toggle="modal" data-bs-target="#approvedExpenseInfoModal" onClick={() => { SetExpense(expense) }}>
                                                        Onayla</button> 
                                                    <button className='btn btn-danger' onClick={() => { rejectExpense(expense.id) }} >Reddet</button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="modal fade bd-example-modal-xl" id="approvedExpenseInfoModal" aria-labelledby="exampleModalLabel" >
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="approvedExpenseInfoModal">Harcama Detay Bilgileri</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>
                            <hr style={{ border: '1px black solid' }} />
                            <div className="modal-body m-3">
                                <div className="row mt-4 mb-4">
                                    <label className='form-label'>Personel Adı: </label>
                                    <input readOnly type='text' className='form-control' value={expense?.personalName || ''} ></input>
                                </div>
                                <div className="row mb-4">
                                    <label className='form-label'>Miktar: </label>
                                    <input readOnly type='text' className='form-control' value={expense?.amount || ''}  ></input>
                                </div>
                                <div className="row mb-4">
                                    <label className='form-label'>Harcama Tarihi: </label>
                                    <input readOnly type="date" className='form-control'  value={expense?.expenseDate ? formatDateForInput(expense.expenseDate) : ''} 
 />
                                </div>
                                <div className="row mb-4">
                                    <label className='form-label'>Açıklama: </label>
                                    <textarea readOnly className='form-control' value={expense?.description || ''}></textarea>
                                </div>
                                <div className="row mb-4">
                                    <label className='form-label'>Fatura Resmi: </label>
                                    <img className='form-control' src={expense?.receiptUrl || ''} />
                                </div>
                            </div>
                            <hr />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => { submit(expense?.id) }} data-bs-dismiss="modal">Onayla</button>
                            </div>
                        </div>

                    </div>
                </div>
                 <div className="modal fade bd-example-modal-xl" id="approvedExpenseInfoModal" aria-labelledby="exampleModalLabel" >
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="approvedExpenseInfoModal">Harcama Detay Bilgileri</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>
                            <hr style={{ border: '1px black solid' }} />
                            <div className="modal-body m-3">
                                <div className="row mt-4 mb-4">
                                    <label className='form-label'>Personel Adı: </label>
                                    <input readOnly type='text' className='form-control' value={expense?.personalName || ''} ></input>
                                </div>
                                <div className="row mb-4">
                                    <label className='form-label'>Miktar: </label>
                                    <input readOnly type='text' className='form-control' value={expense?.amount || ''}  ></input>
                                </div>
                                <div className="row mb-4">
                                    <label className='form-label'>Harcama Tarihi: </label>
                                    <input readOnly type="date" className='form-control'  value={expense?.expenseDate ? formatDateForInput(expense.expenseDate) : ''} 
 />
                                </div>
                                <div className="row mb-4">
                                    <label className='form-label'>Açıklama: </label>
                                    <textarea readOnly className='form-control' value={expense?.description || ''}></textarea>
                                </div>
                                <div className="row mb-4">
                                    <label className='form-label'>Fatura Resmi: </label>
                                    <img className='form-control' src={expense?.receiptUrl || ''} />
                                </div>
                            </div>
                            <hr />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => { submit(expense?.id) }} data-bs-dismiss="modal">Onayla</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonelExpenseList