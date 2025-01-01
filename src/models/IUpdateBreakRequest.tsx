export interface IUpdateBreakRequest {
    token: string,
    breakId: number,
    name: string,
    startTime: string,
    endTime: string,
    shiftId: number
}