export interface IPersonelAssignToShiftRequest{
    token: string,
    shiftId: number,
    userId: number,
    startDate: string,
    endDate: string
}