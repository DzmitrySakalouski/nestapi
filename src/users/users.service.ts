import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/auth/interfaces/payload.interface';
import { toUserDto } from 'src/shared/user.helper';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UserDto } from './model/user.dto';
import { User } from './model/user.models';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async findOne(options?: object): Promise<UserDto> {
        const user = await this.usersRepository.findOne(options)
        return toUserDto(user);
    }

    async findUserByLogin({email, password}: LoginUserDto): Promise<UserDto> {
        const user = await this.usersRepository.findOne({where: { email }});
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        if (user.password !== password) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
        }

        return toUserDto(user);
    }

    async findByPayload({email}: JwtPayload): Promise<UserDto> {
        return await this.findOne({where: {email}});
    }

    async createUser(userDto: CreateUserDto): Promise<UserDto> {
        const {firstName, lastName, email, password} = userDto;

        const userInDB = await this.usersRepository.findOne({where: {email}});

        if (userInDB) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        console.log("createUser UsersService", userDto);
        

        const user: User = await this.usersRepository.create({firstName, lastName, email, password});
        await this.usersRepository.save(user);
        return toUserDto(user);
    }
}
