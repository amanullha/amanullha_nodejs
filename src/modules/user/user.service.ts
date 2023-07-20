import { AuthHelper } from '@helpers/auth.helper';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUserDto';
import { LoginUserDto } from './dto/loginUserDto';

@Injectable()
export class UserService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }
    async createUser(createUserDto:CreateUserDto): Promise<any> {
        let hashPassword=await AuthHelper.getInstance().generateHash(createUserDto.password);
        let userObj={
            name:createUserDto.name??"",
            phone:createUserDto.phone??"",
            password:hashPassword??"",
        }
        let res = await this.userModel.create(userObj);
        let user =await res.toObject();
        let token = await AuthHelper.getInstance().generateAccessToken(user, this.jwtService)
        return {
            user: user,
            token: token
        }
    }

    async login(loginUserDto:LoginUserDto)
    {
        const user=this.findByPhone(loginUserDto.phone);
        if(!user){
            throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
        }
        let verity=AuthHelper.getInstance().compareHash(loginUserDto.password,user['password'])
        if(!verity){
            throw new HttpException('invalid_Passoword', HttpStatus.BAD_REQUEST);
        }
        let token = await AuthHelper.getInstance().generateAccessToken(user, this.jwtService)
        return {
            user: user,
            token: token
        }
    }
    
    async findByEmail(email: string) {
        return {}
    }
    async findByPhone(phone: string) {
        const user = await this.userModel.find({phone:phone}).exec();
        return user;
    }
}

//. 