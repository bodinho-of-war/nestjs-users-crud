import { Body, Controller, Get, Inject, Injectable, Post } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entity/profile.entity';
import { ProfileServiceInterface } from './interface/profile.service.interface';

@Injectable()
@Controller('profiles')
export class ProfileController {
    constructor(
        @Inject('ProfileServiceInterface')
        private profilesService: ProfileServiceInterface
    ) { }

    @Post()
    async createProfile(
        @Body() createProfileDto: CreateProfileDto
    ): Promise<Profile> {
        const profile = await this.profilesService.create(createProfileDto)
        return profile
    }

    @Get()
    async listProfiles(): Promise<Profile[]> {
        const profiles = await this.profilesService.findAll()
        return profiles
    }
}
