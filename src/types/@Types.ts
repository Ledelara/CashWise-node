export interface IUser {
    name: string;
    email: string;
    password: string;
    transactionPassword: string;
    balance?: number;
    accountNumber?: string;
}
export interface ITransaction {
    userId: string, 
    type: 'deposit' | 'withdraw' | 'transfer' | string,
    amount: number, 
    toAccount?: string
}