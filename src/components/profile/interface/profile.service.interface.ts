import { CreateProfileDto } from "../dto/create-profile.dto";
import { ProfileEntity } from "../entity/profile.entity";

export interface ProfileServiceInterface {
    create(profileDto: CreateProfileDto): Promise<ProfileEntity>
    findAll(): Promise<ProfileEntity[]>
}