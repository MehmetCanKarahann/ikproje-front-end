import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import apis from "../../constant/RestApis"
import { IBaseResponse } from "../../models/IBaseResponse"

interface ICompanyState {
    isCompanyCountLoading: boolean,
    companyCount: number,
    isCompanyLogoListLoading: boolean,
    logoList: string[]
}

const initialCompanyState: ICompanyState = {
    isCompanyCountLoading: false,
    companyCount: 0,
    isCompanyLogoListLoading: false,
    logoList: []
}

//fetch işlemleri

//şirket sayısını getirir.
export const fetchCompanyCount = createAsyncThunk(
    'company/fetchCompanyCount',
    async () => {
        return await fetch(apis.companyService + '/company-count')
        .then(data => data.json())
    }
)

//şirket logolarını getirir.
export const fetchGetCompanyLogos = createAsyncThunk(
    'company/fetchGetCompanyLogos',
    async () => {
        return await fetch(apis.companyService + '/random-company-logos')
        .then(data => data.json())
    }
)

const companySlice = createSlice({
    name: 'company',
    initialState: initialCompanyState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchCompanyCount.pending, (state) => {
            state.isCompanyCountLoading = true;
        })
        build.addCase(fetchCompanyCount.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isCompanyCountLoading = false;
            if(action.payload.code === 200){
                state.companyCount = action.payload.data;
            }
        })
        build.addCase(fetchGetCompanyLogos.pending, (state) => {
            state.isCompanyLogoListLoading = true;
        })
        build.addCase(fetchGetCompanyLogos.fulfilled, (state, action) => {
            state.isCompanyLogoListLoading = false;
            if(action.payload.code === 200){
                state.logoList = action.payload.data;
            }
        })
    }
})

export default companySlice.reducer;