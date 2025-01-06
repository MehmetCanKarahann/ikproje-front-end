export interface IPersonelNewExpenseRequest {
    token: string,
    amount: number,
    description: string,
    file: File | null
}