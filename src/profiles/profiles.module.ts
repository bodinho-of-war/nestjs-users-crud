import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { ProfilesRepository } from './profiles.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProfilesRepository])],
    providers: [ProfilesService],
    controllers: [ProfilesController]
})
export class ProfilesModule { }
