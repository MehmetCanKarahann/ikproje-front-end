import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { INewPersonelAssetRequest } from "../../models/INewPersonelAssetRequest"
import apis from "../../constant/RestApis"
import { IAssetListResponse } from "../../models/IAssetListResponse"
import { IBaseResponse } from "../../models/IBaseResponse"

interface IAssetState {
    isNewAssetLoading: boolean,
    isAssetListLoading: boolean
    assetList: IAssetListResponse[],
    isPersonelAssetListLoading: boolean,
    personelAssetList: IAssetListResponse[],
    isPersonelApproveAssetLoading: boolean,
    isPersonelRejectAssetLoading: boolean
}

const initialAssetState: IAssetState = {
    isNewAssetLoading: false,
    isAssetListLoading: false,
    assetList: [],
    isPersonelAssetListLoading: false,
    personelAssetList: [],
    isPersonelApproveAssetLoading: false,
    isPersonelRejectAssetLoading: false
}

//fetch işlemleri

//personele yeni bir zimmet ataması yapar.
export const fetchAssignNewAsset = createAsyncThunk(
    'asset/fetchAssignNewAsset',
    async (payload: INewPersonelAssetRequest) => {
        return await fetch(apis.assetService + '/assign-new-asset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)

//şirket yöneticisi personellere atadığı tüm zimmetleri görüntüler.
export const fetchGetAssetListOfCompany = createAsyncThunk(
    'asset/fetchGetAssetListOfCompany',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.assetService + '/get-assets-of-company?token=' + token)
            .then(data => data.json());
    }
)

//personel zimmet listesini getirir.
export const fetchGetPersonelAssetList = createAsyncThunk(
    'asset/fetchGetPersonelAssetList',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.assetService + '/get-personel-assets?token=' + token)
            .then(data => data.json());
    }
)

//personel kendisine atanan zimmeti burdan onaylar.
export const fetchApproveAsset = createAsyncThunk(
    'asset/fetchApproveAsset',
    async ({ assetId }: { assetId: number }) => {
        const token = localStorage.getItem('token');
        return await fetch(`${apis.assetService}/approve-asset?token=${token}&assetId=${assetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json());
    }
)

export const fetchRejectAsset = createAsyncThunk(
    'asset/fetchRejectAsset',
    async ({assetId, rejectMessage}: {assetId: number, rejectMessage: string}) => {
        const token = localStorage.getItem('token');
        return await fetch(`${apis.assetService}/reject-asset?token=${token}&assetId=${assetId}&rejectMessage=${rejectMessage}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json());
    }
)

const assetSlice = createSlice({
    name: 'asset',
    initialState: initialAssetState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchAssignNewAsset.pending, (state) => {
            state.isNewAssetLoading = true;
        })
        build.addCase(fetchAssignNewAsset.fulfilled, (state) => {
            state.isNewAssetLoading = false;
        })
        build.addCase(fetchGetAssetListOfCompany.pending, (state) => {
            state.isAssetListLoading = true;
        })
        build.addCase(fetchGetAssetListOfCompany.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isAssetListLoading = false;
            if (action.payload.code === 200) {
                state.assetList = action.payload.data;
            }
        })
        build.addCase(fetchGetPersonelAssetList.pending, (state) => {
            state.isPersonelAssetListLoading = true;
        })
        build.addCase(fetchGetPersonelAssetList.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isPersonelAssetListLoading = false;
            if (action.payload.code === 200) {
                state.personelAssetList = action.payload.data;
            }
        })
        build.addCase(fetchApproveAsset.pending, (state) => {
            state.isPersonelApproveAssetLoading = true;
        })
        build.addCase(fetchApproveAsset.fulfilled, (state) => {
            state.isPersonelApproveAssetLoading = false;
        })
        build.addCase(fetchRejectAsset.pending, (state) => {
            state.isPersonelRejectAssetLoading = true;
        })
        build.addCase(fetchRejectAsset.fulfilled, (state) => {
            state.isPersonelRejectAssetLoading = false;
        })
    }
})

export default assetSlice.reducer