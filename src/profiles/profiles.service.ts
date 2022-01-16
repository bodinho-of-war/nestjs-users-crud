import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileEntity } from './profile.entity';
import { ProfilesRepository } from './profiles.repository';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(ProfilesRepository)
        private profilesRepository: ProfilesRepository
    ) { }

    async createProfile(createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
        const profile = await this.profilesRepository.createProfile(createProfileDto)
        return profile
    }


    async findAllProfiles(): Promise<ProfileEntity[]> {
        const profiles = await this.profilesRepository.find()
        return profiles
    }
}
