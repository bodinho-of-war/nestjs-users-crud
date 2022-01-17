import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entity/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from '../../repositories/profile.repository';
import { ProfileService } from './profile.service';

const profileRepoInterface = {
    provide: 'ProfileRepositoryInterface',
    useClass: ProfileRepository,
}

const profileServInterface = {
    provide: 'ProfileServiceInterface',
    useClass: ProfileService,
}

@Module({
    imports: [TypeOrmModule.forFeature([ProfileEntity])],
    providers: [ProfileEntity, profileRepoInterface, profileServInterface],
    controllers: [ProfileController],
    exports: [ProfileEntity, profileServInterface, profileRepoInterface]
})
export class ProfileModule {
}