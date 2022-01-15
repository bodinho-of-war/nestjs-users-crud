import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    providers: [
        { provide: 'User', useClass: User },
        UsersService
    ],
    controllers: [UsersController],
})
export class UsersModule { }
