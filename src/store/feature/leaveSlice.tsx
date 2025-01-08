import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersonelLeaveListResponse } from "../../models/IPersonelLeaveListResponse";
import apis from "../../constant/RestApis";
import state from "sweetalert/typings/modules/state";
import { IBaseResponse } from "../../models/IBaseResponse";
import { IPersonelNewLeaveRequest } from "../../models/IPersonelNewLeaveRequest";
import { ILeaveListResponse } from "../../models/ILeaveListResponse";
import {  IUpdatePersonelLeaveRequest } from "../../models/IUpdatePersonelLeaveRequest";

interface ILeaveState {
    isPersonelLeaveListLoading: boolean,
    personelLeaveList: IPersonelLeaveListResponse[],
    isNewLeaveLoading: boolean,
    isLeaveListLoading: boolean,
    leaveList: ILeaveListResponse[],
    isApprovedLeaveLoading: boolean,
    isRejectLeaveLoading: boolean,
    isPersonelUpdateLeaveLoading: boolean,
    isPersonelLeaveDeleteLoading: boolean,
    isPersonelUsedLeaveDaysLoading: boolean,
    personelUsedLeaveDays: number,
    isPersonelRemainingAnnualLeaveDays: boolean,
    personelLeaveDays: number
}

const initialLeaveState: ILeaveState = {
    isPersonelLeaveListLoading: false,
    personelLeaveList: [],
    isNewLeaveLoading: false,
    isLeaveListLoading: false,
    leaveList: [],
    isApprovedLeaveLoading: false,
    isRejectLeaveLoading: false,
    isPersonelUpdateLeaveLoading: false,
    isPersonelLeaveDeleteLoading: false,
    isPersonelUsedLeaveDaysLoading: false,
    personelUsedLeaveDays: 0,
    isPersonelRemainingAnnualLeaveDays: false,
    personelLeaveDays: 0
}

//fetch işlemleri

//personelin talepte bulunduğu izinler listelenir.
export const fetchGetPersonelRequestLeaveList = createAsyncThunk(
    'leave/fetchGetPersonelRequestLeaveList',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.leaveService + '/get-personel-request-leave?token=' + token,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(data => data.json());

    }
)

//personel yeni izin talebinde bulunduğu ednpoind.
export const fetchCreateNewLeaveRequest = createAsyncThunk(
    'leave/fetchCreateNewLeaveRequest',
    async (payload: IPersonelNewLeaveRequest) => {
        const token = localStorage.getItem('token');
        return await fetch(apis.leaveService + '/new-leave-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
        return await fetch(apis.leaveService + '/get-leave-requests?token=' + token,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json())
    }
)

//şirket yöneticisinin personelin izin talebini reddettiği fetch isteği
export const fetchRejectLeaveRequest = createAsyncThunk(
    'leave/fetchRejectLeaveRequest',
    async ({leaveId, rejectionMessage}: {leaveId: number, rejectionMessage: string}) => {
        const token = localStorage.getItem('token');
        return await fetch(`${apis.leaveService}/reject-leave-request?token=${token}&leaveId=${leaveId}&rejectionMessage=${rejectionMessage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json())
    }
)

//personelin izin talebini düzenlediği fetch isteği
export const fetchUpdateLeaveRequest = createAsyncThunk(
    'leave/fetchUpdateLeaveRequest',
    async (payload: IUpdatePersonelLeaveRequest) => {
        const token = localStorage.getItem('token');
        return await fetch(apis.leaveService + '/update-leave-request', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)

//personelin izin talebini sildiği fetch isteği
export const fetcDeleteLeaveRequest = createAsyncThunk(
    'leave/fetcDeleteLeaveRequest',
    async ({leaveId}: {leaveId: number}) => {
        const token = localStorage.getItem('token');
        return await fetch(`${apis.leaveService}/delete-leave-request?token=${token}&leaveId=${leaveId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json());
    }
)


export const fetchUsedLeaveDays = createAsyncThunk(
    'leave/fetchUsedLeaveDays',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.leaveService + '/used-leave-days?token=' + token, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json());
    }
)

export const fecthGetRemainingAnnualLeaveDays = createAsyncThunk(
    'leave/fecthGetRemainingAnnualLeaveDays',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.leaveService + '/remaining-leave-days?token=' + token, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
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
        build.addCase(fetchUpdateLeaveRequest.pending, (state) => {
            state.isPersonelUpdateLeaveLoading = true;
        })
        build.addCase(fetchUpdateLeaveRequest.fulfilled, (state) => {
            state.isPersonelUpdateLeaveLoading = false;
        })
        build.addCase(fetcDeleteLeaveRequest.pending, (state) => {
            state.isPersonelLeaveDeleteLoading= true;
        })
        build.addCase(fetcDeleteLeaveRequest.fulfilled, (state) => {
            state.isPersonelLeaveDeleteLoading = false;
        })
        build.addCase(fetchUsedLeaveDays.pending, (state) => {
            state.isPersonelUsedLeaveDaysLoading = true;
        })
        build.addCase(fetchUsedLeaveDays.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isPersonelUsedLeaveDaysLoading = false;
            if(action.payload.code === 200) {
                state.personelUsedLeaveDays = action.payload.data;
            }
        })
        build.addCase(fecthGetRemainingAnnualLeaveDays.pending, (state) => {
            state.isPersonelRemainingAnnualLeaveDays = true;
        })
        build.addCase(fecthGetRemainingAnnualLeaveDays.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isPersonelRemainingAnnualLeaveDays = false;
            if(action.payload.code === 200){
                state.personelLeaveDays = action.payload.data;
            }
        })
    }
})

export default leaveSlice.reducer;