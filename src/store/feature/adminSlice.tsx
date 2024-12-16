import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAdminLoginRequest } from "../../models/IAdminLoginRequest"
import apis from "../../constant/RestApis"
import { IBaseResponse } from "../../models/IBaseResponse"
import swal from "sweetalert"

interface IAdminState{
    isAuth: boolean,
    isLoginLoading: boolean
}

const initialAdminState: IAdminState = {
    isAuth: false,
    isLoginLoading: false
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
    }
})

export const{
    userAdminLogout, userAdminLogin
} = adminSlice.actions;

export default adminSlice.reducer;