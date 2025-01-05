import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import apis from "../../constant/RestApis";
import { ICommentListResponse } from "../../models/ICommentListResponse";
import { IBaseResponse } from "../../models/IBaseResponse";
import { data } from "react-router-dom";

interface ICommentState {
    isNewCommentLoading: boolean,
    isCommentListLoading: boolean,
    commentList: ICommentListResponse[]
}

const initialCommentState: ICommentState = {
    isNewCommentLoading: false,
    isCommentListLoading: false,
    commentList: []
}

//fetch işlemleri

//şirket yönetcisi yeni yorum oluşturur
export const fetchCreateComment = createAsyncThunk(
    'comment/fetchCreateComment',
    async({content}: {content: string}) => {
        const token = localStorage.getItem('token');
        return await fetch(`${apis.commentService}/create-comment?token=${token}&content=${content}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json());
    }
)

//oluşturulan tüm yorumları getirir.
export const fetchGetComments = createAsyncThunk(
    'comment/fetchGetComments',
    async () => {
        return await fetch(apis.commentService + '/get-comments')
        .then(data => data.json())
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
    }
})

export default commentSlice.reducer;