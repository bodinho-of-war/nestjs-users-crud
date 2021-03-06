import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserRepository } from 'src/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { ProfileEntity } from '../profile/entity/profile.entity';


const userRepoInterface = {
    provide: 'UserRepositoryInterface',
    useClass: UserRepository
}

const UserServInterface = {
    provide: 'UserServiceInterface',
    useClass: UserService
}


const profileRepoInterface = {
    provide: 'ProfileRepositoryInterface',
    useClass: ProfileRepository
}

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([UserEntity, ProfileEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: 18000,
            }
        }),
        forwardRef(() => UserModule),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        ProfileEntity,
        profileRepoInterface,
        userRepoInterface,
        UserServInterface,
    ],
    exports: [JwtStrategy, PassportModule, AuthService]
})
export class AuthModule { }
