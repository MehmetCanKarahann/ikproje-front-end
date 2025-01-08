export interface ICompanyManagerHome{
    personalOnLeaveCount: number; 
    totalShiftCount: number;    
    departments: Array<[string, number]>; 
    genderDistribution: Array<[string, number]>; 
    totalPersonelCount: number
}