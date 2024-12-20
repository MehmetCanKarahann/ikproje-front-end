import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserProfile } from "../../models/IUserProfile";
import apis from "../../constant/RestApis";
import { data } from "react-router-dom";
import state from "sweetalert/typings/modules/state";
import { IBaseResponse } from "../../models/IBaseResponse";
import swal from "sweetalert";
import { ICompanyManagementProfile } from "../../models/ICompanyManagementProfile";
import { create } from "domain";
import { ICompanyManagerUpdateRequest } from "../../models/ICompanyManagerUpdateRequest";

interface IUserState{
    isProfileLoading: boolean,
    isForgotPasswordByEmailLoading: boolean,
    isCompanyManagementProfileLoading: boolean,
    isResetPasswordLoading: boolean,
    companyManagementProfile: ICompanyManagementProfile | null,
    isCompanyLogoLoading: boolean,
    isCompanyManagementUpdateProfileLoading: boolean
}

const initialUserState: IUserState = {
    isProfileLoading: false,
    isForgotPasswordByEmailLoading: false,
    isCompanyManagementProfileLoading: false,
    isResetPasswordLoading: false,
    companyManagementProfile: null,
    isCompanyLogoLoading: false,
    isCompanyManagementUpdateProfileLoading: false
}

//fetch işlemleri
export const fetchGetCompanyManagerProfileByToken = createAsyncThunk(
    'user/fetchGetCompanyManagerProfileByToken',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.userService + '/get-company-manager-profile?token='+token)
        .then(data => data.json());
    }
)


export const fetchForgotPasswordByEmail = createAsyncThunk(
    'user/fetchForgotPasswordByEmail',
    async (email: string) => {
        const response = await fetch(apis.userService + '/forgot-password?email='+email, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
           
        }).then(data => data.json())
        return response;
    }
)

export const fetchResetPassword = createAsyncThunk(
    'user/fetchResetPassword',
    async ({ token, password, rePassword }: { token: string; password: string; rePassword: string }) => {
        const response = await fetch(`${apis.userService}/reset-password?token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, rePassword }),
        }).then((data) => data.json());
        return response;
    }
);

//şirket logosu eklemek için kullanılıyor.
export const fetchAddLogoToCompany = createAsyncThunk(
    'user/fetchAddLogoToCompany',
    async (file: File) => {
        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        formData.append("token", token);
        formData.append("file", file);

        const response = await fetch(apis.userService + '/update-company-logo', {
            method: 'POST',
            body: formData
        }).then(data => data.json())
        return response;
    }
)

export const fetchUpdateCompanyManagerProfile = createAsyncThunk(
    'user/fetchUpdateCompanyManagerProfile',
    async (payload: ICompanyManagerUpdateRequest) => {
        return await fetch(apis.userService + "/update-company-manager-profile", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchGetCompanyManagerProfileByToken.pending, (state) => {
            state.isCompanyManagementProfileLoading = true;
        })
        build.addCase(fetchGetCompanyManagerProfileByToken.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isCompanyManagementProfileLoading = false;
            if(action.payload.code === 200){
                state.companyManagementProfile = action.payload.data;
                console.log(state.companyManagementProfile);
            }
        })
        build.addCase(fetchForgotPasswordByEmail.pending, (state) => {
            state.isForgotPasswordByEmailLoading = true;
        })
        build.addCase(fetchForgotPasswordByEmail.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isForgotPasswordByEmailLoading = false;
            if(action.payload.code === 200){
                swal('Başarı', action.payload.message, 'success');
            }
            else{
                swal('Hata!', action.payload.message, 'error');
            }
        })
        build.addCase(fetchAddLogoToCompany.pending, (state) => {
            state.isCompanyLogoLoading = true;
        })
        build.addCase(fetchAddLogoToCompany.fulfilled, (state, action) => {
            state.isCompanyLogoLoading = false;
        })
        build.addCase(fetchUpdateCompanyManagerProfile.pending, (state) => {
            state.isCompanyManagementUpdateProfileLoading = true;
        })
        build.addCase(fetchUpdateCompanyManagerProfile.fulfilled, (state, action) => {
            state.isCompanyManagementUpdateProfileLoading = false;
        })
        build.addCase(fetchResetPassword.pending, (state)=>{
            state.isResetPasswordLoading = true
        })
        build.addCase(fetchResetPassword.fulfilled, (state, action: PayloadAction<IBaseResponse>) =>{
            state.isResetPasswordLoading=false           
        })
    }
})

export default userSlice.reducer;