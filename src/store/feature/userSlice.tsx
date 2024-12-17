import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserProfile } from "../../models/IUserProfile";
import apis from "../../constant/RestApis";
import { data } from "react-router-dom";
import state from "sweetalert/typings/modules/state";
import { IBaseResponse } from "../../models/IBaseResponse";

interface IUserState{
    profile: IUserProfile | null,
    isProfileLoading: boolean
}

const initialUserState: IUserState = {
    profile: null,
    isProfileLoading: false
}

export const fetchGetProfileByToken = createAsyncThunk(
    'user/fetchGetProfileByToken',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.userService + '/get-profile?token='+token)
        .then(data => data.json());
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchGetProfileByToken.pending, (state) => {
            state.isProfileLoading = true;
        })
        build.addCase(fetchGetProfileByToken.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isProfileLoading = false;
            if(action.payload.code === 200){
                state.profile = action.payload.data;
            }
        })
    }
})

export default userSlice.reducer;