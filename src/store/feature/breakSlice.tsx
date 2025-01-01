import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { INewBreakRequest } from "../../models/INewBreakRequest"
import apis from "../../constant/RestApis"
import { IBreakListResponse } from "../../models/IBreakListResponse"
import { IBaseResponse } from "../../models/IBaseResponse"
import { IUpdateBreakRequest } from "../../models/IUpdateBreakRequest"

interface IBreakState {
    isNewBreakLoading: boolean,
    isBreakListLoading: boolean,
    breakList: IBreakListResponse[],
    isBreakUpdateLoading: boolean,
    isBreakDeleteLoading: boolean
}

const initialBreakState: IBreakState = {
    isNewBreakLoading: false,
    isBreakListLoading: false,
    breakList: [],
    isBreakUpdateLoading: false,
    isBreakDeleteLoading: false
}

//fetch işlemleri

//oluşturulan tüm molaları listeler.
export const fetchGetAllBreak = createAsyncThunk(
    'break/fetchGetAllBreak',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.breakService + '/get-all-break?token=' + token)
        .then(data => data.json())
    }
)


//yeni mola oluşturur.
export const fetchCreateBreak = createAsyncThunk(
    'break/fetchCreateBreak',
    async (payload: INewBreakRequest) => {
        return await fetch(apis.breakService + '/add-new-break', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)

//oluşturulan molayı günceller.
export const fetchUpdateBreak = createAsyncThunk(
    'break/fetchUpdateBreak',
    async (payload: IUpdateBreakRequest) => {
        return await fetch(apis.breakService + '/update-break', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)

//oluşturulan molayı siler.
export const fetchDeleteBreak = createAsyncThunk(
    'break/fetchDeleteBreak',
    async ({breakId}: {breakId: number}) => {
        const token = localStorage.getItem('token');
        return await fetch(`${apis.breakService}/delete-break?token=${token}&breakId=${breakId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
    }
)

const breakSlice = createSlice({
    name: 'break',
    initialState: initialBreakState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchCreateBreak.pending, (state) => {
            state.isNewBreakLoading = true;
        })
        build.addCase(fetchCreateBreak.fulfilled, (state) => {
            state.isNewBreakLoading = false;
        })
        build.addCase(fetchGetAllBreak.pending, (state) => {
            state.isBreakListLoading = true;
        })
        build.addCase(fetchGetAllBreak.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isBreakListLoading = false;
            if(action.payload.code === 200){
                state.breakList = action.payload.data;
            }
        })
        build.addCase(fetchUpdateBreak.pending, (state) => {
            state.isBreakUpdateLoading = true;
        })
        build.addCase(fetchUpdateBreak.fulfilled, (state) => {
            state.isBreakUpdateLoading = false;
        })
        build.addCase(fetchDeleteBreak.pending, (state) => {
            state.isBreakDeleteLoading = true;
        })
        build.addCase(fetchDeleteBreak.fulfilled, (state) => {
            state.isBreakDeleteLoading = false;
        })
    }
})

export default breakSlice.reducer;