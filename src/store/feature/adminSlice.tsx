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
    isUnapprovedCompanyListLoading: boolean
}

const initialAdminState: IAdminState = {
    isAuth: false,
    isLoginLoading: false,
    unapprovedCompanyList: [],
    isUnapprovedCompanyListLoading: false
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
            headers: {
                'Authorization': 'Bearer ' + token,
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
    }
})

export const{
    userAdminLogout, userAdminLogin
} = adminSlice.actions;

export default adminSlice.reducer;