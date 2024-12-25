import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersonelLeaveListResponse } from "../../models/IPersonelLeaveListResponse";
import apis from "../../constant/RestApis";
import state from "sweetalert/typings/modules/state";
import { IBaseResponse } from "../../models/IBaseResponse";
import { IPersonelNewLeaveRequest } from "../../models/IPersonelNewLeaveRequest";

interface ILeaveState {
    isPersonelLeaveListLoading: boolean,
    personelLeaveList: IPersonelLeaveListResponse[],
    isNewLeaveLoading: boolean
}

const initialLeaveState: ILeaveState = {
    isPersonelLeaveListLoading: false,
    personelLeaveList: [],
    isNewLeaveLoading: false
}

//fetch işlemleri

export const fetchGetPersonelRequestLeaveList = createAsyncThunk(
    'leave/fetchGetPersonelRequestLeaveList',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.leaveService + '/get-personel-request-leave?token=' + token)
        .then(data => data.json());

    }
)

export const fetchCreateNewLeaveRequest = createAsyncThunk(
    'leave/fetchCreateNewLeaveRequest',
    async (payload: IPersonelNewLeaveRequest) => {
        return await fetch(apis.leaveService + '/new-leave-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)

const leaveSlice = createSlice({
    name: 'leave',
    initialState: initialLeaveState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchGetPersonelRequestLeaveList.pending, (state) => {
            state.isPersonelLeaveListLoading = true;
        })
        build.addCase(fetchGetPersonelRequestLeaveList.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isPersonelLeaveListLoading = false;
            if(action.payload.code === 200){
                state.personelLeaveList = action.payload.data;
            }
        })
        build.addCase(fetchCreateNewLeaveRequest.pending, (state) => {
            state.isNewLeaveLoading = true;
        })
        build.addCase(fetchCreateNewLeaveRequest.fulfilled, (state) => {
            state.isNewLeaveLoading = false;
        })
    }
})

export default leaveSlice.reducer;