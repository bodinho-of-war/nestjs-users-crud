import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnCreateUserDto } from './dtos/return-create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private authService: AuthService
    ) { }

    private async normalizeUser(user: User): Promise<ReturnCreateUserDto> {
        const normalized: ReturnCreateUserDto = {
            id: user.id,
            name: user.name,
            email: user.email,
            created: user.createdAt,
            modified: user.updatedAt,
            last_login: user.lastLogin,
            profiles: user.profiles,
            token: await this.authService.generateToken(user)
        }
        return normalized
    }

    async createUser(createUserDto: CreateUserDto): Promise<ReturnCreateUserDto> {
        const user = await this.userRepository.createUser(createUserDto)
        return await this.normalizeUser(user)
    }
}
