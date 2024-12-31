import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { INewBreakRequest } from "../../models/INewBreakRequest"
import apis from "../../constant/RestApis"
import { IBreakListResponse } from "../../models/IBreakListResponse"
import { IBaseResponse } from "../../models/IBaseResponse"

interface IBreakState {
    isNewBreakLoading: boolean,
    isBreakListLoading: boolean,
    breakList: IBreakListResponse[]
}

const initialBreakState: IBreakState = {
    isNewBreakLoading: false,
    isBreakListLoading: false,
    breakList: []
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
    }
})

export default breakSlice.reducer;