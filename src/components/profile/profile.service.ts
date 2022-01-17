import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileEntity } from './entity/profile.entity';
import { ProfileRepositoryInterface } from './interface/profile.repository.interface';

@Injectable()
export class ProfileService {
    constructor(
        @Inject('ProfileRepositoryInterface')
        private profileRepository: ProfileRepositoryInterface
    ) { }

    async create(profileDto: CreateProfileDto): Promise<ProfileEntity> {
        const found = await this.profileRepository.findByCondition({ name: profileDto.name })
        if (found) throw new ConflictException('Perfil já existente')
        const profile = await this.profileRepository.create(profileDto)
        return profile
    }


    async findAll(): Promise<ProfileEntity[]> {
        const profiles = await this.profileRepository.findAll()
        return profiles
    }
}
