import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/components/auth/auth.service';
import { Profile } from 'src/components/auth/profile.decorator';
import { ProfilesGuard } from 'src/components/auth/profiles.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UserServiceInterface } from './interface/user.service.interface';

@Controller('users')
export class UserController {

    constructor(
        @Inject('UserServiceInterface')
        private readonly usersService: UserServiceInterface,
        private readonly authService: AuthService
    ) { }


    @Post()
    @Profile({ name: 'admin' })
    @UseGuards(AuthGuard(), ProfilesGuard)
    async create(
        @Body() userDto: CreateUserDto
    ): Promise<ReturnUserDto> {
        const user = await this.usersService.create(userDto)
        const token = await this.authService.generateToken(user)
        return new ReturnUserDto({ ...user, token })
    }

    @Get()
    async listUsers() {
        const users = await this.usersService.findAll()
        return users
    }
}
