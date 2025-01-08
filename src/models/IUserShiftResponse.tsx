import { IBreakSummaryResponse } from "./IBreakSummaryResponse";

export interface IUserShiftResponse {
    id: number,
    shiftName: string,
    personelName: string,
    personelSurname: string,
    startDate: string,
    endDate: string,
    breaks: IBreakSummaryResponse[]
}