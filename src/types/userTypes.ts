export interface IUser {
    name: string;
    email: string;
    password: string;
    transactionPassword: string;
    balance?: number;
    accountNumber?: string;
}