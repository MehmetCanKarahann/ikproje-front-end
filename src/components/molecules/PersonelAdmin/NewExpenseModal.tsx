import React, { useState } from 'react'
import { IPersonelNewExpenseRequest } from '../../../models/IPersonelNewExpenceRequest';
import { useDispatch } from 'react-redux';
import { IKDispatch } from '../../../store';
import { fetchGetPersonelExpenseList, fetchNewExpenseRequest } from '../../../store/feature/expenseSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewExpenseModal() {

    const dispatch = useDispatch<IKDispatch>();

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const formatAmount = (value: string) => {
        const numericValue = value.replace(/[^0-9.]/g, '');
        const parts = numericValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (parts.length > 2) {
            parts[1] = parts.slice(1).join('');
        }
        return parts.join('.');
    };

    const handleAmountChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = evt.target.value;
        const formattedValue = formatAmount(rawValue);
        setAmount(formattedValue);
    };

    const submit = () => {

        const token = localStorage.getItem('token') || '';

        const expenseModel: IPersonelNewExpenseRequest = {
            token: token,
            amount: parseFloat(amount.replace(/,/g, '')),
            description: description,
            file: null
        }

        dispatch(fetchNewExpenseRequest(expenseModel)).then(data => {
            if (data.payload.code === 200) {
                toast.success("Harcama Oluşturma İşleminiz Başarılı!", {
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

    return (
        <>
            <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#newPersonelExpenseModal"> Yeni Harcama Ekle </button>
            <ToastContainer />
            <div className="modal fade bd-example-modal-xl" id="newPersonelExpenseModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Yeni Harcama Oluştur</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <hr style={{ border: '1px black solid' }} />
                        <div className="modal-body">

                            <div className="col mb-4 mt-5 text-start">
                                <label className='ms-4'>Miktar: </label>
                                <input type="text" className='form-control' value={amount} onChange={handleAmountChange} />
                            </div>

                            <div className="col mb-4 text-start">
                                <label className='ms-4'>Açıklama: </label>
                                <textarea className='form-control' onChange={evt => { setDescription(evt.target.value) }}></textarea>
                            </div>

                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={submit}>Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewExpenseModal