export interface IUpdatePersonelLeaveRequest {
    token: string,
    leaveId: number,
    description: string,
    startDate: string,
    endDate: string,
    leaveType: string
}