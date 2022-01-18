import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/components/user/dtos/create-user.dto';
import { UserEntity } from 'src/components/user/entity/user.entity';
import { UserRepositoryInterface } from '../user/interface/user.repository.interface';
import { UserServiceInterface } from '../user/interface/user.service.interface';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('UserServiceInterface')
        private readonly userService: UserServiceInterface,
        @Inject('UserRepositoryInterface')
        private readonly useRepository: UserRepositoryInterface,
        private readonly jwtService: JwtService
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
        const { profiles } = (await this.useRepository.findWithRelations({
            relations: ['profiles'],
            where: { id: user.id }
        }))[0]
        const returnUser = JSON.parse(JSON.stringify(user))
        const token = await this.generateToken(user)
        await this.userService.registerLogin(user)
        return { token, profiles, ...returnUser }
    }
}
