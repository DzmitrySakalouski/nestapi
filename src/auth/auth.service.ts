import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UserDto } from 'src/users/model/user.dto';
import { UsersService } from 'src/users/users.service';
import { AccessTokenData } from './interfaces/accessTokenData.interface';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'User registered',
        }

        try {
            await this.userService.createUser(userDto);
            console.log('AuthService', userDto);
        } catch (registrationError) {
            status = {
                success: false,
                message: registrationError
            }
        }

        return status;
    }

    async login(loginUserDto): Promise<LoginStatus> {
        const user = await this.userService.findUserByLogin(loginUserDto);
        const token = this.createToken(user);

        return {
            email: user.email, ...token,
        }
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.userService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    private createToken({email}: UserDto): AccessTokenData {
        const user: JwtPayload = { email };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: '300s',
            accessToken,
        }
    }
}
