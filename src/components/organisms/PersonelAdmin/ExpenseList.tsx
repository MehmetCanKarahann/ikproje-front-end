import React, { useState } from 'react'
import NewExpenseModal from '../../molecules/PersonelAdmin/NewExpenseModal'
import { IKDispatch, IKUseSelector } from '../../../store'
import { useDispatch } from 'react-redux';
import { fetchGetPersonelExpenseList, fetchUpdateExpense, fetchUploadReceipt } from '../../../store/feature/expenseSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from '../../../img/resim-yok.png';
import { IUpdateExpenseRequest } from '../../../models/IUpdateExpenseRequest';

function ExpenseList() {

    const expenseList = IKUseSelector(state => state.expenseSlice.expenseList);

    const dispatch = useDispatch<IKDispatch>();

    const [expenseId, setExpenseId] = useState(0);
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState('');

    //number içerebilir hatası verdiği için bu şekilde tanımladım.
    const [receiptUrl, setReceiptUrl] = useState<string | number>(''); 

    const [file, setFile] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null); //tablodan seçili olan resim

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

    //modal kapandığında modal içerisini temizler. Tekrar açtığımızda seçtiğimiz resmi görmemize fayda sağlar.
    const closeModal = () => {
        setSelectedImage(null);
    }

    // const handleSubmit = () => { silinecek

    //     if (file) {
    //         dispatch(fetchUploadReceipt({ expenseId, file })).then(data => {
    //             if (data.payload.code === 200) {
    //                 toast.success("Fatura Yükleme İşleminiz Başarılı!", {
    //                     position: "top-right"
    //                 });
    //                 dispatch(fetchGetPersonelExpenseList());
    //             }
    //             else {
    //                 toast.warning(data.payload.message, {
    //                     position: "top-right"
    //                 });
    //             }
    //         })
    //     }
    // }

    const updateSubmit = () => {

        const token = localStorage.getItem('token') || '';

        const expenseModel: IUpdateExpenseRequest = {
            token: token,
            expenseId: expenseId,
            amount: amount,
            description: description
        }

        console.log(expenseModel);


        dispatch(fetchUpdateExpense(expenseModel)).then(data => {
            if (data.payload.code === 200) {
                toast.success("Fatura Güncelleme İşleminiz Başarılı! ", {
                    position: 'top-right'
                });
            }
            else {
                toast.warning(data.payload.warning, {
                    position: 'top-right'
                });
            }
        })

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
                                                            <button className='btn btn-outline-success'>Onaylı</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button className='btn btn-outline-danger'>İptal Edildi</button>
                                                        </>
                                                    )}
                                            </td>
                                            <td>
                                                {/* { Silinecek
                                                    !expense.receiptUrl && (
                                                        <button
                                                            className='btn btn-info me-2'
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#uploadInvoiceModal"
                                                            onClick={() => { setExpenseId(expense.id) }}
                                                        >
                                                            <i className="fa-solid fa-plus"></i>
                                                        </button>
                                                    )
                                                } */}
                                                {
                                                    expense.status === 'PENDING' && (
                                                        <>
                                                            <button className='btn btn-warning me-2' data-bs-toggle="modal" data-bs-target="#updateExpenseModal" onClick={() => {
                                                                setExpenseId(expense.id);
                                                                setAmount(expense?.amount);
                                                                setDescription(expense?.description);
                                                                setReceiptUrl(expense?.receiptUrl);
                                                            }} >
                                                                <i className="fa-solid fa-pen"></i>
                                                            </button>
                                                            <button className='btn btn-danger' >
                                                                <i className="fa-solid fa-trash"></i>
                                                            </button>
                                                        </>
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
                {/** Fatura yükleme modal   Silinecek  */  } 
                {/* <div className="modal fade bd-example-modal-lg" id="uploadInvoiceModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                </div> */}

                {/**Harcama Güncelleme Modal */}
                <div className="modal fade bd-example-modal-xl" id="updateExpenseModal">
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Harcama Güncelle</h1>
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
                                        <img src={file ? URL.createObjectURL(file) : String(receiptUrl) }  style={{ height: 500 }} />
                                    </div>
                                </div>

                                <div className="col mb-4 mt-5 text-start">
                                    <label className='ms-4'>Miktar: </label>
                                    <input type="text" className='form-control' onChange={evt => { setAmount(Number(evt.target.value)) }} value={amount} />
                                </div>
                                <div className="col mb-4  text-start">
                                    <label className='ms-4'>Açıklama: </label>
                                    <textarea className='form-control' onChange={evt => { setDescription(evt.target.value) }} value={description}></textarea>
                                </div>
                            </div>
                            <hr />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateSubmit}>Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpenseList