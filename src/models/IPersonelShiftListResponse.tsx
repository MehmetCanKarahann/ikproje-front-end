export interface IPersonelShiftListResponse {
    id: number,
    personelName: string,
    personelSurname: string,
    shiftName: string,
    shiftStartTime: string,
    shiftEndTime: string,
    breaks: []
}