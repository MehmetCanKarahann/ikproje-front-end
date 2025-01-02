import React, { useEffect } from 'react'
import SideBar from '../../components/molecules/PersonelAdmin/SideBar'
import Header from '../../components/molecules/PersonelAdmin/Header'
import PersonelAssetList from '../../components/organisms/PersonelAdmin/PersonelAssetList'
import { useDispatch } from 'react-redux'
import { IKDispatch } from '../../store'
import { fetchGetPersonelAssetList } from '../../store/feature/assetSlice'

function PersonelAssetListPage() {

    const dispatch = useDispatch<IKDispatch>();

    useEffect(() => {
        dispatch(fetchGetPersonelAssetList());
    }, [])

    return (
        <>

            <div className='loader'>
                <div className='spinner-grow text-primary' role='status'>
                    <span className='sr-only'>Loading...</span>
                </div>
            </div>

            <div className="connect-container align-content-stretch d-flex flex-wrap">
                <div className="page-sidebar">
                    <SideBar />
                </div>
                <div className="page-container">
                    <div className="page-header" >
                        <Header />
                    </div>
                    <div className="page-content">
                        <div className="row">
                            <PersonelAssetList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonelAssetListPage