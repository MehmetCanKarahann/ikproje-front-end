import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPersonelNewExpenseRequest } from "../../models/IPersonelNewExpenceRequest"
import apis from "../../constant/RestApis"
import { IExpenseListResponse } from "../../models/IExpenseListResponse"
import { IBaseResponse } from "../../models/IBaseResponse"

interface IExpenseState {
    isNewExpenseLoading: boolean,
    isPersonelExpenseListLoading: boolean,
    expenseList: IExpenseListResponse[], //personelin kendi haracamalarını gördüğü harcama listesi
    isPersonelInvoiceUploadLoading: boolean,
    isExpenseListLoading: boolean,
    personelExpenseList: IExpenseListResponse[], //şirket yöneticisinin harcamaları gördüğü liste
    isPersonelExpenseApproveLoading: boolean,
    isPersonelExpenseRejectLoading: boolean
}

const initialExpenseState: IExpenseState = {
    isNewExpenseLoading: false,
    isPersonelExpenseListLoading: false,
    expenseList: [],
    isPersonelInvoiceUploadLoading: false,
    isExpenseListLoading: false,
    personelExpenseList: [],
    isPersonelExpenseApproveLoading: false,
    isPersonelExpenseRejectLoading: false
}

//fetch işlemleri

//personel yeni bir harcama isteğinde bulunduğu endpoind
export const fetchNewExpenseRequest = createAsyncThunk(
    'expense/fetchNewExpenseRequest',
    async (payload: IPersonelNewExpenseRequest) => {
        return await fetch(apis.expenseService + '/create-new-expense-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)

//personelin yaptığı harcamaları getirir.
export const fetchGetPersonelExpenseList = createAsyncThunk(
    'expense/fetchGetPersonelExpenseList',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.expenseService + '/get-personel-expenses?token=' + token)
        .then(data => data.json())
    }
)

//fatura resmi yüklemek için kullanılır.
export const fetchUploadReceipt = createAsyncThunk (
    'expense/fetchUploadReceipt',
    async ({expenseId, file}: {expenseId: number, file: File}) => {

        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        formData.append('token', token);
        formData.append('expenseId', expenseId.toString());
        formData.append("file", file);

        return await fetch(apis.expenseService + '/upload-receipt', {
            method: 'POST',
            body: formData
        }).then(data => data.json());

    }
)

//Şirket yöneticisinin tüm harcamaları getirdiği istek.
export const fetchGetPersonelExpenseRequest = createAsyncThunk(
    'expense/fetchGetPersonelExpenseRequest',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.expenseService + '/get-personel-expense-requests?token=' + token)
        .then(data => data.json())
    }
)

//şirket yöneticisi personel tarafından yapılan harcamaları onaylar.
export const fetchApproveExpense = createAsyncThunk(
    'expense/fetchApproveExpense',
    async ({expenseId}: {expenseId: number}) => {
        const token = localStorage.getItem('token');
        return await fetch(`${apis.expenseService}/approve-expense?token=${token}&expenseId=${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json());
    }
)

//şirket yönetcisi personelin yaptığı harcamaları iptal eder.
export const fetchRejectExpense = createAsyncThunk(
    'expense/fetchRejectExpense',
    async ({expenseId}: {expenseId: number}) => {
        const token = localStorage.getItem('token');
        return await fetch(`${apis.expenseService}/reject-expense?token=${token}&expenseId=${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
    }
)

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchNewExpenseRequest.pending, (state) => {
            state.isNewExpenseLoading = true;
        })
        build.addCase(fetchNewExpenseRequest.fulfilled, (state) => {
            state.isNewExpenseLoading = false;
        })
        build.addCase(fetchGetPersonelExpenseList.pending, (state) => {
            state.isPersonelExpenseListLoading = true;
        })
        build.addCase(fetchGetPersonelExpenseList.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isPersonelExpenseListLoading = false;
            if(action.payload.code === 200){
                state.expenseList = action.payload.data;
            }
        })
        build.addCase(fetchUploadReceipt.pending, (state) => {
            state.isPersonelInvoiceUploadLoading = true;
        })
        build.addCase(fetchUploadReceipt.fulfilled, (state) => {
            state.isPersonelInvoiceUploadLoading = false;
        })
        build.addCase(fetchGetPersonelExpenseRequest.pending, (state) => {
            state.isExpenseListLoading = true;
        })
        build.addCase(fetchGetPersonelExpenseRequest.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isExpenseListLoading = false;
            if(action.payload.code === 200){
                state.personelExpenseList = action.payload.data;
            }
        })  
        build.addCase(fetchApproveExpense.pending, (state) => {
            state.isPersonelExpenseApproveLoading = true;
        })
        build.addCase(fetchApproveExpense.fulfilled, (state) => {
            state.isPersonelExpenseApproveLoading = false;
        })
        build.addCase(fetchRejectExpense.pending, (state) => {
            state.isPersonelExpenseRejectLoading = true;
        })
        build.addCase(fetchRejectExpense.fulfilled, (state) => {
            state.isPersonelExpenseRejectLoading = false;
        })
    }
})

export default expenseSlice.reducer;