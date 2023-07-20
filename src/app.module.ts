import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ExpenseModule } from './modules/expense/expense.module';

@Module({
  imports: [    
    MongooseModule.forRoot('mongodb+srv://task:task@cluster0.ssglgxr.mongodb.net/task?retryWrites=true&w=majority'),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ExpenseModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
