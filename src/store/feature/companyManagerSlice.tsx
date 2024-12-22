import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompanyManagementProfile } from "../../models/ICompanyManagementProfile";
import apis from "../../constant/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import { ICompanyManagerUpdateRequest } from "../../models/ICompanyManagerUpdateRequest";


interface ICompanyManagerState {
    isCompanyManagementProfileLoading: boolean,
    companyManagementProfile: ICompanyManagementProfile | null,
    isCompanyLogoLoading: boolean,
    isCompanyManagementUpdateProfileLoading: boolean
}

const initialCompanyManagerState: ICompanyManagerState = {
    isCompanyManagementProfileLoading: false,
    companyManagementProfile: null,
    isCompanyLogoLoading: false,
    isCompanyManagementUpdateProfileLoading: false
}


//fetch işlemleri

//Şirket Yöneticisinin Tüm Bilgilerini Getirir.
export const fetchGetCompanyManagerProfileByToken = createAsyncThunk(
    'companyManagement/fetchGetCompanyManagerProfileByToken',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.companyManagementService + '/get-company-manager-profile?token=' + token)
            .then(data => data.json());
    }
)


//şirket logosu eklemek için kullanılıyor.
export const fetchAddLogoToCompany = createAsyncThunk(
    'companyManagement/fetchAddLogoToCompany',
    async (file: File) => {
        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        formData.append("token", token);
        formData.append("file", file);

        const response = await fetch(apis.companyManagementService + '/update-company-logo', {
            method: 'POST',
            body: formData
        }).then(data => data.json())
        return response;
    }
)

//Şirket Yöneticisi Bilgilerini Güncelleme Metodu
export const fetchUpdateCompanyManagerProfile = createAsyncThunk(
    'user/fetchUpdateCompanyManagerProfile',
    async (payload: ICompanyManagerUpdateRequest) => {
        return await fetch(apis.companyManagementService + "/update-company-manager-profile", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)


const companyManagementSlice = createSlice({
    name: 'companyManagement',
    initialState: initialCompanyManagerState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchGetCompanyManagerProfileByToken.pending, (state) => {
            state.isCompanyManagementProfileLoading = true;
        })
        build.addCase(fetchGetCompanyManagerProfileByToken.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isCompanyManagementProfileLoading = false;
            if (action.payload.code === 200) {
                state.companyManagementProfile = action.payload.data;
            }
        })
        build.addCase(fetchAddLogoToCompany.pending, (state) => {
            state.isCompanyLogoLoading = true;
        })
        build.addCase(fetchAddLogoToCompany.fulfilled, (state) => {
            state.isCompanyLogoLoading = false;
        })
        build.addCase(fetchUpdateCompanyManagerProfile.pending, (state) => {
            state.isCompanyManagementUpdateProfileLoading = true;
        })
        build.addCase(fetchUpdateCompanyManagerProfile.fulfilled, (state, action) => {
            state.isCompanyManagementUpdateProfileLoading = false;
        })
        
    }
})

export default companyManagementSlice.reducer;
