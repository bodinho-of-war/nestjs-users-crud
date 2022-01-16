import { CreateProfileDto } from "../dto/create-profile.dto";
import { Profile } from "../entity/profile.entity";

export interface ProfileServiceInterface {
    create(profileDto: CreateProfileDto): Promise<Profile>
    findAll(): Promise<Profile[]>
}