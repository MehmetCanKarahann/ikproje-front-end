import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { IKDispatch } from '../../../store';
import { fetchCreateComment, fetchGetComments, fetchGetCommentsByCompanyId } from '../../../store/feature/commentSlice';
import { toast, ToastContainer } from 'react-toastify';

function NewCommentModal() {

    const dispatch = useDispatch<IKDispatch>();

    const [file, setFile] = useState<File | null>(null);
    const [content, setContent] = useState('');

    const handleChange = (evt: any) => {
        const selectedFile = evt.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    }

    const submit = () => {

        if(file){
            dispatch(fetchCreateComment({content, file})).then(data => {
                if(data.payload.code === 200){
                    toast.success('Yorum Kaydetme İşleminiz Başarılı...',{
                        position: 'top-right'
                    });
                    dispatch(fetchGetCommentsByCompanyId())
                }
                else {
                    toast.warning(data.payload.message, {
                        position: 'top-right'
                    });
                }
            })
        }
        else{
            toast.warning('Dosya seçilmedi!', {
                position: 'top-right'
            });
        }
    }


    return (
        <>
            <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#newCommentModal">Yeni Yorum Ekle</button>
            <ToastContainer />
            <div className="modal fade bd-example-modal-xl" id="newCommentModal" aria-labelledby="newCommentModal" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="newCommentModal">Yeni Yorum Oluştur</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <hr style={{ border: '1px black solid' }} />
                        <div className="modal-body">

                            <div className="col mb-4 mt-5 text-start">
                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <label className="form-label ms-3">Resminiz:</label>
                                        <input onChange={handleChange} type="file" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <img src={file ? URL.createObjectURL(file) : ''} style={{ width: 250, height: 200 }} />
                                    </div>
                                </div>

                            </div>
                            <div className="col mb-4  text-start">
                                <label className='ms-4'>İçerik: </label>
                                <textarea className='form-control' onChange={evt => { setContent(evt.target.value) }}></textarea>
                            </div>
                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={submit} >Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewCommentModal