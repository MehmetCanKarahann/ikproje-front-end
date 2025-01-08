import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersonelShiftListResponse } from "../../models/IPersonelShiftListResponse";
import apis from "../../constant/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import { IPersonelListResponse } from "../../models/IPersonelListResponse";
import { IPersonelAssignToShiftRequest } from "../../models/IPersonelAssignToShiftRequest";
import { IUserShiftResponse } from "../../models/IUserShiftResponse";
import { IPersonelShiftAndBreakListResponse } from "../../models/IPersonelShiftAndBreakListResponse";


interface IUserShiftState {
    isPersonelListByCompanyId: boolean
    personelListByCompanyId: IPersonelListResponse[],
    isPersonelAssignToShiftLoading: boolean,
    isPersonelAssignToShiftListLoading: boolean, 
    personelShiftList: IUserShiftResponse[] //personellere atanmış vardiya listesi,
    isPersonelShiftAndBreakListLoading: boolean,
    personelShiftAndBreakList: IPersonelShiftAndBreakListResponse[]
}

const initialUserShiftState: IUserShiftState = {
    isPersonelListByCompanyId: false,
    personelListByCompanyId: [],
    isPersonelAssignToShiftLoading: false,
    isPersonelAssignToShiftListLoading: false,
    personelShiftList: [],
    isPersonelShiftAndBreakListLoading: false,
    personelShiftAndBreakList: []
}


//fetch işlemleri

//personellere atanmış vardiya listesini getirir.
export const fetchGetPersonelShiftList = createAsyncThunk(
    'userShift/fetchGetPersonelShiftList',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.userShiftService + '/get-personel-shift-list?token=' + token,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(data => data.json())
    }
)


//şikete ait personelleri getirir.
export const fetchGetPersonelListByCompanyId = createAsyncThunk(
    'userShift/fetchGetPersonelListByCompanyId',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.userShiftService + '/get-personel-list-by-companyId?token=' + token,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(data => data.json())
    }
)

//personele vardiya atama işlemi yapar.
export const fetchAssignShiftToUser = createAsyncThunk(
    'userShift/fetchAssignShiftToUser',
    async (payload: IPersonelAssignToShiftRequest) => {
        const token = localStorage.getItem('token');
        return await fetch(apis.userShiftService + '/assign-shift-to-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)


//personelin vardiya ve mola listesini getirir.
export const fetchGetActiveShiftDetails = createAsyncThunk(
    'userShift/fetchGetActiveShiftDetails',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.userShiftService + '/get-active-shift-details?token=' + token, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json())
    }
)

const userShiftSlice = createSlice({
    name: 'userShift',
    initialState: initialUserShiftState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchGetPersonelShiftList.pending, (state) => {
            state.isPersonelAssignToShiftListLoading = true;
        })
        build.addCase(fetchGetPersonelShiftList.fulfilled, (state, action) => {
            state.isPersonelAssignToShiftListLoading = false;
            if (action.payload.code === 200){
                state.personelShiftList = action.payload.data;
            }
       })
        build.addCase(fetchGetPersonelListByCompanyId.pending, (state) => {
            state.isPersonelListByCompanyId = true;
        })
        build.addCase(fetchGetPersonelListByCompanyId.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isPersonelListByCompanyId = false;
            if (action.payload.code === 200) {

                state.personelListByCompanyId = action.payload.data;
            }
        })
        build.addCase(fetchAssignShiftToUser.pending, (state) => {
            state.isPersonelAssignToShiftLoading = true;
        })
        build.addCase(fetchAssignShiftToUser.fulfilled, (state) => {
            state.isPersonelAssignToShiftLoading = false;
        })
        build.addCase(fetchGetActiveShiftDetails.pending, (state) => {
            state.isPersonelShiftAndBreakListLoading = true;
        })
        build.addCase(fetchGetActiveShiftDetails.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isPersonelShiftAndBreakListLoading = false;
            if(action.payload.code === 200){
                state.personelShiftAndBreakList = action.payload.data;
                
            }
        })
    }
})

export default userShiftSlice.reducer;