import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersonelProfile } from "../../models/IPersonelProfile";
import apis from "../../constant/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";

interface IEmployeeState {
    ispersonelProfileLoading: boolean,
    personelProfile: IPersonelProfile | null,
    isPersonelAvatarUploadLoading: boolean,
}

const initialPersonelState: IEmployeeState  = {
    ispersonelProfileLoading: false,
    personelProfile: null,
    isPersonelAvatarUploadLoading: false
}


export const fetcGetPersonelProfileByToken = createAsyncThunk(
    'employee/fetcGetPersonelProfileByToken',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.employeeService + '/get-personel-profile?token=' + token)
        .then(data => data.json());
    }
)

export const fetchAddAvatarToUser = createAsyncThunk(
    'employee/fetchAddAvatarToUser',
    async (file: File) => {
        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        formData.append("token", token);
        formData.append("file", file);

        const response = await fetch(apis.authService + '/update-user-avatar', {
            method: 'POST',
            body: formData
        }).then(data => data.json())
        return response;
    }
)

const employeeSlice = createSlice({
    name: 'employee',
    initialState: initialPersonelState,
    reducers: {},
    extraReducers: (build) =>  {
        build.addCase(fetcGetPersonelProfileByToken.pending, (state) => {
            state.ispersonelProfileLoading = true;
        })
        build.addCase(fetcGetPersonelProfileByToken.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.ispersonelProfileLoading = false;
            if(action.payload.code === 200){
                state.personelProfile = action.payload.data;
            }
        })
        build.addCase(fetchAddAvatarToUser.pending, (state) => {
            state.isPersonelAvatarUploadLoading = true;
        })
        build.addCase(fetchAddAvatarToUser.fulfilled, (state) => {
            state.isPersonelAvatarUploadLoading = false;
        })
    }
})

export default employeeSlice.reducer;