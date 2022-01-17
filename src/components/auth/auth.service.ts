import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/components/user/dtos/create-user.dto';
import { UserEntity } from 'src/components/user/entity/user.entity';
import { UserServiceInterface } from '../user/interface/user.service.interface';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('UserServiceInterface')
        private userService: UserServiceInterface,
        private jwtService: JwtService
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
        return await this.userService.create(createUserDto)
    }

    async generateToken(user: UserEntity): Promise<string> {
        const jwtPayload = {
            id: user.id
        }
        const token = await this.jwtService.sign(jwtPayload)
        return token
    }


    async signIn(credentialsDto: CredentialsDto) {
        const user = await this.userService.checkCredentials(credentialsDto);

        if (user === null) {
            throw new UnauthorizedException('Usuário e/ou senha inválidos');
        }

        const token = await this.generateToken(user)

        return { user, token }
    }
}
