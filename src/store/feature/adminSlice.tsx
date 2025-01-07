import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAdminLoginRequest } from "../../models/IAdminLoginRequest"
import apis from "../../constant/RestApis"
import { IBaseResponse } from "../../models/IBaseResponse"
import swal from "sweetalert"
import { IUnapprovedCompaniesResponse } from "../../models/IUnapprovedCompaniesResponse"
import { IDashboardCompanyListResponse } from "../../models/IDashboardCompanyListResponse"

interface IAdminState{
    isAuth: boolean,
    isLoginLoading: boolean,
    unapprovedCompanyList: IUnapprovedCompaniesResponse[]
    isUnapprovedCompanyListLoading: boolean,
    isCompanyAccountApproveLoading: boolean,
    isCompanyAccountRejectLoading: boolean,
    isCompanyCountLoading: boolean,
    companyCount: number,
    isEmployeeCountLoading: boolean,
    employeeCount: number,
    isDashboardCompanyListLoading: boolean,
    dashboardCompanyList: IDashboardCompanyListResponse[]
}

const initialAdminState: IAdminState = {
    isAuth: false,
    isLoginLoading: false,
    unapprovedCompanyList: [],
    isUnapprovedCompanyListLoading: false,
    isCompanyAccountApproveLoading: false,
    isCompanyAccountRejectLoading: false,
    isCompanyCountLoading: false,
    companyCount: 0,
    isEmployeeCountLoading: false,
    employeeCount: 0,
    isDashboardCompanyListLoading: false,
    dashboardCompanyList: []
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
        return await fetch(`${apis.adminService}/approve-account?userId=${userId}&confirmationMessage=${confirmationMessage}`, {
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
        return await fetch(`${apis.adminService}/reject-account?userId=${userId}&rejectionMessage=${rejectionMessage}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json())
    }
)

//aktif şirket sayısını getirir.
export const fetchGetCompanyCount = createAsyncThunk(
    'admin/fetchGetCompanyCount',
    async () => {
        const token = localStorage.getItem('adminToken');
        return await fetch(apis.adminService + '/company-count', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json());
    }
)

//aktif personel sayısını getirir.
export const fetchGetEmployeeCount = createAsyncThunk(
    'admin/fetchGetEmployeeCount',
    async () => {
        const token = localStorage.getItem('adminToken');
        return await fetch(apis.adminService + '/employee-count', {
            method: 'GET',
            headers: {
                 'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json());
    }
)

//üyeliği bitmek üzere olan şirketler listesini getirir.
export const fetchGetCompaniesWithExpiringMemberships = createAsyncThunk(
    'admin/fetchGetCompaniesWithExpiringMemberships',
    async () => {
        const token = localStorage.getItem('adminToken');
        return await fetch(apis.adminService + '/expiring-memberships', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
           }
        }).then(data => data.json());
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
        build.addCase(fetchGetCompanyCount.pending, (state) => {
            state.isCompanyCountLoading = true;
        })
        build.addCase(fetchGetCompanyCount.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isCompanyCountLoading = false;
            if(action.payload.code === 200){
                state.companyCount = action.payload.data;
            }
        })
        build.addCase(fetchGetEmployeeCount.pending, (state) => {
            state.isEmployeeCountLoading = true;
        })
        build.addCase(fetchGetEmployeeCount.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isEmployeeCountLoading= false;
            if(action.payload.code === 200){
                state.employeeCount = action.payload.data;
            }
        })
        build.addCase(fetchGetCompaniesWithExpiringMemberships.pending, (state) => {
            state.isDashboardCompanyListLoading = true;
        })
        build.addCase(fetchGetCompaniesWithExpiringMemberships.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isDashboardCompanyListLoading = false;
            if(action.payload.code === 200){
                state.dashboardCompanyList = action.payload.data;
            }
        })
    }
})

export const{
    userAdminLogout, userAdminLogin
} = adminSlice.actions;

export default adminSlice.reducer;