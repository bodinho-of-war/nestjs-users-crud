import { SetMetadata } from "@nestjs/common";

export const Profile = (profile: object) => SetMetadata('profile', profile)