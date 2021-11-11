import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty() password: string;
    @IsNotEmpty() @IsEmail() email: string;
    @IsNotEmpty() firstName: string;
    @IsNotEmpty() lastName: string;
}

export class LoginUserDto {
    @IsNotEmpty() @IsEmail() readonly email: string;
    @IsNotEmpty() readonly password: string;
}

export class UserDto {
    @IsNotEmpty() id: number;
    @IsNotEmpty() @IsEmail() email: string;
    @IsNotEmpty() firstName: string;
    @IsNotEmpty() lastName: string;
}