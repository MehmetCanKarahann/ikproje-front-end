import React, { useState } from 'react'
import { IKDispatch, IKUseSelector } from '../../../store'
import { INewPersonelAssetRequest } from '../../../models/INewPersonelAssetRequest';
import { useDispatch } from 'react-redux';
import { fetchAssignNewAsset, fetchGetAssetListOfCompany } from '../../../store/feature/assetSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewAssetModal() {

    const personelList = IKUseSelector(state => state.userShiftSlice.personelListByCompanyId);

    const dispatch = useDispatch<IKDispatch>();

    const [personelId, setPersonelId] = useState(0);
    const [assetType, setAssetType] = useState('');
    const [description, setDescription] = useState('');

    const handlePersonelChange = (evt: any) => {
        setPersonelId(evt.target.value);
    }

    const submit = () => {

        const token = localStorage.getItem('token') || '';

        const assetModel: INewPersonelAssetRequest = {
            token: token,
            personalId: personelId,
            assetType: assetType,
            description: description
        }

        

        dispatch(fetchAssignNewAsset(assetModel)).then(data => {
            if (data.payload.code === 200) {
                toast.success("Zimmet Oluşturma İşleminiz Başarılı!", {
                    position: "top-right"
                });
                dispatch(fetchGetAssetListOfCompany());
                setPersonelId(0);
                setAssetType('');
                setDescription('');
            }
            else {
                toast.warning(data.payload.message ,{
                    position: "top-right"
                });
            }
        })
    }

    return (
        <>
            <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#newAssetModal">Zimmet Ataması Yap</button>
            <ToastContainer />
            <div className="modal fade bd-example-modal-xl" id="newAssetModal" >
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="newAssetModal">Personel Zimmet Atama</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <hr style={{ border: '1px black solid' }} />
                        <div className="modal-body">

                            <div className="col mb-4 mt-5 text-start">
                                <label className='ms-4'>Personel: </label>
                                <select className='form-select mb-2 p-3 mt-2' onChange={handlePersonelChange} style={{ borderRadius: '30px' }}>
                                    <option value="">Personel Seçiniz</option>
                                    {personelList.map(personel => (
                                        <option key={personel.id} value={personel.id}>
                                            {personel.firstName} {personel.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col mb-4 text-start">
                                <label className='ms-4'>Zimmet: </label>
                                <select className='form-select mb-3 p-3' onChange={evt => { setAssetType(evt.target.value) }} style={{ borderRadius: '30px' }}>
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
                            <div className="col mb-4 text-start">
                                <label className='ms-4'>Açıklama: </label>
                                <textarea className='form-control' onChange={evt => { setDescription(evt.target.value) }}></textarea>
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

export default NewAssetModal