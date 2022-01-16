import { Repository } from "typeorm";
import { Profile } from "./profile.entity";

export class ProfilesRepository extends Repository<Profile> { }