import { IBreakSummaryResponse } from "./IBreakSummaryResponse";

export interface IPersonelShiftAndBreakListResponse {
    userId: number,
    shiftName: string,
    shiftStartTime: string,
    shiftEndTime: string,
    startDate: string,
    endDate: string,
    breaks: IBreakSummaryResponse[]
}