import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { UserRepository } from 'src/users/users.repository';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(createUserDto)
    }

    async generateToken(user: User): Promise<string> {
        const jwtPayload = {
            id: user.id
        }
        const token = await this.jwtService.sign(jwtPayload)
        return token
    }


    async signIn(credentialsDto: CredentialsDto) {
        const user = await this.userRepository.checkCredentials(credentialsDto);

        if (user === null) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const token = await this.generateToken(user)

        return { token }
    }
}
