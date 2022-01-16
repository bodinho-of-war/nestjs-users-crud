import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/components/auth/auth.module';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        forwardRef(() => AuthModule)
    ],
    providers: [
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository
        },
        {
            provide: 'UserServiceInterface',
            useClass: UserService
        },
    ],
    controllers: [UserController],
})
export class UserModule { }
