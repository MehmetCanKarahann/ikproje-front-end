import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAdminLoginRequest } from "../../models/IAdminLoginRequest"
import apis from "../../constant/RestApis"
import { IBaseResponse } from "../../models/IBaseResponse"
import swal from "sweetalert"
import { IUnapprovedCompaniesResponse } from "../../models/IUnapprovedCompaniesResponse"

interface IAdminState{
    isAuth: boolean,
    isLoginLoading: boolean,
    unapprovedCompanyList: IUnapprovedCompaniesResponse[]
    isUnapprovedCompanyListLoading: boolean,
    isCompanyAccountApproveLoading: boolean,
    isCompanyAccountRejectLoading: boolean
}

const initialAdminState: IAdminState = {
    isAuth: false,
    isLoginLoading: false,
    unapprovedCompanyList: [],
    isUnapprovedCompanyListLoading: false,
    isCompanyAccountApproveLoading: false,
    isCompanyAccountRejectLoading: false
}

export const fetchAdminLogin = createAsyncThunk(
    'admin/fetchAdminLogin',
    async (payload: IAdminLoginRequest) => {
        const response = await fetch(
            apis.adminService + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(data => data.json())
        return response;
    }
)

//onaylanmamış şirket listesini getirir.
export const fetchGetUnapprovedCompanies = createAsyncThunk(
    'admin/fetchGetUnapprovedCompanies',
    async () => {
        const token = localStorage.getItem('adminToken');
        return await fetch(apis.adminService + '/get-unapproved-companies', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(data => data.json())
    }
)

//şirket hesabını onaylama isteği
export const fetchApproveAccount = createAsyncThunk(
    'admin/fetchApproveAccount',
    async ({ userId, confirmationMessage }: {userId: number, confirmationMessage: string}) => {
        const token = localStorage.getItem('adminToken');
        return await fetch(`${apis.adminService}/approveAccount?userId=${userId}&confirmationMessage=${confirmationMessage}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json())
    }
)

//şirket hesabını reddetme isteği
export const fetchRejectAccount = createAsyncThunk(
    'admin/fetchRejectAccount',
    async ({userId, rejectionMessage}: {userId: number, rejectionMessage: string}) => {
        const token = localStorage.getItem('adminToken');
        return await fetch(`${apis.adminService}/rejectAccount?userId=${userId}&rejectionMessage=${rejectionMessage}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json())
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState: initialAdminState,
    reducers: {
        userAdminLogout(state){
            state.isAuth = false;   
        },
        userAdminLogin(state){
            state.isAuth = true;
        }
    },
    extraReducers: (build) => {
        build.addCase(fetchAdminLogin.pending, (state) => {
            state.isLoginLoading = true;
        })
        build.addCase(fetchAdminLogin.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isLoginLoading = false;

            if(action.payload.code === 200){
                localStorage.setItem('adminToken', action.payload.data);
                state.isAuth = true;
            }
            else {
                swal('Hata!', action.payload.message, 'error');
            }
        })
        build.addCase(fetchGetUnapprovedCompanies.pending, (state) => {
            state.isUnapprovedCompanyListLoading = true;
        })
        build.addCase(fetchGetUnapprovedCompanies.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isUnapprovedCompanyListLoading = false;
            if(action.payload.code === 200){
                state.unapprovedCompanyList = action.payload.data;
            }
        })
        build.addCase(fetchApproveAccount.pending, (state) => {
            state.isCompanyAccountApproveLoading = true;
        })
        build.addCase(fetchApproveAccount.fulfilled, (state) => {
            state.isCompanyAccountApproveLoading = false;
        })
        build.addCase(fetchRejectAccount.pending, (state) => {
            state.isCompanyAccountRejectLoading = true;
        })
        build.addCase(fetchRejectAccount.fulfilled, (state) => {
            state.isCompanyAccountRejectLoading = false;
        })
    }
})

export const{
    userAdminLogout, userAdminLogin
} = adminSlice.actions;

export default adminSlice.reducer;