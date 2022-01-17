import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/components/auth/auth.service';
import { Profile } from 'src/components/auth/profile.decorator';
import { ProfilesGuard } from 'src/components/auth/profiles.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserServiceInterface } from './interface/user.service.interface';

@Controller('users')
export class UserController {

    constructor(
        @Inject('UserServiceInterface')
        private readonly usersService: UserServiceInterface,
        private readonly authService: AuthService
    ) { }


    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    // @Profile({ name: 'admin' })
    @UseGuards(AuthGuard(), ProfilesGuard)
    async create(
        @Body() userDto: CreateUserDto
    ): Promise<UserEntity> {
        const user = await this.usersService.create(userDto)
        return user
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async listUsers() {
        const users = await this.usersService.findAll()
        return users
    }
}
