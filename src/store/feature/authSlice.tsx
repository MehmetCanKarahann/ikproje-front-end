import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import apis from "../../constant/RestApis"
import { IRegisterRequest } from "../../models/IRegisterRequest"
import state from "sweetalert/typings/modules/state"
import { IBaseResponse } from "../../models/IBaseResponse"
import swal from "sweetalert"
import { ILoginRequest } from "../../models/ILoginRequest"

interface IAuthState {
    isAuth: boolean,
    isLoginLoading: boolean,
    isRegisterLoading: boolean,
    isForgotPasswordByEmailLoading: boolean,
    isResetPasswordLoading: boolean
}

const initialAuthState: IAuthState = {
    isAuth: false,
    isLoginLoading: false,
    isRegisterLoading: false,
    isForgotPasswordByEmailLoading: false,
    isResetPasswordLoading: false
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

export const fetchForgotPasswordByEmail = createAsyncThunk(
    'auth/fetchForgotPasswordByEmail',
    async (email: string) => {
        const response = await fetch(apis.authService + '/forgot-password?email=' + email, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(data => data.json())
        return response;
    }
)


export const fetchResetPassword = createAsyncThunk(
    'auth/fetchResetPassword',
    async ({ token, password, rePassword }: { token: string; password: string; rePassword: string }) => {
        const response = await fetch(`${apis.authService}/reset-password?token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, rePassword }),
        }).then((data) => data.json());
        return response;
    }
);




const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        userLogout(state) {
            state.isAuth = false;
        },
        userLogin(state) {
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

            if (action.payload.code === 200) {
                localStorage.setItem('token', action.payload.data);
                state.isAuth = true;
            }
            else {
                swal('Hata!', action.payload.message, 'error');
            }
        })
        build.addCase(fetchForgotPasswordByEmail.pending, (state) => {
            state.isForgotPasswordByEmailLoading = true;
        })

        build.addCase(fetchForgotPasswordByEmail.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isForgotPasswordByEmailLoading = false;
            if (action.payload.code === 200) {
                swal('Başarı', action.payload.message, 'success');
            }
            else {
                swal('Hata!', action.payload.message, 'error');
            }
        })
        build.addCase(fetchResetPassword.pending, (state) => {
            state.isResetPasswordLoading = true
        })
        
        build.addCase(fetchResetPassword.fulfilled, (state, action) => {
            state.isResetPasswordLoading=false           
        })
    }
})
export const {
    userLogout, userLogin
} = authSlice.actions;
export default authSlice.reducer;