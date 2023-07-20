import { IsNotEmpty } from 'class-validator';
export class AddExpenseDto{
    @IsNotEmpty()
    type:string;
    @IsNotEmpty()
    amount:number;
}