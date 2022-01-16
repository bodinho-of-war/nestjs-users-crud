import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Profile } from 'src/auth/profile.decorator';
import { ProfilesGuard } from 'src/auth/profiles.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) { }


    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    @Profile({ name: 'admin' })
    @UseGuards(AuthGuard(), ProfilesGuard)
    async createUser(
        @Body(ValidationPipe) createUserDto: CreateUserDto
    ): Promise<ReturnUserDto> {
        const user = await this.usersService.createUser(createUserDto)
        return {
            user,
            message: 'Usuario criado com sucesso'
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async listUsers() {
        const users = await this.usersService.findAllUsers()
        return users
    }
}
