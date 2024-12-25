import { configureStore } from "@reduxjs/toolkit"
import { adminSlice, authSlice, companyManagementSlice, employeeSlice, leaveSlice } from "./feature";
import { useSelector } from "react-redux";


const store = configureStore({
    reducer: {
        auth: authSlice,
        companyManagement: companyManagementSlice,
        employeeSlice: employeeSlice,
        leaveSlice: leaveSlice,
        admin: adminSlice
    }
})

export type IKDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const IKUseSelector = useSelector.withTypes<RootState>(); 

export default store;