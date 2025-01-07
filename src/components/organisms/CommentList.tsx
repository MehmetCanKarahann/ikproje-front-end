import React, { useEffect, useState } from 'react'
import NewCommentModal from '../molecules/CompanyAdmin/NewCommentModal'
import { IKDispatch, IKUseSelector } from '../../store'
import { useDispatch } from 'react-redux';
import { fetchDeleteComment, fetchGetCommentsByCompanyId, fetchUpdateComment } from '../../store/feature/commentSlice';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

function CommentList() {

    const commentList = IKUseSelector(state => state.commentSlice.commentListByCompanyId);

    const dispatch = useDispatch<IKDispatch>();

    const [file, setFile] = useState<File | null>(null);
    const [content, setContent] = useState('');
    const [managerPhoto, setManagerPhoto] = useState('');


    const handleChange = (evt: any) => {
        const selectedFile = evt.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    }

    const submit = () => {


        dispatch(fetchUpdateComment({ content, file })).then(data => {
            if (data.payload.code === 200) {
                toast.success('Yorum Güncelleme İşleminiz Başarılı...', {
                    position: 'top-right'
                });
                dispatch(fetchGetCommentsByCompanyId());
            }
            else {
                toast.warning(data.payload.message, {
                    position: 'top-right'
                });
            }
        })


    }

    const deleteComment = (commentId: number) => {
        swal({
            title: "Yorumunuzu Silmek istiyor Musunuz?",
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
                    dispatch(fetchDeleteComment({ commentId: commentId })).then(data => {
                        if (data.payload.code === 200) {
                            toast.success("Yorumunuz Başarılı Şekilde Silindi!", {
                                position: "top-right"
                            });
                            dispatch(fetchGetCommentsByCompanyId());
                        }
                        else {
                            toast.warning(data.payload.message, {
                                position: "top-right"
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
                        <div className="col-6">
                            <h5 className='mt-2'>Yorum Listesi</h5>
                        </div>
                        <div className="col-6 text-end">
                            <NewCommentModal />
                        </div>
                    </div>
                </div>
                <div className="card-body table-responsive p-0 mb-5">
                    <table className="table text-nowrap text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>İçerik</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                commentList.map((comment, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> {comment.id} </td>
                                            <td>
                                                {comment.content.length > 10
                                                    ? comment.content.slice(0, 10) + "..."
                                                    : comment.content}
                                            </td>
                                            <td>
                                                <button className='btn btn-warning me-2' data-bs-toggle="modal" data-bs-target="#updateCommentModal" onClick={() => {
                                                    setContent(commentList[index].content);
                                                    setManagerPhoto(commentList[index].managerPhoto);
                                                }}>
                                                    <i className="fa-solid fa-pen"></i>
                                                </button>
                                                <button className='btn btn-danger' onClick={() => { deleteComment(commentList[index].id) }}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal fade bd-example-modal-xl" id="updateCommentModal" aria-labelledby="updateCommentModal" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="updateCommentModal">Yeni Yorum Oluştur</h1>
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
                                        <img src={file ? URL.createObjectURL(file) : String(managerPhoto)} style={{ width: 250, height: 200 }} />
                                    </div>
                                </div>

                            </div>
                            <div className="col mb-4  text-start">
                                <label className='ms-4'>İçerik: </label>
                                <textarea className='form-control' onChange={evt => { setContent(evt.target.value) }} value={content}></textarea>
                            </div>
                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={submit}  >Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentList