import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';

@Controller('user')
export class UserController {
    constructor(readonly userService:UserService){}


    @Post()
    async create(@Body()createUserDto:CreateUserDto){
        return await this.userService.createUser(createUserDto);
    }
}
