import { InjectModel } from '@nestjs/mongoose';
import { AddExpenseDto } from './dto/addExpenseDto';
import { Injectable } from '@nestjs/common';
import { Expense, ExpenseDocument } from '@schemas/expense.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExpenseService {
constructor(        
    @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>
){}

    async addExpense(user,addExpenseDto:AddExpenseDto){

        let expenseObj=this.constructExpenseObj(user, addExpenseDto)
        let res = await this.expenseModel.create(expenseObj);
        let expense =await res.toObject();
        return expense;
    }

     constructExpenseObj(user: any, addExpenseDto: AddExpenseDto) {
        return {
            name: user.name ?? "",
            phone: user.phone ?? "",
            type: addExpenseDto.type,
            amount: addExpenseDto.amount ?? "",
        };
    }
    async getExpenseByType()
    {
        let startDate=new Date();
        let endDate= new Date();

        let data=this.expenseModel.aggregate([
            {$group:{
                _id: "$type"
              }}
        ])
        return data;
    }
    async getExpenseByDateRange()
    {
        let startDate=new Date();
        let endDate= new Date();

        let data=this.expenseModel.aggregate([
            $group: {
                _id: {
                    range: todo:
                }
            }
        ])
        return data;
    }

}
