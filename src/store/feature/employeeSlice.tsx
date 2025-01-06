import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersonelProfile } from "../../models/IPersonelProfile";
import apis from "../../constant/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import { IUpdatePersonelProfileRequest } from "../../models/IUpdatePersonelProfileRequest";

interface IEmployeeState {
    ispersonelProfileLoading: boolean,
    personelProfile: IPersonelProfile | null,
    isPersonelAvatarUploadLoading: boolean,
    isPersonelProfileUpdateLoading: boolean
}

const initialPersonelState: IEmployeeState = {
    ispersonelProfileLoading: false,
    personelProfile: null,
    isPersonelAvatarUploadLoading: false,
    isPersonelProfileUpdateLoading: false
}

//personel profil bilgilerini getirir.
export const fetchGetPersonelProfileByToken = createAsyncThunk(
    'employee/fetcGetPersonelProfileByToken',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.employeeService + '/get-personel-profile?token=' + token, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(data => data.json());
    }
)

//personel profil bilgilerini günceller.
export const fetchUpdatePersonelProfile = createAsyncThunk(
    'employee/fetchUpdatePersonelProfile',
    async (payload: IUpdatePersonelProfileRequest) => {
        const token = localStorage.getItem('token');
        return await fetch(apis.employeeService + '/update-personel-profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }).then(data => data.json());
    }
)

//personel profil resmini günceller.
export const fetchAddAvatarToUser = createAsyncThunk(
    'employee/fetchAddAvatarToUser',
    async (file: File) => {
        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        formData.append("token", token);
        formData.append("file", file);

        const response = await fetch(apis.authService + '/update-user-avatar', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json())
        return response;
    }
)

const employeeSlice = createSlice({
    name: 'employee',
    initialState: initialPersonelState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchGetPersonelProfileByToken.pending, (state) => {
            state.ispersonelProfileLoading = true;
        })
        build.addCase(fetchGetPersonelProfileByToken.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.ispersonelProfileLoading = false;
            if (action.payload.code === 200) {
                state.personelProfile = action.payload.data;

            }
        })
        build.addCase(fetchAddAvatarToUser.pending, (state) => {
            state.isPersonelAvatarUploadLoading = true;
        })
        build.addCase(fetchAddAvatarToUser.fulfilled, (state) => {
            state.isPersonelAvatarUploadLoading = false;
        })
        build.addCase(fetchUpdatePersonelProfile.pending, (state) => {
            state.isPersonelProfileUpdateLoading = true;
        })
        build.addCase(fetchUpdatePersonelProfile.fulfilled, (state) => {
            state.isPersonelProfileUpdateLoading = false;
        })
    }
})

export default employeeSlice.reducer;