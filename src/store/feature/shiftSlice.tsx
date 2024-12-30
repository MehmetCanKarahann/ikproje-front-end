import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShiftListResponse } from "../../models/IShiftListResponse";
import apis from "../../constant/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import { INewShiftRequest } from "../../models/INewShiftRequest";
import { IUpdateShiftRequest } from "../../models/IUpdateShiftRequest";

interface IShifState {
    isShiftListLoading: boolean,
    shiftList: IShiftListResponse[],
    isNewShiftLoading: boolean,
    isShiftUpdateLoading: boolean,
    isShiftDeleteLoading: boolean
}

const initialShiftState: IShifState = {
    isShiftListLoading: false,
    shiftList: [],
    isNewShiftLoading: false,
    isShiftUpdateLoading: false,
    isShiftDeleteLoading: false
}

//tüm vardiya listesini getirir. (Şirket Yöneticisi İçin)
export const fetchGetAllShiftsByCompanyId = createAsyncThunk(
    'shift/fetchGetAllShiftsByCompanyId',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.shiftService + '/all-shifts-by-company?token=' + token)
        .then(data => data.json());
    }
)

//Yeni Vardiya Oluşturur.
export const fetchNewShift = createAsyncThunk(
    'shift/fetchNewShift',
    async (payload: INewShiftRequest) => {
        return await fetch(apis.shiftService + '/new-shift-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)

//Oluşturulan Vardiyayı Günceller.
export const fetchUpdateShift = createAsyncThunk(
    'shift/fetchUpdateShift',
    async (payload: IUpdateShiftRequest) => {
        return await fetch(apis.shiftService + '/update-shift', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)

//oluşturulan vardiyayı siler.
export const fetchDeleteShift = createAsyncThunk(
    'shift/fetchDeleteShift',
    async({shiftId}: {shiftId: number}) => {
        const token = localStorage.getItem('token');
        return await fetch(`${apis.shiftService}/delete-shift?token=${token}&shiftId=${shiftId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
    }
)


const shiftSlice = createSlice({
    name: 'shift',
    initialState: initialShiftState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchGetAllShiftsByCompanyId.pending, (state) => {
            state.isShiftListLoading = true;
        })
        build.addCase(fetchGetAllShiftsByCompanyId.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isShiftListLoading = false;
            if(action.payload.code === 200){
                state.shiftList = action.payload.data;
            }
        })
        build.addCase(fetchNewShift.pending, (state) => {
            state.isNewShiftLoading = true;
        })
        build.addCase(fetchNewShift.fulfilled, (state) => {
            state.isNewShiftLoading = false;
        })
        build.addCase(fetchUpdateShift.pending, (state) => {
            state.isShiftUpdateLoading = true;
        })
        build.addCase(fetchUpdateShift.fulfilled, (state) => {
            state.isShiftUpdateLoading = false;
        })
        build.addCase(fetchDeleteShift.pending, (state) => {
            state.isShiftDeleteLoading = true;
        })
        build.addCase(fetchDeleteShift.fulfilled, (state) => {
            state.isNewShiftLoading = false;
        })
    }
})

export default shiftSlice.reducer;