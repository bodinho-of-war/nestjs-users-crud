import { Inject, Injectable } from '@nestjs/common';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserRepositoryInterface } from './interface/user.repository.interface';
import { UserServiceInterface } from './interface/user.service.interface';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(
        @Inject('UserRepositoryInterface')
        private readonly userRepository: UserRepositoryInterface,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = new UserEntity()
        user.email = createUserDto.email
        user.name = createUserDto.name
        user.password = createUserDto.password
        user.profiles = createUserDto.profiles
        return this.userRepository.create(user)
    }


    async checkCredentials(credentialsDto: CredentialsDto): Promise<UserEntity> {
        const { email, password } = credentialsDto;
        const user = await this.userRepository.findByCondition({ email, status: true });

        if (user && (await user.checkPassword(password))) {
            return user;
        } else {
            return null;
        }
    }

    async findAll(): Promise<UserEntity[]> {
        const users = await this.userRepository.findAll()
        return users
    }
}
