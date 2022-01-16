import { Body, Controller, Get, Injectable, Post, ValidationPipe } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileEntity } from './profile.entity';
import { ProfilesService } from './profiles.service';

@Injectable()
@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) { }

    @Post()
    async createProfile(
        @Body(ValidationPipe) createProfileDto: CreateProfileDto
    ): Promise<ProfileEntity> {
        const profile = await this.profilesService.createProfile(createProfileDto)
        return profile
    }

    @Get()
    async listProfiles(): Promise<ProfileEntity[]> {
        const profiles = await this.profilesService.findAllProfiles()
        return profiles
    }
}
