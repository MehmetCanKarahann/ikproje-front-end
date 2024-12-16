import { configureStore } from "@reduxjs/toolkit"
import { adminSlice, authSlice, userSlice } from "./feature";
import { useSelector } from "react-redux";


const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        admin: adminSlice
    }
})

export type IKDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const IKUseSelector = useSelector.withTypes<RootState>(); 

export default store;