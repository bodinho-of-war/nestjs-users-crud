import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.createUser(createUserDto)
        return user
    }

    async findAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find()
        return users
    }
}
