import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    providers: [
        { provide: 'User', useClass: User }
    ],
})
export class UsersModule { }
