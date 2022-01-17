import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/components/auth/auth.module';
import { UserRepository } from 'src/repositories/user.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { ProfileEntity } from '../profile/entity/profile.entity';
import { ProfileModule } from '../profile/profiles.module';

const userRepoInterface = {
    provide: 'UserRepositoryInterface',
    useClass: UserRepository
}

const userServInterface = {
    provide: 'UserServiceInterface',
    useClass: UserService
}

const userEntity = {
    provide: 'UserEntity',
    useClass: UserEntity
}

const profileRepoInterface = {
    provide: 'ProfileRepositoryInterface',
    useClass: ProfileRepository
}

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, ProfileEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        forwardRef(() => AuthModule),
        ProfileModule
    ],
    providers: [userRepoInterface, userServInterface, profileRepoInterface, userEntity],
    controllers: [UserController],
    exports: [userRepoInterface, userServInterface, userEntity]
})
export class UserModule { }
