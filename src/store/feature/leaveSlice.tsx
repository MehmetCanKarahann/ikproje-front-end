import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersonelLeaveListResponse } from "../../models/IPersonelLeaveListResponse";
import apis from "../../constant/RestApis";
import state from "sweetalert/typings/modules/state";
import { IBaseResponse } from "../../models/IBaseResponse";
import { IPersonelNewLeaveRequest } from "../../models/IPersonelNewLeaveRequest";
import { ILeaveListResponse } from "../../models/ILeaveListResponse";

interface ILeaveState {
    isPersonelLeaveListLoading: boolean,
    personelLeaveList: IPersonelLeaveListResponse[],
    isNewLeaveLoading: boolean,
    isLeaveListLoading: boolean,
    leaveList: ILeaveListResponse[],
    isApprovedLeaveLoading: boolean,
    isRejectLeaveLoading: boolean
}

const initialLeaveState: ILeaveState = {
    isPersonelLeaveListLoading: false,
    personelLeaveList: [],
    isNewLeaveLoading: false,
    isLeaveListLoading: false,
    leaveList: [],
    isApprovedLeaveLoading: false,
    isRejectLeaveLoading: false
}

//fetch işlemleri

//personelin talepte bulunduğu izinler listelenir.
export const fetchGetPersonelRequestLeaveList = createAsyncThunk(
    'leave/fetchGetPersonelRequestLeaveList',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.leaveService + '/get-personel-request-leave?token=' + token)
        .then(data => data.json());

    }
)

//personel yeni izin talebinde bulunduğu ednpoind.
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

//şirket yöneticisine gelen izin talepleri
export const fetchGetLeaveRequest = createAsyncThunk(
    'leave/fetchGetLeaveRequest',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.leaveService + '/get-leave-requests?token=' + token)
        .then(data => data.json());
    }
)

//şirket yöneticisinin personelin izin talebini onayladığı endpoind
export const fetchApproveLeaveRequest = createAsyncThunk(
    'leave/fetchApproveLeaveRequest',
    async({leaveId}: {leaveId: number}) => {
        const token = localStorage.getItem('token');
        return await fetch(`${apis.leaveService}/approve-leave-request?token=${token}&leaveId=${leaveId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
    }
)

//şirket yöneticisinin personelin izin talebini reddettiği endpoind
export const fetchRejectLeaveRequest = createAsyncThunk(
    'leave/fetchRejectLeaveRequest',
    async ({leaveId, rejectionMessage}: {leaveId: number, rejectionMessage: string}) => {
        const token = localStorage.getItem('token');
        return await fetch(`${apis.leaveService}/reject-leave-request?token=${token}&leaveId=${leaveId}&rejectionMessage=${rejectionMessage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
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
        build.addCase(fetchGetLeaveRequest.pending, (state) => {
            state.isLeaveListLoading = true;
        })
        build.addCase(fetchGetLeaveRequest.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isLeaveListLoading = false;
            if(action.payload.code === 200){
                state.leaveList = action.payload.data;
            }
        })
        build.addCase(fetchApproveLeaveRequest.pending, (state) => {
            state.isApprovedLeaveLoading = true;
        })
        build.addCase(fetchApproveLeaveRequest.fulfilled, (state) => {
            state.isApprovedLeaveLoading = false;
        })
        build.addCase(fetchRejectLeaveRequest.pending, (state) => {
            state.isRejectLeaveLoading = true;
        })
        build.addCase(fetchRejectLeaveRequest.fulfilled, (state) => {
            state.isRejectLeaveLoading = false;
        })
    }
})

export default leaveSlice.reducer;