import React, { useEffect } from 'react'
import NewAssetModal from '../molecules/CompanyAdmin/NewAssetModal'
import { useDispatch } from 'react-redux'
import { IKDispatch, IKUseSelector } from '../../store'
import { fetchGetPersonelListByCompanyId } from '../../store/feature/userShiftSlice';
import { fetchGetAssetListOfCompany } from '../../store/feature/assetSlice';

function AssetList() {

  
    const assetList = IKUseSelector(state => state.assetSlice.assetList);
   

    return (
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <h5 className='mt-2'>Zimmet Listesi</h5>
                        </div>
                        <div className="col-6 text-end">
                            <NewAssetModal />
                        </div>
                    </div>
                </div>
                <div className="card-body table-responsive p-0 mb-5">
                    <table className="table text-nowrap text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Zimmet Türü</th>
                                <th>Açıklama</th>
                                <th>Personel Ad Soyad</th>
                                <th>Verilme Tarihi</th>
                            
                                <th>Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                assetList.map((asset, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> {asset.id} </td>
                                            <td> {asset.assetType} </td>
                                            <td> {asset.description} </td>
                                            <td> {asset.assetOwner} </td>
                                            <td> {asset.givenDate} </td>
                                         
                                            <td> {asset.status === 'PENDING' ? (
                                                <>
                                                    <button className='btn btn-warning'>Beklemede</button>
                                                </>
                                            ): (
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
        </div>
    )
}

export default AssetList