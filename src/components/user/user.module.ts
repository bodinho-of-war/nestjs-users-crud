import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/components/auth/auth.module';
import { UserRepository } from 'src/repositories/user.repository';

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

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        forwardRef(() => AuthModule)
    ],
    providers: [userRepoInterface, userServInterface, userEntity],
    controllers: [UserController],
    exports: [userRepoInterface, userServInterface, userEntity]
})
export class UserModule { }
