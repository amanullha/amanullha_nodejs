import { IsNotEmpty } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    phone:string;
    @IsNotEmpty()
    password:string;

}