import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    public getUserData(@Request() request) {
        return request.user;
    }
}
