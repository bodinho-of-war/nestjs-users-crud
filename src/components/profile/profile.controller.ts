import { Body, Controller, Get, Inject, Injectable, Post } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileEntity } from './entity/profile.entity';
import { ProfileServiceInterface } from './interface/profile.service.interface';

@Injectable()
@Controller('profiles')
export class ProfileController {
    constructor(
        @Inject('ProfileServiceInterface')
        private readonly profilesService: ProfileServiceInterface
    ) { }

    @Post()
    async createProfile(
        @Body() createProfileDto: CreateProfileDto
    ): Promise<ProfileEntity> {
        const profile = await this.profilesService.create(createProfileDto)
        return profile
    }

    @Get()
    async listProfiles(): Promise<ProfileEntity[]> {
        const profiles = await this.profilesService.findAll()
        return profiles
    }
}
