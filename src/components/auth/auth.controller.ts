import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/components/user/dtos/create-user.dto';
import { UserEntity } from 'src/components/user/entity/user.entity';
import { ReturnUserDto } from '../user/dtos/return-user.dto';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(
        @Body() createUserDto: CreateUserDto,
    ): Promise<{ message: string }> {
        await this.authService.signUp(createUserDto);
        return {
            message: 'Cadastro realizado com sucesso',
        };
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/signin')
    async signIn(
        @Body() credentiaslsDto: CredentialsDto,
    ): Promise<ReturnUserDto> {
        const user = await this.authService.signIn(credentiaslsDto);
        const returnUser = new ReturnUserDto(user)
        return returnUser
    }

    @Get('/me')
    @UseGuards(AuthGuard())
    getMe(@GetUser() user: UserEntity): UserEntity {
        return user
    }
}