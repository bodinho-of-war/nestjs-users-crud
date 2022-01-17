import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entity/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from '../../repositories/profile.repository';
import { ProfileRepositoryInterface } from './interface/profile.repository.interface';
import { ProfileService } from './profile.service';
import { ProfileServiceInterface } from './interface/profile.service.interface';

@Module({
    imports: [TypeOrmModule.forFeature([ProfileEntity])],
    providers: [
        {
            provide: 'ProfileRepositoryInterface',
            useClass: ProfileRepository,
        },
        {
            provide: 'ProfileServiceInterface',
            useClass: ProfileService,
        },
    ],
    controllers: [ProfileController],
})
export class ProfileModule {
}