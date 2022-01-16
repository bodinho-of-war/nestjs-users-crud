import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entity/profile.entity';
import { ProfileRepositoryInterface } from './interface/profile.repository.interface';

@Injectable()
export class ProfileService {
    constructor(
        @Inject('ProfileRepositoryInterface')
        private profileRepository: ProfileRepositoryInterface
    ) { }

    async create(profileDto: CreateProfileDto): Promise<Profile> {
        const found = await this.profileRepository.findAll()
        if (found.length > 0) throw new ConflictException('Perfil já existente')
        const profile = await this.profileRepository.create(profileDto)
        return profile
    }


    async findAllProfiles(): Promise<Profile[]> {
        const profiles = await this.profileRepository.findAll()
        return profiles
    }
}
