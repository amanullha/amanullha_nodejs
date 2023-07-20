import { IsNotEmpty } from "class-validator";

export class LoginUserDto{
    @IsNotEmpty()
    phone:string;
    @IsNotEmpty()
    password:string;

}