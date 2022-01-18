import { BadRequestException, Inject, Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
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

    private async checkProfiles(profilesDto: { name: string }[]): Promise<ProfileEntity[]> {
        const profiles = await this.profileRepository.findAll()
        const foundProfiles = profiles.filter((profile: ProfileEntity) => profilesDto.find((item: { name: string }) => profile.name === item.name))
        if (foundProfiles.length === 0) throw new UnprocessableEntityException('Nenhum perfil valido encontrado')
        return foundProfiles
    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = new UserEntity()
        user.email = createUserDto.email
        user.name = createUserDto.name
        user.password = createUserDto.password
        user.profiles = await this.checkProfiles(createUserDto.profiles)
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

    async registerLogin(user: UserEntity): Promise<UserEntity> {
        user.lastLogin = new Date()
        return await this.userRepository.update(user)
    }

    async findAll(): Promise<UserEntity[]> {
        const users = await this.userRepository.findAll()
        return users
    }
}
