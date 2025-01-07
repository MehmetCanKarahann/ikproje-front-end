import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import apis from "../../constant/RestApis";
import { ICommentListResponse } from "../../models/ICommentListResponse";
import { IBaseResponse } from "../../models/IBaseResponse";
import { data } from "react-router-dom";

interface ICommentState {
    isNewCommentLoading: boolean,
    isCommentListLoading: boolean,
    commentList: ICommentListResponse[],
    isCommentListByCompanyIdLoading: boolean,
    commentListByCompanyId: ICommentListResponse[],
    isCommentUpdateLoading: boolean,
    isCommentDeleteLoading: boolean
}

const initialCommentState: ICommentState = {
    isNewCommentLoading: false,
    isCommentListLoading: false,
    commentList: [],
    isCommentListByCompanyIdLoading: false,
    commentListByCompanyId: [],
    isCommentUpdateLoading: false,
    isCommentDeleteLoading: false
}

//fetch işlemleri

//şirket yönetcisi yeni yorum oluşturur
export const fetchCreateComment = createAsyncThunk(
    'comment/fetchCreateComment',
    async({content, file}: {content: string, file: File}) => {
        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        formData.append('token', token);
        formData.append('content', content);
        formData.append('file', file);

        return await fetch(apis.commentService + '/create-comment',{
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json());
    }
)

//şirket yöneticisi yaptığı yorumu günceller.
export const fetchUpdateComment = createAsyncThunk(
    'comment/fetchUpdateComment',
    async ({content, file}: {content: string, file?: File | null}) => {
        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        formData.append('token', token);
        formData.append('content', content);

        
        if (file) {
            formData.append('file', file);
        }

        return await fetch(apis.commentService + '/update-comment', {
            method: 'PUT',
            body: formData,
            headers:{
                 'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json());
    }
)

//şirket yöneticisi yaptığı yorumu silebilir.
export const fetchDeleteComment = createAsyncThunk(
    'comment/fetchDeleteComment',
    async ({commentId}: {commentId: number}) => {
        const token = localStorage.getItem('token');
        return await fetch(`${apis.commentService}/delete-comment?token=${token}&commentId=${commentId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json());
    }
)

//oluşturulan tüm yorumları getirir.
export const fetchGetComments = createAsyncThunk(
    'comment/fetchGetComments',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.commentService + '/get-comments', {
            method: 'GET',
            headers: {
                 'Authorization': `Bearer ${token}`
            }
        })
        .then(data => data.json())
    }
)

//şirket yöneticisine ait yorumları getirir.
export const fetchGetCommentsByCompanyId = createAsyncThunk(
    'comment/fetchGetCommentsByCompanyId',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.commentService + '/get-comments-by-company-id?token=' + token, {
            method: 'GET',
            headers: {
                 'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json())
    }
)

const commentSlice = createSlice({
    name: 'comment',
    initialState: initialCommentState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchCreateComment.pending, (state) => {
            state.isNewCommentLoading = true;
        })
        build.addCase(fetchCreateComment.fulfilled, (state) => {
            state.isNewCommentLoading = false;
        })
        build.addCase(fetchGetComments.pending, (state) => {
            state.isCommentListLoading = true;
        })
        build.addCase(fetchGetComments.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isCommentListLoading = false;
            if(action.payload.code === 200){
                state.commentList = action.payload.data;
            }
        })
        build.addCase(fetchGetCommentsByCompanyId.pending, (state) => {
            state.isCommentListByCompanyIdLoading = true;
        })
        build.addCase(fetchGetCommentsByCompanyId.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isCommentListByCompanyIdLoading = false;
            
            if(action.payload.code === 200){
                state.commentListByCompanyId = action.payload.data;
            }
        })
        build.addCase(fetchUpdateComment.pending, (state) => {
            state.isCommentUpdateLoading = true;
        })
        build.addCase(fetchUpdateComment.fulfilled, (state) => {
            state.isCommentUpdateLoading = false;
        })
        build.addCase(fetchDeleteComment.pending, (state) => {
            state.isCommentDeleteLoading = true
        })
        build.addCase(fetchDeleteComment.fulfilled, (state) => {
            state.isCommentDeleteLoading = false;
        })
    }
})

export default commentSlice.reducer;