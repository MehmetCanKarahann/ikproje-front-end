import React, { useState } from 'react'
import { IKDispatch, IKUseSelector } from '../../../store'
import { useDispatch } from 'react-redux';
import { fetchApproveAsset, fetchGetPersonelAssetList, fetchRejectAsset } from '../../../store/feature/assetSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PersonelAssetList() {

    const personelAssetList = IKUseSelector(state => state.assetSlice.personelAssetList);

    const [asset1, setAsset] = useState<any>(null);
    

    const [rejectMessage, setRejectionMessage] = useState('');
    const [isRejectionMessageEmpty, setIsRejectionMessageEmpty] = useState(false);
    const [assetId, setAssetId] = useState(0);

    const dispatch = useDispatch<IKDispatch>();


    const handleOpenModal = (selectedAsset: any) => {
   
        setAsset(selectedAsset);
    }

    const submit = (assetId: number) => {
        dispatch(fetchApproveAsset({ assetId })).then(data => {
            if (data.payload.code === 200) {
                toast.success("Zimmet Onaylama İşleminiz Başarılı!", {
                    position: "top-right"
                });
                dispatch(fetchGetPersonelAssetList())
            }
            else {
                toast.warning(data.payload.message, {
                    position: "top-right"
                });
            }
        })

    }

    const rejectAsset = () => {
        setIsRejectionMessageEmpty(rejectMessage === '');

        if(rejectMessage !== '' && assetId){
            dispatch(fetchRejectAsset({assetId, rejectMessage})).then(data => {
                if(data.payload.code === 200){
                    toast.success("Zimmet Reddetme İşleminiz Başarılı!", {
                        position: "top-right"
                    });
                    dispatch(fetchGetPersonelAssetList())
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
        <>
            <div className="col">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <h5 className='mt-2'>Zimmet Listesi</h5>
                        </div>
                        <ToastContainer />
                    </div>
                    <div className="card-body table-responsive p-0 mb-5">
                        <table className="table text-nowrap text-center ">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Zimmet Adı</th>
                                    <th>Açıklaması</th>
                                    <th>Verilme Tarihi</th>
                                    <th>Durum</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    personelAssetList.map((asset, index) => {
                                        return (
                                            <tr key={index}>
                                                <td> {asset.id} </td>
                                                <td> {asset.assetType} </td>
                                                <td>
                                                    {asset.description.length > 10
                                                        ? asset.description.slice(0, 10) + "..."
                                                        : asset.description}
                                                </td>
                                                <td> {asset.givenDate} </td>
                                                <td> {asset.status} </td>
                                                <td>
                                                    {asset.status === 'PENDING' ? (
                                                        <>
                                                            <button className='btn btn-success me-2' data-bs-toggle="modal" data-bs-target="#approveAssetInfoModal" onClick={() => { handleOpenModal(asset) }}>
                                                                Onayla
                                                            </button>
                                                            <button className='btn btn-danger'  data-bs-toggle="modal" data-bs-target="#rejectAssetModal" onClick={() => { setAssetId(asset.id) }}>Reddet</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button className='btn btn-info'>Onaylı</button>
                                                        </>
                                                    )}

                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal fade bd-example-modal-lg" id="approveAssetInfoModal" aria-labelledby="exampleModalLabel" >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="approveAssetInfoModal">Zimmet Bilgileri</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>
                            <hr style={{ border: '1px black solid' }} />
                            <div className="modal-body m-3">
                                <div className="row mt-4 mb-4">
                                    <label className='form-label'>Zimmet Adı: </label>
                                    <select disabled className='form-select p-3' value={asset1?.assetType} style={{ borderRadius: '30px' }}>
                                        <option selected>Zimmet Türünü Seçiniz</option>
                                        <option value='PHONE'>Telefon</option>
                                        <option value='LAPTOP'>Bilgisayar</option>
                                        <option value='MONITOR'>Monitor</option>
                                        <option value='FURNITURE'>Mobilya</option>
                                        <option value='ACCESSORY'>Aksesuar</option>
                                        <option value='PRINTER'>Yazıcı</option>
                                        <option value='STATIONERY'>Kırtasiye</option>
                                    </select>
                                </div>
                                <div className="row mb-4">
                                    <label className='form-label'>Yönetici: </label>
                                    <input readOnly type='text' className='form-control' value={asset1?.assetGiver} ></input>
                                </div>
                                <div className="row mb-4">
                                    <label className='form-label'>Açıklama: </label>
                                    <textarea readOnly className='form-control' value={asset1?.description}></textarea>
                                </div>
                            </div>
                            <hr />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => { submit(asset1?.id) }} data-bs-dismiss="modal">Onayla</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="modal fade bd-example-modal-lg" id="rejectAssetModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="rejectAssetModal">Zimmet Reddet</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <hr style={{ border: '1px black solid' }} />
                        <div className="modal-body">
                            <div className="row mt-4 mb-5">
                                <label className='form-label'>Açıklama: <span style={{ color: 'red' }}> *</span></label>
                                <textarea className='form-control' onChange={evt => { setRejectionMessage(evt.target.value) }}></textarea>
                            </div>
                            {
                                isRejectionMessageEmpty
                                && <div className='alert alert-warning'>Lütfen *  İle İşaretli Alanları Boş Bırakmayınız...</div>

                            }
                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={rejectAsset}>Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default PersonelAssetList