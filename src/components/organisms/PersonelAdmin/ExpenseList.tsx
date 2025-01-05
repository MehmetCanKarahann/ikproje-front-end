import React, { useState } from 'react'
import NewExpenseModal from '../../molecules/PersonelAdmin/NewExpenseModal'
import { IKDispatch, IKUseSelector } from '../../../store'
import { useDispatch } from 'react-redux';
import { fetchGetPersonelExpenseList, fetchUploadReceipt } from '../../../store/feature/expenseSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from '../../../img/resim-yok.png';

function ExpenseList() {

    const expenseList = IKUseSelector(state => state.expenseSlice.expenseList);

    const dispatch = useDispatch<IKDispatch>();

    const [expenseId, setExpenseId] = useState(0);

    const [file, setFile] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    //timestamp türündeki değeri tarihe çevirir.
    function formatDate(timestamp: number): string {
        const date = new Date(timestamp);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    const handleChange = (evt: any) => {
        const selectedFile = evt.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleImageClick = (url: string | number | undefined) => {
        if (url) {
            setSelectedImage(String(url));
        }
    }

    const closeModal = () => {
        setSelectedImage(null);
    }

    const handleSubmit = () => {

        if (file) {
            dispatch(fetchUploadReceipt({ expenseId, file })).then(data => {
                if (data.payload.code === 200) {
                    toast.success("Fatura Yükleme İşleminiz Başarılı!", {
                        position: "top-right"
                    });
                    dispatch(fetchGetPersonelExpenseList());
                }
                else {
                    toast.warning(data.payload.message, {
                        position: "top-right"
                    });
                }
            })
        }
    }


    return (
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <h5 className='mt-2'>Harcama Listesi</h5>
                        </div>
                        <div className="col-6 text-end">
                            <NewExpenseModal />
                        </div>
                       
                    </div>
                </div>
                <div className="card-body table-responsive p-0 mb-5">
                    <table className="table text-nowrap text-center ">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fatura</th>
                                <th>Açıklama</th>
                                <th>Miktar</th>
                                <th>Oluşturulma Tarihi</th>
                                <th>Durum</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                expenseList.map((expense, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> {expense.id} </td>
                                            <td>
                                                <img
                                                    src={expense?.receiptUrl ? String(expense.receiptUrl) : 'https://lh4.googleusercontent.com/proxy/kX0otYkzacbwl936L9VnavuyJ7pX7mzAaJTVGOysJBK1HY2F8PrjfIEb-uXhsi6vwKajxYE3KkPbmrw'}
                                                    
                                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                    onClick={() => handleImageClick(expense.receiptUrl)}
                                                />
                                            </td>
                                            <td> {expense.description} </td>
                                            <td> {expense.amount} </td>
                                            <td> {formatDate(expense.expenseDate)} </td>
                                            <td>
                                                {
                                                    expense.status === 'PENDING' ? (
                                                        <>
                                                            <button className='btn btn-outline-warning'>Beklemede</button>
                                                        </>
                                                    ) : expense.status === 'APPROVED' ? (
                                                        <>
                                                            <button className='btn btn-success'>Onaylı</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button className='btn btn-danger'>İptal Edildi</button>
                                                        </>
                                                    )}
                                            </td>
                                            <td>
                                                {
                                                    !expense.receiptUrl && (
                                                        <button
                                                            className='btn btn-info'
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#uploadInvoiceModal"
                                                            onClick={() => { setExpenseId(expense.id) }}
                                                        >
                                                            Fatura Ekle
                                                        </button>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {/* Büyük Resim Modal */}
                    {
                        selectedImage && (
                            <div className="modal fade show d-block" tabIndex={-1} role="dialog" onClick={closeModal}
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Koyu gölge arkaplan
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 1050  // Modalın üst katmanda olmasını sağlar
                                }}
                            >
                                <div className="modal-dialog modal-lg  modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Fatura Görseli</h5>
                                            <button type="button" className="btn-close" onClick={closeModal}></button>
                                        </div>
                                        <div className="modal-body text-center">
                                            <div className="row">
                                                <img src={selectedImage} alt="Fatura" />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="modal fade bd-example-modal-lg" id="uploadInvoiceModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Fatura Ekleme</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>
                            <hr style={{ border: '1px black solid' }} />
                            <div className="modal-body">

                                <div className="row mt-4">
                                    <div className="row">
                                        <label className="form-label ms-3">Belge:</label>
                                        <input onChange={handleChange} type="file" className="form-control" />
                                    </div>
                                    <div className="row mt-4">
                                        <img src={file ? URL.createObjectURL(file) : ''} style={{ height: 500 }} />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpenseList