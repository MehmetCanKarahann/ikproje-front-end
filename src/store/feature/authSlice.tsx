import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import apis from "../../constant/RestApis"
import { IRegisterRequest } from "../../models/IRegisterRequest"
import state from "sweetalert/typings/modules/state"
import { IBaseResponse } from "../../models/IBaseResponse"
import swal from "sweetalert"
import { ILoginRequest } from "../../models/ILoginRequest"
import { stat } from "fs"

const initialAuthState = {
    isAuth: false,
    isLoginLoading: false,
    isRegisterLoading: false
}

//fetch işlemleri
export const fecthRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (payload: IRegisterRequest) => {
        return await fetch(apis.authService + '/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)

        }).then(data => data.json())

    }
)

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (payload: ILoginRequest) => {
        const response = await fetch(
            apis.authService + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
        return response;
    }
)



const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        userLogout(state){
            state.isAuth = false;   
        },
        userLogin(state){
            state.isAuth = true;
        }
    },
    extraReducers: (build) => {
        build.addCase(fecthRegister.pending, (state) => {
            state.isRegisterLoading = true;
        })
        build.addCase(fecthRegister.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isRegisterLoading = false;

            if (action.payload.code === 200) {
                swal('Başarılı!', 'Üyelik işlemi başarı ile tamamlanmıştır', 'success');
            }
            else {
                swal('Hata!', action.payload.message, 'error');
            }
        })
        build.addCase(fetchLogin.pending, (state) => {
            state.isLoginLoading = true;
        })
        build.addCase(fetchLogin.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isLoginLoading = false;

            if(action.payload.code === 200){
                localStorage.setItem('token', action.payload.data);
                state.isAuth = true;
            }
            else {
                swal('Hata!', action.payload.message, 'error');
            }
        })
    }
})
export const{
    userLogout, userLogin
} = authSlice.actions;
export default authSlice.reducer;