import { Inject, Injectable, Logger } from '@nestjs/common';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import { ProfileEntity } from '../profile/entity/profile.entity';
import { ProfileRepositoryInterface } from '../profile/interface/profile.repository.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserRepositoryInterface } from './interface/user.repository.interface';
import { UserServiceInterface } from './interface/user.service.interface';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(
        @Inject('UserRepositoryInterface')
        private readonly userRepository: UserRepositoryInterface,
        @Inject('ProfileRepositoryInterface')
        private readonly profileRepository: ProfileRepositoryInterface
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = new UserEntity()
        user.email = createUserDto.email
        user.name = createUserDto.name
        user.password = createUserDto.password
        const profiles = await this.profileRepository.findAll()
        user.profiles = profiles.filter((profile: ProfileEntity) => createUserDto.profiles.find((item: { name: string }) => profile.name === item.name))
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
